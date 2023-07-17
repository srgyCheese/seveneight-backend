"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const querystring_1 = __importDefault(require("querystring"));
const client_1 = require("../../prisma/client");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const urlParams = req.query;
    const ordered = {};
    Object.keys(urlParams)
        .sort()
        .forEach((key) => {
        if (key.slice(0, 3) === "vk_") {
            ordered[key] = urlParams[key];
        }
    });
    const stringParams = querystring_1.default.stringify(ordered);
    const paramsHash = (0, crypto_1.createHmac)("sha256", process.env.SECRET_KEY)
        .update(stringParams)
        .digest()
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=$/, "");
    if (paramsHash !== urlParams.sign) {
        return res.status(401).send({
            error: "Not authorized",
        });
    }
    const candidate = yield client_1.prisma.user.findFirst({
        where: {
            vk_id: urlParams.vk_user_id.toString(),
        },
    });
    if (candidate) {
        // req.user = candidate
        return next();
    }
    const { ref } = urlParams;
    const user_ = yield client_1.prisma.user.findFirst({
        where: { vk_id: ref.toString() },
    });
    const user = yield client_1.prisma.user.create({
        data: {
            first_name: 'firstname',
            last_name: 'lastname',
            vk_id: urlParams.vk_user_id.toString(),
        },
    });
    // req.user = user
    next();
});
module.exports = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map
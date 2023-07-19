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
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeGetUser = void 0;
const vk_1 = require("./vk");
const client_1 = require("../../prisma/client");
const server_1 = require("@trpc/server");
const safeGetUser = ({ vk_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield client_1.prisma.user.findFirst({
        where: { vk_id },
    });
    if (candidate) {
        return candidate;
    }
    const vkUser = yield vk_1.vk.api.users.get({
        user_ids: [vk_id],
        fields: ["photo_400"],
    });
    if (vkUser.length === 0) {
        throw new server_1.TRPCError({ code: "BAD_REQUEST" });
    }
    const user = yield client_1.prisma.user.create({
        data: {
            first_name: vkUser[0].first_name,
            last_name: vkUser[0].last_name,
            photo_400: vkUser[0].photo_400,
            vk_id,
        },
        include: {
            comments: {
                include: {
                    commentTemplate: true,
                    toUser: true,
                    fromUser: true,
                },
            },
        },
    });
    return user;
});
exports.safeGetUser = safeGetUser;
//# sourceMappingURL=safeGetUser.js.map
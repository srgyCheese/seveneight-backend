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
exports.authProcedure = exports.publicProcedure = exports.middleware = exports.router = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const querystring_1 = __importDefault(require("querystring"));
const client_1 = require("../prisma/client");
const vk_1 = require("./utils/vk");
const verifyLaunchParams_1 = require("./utils/verifyLaunchParams");
const createContext = ({ req, res, }) => __awaiter(void 0, void 0, void 0, function* () {
    const urlParams = querystring_1.default.decode(req.headers.authorization);
    const areLaunchParamsValid = (0, verifyLaunchParams_1.verifyLaunchParams)(req.headers.authorization);
    if (!areLaunchParamsValid) {
        return {
            user: undefined,
        };
    }
    const candidate = yield client_1.prisma.user.findFirst({
        where: {
            vk_id: urlParams.vk_user_id.toString(),
        },
    });
    if (candidate) {
        return {
            user: candidate,
        };
    }
    // const { ref } = urlParams
    // const user_ = await prisma.user.findFirst({
    //   where: { vk_id: ref.toString() },
    // })
    const vkUser = yield vk_1.vk.api.users.get({
        user_ids: [urlParams.vk_user_id.toString()],
        fields: ["photo_400"],
    });
    const user = yield client_1.prisma.user.create({
        data: {
            first_name: vkUser[0].first_name,
            last_name: vkUser[0].last_name,
            photo_400: vkUser[0].photo_400,
            vk_id: urlParams.vk_user_id.toString(),
        },
    });
    return { user };
});
exports.createContext = createContext;
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.middleware = t.middleware;
exports.publicProcedure = t.procedure;
exports.authProcedure = exports.publicProcedure.use((0, exports.middleware)((opts) => {
    const { ctx } = opts;
    if (!ctx.user) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
}));
//# sourceMappingURL=trpc.js.map
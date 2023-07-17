"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const trpc_1 = require("./trpc");
const appRouter = (0, trpc_1.router)({
    test: trpc_1.publicProcedure.query(() => 'test nice'),
    profile: trpc_1.publicProcedure.query(() => {
    }),
});
//# sourceMappingURL=index.js.map
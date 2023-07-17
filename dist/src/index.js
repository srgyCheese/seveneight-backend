"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const standalone_1 = require("@trpc/server/adapters/standalone");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const trpc_1 = require("./trpc");
const appRouter = (0, trpc_1.router)({
    test: trpc_1.publicProcedure.query(() => "test nice"),
    profile: trpc_1.publicProcedure.query(() => { }),
});
const server = (0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)(),
    router: appRouter,
});
server.listen(8080);
//# sourceMappingURL=index.js.map
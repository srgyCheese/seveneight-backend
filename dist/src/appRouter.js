"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
exports.appRouter = (0, trpc_1.router)({
    test: trpc_1.publicProcedure.query(() => "test nice"),
    profile: trpc_1.authProcedure.query(({ ctx }) => {
        return ctx.user;
    }),
});
//# sourceMappingURL=appRouter.js.map
import { authProcedure, publicProcedure, router } from "./trpc"

export const appRouter = router({
  test: publicProcedure.query(() => "test nice"),
  profile: authProcedure.query(({ ctx }) => {
    return ctx.user
  }),
})

export type AppRouter = typeof appRouter
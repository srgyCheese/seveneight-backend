import dotenv from "dotenv"

dotenv.config()

import * as trpc from "@trpc/server"
import { publicProcedure, router } from "./trpc"

const appRouter = router({
  test: publicProcedure.query(() => 'test nice'),
  profile: publicProcedure.query(() => {

  }),
})

export type AppRouter = typeof appRouter
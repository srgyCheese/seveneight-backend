import dotenv from "dotenv"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import cors from "cors"

dotenv.config()

import * as trpc from "@trpc/server"
import { publicProcedure, router } from "./trpc"

const appRouter = router({
  test: publicProcedure.query(() => "test nice"),
  profile: publicProcedure.query(() => {}),
})

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})

server.listen(8080)

export type AppRouter = typeof appRouter

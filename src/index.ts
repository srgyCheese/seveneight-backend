import dotenv from "dotenv"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from "cors"

dotenv.config()

import * as trpc from "@trpc/server"
import { publicProcedure, router } from "./trpc"
import express from 'express'

const app = express()

const appRouter = router({
  test: publicProcedure.query(() => "test nice"),
  profile: publicProcedure.query(() => {}),
})

app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

app.listen(8080)

export type AppRouter = typeof appRouter

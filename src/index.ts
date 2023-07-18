import dotenv from "dotenv"
import * as trpcExpress from "@trpc/server/adapters/express"
import { prisma } from "../prisma/client"
import cors from "cors"

dotenv.config()

import * as trpc from "@trpc/server"
import { authProcedure, createContext, publicProcedure, router } from "./trpc"
import express from "express"

const app = express()

const appRouter = router({
  test: publicProcedure.query(() => "test nice"),
  profile: authProcedure.query(({ ctx }) => {
    return ctx.user
  }),
})

app.use(cors())

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.listen(8080)

export type AppRouter = typeof appRouter

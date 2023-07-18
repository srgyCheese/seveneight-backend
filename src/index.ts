import dotenv from "dotenv"
import * as trpcExpress from "@trpc/server/adapters/express"
import { prisma } from "../prisma/client"
import cors from "cors"

dotenv.config()

import * as trpc from "@trpc/server"
import { authProcedure, createContext, publicProcedure, router } from "./trpc"
import express from "express"
import { appRouter } from "./appRouter"

const app = express()

app.use(cors())

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.listen(8080)

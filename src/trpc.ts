import { TRPCError, initTRPC } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import qs from "querystring"
import { prisma } from "../prisma/client"
import { vk } from "./utils/vk"
import { verifyLaunchParams } from "./utils/verifyLaunchParams"
import { safeGetUser } from "./utils/safeGetUser"

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const urlParams = qs.decode(req.headers.authorization)

  const areLaunchParamsValid = verifyLaunchParams(req.headers.authorization)

  if (!areLaunchParamsValid) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const user = await safeGetUser({
    vk_id: urlParams.vk_user_id.toString()
  })

  return { user }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

export const authProcedure = publicProcedure.use(
  middleware((opts) => {
    const { ctx } = opts

    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return opts.next({
      ctx: {
        user: ctx.user,
      },
    })
  })
)

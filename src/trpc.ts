import { TRPCError, initTRPC } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import qs from "querystring"
import { prisma } from "../prisma/client"
import { vk } from "./utils/vk"
import { verifyLaunchParams } from "./utils/verifyLaunchParams"

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const urlParams = qs.decode(req.headers.authorization)

  const areLaunchParamsValid = verifyLaunchParams(req.headers.authorization)

  if (!areLaunchParamsValid) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const candidate = await prisma.user.findFirst({
    where: {
      vk_id: urlParams.vk_user_id.toString(),
    },
  })

  if (candidate) {
    return {
      user: candidate,
    }
  }

  // const { ref } = urlParams

  // const user_ = await prisma.user.findFirst({
  //   where: { vk_id: ref.toString() },
  // })

  const vkUser = await vk.api.users.get({
    user_ids: [urlParams.vk_user_id.toString()],
    fields: ["photo_400"],
  })

  const user = await prisma.user.create({
    data: {
      first_name: vkUser[0].first_name,
      last_name: vkUser[0].last_name,
      photo_400: vkUser[0].photo_400,
      vk_id: urlParams.vk_user_id.toString(),
    },
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

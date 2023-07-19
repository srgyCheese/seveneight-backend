import { vk } from "./vk"
import { prisma } from "../../prisma/client"
import { TRPCError } from "@trpc/server"

export const safeGetUser = async ({ vk_id }: { vk_id: string }) => {
  const candidate = await prisma.user.findFirst({
    where: { vk_id },
  })

  if (candidate) {
    return candidate
  }

  const vkUser = await vk.api.users.get({
    user_ids: [vk_id],
    fields: ["photo_400"],
  })

  if (vkUser.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST" })
  }

  const user = await prisma.user.create({
    data: {
      first_name: vkUser[0].first_name,
      last_name: vkUser[0].last_name,
      photo_400: vkUser[0].photo_400,
      vk_id,
    },
    include: {
      comments: {
        include: {
          commentTemplate: true,
          toUser: true,
          fromUser: true,
        },
      },
    },
  })

  return user
}

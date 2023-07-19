import { authProcedure, publicProcedure, router } from "./trpc"
import z from "zod"
import { prisma } from "../prisma/client"
import { TRPCError } from "@trpc/server"

export const appRouter = router({
  test: publicProcedure.query(() => "test nice"),
  profile: authProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  user: authProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await prisma.user.findFirst({
        where: {
          vk_id: input.id,
        },
        include: {
          comments: true,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Пользователь не найден",
        })
      }

      return user
    }),
  addComment: authProcedure
    .input(
      z.object({
        to: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const toUser = await prisma.user.findFirst({
        where: {
          vk_id: input.to,
        },
      })

      if (!toUser) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      const comment = await prisma.userComment.create({
        data: {
          fromUserId: ctx.user.id,
          toUserId: toUser.id,
          commentTemplateId: "0",
        },
      })

      return { comment }
    }),
})

export type AppRouter = typeof appRouter

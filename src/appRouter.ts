import { authProcedure, publicProcedure, router } from "./trpc"
import z from "zod"
import { prisma } from "../prisma/client"
import { TRPCError } from "@trpc/server"
import { safeGetUser } from "./utils/safeGetUser"
import { vk } from "./utils/vk"

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
      const user = await safeGetUser({ vk_id: input.id })

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Пользователь не найден",
        })
      }

      return user
    }),
  uploadImage: authProcedure
    .input(
      z.object({
        base64Image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const photo = await vk.upload.messagePhoto({
        source: {
          value: Buffer.from(input.base64Image, "base64"),
        },
      })

      return photo
    }),
  addPhotoToList: authProcedure
    .input(
      z.object({
        photo: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newPhoto = await prisma.photo.create({
        data: {
          userId: ctx.user.id,
          url: input.photo,
        },
      })

      return newPhoto
    }),
  getPhotos: authProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          vk_id: input.userId,
        },
        select: { id: true },
      })

      const allPhotos = await prisma.photo.findMany({
        where: {
          userId: user.id,
        },
      })

      return allPhotos
    }),
  getPhoto: authProcedure
    .input(
      z.object({
        photoId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const photo = await prisma.photo.findFirst({
        where: {
          id: input.photoId,
        },
        include: {
          comments: {
            include: {
              commentTemplate: true,
              fromUser: true,
            },
          },
        },
      })

      return photo
    }),
  addCommentToPhoto: authProcedure
    .input(
      z.object({
        to: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const toPhoto = await prisma.photo.findFirst({
        where: {
          id: input.to,
        },
      })

      if (!toPhoto) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }

      const hasComment = await prisma.photoComment.findFirst({
        where: {
          fromUserId: ctx.user.id,
          toPhotoId: toPhoto.id,
        },
      })

      if (!hasComment) {
        const everyIdInTable = await prisma.commentTemplate.findMany({
          select: { id: true },
        })
        const idArray = everyIdInTable.map((element) => element.id)
        const randomIndex = Math.floor(Math.random() * idArray.length)
        const randomIdFromTable = idArray[randomIndex]

        const randomCommentTemplate = await prisma.commentTemplate.findFirst({
          where: {
            id: randomIdFromTable,
          },
        })

        const comment = await prisma.photoComment.create({
          data: {
            fromUserId: ctx.user.id,
            toPhotoId: toPhoto.id,
            commentTemplateId: randomCommentTemplate.id,
          },
        })
      }

      const toPhotoWithComments = await prisma.photo.findFirst({
        where: {
          id: toPhoto.id,
        },
        include: {
          comments: {
            include: {
              commentTemplate: true,
              fromUser: true,
            },
          },
        },
      })

      return toPhotoWithComments
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

      const hasComment = await prisma.userComment.findFirst({
        where: {
          fromUserId: ctx.user.id,
          toUserId: toUser.id,
        },
      })

      if (!hasComment) {
        const everyIdInTable = await prisma.commentTemplate.findMany({
          select: { id: true },
        })
        const idArray = everyIdInTable.map((element) => element.id)
        const randomIndex = Math.floor(Math.random() * idArray.length)
        const randomIdFromTable = idArray[randomIndex]

        const randomCommentTemplate = await prisma.commentTemplate.findFirst({
          where: {
            id: randomIdFromTable,
          },
        })

        const comment = await prisma.userComment.create({
          data: {
            fromUserId: ctx.user.id,
            toUserId: toUser.id,
            commentTemplateId: randomCommentTemplate.id,
          },
        })
      }

      const toUserWithComments = await prisma.user.findFirst({
        where: {
          id: toUser.id,
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

      return toUserWithComments
    }),
})

export type AppRouter = typeof appRouter

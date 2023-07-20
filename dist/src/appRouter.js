"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("../prisma/client");
const server_1 = require("@trpc/server");
const safeGetUser_1 = require("./utils/safeGetUser");
const vk_1 = require("./utils/vk");
exports.appRouter = (0, trpc_1.router)({
    test: trpc_1.publicProcedure.query(() => "test nice"),
    profile: trpc_1.authProcedure.query(({ ctx }) => {
        return ctx.user;
    }),
    user: trpc_1.authProcedure
        .input(zod_1.default.object({
        id: zod_1.default.string(),
    }))
        .query(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, safeGetUser_1.safeGetUser)({ vk_id: input.id });
        if (!user) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                message: "Пользователь не найден",
            });
        }
        return user;
    })),
    uploadImage: trpc_1.authProcedure
        .input(zod_1.default.object({
        base64Image: zod_1.default.string(),
    }))
        .mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const photo = yield vk_1.vk.upload.messagePhoto({
            source: {
                value: Buffer.from(input.base64Image, "base64"),
            },
        });
        return photo;
    })),
    addPhotoToList: trpc_1.authProcedure
        .input(zod_1.default.object({
        photo: zod_1.default.string(),
    }))
        .mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const newPhoto = yield client_1.prisma.photo.create({
            data: {
                userId: ctx.user.id,
                url: input.photo,
            },
        });
        return newPhoto;
    })),
    getPhotos: trpc_1.authProcedure
        .input(zod_1.default.object({
        userId: zod_1.default.string(),
    }))
        .query(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield client_1.prisma.user.findFirst({
            where: {
                vk_id: input.userId,
            },
            select: { id: true },
        });
        const allPhotos = yield client_1.prisma.photo.findMany({
            where: {
                userId: user.id,
            },
        });
        return allPhotos;
    })),
    getPhoto: trpc_1.authProcedure
        .input(zod_1.default.object({
        photoId: zod_1.default.string(),
    }))
        .query(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const photo = yield client_1.prisma.photo.findFirst({
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
        });
        return photo;
    })),
    addCommentToPhoto: trpc_1.authProcedure
        .input(zod_1.default.object({
        to: zod_1.default.string(),
    }))
        .mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const toPhoto = yield client_1.prisma.photo.findFirst({
            where: {
                id: input.to,
            },
        });
        if (!toPhoto) {
            throw new server_1.TRPCError({ code: "BAD_REQUEST" });
        }
        const hasComment = yield client_1.prisma.photoComment.findFirst({
            where: {
                fromUserId: ctx.user.id,
                toPhotoId: toPhoto.id,
            },
        });
        if (!hasComment) {
            const everyIdInTable = yield client_1.prisma.commentTemplate.findMany({
                select: { id: true },
            });
            const idArray = everyIdInTable.map((element) => element.id);
            const randomIndex = Math.floor(Math.random() * idArray.length);
            const randomIdFromTable = idArray[randomIndex];
            const randomCommentTemplate = yield client_1.prisma.commentTemplate.findFirst({
                where: {
                    id: randomIdFromTable,
                },
            });
            const comment = yield client_1.prisma.photoComment.create({
                data: {
                    fromUserId: ctx.user.id,
                    toPhotoId: toPhoto.id,
                    commentTemplateId: randomCommentTemplate.id,
                },
            });
        }
        const toPhotoWithComments = yield client_1.prisma.photo.findFirst({
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
        });
        return toPhotoWithComments;
    })),
    addComment: trpc_1.authProcedure
        .input(zod_1.default.object({
        to: zod_1.default.string(),
    }))
        .mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const toUser = yield client_1.prisma.user.findFirst({
            where: {
                vk_id: input.to,
            },
        });
        if (!toUser) {
            throw new server_1.TRPCError({ code: "BAD_REQUEST" });
        }
        const hasComment = yield client_1.prisma.userComment.findFirst({
            where: {
                fromUserId: ctx.user.id,
                toUserId: toUser.id,
            },
        });
        if (!hasComment) {
            const everyIdInTable = yield client_1.prisma.commentTemplate.findMany({
                select: { id: true },
            });
            const idArray = everyIdInTable.map((element) => element.id);
            const randomIndex = Math.floor(Math.random() * idArray.length);
            const randomIdFromTable = idArray[randomIndex];
            const randomCommentTemplate = yield client_1.prisma.commentTemplate.findFirst({
                where: {
                    id: randomIdFromTable,
                },
            });
            const comment = yield client_1.prisma.userComment.create({
                data: {
                    fromUserId: ctx.user.id,
                    toUserId: toUser.id,
                    commentTemplateId: randomCommentTemplate.id,
                },
            });
        }
        const toUserWithComments = yield client_1.prisma.user.findFirst({
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
        });
        return toUserWithComments;
    })),
});
//# sourceMappingURL=appRouter.js.map
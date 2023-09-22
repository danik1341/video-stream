import {
  type PrismaClient,
  type Prisma,
  type User,
  type Video,
  EngagementType,
} from "@prisma/client";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

type Context = {
  prisma: PrismaClient;
};

const checkVideoOwnership = async (
  ctx: Context,
  id: string,
  userId: string,
) => {
  const video = await ctx.prisma.video.findUnique({
    where: {
      id: id,
    },
  });
  if (!video || video.userId !== userId) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Video not found",
    });
  }
  return video;
};

export const videoRouter = createTRPCRouter({
  getRandomVideos: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          publish: true,
        },
        include: {
          user: true,
        },
      });

      // Split videos and users into separate arrays
      const videos: Video[] = videosWithUser.map(({ user, ...video }) => video);
      const users: User[] = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        }),
      );

      const indices = Array.from(
        { length: videosWithCounts.length },
        (_, i) => i,
      );

      for (let i = indices.length - 1; i > 0; i--) {
        if (indices[i] !== undefined) {
          const j = Math.floor(Math.random() * (i + 1));
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      }
      // Use the shuffled indices to re-order videosWithCounts and users
      const shuffledVideosWithCounts = indices.map((i) => videosWithCounts[i]);
      const shuffledUsers = indices.map((i) => users[i]);

      const randomVideos = shuffledVideosWithCounts.slice(0, input);
      const randomUsers = shuffledUsers.slice(0, input);
      return { videos: randomVideos, users: randomUsers };
    }),
});

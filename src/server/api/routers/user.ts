import { EngagementType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  addFollow: protectedProcedure
    .input(z.object({ followingId: z.string(), followerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingFollow = await ctx.db.followEngagement.findMany({
        where: {
          followingId: input.followingId,
          followerId: input.followerId,
          engagementType: EngagementType.FOLLOW,
        },
      });
      if (existingFollow.length > 0) {
        const deleteFollow = await ctx.db.followEngagement.deleteMany({
          where: {
            followingId: input.followingId,
            followerId: input.followerId,
            engagementType: EngagementType.FOLLOW,
          },
        });
        return deleteFollow;
      } else {
        const follow = await ctx.db.followEngagement.create({
          data: {
            followingId: input.followingId,
            followerId: input.followerId,
            engagementType: EngagementType.FOLLOW,
          },
        });
        return follow;
      }
    }),

  getChannelById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const followers = await ctx.db.followEngagement.count({
        where: {
          followingId: user.id,
        },
      });

      const following = await ctx.db.followEngagement.count({
        where: {
          followerId: user.id,
        },
      });
      let viewerHasFollowed = false;
      const userWithEngagements = { ...user, followers, following };

      if (input.viewerId && input.viewerId !== "") {
        viewerHasFollowed = !!(await ctx.db.followEngagement.findFirst({
          where: {
            followingId: user.id,
            followerId: input.viewerId,
          },
        }));
      }
      const viewer = {
        hasFollowed: viewerHasFollowed,
      };

      return { user: userWithEngagements, viewer };
    }),
});

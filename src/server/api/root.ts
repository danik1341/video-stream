import { commentRouter } from "./routers/comment";
import { userRouter } from "./routers/user";
import { videoRouter } from "./routers/video";
import { videoEngagementRouter } from "./routers/videoEngagement";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  video: videoRouter,
  videoEngagement: videoEngagementRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

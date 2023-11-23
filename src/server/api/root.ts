import { postRouter } from "sintocheck/server/api/routers/post";
import { createTRPCRouter } from "sintocheck/server/api/trpc";
import { doctorRouter } from "sintocheck/server/api/routers/doctor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  doctor: doctorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { router, procedure } from "../trpc";
import { z } from "zod";
import prisma from "../../lib/prisma";

export const postRouter = router({
  createPost: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.create({
        data: input,
      });
      return post;
    }),
  getPosts: procedure.query(async () => {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return posts;
  }),
});

export type AppRouter = typeof postRouter;

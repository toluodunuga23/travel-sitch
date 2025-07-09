import { router, procedure } from "../trpc";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        data: {
          title: input.title,
          content: input.content,
          authorId: input.authorId,
        },
      });
      return {
        success: true,
        message: "Post created successfully",
        post,
      };

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

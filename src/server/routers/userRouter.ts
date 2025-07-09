import { router, procedure } from "../trpc";
import { z } from "zod";
import prisma from "../../lib/prisma";

export const userRouter = router({
  getUserByName: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          name: input.name,
        },
      });
      return user;
    }),
});

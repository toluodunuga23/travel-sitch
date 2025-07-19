"use client";
import { trpcApp } from "@/utils/trpcApp";
import Link from "next/link";

export default function Posts() {
  //Using TRPC
  const { data: posts, isLoading, error } = trpcApp.post.getPosts.useQuery();

  //Using Prisma

//   const posts = await prisma.post.findMany({
//     include: {
//       author: true,
//     },
//   });


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <div className="flex justify-start w-full ml-30">
      <Link href="/create-post" className="text-blue-500 rounded-md p-2 border-2 border-blue-500">Create Post</Link>
        </div>
      <div className=" grid grid-cols-3 gap-4 items-start justify-start font-[family-name:var(--font-geist-sans)] w-full space-y-4 ml-30 mt-4">
        {(posts ?? []).map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md w-2/3 border-2 border-black flex flex-col items-start justify-start"
          >
            <span className="text-sm text-gray-600">{post.author?.name}</span>
            <span className="font-semibold ">{post.title}</span>
            <span className="text-sm text-gray-600">{post.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";
// import prisma from "@/lib/prisma";
// import { trpcApp } from "@/utils/trpcApp";

// export default async function Posts() {
//   const retrivePosts = trpcApp.post.useQuery();

//   const posts = await prisma.post.findMany({
//     include: {
//       author: true,
//     },
//   });

//   // Find Unique Example

//   //Example 1
//   const users = await prisma.user.findUnique({
//     where: { id: 1 },
//   });

//   // Example 2: Multiple Conditions
//   // gt: greater than, lt: less than, gte: greater than or equal to, lte: less than or equal to, contains: contains, startsWith: starts with, endsWith: ends with
//   const users2 = await prisma.user.findMany({
//     where: { id: { gt: 1 }, name: { contains: "a" } },
//   });

//   const users3 = await prisma.user.findMany({
//     where: {
//       OR: [{ name: "Alice" }, { name: "Bob" }],
//     },
//   });

//   const users4 = await prisma.user.findMany({
//     where: {
//       AND: [{ name: "Alice" }, { name: "Bob" }],
//     },
//   });

//   const users5 = await prisma.user.findMany({
//     where: {
//       name: { not: "Alice" },
//     },
//   });

//   const users6 = await prisma.user.findMany({
//     where: {
//       name: {
//         in: ["Alice", "Bob"],
//       },
//     },
//   });

//   //Updating User
//   // const updatedUser = await prisma.user.update({
//   //   where: { id: 1 },
//   //   data: {
//   //     name: "Sarah",
//   //   },
//   // });

//   //Deleting User
//   // const deletedUser = await prisma.user.deleteMany({
//   //   where: { id: 1 },
//   // where: { id: {gt:1 }},

//   // });

//   return (
//     <div className="min-h-screen  flex flex-col items-center justify-center -mt-16">
//       <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
//         Posts
//       </h1>
//       <div className=" flex flex-col items-start justify-start font-[family-name:var(--font-geist-sans)] w-full space-y-4 ml-30">
//         {(posts ?? []).map((post) => (
//           <div
//             key={post.id}
//             className="bg-white p-4 rounded-lg shadow-md w-1/3 border-2 border-black flex flex-col items-start justify-start"
//           >
//             <span className="text-sm text-gray-600">{post.author.name}</span>
//             <span className="font-semibold ">{post.title}</span>
//             <span className="text-sm text-gray-600">{post.content}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import prisma from "../../../lib/prisma";

export default async function PostsPage(){
    const users = await prisma.user.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Travel Posts
      </h1>
      <div className="flex justify-start w-full">
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user: any) => (
            <div className="ml-12 gap-5">
          <ol key={user.id} className="mb-5 text-2xl font-bold">
            {user.name}
          </ol>
          </div>
        ))}
      </ol>
      </div>
    </div>
  );
}
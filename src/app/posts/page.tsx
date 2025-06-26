import Link from "next/link";
import prisma from "../../../lib/prisma";
import { createPost } from "../../actions/action";
export default async function PostsPage(){
    const posts = await prisma.post.findMany({
        include:{
            author:true,
        },
        // where:{
        //     title:{
        //         endsWith:""
        //     }
        // },
        // orderBy:{
        //     createdAt:"desc"
        // },
        // select:{
        //     id:true,
        //     title:true,
        // },
        // take:1,
        // skip:1

    });
    

    const postsCount = await prisma.post.count();
  return (
    <div className="min-h-screen  flex flex-col justify-start items-start ml-24 mt-40">
        
      <h1 className="text-4xl font-bold  mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Travel Posts {(`(${postsCount})`)}
      </h1>
      <div className="w-1/2">
      <form action={createPost}>
        <div className="flex flex-col gap-5 ">
        <input type="text" name="title" placeholder="Title" className=" border-2 border-black p-2 rounded-lg px-5 py-2 w-1/2" />
        <div className="flex flex-col gap-5">
        <textarea name="content" rows={5} className=" border-2 border-black p-2 rounded-sm px-5 py-5 w-2/3" placeholder="Content" />
        <button type="submit" className=" flex justify-center items-center border-2 border-black  p-2 rounded-lg w-1/3  bg-blue-300">Create Post</button>
        </div>
       </div>
      </form>
      </div>
      <div className="flex flex-col  justify-start w-full gap-9 mt-5">
     
        {posts.map((post: any) => (
            <div className=" gap-9 bg-white p-5 rounded-lg border-2 border-black w-3/4" key={post.id}>
          <h2 key={post.id} className="mb-2 text-2xl font-bold">
            {post.title}
          </h2>
          <Link href={`/posts/${post.slug}`}>{post.content}</Link>
          <p className="text-gray-500 mt-4"> Written by {post?.author?.name}</p>
          </div>
        ))}
 
      </div>
      <div className="mb-23">

      </div>
    </div>
  );
}
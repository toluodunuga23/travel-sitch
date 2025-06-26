import Link from "next/link";
import prisma from "../../../../lib/prisma";

export default async function PostPage({params}: {params: {slug: string}}){
    const posts =  await prisma.post.findUnique({
        where:{
            slug: params.slug,       
        }
    })

    return(
        <>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
       <h1 className="text-2xl bold">{posts?.title}</h1>
       <p className=" bold">{posts?.content}</p>
       <Link href="/posts">Back to posts</Link>
        </main>
        </>
    )
}
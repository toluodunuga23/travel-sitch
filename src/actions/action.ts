"use server"
import prisma from "../../lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
    await prisma.post.create({
        data:{
            title: formData.get("title") as string,
            slug: (formData.get("title") as string).replace(/\s/g, "-").toLowerCase(),
            content: formData.get("content") as string,
        
        },
    })
    revalidatePath("/posts")
    
}

export async function editPost(formData: FormData) {
    await prisma.post.update({
        where:{
            slug: formData.get("slug") as string,
        },
        data:{
            title: formData.get("title") as string,
            slug: (formData.get("title") as string).replace(/\s/g, "-").toLowerCase(),
            content: formData.get("content") as string,
        },
    })
    
}

export async function deletePost(id: number) {
    await prisma.post.delete({where:{id}}) 
}
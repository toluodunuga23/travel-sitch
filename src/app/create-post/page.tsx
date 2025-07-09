"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpcApp } from "@/utils/trpcApp";
import { redirect } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  // Get Bob ID using tRPC query - Temporary Test - Will Change to Login User
  const { data: bobId } = trpcApp.user.getUserByName.useQuery({ name: "Bob" });
  console.log("bobId", bobId);


  const postSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2).max(500),
    authorId: z.number(),
  });
  const createPostMutation = trpcApp.post.createPost.useMutation();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      authorId: bobId?.id || 2,
    },
  });

    function onSubmit(values: z.infer<typeof postSchema>) {
    console.log("Post Created", values);
    createPostMutation.mutate({
      title: values.title,
      content: values.content,
      authorId: bobId?.id || 2,
    });
    redirect("/posts");
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
      <h2 className="font-bold text-3xl"> Create a Post</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Please provide the following information for your post.
      </p>
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="i.e. My First Post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="i.e. Love Central Park" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;

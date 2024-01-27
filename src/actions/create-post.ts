'use server'

import { auth } from "@/auth";
import paths from "@/paths";
import db from "@/db";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface createTopicFormStateType {
  errors: {
    title?: string[],
    content?: string[],
    _form?: string[]
  }
}

export async function createPost(slug: string, formState: createTopicFormStateType, formData: FormData)
  : Promise<createTopicFormStateType> {
  const createTopicSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
  })
  const title = formData.get('title');
  const content = formData.get('content');

  const result = createTopicSchema.safeParse({
    title,
    content
  })

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors
    }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a new post.']
      }
    }
  }

  let post: Post
  try {
    const topic = await db.topic.findUnique({
      where: {
        slug
      }
    });
    if(!topic) {
      return {
        errors: {
          _form: ['No such topic exists']
        }
      }
    }
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error)
      return { errors: { _form: [err.message] } }
    return { errors: { _form: ['Something went wrong'] } }
  }

  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id));
}

'use server'

import { auth } from "@/auth";
import paths from "@/paths";
import db from "@/db";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface createTopicFormStateType {
  errors: {
    name?: string[],
    description?: string[],
    _form?: string[]
  }
}

export async function createTopic(formState: createTopicFormStateType, formData: FormData): Promise<createTopicFormStateType> {
  const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes without spaces' }),
    description: z.string().min(10)
  })
  const name = formData.get('name');
  const description = formData.get('description');

  const result = createTopicSchema.safeParse({
    name,
    description
  })

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors
    }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a new topic.']
      }
    }
  }

  let topic: Topic
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error)
      return { errors: { _form: [err.message] } }
    return { errors: { _form: ['Something went wrong'] } }
  }

  revalidatePath('/')
  redirect(paths.topicShow(topic.slug));
}

'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Input, Textarea } from "@nextui-org/react";
import * as actions from '@/actions'
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

export default function PostCreateForm({ slug }: { slug: string }) {
  const [formState, action] = useFormState(actions.createPost.bind(null, slug), {
    errors: {}
  })
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">New Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement="outside"
              placeholder="Write a short description"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {
              formState.errors._form ?
                <div className="text-red-600 bg-red-100 p-2 rounded">{formState.errors._form.join(', ')}</div> : null
            }

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

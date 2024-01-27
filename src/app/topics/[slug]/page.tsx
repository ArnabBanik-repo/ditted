import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import db from "@/db";
import { fetchPostsBySlug } from "@/db/queries/posts";

export default function TopicShowPage({ params }: { params: { slug: string } }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl m-2 capitalize ">{params.slug}</h1>
        <PostList fetchPosts={() => fetchPostsBySlug(params.slug)} />
      </div>
      <div>
        <PostCreateForm slug={params.slug} />
      </div>
    </div>
  )
}

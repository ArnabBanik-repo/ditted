import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import { redirect } from "next/navigation";

export default function Search({ searchParams }: { searchParams: { term: string } }) {
  const { term } = searchParams;
  if(!term)
    redirect('/')
  return (
    <div>
      <PostList fetchPosts={() => fetchPostsBySearchTerm(term)}/>
    </div>
  )
}

import { getPosts } from "@/util/postLoader";
import Card from "./card";

export default function Posts() {
  const posts = getPosts();
  console.log(posts)
  return (
    <div className="w-[100vw] flex flex-col items-center justify-center gap-0 text-white font-js">
      {posts.map(post => (
        < Card title="hello" >
          {post.slug}
        </Card>
      )}

    </div >
  )
}

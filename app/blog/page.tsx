import Posts from "@/components/blog/posts";
import Title from "@/components/blog/title";

export default function Blog() {
  return (
    <div className="flex flex-col gap-10">
      <Title />
      <Posts />
    </div>
  )
}

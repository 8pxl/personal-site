import Card from "@/components/blog/card";
import Posts from "@/components/blog/posts";
import Title from "@/components/blog/title";

export default function Blog() {
  const height = 1000;
  return (
    <div className="flex flex-col gap-10">
      <Title />
      <Posts />
    </div>
  )
}

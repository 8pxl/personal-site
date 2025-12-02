import fs from "fs";
import path from "path";

export function getPosts() {
  const postDir = path.join(process.cwd(), "public/data/markdown");
  return fs.readdirSync(postDir)
    .filter(file => file.endsWith(".mdx"))
    .map(file => ({
      slug: file.replace(".mdx", "")
    }));
}

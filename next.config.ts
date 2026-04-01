import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names (strings) + serializable options.
    // See: https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          // Site is effectively dark; keep output simple + high contrast.
          theme: "github-dark",
          keepBackground: false,
        },
      ],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

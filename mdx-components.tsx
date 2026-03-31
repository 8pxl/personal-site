import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className={
        "text-2xl md:text-3xl lg:text-4xl italic tracking-tight mt-8 mb-3"
      }
    />
  ),
  p: (props) => <p {...props} className="text-base md:text-lg opacity-95" />,
  ul: (props) => <ul {...props} className="list-disc pl-6 space-y-2" />,
  li: (props) => <li {...props} className="text-base md:text-lg opacity-95" />,
  a: (props) => (
    <a {...props} className="underline hover:text-[#78A1BB] duration-200" />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

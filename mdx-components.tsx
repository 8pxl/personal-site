import type { MDXComponents } from "mdx/types";

function cx(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

const components: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className={
        "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mt-8 mb-3"
      }
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className={
        "text-2xl md:text-3xl lg:text-3xl font-bold tracking-tight mt-8 mb-3"
      }
    />
  ),

  h4: (props) => (
    <h3
      {...props}
      className={
        "text-xl md:text-2xl lg:text-2xl font-bold tracking-tight mt-8 mb-3"
      }
    />
  ),
  p: (props) => <p {...props} className="text-base md:text-lg opacity-95" />,
  ul: (props) => <ul {...props} className="list-disc pl-6 space-y-2" />,
  ol: (props) => <ol {...props} className="list-decimal pl-6 space-y-2" />,
  li: (props) => <li {...props} className="text-base md:text-lg opacity-95" />,
  a: (props) => (
    <a {...props} className="underline hover:text-[#78A1BB] duration-200" />
  ),
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={cx(
        "my-5 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4",
        "text-[13px] leading-relaxed md:text-sm",
        className
      )}
    />
  ),
  code: ({ className, ...props }) => {
    const isBlockCode =
      "data-language" in props || "data-theme" in props || "data-line" in props;

    return (
      <code
        {...props}
        className={cx(
          isBlockCode ? undefined : "rounded bg-white/10 px-1.5 py-0.5 text-[0.9em]",
          className
        )}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}

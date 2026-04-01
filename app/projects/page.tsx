import { Link as TransitionLink } from "next-transition-router";
import { projects } from "@/components/projects/projectsData";

export default function Projects() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-[calc(80vw)] self-center text-white font-js mt-10 flex flex-col gap-8">
        <div className="flex items-end justify-between gap-6">
          <div className="text-3xl md:text-4xl lg:text-5xl italic">projects</div>
          <TransitionLink
            href="/"
            className="text-sm md:text-base italic hover:text-[#78A1BB] duration-300"
          >
            home
          </TransitionLink>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <TransitionLink
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="text-2xl md:text-3xl hover:tracking-wide duration-300 underline italic"
            >
              {p.title}
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  );
}

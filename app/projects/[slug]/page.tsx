import { getProject, projects } from "@/components/projects/projectsData";
import { notFound } from "next/navigation";

import VexBody from "@/app/projects/_content/vex.mdx";
import MarsBody from "@/app/projects/_content/mars.mdx";
import KeejlibBody from "@/app/projects/_content/keejlib.mdx";

const bodies = {
  vex: VexBody,
  mars: MarsBody,
  keejlib: KeejlibBody,
} as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Body = (bodies as Record<string, React.ComponentType | undefined>)[slug];
  if (!Body) notFound();

  return (
    <div className="font-js leading-relaxed">
      <Body />
    </div>
  );
}

import { getProject, projects } from "@/components/projects/projectsData";
import { notFound } from "next/navigation";
import ProjectBody from "@/components/projects/ProjectBody";

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

  return <ProjectBody body={project.body} />;
}

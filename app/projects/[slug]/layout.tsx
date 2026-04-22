import ProjectTemplate from "@/components/projects/ProjectTemplate";
import { getProject } from "@/components/projects/projectsData";
import { notFound } from "next/navigation";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <ProjectTemplate
      title={project.title}
      videoSrc={project.videoSrc}
      imageSrc={project.imageSrc}
      externalLink={project.externalLink}
    >
      {children}
    </ProjectTemplate>
  );
}

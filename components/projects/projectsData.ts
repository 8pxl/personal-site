export type ProjectSlug = "vex" | "mars" | "keejlib" | "discovery";

export type Project = {
  slug: ProjectSlug;
  title: string;
  videoSrc?: string;
  imageSrc?: string;
  externalLink: string;
};

export const projects: Project[] = [
  {
    slug: "vex",
    title: "VEX Robotics",
    videoSrc: "/assets/r1.mp4",
    externalLink: "https://www.youtube.com/watch?v=dGqBq1Zsa4k",
  },
  {
    slug: "mars",
    title: "mars",
    videoSrc: "/assets/mars.mp4",
    externalLink: "https://github.com/8pxl/mars-rs",
  },
  {
    slug: "keejlib",
    title: "KeejLib",
    videoSrc: "/assets/keejlib.mp4",
    externalLink: "https://github.com/8pxl/keejLib",
  },
  {
    slug: "discovery",
    title: "ECE discovery project",
    imageSrc: "/discovery/IMG_5453.jpeg",
    externalLink: "/projects/discovery",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

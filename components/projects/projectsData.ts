export type ProjectSlug = "vex" | "mars" | "keejlib";

export type Project = {
  slug: ProjectSlug;
  title: string;
  videoSrc: string;
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

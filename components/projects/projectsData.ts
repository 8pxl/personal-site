export type ProjectSlug = "vex" | "mars" | "keejlib";

export type Project = {
  slug: ProjectSlug;
  title: string;
  videoSrc: string;
  externalLink: string;
  body: string;
};

export const projects: Project[] = [
  {
    slug: "vex",
    title: "VEX Robotics",
    videoSrc: "/assets/r1.mp4",
    externalLink: "https://www.youtube.com/watch?v=dGqBq1Zsa4k",
    body:
      "VEX Robotics project page.\n\nWrite your content with Pretext here.\n\nTopics: design process, CAD, programming, competition results, lessons learned.",
  },
  {
    slug: "mars",
    title: "mars",
    videoSrc: "/assets/mars.mp4",
    externalLink: "https://github.com/8pxl/mars-rs",
    body:
      "mars (monkey assisted robot simulator).\n\nWrite your content with Pretext here.\n\nTopics: physics model, path planning, motion profiling, Rust + rendering.",
  },
  {
    slug: "keejlib",
    title: "KeejLib",
    videoSrc: "/assets/keejlib.mp4",
    externalLink: "https://github.com/8pxl/keejLib",
    body:
      "KeejLib.\n\nWrite your content with Pretext here.\n\nTopics: API, Pure Pursuit, PID/motion profiling, how to use, examples.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

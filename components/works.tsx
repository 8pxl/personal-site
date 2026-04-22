import { Link as TransitionLink } from "next-transition-router";
import WorkVideo from "@/components/media/WorkVideo";
import Image from "next/image";
interface WorkProp {
  name: string;
  page: string;
  src?: string;
  image?: string;
  link: string;
  desc: string;
  left: boolean;
}
export function Work({ name, page, src, image, link, desc, left }: WorkProp) {
  // onClick={() => window.open(src, "_blank")}
  // <a target="_blank" href={link}></a>
  const media = src ? (
    <WorkVideo src={src} left={left} href={link} />
  ) : image ? (
    <TransitionLink href={"/projects/" + page}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden hover:scale-[1.02] duration-500 ease-in-out">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    </TransitionLink>
  ) : null;
  const text = (
    <div className="flex flex-col justify-between gap-3 md:w-[23%] md:justify-start lg:gap-10 z-1">
      <div className="font-bold">
        {name}
      </div>
      <div className="text-sm">
        {desc}
        <br />
        <br />
        <div className="font-bold hover:px-2 duration-500 ease-in-out">
          <TransitionLink href={"/projects/" + page}>read more {'>>'}</TransitionLink>
        </div>
      </div>
    </div>
  )
  return (
    <div suppressHydrationWarning className="flex flex-col md:flex-row gap-2 fade-up-s">
      <div className={"w-full md:w-[77%] " + (left ? "md:order-1" : "")}>
        {media}
      </div>

      {text}
    </div>)
}
interface SiteLink {
  name: string;
  link: string;
}
export function SiteLink({ name, link }: SiteLink) {
  return (
    <div className="text-6xl md:text-8xl lg:text-9xl text-center tracking-tighter hover:tracking-wider duration-500 italic underline hover:text-red-300 hover:scale-110 hover:rotate-[1.5deg]">
      <a target="_blank" href={link}>{name}</a>
    </div>
  )
}

export default function Works() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6">
        <div suppressHydrationWarning className="text-2xl md:text-3xl lg:text-4xl fade-up-s">
          02. WORKS
        </div>
        <div className="flex flex-col gap-8">
          <Work
            name="VEX Robotics"
            page="vex"
            src="/assets/r1.mp4"
            link="https://www.youtube.com/watch?v=dGqBq1Zsa4k"
            desc="Designed, built, programmed, and drove competition robots for VRC. Ranked #6 in the world in 2024 and achieved the #1 World Driver Skills in 2023."
            left={false}
          />
          <Work
            name="mars"
            page="mars"
            src="/assets/mars.mp4"
            link="https://github.com/8pxl/mars-rs"
            desc="mars (monkey assisted robot simulator) is an open source Rust app simulating the physical behavior of a differential drive wheeled robot. Used to develop and test movement algorithms and 2D motion-profiling. Bezier and linear path planning capabilities assisted in programming real-life robots."
            left={true}
          />
          <Work
            name="KeejLib"
            page="keejlib"
            src="/assets/keejlib.mp4"
            link="https://github.com/8pxl/keejLib"
            desc="KeejLib is an open-source PROS library for VEX competition robots. It has algorithms for moving robots using Pure Pursuit, motion profiling, and PID control. It is a beginner friendly yet powerful system for developing autonomous routines."
            left={false}
          />
          <Work
            name="ECE Discovery Project"
            page="discovery"
            image="/discovery/IMG_5453.jpeg"
            link="/projects/discovery"
            desc="A custom designed small differential-drive robot"
            left={true}
          />
          <div className="relative h-[90vh] justify-centers mt-[10vh]">
            <div className="absolute top-0 left-0">
              <div className="text-4xl md:text-5xl lg:text-5xl w-min absolute italic tracking-tight ">
                <div suppressHydrationWarning className="rotate-[-20deg] origin-center fade-up-s">
                  some
                </div>
                <div suppressHydrationWarning className="fade-up-s ml-10 font-bold">
                  cool
                </div>
                <div suppressHydrationWarning className="fade-up-s rotate-[10deg] origin-center">
                  websites
                </div>
              </div>
            </div>
            <div suppressHydrationWarning className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fade-up-s rotate-[-6deg]">
              <SiteLink
                name="amiheavy?"
                link="https://amiheavy.keijay.me/"
              />
              <SiteLink
                name="amiqualledyet?"
                link="https://amiqualled.keijay.me/"
              />
              <SiteLink
                name="copify"
                link="https://copify.keijay.me/"
              />
              <div className="text-center font-space mt-3">
                .keijay.me
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

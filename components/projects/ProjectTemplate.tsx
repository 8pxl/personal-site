import { Link as TransitionLink } from "next-transition-router";
import WorkVideo from "@/components/media/WorkVideo";

type Props = {
  title: string;
  videoSrc: string;
  externalLink?: string;
  children: React.ReactNode;
};

export default function ProjectTemplate({
  title,
  videoSrc,
  externalLink,
  children,
}: Props) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-[calc(80vw)] self-center text-white font-js mt-10 flex flex-col gap-6">
        <div className="flex items-end justify-between gap-6">
          <div className="text-4xl md:text-6xl lg:text-7xl font-hero tracking-tight">
            {title}
          </div>

          <div className="font-bold hover:px-2 duration-500 ease-in-out">
            <TransitionLink href="/"> {"<<"} back</TransitionLink>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <WorkVideo src={videoSrc} href={externalLink} />
        </div>

        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const PretextBlock = dynamic(() => import("@/components/projects/PretextBlock"), {
  ssr: false,
});

type Props = {
  body: string;
};

export default function ProjectBody({ body }: Props) {
  return (
    <PretextBlock
      className="text-base md:text-lg"
      text={body}
      font={'400 18px "Josefin Slab", serif'}
      lineHeight={28}
    />
  );
}

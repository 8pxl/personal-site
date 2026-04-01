type Props = {
  src: string;
  left?: boolean;
  controls?: boolean;
  href?: string;
  wrapperClassName?: string;
  className?: string;
};

export default function WorkVideo({
  src,
  left = false,
  controls = false,
  href,
  wrapperClassName = "",
  className = "",
}: Props) {
  const video = (
    <video
      loop
      autoPlay
      muted
      playsInline
      controls={controls}
      className={
        "w-full z-0 hover:scale-105 duration-500 rounded-xl " +
        (left ? "hover:rotate-[2deg]" : "hover:rotate-[-2deg]") +
        (className ? ` ${className}` : "")
      }
    >
      <source src={src} />
    </video>
  );

  if (!href) return video;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={wrapperClassName}
    >
      {video}
    </a>
  );
}

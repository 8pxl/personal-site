export default function ResumePage() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-[min(92vw,1100px)] self-center text-white font-js mt-10 flex flex-col gap-6">
        <div className="flex items-end justify-between gap-6">
          <div className="text-3xl md:text-4xl lg:text-5xl italic">resume</div>
          <a
            href="/resume.pdf"
            download
            data-transition-ignore
            className="text-sm md:text-base italic underline hover:text-[#78A1BB] duration-300"
          >
            download
          </a>
        </div>

        <a
          href="/resume.pdf"
          data-transition-ignore
          className="text-sm italic underline hover:text-[#78A1BB] duration-300 w-fit"
        >
          open pdf
        </a>

        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <iframe
            title="Resume PDF preview"
            src="/resume.pdf"
            className="w-full h-[75vh]"
          />
        </div>

        <div className="text-sm opacity-80">
          If the preview is blank, open <a className="underline" href="/resume.pdf" data-transition-ignore>resume.pdf</a> directly.
        </div>
      </div>
    </div>
  );
}

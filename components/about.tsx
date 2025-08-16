import Image from 'next/image'
export default function About() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6">
                <div data-gsap="" className="fade-up-s text-2xl md:text-3xl lg:text-4xl">
                    01. ABOUT
                </div>
                <div data-gsap="" className="fade-up-s about-text text-justify">
                    I've spent more than half of my life designing, building, and programming awesome robots. Combining spaghetti code and sketchy wiring to create something that actually <em>exists</em> in the real world is beyond captivating to me. I'm especially excited about the intersection between robotics and artificial intelligence, where emerging technologies like VLA's actively rewriting how we think about robotics.
                </div>

                <div className="w-full flex justify-center">
                    <div className="about-image-wrapper w-full md:w-[50vw] lg:w-[45vw] relative mt-6 z-1 aspect-square mb-6">
                        <Image alt='photo of handsome man' loading="eager" src="assets/about1.jpeg" className="aboutImage absolute left-0"  />
                        <Image alt='photo of handsome man' loading="eager" src="assets/about2.jpeg" className="aboutImage absolute top-[31.3%] left-[50%] z-2 -translate-x-1/2" />
                        <Image alt='photo of handsome man' loading="eager" src="assets/about3.jpeg" className="aboutImage absolute top-[62.6%] left-[50%] z-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}
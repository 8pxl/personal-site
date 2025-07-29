export default function About() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6">
                <div data-gsap="aboutFade" className="text-2xl">
                    01. ABOUT
                </div>
                <div data-gsap="aboutFade" className="about-text text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                </div>

                <div className="w-full flex justify-center">
                    <div className="about-image-wrapper w-full md:w-[50vw] lg:w-[45vw] relative mt-6 z-1 aspect-square mb-6">
                        <img loading="eager" src="assets/img1.webp" className="aboutImage absolute left-0" />
                        <img loading="eager" src="assets/img2.webp" className="aboutImage absolute top-[31.3%] left-[50%] z-2 -translate-x-1/2" />
                        <img loading="eager" src="assets/img3.webp" className="aboutImage absolute top-[62.6%] left-[50%] z-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}
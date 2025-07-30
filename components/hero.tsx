export default function Hero() {
    return (
        <div className="w-full h-[calc(100vh-15rem)] justify-center flex js-bold text-white mt-50 ">
            <div className="flex flex-col text-left font-js w-[calc(85vw)] ease-in-out duration-600" >
                <div data-gsap="line1" className="fade slide-down text-base md:text-lg lg:text-xl italic mb-4 ">
                    Hello, my name is
                </div>
                <div data-gsap="line2" className="fade text-5xl md:text-7xl lg:text-8xl font-js-bold">
                    Keijay Huang.
                </div>
                <div data-gsap="line3" className="fade text-xl md:text-2xl lg:text-3xl font-js-bold">
                    I design and program robots.
                </div>
                <div data-gsap="line4" className="fade slide-up mt-4 mr-20 italic">
                    I am a computer engineer at Georgia Tech, passionate about combining hardware and software to create exciting robots!
                </div>
            </div>
        </div>
    )
}
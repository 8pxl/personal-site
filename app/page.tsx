import Starfield from "@/components/starfield";
import ScrollWrapper from "@/components/scrollWrapper";
import {intro} from "@/anim/scroll";

export default function Home() {
  const height = 5000;
  // intro();
  return (
    <main>
      <ScrollWrapper
        moving={
          <div className={"js-bold flex gap-10 p-10 grainy-background h-[5000px]"} >
            {/* <title>8198X</title> */}
            <div className="w-screen h-35 justify-center flex js-bold text-white mt-50 ">
              <div className="flex flex-col text-left font-js w-150 md:w-200 lg:w-300 ease-in-out duration-600" >
                <div data-gsap="line1" className="text-s md:text-lg lg:text-xl italic mb-4 ">
                  Hello, my name is
                </div>
                <div data-gsap="line2" className="text-5xl md:text-7xl lg:text-8xl font-js-bold">
                  Keijay Huang.
                </div>
                <div data-gsap="line3" className="text-xl md:text-2xl lg:text-3xl font-js-bold">
                  I design and program robots.
                </div>
                <div data-gsap="line4" className="mt-4 mr-20 italic">
                I am a computer engineer at Georgia Tech passionate about combining hardware and software to create exciting robots!
                </div>
              </div>
            </div>

            <Starfield height={height}></Starfield>
          </div>
        }
      />

    </main>
  );
}


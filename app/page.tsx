import Starfield from "@/components/starfield";
import ScrollWrapper from "@/components/scrollWrapper";
import Hero from "@/components/hero";
import SocialLinks from "@/components/socials";
import Email from "@/components/email";

//https://coolors.co/283044-78a1bb-ebf5ee-bfa89e-8b786d

export default function Home() {
  const height = 5000;
  // intro();
  return (
    <main>
      <ScrollWrapper
        moving={
          <div className={"p-10 grainy-background h-[5000px]"} >
            <div className="flex flex-col">
              <Hero/>
              <div className="w-full flex flex-col justify-center">
                <div className="flex self-center flex-row font-js w-[calc(80vw)] text-white gap-2 text-xl">
                  <div className="font-mono">
                  +
                  </div>
                  <div className="bg-white self-center w-full h-[calc(0.03rem)] animLine">

                  </div>
                  <div className="font-mono">
                    +
                  </div>
                </div>
                <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6">
                  <div data-gsap="aboutFade" className="text-2xl">
                  01. ABOUT
                  </div>
                <div data-gsap="aboutFade" className="about-text text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                  </div>
                </div>
              </div>
            </div>
            <Starfield height={height}></Starfield>
          </div>
        }
        fixed={
          <div>
            <SocialLinks></SocialLinks>
            <Email/>
          </div>
        }
      />

    </main>
  );
}


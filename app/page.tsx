import Starfield from "@/components/starfield";
import ScrollWrapper from "@/components/scrollWrapper";

export default function Home() {
  const height = 5000;
  return (
    <main>
      <ScrollWrapper
        moving = {
          <div className={"js-bold flex gap-10 p-10 grainy-background h-[5000px]"} >
                    {/* <title>8198X</title> */}
                    <div className="w-screen h-25 justify-center text-8xl js-bold text-white text-center mt-25 outline-1">
                      Lorem ipsum dolor
                    </div>

            <Starfield height={height}></Starfield>
          </div>
        }
      />

    </main>
  );
}


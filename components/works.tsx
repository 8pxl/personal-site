interface WorkProp {
    name: string;
    desc: string;
    left: boolean;
}
export function Work({ name, desc, left }: WorkProp) {
    const video = (
        <video loop autoPlay muted className={"w-full md:w-7/9 z-0 hover:scale-105 duration-500 rounded-xl " + (left ? "md:order-1 hover:rotate-[2deg]" : "hover:rotate-[-2deg]")}>
            <source src="assets/work1.mov" />
        </video>
    )
    const text = (
        <div className="flex flex-col justify-between gap-3 md:justify-start lg:gap-10 z-1">
            <div className="font-bold">
                {name}
            </div>
            <div className="text-sm">
                {desc}
            </div>
        </div>
    )
    return (
        <div className="flex flex-col md:flex-row gap-2 fade-up-s">
            {video}
            {text}
        </div>)
}
export function SiteLink({ name, link } : any) {
    return (
        <div className="text-7xl md:text-8xl lg:text-9xl text-center tracking-tighter hover:tracking-wider duration-500 italic underline hover:text-red-300 hover:scale-110 hover:rotate-[1.5deg]">
            <a target = "_blank" href={link}>{name}</a>
        </div>
    )
}

export default function Works() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6">
                <div className="text-2xl md:text-3xl lg:text-4xl fade-up-s">
                    02. WORKS
                </div>
                <div className="flex flex-col gap-8">
                    <Work
                        name="VEX Robotics"
                        desc="Designed, built, programmed, and drove competition robots for VRC. Ranked #6 in the world in 2024 and achieved the #1 World Driver Skills in 2023."
                        left={false}
                    />
                    <Work
                        name="mars"
                        desc="mars (monkey assisted robot simulator) is an open source Rust app simulating the physical behavior of a differential drive wheeled robot. Used to develop and test movement algorithms and 2D motion-profiling. Bezier and linear path planning capabilities assisted in programming real-life robots."
                        left={true}
                    />
                    <Work
                        name="KeejLib"
                        desc="KeejLib is an open-source PROS library for VEX competition robots. It has algorithms for moving robots using Pure Pursuit, motion profiling, and PID control. It is a beginner friendly yet powerful system for developing autonomous routines."
                        left={false}
                    />
                    <div className="relative h-[100vh] justify-centers mt-[10vh]">
                        <div className="absolute top-0 left-0">
                        <div className="text-4xl md:text-5xl lg:text-6xl w-min absolute italic tracking-tight ">
                                <div className = "rotate-[-20deg] origin-center fade-up-s">
                                    some
                                </div>
                                <div className="fade-up-s ml-10 font-bold">
                                    cool
                                </div>
                                <div className="fade-up-s rotate-[10deg] origin-center">
                                    websites
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fade-up-s rotate-[-6deg]">
                            <SiteLink
                                name = "amiheavy?"
                                link="https://amiqualled.keijay.me/"
                            />
                            <SiteLink
                                name = "amiqualledyet?"
                                link="https://amiqualled.keijay.me/"
                            />
                            <SiteLink
                                name = "copify"
                                link="https://amiqualled.keijay.me/"
                            />
                            <div className="text-center font-space mt-3">
                                .keijay.me
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
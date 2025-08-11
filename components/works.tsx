interface WorkProp {
    name: string;
    desc: string;
}
export function Work({ name, desc }: WorkProp) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <video loop autoPlay muted className="w-full md:w-7/9">
                <source src="assets/work1.mov" />
            </video>
            <div className="flex flex-col justify-between gap-3 lg:justify-start lg:gap-10">
                <div className="font-bold">
                    {name}
                </div>
                <div className="text-sm">
                    {desc}
                </div>
            </div>
        </div>)
}
export default function Works() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-[calc(80vw)] self-center text-white font-js mt-6 flex flex-col gap-6 fade-up-s">
                <div className="text-2xl">
                    02. WORKS
                </div>
                <div>
                    <Work 
                        name="VEX Robotics" 
                        desc="Designed, built, programmed, and drove competition robots for VRC. Ranked #6 in the world in 2024 and achieved the #1 World Driver Skills in 2023." 
                    />
                </div>
            </div>
        </div>
    )
}
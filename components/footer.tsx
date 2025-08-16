"use client"

export default function Footer() {
    return(

        <div className={"w-full h-[10vh] backdrop-blur-xs flex align-middle justify-center border-dashed border-t-1 border-white"}>
            <div className="text-white font-js text-center text-xs w-1/3 md:text-sm self-center md:w-1/2 visible md:hidden font-space">
            thank you for visiting! designed and programmed by yours truly.
            </div>
            <div className="text-white font-js text-center text-xs w-1/3 md:text-sm self-center md:w-1/2 hidden md:inline font-space">
            thank you for visiting! designed and programmed by yours truly. built with next.js and tailwind css :)
            </div>
            
        </div>

    )
}

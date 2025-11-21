"use client"
import { ReactNode} from "react";

interface PlanetProps {
  size: number;
}

interface HaloProps {
  size: number;
  color: string;
  top: number;
  left: number;
  children: ReactNode;
}

function Halo({size, color, top, left, children}: HaloProps) {
  const haloWidth = 1.5;
  return(
  <div >
      <div data-speed="1" className = "absolute flex justify-center items-center flex "
      style={{top: `${top}vh`,
          left: `${left}vw`,
}}

      >

      <Planet size={size} top={top} left={left}/>

      <div className="z-1 blur-xs absolute bg-radial from-[#777CFE] to-slate-700/200 rounded-full "
      style={{
        width: `${size + haloWidth}vw`,
        height: `${size + haloWidth}vw`,

      }}
      />
        <div className="z-3 text-white font-js text-lg absolute">
          blog
        </div>
      </div>
  </div>
  )
}
function Planet({size}: PlanetProps) {
  return (
  <div  className="z-2 absolute flex rotate-310 bg-linear-to-t from-[#21203B] to-[#777CFE] rounded-full"
  style={{
    width: `${size}vw`,
    height: `${size}vw`,
  }}
    >
    </div>
  )
}
export default function Planets() {

  return (
  // <Planet size={15}/>
    <>
      <Halo size={4} top={7} left={10}/>
      <Halo size={4} top={7} left={17}/>

</>
  )

}

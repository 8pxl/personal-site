// "use client"

export default function TransitionLayer() {
  return (
    <>
      <div id="transitionCircle" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                rounded-full bg-white w-[50px] h-[50px] scale-0 z-50">
      </div>

      <div id="transitionRing" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                rounded-full outline-[0px] outline-white bg-white w-[1px] h-[1px] scale-none z-51">
      </div>
    </>
  )
}

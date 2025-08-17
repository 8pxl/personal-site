export default function Divider() {
  return (
    <div className="flex self-center flex-row font-js w-[calc(80vw)] text-white gap-2 text-xl">
      <div className="font-mono">
        +
      </div>
      <div className="bg-white self-center w-full h-[1px] min-h-[1px] animLine">
        {/* Safari requires a minimum height of 1px to render consistently */}
      </div>
      <div className="font-mono">
        +
      </div>
    </div>
  )
}

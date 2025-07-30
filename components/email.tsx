"use client";

import { useState } from "react";

export default function Email() {
    const [text, setText] = useState("keijay@gatech.edu")
    function handleClick() {
        navigator.clipboard.writeText("keijay@gatech.edu")
        setText("email copied!")
    }
    return (
        <div onClick={handleClick} data-gsap="" className="fade slide-up font-js text-white fixed bottom-3 right-4 z-1 hover:text-[#78A1BB] cursor-copy">
            {text}
        </div>
    )
}
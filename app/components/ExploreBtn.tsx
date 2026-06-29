"use client";
import Image from "next/image";



const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto border border-emerald-400 shadow-[0_0_20px_0px_rgba(0,200,255,0.5)] hover:bg-emerald-400" onClick={() => console.log('CLICK')}>
    <a href="#events">
        Explore Events
    </a>
     <Image 
    src="/icons/arrow-down.svg"
    alt="arrow-down"
    width={24}
    height={24}
    />
    </button>
  )
}

export default ExploreBtn
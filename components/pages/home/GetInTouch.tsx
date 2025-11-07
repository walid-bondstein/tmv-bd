import Image from "next/image";
import React from "react";
import FormClient from "./FormClientGetInTouch";


export default function GetInTouch() {
  return (
    <div id="get-in-touch" className="component-container mx-auto section-padding-y bg-white">
      <div
        className="2xl:px-22.5
        xl:px-20
        lg:px-16
        md:px-12
        p-4
        rounded-2xl
        2xl:py-17
        xl:py-14
        lg:py-11
        md:py-9
        py-6
        bg-[#D9DEE5]
        flex
        lg:flex-row
        flex-col
        2xl:gap-40
        lg:gap-20
        md:gap-16
        gap-10
        lg:items-center
        lg:justify-between"
      >
        <div className="flex-1 space-y-5">
          <div className="max-w-md">
            <h2 className="font-semibold text-black text-[clamp(2rem,2.8124vw,3.375rem)] text-left">
              Get In Touch
            </h2>
            <p className="text-[clamp(0.7rem,2.8124vw,1rem)] text-[#777F92] text-left">
              Have questions? Our team is here to help you with all your vehicle
              tracking needs. Reach out to us today!
            </p>
          </div>
          <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/get-in-touch-map.jpeg"
              alt="Location map"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <FormClient />
        </div>
      </div>
    </div>
  );
}

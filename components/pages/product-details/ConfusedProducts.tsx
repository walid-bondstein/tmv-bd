import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ConfusedProducts() {
  return (
    <div className="component-container mx-auto relative 2xl:pt-[76px] xl:pt-12 lg:pt-6 md:pb-0 pb-10 pt-10 2xl:mb-28">
      <div className='relative bg-[url("/images/BG.png")] bg-cover bg-center rounded-2xl overflow-hidden flex justify-center items-center min-h-[220px] md:min-h-[280px]'>
        <div className="flex flex-col items-center justify-center text-center px-6 py-10 z-10">
          <h1 className="text-black text-2xl md:text-4xl font-semibold leading-snug mb-4">
            Confused between the <br /> products?
          </h1>

          {/* Button */}
          <Button
           className="bg-gradient-to-r from-[#FDD00E] to-[#F9AA17] hover:from-[#F9AA17] hover:to-[#FDD00E] text-black font-semibold px-8 py-3.5 rounded-lg text-sm md:text-base tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)] min-w-[188px] min-h-[52px] flex items-center justify-center" >
             Talk to Expert
         </Button>


        </div>
      </div>
    </div>
  );
}


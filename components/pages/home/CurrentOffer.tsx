"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import ImageSlider from "@/components/shared/ImageSlider";

export default function CurrentOffer({ offers }: { offers: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("offer") === "open";

  const openOffer = () => {
    const params = new URLSearchParams(searchParams);
    params.set("offer", "open");
    router.replace(`?${params.toString()}`, { scroll: true });
  };

  const closeOffer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("offer");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={openOffer}
        className="bg-white absolute text-primary sm:flex flex-col gap-2 items-center select-none transform justify-center rounded-e-2xl
        md:rounded-e-[30px] px-2 py-4 md:px-3 md:py-18 lg:top-60 md:absolute pt:absolute top-80 cursor-pointer shadow-2xl z-50"
      >
        <p
          className="text-inherit font-bold text-deep-gradient text-sm lg:text-base flex gap-2 -rotate-180 "
          style={{ writingMode: "vertical-rl" }}
        >
          Current Offer
        </p>
      </button>

      {/* Poster */}

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0, x: -100 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 0, x: 100 }}
            transition={{
              duration: 0.5,
              rotate: { duration: 0.5, ease: "easeOut" },
            }}
            className="relative bg-white overflow-hidden rounded-3xl shadow-2xl w-full sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-5xl text-center"
          >
            <div className="w-full aspect-video">
              {/* <Image
                src="/images/Poster.png"
                alt="Certified"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
              /> */}
              <ImageSlider images={offers ?? []} />
            </div>
            <button
              onClick={closeOffer}
              className="bg-gray-500 rounded-full absolute top-3 right-3 text-gray-300 hover:text-black cursor-pointer"
            >
              <X className="p-1" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

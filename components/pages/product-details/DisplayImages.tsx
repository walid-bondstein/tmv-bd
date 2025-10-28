"use client";
import { useState } from "react";
import Image from "next/image";

export default function DisplayProductImages() {
  const images = [
    "/images/gps-map.jpg",
    "/images/mobile-app.jpg",
    "/images/ISO_certified.png",
    "/images/window-shield.png",
    "/images/logo.png",
  ];

  // Manage main image
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="col-span-12 xl:col-span-6 flex flex-col">
      {/* Main Image */}
      <div className="w-full h-auto flex-1 2xl:min-h-[580px] xl:min-h-[480px] min-h-[300px] max-h-[580px] relative rounded-xl flex items-center justify-center bg-gray-50 mb-6 overflow-hidden">
        <Image
          src={mainImage}
          fill
          alt="prod image"
          className="object-contain transition-all duration-300"
        />
      </div>

      {/* Thumbnail Grid (no borders) */}
      <div className="flex justify-start items-center overflow-x-auto gap-3 py-1">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setMainImage(img)}
            className={`relative rounded-lg flex items-center rounded-s-sm overflow-hidden justify-center bg-white shadow-sm h-20 w-20 md:h-32 md:w-32 shrink-0 cursor-pointer transition-all duration-200 ${
              mainImage === img ? "ring-2 ring-yellow-400" : "hover:opacity-80"
            }`}
          >
            <Image
              src={img}
              fill
              alt={`Thumbnail ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

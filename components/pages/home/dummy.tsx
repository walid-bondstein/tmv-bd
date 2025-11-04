"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/switcher";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const partners = [
  { id: 1, src: "/partners/BYD.png", alt: "BYD" },
  { id: 2, src: "/partners/Nestle.png", alt: "Nestle" },
  { id: 3, src: "/partners/Gp.png", alt: "Grameenphone" },
  { id: 4, src: "/partners/IFC.png", alt: "IFC" },
  { id: 5, src: "/partners/Kns.png", alt: "KNS" },
  { id: 6, src: "/partners/Axiata.png", alt: "Axiata" },
  { id: 7, src: "/partners/Therap.png", alt: "Therap" },
  { id: 8, src: "/partners/brac.png", alt: "BRAC" },
  { id: 9, src: "/partners/bat.png", alt: "BAT" },
  { id: 10, src: "/partners/Unilever.png", alt: "Unilever" },
];

export function Partners() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Desktop: 5 per row (10 total), Mobile: 4 per row (8 total)
  const itemsPerView = {
    mobile: 8,
    desktop: 10,
  };

  const totalSlides = Math.ceil(partners.length / itemsPerView.desktop);
  const maxIndex = (totalSlides - 1) * itemsPerView.desktop;

  const visiblePartners = partners.slice(
    currentIndex,
    currentIndex + itemsPerView.desktop
  );
  const visiblePartnersMobile = partners.slice(
    currentIndex,
    currentIndex + itemsPerView.mobile
  );

  const paddedPartners = [
    ...visiblePartners,
    ...Array.from(
      { length: itemsPerView.desktop - visiblePartners.length },
      () => null
    ),
  ];

  const paddedPartnersMobile = [
    ...visiblePartnersMobile,
    ...Array.from(
      { length: itemsPerView.mobile - visiblePartnersMobile.length },
      () => null
    ),
  ];

  const handlePrevious = (spacer: number) => {
    setCurrentIndex((prev) => {
      const newIndex = prev - spacer;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const handleNext = (spacer: number) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + spacer;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 mx-auto my-24">
      <Tabs
        defaultValue="partners"
        className="mx-auto md:space-y-16 space-y-6 w-full"
      >
        <TabsList className="mx-auto component-container">
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="certified">Certified</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity Partners</TabsTrigger>
        </TabsList>

        {/*Certified*/}
        <TabsContent className="component-container mx-auto" value="certified">
          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              { src: "/images/ISO_certified.png", alt: "ISO Certified" },
              { src: "/images/brta-certified.png", alt: "BRTA Certified" },
            ].map((cert, i) => (
              <div key={i} className="w-56">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="grayscale hover:grayscale-0 transition-all duration-1000 object-contain"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </TabsContent>

        {/*Partners*/}
        <TabsContent value="partners">
          {/* Desktop View */}
          <div className="w-full md:flex items-center hidden">
            <div className="grow flex justify-center items-center">
              <div
                onClick={() => handlePrevious(itemsPerView.desktop)}
                className="shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
              >
                <ChevronRight className="rotate-180 p-3 h-14 w-14 -translate-x-0.5" />
              </div>
            </div>

            <div className="component-container mx-auto">
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                  {paddedPartners.map((partner) =>
                    partner ? (
                      <div
                        key={partner.id}
                        className="flex items-center justify-center bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-lg transition-all duration-500"
                      >
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={partner.src}
                            alt={partner.alt}
                            fill
                            className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </AspectRatio>
                      </div>
                    ) : (
                      <div key={Math.random()} className="p-4" />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="grow flex justify-center items-center">
              <div
                onClick={() => handleNext(itemsPerView.desktop)}
                className="shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
              >
                <ChevronRight className="p-3 h-14 w-14 translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="w-full flex items-center md:hidden">
            <div className="component-container mx-auto">
              <div className="flex-1 overflow-hidden space-y-5">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                  {paddedPartnersMobile.map((partner) =>
                    partner ? (
                      <div
                        key={partner.id}
                        className="flex items-center justify-center bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-lg transition-all duration-500"
                      >
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={partner.src}
                            alt={partner.alt}
                            fill
                            className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </AspectRatio>
                      </div>
                    ) : (
                      <div key={Math.random()} className="p-4" />
                    )
                  )}
                </div>
                <div className="mx-auto gap-5 max-w-max flex justify-center items-center">
                  <div
                    onClick={() => handlePrevious(itemsPerView.mobile)}
                    className="shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                  >
                    <ChevronRight className="rotate-180 p-2 h-8 w-8" />
                  </div>
                  <div
                    onClick={() => handleNext(itemsPerView.mobile)}
                    className="shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                  >
                    <ChevronRight className="p-2 h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/*Connectivity Partners*/}
        <TabsContent value="connectivity">
          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              { src: "/images/grameenphone.png", alt: "Grameenphone" },
              { src: "/images/robi.png", alt: "Robi" },
              { src: "/images/banglalink.png", alt: "Banglalink" },
            ].map((conn, i) => (
              <div key={i} className="h-[5.625rem] relative w-56">
                <Image
                  src={conn.src}
                  alt={conn.alt}
                  fill
                  className="object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

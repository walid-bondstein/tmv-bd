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
  { id: 1, src: "/partners/Unilever.png", alt: "Unilever" },
  { id: 2, src: "/partners/JTI.png", alt: "Jti" },
  { id: 3, src: "/partners/Runner.png", alt: "Runner" },
  { id: 4, src: "/partners/Eicher.png", alt: "Eicher" },
  { id: 5, src: "/partners/Partex.png", alt: "Partex" },
  { id: 6, src: "/partners/FedEx.png", alt: "FedEx" },
  { id: 7, src: "/partners/IUT.png", alt: "IUT" },
  { id: 8, src: "/partners/RR-imperial.png", alt: "RR Imperial" },
  { id: 9, src: "/partners/lafarge.png", alt: "Lafarge" },
  { id: 10, src: "/partners/GreenBangla.png", alt: "Green Bangla" },
  { id: 11, src: "/partners/IMS.png", alt: "IMS" },
  { id: 12, src: "/partners/Tarasima.png", alt: "Tarasima" },
  { id: 13, src: "/partners/GTV.png", alt: "GTV" },
  { id: 14, src: "/partners/Ucb.png", alt: "UCB" },
  { id: 15, src: "/partners/dncc.png", alt: "DNCC" },
  { id: 16, src: "/partners/aramIT.png", alt: "Aram IT" },
  { id: 17, src: "/partners/robi.png", alt: "Robi" },
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
          <TabsTrigger value="partners" className="cursor-pointer">
            Partners
          </TabsTrigger>
          <TabsTrigger value="certified" className="cursor-pointer">
            Certified
          </TabsTrigger>
          <TabsTrigger value="connectivity" className="cursor-pointer">
            Connectivity Partners
          </TabsTrigger>
        </TabsList>

        {/*Certified*/}
        <TabsContent className="component-container mx-auto" value="certified">
          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="w-40 md:w-48">
                <AspectRatio ratio={1.8 / 1}>
                  <Image
                    src={"/images/iso.png"}
                    alt="ISO Certified"
                    fill
                    className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out bg-card rounded-lg"
                  />
                </AspectRatio>
              </div>
              <div className="w-40 md:w-48">
                <AspectRatio ratio={1.8 / 1}>
                  <Image
                    src={"/images/btrc.png"}
                    alt="Brtc Certified"
                    fill
                    className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out bg-card rounded-lg"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </TabsContent>

        {/*Partners*/}
        <TabsContent value="partners">
          {/* desktop view */}
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
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-6">
                  {paddedPartners
                    .filter(
                      (itm): itm is { id: number; src: string; alt: string } =>
                        itm !== null
                    )
                    .map((partner) => (
                      <div key={partner.id} className="">
                        <AspectRatio ratio={1.8 / 1}>
                          <Image
                            src={partner.src}
                            alt={partner.alt}
                            fill
                            className="flex items-center justify-center bg-card rounded-lg object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </AspectRatio>
                      </div>
                    ))}
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

          {/* mobile view */}

          <div className="w-full flex items-center md:hidden">
            <div className="component-container mx-auto">
              <div className="flex-1 overflow-hidden space-y-5">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-1 md:gap-6">
                  {paddedPartnersMobile
                    .filter(
                      (itm): itm is { id: number; src: string; alt: string } =>
                        itm !== null
                    )
                    .map((partner) => (
                      <div
                        key={partner.id}
                        className="flex items-center justify-center bg-card rounded-lg md:p-6 hover:shadow-lg transition-shadow duration-500"
                      >
                        <AspectRatio ratio={2 / 1}>
                          <Image
                            src={partner.src}
                            alt={partner.alt}
                            fill
                            className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </AspectRatio>
                      </div>
                    ))}
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

        {/*Connectivity*/}
        <TabsContent value="connectivity">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              "/images/grameenphone.png",
              "/images/robi.png",
              "/images/banglalink.png",
            ].map((src, i) => (
              <div key={i} className="w-40 md:w-48">
                <AspectRatio ratio={1.8 / 1}>
                  <Image
                    src={src}
                    alt="Connectivity Partner"
                    fill
                    className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-transform duration-700 ease-in-out bg-card rounded-lg"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

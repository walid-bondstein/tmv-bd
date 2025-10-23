// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const datas = [
    "/images/appleStore.png",
    "/images/appStore.png",
    "/images/award.png",
    "/images/background.png",
    "/images/background1.png",
    "/images/banglalink.png",
];

export default function OfferSlider({ data = datas }) {
    return (
        <section className="text-white relative space-y-4">
            <h2 className="text-title text-center">Special Offers</h2>
            <Swiper
                modules={[EffectCoverflow, Navigation, Autoplay]}
                effect="coverflow"
                spaceBetween={20}
                slidesPerView={1.5}
                centeredSlides
                loop
                roundLengths
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false, // keep autoplay running after interaction
                    pauseOnMouseEnter: true,
                }}
                speed={3000}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 130,
                    slideShadows: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 20,
                            depth: 80,
                            modifier: 2,
                            slideShadows: false,
                        },
                    },
                    768: {
                        slidesPerView: 1.5,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: -20,
                            depth: 200,
                            modifier: 2,
                            slideShadows: false,
                        },
                    },
                    1024: {
                        slidesPerView: 1.5,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: -40,
                            depth: 150,
                            modifier: 2,
                            slideShadows: false,
                        },
                    },
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index} className="px-10">
                        <AspectRatio ratio={21 / 9} className="rounded-3xl overflow-hidden">
                            <Image
                                src={item}
                                fill
                                alt={`Slide ${index + 1}`}
                            />
                        </AspectRatio>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

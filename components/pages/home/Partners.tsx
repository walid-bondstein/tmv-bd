"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const partners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


export function Partners() {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    // Desktop: 5 per row (10 total), Mobile: 4 per row (8 total)
    const itemsPerView = {
        mobile: 8,
        desktop: 10,
    }

    const totalSlides = Math.ceil(partners.length / itemsPerView.desktop)
    const maxIndex = (totalSlides - 1) * itemsPerView.desktop

    const visiblePartners = partners.slice(currentIndex, currentIndex + itemsPerView.desktop);
    const visiblePartnersMobile = partners.slice(currentIndex, currentIndex + itemsPerView.mobile);

    const paddedPartners = [
        ...visiblePartners,
        ...Array.from({ length: itemsPerView.desktop - visiblePartners.length }, () => (null)),
    ];

    const paddedPartnersMobile = [
        ...visiblePartnersMobile,
        ...Array.from({ length: itemsPerView.mobile - visiblePartnersMobile.length }, () => (null)),
    ]

    const handlePrevious = (spacer: number) => {
        setCurrentIndex((prev) => {
            const newIndex = prev - spacer
            return newIndex < 0 ? maxIndex : newIndex
        })
    }

    const handleNext = (spacer: number) => {
        setCurrentIndex((prev) => {
            const newIndex = prev + spacer
            return newIndex > maxIndex ? 0 : newIndex
        })
    }

    return (
        <div className="flex w-full flex-col gap-6 mx-auto my-24">
            <Tabs defaultValue="certified" className="mx-auto md:space-y-16 space-y-6 w-full">
                <TabsList className="mx-auto component-container">
                    <TabsTrigger value="certified">Certified</TabsTrigger>
                    <TabsTrigger value="partners">Partners</TabsTrigger>
                    <TabsTrigger value="connectivity">Connectivity Partners</TabsTrigger>
                </TabsList>
                <TabsContent className="component-container mx-auto" value="certified">
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <div className="w-56">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src="/images/ISO_certified.png"
                                    alt="Certified"
                                    fill
                                    className="grayscale-100 hover:grayscale-0 transition-all duration-1000"
                                />
                            </AspectRatio>
                        </div>
                        <div className="w-56">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src="/images/brta-certified.png"
                                    alt="Certified"
                                    fill
                                    className="grayscale-100 hover:grayscale-0 transition-all duration-1000"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="partners" className="">

                    <div className="w-full md:flex items-center hidden">
                        <div className="flex-grow flex justify-center items-center">
                            <div
                                onClick={() => handlePrevious(itemsPerView.desktop)}
                                className="flex-shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                            >
                                <ChevronRight className="rotate-180 p-3 h-14 w-14 -translate-x-0.5" />
                            </div>
                        </div>
                        <div className="component-container mx-auto">
                            <div className="flex-1 overflow-hidden">
                                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                                    {paddedPartners.map((partner) => {
                                        if (partner) {
                                            return <div
                                                key={partner}
                                                className="flex items-center justify-center bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-lg transition-shadow"
                                            >
                                                <p>{partner}</p>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow flex justify-center items-center">
                            <div
                                onClick={() => handleNext(itemsPerView.desktop)}
                                className="flex-shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                            >
                                <ChevronRight className="p-3 h-14 w-14 translate-x-0.5" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center md:hidden">
                        <div className="component-container mx-auto">
                            <div className="flex-1 overflow-hidden space-y-5">
                                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                                    {paddedPartnersMobile.map((partner) => {
                                        if (partner) {
                                            return <div
                                                key={partner}
                                                className="flex items-center justify-center bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-lg transition-shadow"
                                            >
                                                <p>{partner}</p>
                                            </div>
                                        }
                                    })}
                                </div>
                                <div className="mx-auto gap-5 max-w-max flex justify-center items-center">
                                    <div
                                        onClick={() => handlePrevious(itemsPerView.mobile)}
                                        className="flex-shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                                    >
                                        <ChevronRight className="rotate-180 p-2 h-8 w-8" />
                                    </div>
                                    <div
                                        onClick={() => handleNext(itemsPerView.mobile)}
                                        className="flex-shrink-0 bg-transparent rounded-full border hover:cursor-pointer hover:bg-amber-300 transition-colors duration-700"
                                    >
                                        <ChevronRight className="p-2 h-8 w-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </TabsContent>
                <TabsContent value="connectivity">
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <div className="h-[5.625rem] relative w-56">
                            <Image
                                src="/images/grameenphone.png"
                                alt="Certified"
                                fill
                                className="grayscale-100 w-auto hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="h-[5.625rem] relative w-56">
                            <Image
                                src="/images/robi.png"
                                alt="Certified"
                                fill
                                className="grayscale-100 w-auto hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="h-[5.625rem] relative w-56">
                            <Image
                                src="/images/banglalink.png"
                                alt="Certified"
                                fill
                                className="grayscale-100 w-auto hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

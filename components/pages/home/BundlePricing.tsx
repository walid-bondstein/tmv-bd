"use client";
import { Product } from "@/app/page";
import { BundlePricingCard } from "./BundlePricingCard";
import { Button } from "@/components/ui/button";
import CounterCard from "@/components/shared/timer/timer";
import BundleCard from "@/components/shared/BundleCard";
import BundleTicket from "@/components/shared/BundleTicket";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getTimeLeft(targetTime: number) {
    const now = Date.now();
    const diff = Math.max(targetTime - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
}

function Countdown({ bundleDate }: { bundleDate: string | null }) {
    //target time to 5 days from now
    const [targetTime] = useState(new Date(bundleDate ?? "")?.getTime());
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetTime));

    useEffect(() => {
        if (!targetTime) return;
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(targetTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);
    if (!targetTime) return null;
    return (
        <div className="flex mx-auto justify-center gap-4 md:mb-8 mb-0">
            <CounterCard title="Days" value={timeLeft.days} delay="0s" />
            <CounterCard title="Hours" value={timeLeft.hours} delay="-0.75s" />
            <CounterCard title="Minutes" value={timeLeft.minutes} delay="-1.5s" />
            <CounterCard title="Seconds" value={timeLeft.seconds} delay="-2.25s" />
        </div>
    );
}

export default function BundlePricing({ bundles, bundleDate }: {
    bundles: Product[],
    bundleDate: string | null,
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 400;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col items-center justify-start w-full bg-black min-h-screen mx-auto py-6 lg:space-y-6 md:space-y-4 space-y-4  mt-4 overflow-hidden bg-no-repeat bg-[url('/images/bundle_pricing-bg.png')]" id="offer"  >
            <div className="max-w-min rounded-full cursor-pointer p-px relative overflow-hidden  mt-14">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-gradient-rotation aspect-square" style={{ animation: 'spin 2s linear infinite', }} />
                <section className="grid z-10">
                    <Button className="flex justify-center items-center rounded-full bg-black hover:bg-black text-white px-6 z-10">
                        <span className="bg-submit bg-clip-text text-transparent font-semibold text-2xl">
                            Current offers
                        </span>
                    </Button>
                </section>
            </div>

            <Countdown bundleDate={bundleDate} />

            {/* Main Offer Heading */}
            <div className="max-w-[955px] mx-auto text-center">
                <h2 className="font-semibold md:text-[54px] text-3xl md:leading-[68px] tracking-[-0.02em] text-white">
                    Discover the best GPS tracking offer <br />
                    in Bangladesh </h2>
            </div>
            {
                bundles.length >= 1 ? <div>
                    <BundleTicket product={bundles[0]} />
                </div> : <div
                    ref={scrollRef}
                    className="w-full max-w-full overflow-x-auto overflow-y-hidden scroll-smooth
                mt-6 pr-4 md:pl-42 flex gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {bundles.map((bundle, index) => (
                        <div
                            key={index}
                            className="min-w-[320px] sm:min-w-[360px] lg:min-w-[440px] shrink-0">
                            <BundleTicket key={index} product={bundle} />
                        </div>
                    ))}
                </div>
            }

            {bundles.length > 1 ? <div className="flex gap-2 mb-8">
                <button
                    onClick={() => scroll("left")}
                    className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-yellow-400 text-white transition">
                    <ChevronLeft size={20} /> </button>
                <button
                    onClick={() => scroll("right")}
                    className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-yellow-400 text-white transition">
                    <ChevronRight size={20} /> </button>
            </div> : ""}

        </div>
    )
}

"use client";

import { useRef } from "react";
import { PricingCard } from "@/components/pages/home/PricingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/app/page";

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "VTS Regular",
      description:
        "Real-time tracking, smart alerts, route history, and 25+ features with a 1-year warranty.",
      mrp: 5499,
      discountPercent: 14.3,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["Real-time tracking", "Smart alerts", "Route history"],
      image: "/images/vts-regular.png",
    },
    {
      id: 2,
      name: "VTS Regular + Voice",
      description:
        "Live GPS tracking with voice, smart alerts, and a 1-year warranty.",
      mrp: 5999,
      discountPercent: 14.3,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["Live GPS", "Voice support", "Smart alerts"],
      image: "/images/vts-regular-voice.png",
    },
    {
      id: 3,
      name: "VTS Lite",
      description:
        "Live GPS tracking, alerts, and route history with a 6-month warranty.",
      mrp: 3999,
      subscriptionFee: 399,
      warranty: "6 months",
      features: ["Live GPS", "Alerts", "Route history"],
      image: "/images/vts-lite.png",
    },
    {
      id: 4,
      name: "VTS Portable",
      description:
        "Rechargeable GPS tracker with a 20-day battery and live tracking route insights.",
      mrp: 7500,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["Rechargeable battery", "20-day standby", "Live tracking"],
      image: "/images/vts-portable.png",
    },
    {
      id: 5,
      name: "VTS OBD",
      description:
        "Plug-and-play GPS for new and hybrid vehicles with live tracking and alerts.",
      mrp: 5999,
      discountPercent: 14.3,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["OBD plug-and-play", "Live tracking", "Alerts"],
      image: "/images/vts-obd.png",
    },
    {
      id: 6,
      name: "VTS Intelligent Dashcam",
      description:
        "AI dashcam with live front, back, and cabin view. Detects fatigue and smoking.",
      mrp: 5999,
      discountPercent: 14.3,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["AI detection", "Front & rear camera", "Cabin monitoring"],
      image: "/images/vts-dashcam.png",
    },
    {
      id: 7,
      name: "VTS With Live Video (Front)",
      description:
        "Live GPS tracking with front camera, voice, smart alerts, and 1-year warranty.",
      mrp: 18000,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["Live video", "Front camera", "Smart alerts"],
      image: "/images/vts-live-front.png",
    },
    {
      id: 8,
      name: "VTS With Live Video (Both)",
      description:
        "Live GPS tracking with dual cameras (front & rear), voice, and smart alerts.",
      mrp: 18000,
      subscriptionFee: 499,
      warranty: "1 year",
      features: ["Dual cameras", "Live video", "Smart alerts"],
      image: "/images/vts-live-both.png",
    },
    {
      id: 9,
      name: "VTS Premium Fleet",
      description:
        "Fleet management solution with real-time analytics, reports, and live tracking.",
      mrp: 22000,
      subscriptionFee: 699,
      warranty: "1 year",
      features: ["Fleet analytics", "Driver insights", "Live map view"],
      image: "/images/vts-premium-fleet.png",
    },
    {
      id: 10,
      name: "VTS Pro Advanced",
      description:
        "Advanced tracking device with voice assistant, remote immobilizer, and cloud backup.",
      mrp: 25999,
      subscriptionFee: 699,
      warranty: "2 years",
      features: [
        "Voice assistant",
        "Remote immobilizer",
        "Cloud data backup",
        "Geofence alerts",
      ],
      image: "/images/vts-pro-advanced.png",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full my-16 component-container mx-auto">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Related Products
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-yellow-400 hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-yellow-400 hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[280px] md:w-[300px] bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4"
          >
            <PricingCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

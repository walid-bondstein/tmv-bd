"use client";

import { useRef } from "react";
import { PricingCard } from "@/components/pages/home/PricingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/app/page";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (<>
    {products.length === 0 ? null : <div className="w-full my-16 component-container mx-auto">
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
        {products.map((product, i) => (
          <div
            key={product.id}
            className="shrink-0 w-[280px] md:w-[300px] flex flex-col bg-white rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <PricingCard product={product} />
          </div>
        ))}
      </div>
    </div>}
  </>
  );
}

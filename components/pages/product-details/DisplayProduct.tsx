"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DisplayProductProps {
  product: {
    name: string;
    description: string;
    mrp: number;
    discountPercent?: number;
    images?: string[];
    subscriptionOptions?: {
      label: string;
      price: number;
      duration: string;
    }[];
  };
}

export default function DisplayProduct({ product }: DisplayProductProps) {
 
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "/images/default.png");
  const [quantity, setQuantity] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(product.subscriptionOptions?.[0]);

  
  const discountedPrice = product.discountPercent
    ? product.mrp - (product.mrp * product.discountPercent) / 100
    : product.mrp;

  const total = discountedPrice * quantity;

  return (
    <section
      className="flex flex-col md:flex-row justify-between gap-10 bg-white p-6 md:p-10 rounded-xl shadow-sm w-full max-w-[1438px] mx-auto"
      style={{ minHeight: 793 }}
    >
      {/* LEFT SIDE - Product Image Gallery */}
      <div className="flex-1">
        <div className="w-full border rounded-xl overflow-hidden bg-gray-50">
          <Image
            src={selectedImage}
            alt={product.name}
            width={600}
            height={400}
            className="object-contain w-full h-[400px]"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {product.images?.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`border rounded-md p-1 transition ${
                selectedImage === img ? "ring-2 ring-yellow-500" : "hover:ring-1 hover:ring-gray-300"
              }`}
            >
              <Image src={img} alt="Thumbnail" width={80} height={80} className="object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Price Section */}
          <div className="mt-2">
            <div className="text-xl font-semibold">
              ৳{discountedPrice.toLocaleString()}{" "}
              {product.discountPercent && (
                <span className="text-gray-500 text-base line-through ml-2">৳{product.mrp}</span>
              )}
            </div>
            {product.discountPercent && (
              <p className="text-green-600 text-sm font-medium">
                ({product.discountPercent}% Off)
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-3 max-w-lg">{product.description}</p>

          {/* Subscription Options */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Monthly Subscription *</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {product.subscriptionOptions?.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPlan(option)}
                  className={`border rounded-md p-3 text-left hover:border-yellow-500 transition ${
                    selectedPlan?.label === option.label
                      ? "border-yellow-500 ring-2 ring-yellow-400"
                      : ""
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.price}/- MRP</div>
                  <p className="text-xs text-gray-500">{option.duration}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Section */}
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity :</span>
              <div className="flex items-center border rounded-lg px-3 py-1">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="text-xl font-bold px-2"
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-xl font-bold px-2"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total:</p>
              <p className="text-lg font-semibold">
                ৳{total.toLocaleString()} /- MRP
              </p>
              {selectedPlan && (
                <p className="text-xs text-yellow-600">
                  For {selectedPlan.duration}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2 text-base">
            Purchase
          </Button>
          <Button variant="outline" className="px-8 py-2 text-base">
            Add to cart
          </Button>
        </div>

        {/* Payment Methods */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">Guaranteed Safe Checkout:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "/payments/visa.png",
              "/payments/mastercard.png",
              "/payments/bkash.png",
              "/payments/nagad.png",
              "/payments/upay.png",
              "/payments/amex.png",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Payment method"
                width={40}
                height={25}
                className="object-contain opacity-80"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

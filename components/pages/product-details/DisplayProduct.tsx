"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import DisplayImages from "@/components/pages/product-details/DisplayImages";
import { Product } from "@/app/page";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

interface DisplayProductProps {
  product: Product;
}

export default function DisplayProduct({ product }: DisplayProductProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(
    product.subscriptions?.[0]
  );



  const total = Number(product.product_final_amount) * quantity;

  return (
    <div className="grid grid-cols-12 2xl:gap-24 xl:gap-16 lg:gap-12 md:gap-10 sm:gap-8 gap-6 component-container mx-auto">
      {/* Left Side — Image Gallery */}
      <DisplayImages
        images={product.images ?? []}
      />

      {/* Right Side — Product Info */}
      <div className="col-span-12 xl:col-span-6 w-full h-full">
        {/* Product Details */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {product.product_name}
          </h1>

          <p className="text-2xl font-semibold text-gray-900 mt-2">
            ৳{Number(product.product_final_amount).toLocaleString()} /- BDT{" "}
            {product.product_discount_amount && (
              <span className="text-gray-500 text-lg font-medium ml-2">
                ({Number((Number(product.product_discount_amount) / Number(product.product_base_amount)) * 100).toFixed(1)}% Off)
              </span>
            )}
          </p>

          <p className="text-gray-500 text-base mt-3 leading-relaxed">
            {product.product_description}
          </p>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        {/* Subscription Options */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight mb-3">
            Monthly Subscription *
          </h2>

          <div className="grid xl:grid-cols-2 lg:grid-cols-2 gap-4">
            {product.subscriptions?.map((option, index) => (
              <label
                key={index}
                htmlFor={`plan-${index}`}
                className="flex items-center justify-start gap-3 rounded-2xl px-5 py-4 bg-gray-100 cursor-pointer border border-transparent"
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="subscription"
                  id={`plan-${index}`}
                  onChange={() => setSelectedPlan(option)}
                  checked={selectedPlan?.duration_months === option.duration_months}
                  className="w-4 h-4 accent-gray-400"
                />

                {/* Text Content */}
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {Number(option.final_amount).toFixed(0)}
                    <span className="font-semibold">/-BDT</span>
                  </p>
                  <p className="text-sm text-gray-500">For {option.duration_months} Month Subscription</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quantity + Total */}
        <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mt-6">
          {/* Quantity Section */}
          <div className="flex flex-col md:mr-0 mr-auto">
            <span className="text-sm font-medium mb-1">Quantity :</span>
            <div className="flex items-center space-x-3 px-3 py-1">
              {/* Minus Button */}
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-9 h-9 flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
              >
                <Minus />
              </button>

              {/* Quantity Display */}
              <span className="px-6 py-1 border border-gray-300 rounded-full">
                {quantity}
              </span>

              {/* Plus Button */}
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-9 h-9 flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* Total Section */}
          <div className="flex flex-col md:mr-0 mr-auto">
            <p className="text-sm font-bold text-gray-900">Total:</p>
            <p className="text-lg font-semibold">
              ৳{total + Number(selectedPlan.final_amount)} /- BDT
            </p>
            {selectedPlan && (
              <p className="text-xs text-yellow-600">
                For {selectedPlan.duration_months} Months
              </p>
            )}
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        {/* Buttons */}
        <div className="flex gap-4 w-full mt-8 md:flex-row flex-col">
          <Button
            onClick={() => {
              if (!selectedPlan) return;
              addToCart({
                id: product.id,
                name: product.product_name,
                price: Number(product.product_base_amount),
                discount: Number(product.product_discount_amount),
                priceWithoutDiscount: Number(product.product_final_amount),
                quantity: quantity,
                subscriptionPrice: Number(selectedPlan.final_amount),
                subscriptionDurationMonths: Number(selectedPlan.duration_months),
                itemImage: product.images?.[0] || "",
              })
              router.push('/cart');
            }}
            className="flex-1 bg-submit h-14 lg:text-lg text-black font-semibold rounded-md cursor-pointer"
            type="submit"
          >
            Purchase
          </Button>

          <Button
            onClick={() => {
              if (!selectedPlan) return;
              addToCart({
                id: product.id,
                name: product.product_name,
                price: Number(product.product_base_amount),
                discount: Number(product.product_discount_amount),
                priceWithoutDiscount: Number(product.product_final_amount),
                quantity: quantity,
                subscriptionPrice: Number(selectedPlan.final_amount),
                subscriptionDurationMonths: Number(selectedPlan.duration_months),
                itemImage: product.images?.[0] || "",
              })
            }}
            variant="outline"
            className="flex-1 h-14 cursor-pointer lg:text-lg text-black font-semibold border border-gray-300 hover:bg-gray-50 rounded-md"
          >
            Add to cart
          </Button>
        </div>

        {/* Payment Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Guaranteed Safe Checkout :
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <Image
              src="/images/Paywith.png"
              alt="Payment Methods"
              width={800}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
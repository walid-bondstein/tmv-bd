import React from "react"
import { Product } from '@/app/page'
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Props = {
    product: Product
}

export const PricingCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="max-w-[280px] md:max-w-xs flex flex-col space-y-3 justify-between bg-[#F6F5EE] relative rounded-xl transition hover:shadow-md w-full mx-auto overflow-hidden group/card">
            {/* Subscription Label */}
            {product.subscriptionFee && (
                <div className="whitespace-nowrap ml-auto text-ellipsis text-sm px-[18px] py-[11px] bg-white group-hover/card:bg-primary text-left font-semibold w-2/3 rounded-bl-4xl text-black transition-all duration-300">
                    <span className="">{product.subscriptionFee}/-</span>
                    <br />
                    Monthly Subscription
                </div>
            )}
            <div className="lg:px-6 px-4 space-y-2 lg:pb-6 pb-4">

                {/* Product Image */}
                <div className="p-4 rounded-xl overflow-hidden bg-[#F6F5EE]">
                    <div className="flex justify-center items-center h-32 relative rounded-lg bg-[#F6F5EE]">
                        <Image
                            fill
                            src={"/images/demo-prod.png"}
                            alt={product.name}
                            className="max-h-full object-contain group-hover/card:scale-120 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow space-y-[10px]">
                    <h3 className="font-semibold text-xl text-gray-900">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-400/90 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* Price Section */}
                <div>
                    <p className="text-gray-800 font-semibold mb-4">
                        {product.mrp.toLocaleString()} /-{" "}
                        <span className="text-gray-700">MRP</span>
                        {product.discountPercent && (
                            <span className="font-medium ml-1 text-deep-gradient">
                                ({product.discountPercent}% Off)
                            </span>
                        )}
                    </p>

                    <Button className="bg-submit xs:h-[3.25rem] mt-1 w-full h-[2rem] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                        Purchase
                    </Button>
                </div>
            </div>
        </div>
    )
}

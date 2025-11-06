import React from "react"
import { Product } from '@/app/page'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type Props = {
    product: Product
}

export const PricingCard: React.FC<Props> = ({ product }) => {
    const monthlySubscription = product?.subscriptions?.length > 0 ? product.subscriptions.find((ech) => ech.duration_months === 1) ?? product.subscriptions[0] : null;
    return (
        <div className="max-w-[280px] min-w-[250px] md:max-w-xs flex flex-col space-y-3 justify-between bg-[#F6F5EE] relative rounded-xl transition hover:shadow-md w-full mx-auto overflow-hidden group/card flex-1">
            {/* Subscription Label */}
            {monthlySubscription ? (
                <div className="whitespace-nowrap ml-auto text-ellipsis text-sm px-[18px] py-[11px] bg-white group-hover/card:bg-primary text-left font-semibold w-2/3 rounded-bl-4xl text-black transition-all duration-300">
                    <span className="">{Number(monthlySubscription.final_amount) ?? 0}/-</span>
                    <br />
                    {monthlySubscription.duration_months === 1 ? "Monthly Subscription" : `${monthlySubscription.duration_months} Months Subscription`}
                </div>
            ) : <></>}
            <div className="lg:px-6 px-4 space-y-2 lg:pb-6 pb-4">

                {/* Product Image */}
                <div className="p-4 rounded-xl overflow-hidden bg-[#F6F5EE]">
                    <div className="flex justify-center items-center h-32 relative rounded-lg bg-[#F6F5EE]">
                        <Image
                            fill
                            src={product.images[0] ?? "/images/storePlaceholder.png"}
                            alt={product.product_name ?? "-"}
                            className="max-h-full object-contain group-hover/card:scale-120 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col grow space-y-2.5">
                    <h3 className="font-semibold text-xl text-gray-900">
                        {product.product_name ?? "-"}
                    </h3>
                    <p className="text-sm text-gray-400/90 mb-3 line-clamp-2">
                        {product.product_description ?? "-"}
                    </p>
                </div>

                {/* Price Section */}
                <div>
                    <p className="text-gray-800 font-semibold mb-4">
                        {Number(product.product_final_amount).toLocaleString()} /-{" "}
                        <span className="text-gray-700">BDT</span>
                        {Number(product.product_discount_amount) ? (
                            <span className="font-medium ml-1 text-deep-gradient">
                                ({Number((Number(product.product_discount_amount) / Number(product.product_base_amount)) * 100).toFixed(1)}% Off)
                            </span>
                        ) : <></>}
                    </p>

                    <Link
                        href={`/product-details/${product.product_slug}`}>
                        <Button className="bg-submit xs:h-13 mt-1 w-full h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                            Purchase
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

import { Product } from '@/app/page'
import Image from "next/image"
import React from "react"
import PricingActionsWrapper from './PricingActionsWrapper'

type Props = {
    product: Product
}

export const PricingCard: React.FC<Props> = ({ product }) => {
    const monthlySubscription = product?.subscriptions?.length > 0 ? product.subscriptions.find((ech) => ech.duration_months === 1) ?? product.subscriptions[0] : null;
    return (
        <div className="max-w-[280px] min-w-[250px] md:max-w-xs flex flex-col space-y-3 justify-between bg-[#F6F5EE] relative rounded-xl transition hover:shadow-md w-full mx-auto overflow-hidden group/card flex-1">
            {/* Subscription Label */}
            {/* {monthlySubscription ? (
                <div className="whitespace-nowrap ml-auto text-ellipsis text-sm px-[18px] py-[11px] bg-white group-hover/card:bg-primary text-left font-semibold w-2/3 rounded-bl-4xl text-black transition-all duration-300">
                    <span className="">{Number(monthlySubscription.final_amount) ?? 0}/-</span>
                    <br />
                    {monthlySubscription.duration_months === 1 ? "Monthly Subscription" : `${monthlySubscription.duration_months} Months Subscription`}
                </div>
            ) : <></>} */}
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
                        {product.product_details ?? "-"}
                    </p>
                </div>
                <PricingActionsWrapper product={product} monthlySubscription={monthlySubscription} />
            </div>
        </div>
    )
}

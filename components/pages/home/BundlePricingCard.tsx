import { Product } from '@/app/page'
import Image from "next/image"
import React from "react"
import Link from 'next/link'
import BundlePricingActionsWrapper from './BundlePricingActionsWrapper'
import { toIndianNumberFormat } from '@/lib/utils'

type Props = {
    product: Product
}

export const BundlePricingCard: React.FC<Props> = ({ product }) => {
    const monthlySubscription = product?.subscriptions?.length > 0 ? product.subscriptions.find((ech) => ech.duration_months === 1) ?? product.subscriptions[0] : null;
    const discounted = Number((Number(product.product_discount_amount) / Number(product.product_base_amount)) * 100).toFixed(0)
    const percentage = Number((Number(product.product_discount_amount) / Number(product.product_base_amount)) * 100).toFixed(0)
    return (
        <div className="max-w-[280px] min-w-[250px] md:max-w-xs flex flex-col border border-orange-100 space-y-3 justify-between relative rounded-xl transition hover:shadow-md w-full mx-auto overflow-hidden group/card flex-1 bg-gradient-to-br from-yellow-50/10 via-amber-50/50 to-orange-100">
            {/* Subscription Label */}
            {/* {monthlySubscription ? (
                <div className="whitespace-nowrap ml-auto text-ellipsis text-sm px-[18px] py-[11px] bg-white group-hover/card:bg-primary text-left font-semibold w-2/3 rounded-bl-4xl text-black transition-all duration-300">
                    <span className="">{Number(monthlySubscription.final_amount) ?? 0}/-</span>
                    <br />
                    {monthlySubscription.duration_months === 1 ? "Monthly Subscription" : `${monthlySubscription.duration_months} Months Subscription`}
                </div>
            ) : <></>} */}
            {Number(discounted) ? (
                <div className="whitespace-nowrap ml-auto text-ellipsis text-sm px-[18px] py-[11px] group-hover/card:bg-primary text-left font-semibold rounded-bl-4xl text-black transition-all duration-300">
                    <span className="font-medium ml-1">
                        saves {toIndianNumberFormat(product.product_discount_amount)} BDT ( {percentage}% )
                    </span>
                </div>
            ) : <></>}
            <div className="lg:px-6 px-4 space-y-2 lg:pb-6 pb-4 mt-auto">

                {/* Product Image */}
                <div className="p-4 rounded-xl overflow-hidden bg-transparent">
                    <div className="flex justify-center items-center h-32 relative rounded-lg bg-transparent">
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
                    <Link
                        className='shrink-0'
                        href={`/bundle-details/${product.product_slug}`}>
                        <h3 className="font-semibold text-xl text-gray-900">
                            {product.product_name ?? "-"}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-400/90 mb-3 line-clamp-2">
                        {product.product_details ?? "-"}
                    </p>
                </div>
                <BundlePricingActionsWrapper percentage={percentage} product={product} monthlySubscription={monthlySubscription} />
            </div>
        </div>
    )
}

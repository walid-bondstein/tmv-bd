"use client"
import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Product } from '@/app/page'
import { toIndianNumberFormat } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function BundleTicket({
    product
}: {
    product: Product
}) {
    const { subscriptions } = product;
    const { clearCart, addToCart } = useCart();
    const router = useRouter();
    return (
        <Card className="ticket-mask relative overflow-hidden shadow-none border-0 rounded-none p-0 md:w-122 min-h-60 bg-black group/card">
            <CardContent className="p-0 grow w-full grid md:grid-cols-[39%_61%] z-1">
                {/* Left Section */}
                <div className="relative md:h-auto h-40 bg-black flex items-center justify-center p-5 bg-[url('/images/ticket-image-background.png')] bg-no-repeat bg-position-[60%_50%]">
                    <div className='w-full h-full relative'>
                        <Image
                            fill
                            src={product.images[0] ?? "/images/storePlaceholder.png"}
                            alt={product.product_name ?? "-"}
                            className="max-h-full object-contain group-hover/card:scale-110 transition-all duration-700"
                        />
                    </div>
                </div>
                {/* Right Section */}
                <div className="relative bg-linear-to-br from-yellow-400 to-yellow-500 p-8 text-black">
                    <div className='h-full space-y-3 flex flex-col justify-center items-start'>
                        <div className='space-y-2'>
                            {/* <div className="flex text-lg items-center gap-2 font-medium">
                                <Clock className="size-4 font-semibold" />
                                <span className='font-semibold'>08h : 14m : 55s</span>
                            </div> */}
                            <div>
                                <p className='font-medium text-[32px] leading-11 line-clamp-1'>{product.product_name}</p>
                                {product?.subscriptions?.[0]?.duration_months ? <p className='font-normal text-[14px] leading-5 line-clamp-1'>{product.product_details}</p> : null}
                            </div>
                        </div>
                        <div>
                            <p className='font-bold text-[22px] leading-7'>{toIndianNumberFormat(product.product_final_amount)} BDT</p>
                        </div>
                        <Button
                            onClick={() => {
                                // if (!selected) {
                                //     toast.error("Please select a subscription plan.");
                                //     return;
                                // }
                                clearCart();
                                addToCart({
                                    id: product.id,
                                    name: product.product_name,
                                    price: Number(product.product_base_amount),
                                    discount: Number(product.product_discount_amount),
                                    priceWithoutDiscount: Number(product.product_final_amount),
                                    quantity: 1,
                                    subscriptionPrice: 0,
                                    subscriptionDurationMonths: Number(
                                        subscriptions?.[0].duration_months
                                    ),
                                    subscriptionID: subscriptions?.[0].product_subscription_id,
                                    itemImage: product.images?.[0] || "",
                                    item_type: "bundle",
                                });
                                toast.success("Product added to cart!");
                                router.push("/cart");
                            }}
                            variant="outline"
                            className="rounded-full cursor-pointer border-black text-black bg-transparent hover:bg-black hover:text-yellow-400"
                        >
                            Get Now →
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

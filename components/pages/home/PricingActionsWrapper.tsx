"use client"

import { Product, ProductSubscription } from '@/app/page';
import SubscriptionButtons from '@/components/shared/SubscriptionButtons'
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { toIndianNumberFormat } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function PricingActionsWrapper({
    product,
    monthlySubscription
}: {
    product: Product;
    monthlySubscription: ProductSubscription | null;
}) {
    const { subscriptions } = product;
    const { clearCart, addToCart } = useCart();
    const router = useRouter();
    const twelveMonthSubscription = subscriptions.length > 0 ? subscriptions.find((ech) => ech.duration_months === 12) ?? null : null;
    const sixMonthSubscription = subscriptions.length > 0 ? subscriptions.find((ech) => ech.duration_months === 6) ?? null : null;
    const [selected, setSelected] = useState<ProductSubscription | null>(twelveMonthSubscription ?? sixMonthSubscription ?? monthlySubscription ?? null);
    return (
        <div>
            <div className='flex gap-1 justify-between items-center md:flex-nowrap flex-wrap'>
                <p className="text-gray-800 font-semibold mb-4">
                    <span className="text-gray-700 font-normal text-[14px] block">Device</span>
                    <span className="text-gray-700 text-[14px] whitespace-nowrap">{Number(product.product_final_amount).toLocaleString()} /-{" "} BDT</span>
                    {/* {Number(product.product_discount_amount) ? (
                    <span className="font-medium ml-1 text-deep-gradient">
                        ({Number((Number(product.product_discount_amount) / Number(product.product_base_amount)) * 100).toFixed(1)}% Off)
                    </span>
                ) : <></>} */}
                </p>
                <Plus className='group-hover/card:text-black text-gray-500 transition-all duration-700 md:inline-block hidden w-3.5 h-3.5' />
                <SubscriptionButtons selected={selected} setSelected={setSelected} twelveMonthSubscription={twelveMonthSubscription} sixMonthSubscription={sixMonthSubscription} />
            </div>
            <hr className='my-4' />
            {(product && selected) ? <p className="text-black text-2xl font-semibold text-center my-2">Total {toIndianNumberFormat(Number(product.product_final_amount) + Number(selected?.final_amount))} BDT</p> : <></>}
            {/* {(product && selected) ? <p className="text-gray-600 text-xs text-right font-light my-2">**VAT Excluding</p> : <></>} */}
            <div className='grid grid-cols-1 gap-2'>
                {/* <Link
                    className='shrink-0'
                    href={`/product-details/${product.product_slug}`}>
                    <Button variant={"outline"} className="bg-white text-black hover:bg-white/90 hover:text-black/90 transition-colors duration-300 xs:h-13 mt-1 w-full h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                        Details
                    </Button>
                </Link> */}
                <Button
                    onClick={() => {
                        if (!selected) {
                            toast.error("Please select a subscription plan.");
                            return;
                        }
                        clearCart();
                        addToCart({
                            id: product.id,
                            name: product.product_name,
                            price: Number(product.product_base_amount),
                            discount: Number(product.product_discount_amount),
                            priceWithoutDiscount: Number(product.product_final_amount),
                            quantity: 1,
                            subscriptionPrice: Number(selected.final_amount),
                            subscriptionDurationMonths: Number(
                                selected.duration_months
                            ),
                            subscriptionID: selected.product_subscription_id,
                            itemImage: product.images?.[0] || "",
                            item_type: "product",
                        });
                        toast.success("Product added to cart!");
                        router.push("/cart");
                    }}
                    variant={"outline"} className="shrink-0 bg-primary-foreground text-white hover:bg-primary-foreground/90 hover:text-white/90 transition-colors duration-300 xs:h-13 mt-1 w-full h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                    Purchase
                </Button>
            </div>
        </div>
    )
}

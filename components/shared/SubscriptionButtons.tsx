"use client"
import { Product, ProductSubscription } from '@/app/page'
import { toIndianNumberFormat } from '@/lib/utils';
import { Check } from 'lucide-react'
import React from 'react'

export default function SubscriptionButtons({
    selected,
    setSelected,
    sixMonthSubscription,
    twelveMonthSubscription
}: {
    selected: ProductSubscription | null;
    setSelected: React.Dispatch<React.SetStateAction<ProductSubscription | null>>;
    sixMonthSubscription: ProductSubscription | null;
    twelveMonthSubscription: ProductSubscription | null;
}) {

    if (!twelveMonthSubscription && !sixMonthSubscription) {
        return <></>;
    }
    return (
        <div className="grid grid-cols-2 gap-2">
            {sixMonthSubscription ? <button
                onClick={() => {
                    setSelected(sixMonthSubscription);
                }}
                className={`${sixMonthSubscription.product_subscription_id === selected?.product_subscription_id ? "bg-submit" : ""} w-full shrink-0 cursor-pointer group relative px-3 py-3 pt-5 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition-all duration-200 border border-white hover:border-primary/80 flex items-center justify-between`}
            >
                <div className="text-left">
                    <p className="text-xs text-primary-foreground mb-1 uppercase tracking-wider">6 Month</p>
                    <p className="text-base text-primary-foreground font-bold whitespace-nowrap">{toIndianNumberFormat(Number(sixMonthSubscription.final_amount))} BDT</p>
                </div>
                {(selected?.product_subscription_id === sixMonthSubscription.product_subscription_id) ? <Check className="w-5 h-5 text-black transition-opacity" /> : <></>}
            </button> : <></>}
            {twelveMonthSubscription ? <div className="relative shrink-0">
                <div className="absolute -top-2 right-4 inline-flex z-10">
                    <span className="bg-black text-white text-xs font- px-1 rounded-full shadow-sm">
                        Best Value
                    </span>
                </div>
                <button
                    onClick={() => {
                        setSelected(twelveMonthSubscription);
                    }}
                    className={`${twelveMonthSubscription.product_subscription_id === selected?.product_subscription_id ? "bg-submit" : ""} w-full cursor-pointer group relative px-3 py-3 pt-5 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition-all duration-200 border border-white hover:border-primary/80 flex items-center justify-between`}
                >
                    <div className="text-left">
                        <p className="text-xs text-primary-foreground mb-1 uppercase tracking-wider">12 Month</p>
                        <p className="text-base text-primary-foreground font-bold whitespace-nowrap">{toIndianNumberFormat(Number(twelveMonthSubscription.final_amount))} BDT</p>
                    </div>
                    {(selected?.product_subscription_id === twelveMonthSubscription.product_subscription_id) ? <Check className="w-5 h-5 text-black transition-opacity" /> : <></>}
                </button>
            </div> : <></>}
        </div>
    )
}

"use client"

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import CustomRadio from '../billing/CustomRdio'
import { useCart } from '@/context/cart-context'



export default function CartItem() {
    const { items } = useCart();
    const [inUpdateItems, setInUpdateItems] = useState(items);
    const [showCoupon, setCouponForm] = useState(false);

    useEffect(() => {
        setInUpdateItems(items);
    }, [items])

    return (
        <div className="component-container mx-auto space-y-4 my-4">
            <div onClick={() => window?.history?.back()} className='flex cursor-pointer justify-start items-center gap-2'>
                <ArrowLeft className='cursor-pointer' />
                <h2 className='md:text-2xl text-lg  md:font-bold font-medium text-[#202939]'>Cart details</h2>
            </div>
            <div className='grid grid-cols-12 md:gap-8 gap-0'>
                <div className='lg:col-span-7 col-span-12'>
                    <div className='space-y-5'>
                        <div className="border space-y-4 border-gray-200 px-7 py-8 rounded-lg">

                        </div>
                        {/* Button */}

                        <span onClick={() => setCouponForm(!showCoupon)}
                            className="cursor-pointer text-[clamp(14px,4.0625vw,16px)] select-none lg:font-semibold text-black hover:underline">
                            {showCoupon ? " - Hide Coupon" : " + Apply Coupon"}
                        </span>


                        {showCoupon && <div className='border border-gray-200 px-7 py-8 rounded-lg'>
                            {/* Coupon Code */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium select-none">Coupon Code</p>
                                    <div className="flex gap-4 md:flex-row flex-col">
                                        <Input
                                            placeholder="Code Here"
                                            className="bg-muted/50 h-[52px]"
                                        />
                                        <Button
                                            type="button"
                                            className="bg-submit lg:w-40 xs:w-[9.8rem] xs:h-13 w-28 h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='lg:col-span-5 col-span-12'>
                    <div className='border px-7 py-8 rounded-lg space-y-4'>
                        <p className="text-2xl font-bold">Cart</p>
                        <div className='grid grid-cols-2 gap-y-4'>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Subtotal Amount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Coupon Discount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                        </div>
                        <hr />
                        <div className='grid grid-cols-2'>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Total Amount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                        </div>
                        <div className="mt-3 space-y-3">
                            <Button className="bg-submit xs:h-13 w-full h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                                {"Proceed"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

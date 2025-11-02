"use client"

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useCart } from '@/context/cart-context'
import { ArrowLeft, Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from "react"



export default function CartItem() {
    const { items, removeFromCart, applyCoupon, coupon, clearCoupon, subtotal, discount, total, updateQuantity } = useCart();
    const [showCoupon, setCouponForm] = useState(false);
    const [couponText, setCouponText] = useState("");
    const router = useRouter();


    return (
        <div className="component-container mx-auto space-y-4 my-4">
            <div onClick={() => window?.history?.back()} className='flex cursor-pointer justify-start items-center gap-2'>
                <ArrowLeft className='cursor-pointer' />
                <h2 className='md:text-2xl text-lg  md:font-bold font-medium text-[#202939]'>Cart details</h2>
            </div>
            <div className='grid grid-cols-12 md:gap-8 gap-0'>
                <div className='xl:col-span-7 col-span-12'>
                    <div className='space-y-5'>
                        <div className="border space-y-4 border-gray-200 md:py-8 py-0 md:px-0 px-2 rounded-lg">
                            <div className='border-b grid-cols-12 col-span-7 px-7 gap-2 text-base font-normal text-[#777F92] pb-4 md:grid hidden'>
                                <div className='col-span-6 lg:border-r border-r-0'>
                                    <p>PRODUCT</p>
                                </div>
                                <div className='col-span-1 lg:block hidden'>
                                    <p>PRICE</p>
                                </div>
                                <div className='col-span-3 lg:block hidden'>
                                    <p>QUANTITY</p>
                                </div>
                                <div className='col-span-2 lg:block hidden'>
                                    <p>SUBTOTAL</p>
                                </div>
                            </div>
                            {/* big Device  */}
                            <div className=' md:grid hidden'>
                                {
                                    items.map((item, key) => <div key={key} className='grid grid-cols-12 gap-2 px-7 my-2'>
                                        <div className='lg:col-span-6 col-span-12 flex justify-start items-center gap-3 lg:border-r border-r-0'>
                                            <div onClick={() => removeFromCart(item.id, item.subscriptionDurationMonths)} className="w-10 h-10 rounded-full bg-[#F0F5FB] shrink-0 flex justify-center items-center cursor-pointer">
                                                <X />
                                            </div>
                                            <div className="w-[76px] h-[76px] relative rounded-2xl border shrink-0">
                                                <Image
                                                    src={item.itemImage || "/images/storePlaceholder.png"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className='flex justify-start items-center'>
                                                <div>
                                                    <p>{item.name}</p>
                                                    <p className='text-[#727B8C]'>Monthly Subscription- {item.subscriptionDurationMonths} Month {`(${(item.subscriptionPrice) * item.quantity}/- BDT)`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-1 col-span-3 flex lg:justify-start justify-center items-center text-[#727B8C]'>
                                            <p> <span className='lg:hidden block'>Price</span> {item.priceWithoutDiscount}/-BDT</p>
                                        </div>
                                        <div className='lg:col-span-3 col-span-6 flex 2xl:justify-start xl:justify-center xl:gap-2 lg:justify-start justify-center items-center'>
                                            <div className="flex 2xl:flex-row xl:flex-col flex-row items-center 2xl:space-x-3 xl:space-x-0 space-x-3 2xl:space-y-0 xl:space-y-2 space-y-0 py-1">
                                                {/* Minus Button */}
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.subscriptionDurationMonths)}
                                                    className="w-9 h-9 cursor-pointer flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
                                                >
                                                    <Minus />
                                                </button>

                                                {/* Quantity Display */}
                                                <span className="px-6 py-1 border border-gray-300 rounded-full">
                                                    {item.quantity}
                                                </span>

                                                {/* Plus Button */}
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity + 1), item.subscriptionDurationMonths)}
                                                    className="w-9 h-9 cursor-pointer flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
                                                >
                                                    <Plus />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 col-span-3 flex lg:justify-start justify-center items-center text-[#727B8C]'>
                                            <p><span className='lg:hidden block'>Subtotal</span> {(item.priceWithoutDiscount + item.subscriptionPrice) * item.quantity} BDT</p>
                                        </div>
                                    </div>)
                                }
                            </div>
                            {/* Mobile Device  */}
                            <div className='grid md:hidden'>
                                {
                                    items.map((item, key) => <div key={key} className='my-2 border-b space-y-4'>
                                        <div className='flex justify-between items-start'>
                                            <div className='w-[9.3rem] relative rounded-2xl border h-[7.66rem]' >
                                                <Image
                                                    src={item.itemImage || "/images/storePlaceholder.png"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div onClick={() => removeFromCart(item.id, item.subscriptionDurationMonths)} className="w-10 h-10 rounded-full bg-[#F0F5FB] shrink-0 flex justify-center items-center cursor-pointer">
                                                <X />
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className='text-[26px] leading-[26px] font-medium text-[#211E1F]'>{item.name}</p>
                                            <p className='text-[#727B8C] text-base'>Monthly Subscription- {item.subscriptionDurationMonths} Month {`(${(item.subscriptionPrice) * item.quantity}/- BDT)`}</p>
                                            <p className='text-xl font-medium text-[#211E1F]'>{item.priceWithoutDiscount}/- BDT</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium mb-1">Quantity :</span>
                                            <div className="flex items-center space-x-3 px-3 py-1">
                                                {/* Minus Button */}
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.subscriptionDurationMonths)}
                                                    className="w-9 h-9 flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
                                                >
                                                    <Minus />
                                                </button>

                                                {/* Quantity Display */}
                                                <span className="px-6 py-1 border border-gray-300 rounded-full">
                                                    {item.quantity}
                                                </span>

                                                {/* Plus Button */}
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity + 1), item.subscriptionDurationMonths)}
                                                    className="w-9 h-9 flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
                                                >
                                                    <Plus />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-yellow-600">
                                                For {item.subscriptionDurationMonths} Months
                                            </p>
                                        </div>
                                    </div>)
                                }
                            </div>
                            {/* <hr />
                            <Button onClick={() => {
                                inUpdateItems.forEach((item, indx) => {
                                    updateQuantity(item.id, item.quantity, item.subscriptionDurationMonths,)
                                })
                            }} variant={"outline"} className="ml-7 lg:w-48 xs:w-40 xs:h-13 w-32 h-[52px] lg:font-bold rounded-lg submit cursor-pointer text-[clamp(14px,4.0625vw,16px)] bg-[#E7ECF3]">
                                {"Update"}
                            </Button> */}
                        </div>
                        {/* Button */}
                        {coupon ? <>
                            <div className='border border-gray-200 md:px-7 px-2 md:py-8 py-3  mb-4 rounded-lg flex justify-between items-center'>
                                <p className='text-subtitle'>Coupon Applied</p>
                                <div className='flex justify-between items-center gap-4'>
                                    <div>
                                        <p className="text-lg font-semibold">{coupon.code}</p>
                                        <p>{coupon.discount}/- BDT off</p>
                                    </div>
                                    <Button onClick={() => { applyCoupon("", 0); clearCoupon(); setCouponText("") }} className="bg-primary rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                                        <X />
                                    </Button>
                                </div>
                            </div>
                        </> : <>
                            <span onClick={() => setCouponForm(!showCoupon)}
                                className="cursor-pointer text-[clamp(14px,4.0625vw,16px)] select-none lg:font-semibold text-black hover:underline">
                                {showCoupon ? " - Hide Coupon" : " + Apply Coupon"}
                            </span>


                            {showCoupon && <div className='border border-gray-200 md:px-7 px-2 md:py-8 py-3 mb-4 rounded-lg'>
                                {/* Coupon Code */}
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium select-none">Coupon Code</p>
                                        <div className="flex gap-4 md:flex-row flex-col">
                                            <Input
                                                placeholder="Code Here"
                                                className="bg-muted/50 h-[52px]"
                                                value={couponText}
                                                onChange={(e) => setCouponText(e.target.value)}
                                            />
                                            <Button
                                                onClick={() => { applyCoupon(couponText, 100); setCouponText(""); setCouponForm(false); }}
                                                type="button"
                                                className="bg-submit lg:w-40 xs:w-[9.8rem] xs:h-13 w-28 h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </>
                        }
                    </div>
                </div>
                <div className='xl:col-span-5 col-span-12'>
                    <div className='border md:px-7 px-2 md:py-8 py-3 rounded-lg space-y-4'>
                        <p className="text-2xl font-bold">Cart</p>
                        <div className='grid grid-cols-2 gap-y-4'>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Subtotal Amount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">{subtotal}/- BDT</p>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Coupon Discount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">{discount}/- BDT</p>
                        </div>
                        <hr />
                        <div className='grid grid-cols-2'>
                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">Total Amount</p>
                            <p className="text-sm md:text-lg font-semibold text-right">{total}/- BDT</p>
                        </div>
                        <div className="mt-3 space-y-3">
                            <Button
                                onClick={() => {
                                    if (items.length) {
                                        router.push("/billing")
                                    }
                                }}
                                disabled={items.length === 0}
                                className="bg-submit xs:h-13 w-full h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                                {"Proceed"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

import { Facebook, Github, Instagram, Send, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'

export default function Footer() {
    return (
        <div className="bg-[#F6F5EE]">
            <div className="component-container mx-auto py-20">
                <div className="w-full grid grid-cols-3">
                    <div className='border border-blue-600'>
                        <div className='space-y-4 max-w-[21rem]'>
                            <Image
                                src="/images/tmv-bd.png"
                                alt="Track My Vehicle BD Logo"
                                height={82}
                                width={82}
                                className='w-16 h-16 lg:w-[7rem] lg:h-[7rem] object-center object-contain'
                            />
                            <p className="2xl:text-[22px] 2xl:leading-[35px] font-semibold">Head Office</p>
                            <p className="2xl:text-[18px] 2xl:leading-[26px] font-light text-[#4A5E6D]">138/1, Level, 4 Bir Uttam Mir Shawkat Sarak, Dhaka 1208</p>
                            <div className='flex justify-start items-center gap-6'>
                                <Twitter className='w-6 h-6 text-blue-500' />
                                <Facebook className='w-6 h-6 text-blue-700' />
                                <Instagram className='w-6 h-6 text-pink-500' />
                                <Github className='w-6 h-6 text-black' />
                            </div>
                        </div>
                    </div>
                    <div className='border border-blue-600 flex justify-end'>
                        <div className='max-w-max flex justify-start items-start gap-36'  >
                            <div className=''>
                                <p className="text-lg font-semibold text-[#4A5E6D]">Quick links</p>
                                <ul>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Shop</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">About</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Contact</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Support</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Policies</Link></li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-[#4A5E6D]">More</p>
                                <ul>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Legal Text</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">Privacy Notice</Link></li>
                                    <li>  <Link href={"/"} className="text-base font-normal text-[#6C757D] leading-10">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='border border-blue-600 flex justify-end items-start'>
                        <div className='max-w-[25.725rem] space-y-4'>
                            <p className="2xl:text-[32px] 2xl:leading-10 2xl:font-semibold text-[#002838]">Drop your email here. We will get back to you.</p>
                            <div className='border px-2 py-1 rounded-full flex justify-between items-center'>
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    className="border-0 focus:ring-0 rounded-lg h-auto focus-visible:ring-0 focus-visible:border-0 shadow-none"
                                />
                                <div className="bg-yellow-400 h-10 w-10 shrink-0 flex justify-center items-center rounded-full">
                                    <Send />
                                </div>
                            </div>
                            <p className="md:text-2xl md:font-normal text-[#777F92]">The flagship product of</p>
                            <Image
                                src="/images/bondstein.png"
                                alt="Track My Vehicle BD Logo"
                                height={82}
                                width={176}
                                className='h-[8rem] lg:h-auto lg:w-[11rem] object-center object-contain'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t'>
                <p className='text-center'>© Copyright {new Date().getFullYear()}. All rights TMV.</p>
            </div>
        </div>
    )
}

import { Facebook, Github, Instagram, Send, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'

export default function Footer() {
    return (
        <div className="bg-[#F6F5EE]">
            <div className="component-container mx-auto md:py-20 py-11">
                <div className="w-full grid grid-cols-3 gap-4">
                    <div className='2xl:col-span-1 lg:col-span-1 col-span-3'>
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
                            <div className='flex justify-start items-center gap-4 mt-8'>
                              <a href="https://twitter.com/"
                                target="_blank"
                                 className="bg-[#FDD10E] p-3 rounded-full hover:scale-110 transition-transform">
                                <Twitter className="w-6 h-6 text-transparent fill-black" />
                                 </a>

                             <a href= "https://www.facebook.com/tmvbd"
                                target="_blank"
                                 className="bg-[#FDD10E] p-3 rounded-full hover:scale-110 transition-transform">
                                 <Facebook className='w-6 h-6 text-transparent fill-black' />
                                 </a>

                             <a href= "https://www.instagram.com/track_my_vehicle/?igsh=ZnllbXZhZWE4ejd5#"
                                target="_blank"
                                 className="bg-[#FDD10E] p-3 rounded-full hover:scale-110 transition-transform">
                                 <Instagram className='w-6 h-6 text-black' />
                                 </a>

                              
                             <a href= ""
                                target="_blank"
                                 className="bg-[#FDD10E] p-3 rounded-full hover:scale-110 transition-transform">
                                 <Github className='w-6 h-6 text-black' />
                                 </a> 
                            </div>
                        </div>
                    </div>
                    <div className='flex lg:justify-end justify-start 2xl:col-span-1 lg:col-span-1 col-span-3'>
                        <div className='max-w-max flex justify-start lg:-translate-x-4 items-start 2xl:gap-36 gap-12'  >
                            <div className=''>
                                <p className="text-lg font-semibold text-[#4A5E6D]">Quick links</p>
                                <ul>
                                    <li>  <Link href={"https://store.tmvbd.com/"} className="text-base font-normal text-[#6C757D] leading-10">Shop</Link></li>
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
                    <div className='flex lg:justify-end justify-start items-start 2xl:col-span-1 lg:col-span-1 col-span-3'>
                        <div className='max-w-[25.725rem] md:space-y-4 space-y-3'>
                            <p className="text-[clamp(22px,1.6666vw,32px)] font-semibold text-[#002838]">Drop your email here. We will get back to you.</p>
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
                            <p className="font-normal text-[clamp(20px,1.2499vw,24px)] text-[#777F92] line-clamp-1">The flagship product of</p>
                            <Image
                                src="/images/bondstein.png"
                                alt="Track My Vehicle BD Logo"
                                height={82}
                                width={176}
                                className='lg:h-auto h-9 lg:w-[11rem] object-center object-contain'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t'>
                <p className='text-center text-base font-normal py-4 md:py-7 text-[#6C757D]'>© Copyright {new Date().getFullYear()}. All rights TMV.</p>
            </div>
        </div>
    )
}

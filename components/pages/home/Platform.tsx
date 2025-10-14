"use client"
import Image from 'next/image'
import React from 'react'

export default function Platform() {
    return (
        <div
            className="bg-[#E6E9E6]"
        >
            <div className="component-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 2xl:py-[4.125rem py-14 items-center">
                <div>
                    <h2 className='text-title lg:max-w-[450px] lg:text-left text-center'>100% Self Owned Platform</h2>
                    <p className='text-subtitle lg:max-w-sm lg:text-left text-center'>Bondstein is the only company in Bangladesh operating tracking services with complete self owned platform.</p>
                </div>
                <div className='w-full col-span-1'>
                    <Image
                        src={"/images/platform.png"}
                        // fill
                        width={1080}
                        height={591}
                        alt="Platform"
                        // fill
                        className='w-full object-contain 2xl:h-[24.313rem] xl:h-[22rem] lg:h-[18rem] sm:h-[16rem] xs:h-[14.125rem] h-[13.125rem]'
                        onLoadingComplete={() => console.log("Image loaded")}
                    />
                </div>
            </div>
        </div>
    )
}

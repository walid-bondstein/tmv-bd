import Image from 'next/image'
import React from 'react'

export default function AppSection() {
    return (
        <div className='component-container mx-auto relative 2xl:pt-[76px] xl:pt-12 lg:pt-6 md:pb-0 pb-10 pt-10 2xl:mb-28'>
            <div className='grid lg:grid-cols-2 grid-cols-1 bg-[#F0F4F9] 2xl:py-32 xl:py-12 lg:py-10 2xl:px-[7.14rem] xl:px-16 lg:px-11 p-0 rounded-4xl'>
                <div className='space-y-5 px-4 pt-4 lg:px-0 lg:pt-0'>
                    <h2 className='text-title'>Driven by Trust, Backed by Experience</h2>
                    <p className='text-subtitle md:max-w-[33.4rem]'>I thought tracking would be complicated, but my 70-year-old father uses it better than me.</p>
                    <div className='flex justify-start gap-6 mt-7'>
                        <Image
                            className='xl:w-auto lg:w-[100px] lg:h-[35px] xl:h-auto'
                            height={58}
                            width={195}
                            src="/images/appleStore.png"
                            alt="Apple Store"
                        />
                        <Image
                            className='xl:w-auto lg:w-[100px] lg:h-[35px] xl:h-auto'
                            height={58}
                            width={195}
                            src="/images/appStore.png"
                            alt="Apple Store"
                        />
                    </div>
                </div>
                <div className='lg:block hidden'>
                    <Image
                        className='h-full max-w-min object-contain ml-auto 2xl:-translate-x-24 lg:-translate-x-11 2xl:translate-y-24 xl:translate-y-14 lg:translate-y-10'
                        fill
                        src="/images/mobile.png"
                        alt="Apple Store"
                    />
                </div>

                <div className='lg:hidden block '>
                    <Image
                        className='mx-auto translate-y-10'
                        height={353}
                        width={278}
                        src="/images/mobile.png"
                        alt="Apple Store"
                    />
                </div>
            </div>
        </div>
    )
}


/* 

<Image
                    className='h-full max-w-min object-contain border border-green-500 translate-x-96'
                    fill
                    src="/images/mobile.png"
                    alt="Apple Store"
                />
*/
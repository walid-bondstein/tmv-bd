import React from 'react'
import { generateAddress, StoreLocation } from '../pages/store-locations/store-locator'
import Image from 'next/image';
import { X } from 'lucide-react';

interface CustomInfoWindowProps {
    store: StoreLocation;
    onClose: () => void
}
export default function CustomInfoWindow({ store, onClose }: CustomInfoWindowProps) {
    return (
        <div className='bg-white overflow-hidden rounded-lg shadow-lg xxl:w-[27rem] xl:w-[22rem] lg:w-[18rem] md:w-[16rem] sm:w-[14rem] xs:w-[12rem] w-[10rem]'>
            <div className='w-full relative xxl:h-[12rem] xl:h-[10rem] lg:h-[8rem] md:h-[8rem] sm:h-[8rem] xs:h-[6rem] h-[6rem]'>
                <X className="cursor-pointer absolute top-2 right-2 z-50 md:w-8 rounded-full bg-white/50 w-4 md:h-8 h-4 "
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                />
                <Image
                    src={store?.store_image ? store?.store_image : "/images/storePlaceHolder.png"}
                    alt={store.name}
                    className='w-full h-full'
                    fill
                />
            </div>
            <div className='py-2 md:px-4 px-2 space-y-1'>
                <p className="text-[clamp(12px,1.2499vw,16px)] font-semibold capitalize">{store.name}</p>
                <p className="text-[clamp(12px,0.8333vw,16px)] font-normal text-gray-400">{generateAddress(store)}</p>
                <div className='flex justify-start items-center gap-2'>
                    <button
                        className="bg-submit rounded-sm tmv-shadow submit cursor-pointer md:px-3 px-2 md:py-2 py-1 text-[clamp(8px,0.6249vw,12px)]"
                    >
                        Contact Person
                    </button>
                    <button
                        className="border border-gray-300 rounded-sm tmv-shadow submit cursor-pointer md:px-3 px-2 md:py-2 py-1 text-[clamp(8px,0.6249vw,12px)]"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}

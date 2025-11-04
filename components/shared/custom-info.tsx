import React from 'react'
import { generateAddress } from '../pages/store-locations/store-locator'
import Image from 'next/image';
import { Phone, Share2, Waypoints, X } from 'lucide-react';
import { StoreLocation } from '@/app/store-locations/page';
import { toast } from 'sonner';
import ImageSlider from './ImageSlider';

interface CustomInfoWindowProps {
    store: StoreLocation;
    onClose: () => void
}
export default function CustomInfoWindow({ store, onClose }: CustomInfoWindowProps) {
    const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const textToCopy = `
                                Store: ${store.name}
                                Address: ${store.address}${store.city ? `, ${store.city}` : ""}
                                Telephone: ${store.telephone ?? "-"}
                                Mobile: ${store.mobile_number ?? "-"}
                                Email: ${store.email ?? "-"}
                                Contact: ${store.contact_person_name ?? "-"} ${store.contact_person_position ? `(${store.contact_person_position})` : ""}
                                Contact Mobile: ${store.contact_person_mobile_no ?? "-"}
                                Contact Email: ${store.contact_person_email ?? "-"}
                                Location: https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}
                                `.trim();

            await navigator.clipboard.writeText(textToCopy);

            const button = e.target as HTMLButtonElement;
            const originalText = button.innerHTML;

            button.innerHTML = "Copied!";
            button.classList.add("bg-green-500", "text-white");

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove("bg-green-500", "text-white");
            }, 1500);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const handleOpenDirections = (lat: number, lng: number) => {
        if (!lat || !lng) return toast.error("Invalid store location coordinates.");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}&travelmode=driving`;
                    window.open(url, '_blank'); // open in new tab
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // fallback if location not available
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
                    window.open(url, '_blank');
                }
            );
        } else {
            // if geolocation not supported
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
            window.open(url, '_blank');
        }
    };
    return (
        <div className='bg-white overflow-hidden rounded-lg shadow-lg xxl:w-[27rem] xl:w-88 lg:w-[18rem] md:w-[16rem] sm:w-56 xs:w-48 w-40'>
            <div className='w-full relative xxl:h-[12rem] xl:h-40 lg:h-32 md:h-32 sm:h-32 xs:h-24 h-24'>
                <X className="cursor-pointer absolute top-2 p-1 right-2 z-50 md:w-5 rounded-full bg-white/50 w-4 md:h-5 h-4 "
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                />
                <ImageSlider images={store.store_image ?? []} />
            </div>
            <div className='py-2 md:px-4 px-2 space-y-1'>
                <p className="text-[clamp(12px,1.2499vw,16px)] font-semibold capitalize">{store.name}</p>
                <p className="text-[clamp(12px,0.8333vw,16px)] font-normal text-gray-400">{generateAddress(store)}</p>
                <div className='flex justify-start items-center gap-2'>
                    <a className={`${store.contact_person_mobile_no ? "block" : "hidden"}`} href={`tel:${store.contact_person_mobile_no}`}>
                        <button
                            className="bg-submit rounded-sm tmv-shadow submit cursor-pointer md:px-2 px-2 md:py-1 py-1 text-[clamp(8px,0.6249vw,12px)]"
                        >
                            <Phone className="fill-black w-5" />
                        </button>
                    </a>
                    <button
                        onClick={handleShare}
                        className="border border-gray-300 rounded-sm tmv-shadow submit cursor-pointer md:px-2 px-2 md:py-1 py-1 text-[clamp(8px,0.6249vw,12px)] flex justify-start items-center gap-2"
                    >
                        <Share2 className="w-5" /> Share
                    </button>
                    <button
                        onClick={() => handleOpenDirections(store?.lat, store?.lng)}
                        className="border border-gray-300 rounded-sm tmv-shadow submit cursor-pointer md:px-2 px-2 md:py-1 py-1 text-[clamp(8px,0.6249vw,12px)] flex justify-start items-center gap-2"
                    >
                        <Waypoints className="w-5" /> Directions
                    </button>
                </div>
            </div>
        </div>
    )
}
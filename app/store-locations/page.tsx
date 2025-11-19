export const dynamic = "force-dynamic";
import StoreLocator from '@/components/pages/store-locations/store-locator'
import Header from '@/components/shared/Header';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Store Locator",
    description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
    keywords: ["tmv", "tmvbd", "Truck My Vehicle BD", "truck my vehicle bd", "Truck My Vehicle", "truck my vehicle"],
    openGraph: {
        title: "Home",
        description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Home",
        description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
    },
}
export interface StoreLocation {
    id: string
    name: string
    address: string
    city?: string | null
    telephone?: string | null
    mobile_number?: string | null
    email?: string | null
    store_image?: string[] | null
    contact_person_name?: string | null
    contact_person_position?: string | null
    contact_person_mobile_no?: string | null
    contact_person_email?: string | null
    contact_person_image?: string | null
    lat: number
    lng: number
}

// Fetch store data keeping page server-side
async function getStores(): Promise<StoreLocation[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/store-locations`, {
            // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
            next: { revalidate: 3600 }, // or control revalidation at fetch-level
        })
        if (!res.ok) {
            console.error('API returned non-OK status:', res.status)
            return []
        }

        const data = (await res.json()).data.map((store: {
            id: number
            name: string
            address: string
            city?: string | null
            telephone?: string | null
            mobile_number?: string | null
            email?: string | null
            // store_image?: string[] | null
            contact_person_name?: string | null
            contact_person_position?: string | null
            contact_person_mobile_no?: string | null
            contact_person_email?: string | null
            contact_person_image?: string | null
            latitude: number
            longitude: number
            store_location_images?: string[]
        }) => ({ ...store, id: store.id.toString(), lat: store?.latitude, lng: store?.longitude, store_image: store.store_location_images ?? [] }));

        if (!Array.isArray(data)) {
            console.error('Unexpected API structure:', data)
            return []
        }

        return data as StoreLocation[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}

export default async function page() {
    const stores = await getStores()
    return (
        <main className="bg-[#FAFAFA]">
            <div className='flex-1 h-screen flex flex-col overflow-y-auto'>
                <Header />
                <StoreLocator stores={stores} />
            </div>
        </main>
    )
}

import StoreLocator from '@/components/pages/store-locations/store-locator'
import Header from '@/components/shared/Header'
import React from 'react'

export default function page() {
    return (
        <main className="bg-[#FAFAFA]">
            <div className='flex-1 h-screen flex flex-col overflow-y-auto'>
                <Header />
                <StoreLocator />
            </div>
        </main>
    )
}

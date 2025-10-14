import { Search, ShoppingCart, TextAlignStart } from 'lucide-react'
import { headers } from "next/headers"
import Image from 'next/image'
import React from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import Link from 'next/link'

export default async function Header() {
    const headersList = await headers()
    const pathname = headersList.get("pathname") || "/"
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(href)
    }
    return (
        <div className='w-full lg:py-3.5 py-1.5'>
            <div className={`component-container mx-auto`}>
                <div className='flex justify-between items-center'>
                    <div className='w-16 h-16 lg:w-[5.125rem] lg:h-[5.125rem] relative'>
                        <Image
                            src={"/images/logo.png"}
                            alt="Track My Vehicle BD Logo"
                            // className='w-full h-full'
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    <div className='hidden lg:block'>
                        <div className='flex justify-center items-center gap-6 text-secondary-foreground'>
                            <Link className={`${isActive("/") ? "text-gradient" : ""}`} prefetch={false} href={"/"}>Home</Link>
                            <Link className={`${isActive("/products") ? "text-gradient" : ""}`} prefetch={false} href={"/products"}>Products</Link>
                            <Link className={`${isActive("/features") ? "text-gradient" : ""}`} prefetch={false} href={"/features"}>Features</Link>
                            <Link className={`${isActive("/how-it-works") ? "text-gradient" : ""}`} prefetch={false} href={"/how-it-works"}>How It Works</Link>
                            <Link className={`${isActive("/store-locations") ? "text-gradient" : ""}`} prefetch={false} href={"/store-locations"}>Store location</Link>
                        </div>
                    </div>

                    <div className='flex justify-end items-center gap-3'>
                        <div className='border border-secondary-foreground/10 rounded-full cursor-pointer bg-white/50 backdrop-blur-sm'>
                            <Search className='w-6 h-6 m-3 text-secondary-foreground' />
                        </div>
                        <div className='hidden lg:block bg-white/50 backdrop-blur-sm'>
                            <LanguageSwitcher />
                        </div>

                        <div className='border border-secondary-foreground/10 rounded-full cursor-pointer bg-white/50 backdrop-blur-sm'>
                            <ShoppingCart className='w-6 h-6 m-3 text-secondary-foreground' />
                        </div>
                        <div className='border border-secondary-foreground/10 rounded-full lg:hidden block cursor-pointer bg-white/50 backdrop-blur-sm'>
                            <TextAlignStart className='w-6 h-6 m-3 text-secondary-foreground' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"
import { useCart } from '@/context/cart-context'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function Cart() {
    const { items } = useCart();
    return (<div className='relative'>
        {(items.length > 0) ? <div className='bg-black absolute top-0 rounded-full h-2 w-2 right-0 -translate-y-2 -translate-x-1 z-30' /> : <></>}
        <ShoppingCart className='w-6 h-6 m-3 text-secondary-foreground' />
    </div>)
}

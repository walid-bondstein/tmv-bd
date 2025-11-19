"use client"

import Image from "next/image"
import React from "react"

// A small floating WhatsApp button that stays fixed bottom-right and opens WhatsApp.
// The phone number is read from NEXT_PUBLIC_WHATSAPP_NUMBER (recommended) or falls back to a placeholder.

const DEFAULT_NUMBER = "+8801821619183" // replace with your number (country code + number, no + sign when using wa.me)

function cleanNumber(raw?: string) {
    if (!raw) return DEFAULT_NUMBER
    return raw.replace(/[^0-9]/g, "") || DEFAULT_NUMBER
}

export default function WhatsAppButton() {
    const envNumber = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER : undefined
    const number = cleanNumber(envNumber)
    const text = encodeURIComponent("Hello! Track My Vehicle BD.")
    const waUrl = `https://wa.me/${number}?text=${text}`

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp chat"
            title="Chat with us on WhatsApp"
            className={
                // fixed bottom-right, always on top, circular, WhatsApp green
                "fixed z-50 right-4 bottom-4 sm:right-6 sm:bottom-6 rounded-full md:w-18 md:h-18 w-10 h-10 bg-transparent hover:bg-transparent shadow-lg flex items-center justify-center text-white transition-transform transform-gpu hover:scale-105"
            }
        >
            <Image
                fill
                alt="WhatsApp"
                src="/images/whatsapp.webp"
            />
        </a>
    )
}

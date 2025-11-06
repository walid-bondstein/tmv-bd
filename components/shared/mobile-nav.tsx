"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { TextAlignStart } from "lucide-react"

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const navItems = [
        { href: "/", label: "Home", isSeparator: false },
        { href: "/#products", label: "Products", isSeparator: false },
        { href: "/#features", label: "Features", isSeparator: false },
        { href: "/#how-it-works", label: "How it works", isSeparator: false },
        { href: "/store-locations", label: "Store Locations", isSeparator: false },
    ]
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="md:hidden">
                <button className="p-3 hover:bg-muted rounded-md transition-colors" aria-label="Toggle menu">
                    <TextAlignStart className="w-6 h-6 text-secondary-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item, index) => (
                    <div key={index}>
                        {item.isSeparator && <DropdownMenuSeparator />}
                        <DropdownMenuItem asChild>
                            <Link href={item.href} onClick={() => setIsOpen(false)} className="cursor-pointer">
                                {item.label}
                            </Link>
                        </DropdownMenuItem>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
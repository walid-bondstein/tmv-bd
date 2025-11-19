import React from 'react'
import Header from '../shared/Header'

interface HeaderLayoutProps {
    children: React.ReactNode
}

export default function HeaderLayout({
    children,
}: HeaderLayoutProps) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

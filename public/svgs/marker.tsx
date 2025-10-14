import React from 'react'

export default function Marker(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
            <path d="M15.2521 0.703125C7.07023 0.703125 0.4375 7.33582 0.4375 15.5177C0.4375 18.2539 0.973071 21.08 2.50999 23.1169L15.2521 40.0039L27.9941 23.1169C29.3901 21.2668 30.0666 17.9961 30.0666 15.5177C30.0666 7.33582 23.4339 0.703125 15.2521 0.703125ZM15.2521 9.28337C18.6947 9.28337 21.4863 12.0751 21.4863 15.5177C21.4863 18.9603 18.6947 21.752 15.2521 21.752C11.8094 21.752 9.01778 18.9603 9.01778 15.5177C9.01778 12.0751 11.8094 9.28337 15.2521 9.28337Z" fill="url(#paint0_linear_544_11122)" />
            <defs>
                <linearGradient id="paint0_linear_544_11122" x1="30.0666" y1="19.9962" x2="0.4375" y2="19.9961" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0104167" stopColor="#F9AA17" />
                    <stop offset="1" stopColor="#FDD00E" />
                </linearGradient>
            </defs>
        </svg>

    )
}

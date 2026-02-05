import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmvbd.com'

export const defaultMetadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein',
        template: "%s | Track My Vehicle - Bondstein",
    },
    description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
    keywords: [
        "GPS Tracking Bangladesh", "Best Car Tracker BD", "Fleet Management System Bangladesh", "Vehicle Security System", "Vehicle Tracking", "Track My Vehicle", "Runner", "Bondstein", "Real-time Vehicle Tracking", "Engine Lock GPS", "BTRC Approved Tracker", "VTS Regular", "VTS Voice", "Disha AI Fleet"
    ],

    openGraph: {
        title: 'Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein',
        description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
        url: baseUrl,
        siteName: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
        images: [
            {
                url: `${baseUrl}/images/og.png`,
                width: 1200,
                height: 630,
                alt: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein',
        description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
        images: [`${baseUrl}/images/og.png`],
        creator: '@bondstein',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // verification: {
    //     google: 'your-google-verification-code',
    //     yandex: 'your-yandex-verification-code',
    // },

    alternates: {
        canonical: baseUrl,
    },
}

export const extendMetadata = (metadata: Metadata) => {
    return {
        ...defaultMetadata,
        ...metadata,
        openGraph: {
            ...defaultMetadata.openGraph,
            ...metadata.openGraph,
            images: metadata.openGraph?.images || defaultMetadata.openGraph?.images,
        },
        twitter: {
            ...defaultMetadata.twitter,
            ...metadata.twitter,
            images: metadata.twitter?.images || defaultMetadata.twitter?.images,
        },
    }
}
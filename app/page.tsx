export const dynamic = "force-dynamic";

import AppSection from "@/components/pages/home/AppSection";
import GetInTouch from "@/components/pages/home/GetInTouch";
import { HowItWorks } from "@/components/pages/home/how-it-works";
import KeyFeatures from "@/components/pages/home/KeyFeatures";
import Landing from "@/components/pages/home/Landing";
import HoverScaleGroup from "@/components/pages/home/motions";
import { Partners } from "@/components/pages/home/Partners";
import Platform from "@/components/pages/home/Platform";
import Pricing from "@/components/pages/home/Pricing";
import OfferSlider from "@/components/pages/home/slider";
import Footer from "@/components/shared/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {

    title: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
    description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
    authors: [{ name: "Bondstein Technology Ltd." }],
    creator: "Bondstein Technology Ltd.",
    keywords: [
        "GPS Tracking Bangladesh", "Best Car Tracker BD", "Fleet Management System Bangladesh", "Vehicle Security System", "Vehicle Tracking", "Track My Vehicle", "Runner", "Bondstein", "Real-time Vehicle Tracking", "Engine Lock GPS", "BTRC Approved Tracker", "VTS Regular", "VTS Voice", "Disha AI Fleet"
    ],
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "https://tmvbd.com",
    },
    metadataBase: new URL("https://tmvbd.com/"),
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Track My Vehicle - Bondstein",
        title: "Track My Vehicle - Bondstein",
        description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
        url: "https://tmvbd.com",
        images: [
            {
                url: "/images/og.png",
                width: 512,
                height: 513,
                alt: "Track My Vehicle - Bondstein",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Track My Vehicle - Bondstein",
        description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
        images: ["/images/og.png"],
        creator: "@bondstein", // safe placeholder (remove if not used)
        site: "@bondstein",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon-16x16.png",
    },
    appleWebApp: {
        capable: true,
        title: "Track My Vehicle",
        statusBarStyle: "default",
    },
    formatDetection: {
        telephone: false,
        email: false,
        address: false,
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    category: "technology",
};

// types/product.ts
export interface ProductSubscription {
    duration_months: number;
    base_amount: string; // stored as string to match backend data (e.g. "500.00")
    discount_amount: string;
    final_amount: string;
    product_subscription_id: number;
}

export interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_details: string;
    product_base_amount: string;
    product_discount_amount: string;
    product_final_amount: string;
    product_warranty_period: number;
    product_specification: string;
    images: string[]; // can later be expanded to {url: string, alt?: string}[]
    subscriptions: ProductSubscription[];
    status: boolean;
    created_at: string; // e.g. "2025-10-29 03:31:16"
    updated_at: string;
    product_slug: string;
}

// Fetch store data keeping page server-side
async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
            {
                // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
                next: { revalidate: 3600 }, // or control revalidation at fetch-level
            }
        );
        if (!res.ok) {
            console.error("API returned non-OK status:", res.status);
            return [];
        }

        const data = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error("Unexpected API structure:", []);
            return [];
        }
        return data as Product[];
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
}

// Fetch store data keeping page server-side
async function getCurrentOffer(): Promise<string[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/offers`,
            {
                // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
                next: { revalidate: 3600 }, // or control revalidation at fetch-level
            }
        );
        if (!res.ok) {
            console.error("API returned non-OK status:", res.status);
            return [];
        }

        const data: {
            offer_images: string[];
            id: number;
            product_id: number;
            created_at: string;
            updated_at: string;
        } = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error("Unexpected API structure:", []);
            return [];
        }
        return data.map((item) => item.offer_images) as string[];
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
}

// Fetch store data keeping page server-side
async function getSpecialOffer(): Promise<string[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/special-offers`,
            {
                // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
                next: { revalidate: 3600 }, // or control revalidation at fetch-level
            }
        );
        if (!res.ok) {
            console.error("API returned non-OK status:", res.status);
            return [];
        }

        const data = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error("Unexpected API structure:", []);
            return [];
        }
        return data as string[];
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
}

export default async function HomePage() {
    const products = await getProducts();
    const offerBanners: string[] = await getCurrentOffer();
    const specialOffers: string[] = await getSpecialOffer();
    return (
        <main className="min-h-screen bg-white text-slate-900 2xl:space-y-[140px] xl:space-y-[120px] lg:space-y-[100px] md:space-y-20 sm:space-y-[70px] space-y-[50px]">
            <Landing offers={offerBanners} />
            <Pricing products={products} />
            <KeyFeatures />
            <HowItWorks />
            <Platform />
            <AppSection />
            <Partners />
            <OfferSlider offers={specialOffers} />
            <HoverScaleGroup />
            <GetInTouch />
            <Footer />
        </main>
    );
}
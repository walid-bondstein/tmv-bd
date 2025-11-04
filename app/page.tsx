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
    title: "Home | Track My Vehicle BD",
    description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
    keywords: [
        "tmv",
        "tmvbd",
        "Truck My Vehicle BD",
        "truck my vehicle bd",
        "Truck My Vehicle",
        "truck my vehicle",
    ],
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
};

// types/product.ts
export interface ProductSubscription {
    duration_months: number;
    base_amount: string;       // stored as string to match backend data (e.g. "500.00")
    discount_amount: string;
    final_amount: string;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
            // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
            next: { revalidate: 3600 }, // or control revalidation at fetch-level
        })
        if (!res.ok) {
            console.error('API returned non-OK status:', res.status)
            return []
        }

        const data = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error('Unexpected API structure:', [])
            return []
        }
        return data as Product[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}

// Fetch store data keeping page server-side
async function getCurrentOffer(): Promise<string[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/offers`, {
            // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
            next: { revalidate: 3600 }, // or control revalidation at fetch-level
        })
        if (!res.ok) {
            console.error('API returned non-OK status:', res.status)
            return []
        }

        const data = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error('Unexpected API structure:', [])
            return []
        }
        return data as string[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}

// Fetch store data keeping page server-side
async function getSpecialOffer(): Promise<string[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/special-offers`, {
            // cache: 'no-store', // 👈 use this if you want no caching (always fresh)
            next: { revalidate: 3600 }, // or control revalidation at fetch-level
        })
        if (!res.ok) {
            console.error('API returned non-OK status:', res.status)
            return []
        }

        const data = (await res.json()).data;

        if (!Array.isArray(data)) {
            console.error('Unexpected API structure:', [])
            return []
        }
        return data as string[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
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

/*
  SEO & implementation notes (short):
  - Keep title under 60 characters and description under 155 for SERPs. We used a keyword-first title: "Fleet Management System | Fleetly".
  - Use H1 for main product headline, H2 for feature sections, H3+ for subheads.
  - Ensure server-side rendered meta tags (Next.js Head) so crawlers read them.
  - Add JSON-LD for SoftwareApplication and FAQ structured data (extend as needed).
  - Performance tips: resize images, use next/image with AVIF/WebP, set caching headers, and lazy-load non-critical assets.
  - Accessibility: semantic tags (header/main/footer), aria-labels, and sufficient color contrast.

  Suggested primary target keywords (use naturally in page copy & blog articles):
  - fleet management system
  - vehicle tracking software
  - route optimization software
  - fleet telematics
  - fleet maintenance software

  Suggested content plan:
  1. Pillar page (this homepage) + /features, /pricing, /docs
  2. 10 blog posts targeting long-tail keywords (e.g., "how to reduce fleet fuel costs 2025", "gps tracker installation guide for small fleets")
  3. Case studies with measurable outcomes ("Reduced fuel spend by 18% for XYZ Logistics")

  Technical SEO checklist:
  - Add sitemap.xml and robots.txt
  - Implement hreflang if you target multiple languages/regions
  - Use canonical tags and structured data for key pages
  - Server-side rendering or pre-rendering for public content
*/

export const dynamic = "force-dynamic";
import AppSection from '@/components/pages/home/AppSection'
import { HowItWorks } from '@/components/pages/home/how-it-works'
import KeyFeatures from '@/components/pages/home/KeyFeatures'
import Landing from '@/components/pages/home/Landing'
import Platform from '@/components/pages/home/Platform'
import Pricing from '@/components/pages/home/Pricing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Home | Track My Vehicle BD",
  description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
  keywords: ["tmv", "tmvbd", "Truck My Vehicle BD", "truck my vehicle bd", "Truck My Vehicle", "truck my vehicle"],
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
}

export type Product = {
  id: number
  name: string
  description: string
  mrp: number
  discountPercent?: number
  subscriptionFee?: number
  warranty?: string
  features?: string[]
  image: string
}
export const products: Product[] = [
  {
    id: 1,
    name: "VTS Regular",
    description:
      "Real-time tracking, smart alerts, route history, and 25+ features with a 1-year warranty.",
    mrp: 5499,
    discountPercent: 14.3,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["Real-time tracking", "Smart alerts", "Route history"],
    image: "/images/vts-regular.png",
  },
  {
    id: 2,
    name: "VTS Regular + Voice",
    description:
      "Live GPS tracking with voice, smart alerts, and a 1-year warranty.",
    mrp: 5999,
    discountPercent: 14.3,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["Live GPS", "Voice support", "Smart alerts"],
    image: "/images/vts-regular-voice.png",
  },
  {
    id: 3,
    name: "VTS Lite",
    description:
      "Live GPS tracking, alerts, and route history with a 6-month warranty.",
    mrp: 3999,
    subscriptionFee: 399,
    warranty: "6 months",
    features: ["Live GPS", "Alerts", "Route history"],
    image: "/images/vts-lite.png",
  },
  {
    id: 4,
    name: "VTS Portable",
    description:
      "Rechargeable GPS tracker with a 20-day battery and live tracking route insights.",
    mrp: 7500,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["Rechargeable battery", "20-day standby", "Live tracking"],
    image: "/images/vts-portable.png",
  },
  {
    id: 5,
    name: "VTS OBD",
    description:
      "Plug-and-play GPS for new and hybrid vehicles with live tracking and alerts.",
    mrp: 5999,
    discountPercent: 14.3,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["OBD plug-and-play", "Live tracking", "Alerts"],
    image: "/images/vts-obd.png",
  },
  {
    id: 6,
    name: "VTS Intelligent Dashcam",
    description:
      "AI dashcam with live front, back, and cabin view. Detects fatigue and smoking.",
    mrp: 5999,
    discountPercent: 14.3,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["AI detection", "Front & rear camera", "Cabin monitoring"],
    image: "/images/vts-dashcam.png",
  },
  {
    id: 7,
    name: "VTS With Live Video (Front)",
    description:
      "Live GPS tracking with front camera, voice, smart alerts, and 1-year warranty.",
    mrp: 18000,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["Live video", "Front camera", "Smart alerts"],
    image: "/images/vts-live-front.png",
  },
  {
    id: 8,
    name: "VTS With Live Video (Both)",
    description:
      "Live GPS tracking with dual cameras (front & rear), voice, and smart alerts.",
    mrp: 18000,
    subscriptionFee: 499,
    warranty: "1 year",
    features: ["Dual cameras", "Live video", "Smart alerts"],
    image: "/images/vts-live-both.png",
  },
  {
    id: 9,
    name: "VTS Premium Fleet",
    description:
      "Fleet management solution with real-time analytics, reports, and live tracking.",
    mrp: 22000,
    subscriptionFee: 699,
    warranty: "1 year",
    features: ["Fleet analytics", "Driver insights", "Live map view"],
    image: "/images/vts-premium-fleet.png",
  },
  {
    id: 10,
    name: "VTS Pro Advanced",
    description:
      "Advanced tracking device with voice assistant, remote immobilizer, and cloud backup.",
    mrp: 25999,
    subscriptionFee: 699,
    warranty: "2 years",
    features: [
      "Voice assistant",
      "Remote immobilizer",
      "Cloud data backup",
      "Geofence alerts",
    ],
    image: "/images/vts-pro-advanced.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Landing />
      <Pricing products={products} />
      <HowItWorks />
      <Platform />
      <AppSection />
      <KeyFeatures />
    </main>
  )
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
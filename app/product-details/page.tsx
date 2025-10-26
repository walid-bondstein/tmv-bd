export const dynamic = "force-dynamic";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import DisplayProduct from "@/components/pages/product-details/DisplayProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details | Track My Vehicle BD",
  description: "Explore product specifications and pricing details for VTS Regular.",
  openGraph: {
    title: "Product Details",
    description: "Advanced telematics solutions for your fleet – explore VTS Regular.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Details",
    description: "Advanced telematics solutions for your fleet – explore VTS Regular.",
  },
};


const sampleProduct = {
  name: "VTS Regular",
  description:
    "Real-time tracking, smart alerts, route history, and 25+ features with a 1-year warranty.",
  mrp: 5499,
  discountPercent: 15.4,
  images: [
    "/images/vts-regular.png",
    "/images/vts-regular-2.png",
    "/images/vts-regular-3.png",
    "/images/vts-regular-4.png",
  ],
  subscriptionOptions: [
    { label: "1 Month", price: 499, duration: "For 1 Month Subscription" },
    { label: "3 Month", price: 499, duration: "For 3 Month Subscription" },
    { label: "6 Month", price: 899, duration: "For 6 Month Subscription" },
    { label: "12 Month", price: 1200, duration: "For 12 Month Subscription" },
  ],
};

export default function ProductDetailsPage() {
  return (
    <main className="bg-[#FAFAFA] text-slate-900">
      {/* Header */}
      <Header />
      <DisplayProduct product={sampleProduct} />
      {/* Footer */}
      <Footer />
    </main>
  );
}

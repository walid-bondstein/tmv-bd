export const dynamic = "force-dynamic";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import DisplayProduct from "@/components/pages/product-details/DisplayProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details | Track My Vehicle BD",
  description:
    "Explore detailed information and pricing for Track My Vehicle BD products.",
  openGraph: {
    title: "Product Details",
    description:
      "Advanced telematics solutions for your fleet – explore products in detail.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Details",
    description:
      "Advanced telematics solutions for your fleet – explore products in detail.",
  },
};

// Sample product data list
const products = [
  {
    id: 1,
    name: "VTS Regular",
    description:
      "Real-time tracking, smart alerts, route history, and 25+ features with a 1-year warranty.",
    mrp: 5499,
    discountPercent: 15.4,
    images: [
      "/images/vts-regular-1.png",
      "/images/vts-regular-2.png",
      "/images/vts-regular-3.png",
      "/images/vts-regular-4.png",
    ],
    subscriptionOptions: [
      { label: "1 Month", price: 499, duration: "For 1 Month Subscription" },
      { label: "3 Month", price: 699, duration: "For 3 Month Subscription" },
      { label: "6 Month", price: 899, duration: "For 6 Month Subscription" },
      { label: "12 Month", price: 1200, duration: "For 12 Month Subscription" },
    ],
  },
  {
    id: 2,
    name: "VTS Regular + Voice",
    description:
      "Live GPS tracking with voice features, route playback, and a 1-year warranty.",
    mrp: 5999,
    discountPercent: 10,
    images: [
      "/images/vts-voice-1.png",
      "/images/vts-voice-2.png",
      "/images/vts-voice-3.png",
      "/images/vts-voice-4.png",
    ],
    subscriptionOptions: [
      { label: "1 Month", price: 499, duration: "For 1 Month Subscription" },
      { label: "3 Month", price: 799, duration: "For 3 Month Subscription" },
      { label: "6 Month", price: 999, duration: "For 6 Month Subscription" },
      { label: "12 Month", price: 1400, duration: "For 12 Month Subscription" },
    ],
  },
  {
    id: 3,
    name: "VTS Lite",
    description:
      "Compact GPS tracker for small vehicles, with essential features and 6-month warranty.",
    mrp: 3999,
    discountPercent: 8,
    images: [
      "/images/vts-lite-1.png",
      "/images/vts-lite-2.png",
      "/images/vts-lite-3.png",
      "/images/vts-lite-4.png",
    ],
    subscriptionOptions: [
      { label: "1 Month", price: 399, duration: "For 1 Month Subscription" },
      { label: "3 Month", price: 599, duration: "For 3 Month Subscription" },
      { label: "6 Month", price: 699, duration: "For 6 Month Subscription" },
      { label: "12 Month", price: 999, duration: "For 12 Month Subscription" },
    ],
  },
  {
    id: 4,
    name: "VTS OBD",
    description:
      "Plug-and-play GPS for modern and hybrid vehicles with live tracking and maintenance alerts.",
    mrp: 5999,
    discountPercent: 12,
    images: [
      "/images/vts-obd-1.png",
      "/images/vts-obd-2.png",
      "/images/vts-obd-3.png",
      "/images/vts-obd-4.png",
    ],
    subscriptionOptions: [
      { label: "1 Month", price: 499, duration: "For 1 Month Subscription" },
      { label: "3 Month", price: 699, duration: "For 3 Month Subscription" },
      { label: "6 Month", price: 899, duration: "For 6 Month Subscription" },
      { label: "12 Month", price: 1200, duration: "For 12 Month Subscription" },
    ],
  },
];

// Page component with dynamic routing
export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  console.log("Selected Product:", product);

  if (!product) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Product Not Found</h1>
        <p className="text-gray-500 mt-2">
          Sorry, the product you’re looking for does not exist.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] text-slate-900">
      <Header />
      <DisplayProduct product={product} />
      <Footer />
    </main>
  );
}

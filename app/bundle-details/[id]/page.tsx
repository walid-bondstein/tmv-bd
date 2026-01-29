export const dynamic = "force-dynamic";

import { Product } from "@/app/page";
import BundleDisplayProduct from "@/components/pages/product-details/BundleDisplayProduct";
import ConfusedProducts from "@/components/pages/product-details/ConfusedProducts";
import FeaturedProducts from "@/components/pages/product-details/FeaturedProducts";
import ProductDescription from "@/components/pages/product-details/ProductDescription";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Metadata } from "next";




export const metadata: Metadata = {
  title: "Product Details | Track My Vehicle - Bondstein",
  description:
    "Explore detailed information and pricing for Track My Vehicle - Bondstein products.",
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
async function getBundleProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products-bundle`, {
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

// Page component with dynamic routing
export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const products = await getProducts() ?? [];
  const bundles = await getBundleProducts() ?? [];
  const product = bundles.find((p) => p.product_slug === id);
  const relatedProducts = products.filter((p) => p.product_slug !== id).slice(0, 4);

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
      <BundleDisplayProduct product={product} />
      <ProductDescription productSpecifications={{
        description: product?.product_description?.split('\r\n')?.filter(Boolean)?.map((para) => para?.trim()) ?? [],
        specifications: product?.product_specification?.split('\r\n')?.filter(Boolean)?.map((para) => para?.trim()) ?? [],
        productImage: product?.images[0] || "",
        productName: product?.product_name,
        gallery: product?.images || [],
      }} />
      <ConfusedProducts />
      <FeaturedProducts products={relatedProducts} />
      <Footer />
    </main>
  );
}

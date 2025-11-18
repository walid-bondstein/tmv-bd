import CartItem from "@/components/pages/cart/cartItem";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header-test";
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


// Page component with dynamic routing
export default function Page() {


    return (
        <main className="bg-[#FAFAFA] text-slate-900">
            <Header />
            <CartItem />
            <Footer />
        </main>
    );
}

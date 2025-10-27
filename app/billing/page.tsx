import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import DisplayProduct from "@/components/pages/product-details/DisplayProduct";
import { Metadata } from "next";
import BillingForm from "@/components/pages/billing/billing-form";

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
            <BillingForm />
            <Footer />
        </main>
    );
}

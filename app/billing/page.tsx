import BillingForm from "@/components/pages/billing/billing-form";
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

export type Option = {
    value: string;
    label: string;
}


// Fetch store data keeping page server-side
async function getDistrict(): Promise<Option[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/district-select`, {
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
        return data.map((item) => ({
            value: item?.id?.toString(),
            label: item.name
        })) as Option[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}

// Fetch store data keeping page server-side
async function getDivision(): Promise<Option[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/division-select`, {
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
        return data.map((item) => ({
            value: item?.id?.toString(),
            label: item.name
        })) as Option[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}
// Fetch store data keeping page server-side
async function getUpazila(): Promise<Option[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/upazila-select`, {
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
        return data.map((item) => ({
            value: item?.id?.toString(),
            label: item.name
        })) as Option[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}
// Fetch store data keeping page server-side
async function getUnion(): Promise<Option[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/union-select`, {
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
        return data.map((item) => ({
            value: item?.id?.toString(),
            label: item.name
        })) as Option[]
    } catch (error) {
        console.error('Error fetching stores:', error)
        return []
    }
}

// Page component with dynamic routing
export default async function Page() {
    const districtOptions = await getDistrict();
    const divisionOptions = await getDivision();
    const upazilaOptions = await getUpazila();
    const unionsOptions = await getUnion();
    return (
        <main className="bg-[#FAFAFA] text-slate-900">
            <Header />
            <BillingForm unions={unionsOptions} divitions={divisionOptions} districts={districtOptions} upazilas={upazilaOptions} />
            <Footer />
        </main>
    );
}

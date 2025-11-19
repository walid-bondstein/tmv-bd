import FeaturesSkeleton from "@/components/features/FeaturesSkeleton"
import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import features from '@/public/locales/featuresJSON/feature.json';

// Make metadata dynamic per-feature without making the page CSR.
export async function generateMetadata({ params }: { params: { feature_id: string } }) {
    const { feature_id } = await params;
    const featureData = features.find(feature => feature.url === feature_id);

    if (!featureData) {
        return {
            title: 'Feature Not Found',
            description: 'The feature you are looking for does not exist.',
            openGraph: {
                title: 'Feature Not Found',
                description: 'The feature you are looking for does not exist.',
                type: 'website',
            },
        };
    }

    return {
        title: featureData.title,
        keywords: featureData.real_world_applications.applications.join(', '),
        description: featureData.description ?? 'Monitor your vehicles with precise GPS tracking. Real-time fleet monitoring with advanced analytics, reporting, and management tools.',
        openGraph: {
            title: featureData.title,
            description: featureData.description ?? 'Monitor your vehicles with precise GPS tracking and advanced fleet management tools.',
            type: 'website',
        },
    };
}

export default async function Page({ params }: { params: { feature_id: string } }) {
    const { feature_id } = await params;
    const featureData = features.find(feature => feature.url === feature_id);
    if (!featureData) {
        return <div>
            <Header />
            <main className="component-container mx-auto my-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Feature Not Found</h1>
                <p className="text-lg text-muted-foreground">The feature you are looking for does not exist.</p>
            </main>
            <Footer />
        </div>
    };
    return <div>
        <Header />
        <FeaturesSkeleton featureDetails={featureData} />
        <Footer />
    </div>
}
import { Product } from "@/app/page";
import { BundlePricingCard } from "./BundlePricingCard";

export default function BundlePricing({ bundles }: {
    bundles: Product[],
}) {
    return (
        <div className="component-container mx-auto lg:space-y-16 md:space-y-8 space-y-2" id="pricing"  >
            <div>
                <h2 className="text-title text-center">Smart Deals for Smarter Fleets</h2>
                <p className="text-subtitle text-center">Explore bundled packages and special offers designed to give you more value at a better price.</p>
            </div>
            <section className="md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 my-10">
                {
                    bundles.map((product) => (
                        <BundlePricingCard key={product.id} product={product} />
                    ))
                }
            </section>
            <section className="md:hidden block overflow-x-auto px-4">
                <section className="flex justify-center min-w-max items-center gap-4 my-3">
                    {
                        bundles.map((product) => (
                            <BundlePricingCard key={product.id} product={product} />
                        ))
                    }
                </section>
            </section>
        </div>
    )
}

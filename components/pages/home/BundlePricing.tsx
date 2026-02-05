import { Product } from "@/app/page";
import { BundlePricingCard } from "./BundlePricingCard";

export default function BundlePricing({ bundles }: {
    bundles: Product[],
}) {
    return (
        <div className="component-container mx-auto lg:space-y-16 md:space-y-8 space-y-2" id="bundle-pricing"  >
            <div>
                <h2 className="text-title text-center">Smart Deals for Smarter Fleets</h2>
                <p className="text-subtitle text-center">Explore bundled packages and special offers designed to give you more value at a better price.</p>
            </div>
            <div className="rounded-2xl p-1 flex flex-col relative overflow-hidden">
                <div
                    className="w-full md:block hidden h-[100px] bg-rotate absolute z-1 translate-x-[50%] translate-y-[150%]"
                    style={{
                        animation: 'spin 7s linear infinite',
                        transformOrigin: 'top left',
                        // position: 'absolute',
                        // top: 0,
                        // right: 0,
                    }}
                />
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
                <section className="md:grid z-10 hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 rounded-2xl bg-white">
                    {
                        bundles.map((product) => (
                            <BundlePricingCard key={product.id} product={product} />
                        ))
                    }
                </section>
            </div>
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

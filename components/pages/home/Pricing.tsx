import { Product } from "@/app/page";
import { PricingCard } from "./PricingCard";

export default function Pricing({ products }: {
    products: Product[],
}) {
    return (
        <div className="component-container mx-auto lg:space-y-16 md:space-y-8 space-y-2" id="pricing"  >
            <div>
                <h2 className="text-title text-center">Find the right solution</h2>
                <p className="text-subtitle text-center">Explore products designed to power your fleet’s success.</p>
            </div>
            <section className="md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 my-10">
                {
                    products.map((product) => (
                        <PricingCard key={product.id} product={product} />
                    ))
                }
            </section>
            <section className="md:hidden block overflow-x-auto">
                <section className="flex justify-center border border-red-500 min-w-max items-center gap-4 my-3">
                    {
                        products.map((product) => (
                            <PricingCard key={product.id} product={product} />
                        ))
                    }
                </section>
            </section>
        </div>
    )
}

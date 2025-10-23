import { Product } from "@/app/page";
import { PricingCard } from "./PricingCard";

export default function Pricing({ products }: {
    products: Product[],
}) {
    return (
        <div className="component-container mx-auto lg:space-y-16 md:space-y-8 space-y-2"  >
            <div>
                <h2 className="text-title text-center">Product & Pricing Showcase</h2>
                <p className="text-subtitle text-center">Quick trust-building line BTRC Approved,</p>
            </div>
            <section className="md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 my-10">
                {
                    products.map((product) => (
                        <PricingCard key={product.id} product={product} />
                    ))
                }
            </section>
            <section className="md:hidden block overflow-x-auto px-4">
                <section className="flex justify-center min-w-max items-center gap-4 my-3">
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

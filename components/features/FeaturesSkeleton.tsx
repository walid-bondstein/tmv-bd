import { MapPin, Shield, Zap, Brain, Smartphone, Monitor, ShieldCheck, Cog, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { FeatureDetails } from './types'
import { Button } from '../ui/button'
import Link from 'next/link'

function getIconComponent(iconName: string) {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        'shield-check': ShieldCheck,
        'cog': Cog,
        'brain': Brain,
    }
    return iconMap[iconName] || Shield
}

function getPlatformIcon(type: string) {
    return type === 'Web Interface' ? Monitor : Smartphone
}

export default async function FeaturesSkeleton({
    featureDetails,
}: {
    featureDetails: FeatureDetails;
}) {
    return (
        <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-4 py-20 md:py-32 border-b border-border bg-gradient-animated">
                <div className="component-container mx-auto">
                    <div className="inline-block mb-4 px-3 py-1 bg-primary rounded-full border border-border animate-fade-in">
                        <span className="text-xs font-medium text-accent-foreground">{featureDetails['hero_section']?.['tag']}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-balance animate-fade-in animation-delay-200">
                        {featureDetails['hero_section']?.['title']}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2 font-semibold text-balance animate-fade-in animation-delay-300">
                        {featureDetails['hero_section']?.['subtitle']}
                    </p>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in animation-delay-400">
                        {featureDetails['hero_section']?.['description']}
                    </p>
                </div>
            </section>

            {/* Platforms Section */}
            <section className="px-4 py-20 md:py-32 border-b border-border">
                <div className="component-container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-slide-up">
                        {featureDetails['platform_section']?.['title']}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-16 text-balance animate-slide-up animation-delay-100">
                        {featureDetails['platform_section']?.['subtitle']}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {featureDetails['platform_section']?.['platforms'].map((platform, index) => {
                            const PlatformIcon = getPlatformIcon(platform['type'])
                            return (
                                <Card
                                    key={index}
                                    className={`p-8 border border-border hover:border-accent transition-all duration-300 hover:shadow-lg animate-slide-up ${index === 1 ? 'animation-delay-200' : 'animation-delay-100'}`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-primary/90 rounded-lg">
                                            <PlatformIcon className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            {platform['type']}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{platform['title']}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {platform['description']}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="px-4 py-20 md:py-32 border-b border-border">
                <div className="component-container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-balance animate-slide-up">
                        {featureDetails['key_benefits']?.['title']}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featureDetails['key_benefits']?.['benefits'].map((benefit, index) => {
                            const BenefitIcon = getIconComponent(benefit['icon'])
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-4 animate-slide-up animation-delay-${index === 0 ? '100' : index === 1 ? '200' : '300'}`}
                                >
                                    <div className="p-3 bg-primary rounded-lg w-fit">
                                        <BenefitIcon className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold">{benefit['title']}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {benefit['description']}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Real-World Applications Section */}
            <section className="px-4 py-20 md:py-32">
                <div className="component-container mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-slide-up">
                        {featureDetails['real_world_applications']?.['title']}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-16 text-balance animate-slide-up animation-delay-100">
                        {featureDetails['real_world_applications']?.['description']}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {featureDetails['real_world_applications']?.['applications'].map((app, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 p-6 rounded-lg border border-border hover:bg-card transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-${index === 0 ? '100' : index === 1 ? '200' : index === 2 ? '300' : '400'}`}
                            >
                                <Check className="w-6 h-6 text-primary-foreground shrink-0 mt-1" />
                                <p className="text-foreground leading-relaxed">
                                    {app}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20 md:py-32 border-t border-border bg-card/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                        Ready to Track Your Fleet?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 text-balance">
                        Join thousands of businesses using TMV&apos;s real-time GPS tracking to optimize operations and enhance security.
                    </p>
                    <Link href="/">
                        <Button className="px-8 py-6 text-base font-medium rounded-full cursor-pointer">
                            Get Started Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export interface FeatureDetails {
    page_id: string;
    hero_section: HeroSection;
    platform_section: PlatformSection;
    key_benefits: KeyBenefits;
    real_world_applications: RealWorldApplications;
}

export interface HeroSection {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
}

export interface PlatformSection {
    title: string;
    subtitle: string;
    platforms: PlatformItem[];
}

export interface PlatformItem {
    type: string;
    title: string;
    description: string;
    image: string;
}

export interface KeyBenefits {
    title: string;
    benefits: BenefitItem[];
}

export interface BenefitItem {
    icon: string;       // e.g. "shield-check", "cog", "brain"
    title: string;
    description: string;
}

export interface RealWorldApplications {
    title: string;
    description: string;
    applications: string[];
}

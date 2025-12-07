export interface FeatureDetails {
    _id: string;
    url: string;
    title: string;
    description: string;
    icon: string;
    colorCode: string;
    tag: string,
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


export interface ArticleData {
    _id: string,
    page_id: string,
    url: string,
    description: string,
    badge: string
    title: string
    subtitle: string
    featuredImage: {
        src: string
        alt: string
    },
    keyWords: string[]
    author: {
        name: string
        avatar?: string
    }
    readTime: number
    publishDate: string
    intro: string
    keyTakeaway: {
        title: string
        items: string[]
    }
    sections: Array<{
        id: string
        title: string
        content: string
        items?: string[]
        callToAction?: {
            text: string
            icon?: string
        }
    }>
    sidebar: {
        cta: {
            title: string
            description: string
            buttonText: string,
            link: string
        }
        tableOfContents: Array<{
            label: string
            id: string
        }>
    }
    relatedArticles: Array<{
        id: string
        category: string
        title: string
        image: string
        publishedAgo: string
    }>
}
import FeaturesSkeleton from "@/components/features/FeaturesSkeleton"
import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"

export const metadata = {
    title: "Real-Time GPS Tracking | Track My Vehicle BD",
    description: "Monitor your vehicles with precise GPS tracking. Real-time fleet monitoring with advanced analytics, reporting, and management tools.",
    keywords: "GPS tracking, fleet management, real-time tracking, telematics, vehicle monitoring",
    openGraph: {
        title: "Real-Time GPS Tracking | Track My Vehicle BD",
        description: "Monitor your vehicles with precise GPS tracking and advanced fleet management tools.",
        type: "website",
    },
}

const featureDetails = {
    "page_id": "real_time_gps_tracking",
    "hero_section": {
        "tag": "Feature",
        "title": "Real-Time GPS Tracking",
        "subtitle": "Monitor your vehicles with precise GPS tracking",
        "description": "Real-time GPS Tracking is the cornerstone of TMV's telematics system, enabling you to monitor your vehicle's precise location, speed, and direction at any moment using satellite and cellular technology."
    },
    "platform_section": {
        "title": "Available On All Platforms",
        "subtitle": "Access powerful telematics features from web dashboard or mobile app",
        "platforms": [
            {
                "type": "Web Interface",
                "title": "Desktop Dashboard",
                "description": "Comprehensive fleet overview with advanced analytics, reporting, and management tools optimized for large screens.",
                "image": "dashboard_image.png"
            },
            {
                "type": "Mobile Application",
                "title": "On-The-Go Access",
                "description": "Monitor your fleet from anywhere with our intuitive mobile app designed for field managers and drivers.",
                "image": "mobile_image.png"
            }
        ]
    },
    "key_benefits": {
        "title": "Key Benefits",
        "benefits": [
            {
                "icon": "shield-check",
                "title": "Enhanced Security",
                "description": "Instantly locate stolen or misplaced vehicles, reducing recovery time and potential losses."
            },
            {
                "icon": "cog",
                "title": "Operational Efficiency",
                "description": "Optimize dispatch and routing by knowing exactly where your vehicles are in real time."
            },
            {
                "icon": "brain",
                "title": "Peace of Mind",
                "description": "Stay connected to your vehicles 24/7 with updates as frequent as every few seconds."
            }
        ]
    },
    "real_world_applications": {
        "title": "Real-World Applications",
        "description": "How real-time tracking helps businesses and individuals",
        "applications": [
            "Fleet managers track vehicles to ensure timely arrivals and reroute during delays.",
            "Logistics companies locate assets in real time for optimized supply chain operations.",
            "Security teams recover stolen vehicles quickly using exact location data.",
            "Ride-sharing services dispatch drivers efficiently based on current positions."
        ]
    }
}

export default function Page() {
    return <div>
        <Header />
        <FeaturesSkeleton featureDetails={featureDetails} />
        <Footer />
    </div>
}
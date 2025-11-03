import KeyFuel from '@/public/svgs/keyFuel'
import KeyMarker from '@/public/svgs/keyMarker'
import KeyRoute from '@/public/svgs/keyRouter'
import KeySearch from '@/public/svgs/keySearch'
import KeySignal from '@/public/svgs/keySignal'
import KeyTimer from '@/public/svgs/keyTimer'
import React from 'react'
import FeatureCard from './FeatureCard'
import KeyArrow1 from '@/public/svgs/keyArrow1'
import KeyArrow2 from '@/public/svgs/keyArrow2'
import Image from 'next/image'

export default function KeyFeatures() {
    const features = {
        left: [
            {
                title: "Real-time GPS Tracking",
                description: "Track your vehicle’s exact location live, anytime, anywhere.",
                Icon: KeyMarker
            },
            {
                title: "Engine/Fuel Reports",
                description: "Monitor engine status and fuel consumption to reduce costs.",
                Icon: KeyFuel
            },
            {
                title: "24/7 Support",
                description: "Get round-the-clock assistance whenever you need it.",
                Icon: KeyTimer
            },
        ],
        right: [
            {
                title: "Route History",
                description: "Review past trips and optimize routes with detailed logs.",
                Icon: KeyRoute
            },
            {
                title: "Drive Mark",
                description: "Analyze driving behavior and promote safer, smarter journeys.",
                Icon: KeySearch
            },
            {
                title: "Geofence Alerts",
                description: "Receive instant notifications when vehicles enter or exit defined zones.",
                Icon: KeySignal
            },
        ],
    }
    return (
        <div id="features">
            <div className="component-container lg:block hidden mx-auto py-8">
                <div>
                    <h2 className="text-title text-center">Key Features TMV</h2>
                    <p className="text-subtitle text-center">Get your tracking device delivered and installed in your vehicle by our experts for seamless setup.</p>
                </div>
                <div className={`w-full relative bg-[url("/images/bg-keyFeatures.png")] bg-no-repeat bg-center bg-contain py-10`}>
                    <div className="lg:grid hidden grid-cols-3 gap-4 z-10">
                        <div className='flex flex-col gap-7 justify-center items-start'>
                            {
                                features.left.map((feature, index) => <FeatureCard key={index} title={feature.title} description={feature.description} Icon={feature?.Icon} />)
                            }
                            <KeyArrow2 className='ml-auto' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <video autoPlay loop muted
                                className="w-[237px] object-cover h-[389px] sm:w-[280px] sm:h-[460px] md:w-[320px] md:h-[525px] lg:w-[360px] lg:h-[590px] xl:w-[400px] xl:h-[656px] 2xl:w-[29rem] 2xl:h-[47.625rem] rounded-3xl"
                            >
                                <source src="/video/keyFeature.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className='flex flex-col gap-7 justify-center items-end'>
                            <KeyArrow1 className='mr-auto' />
                            {
                                features.right.map((feature, index) => <FeatureCard key={index} title={feature.title} description={feature.description} Icon={feature?.Icon} />)
                            }
                        </div>
                    </div>
                </div>
            </div>


            {/* Mobile View */}
            <div className="lg:hidden block mx-auto py-8 px-3">
                <div>
                    <h2 className="text-title text-center">Key Features TMV</h2>
                    <p className="text-subtitle text-center">Get your tracking device delivered and installed in your vehicle by our experts for seamless setup.</p>
                </div>
                <div className={`w-full relative bg-[url("/images/bg-keyFeatures.png")] bg-no-repeat bg-center bg-contain py-10`}>
                    <div className="lg:hidden">
                        <div className='flex justify-center relative items-center'>
                            <KeyArrow2 className='absolute bottom-0 left-0 w-[70px]' />
                            <video autoPlay loop muted
                                className="w-[237px] object-cover h-[389px] sm:w-[280px] sm:h-[460px] md:w-[320px] md:h-[525px] lg:w-[360px] lg:h-[590px] xl:w-[400px] xl:h-[656px] 2xl:w-[29rem] 2xl:h-[47.625rem] rounded-3xl"
                            >
                                <source src="/video/keyFeature.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <KeyArrow1 className='absolute top-0 right-0 w-[80px]' />
                    </div>
                </div>
                <div className='flex flex-col items-center gap-4 mt-10'>
                    {
                        [...features.left, ...features.right].map((feature, index) => <FeatureCard key={index} title={feature.title} description={feature.description} Icon={feature?.Icon} />)
                    }
                </div>
            </div>
        </div>
    )
}

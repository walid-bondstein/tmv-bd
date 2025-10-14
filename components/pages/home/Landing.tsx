import Header from "@/components/shared/Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function Landing() {
    return (
        <section
            className={`lg:bg-[url("/images/group.png")] lg:bg-no-repeat lg:bg-[length:50%_105%] lg:bg-[position:100%_0%] bg-secondary section-padding-y`}
            aria-labelledby="hero-heading"
        >
            <Header />
            <div className="component-container mx-auto">
                <div className=" mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                    {/* Left Column */}
                    <div className='flex flex-1 flex-col gap-6 lg:gap-8'>
                        <div className='space-y-2 lg:space-y-4 text-left'>
                            <Image
                                src={"/images/award.png"}
                                alt="Award"
                                width={130}
                                height={130}
                                className='w-14 h-14 md:w-[8.125rem] md:h-[8.125rem]'
                            />
                            <h1 className='font-semibold text-[clamp(28px,4.0625vw,78px)] leading-[1.03]'>
                                Track your vehicle. <br />
                                anytime. anywhere.
                            </h1>
                            <div className='flex justify-start items-center gap-4 lg:gap-6 '>
                                <button
                                    className="bg-submit lg:w-[9.7rem] xs:w-[9.8rem] xs:h-[3.25rem] w-[7rem] h-[2rem] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                                    type="submit"
                                >
                                    Buy Now
                                </button>
                                <button
                                    className="bg-btn-info lg:w-[9.7rem] xs:w-[9.8rem] xs:h-[3.25rem] w-[7rem] h-[2rem] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full flex-1">
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src="/images/background1.png"
                                alt="Hero visual"
                                fill
                                priority
                                className="h-full w-full rounded-xl object-contain"
                            />
                        </AspectRatio>
                    </div>
                </div>
            </div>
        </section>
    )
}
// translate-x-10 -translate-y-14
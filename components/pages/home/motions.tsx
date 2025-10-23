"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
    {
        id: 1,
        title: <p>Why Vehicle Tracking <br /> Saves Money</p>,
        sub: "Bondstein is the only company in Bangladesh operating tracking services with complete self owned platform.",
        bg: "/images/window-shield.png",
        learnMore: "/",
    },
    {
        id: 2,
        title: <p>Fleet Efficiency Made <br /> Simple with GPS</p>,
        sub: "Learn how data-driven helps managers streamline routes. Reduce downtime and keep vehicles protective.",
        bg: "/images/gps-map.jpg",
        learnMore: "/",
    },
    {
        id: 3,
        title: <p>The Role of Tracking in <br /> Preventing Accidents</p>,
        sub: "Discover how real-time monitoring and alerts can help drivers stay focused, avoid hazards, and respond quickly to emergencies.",
        bg: "/images/mobile-app.jpg",
        learnMore: "/",
    },
];

export default function HoverScaleGroup() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <div className="component-container mx-auto lg:space-y-16 md:space-y-8 space-y-2">
            <div>
                <h2 className="text-title text-center">Insightful Reads & Resources</h2>
                <p className="text-subtitle text-center">File storage made easy – including powerful features you won’t find anywhere else. Whether you’re.</p>
            </div>
            <div className="mx-auto lg:flex block space-y-4 lg:space-y-0 gap-4 w-full flex-wrap ">
                {cards.map((item, index) => (
                    <motion.div
                        key={index}
                        onMouseEnter={() => {
                            setActive(index)
                            setHovered(index)
                        }}
                        onMouseLeave={() => {
                            setActive(0)
                            setHovered(null)
                        }}
                        animate={{
                            flexGrow: active === index ? 2 : 1,
                            // scale: active === index ? 1.05 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                        }}
                        style={{
                            backgroundImage: `url(${item.bg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                        className={`bg-[url(${item.bg})] 2xl:p-11 xl:p-8 lg:p-5 p-3 2xl:h-[27.625rem] xl:h-[25.625rem] lg:h-[23.625rem] md:h-[20.625rem] h-[12rem] flex-col flex-1 text-white font-medium rounded-xl flex items-start justify-end text-center cursor-pointer select-none`}
                    >
                        <div>
                            <motion.h3 transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                            }} className="lg:text-3xl line-clamp-2 text-left md:text-2xl text-xl">{item.title}</motion.h3>
                            {index === hovered && (<motion.div
                                className="space-y-4 lg:flex hidden flex-col"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                }}

                            >
                                <p className="text-sm font-light text-left md:inline hidden" >{item.sub}</p>
                                <Link
                                    href={item.learnMore}
                                    prefetch={false}
                                    className="px-3 py-2 border-2 max-w-max"
                                >
                                    Learn More
                                </Link>
                            </motion.div>)}
                            <motion.div
                                className="space-y-4 flex lg:hidden flex-col"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                }}

                            >
                                <Link
                                    href={item.learnMore}
                                    prefetch={false}
                                    className="px-3 py-2 border-2 max-w-max"
                                >
                                    Learn More
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

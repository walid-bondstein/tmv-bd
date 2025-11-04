import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageSlider({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        images.map(src => {
            const img = new window.Image();
            img.src = src;
        });
        setLoaded(true);
    }, [images]);

    useEffect(() => {
        if (!loaded || images.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [loaded, images]);

    if (images.length === 0) {
        return (
            <Image
                src={"/images/storePlaceHolder.png"}
                alt={"Placeholder"}
                className="w-full h-full object-cover"
                fill
            />
        );
    }

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt="slideshow"
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </AnimatePresence>
        </div>
    );
}

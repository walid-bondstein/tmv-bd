const ConicBorder = ({ delay = "0s" }: { delay?: string }) => {
    return (
        <>
            {/* Rotating Conic Gradient Wrapper */}
            {/* Wrapper handles positioning (centering) */}
            <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 z-0 overflow-visible pointer-events-none">
                {/* Inner spinner handles rotation */}
                <div
                    className="w-full h-full animate-conic"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 100deg, #F36B24 160deg, #FDD10E 270deg, #F36B24 330deg, transparent 360deg)`,

                        animationDelay: delay
                    }}
                />
            </div>

            {/* Inner Mask (The Card Body) */}
            {/* Inset of 2px creates the border width */}
            <div
                className="absolute inset-px rounded-[9px] z-10"
                style={{
                    background: `linear-gradient(to bottom, #1E1E1E 50%, #333333 50%)`
                }}
            />
        </>
    );
};


{/* individual box */ }
export default function CounterCard({ title, value, delay = "0s" }: { title: string; value: number; delay?: string }) {
    // PAD with leading zero
    const formattedValue = value < 10 ? `0${value}` : `${value}`;

    return (
        <div className="flex flex-col items-center w-20 h-20 md:w-24 md:h-24">
            <h3 className="text-[#8D96A1] text-[10px] tracking-wider mb-1.5 font-medium font-titillium">
                {title}
            </h3>

            {/* Main Card Container */}
            {/* Overflow hidden clips the rotating giant gradient */}
            <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shadow-lg backdrop-blur-sm rounded-[11px] overflow-hidden">

                <ConicBorder delay={delay} />

                {/* Content Layer (z-20 to sit above mask) */}
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                    {/* upper half styling detail - optional decoration inside */}
                    {/* overlays removed as background is now handled in ConicBorder */}

                    <p className="bg-linear-to-b from-[#FDD10E] to-[#F36B24] bg-clip-text text-transparent font-lato font-semibold text-2xl md:text-4xl leading-none tracking-tight text-center z-30" style={{ letterSpacing: '-0.02em' }}>
                        {formattedValue}
                    </p>
                </div>
            </div>
        </div>
    );
}

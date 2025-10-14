import React from 'react'

const DefaultIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => <svg />;

export default function FeatureCard({
    title,
    description,
    Icon = DefaultIcon
}: {
    title: string,
    description: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
    return (
        <div className='2xl:max-w-[27.625rem] cursor-pointer xl:max-w-[25rem] lg:max-w-sm md:max-w-sm max-w-full rounded-xl border flex py-7 px-6 gap-4 justify-between items-center bg-white hover:bg-amber-100 hover:border-amber-100 transition-all duration-700'>
            <div className="2xl:h-[60px] 2xl:w-[60px] h-[50px] w-[50px]">
                <Icon />
            </div>
            <div>
                <h3 className='text-[clamp(20px,1.2499vw,24px)] font-semibold'>{title}</h3>
                <p className='text-[clamp(14px,0.8333vw,16px)] text-[#777F92]'>{description}</p>
            </div>
        </div>
    )
}

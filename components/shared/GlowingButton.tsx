import React from 'react'
import { Button } from '../ui/button'

interface GlowingButtonProps {
    title?: string
}

const GlowingButton = React.forwardRef<HTMLDivElement, GlowingButtonProps>(
    ({ title = "Current offers" }, ref) => {
        return (
            <div ref={ref} className="max-w-min rounded-full cursor-pointer p-px relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-gradient-rotation aspect-square"
                    style={{
                        animation: 'spin 2s linear infinite',
                    }}
                />
                <section className="grid z-10">
                    <Button className="rounded-full bg-black hover:bg-black text-white px-6 py-5 z-10">
                        <span
                            className="bg-submit bg-clip-text text-transparent font-semibold text-2xl"
                        >
                            {title}
                        </span>
                    </Button>
                </section>
            </div>
        )
    }
)

GlowingButton.displayName = 'GlowingButton'

export default GlowingButton

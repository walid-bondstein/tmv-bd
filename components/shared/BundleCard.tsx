import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function BundleCard() {
    return (
        <Card className="relative overflow-hidden rounded-2xl shadow-lg max-w-3xl p-0">
            {/* Ticket cut effect */}
            <div className="absolute inset-y-0 left-1/2 w-0 border-l-2 border-dashed border-red-500/20" />

            {/* Left + Right layout */}
            <CardContent className="grid grid-cols-1 md:grid-cols-[45%_55%] p-0">
                {/* Left image section */}
                <div className="relative bg-black flex items-center justify-center p-6">
                    {/* punch holes – 7 per side */}
                    {Array.from({ length: 7 }).map((_, i) => (
                        <span
                            key={`l-img-${i}`}
                            className="absolute -left-2 size-4 rounded-full bg-white"
                            style={{ top: `${8 + i * 12}%` }}
                        />
                    ))}
                    {Array.from({ length: 7 }).map((_, i) => (
                        <span
                            key={`r-img-${i}`}
                            className="absolute -right-2 size-4 rounded-full bg-white"
                            style={{ top: `${8 + i * 12}%` }}
                        />
                    ))}

                    <img
                        src="https://dummyimage.com/260x140/000/fff&text=VTS+Device"
                        alt="VTS Device"
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Right content section */}
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 text-black">
                    {/* punch holes – 7 per side */}
                    {Array.from({ length: 7 }).map((_, i) => (
                        <span
                            key={`l-content-${i}`}
                            className="absolute -left-2 size-4 rounded-full bg-black"
                            style={{ top: `${8 + i * 12}%` }}
                        />
                    ))}
                    {Array.from({ length: 7 }).map((_, i) => (
                        <span
                            key={`r-content-${i}`}
                            className="absolute -right-2 size-4 rounded-full bg-black"
                            style={{ top: `${8 + i * 12}%` }}
                        />
                    ))}

                    <div className="flex items-center gap-2 text-sm font-medium mb-3">
                        <Clock className="size-4" />
                        <span>08h : 14m : 55s</span>
                    </div>

                    <h2 className="text-3xl font-bold leading-tight">VTS Regular</h2>
                    <p className="text-sm mt-1">Device + 12 Months Subscription</p>

                    <div className="text-2xl font-bold mt-4">7,000 BDT</div>

                    <Button
                        variant="outline"
                        className="mt-6 rounded-full border-black text-black hover:bg-black hover:text-yellow-400"
                    >
                        Get Now →
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

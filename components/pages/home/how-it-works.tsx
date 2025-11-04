import { Button } from "@/components/ui/button";
import { Crown, ShoppingCart, Smartphone } from "lucide-react";
import type React from "react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Buy & Install Device",
    description:
      "Get your tracking device delivered and installed in your vehicle by our experts for seamless setup.",
  },
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Activate Subscription",
    description:
      "Choose a plan that fits your needs and activate your subscription instantly to start tracking.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Track on App/Web",
    description:
      "Monitor your vehicle's location and status anytime, anywhere through our mobile app or web platform.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="component-container mx-auto py-12 md:py-20 lg:py-24"
    >
      <div className="container lg:px-4 md:px-6 px-0 mx-auto w-full">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr] lg:gap-12 lg:items-start">
          {/* Left side - Title and CTA */}
          <div className="space-y-6">
            <div className="max-w-xs">
              <h2 className="text-3xl text-title tracking-tight text-balance">
                How <br /> It Works
              </h2>
              <p className="mt-2 text-muted-foreground text-subtitle text-pretty">
                Quick trust-building line BTRC <br /> Approved
              </p>
            </div>
            <Button
              className="bg-[#F3F5F8] cursor-pointer"
              variant="outline"
              size="lg"
            >
              See Plans & Pricing
            </Button>
          </div>

          {/* Right side - Steps with connectors */}
          <div className="relative flex items-start gap-8">
            {/* Dotted Line connector */}
            {/* <div className="absolute left-0 top-10 w-full border-t-2 z-[1] border-dashed border-muted-foreground/30" /> */}
            {steps.map((step, index) => (
              <div key={index} className="flex-1 z-[2] paper-container">
                {/* Step content */}
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="paper-drop-effect inline-flex 2xl:h-24 xl:h-20 lg:h-18 md:h-16 h-14 2xl:w-24 xl:w-20 lg:w-18 md:w-16 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="space-y-2 drop-card">
                    <h3 className="font-semibold text-lg text-balance">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4 mx-auto">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl text-title tracking-tight text-balance">
              How It Works
            </h2>
            <p className="mt-2 text-muted-foreground text-subtitle text-pretty">
              Quick trust-building line BTRC Approved
            </p>
          </div>

          {/* Steps stacked vertically */}
          <div className="space-y-6 mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg bg-[#F3F5F8] p-3"
              >
                {/* Icon */}
                <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  {step.icon}
                </div>

                {/* Text */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-base text-balance">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto bg-transparent"
            >
              See Plans & Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

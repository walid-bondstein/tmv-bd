import React, { ReactElement } from 'react'
import { NavigationMenuLink } from '../ui/navigation-menu';
import Link from 'next/link';
import CarLocation from '@/public/svgs/CarLocation';
import Remote from '@/public/svgs/Remote';
import Driver from '@/public/svgs/Driver';
import FuelStation from '@/public/svgs/FuelStation';
import Cargos from '@/public/svgs/Cargos';
import { Calculator, Car, Fuel, LucideIcon, MapPinned, ShieldCheck } from 'lucide-react';
const components: {
  title: string;
  href: string;
  description: string;
  colorCode: string;
  Icon: LucideIcon;
}[] = [
    {
      title: "Live Tracking",
      href: "/features/live-tracking",
      colorCode: "#F36B24",
      Icon: MapPinned,
      description:
        "Monitor real-time vehicle location, routes, and trip history.",
    },
    {
      title: "Remote Engine & Theft Protection",
      href: "/features/remote-engine-theft-protection",
      colorCode: "#1DD1A1",
      Icon: Calculator,
      description:
        "Lock/unlock engines remotely and secure assets against theft.",
    },
    {
      title: "Driver Safety Insights",
      href: "/features/driver-safety-insights",
      colorCode: "#D5AE01",
      Icon: ShieldCheck,
      description:
        "Track over speeding, harsh brakes, and risky maneuvers to improve safety.",
    },
    {
      title: "Trip, Fuel & Expense Analytics",
      href: "/features/trip-fuel-expense-analytics",
      colorCode: "#00A3FF",
      Icon: Fuel,
      description: "Measure mileage, fuel use, and trip costs to optimize efficiency.",
    },
    {
      title: "Fleet Optimization & Compliance",
      href: "/features/fleet-optimization-compliance",
      colorCode: "#4E6FF3",
      Icon: Car,
      description:
        "Reduce downtime, plan smarter routes, and stay updated with legal regulations.",
    }
  ]
export default function FeatureLinks() {
  return (
    <ul className="grid w-screen bg-[#FFFDFA] bg-[linear-gradient(149deg,rgba(255,253,250,1)_0%,rgba(255,253,251,1)_100%)]">
      <div className='component-container mx-auto'>
        <div className='lg:py-8 md:py-6 py-4 grid xl:grid-cols-3 lg:grid-cols-2 gap-4'>
          <div>
            <p className="text-[#777F92] font-semibold">Features</p>
            <div className='space-y-2'>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  Icon={component.Icon}
                  colorCode={component.colorCode}
                >
                  {component.description}
                </ListItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ul>
  )
}


function ListItem({
  title,
  children,
  href,
  Icon,
  colorCode,
  ...props
}: {
  title: string;
  children: React.ReactNode;
  href: string;
  colorCode: string,
  Icon: LucideIcon
}) {
  return (
    <li {...props}>
      <NavigationMenuLink className='max-w-93 p-4 hover:border-gray-200 border-2 border-transparent rounded-3xl hover:bg-white' asChild>
        <Link href={href}>
          <div className="flex items-center justify-start gap-4">
            <div className='w-10 h-10 rounded-full flex justify-center items-center shrink-0' style={{ backgroundColor: colorCode + '33' }}>
              <Icon size={40} stroke={colorCode} />
            </div>
            <div>
              <p className="text-base line-clamp-1 text-ellipsis font-bold">{title}</p>
              <p className="text-[#8D96A1] line-clamp-2 text-sm font-normal leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
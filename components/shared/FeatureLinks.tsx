import { Calculator, Car, ChevronsUp, CircleGauge, FileSpreadsheet, Fuel, LockKeyholeOpen, LucideIcon, MapPinCheck, MapPinned, MapPlus, Route, ShieldCheck, TrendingDown, TrendingUp, TriangleAlert, Trophy, Unplug, UserPlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import featrues from '../../public/locales/featuresJSON/feature.json';

const iconsMap: Record<string, LucideIcon> = {
  'MapPinned': MapPinned,
  'Calculator': Calculator,
  'ShieldCheck': ShieldCheck,
  'Fuel': Fuel,
  'Car': Car,
  'CircleGauge': CircleGauge,
  'MapPinCheck': MapPinCheck,
  'Route': Route,
  'Trophy': Trophy,
  'LockKeyholeOpen': LockKeyholeOpen,
  'UserPlus': UserPlus,
  'TrendingUp': TrendingUp,
  'TrendingDown': TrendingDown,
  'Unplug': Unplug,
  'TriangleAlert': TriangleAlert,
  'FileSpreadsheet': FileSpreadsheet,
  'ChevronsUp': ChevronsUp,
  'MapPlus': MapPlus
};



export default function FeatureLinks() {
  const components: {
    title: string;
    href: string;
    description: string;
    colorCode: string;
    Icon: LucideIcon;
    tag: string;
  }[] = featrues.map((feature) => ({
    title: feature.title,
    href: `/features/${feature.url}`,
    description: feature.description,
    colorCode: feature.colorCode,
    Icon: iconsMap[feature.icon] || MapPinned,
    tag: feature.tag,
  }));
  const feat = components.filter((item) => item.tag === 'Feature');
  const alert = components.filter((item) => item.tag === 'Alert');
  const report = components.filter((item) => item.tag === 'Report');
  return (
    <ul className="grid w-screen bg-[#FFFDFA] bg-[linear-gradient(149deg,rgba(255,253,250,1)_0%,rgba(255,253,251,1)_100%)] p-0">
      <div className='component-container mx-auto p-0'>
        <div className='lg:py-8 md:py-6 py-4 grid xl:grid-cols-3 lg:grid-cols-2 gap-4'>
          <div>
            <p className="text-[#777F92] font-semibold">Features</p>
            <div className='space-y-2'>
              {feat.map((component) => (
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
          <div>
            <p className="text-[#777F92] font-semibold">Report</p>
            <div className='space-y-2'>
              {report.map((component) => (
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
          <div>
            <p className="text-[#777F92] font-semibold">Alert</p>
            <div className='space-y-2'>
              {alert.map((component) => (
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
      <div className='max-w-93 p-4 hover:border-gray-200 border-2 border-transparent rounded-3xl hover:bg-white'>
        <Link href={href}>
          <div className="flex items-center justify-start gap-4">
            <div className='w-10 h-10 rounded-full flex justify-center items-center shrink-0' style={{ backgroundColor: colorCode + '33' }}>
              <Icon size={24} stroke={colorCode} />
            </div>
            <div>
              <p className="text-base line-clamp-1 text-ellipsis font-bold">{title}</p>
              <p className="text-[#8D96A1] line-clamp-2 text-sm font-normal leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </li>
  )
}
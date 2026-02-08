import type React from "react"
import { Lato } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/context/cart-context"
import WhatsAppButton from "@/components/shared/WhatsAppButton"
import { defaultMetadata } from "@/lib/metaData"
import Script from "next/script"

// export const metadata: Metadata = {
//   title: {
//     default: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//     template: "%s | Track My Vehicle - Bondstein",
//   },
//   description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
//   authors: [{ name: "Bondstein Technology Ltd." }],
//   creator: "Bondstein Technology Ltd.",
//   keywords: [
//     "GPS Tracking Bangladesh", "Best Car Tracker BD", "Fleet Management System Bangladesh", "Vehicle Security System", "Vehicle Tracking", "Track My Vehicle", "Runner", "Bondstein", "Real-time Vehicle Tracking", "Engine Lock GPS", "BTRC Approved Tracker", "VTS Regular", "VTS Voice", "Disha AI Fleet"
//   ],
//   referrer: "origin-when-cross-origin",
//   alternates: {
//     canonical: "https://tmvbd.com",
//   },
//   metadataBase: new URL("https://tmvbd.com/"),
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     siteName: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//     title: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//     description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
//     url: "https://tmvbd.com",
//     images: [
//       {
//         url: "https://tmvbd.com/images/og.png",
//         width: 1200,
//         height: 630,
//         alt: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//     description: "Secure your car with Track My Vehicle, the best BTRC-approved GPS tracking service in Bangladesh. Enjoy real-time tracking, remote engine lock and AI-driven fleet insights with live vehicle tracking. Get started today!",
//     images: ["https://tmvbd.com/images/og.png"],
//     creator: "@bondstein", // safe placeholder (remove if not used)
//     site: "@bondstein",
//   },
//   icons: {
//     icon: "/icon.png",
//     apple: "/icon.png",
//     shortcut: "/icon.png",
//   },
//   appleWebApp: {
//     capable: true,
//     title: "Best GPS Vehicle Tracking System in Bangladesh | Track My Vehicle - Bondstein",
//     statusBarStyle: "default",
//   },
//   formatDetection: {
//     telephone: false,
//     email: false,
//     address: false,
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },
//   category: "technology",
// }

export const metadata = defaultMetadata;

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
      >
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
          `}
      </Script>

      <Script
        id="facebook-pixel-code"
        strategy="afterInteractive"
      >
        {`
           !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
  fbq('track', 'PageView');
          `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga-script" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
      </Script>

      <body className={`font-sans ${lato.variable}`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <CartProvider>
          <Suspense>{children}</Suspense>
        </CartProvider>
        <Toaster position="top-right" richColors theme="light" />
        <WhatsAppButton />
      </body>
    </html>
  )
}

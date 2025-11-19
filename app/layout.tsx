import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/context/cart-context"
import WhatsAppButton from "@/components/shared/WhatsAppButton"

export const metadata: Metadata = {
  title: {
    default: "Track My Vehicle BD",
    template: "%s | Track My Vehicle BD",
  },
  description: "ADVANCED TELEMATICS SOLUTIONS FOR YOUR FLEET",
  keywords: [],
  authors: [{ name: "Bondstein Technology Ltd." }],
  creator: "Your Name",
  metadataBase: new URL("https://tmvbd.com/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Track My Vehicle BD",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   creator: "@yourusername",
  // },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}


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
      <body className={`font-sans ${lato.variable}`}>
        <CartProvider>
          <Suspense>{children}</Suspense>
        </CartProvider>
        <Toaster position="top-right" richColors theme="light" />
        <WhatsAppButton />
      </body>
    </html>
  )
}

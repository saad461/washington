import type { Metadata } from "next";
import React, { Suspense } from "react";
import Script from "next/script";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { 
 NavbarClient as Navbar,
 FooterClient as Footer,
 CookieBannerClient as CookieBanner
} from "@/components/ClientDynamic";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 display: "swap",
});

const poppins = Poppins({
 variable: "--font-poppins",
 subsets: ["latin"],
 weight: ["400", "500", "600", "700", "800", "900"],
 display: "swap",
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
 display: "swap",
});


export const metadata: Metadata = {
 metadataBase: new URL('https://wscss.site'),
 title: {
  default: "WA Child Support Calculator 2026 | Free | WSCSS",
  template: "%s"
 },
 description: "Calculate your 2026 Washington child support instantly using the official AOC economic table. Free for all 39 counties. Trusted by parents and attorneys.",
 keywords: ["Washington child support calculator", "WA child support 2026", "child support estimator", "Washington state family law", "AOC child support schedule"],
 authors: [{ name: "WSCSS Editorial & Legal Team", url: "https://wscss.site/about" }],
 creator: "WSCSS Editorial & Legal Team",
 icons: {
  icon: [
   {
    url: '/favicon-16x16.png',
    sizes: '16x16',
    type: 'image/png',
   },
   {
    url: '/favicon-32x32.png',
    sizes: '32x32',
    type: 'image/png',
   },
   {
    url: '/favicon-192x192.png',
    sizes: '192x192',
    type: 'image/png',
   },
   {
    url: '/favicon-512x512.png',
    sizes: '512x512',
    type: 'image/png',
   },
   {
    url: '/favicon.ico',
    sizes: 'any',
   },
  ],
  apple: [
   {
    url: '/apple-touch-icon.png',
    sizes: '180x180',
    type: 'image/png',
   },
  ],
  shortcut: '/favicon.ico',
 },
 manifest: '/site.webmanifest',
 openGraph: {
  type: "website",
  siteName: "WSCSS — Washington State Child Support Schedule",
  title: "WA Child Support Calculator 2026 | Free | WSCSS",
  description: "Calculate your 2026 Washington child support instantly using the official AOC economic table. Free for all 39 counties.",
  images: [{ url: 'https://wscss.site/wscss-og.webp', width: 1200, height: 630, alt: 'WSCSS Washington State Child Support Calculator 2026 — Free Estimate for All 39 Counties' }],
 },
 twitter: {
  card: 'summary_large_image',
  title: 'WA Child Support Calculator 2026 | WSCSS',
  description: 'Free instant child support estimate for Washington 2026. Official AOC economic table. All 39 counties covered.',
  images: ['https://wscss.site/wscss-og.webp'],
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
 }
};

export const viewport = {
 themeColor: '#6366f1',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" className={`${inter.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}>
 <head>
 {/* Performance: preconnect to ad & analytics origins for faster load */}
 <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
 <link rel="preconnect" href="https://www.googletagmanager.com" />
 <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
 <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
 <meta name="msapplication-TileColor" content="#1e3a5f" />
 <meta name="msapplication-TileImage" content="/favicon-192x192.png" />
 </head>
 <body className="min-h-full flex flex-col bg-page">
 <a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-indigo-600 focus:rounded"
 >
  Skip to main content
 </a>

 {/* Google AdSense — Publisher ID: ca-pub-9902783604679065 */}
 <Script
 async
 src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9902783604679065"
 crossOrigin="anonymous"
 strategy="afterInteractive"
 />
 {/* Google AdSense Anchor Ads (Auto-Ads) — Placeholder */}
 <Script id="adsense-anchor" strategy="afterInteractive">
 {`
 (adsbygoogle = window.adsbygoogle || []).push({
 google_ad_client: "ca-pub-9902783604679065",
 enable_page_level_ads: true,
 overlays: { bottom: true }
 });
 `}
 </Script>
 {/* Google Analytics (GA4) */}
 <Script
 src="https://www.googletagmanager.com/gtag/js?id=G-FV0272PCT1"
 strategy="afterInteractive"
 />
 <Script id="google-analytics" strategy="afterInteractive">
 {`
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', 'G-FV0272PCT1');
 `}
 </Script>
 <Navbar />
 <main id="main-content" className="flex-1 flex flex-col overflow-x-hidden">
 <Suspense fallback={<div className="min-h-screen bg-section-alt" />}>
 {children}
 </Suspense>
 </main>
 <Footer />
 <CookieBanner />
 </body>
 </html>
 );
}

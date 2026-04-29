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
 metadataBase: new URL('https://wcssc.site'),
 title: {
 default: "WCSSC — Washington Child Support Calculator 2026",
 template: "%s | WCSSC"
 },
 description: "Washington's most accurate 2026 child support calculator. Instantly estimate monthly obligations for all 39 counties using the official AOC economic table. Free, fast, court-compliant.",
 keywords: ["Washington child support calculator", "WA child support 2026", "child support estimator", "Washington state family law", "AOC child support schedule"],
 authors: [{ name: "WCSSC Editorial & Legal Team", url: "https://wcssc.site/about" }],
 creator: "WCSSC Editorial & Legal Team",
 openGraph: {
 type: "website",
 siteName: "WCSSC — Washington Child Support Schedule Center",
 title: "Washington Child Support Calculator 2026 | WCSSC",
 description: "Calculate your 2026 Washington State child support obligation instantly. Official AOC economic table. All 39 counties covered.",
 images: [{ url: '/wcssc-og.webp', width: 1200, height: 630, alt: 'WCSSC Washington Child Support Calculator 2026' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Washington Child Support Calculator 2026 | WCSSC',
 description: 'Calculate your 2026 Washington State child support obligation instantly. Official AOC economic table. All 39 counties covered.',
 images: ['/wcssc-og.webp'],
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
 }
};

export const viewport = {
 themeColor: '#6366F1',
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
 </head>
 <body className="min-h-full flex flex-col bg-page">

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
 src="https://www.googletagmanager.com/gtag/js?id=G-L7W5Q7N9W1"
 strategy="afterInteractive"
 />
 <Script id="google-analytics" strategy="afterInteractive">
 {`
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', 'G-L7W5Q7N9W1');
 `}
 </Script>
 <Navbar />
 <main className="flex-1 flex flex-col">
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

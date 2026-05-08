import React from 'react';
import AdSensePrivacy from '@/components/AdSensePrivacy';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | WSCSS Child Support Calculator" },
  description: "WSCSS privacy policy. We do not store personal calculation data. Analytics only. No data is ever sold or shared with third parties.",
  alternates: { canonical: 'https://wscss.site/privacy' },
  openGraph: {
    title: "Privacy Policy | WSCSS",
    description: "WSCSS privacy policy. No personal calculation data stored. Analytics only. No data sold or shared.",
    url: "https://wscss.site/privacy",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | WSCSS",
    description: "WSCSS privacy policy. No personal calculation data stored or sold.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function PrivacyPage() {
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | WSCSS",
    "url": "https://wscss.site/privacy",
    "description": "WSCSS privacy policy. No personal calculation data stored. Analytics only. No data sold.",
    "publisher": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site",
    },
  };

  return (
    <div className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
    {/* ── MINI HERO ────────────────────────────────────────────────────── */}
    <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
      />

      <div className="container-reading relative z-10 text-left">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap justify-start">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            Legal & Privacy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            At WSCSS, your privacy is our priority. Our 2026 calculator is designed to process data locally in your browser, ensuring no sensitive financial information is stored on our servers.
          </p>
        </div>
      </div>
    </section>

    {/* ── PRIVACY CONTENT ─────────────────────────────────────────────── */}
    <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100 last:border-0">
      <div className="container-reading">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-8">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            About Your Calculator Data
          </p>
          <p className="text-sm text-blue-800">
            Income figures and family details you enter into our calculator are never transmitted to our servers or stored anywhere. All calculations happen locally in your browser. This policy covers standard website analytics and advertising cookies only.
          </p>
        </div>

        <AdSensePrivacy />
      </div>
    </section>

  </div>
 );
}

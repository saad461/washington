import React from 'react';
import AdSensePrivacy from '@/components/AdSensePrivacy';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
 title: 'Privacy Policy | Washington Child Support Schedule Center',
 description: 'Privacy Policy and AdSense disclosure for WCSSC. We prioritize the security of your legal calculation data.',
 alternates: { canonical: 'https://wcssc.site/privacy' },
};

export default function PrivacyPage() {
 return (
  <main className="flex-1 bg-white">
    {/* ── MINI HERO ────────────────────────────────────────────────────── */}
    <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
      />

      <div className="container-reading relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Calculator
        </Link>

        <div className="flex flex-col gap-6">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Privacy & Data Security
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            At WCSSC, your privacy is our priority. Our 2026 calculator is designed to process data locally in your browser, ensuring no sensitive financial information is stored on our servers.
          </p>
        </div>
      </div>
    </section>

    {/* ── PRIVACY CONTENT ─────────────────────────────────────────────── */}
    <section className="section-default bg-[var(--color-bg-subtle)]">
      <div className="container-reading">
        <AdSensePrivacy />
      </div>
    </section>

    {/* ── MINI FOOTER ─────────────────────────────────────────────────── */}
    <div className="py-12 border-t border-[var(--color-bg-border-soft)] bg-white">
      <div className="container-reading text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Last Updated: January 2026</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-500">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">Legal Disclaimer</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <Link href="/" className="hover:text-blue-600 transition-colors">Calculator</Link>
        </div>
      </div>
    </div>
  </main>
 );
}

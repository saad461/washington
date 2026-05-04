import { Metadata } from 'next';
import Link from 'next/link';
import { washingtonCounties } from '@/data/washingtonCounties';
import { ArrowLeft } from 'lucide-react';
import CountyList from '@/components/courts/CountyList';

export const metadata: Metadata = {
  title: {
    absolute: "Washington State Court Directory — All 39 Counties | WCSSC"
  },
  description: "Find courthouse addresses, phone numbers, and filing information for all 39 Washington State counties. Updated 2026 court directory for child support filings.",
  alternates: { canonical: 'https://wcssc.site/washington-courts' },
};

export default function CourtsIndex() {
  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap justify-start">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Washington Courts
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
              All 39 Washington Counties
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington State Court Directory
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Find courthouse addresses, phone numbers, and filing links for every Washington State county — updated for 2026 child support filings.
            </p>
          </div>
        </div>
      </section>

      {/* ── COURTS GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] relative z-10 py-10 border-b border-gray-100">
        <div className="container-wide">
          <CountyList counties={washingtonCounties} />
        </div>
      </section>

      {/* ── MISSING COURTHOUSE ─────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100 last:border-0">
        <div className="container-reading">
          <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Data Error?
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Missing or Incorrect Court Info?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Help us keep our directory accurate. Send us the correct courthouse details and we&apos;ll update within 48 hours.
            </p>
            <a
              href="mailto:support@wcssc.site?subject=Court Directory Correction"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-200"
            >
              Submit a Correction →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

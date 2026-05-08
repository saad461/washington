import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Users, Database, Mail, Scale, Globe, CheckCircle2, Calculator, FileText, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: "About WSCSS | WA Child Support Schedule Center" },
  description: "WSCSS is an independent educational platform providing free, accurate Washington child support calculations based on the official 2026 RCW 26.19 economic tables.",
  alternates: { canonical: 'https://wscss.site/about' },
  openGraph: {
    title: "About WSCSS | WA Child Support Schedule Center",
    description: "WSCSS provides free, accurate Washington child support calculations based on the official 2026 RCW 26.19 economic tables.",
    url: "https://wscss.site/about",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WSCSS | WA Child Support Schedule Center",
    description: "WSCSS provides free, accurate Washington child support calculations based on the official 2026 RCW 26.19 economic tables.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-white">
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
                About WSCSS
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
              Who We Are
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              About <span className="text-blue-600">WSCSS</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              The Washington State Child Support Schedule (WSCSS) is an independent educational platform dedicated to helping Washington State families understand and estimate child support obligations under the 2026 guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="card-standard">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Scale size={20} />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <div className="space-y-4">
              <p className="text-[var(--color-text-body)] leading-relaxed text-lg">
                Navigating child support calculations can be overwhelming. WSCSS was built to demystify the process by providing a free, accurate, and easy-to-use calculator based on the official 2026 Washington State Child Support Economic Table.
              </p>
              <p className="text-[var(--color-text-body)] leading-relaxed">
                We believe every parent deserves access to transparent, understandable financial guidance — without requiring expensive legal consultations for basic estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ──────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100">
        <div className="container-reading">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">What We Build</h2>
          <p className="text-lg leading-relaxed text-[var(--color-text-body)] mb-10">
            WSCSS provides three free tools for Washington State parents and attorneys:
          </p>

          <div className="grid gap-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">The Child Support Calculator</h3>
                <p className="text-gray-600 leading-relaxed">
                  Uses the official 2026 economic table to produce an instant presumptive transfer payment estimate based on both parents net monthly incomes and number of children.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">The Worksheet Wizard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generates a complete 8-part AOC-compliant child support worksheet including healthcare, daycare, extraordinary expenses, and all limitation standards required for court submission.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">The County Court Directory</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lists courthouse addresses, phone numbers, clerk hours, and filing links for all 39 Washington counties updated for 2026 child support proceedings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR DATA SOURCES ────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">Our Data Sources</h2>
          <p className="text-lg leading-relaxed text-[var(--color-text-body)] mb-8">
            All calculations on WSCSS are based exclusively on official Washington State sources:
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-white border border-[var(--color-bg-border)] rounded-2xl shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">The 2026 Washington State Child Support Schedule (RCW Chapter 26.19)</strong> effective January 1 2026 published by the Administrative Office of the Courts.
              </p>
            </div>
            <div className="p-6 bg-white border border-[var(--color-bg-border)] rounded-2xl shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">The 2026 WSCSS Economic Table</strong> covering combined monthly net incomes from $2,200 to $50,000 per month for families of 1 to 5 children.
              </p>
            </div>
            <div className="p-6 bg-white border border-[var(--color-bg-border)] rounded-2xl shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">The official AOC worksheet format</strong> (WSCSS-Worksheets Mandatory CSW/CSWP 01/2026) required for all Washington court filings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE ARE NOT ─────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100">
        <div className="container-reading">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">What We Are Not</h2>
          <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl">
            <p className="leading-relaxed text-amber-900 text-lg mb-4">
              WSCSS is <strong>not a law firm</strong>. We do not provide legal advice.
            </p>
            <p className="leading-relaxed text-amber-800">
              Our tools produce estimates based on the standard calculation — actual court orders may differ based on deviations, extraordinary expenses, and judicial findings. Always consult a licensed Washington State family law attorney for advice specific to your situation.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT US ──────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100 last:border-0">
        <div className="container-reading">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">Contact Us</h2>
          <p className="text-lg text-[var(--color-text-body)] mb-8 leading-relaxed">
            For questions, corrections, or feedback contact the WSCSS editorial team at <a href="mailto:support@wscss.site" className="text-blue-600 font-bold hover:underline">support@wscss.site</a>. We typically respond within 2 business days. To report a calculation error please include your input values and the result you received.
          </p>

          <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-[var(--color-bg-border)] text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <Mail size={24} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Editorial Support</p>
            <a href="mailto:support@wscss.site" className="text-2xl font-bold text-blue-600 hover:underline break-all">
              support@wscss.site
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

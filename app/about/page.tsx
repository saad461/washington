import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Users, Database, Mail, Scale, Globe, CheckCircle2 } from 'lucide-react';

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
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10 text-left">
          {/* Breadcrumbs */}
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

      {/* ── DATA SOURCES ────────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <Database size={20} />
            </div>
            <h2 className="text-2xl font-bold">Data Sources & Methodology</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
              Our calculations are powered by official Washington State legislative and judicial records:
            </p>
            <ul className="grid grid-cols-1 gap-4">
              {[
                { title: "2026 Washington State Economic Table", desc: "Published by the Administrative Office of the Courts (AOC), effective January 1, 2026." },
                { title: "RCW 26.19", desc: "Washington's Revised Code governing child support obligations, including the Self-Support Reserve (SSR)." },
                { title: "WAC 388-14A", desc: "Washington Administrative Code rules for child support implementation." },
                { title: "County Court Data", desc: "Filing addresses and courthouse locations for all 39 Washington counties." },
              ].map((item, i) => (
                <li key={i} className="p-5 rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-subtle)] flex flex-col gap-1">
                  <span className="font-bold text-[var(--color-text-primary)]">{item.title}</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">{item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--color-text-secondary)] italic text-sm">
              All data is cross-referenced with official government publications and updated when legislative changes occur.
            </p>
          </div>
        </div>
      </section>

      {/* ── REVIEW PROCESS ──────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-2xl font-bold">Editorial & Legal Review</h2>
          </div>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
              Our content undergoes a rigorous multi-step review process to ensure accuracy and compliance with Washington State law:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Data Verification",
                  description: "Economic table values cross-checked against AOC publications for absolute accuracy."
                },
                {
                  title: "Legal Review",
                  description: "Content reviewed for compliance with RCW 26.19 and current Washington case law."
                },
                {
                  title: "Technical Audit",
                  description: "Calculation engine tested against thousands of edge cases and SSR thresholds."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COVERAGE ────────────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Globe size={20} />
            </div>
            <h2 className="text-2xl font-bold">Statewide Coverage</h2>
          </div>
          <div className="card-standard border-blue-100 bg-blue-50/30">
            <p className="leading-relaxed text-lg text-[var(--color-text-body)]">
              WSCSS provides detailed child support calculations for all <strong>39 Washington counties</strong>, including localized courthouse information, filing guidance, and county-specific insights.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
              From King County to Garfield County, our platform covers the full spectrum of Washington State jurisdictions with over 7,800 unique calculation pages.
            </p>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">Important Disclaimer</h2>
          </div>
          <div className="p-8 bg-white border border-amber-200 rounded-2xl shadow-sm">
            <p className="leading-relaxed text-[var(--color-text-body)]">
              WSCSS is <strong>not a law firm</strong> and does not provide legal advice. Our calculations are estimates for educational purposes only.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
              Actual court-ordered child support may differ based on healthcare costs, childcare expenses, custody arrangements, deviation petitions, and judicial discretion. We strongly recommend consulting a licensed Washington State family law attorney for specific legal guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100 last:border-0">
        <div className="container-reading">
          <div className="text-center space-y-4 mb-12">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
              <Mail size={24} />
            </div>
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Have questions, feedback, or data correction requests? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="max-w-md mx-auto p-8 bg-[var(--color-bg-subtle)] rounded-3xl border border-[var(--color-bg-border)] text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">General Inquiries</p>
            <a href="mailto:support@wscss.site" className="text-2xl font-bold text-blue-600 hover:underline break-all">
              support@wscss.site
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

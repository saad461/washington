import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | WCSSC — Washington Child Support Schedule Center',
  description: 'Important legal disclaimer for WCSSC. Our calculator provides estimates based on 2026 Washington State guidelines and is not a substitute for legal advice.',
  alternates: { canonical: 'https://wcssc.site/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Legal Disclaimer
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Important Notice
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Legal <span className="text-blue-600">Disclaimer</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              WCSSC provides estimates based on 2026 Washington State guidelines. This is an educational resource and is not a substitute for legal advice.
            </p>
          </div>
        </div>
      </section>

      {/* ── BANNER ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <div className="p-6 md:p-10 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start gap-4 md:gap-6 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-3">WCSSC Is Not a Law Firm</h2>
              <p className="text-amber-800 leading-relaxed text-lg">
                The Washington Child Support Schedule Center (WCSSC) is an independent educational resource. We are NOT a law firm, attorney, legal aid organization, or government agency. Nothing on this website constitutes legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS ────────────────────────────────────────────────────── */}
      <div className="bg-white py-10 border-b border-gray-100">
        <div className="container-reading text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Last Updated: April 9, 2026</p>
        </div>
      </div>

      {[
        {
          title: "1. Educational Purpose Only",
          body: "All calculations, estimates, and information provided by WCSSC are for educational and informational purposes only. Our calculator uses the 2026 Washington State Child Support Schedule as published by the Washington State Administrative Office of the Courts (AOC). Results are estimates and may differ from actual court-ordered support amounts."
        },
        {
          title: "2. No Attorney-Client Relationship",
          body: "Using this website or its tools does not create an attorney-client relationship between you and WCSSC, its operators, or any associated parties. For legal advice specific to your situation, you should consult with a licensed family law attorney in Washington State."
        },
        {
          title: "3. Accuracy of Information",
          body: "While we make every effort to keep our data accurate and current with the latest 2026 WA State Guidelines, WCSSC makes no guarantees regarding the accuracy, completeness, or timeliness of any calculation or legal information provided on this site."
        },
        {
          title: "4. Court Discretion",
          body: "Washington courts have the discretion to deviate from the standard child support schedule based on case-specific factors including but not limited to: deviation petitions, extraordinary expenses, and split custody arrangements."
        },
        {
          title: "5. Official Resources",
          body: "For official Washington State child support information, please visit the Washington State Department of Social & Health Services (DSHS) Division of Child Support at dshs.wa.gov, or the Washington State Courts at courts.wa.gov."
        },
        {
          title: "6. Limitation of Liability",
          body: "WCSSC, its operators, employees, and contributors shall not be liable for any damages arising from the use or reliance on information provided on this website. This includes direct, indirect, incidental, and consequential damages."
        }
      ].map((section, i, arr) => (
        <section key={i} className={`section-default ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-bg-subtle)]'} py-10 border-b border-gray-100 ${i === arr.length - 1 ? 'last:border-0' : ''}`}>
          <div className="container-reading">
            <div className="card-standard">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="leading-relaxed text-[var(--color-text-secondary)] text-lg">{section.body}</p>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}

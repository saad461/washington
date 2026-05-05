import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { glossaryTerms } from '@/data/glossary';
import { ArrowRight, ChevronRight, Calculator, FileText } from 'lucide-react';
import GlossaryClient from '@/components/glossary/GlossaryClient';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: "Washington Child Support Glossary 2026 — 20 Key Legal Terms Explained | WCSSC",
  description: "Plain-language definitions of 20 Washington State child support terms including SSR, imputed income, deviation, transfer payment, and economic table. Updated for 2026 RCW 26.19.",
  openGraph: {
    title: "Washington Child Support Glossary 2026 — 20 Key Legal Terms | WCSSC",
    description: "Plain-language definitions of 20 Washington State child support terms including SSR, imputed income, deviation, and transfer payment. Updated for 2026 RCW 26.19 guidelines.",
    images: [{ url: 'https://wcssc.site/wcssc-og.webp' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Washington Child Support Glossary 2026 — 20 Key Legal Terms | WCSSC",
    description: "Plain-language definitions of 20 Washington State child support terms. Updated for 2026 RCW 26.19 guidelines.",
    images: ['https://wcssc.site/wcssc-og.webp']
  },
  alternates: { canonical: 'https://wcssc.site/glossary' },
};

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Washington Child Support Glossary 2026",
  "description": "Plain-language definitions of Washington State child support legal terms under RCW 26.19. Updated for the 2026 economic table effective January 1 2026.",
  "url": "https://wcssc.site/glossary",
  "inDefinedTermSet": "https://wcssc.site/glossary",
  "hasDefinedTerm": glossaryTerms.map(term => ({
    "@type": "DefinedTerm",
    "name": term.name,
    "description": term.definition,
    "url": `https://wcssc.site/glossary/${term.slug}`
  }))
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do all Washington counties use the same child support formula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All 39 Washington counties use the same Washington State Child Support Schedule under RCW 26.19 and the same 2026 economic table. Calculation rules do not vary by county. Only court filing procedures and fees differ between counties."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between gross income and net income in Washington child support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gross income is all income before deductions. Net income is gross income after subtracting mandatory deductions including federal and state taxes, FICA, mandatory union dues, required pension contributions, and state insurance premiums. Washington's 2026 economic table uses net income not gross income."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Self-Support Reserve and how much is it in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Self-Support Reserve (SSR) is $2,394 per month in 2026. It ensures the paying parent retains enough income for basic living needs after making their child support payment. If paying the full obligation would leave the payer below $2,394 the obligation is automatically reduced. The minimum payment is still $50 per child per month."
      }
    },
    {
      "@type": "Question",
      "name": "How are healthcare and daycare costs handled in Washington child support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Healthcare and daycare costs are not included in the basic child support obligation from the economic table. They are added separately and shared proportionally based on each parent's income share percentage. The parent who pays these costs directly receives a credit on Line 16 of the worksheet."
      }
    },
    {
      "@type": "Question",
      "name": "What does it mean if my income is imputed by the court?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Imputed income means the court assigns you an estimated income based on your earning capacity rather than your actual earnings. This happens when the court finds you are voluntarily unemployed or working below your ability. The imputed amount is used in the child support calculation as if it were your actual income."
      }
    },
    {
      "@type": "Question",
      "name": "When can child support be modified in Washington?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Child support can be modified any time there is a substantial change in circumstances. Washington presumes a substantial change exists when the order would change by 15% or more based on current income. File your modification petition promptly as the new order is typically effective from the filing date not the date income changed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 45% income cap in Washington child support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 45% cap limits total child support for all a parent's children to no more than 45% of their net income. It is not automatic — courts must consider whether to apply it based on the best interests of all children involved. Good cause such as substantial wealth or special needs can justify exceeding the cap under RCW 26.19.065."
      }
    }
  ]
};

const glossaryFaqs = [
  {
    question: "Do all Washington counties use the same child support formula?",
    answer: "Yes. All 39 Washington counties use the same Washington State Child Support Schedule under RCW 26.19 and the same 2026 economic table. Calculation rules do not vary by county. Only court filing procedures and fees differ between counties."
  },
  {
    question: "What is the difference between gross income and net income in Washington child support?",
    answer: "Gross income is all income before deductions. Net income is gross income after subtracting mandatory deductions including federal and state taxes, FICA, mandatory union dues, required pension contributions, and state insurance premiums. Washington's 2026 economic table uses net income not gross income."
  },
  {
    question: "What is the Self-Support Reserve and how much is it in 2026?",
    answer: "The Self-Support Reserve (SSR) is $2,394 per month in 2026. It ensures the paying parent retains enough income for basic living needs after making their child support payment. If paying the full obligation would leave the payer below $2,394 the obligation is automatically reduced. The minimum payment is still $50 per child per month."
  },
  {
    question: "How are healthcare and daycare costs handled in Washington child support?",
    answer: "Healthcare and daycare costs are not included in the basic child support obligation from the economic table. They are added separately and shared proportionally based on each parent's income share percentage. The parent who pays these costs directly receives a credit on Line 16 of the worksheet."
  },
  {
    question: "What does it mean if my income is imputed by the court?",
    answer: "Imputed income means the court assigns you an estimated income based on your earning capacity rather than your actual earnings. This happens when the court finds you are voluntarily unemployed or working below your ability. The imputed amount is used in the child support calculation as if it were your actual income."
  },
  {
    question: "How do I request a deviation from the standard calculation?",
    answer: "Submit a written request to the court with specific evidence supporting the deviation. Common reasons include significant parenting time, extraordinary debt, children from other relationships, or the paying parent's substantial wealth. The court must enter written findings for any deviation granted or denied."
  },
  {
    question: "When can child support be modified in Washington?",
    answer: "Child support can be modified any time there is a substantial change in circumstances. Washington presumes a substantial change exists when the order would change by 15% or more based on current income. File your modification petition promptly — the new order is typically effective from the filing date not the date income changed."
  },
  {
    question: "What is the 45% income cap and does it apply to my case?",
    answer: "The 45% cap limits total child support for all a parent's children to no more than 45% of their net income. It is not automatic — courts must consider whether to apply it based on the best interests of all children involved. Good cause such as substantial wealth or special needs can justify exceeding the cap."
  }
];

export default function GlossaryIndex() {
  return (
    <div className="flex-1 bg-white relative w-full overflow-hidden pb-32">
      <Script
        id="glossary-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <Script
        id="glossary-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
                Glossary
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
              Legal Terms Explained
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington Child Support Glossary 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
              Plain-language definitions of key terms used in Washington State child support calculations and court filings.
            </p>

            {/* SEO Intro Content */}
            <div className="max-w-3xl space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Washington Child Support Legal Terms — 2026 Complete Guide
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Washington State uses the Income Shares Model under RCW 26.19 to calculate child support. Both parents net incomes are combined to determine the basic support obligation from the 2026 economic table. Each parent then pays their proportional share based on their percentage of combined income.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Understanding the key legal terms in this process is essential for parents completing the WSCSS worksheet, attending court hearings, or reviewing an existing support order. This glossary covers all 20 core terms used in the official 2026 Washington State Child Support Schedule including income definitions, calculation methods, court adjustment factors, limitation standards, and enforcement terminology.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                All definitions are based on RCW 26.19 and the 2026 AOC economic table effective January 1 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER ────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg-subtle)] pt-12 pb-6 relative z-20 border-b border-gray-100">
        <div className="container-wide">
          <GlossaryClient terms={glossaryTerms} />
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
      <section className="section-default bg-white py-16">
        <div className="container-reading">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Calculate Your Child Support?</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
              Now that you understand the key terms use our free 2026 Washington child support calculator or complete the full 8-part official worksheet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="btn-primary-lg btn-primary !rounded-full w-full sm:w-auto">
                <Calculator className="w-5 h-5 mr-2" />
                Start Free Calculator →
              </Link>
              <Link href="/worksheet" className="btn-secondary !rounded-full w-full sm:w-auto !border-2">
                <FileText className="w-5 h-5 mr-2" />
                Launch Full Worksheet →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-20 border-t border-gray-100">
        <div className="container-reading">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions About Washington Child Support Terms
          </h2>
          <div className="card-standard !p-0 overflow-hidden border-none shadow-xl">
             <FAQAccordion faqs={glossaryFaqs} defaultOpenCount={0} singleOpen={true} />
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY CTA ──────────────────────────────────────────────── */}
      <section className="section-default bg-white py-20 border-t border-gray-100 last:border-0">
        <div className="container-reading text-center">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6 mx-auto">Expert Analysis</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8">Need Detailed Guidance?</h2>
          <p className="text-lg text-[var(--color-text-body)] mb-12 leading-relaxed">
            Our editorial methodology ensures all definitions and calculations comply with the 2026 Washington State economic tables.
          </p>
          <Link href="/editorial-methodology" className="btn-primary-lg btn-primary !rounded-full">
            Our Methodology
          </Link>
        </div>
      </section>
    </div>
  );
}

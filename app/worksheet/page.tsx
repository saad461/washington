import { Metadata } from "next";
import WorksheetWizard from "@/components/WorksheetWizard";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, FileText } from "lucide-react";

const worksheetFAQs = [
  {
    question: "What if I don't know my exact tax deductions?",
    answer: "Use your most recent pay stub for FICA and withholding amounts. For annual taxes, divide last year's tax return total by 12.",
  },
  {
    question: "What is imputed income and do I need it?",
    answer: "Only fill in imputed income if a parent is voluntarily unemployed or working below their earning capacity. Leave blank if both parents are employed.",
  },
  {
    question: "Do I need to complete all 8 parts?",
    answer: "Parts 1-6 are required for every worksheet. Parts 7-8 are informational and for court consideration — complete them if you have relevant circumstances to document.",
  },
  {
    question: "Can I save and come back later?",
    answer: "Yes — your progress is automatically saved in your browser. Return to this page on the same device to continue where you left off.",
  },
  {
    question: "What is the difference between the worksheet and the quick calculator?",
    answer: "The quick calculator gives an instant estimate using income and children only. The full worksheet includes healthcare, daycare, education expenses, credits, and all 8 required AOC parts for court submission.",
  },
  {
    question: "Will this worksheet be accepted by Washington courts?",
    answer: "This wizard follows the official 2026 AOC format (RCW 26.19). The figures match the mandatory WSCSS forms. All results are estimates — final orders are determined by a Washington State court.",
  },
  {
    question: "What is the Self-Support Reserve?",
    answer: "The SSR ($2,394/mo in 2026) ensures the paying parent keeps enough income for basic needs. If paying the full obligation would leave the payer below $2,394, the obligation is automatically reduced. Minimum is still $50 per child per month. Detailed definition available in our <a href='/glossary/self-support-reserve' class='text-blue-600 hover:underline'>glossary</a>.",
  },
  {
    question: "Can I use this for a child support modification?",
    answer: "Yes. The same 8-part worksheet is used for new orders, modifications, and annual reviews. A 15% or more change in either parent's net income under RCW 26.09.170 typically qualifies for modification under Washington law.",
  },
  {
    question: "What is the Washington State Child Support Worksheet?",
    answer: "The WSCSS worksheet is an 8-part mandatory form required by RCW 26.19 for all child support proceedings in Washington State. Courts use it to calculate the presumptive monthly transfer payment based on both parents combined net income, number of children, and additional expenses.",
  },
  {
    question: "Who Needs to Complete This Worksheet?",
    answer: "Both parents must complete the worksheet for new child support orders, modifications, annual reviews, temporary support orders, and administrative hearings through DSHS.",
  },
  {
    question: "What Income Do I Use?",
    answer: "Washington uses net monthly income — not gross. Net income is gross wages minus mandatory deductions including federal and state income taxes, FICA, mandatory union dues, and required pension contributions.",
  },
  {
    question: "How Does Washington Calculate Child Support in 2026?",
    answer: "Washington uses the Income Shares Model. Both parents net incomes are combined and used to look up the basic support obligation in the 2026 Economic Table. Each parent pays their proportional share based on their percentage of combined income.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Washington Child Support Worksheet 2026 | Interactive Calculator" },
  description: "Fill out Washington's child support worksheet online, based on the official AOC format. Get instant results and a print-ready summary for your court filing.",
  alternates: { canonical: 'https://wscss.site/worksheet' },
  keywords: [
    "Washington child support worksheet",
    "Washington child support worksheet 2026",
    "WA child support worksheet calculator",
    "RCW 26.19 worksheet",
    "AOC child support worksheet 2026",
    "child support worksheet Washington State online",
  ],
  openGraph: {
    title: "Washington Child Support Worksheet 2026 | Interactive Calculator",
    description: "Fill out Washington's child support worksheet online, based on the official AOC format. Get instant results and a print-ready summary for your court filing.",
    url: "https://wscss.site/worksheet",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630, alt: "WSCSS Washington Child Support Worksheet 2026 — Official 8-Part AOC Form" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Child Support Worksheet 2026 | Interactive Calculator",
    description: "Fill out Washington's child support worksheet online, based on the official AOC format. Get instant results and a print-ready summary for your court filing.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function WorksheetPage() {
  return (
    <div className="flex-1 w-full bg-white">
      <CalculatorSchema url="https://wscss.site/worksheet" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Complete the Washington State Child Support Worksheet 2026",
            "description": "Complete the official 8-part Washington State child support worksheet using the 2026 RCW 26.19 economic tables",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Part 1: Income",
                "text": "Enter gross monthly wages, business income, maintenance received, and imputed income for both parents",
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Part 2: Basic Child Support Obligation",
                "text": "Calculate the basic support obligation from the 2026 Washington State economic table",
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Part 3: Healthcare, Daycare and Education",
                "text": "Enter monthly healthcare premiums, work-related daycare costs, and approved educational expenses",
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Part 4: Gross Child Support Obligation",
                "text": "Calculate total gross support obligation combining basic support and additional expenses",
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Part 5: Child Support Credits",
                "text": "Apply credits for health insurance, daycare paid directly, and other qualifying payments",
              },
              {
                "@type": "HowToStep",
                "position": 6,
                "name": "Part 6: Standard Calculation and Presumptive Amount",
                "text": "Determine the final presumptive monthly transfer payment between parents",
              },
              {
                "@type": "HowToStep",
                "position": 7,
                "name": "Part 7: Additional Informational Factors",
                "text": "Document relevant additional factors including existing support obligations and other children",
              },
              {
                "@type": "HowToStep",
                "position": 8,
                "name": "Part 8: Additional Factors for Court",
                "text": "Include any deviation factors, special circumstances, or requests for judicial deviation from the presumptive amount",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://wscss.site",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Child Support Worksheet",
                item: "https://wscss.site/worksheet",
              },
            ],
          }),
        }}
      />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap justify-start">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Child Support Worksheet
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-4">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Free · Official AOC Format · 2026 Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Support Worksheet 2026</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Complete our 8-part child support worksheet online, built to match the official AOC format. Auto-calculates all figures using the 2026 RCW 26.19 economic tables — free for all 39 Washington counties.
            </p>
          </div>
        </div>
      </section>

      {/* WorksheetWizard is the main content */}
      <WorksheetWizard />

      {/* ── AFTER COMPLETION SECTION ───────────────────────────────────── */}
      <section className="section-default border-t border-[var(--color-bg-border)] bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">

            <header className="mb-12 text-center">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">
                Next Steps
              </p>
              <h2 className="mt-2">What Happens After You Complete This Worksheet?</h2>
            </header>

            <div className="card-standard !p-8 md:!p-10 mb-12 shadow-[var(--shadow-card-md)]">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Once you complete all 8 parts, your worksheet produces the presumptive transfer payment amount required by Washington courts. Here is what to do next:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 font-bold text-sm">1</div>
                    <p className="text-gray-700">Download your completed worksheet as a PDF</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 font-bold text-sm">2</div>
                    <p className="text-gray-700">File it with your county superior court</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 font-bold text-sm">3</div>
                    <p className="text-gray-700">Attach it to your parenting plan or child support order</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 font-bold text-sm">4</div>
                    <p className="text-gray-700">Both parents sign under penalty of perjury</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 font-bold text-sm">5</div>
                    <p className="text-gray-700">The judge or reviewing officer approves the final order</p>
                  </li>
                </ul>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <p className="text-sm text-gray-500 italic">
                    Washington courts require this worksheet for all new child support orders, modifications, and annual reviews under RCW 26.19.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white border border-[var(--color-bg-border)] rounded-2xl">
               <p className="text-[var(--color-text-secondary)] text-sm m-0">
                Want to know how we arrived at these figures?
              </p>
              <Link
                href="/editorial-methodology"
                className="cta-link !font-bold"
              >
                Read our Editorial Methodology <ChevronRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── SEO CONTENT SECTION ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
          About This Tool
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Washington State Child Support Worksheet — 8-Part 2026 Official Format
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          This wizard generates the official Washington State child support worksheet as required by RCW 26.19 and the
          2026 Administrative Office of the Courts (AOC) guidelines. Complete all 8 parts to produce a court-ready
          calculation for any Washington county.
        </p>

        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 1</span>
            <span className="text-gray-600 text-sm">
              <strong>Income</strong> — Gross monthly wages, business income, maintenance received, and imputed income
              for both parents
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 2</span>
            <span className="text-gray-600 text-sm">
              <strong>Basic Child Support Obligation</strong> — Calculate the presumptive basic support amount from the
              2026 Washington State economic table based on combined net monthly income and number of children
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 3</span>
            <span className="text-gray-600 text-sm">
              <strong>Healthcare, Daycare & Education</strong> — Enter monthly health insurance premiums for the
              children, work-related daycare costs, and approved extraordinary educational expenses paid by either
              parent
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 4</span>
            <span className="text-gray-600 text-sm">
              <strong>Gross Child Support Obligation</strong> — Combine the basic support obligation with additional
              expenses to determine the total gross child support obligation before credits are applied
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 5</span>
            <span className="text-gray-600 text-sm">
              <strong>Child Support Credits</strong> — Apply credits for health insurance paid directly, daycare costs
              paid directly to the provider, and other qualifying payments made outside the transfer payment
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 6</span>
            <span className="text-gray-600 text-sm">
              <strong>Standard Calculation & Presumptive Amount</strong> — Determine each parent's proportional share of
              the gross obligation and calculate the final presumptive monthly transfer payment amount
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 7</span>
            <span className="text-gray-600 text-sm">
              <strong>Additional Informational Factors</strong> — Document existing child support obligations for other
              children, secondary families, and other relevant financial factors for the court record
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 8</span>
            <span className="text-gray-600 text-sm">
              <strong>Additional Factors for Court</strong> — Include any requests for deviation from the presumptive
              amount, special circumstances, extraordinary expenses, or other factors requiring judicial consideration
            </span>
          </li>
        </ul>

        <p className="text-sm text-gray-600 mt-6">
          For a quick estimate without the full worksheet, use our{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Washington child support calculator
          </a>
          . For county-specific guidance, see our{" "}
          <a href="/king-county-income-5000-2-children" className="text-blue-600 hover:underline">
            King County child support guide
          </a>{" "}
          or review the{" "}
          <a href="/editorial-methodology" className="text-blue-600 hover:underline">
            2026 calculation methodology
          </a>
          .
        </p>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Legal Note:</strong> This wizard produces estimates based on the 2026 Washington State Child Support
            Schedule. All calculations are estimates only. Final orders are determined by a Washington State court.
          </p>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Worksheet Questions</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions About the Washington Child Support Worksheet
        </h2>
        <FAQAccordion faqs={worksheetFAQs} />
      </section>
    </div>
  );
}

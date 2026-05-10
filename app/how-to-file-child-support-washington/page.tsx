import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle, Building2, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: "How to File Child Support in Washington 2026 | WSCSS" },
  description: "Step-by-step 2026 guide to filing child support in Washington. Required court forms, serving the other parent, and county filing procedures under RCW 26.19.",
  alternates: { canonical: 'https://wscss.site/how-to-file-child-support-washington' },
  openGraph: {
    title: "How to File Child Support in Washington 2026 | WSCSS",
    description: "Step-by-step 2026 guide to filing child support in Washington. Required forms, serving procedures, and county filing info under RCW 26.19.",
    url: "https://wscss.site/how-to-file-child-support-washington",
    type: "article",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to File Child Support in Washington 2026 | WSCSS",
    description: "Step-by-step guide to filing child support in Washington 2026. Required forms and county filing procedures.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function HowToFileGuide() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to File Child Support in Washington State 2026",
    "description": "Step-by-step guide to filing a child support petition in Washington State under RCW 26.19",
    "totalTime": "P30D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "314"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": "1",
        "name": "Calculate Your Presumptive Amount",
        "text": "Use the free WSCSS calculator to determine your presumptive 2026 child support amount based on both parents net monthly incomes and number of children."
      },
      {
        "@type": "HowToStep",
        "position": "2",
        "name": "Complete Mandatory Court Forms",
        "text": "Complete FL All Family 130 Child Support Worksheet and FL All Family 131 Financial Declaration. Attach two years of tax returns and current pay stubs as sealed exhibits."
      },
      {
        "@type": "HowToStep",
        "position": "3",
        "name": "File with the County Clerk",
        "text": "File your completed forms at the Superior Court Clerk office in the county where the child resides. Standard filing fee is $314."
      },
      {
        "@type": "HowToStep",
        "position": "4",
        "name": "Serve the Other Parent",
        "text": "Have a neutral third party over age 18 serve all filed documents on the other parent. File the Proof of Service with the clerk."
      },
      {
        "@type": "HowToStep",
        "position": "5",
        "name": "Attend Your Hearing",
        "text": "Attend your scheduled hearing with three copies of all filed documents. Both parents may present evidence to the judge or commissioner."
      },
      {
        "@type": "HowToStep",
        "position": "6",
        "name": "Receive Your Court Order",
        "text": "The court enters a written child support order stating the standard calculation and actual amount ordered under RCW 26.19.035."
      },
      {
        "@type": "HowToStep",
        "position": "7",
        "name": "Set Up Your Payment",
        "text": "Set up payment through the Washington State Support Registry. Contact the Division of Child Support at 1-800-442-5437 or dshs.wa.gov/dcs."
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wscss.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "How to File Child Support in Washington State",
        "item": "https://wscss.site/how-to-file-child-support-washington"
      }
    ]
  };

  return (
    <div className="flex-1 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Step-by-Step Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              How to File Child Support in <span className="text-blue-600">Washington State</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Navigating the family court system can be overwhelming. This guide breaks down the exact 2026 process for petitioning or modifying a child support order.
            </p>
          </div>
        </div>
      </section>

      {/* ── STEP 1 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">1</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Calculate Your Presumptive Amount</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600 mb-10">
              <p className="text-lg leading-relaxed">
                Before you file any paperwork, you must know what the state presumes your support amount should be. Washington law requires all child support petitions to include a formally calculated <strong className="text-gray-900">Washington State Child Support Worksheet (v2026)</strong>.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Generate Your Free Worksheet</h4>
                <p className="text-gray-500">Includes the mandatory 2026 economic table updates.</p>
              </div>
              <Link href="/worksheet" className="btn btn-primary btn-primary-lg w-full md:w-fit !rounded-full">
                Start Calculator <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 2 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">2</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Complete Mandatory Court Forms</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600 mb-10">
              <p className="text-lg leading-relaxed">
                You must complete the specific mandatory forms prescribed by the Washington State Administrative Office of the Courts (AOC). The core forms include:
              </p>
              <ul className="list-none space-y-6 pl-0 not-prose mt-8">
                {[
                  { title: "FL All Family 130 — Child Support Worksheet", desc: "The official form used to calculate monthly support obligations." },
                  { title: "FL All Family 131 — Financial Declaration", desc: "A mandatory disclosure where you swear under penalty of perjury regarding your income, expenses, and debts." },
                  { title: "Sealed Financial Documents — You must attach your two most recent tax returns and current pay stubs as sealed exhibits.", desc: "Failure to provide these can lead a judge to impute your income at an unfavorably high rate." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 bg-[var(--color-bg-subtle)] border border-gray-200 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 block mb-1 text-lg">{item.title}</span>
                      <span className="text-gray-600 leading-relaxed">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-900 leading-relaxed font-semibold">
                <strong className="text-amber-900">Warning:</strong> Failure to provide sealed financial source documents can lead a judge to impute your income at an unfavorably high rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 3 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">3</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">File with the County Clerk</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600 mb-10">
              <p className="text-lg leading-relaxed">
                Child support is handled at the county level. You must file your forms at the Superior Court Clerk&apos;s office in the county where the child resides.
              </p>
            </div>
            <div className="bg-gray-900 !p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />
              <div className="flex items-center gap-4 text-white relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Find Your Courthouse</h4>
                  <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Addresses for all 39 counties.</p>
                </div>
              </div>
              <Link href="/washington-courts" className="btn btn-primary !bg-white !text-gray-900 hover:!bg-gray-100 !rounded-full relative z-10">
                View Directory <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 4 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">4</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Serve the Other Parent</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed">
                Washington strictly enforces &quot;due process.&quot; The court cannot issue a child support order against someone who hasn&apos;t been properly notified. You must serve the other parent with copies of everything you filed.
              </p>
              <div className="mt-8 p-8 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-blue-900 font-semibold m-0 text-lg leading-relaxed">
                  <strong className="text-blue-600">Important:</strong> You cannot serve the papers yourself. They must be served by a neutral third party over the age of 18, or formally via certified mail if allowed by the court.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 5 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">5</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Attend Your Hearing</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed">
                Review your county court calendar for your scheduled hearing date. Bring three copies of everything you filed — your completed WSCSS worksheet, Financial Declaration (FL All Family 131), and your Proof of Service. Both parents may attend and present evidence. The judge or court commissioner will review your worksheet, verify the income figures, and may ask questions about extraordinary expenses or deviation requests. If both parents agree on the amount the hearing is typically brief. If there is a dispute the commissioner may schedule a longer evidentiary hearing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 6 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">6</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Receive Your Court Order</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed">
                After the hearing the court enters a written child support order. The order must state both the standard calculation amount and the actual amount ordered under RCW 26.19.035(4). If the ordered amount differs from the standard calculation the order must include written findings of fact explaining the deviation. Both parents receive a signed copy. The order is filed with the court clerk and becomes legally enforceable immediately upon entry. Keep your copy in a safe place — you will need it to set up payments and for any future modification proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 7 ──────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-200">7</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Set Up Your Payment</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed">
                Washington child support payments are processed through the Washington State Support Registry (WSSR) in most cases. Wage withholding is the standard method — the paying parent&apos;s employer receives an income withholding order and deducts the payment directly from each paycheck. To set up your payment account contact the Division of Child Support (DCS) at 1-800-442-5437 or visit <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dshs.wa.gov/dcs</a>. If the court orders direct payment between parents rather than through WSSR keep records of every payment made including dates, amounts, and confirmation numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] border-t border-gray-200">
        <div className="container-reading text-center">
          <div className="card-standard border-dashed border-2 border-gray-200 !p-12 shadow-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need legal help?</h2>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              While WSCSS provides estimates, complex cases often require a professional. We recommend consulting a licensed Washington State family law attorney.
            </p>
            <Link href="/contact" className="btn btn-secondary btn-primary-lg !rounded-full">
              Contact Editorial Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

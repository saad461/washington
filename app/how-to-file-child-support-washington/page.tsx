import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle, Building2, ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to File Child Support in Washington State (2026 Guide)',
  description: 'A step-by-step 2026 guide on how to file for child support in Washington. Includes required court forms, serving the other parent, and filing procedures.',
  alternates: { canonical: 'https://wcssc.site/how-to-file-child-support-washington' },
};

export default function HowToFileGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to File for Child Support in Washington State",
    "description": "Step-by-step instructions on filing family court forms for child support establishment or modification in WA.",
    "step": [
      { "@type": "HowToStep", "name": "Calculate Your Estimates", "text": "Complete the Washington Child Support Worksheet to determine the presumptive support amount." },
      { "@type": "HowToStep", "name": "Complete Required Forms", "text": "Fill out FL All Family 130 and FL All Family 131." },
      { "@type": "HowToStep", "name": "File with the Court Clerk", "text": "Submit the paperwork to your local County Superior Court Clerk and pay the filing fee." },
      { "@type": "HowToStep", "name": "Serve the Other Parent", "text": "Ensure the other parent is legally served with the filed documents." }
    ]
  };

  return (
    <main className="flex-1 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-reading section-default relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-2xl mb-8 shadow-[var(--shadow-card)]">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[var(--color-text-primary)]">
            How to File Child Support in Washington State
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Navigating the family court system can be overwhelming. This guide breaks down the exact 2026 process for petitioning or modifying a child support order.
          </p>
        </header>

        <div className="space-y-12 md:space-y-20">
          <section className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)] text-white font-bold text-xl shrink-0 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20">1</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Calculate Your Presumptive Amount</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)] mb-10">
              <p>
                Before you file any paperwork, you must know what the state presumes your support amount should be. Washington law requires all child support petitions to include a formally calculated <strong className="text-[var(--color-text-primary)]">Washington State Child Support Worksheet (v2026)</strong>.
              </p>
            </div>
            <div className="bg-[var(--color-bg-subtle)] p-8 rounded-2xl border border-[var(--color-bg-border)] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Generate Your Free Worksheet</h4>
                <p className="text-[var(--color-text-secondary)]">Includes the mandatory 2026 economic table updates.</p>
              </div>
              <Link href="/worksheet" className="btn-primary-lg btn-primary w-full md:w-fit !rounded-full">
                Start Calculator <ArrowRight size={18} />
              </Link>
            </div>
          </section>

          <section className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)] text-white font-bold text-xl shrink-0 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20">2</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Complete Mandatory Court Forms</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)] mb-10">
              <p>
                You must complete the specific mandatory forms prescribed by the Washington State Administrative Office of the Courts (AOC). The core forms include:
              </p>
              <ul className="list-none space-y-6 pl-0 not-prose">
                {[
                  { title: "FL All Family 130", desc: "Child Support Worksheet." },
                  { title: "FL All Family 131", desc: "Financial Declaration. You must swear under penalty of perjury regarding your income, expenses, and debts." },
                  { title: "Sealed Financial Documents", desc: "You must attach at least two years of full tax returns and your last six months of pay stubs." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-white border border-[var(--color-bg-border)] rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-success)] shrink-0" />
                    <div>
                      <span className="font-bold text-[var(--color-text-primary)] block mb-1">{item.title}</span>
                      <span className="text-[var(--color-text-body)] leading-relaxed">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="callout-amber !p-8 border-2">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[var(--color-warning)] shrink-0" />
                <p className="text-sm text-[var(--color-highlight)] leading-relaxed font-semibold">
                  <strong className="text-[var(--color-highlight)]">Warning:</strong> Failure to provide sealed financial source documents can lead a judge to impute your income at an unfavorably high rate.
                </p>
              </div>
            </div>
          </section>

          <section className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)] text-white font-bold text-xl shrink-0 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20">3</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">File with the County Clerk</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)] mb-10">
              <p>
                Child support is handled at the county level. You must file your forms at the Superior Court Clerk&apos;s office in the county where the child resides.
              </p>
            </div>
            <div className="card-highlighted !bg-[var(--color-text-primary)] !border-none !p-10 shadow-[var(--shadow-card-hover)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="flex items-center gap-4 text-white relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <Building2 className="w-8 h-8 text-[var(--color-brand-primary-mid)]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-white">Find Your Courthouse</h4>
                  <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Get addresses for all 39 WA counties.</p>
                </div>
              </div>
              <Link href="/washington-courts" className="btn-primary !bg-white !text-[var(--color-text-primary)] hover:!bg-[var(--color-bg-subtle)] !rounded-full relative z-10">
                View Directory <ChevronRight size={18} />
              </Link>
            </div>
          </section>

          <section className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card-md)]">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)] text-white font-bold text-xl shrink-0 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20">4</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Serve the Other Parent</h2>
            </div>
            <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)]">
              <p className="leading-relaxed">
                Washington strictly enforces &quot;due process.&quot; The court cannot issue a child support order against someone who hasn&apos;t been properly notified. You must serve the other parent with copies of everything you filed.
              </p>
              <div className="callout-blue mt-8">
                <p className="text-[var(--color-info)] font-semibold m-0">
                  <strong className="text-[var(--color-info)]">Important:</strong> You cannot serve the papers yourself. They must be served by a neutral third party over the age of 18, or formally via certified mail with a return receipt if allowed by the court.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="card-standard bg-[var(--color-bg-subtle)] border-dashed border-2 border-[var(--color-bg-border)] !p-12 text-center shadow-none mt-24 md:mt-32">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Need legal help?</h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            While WCSSC provides estimates, complex cases often require a professional. We recommend consulting a licensed Washington State family law attorney.
          </p>
          <Link href="/contact" className="btn-primary-lg btn-secondary !rounded-full">
            Contact Editorial Team
          </Link>
        </section>
      </div>
    </main>
  );
}

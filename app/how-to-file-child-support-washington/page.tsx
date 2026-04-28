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
    <main className="flex-1 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-reading section relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-brand-light text-brand rounded-2xl mb-8">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-display mb-8">
            How to File in Washington
          </h1>
          <p className="text-body-lg">
            Navigating family court can be overwhelming. This guide breaks down the exact 2026 process for petitioning or modifying a child support order.
          </p>
        </header>

        <div className="space-y-12 md:space-y-20">
          <section className="card !p-8 md:!p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand text-white font-bold text-xl shrink-0 shadow-lg">1</div>
              <h2 className="text-h2">Calculate Your Amount</h2>
            </div>
            <div className="mb-10">
              <p className="text-body">
                Before you file any paperwork, you must know what the state presumes your support amount should be. Washington law requires all child support petitions to include a formally calculated <strong>Washington State Child Support Worksheet (v2026)</strong>.
              </p>
            </div>
            <div className="section-subtle p-8 rounded-3xl border border-border-default flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-h4 !mb-2">Generate Your Worksheet</h4>
                <p className="text-body text-sm mb-0">Includes the mandatory 2026 economic table updates.</p>
              </div>
              <Link href="/worksheet" className="btn btn-primary btn-lg w-full md:w-fit">
                Start Calculator <ArrowRight size={18} />
              </Link>
            </div>
          </section>

          <section className="card !p-8 md:!p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand text-white font-bold text-xl shrink-0 shadow-lg">2</div>
              <h2 className="text-h2">Complete Mandatory Forms</h2>
            </div>
            <div className="mb-10">
              <p className="text-body">
                You must complete the specific mandatory forms prescribed by the AOC. The core forms include:
              </p>
              <ul className="list-none space-y-6 pl-0">
                {[
                  { title: "FL All Family 130", desc: "Child Support Worksheet." },
                  { title: "FL All Family 131", desc: "Financial Declaration. Swear under penalty of perjury regarding income." },
                  { title: "Sealed Financial Documents", desc: "You must attach at least two years of full tax returns and six months of pay stubs." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 card section-subtle">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                    <div>
                      <span className="text-body font-bold block !mb-1">{item.title}</span>
                      <span className="text-sm text-text-muted">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-4 badge-warning !p-6 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-warning shrink-0" />
              <p className="text-sm text-warning leading-relaxed font-bold mb-0">
                <strong>Warning:</strong> Failure to provide sealed source documents can lead a judge to impute income at an unfavorable rate.
              </p>
            </div>
          </section>

          <section className="card !p-8 md:!p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand text-white font-bold text-xl shrink-0 shadow-lg">3</div>
              <h2 className="text-h2">File with the County Clerk</h2>
            </div>
            <div className="mb-10">
              <p className="text-body">
                Child support is handled at the county level. You must file your forms in the county where the child resides.
              </p>
            </div>
            <div className="section-inverse p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="flex items-center gap-4 text-white">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Building2 className="w-8 h-8 text-brand" />
                </div>
                <div>
                  <h4 className="text-h4 !text-white !mb-1">Find Your Courthouse</h4>
                  <p className="text-sm !text-white opacity-80 mb-0">Get addresses for all 39 WA counties.</p>
                </div>
              </div>
              <Link href="/washington-courts" className="btn btn-secondary btn-lg !bg-white/10 !text-white !border-white/20 w-full md:w-fit">
                View Directory <ChevronRight size={18} />
              </Link>
            </div>
          </section>

          <section className="card !p-8 md:!p-12">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand text-white font-bold text-xl shrink-0 shadow-lg">4</div>
              <h2 className="text-h2">Serve the Other Parent</h2>
            </div>
            <div>
              <p className="text-body">
                Washington strictly enforces &quot;due process.&quot; You must serve the other parent with copies of everything you filed.
              </p>
              <div className="card card-brand mt-8">
                <p className="text-body font-bold text-brand mb-0">
                  <strong>Important:</strong> You cannot serve the papers yourself. They must be served by a neutral third party over 18.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-24 section-subtle p-12 rounded-3xl text-center border border-border-default">
          <h2 className="text-h2 mb-6">Need legal help?</h2>
          <p className="text-body-lg mb-10 max-w-2xl mx-auto">
            While WCSSC provides estimates, complex cases often require a professional. We recommend consulting a licensed attorney.
          </p>
          <Link href="/contact" className="btn btn-secondary btn-lg">
            Contact Editorial Team
          </Link>
        </section>
      </div>
    </main>
  );
}

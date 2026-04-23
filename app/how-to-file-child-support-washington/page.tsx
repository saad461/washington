import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle, Building2, ChevronRight } from 'lucide-react';

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
 {
 "@type": "HowToStep",
 "name": "Calculate Your Estimates",
 "text": "Complete the Washington Child Support Worksheet to determine the presumptive support amount."
 },
 {
 "@type": "HowToStep",
 "name": "Complete Required Forms",
 "text": "Fill out FL All Family 130 and FL All Family 131."
 },
 {
 "@type": "HowToStep",
 "name": "File with the Court Clerk",
 "text": "Submit the paperwork to your local County Superior Court Clerk and pay the filing fee."
 },
 {
 "@type": "HowToStep",
 "name": "Serve the Other Parent",
 "text": "Ensure the other parent is legally served with the filed documents."
 }
 ]
 };

 return (
 <div className="flex-1 bg-gray-50 relative w-full overflow-hidden font-sans">
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

 <div className="max-w-3xl mx-auto px-6 section-default relative z-10">

 <div className="mb-16 text-center">
 <div className="inline-flex p-3 bg-indigo-50 rounded-xl mb-6">
 <FileText className="w-8 h-8" />
 </div>
 <h1 className=" mb-6 ">
 How to File Child Support <br className="hidden sm:block" />in Washington State
 </h1>
 <p className="text-lg max-w-2xl mx-auto ">
 Navigating the family court system can be overwhelming. This guide breaks down the exact 2026 process for petitioning or modifying a child support order.
 </p>
 </div>

 <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-14 mb-12">

 <div className="prose prose-lg max-w-none space-y-12">

 <section>
 <h2 className=" flex items-center gap-4">
 <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white text-base">1</span>
 Calculate Your Presumptive Amount
 </h2>
 <p>
 Before you file any paperwork, you must know what the state presumes your support amount should be. Washington law requires all child support petitions to include a formally calculated <strong>Washington State Child Support Worksheet (v2026)</strong>.
 </p>
 <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
 <div>
 <h4 >Generate Your Free Worksheet</h4>
 <p className="text-sm ">Includes the mandatory 2026 economic table updates.</p>
 </div>
 <Link href="/worksheet" className="px-6 py-3 min-h-[48px] bg-indigo-600 text-white text-sm rounded-xl hover:bg-gray-100 transition-colors w-full sm:w-auto text-center shrink-0">
 Start Calculator
 </Link>
 </div>
 </section>

 <section>
 <h2 className=" flex items-center gap-4">
 <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white text-base">2</span>
 Complete the Mandatory Court Forms
 </h2>
 <p>
 You must complete the specific mandatory forms prescribed by the Washington State Administrative Office of the Courts (AOC). The core forms include:
 </p>
 <ul className="list-none stack-space pl-0">
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
 <span><strong>FL All Family 130:</strong> Child Support Worksheet.</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
 <span><strong>FL All Family 131:</strong> Financial Declaration. You must swear under penalty of perjury regarding your income, expenses, and debts.</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
 <span><strong>Sealed Financial Source Documents:</strong> You must attach at least two years of full tax returns and your last six months of pay stubs.</span>
 </li>
 </ul>
 <div className="flex items-start gap-3 bg-amber-50 p-5 rounded-xl border border-amber-200 mt-6 not-prose">
 <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
 <p className="text-sm text-amber-900 m-0"><strong>Warning:</strong> Failure to provide sealed financial source documents can lead a judge to impute your income at an unfavorably high rate.</p>
 </div>
 </section>

 <section>
 <h2 className=" flex items-center gap-4">
 <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white text-base">3</span>
 File with the County Clerk
 </h2>
 <p>
 Child support is handled at the county level. You must file your forms at the Superior Court Clerk&apos;s office in the county where the child resides. There is usually a filing fee (which varies by county) unless you qualify for a fee waiver (Form GR 34).
 </p>
 <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
 <div className="flex items-center gap-3">
 <Building2 className="w-8 h-8 " />
 <div>
 <h4 >Find Your Courthouse</h4>
 <p className="text-sm ">Get addresses and clerk phone numbers for all 39 WA counties.</p>
 </div>
 </div>
 <Link href="/washington-courts" className="px-6 py-3 min-h-[48px] bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-100 transition-colors w-full sm:w-auto text-center shrink-0 flex items-center justify-center">
 View Directory <ChevronRight className="w-4 h-4 ml-2" />
 </Link>
 </div>
 </section>

 <section>
 <h2 className=" flex items-center gap-4">
 <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white text-base">4</span>
 Serve the Other Parent
 </h2>
 <p>
 Washington strictly enforces &quot;due process.&quot; The court cannot issue a child support order against someone who hasn&apos;t been properly notified. You must serve the other parent with copies of everything you filed.
 </p>
 <p>
 <strong>Important:</strong> You cannot serve the papers yourself. They must be served by a neutral third party over the age of 18, or formally via certified mail with a return receipt if allowed by the court.
 </p>
 </section>

 </div>
 </article>

 </div>
 </div>
 );
}

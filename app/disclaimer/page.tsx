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
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-indigo-600 transition-colors mb-12 md:mb-16">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12 md:mb-16">
          <div className="p-4 bg-amber-500 rounded-2xl shadow-xl shadow-amber-500/20">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-1">Important Notice</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight font-heading">Legal Disclaimer</h1>
          </div>
        </div>

        {/* Not a Law Firm Banner */}
        <div className="p-6 md:p-8 bg-amber-50 border border-amber-200 rounded-2xl mb-12 flex flex-col sm:flex-row items-start gap-4 md:gap-6">
          <ShieldCheck className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2 tracking-tight font-heading">WCSSC Is Not a Law Firm</h2>
            <p className="text-amber-800 font-medium leading-relaxed">
              The Washington Child Support Schedule Center (WCSSC) is an independent educational resource. We are NOT a law firm, attorney, legal aid organization, or government agency. Nothing on this website constitutes legal advice, legal representation, or a professional legal opinion.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 md:space-y-10 text-gray-600 leading-relaxed">
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
              body: "While we make every effort to keep our data accurate and current with the latest 2026 WA State Guidelines, WCSSC makes no guarantees regarding the accuracy, completeness, or timeliness of any calculation or legal information provided on this site. Laws and guidelines change; always verify with official sources."
            },
            {
              title: "4. Court Discretion",
              body: "Washington courts have the discretion to deviate from the standard child support schedule based on case-specific factors including but not limited to: deviation petitions, extraordinary expenses, split custody arrangements, and significant disparities in parent income or wealth. Our calculator cannot account for all such factors."
            },
            {
              title: "5. Official Resources",
              body: "For official Washington State child support information, please visit the Washington State Department of Social & Health Services (DSHS) Division of Child Support at dshs.wa.gov, or the Washington State Courts at courts.wa.gov."
            },
            {
              title: "6. Limitation of Liability",
              body: "WCSSC, its operators, employees, and contributors shall not be liable for any damages arising from the use or reliance on information provided on this website. This includes direct, indirect, incidental, and consequential damages."
            }
          ].map((section, i) => (
            <div key={i} id={section.title.includes("Educational") ? "faq" : undefined} className="p-6 md:p-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight font-heading">{section.title}</h2>
              <p className="font-medium leading-relaxed md:leading-loose">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-900 rounded-2xl text-center text-gray-400">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6">Last Updated: January 2026</p>
          <div className="grid grid-cols-3 md:flex md:justify-center gap-4 md:gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors text-center">Terms of Service</Link>
            <Link href="/" className="hover:text-indigo-400 transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

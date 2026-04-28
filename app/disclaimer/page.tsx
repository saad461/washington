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
    <main className="flex-1">
      <div className="container-reading section">

        {/* Back Link */}
        <Link href="/" className="btn btn-ghost btn-sm mb-8 md:mb-12">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div className="p-4 bg-amber-500 rounded-2xl shadow-sm">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-overline mb-1 !text-amber-600">Important Notice</p>
            <h1 className="text-h1">Legal Disclaimer</h1>
          </div>
        </div>

        {/* Not a Law Firm Banner */}
        <section className="badge-warning !p-6 md:!p-8 rounded-2xl mb-8 md:mb-12 flex flex-col sm:flex-row items-start gap-4 md:gap-6">
          <ShieldCheck className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-h3 !text-amber-900 mb-2">WCSSC Is Not a Law Firm</h2>
            <p className="text-amber-800 text-body mb-0">
              The Washington Child Support Schedule Center (WCSSC) is an independent educational resource. We are NOT a law firm, attorney, legal aid organization, or government agency. Nothing on this website constitutes legal advice, legal representation, or a professional legal opinion.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <div className="space-y-6 md:space-y-8">
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
            <section key={i} className="card">
              <h2 className="text-h3 mb-4">{section.title}</h2>
              <p className="text-body mb-0">{section.body}</p>
            </section>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-12 border-t border-border-default text-center">
          <p className="text-overline mb-6 text-text-muted">Last Updated: January 2026</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-overline">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-brand transition-colors">About Us</Link>
            <Link href="/" className="hover:text-brand transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Users, Database, Mail, Scale, Globe, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About WCSSC | Washington Child Support Schedule Center',
  description: 'Learn about WCSSC — our mission, data sources, team credentials, and commitment to providing accurate 2026 Washington State child support calculations.',
  alternates: { canonical: 'https://wcssc.site/about' },
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="container-reading section-default">
        {/* Back Link */}
        <Link href="/" className="btn-ghost !h-10 !px-0 w-fit mb-8 md:mb-12">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-16">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-sm shadow-indigo-600/20">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="label-metadata mb-2">E-E-A-T Transparency</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About WCSSC</h1>
          </div>
        </div>

        <p className="mb-8 md:mb-12 text-lg leading-relaxed">
          The Washington Child Support Schedule Center (WCSSC) is an independent educational platform dedicated to helping Washington State families understand and estimate child support obligations under the 2026 guidelines.
        </p>

        <div className="space-y-8 md:space-y-12">
          {/* Mission */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <Scale className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Our Mission</h2>
            </div>
            <div className="md:pl-10">
              <p className="leading-relaxed">
                Navigating child support calculations can be overwhelming. WCSSC was built to demystify the process by providing a free, accurate, and easy-to-use calculator based on the official 2026 Washington State Child Support Economic Table. We believe every parent deserves access to transparent, understandable financial guidance — without requiring expensive legal consultations for basic estimates.
              </p>
            </div>
          </section>

          {/* Data Sources */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Data Sources & Methodology</h2>
            </div>
            <div className="md:pl-10 space-y-4">
              <p className="leading-relaxed">Our calculations are powered by:</p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li><strong>2026 Washington State Economic Table</strong> — Published by the Administrative Office of the Courts (AOC), effective January 1, 2026.</li>
                <li><strong>RCW 26.19</strong> — Washington&apos;s Revised Code governing child support obligations, including the Self-Support Reserve (SSR) of approximately $2,394/month.</li>
                <li><strong>WAC 388-14A</strong> — Washington Administrative Code rules for child support implementation.</li>
                <li><strong>County Court Data</strong> — Filing addresses, clerk contact information, and courthouse locations for all 39 Washington counties.</li>
              </ul>
              <p className="leading-relaxed">All data is cross-referenced with official government publications and updated when legislative changes occur.</p>
            </div>
          </section>

          {/* Review Process */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Editorial & Legal Review</h2>
            </div>
            <div className="md:pl-10 space-y-6">
              <p className="leading-relaxed">
                The WCSSC Editorial & Legal Team consists of family law advocates, data analysts, and technical developers with expertise in Washington State family law. Our content undergoes a multi-step review process:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { step: "01", label: "Data Verification", desc: "Economic table values cross-checked against AOC publications" },
                  { step: "02", label: "Legal Review", desc: "Content reviewed for compliance with RCW 26.19 and current case law" },
                  { step: "03", label: "Technical Audit", desc: "Calculation engine tested against known edge cases and SSR thresholds" },
                ].map((s) => (
                  <div key={s.step} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white label-metadata mb-4">{s.step}</div>
                    <p className="label-metadata mb-2 font-bold text-gray-900">{s.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coverage */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Coverage</h2>
            </div>
            <div className="md:pl-10">
              <p className="leading-relaxed">
                WCSSC provides detailed child support calculations for all <strong>39 Washington counties</strong>, including localized courthouse information, filing guidance, and county-specific insights. From King County to Garfield County, our platform covers the full spectrum of Washington State jurisdictions with over 7,800 unique calculation pages.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Important Disclaimer</h2>
            </div>
            <div className="md:pl-10">
              <p className="leading-relaxed">
                WCSSC is <strong>not a law firm</strong> and does not provide legal advice. Our calculations are estimates for educational purposes only. Actual court-ordered child support may differ based on healthcare costs, childcare expenses, custody arrangements, deviation petitions, and judicial discretion. We strongly recommend consulting a licensed Washington State family law attorney for specific legal guidance.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="card-standard">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Contact Us</h2>
            </div>
            <div className="md:pl-10">
              <p className="mb-6 leading-relaxed">Have questions, feedback, or data correction requests? We&apos;d love to hear from you.</p>
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 inline-block w-full sm:w-fit">
                <p className="label-metadata mb-2">General Inquiries & Support</p>
                <a href="mailto:support@wcssc.site" className="text-indigo-600 hover:underline font-medium break-all sm:break-normal">support@wcssc.site</a>
              </div>
            </div>
          </section>
        </div>

        {/* Mini Footer */}
        <div className="mt-16 pt-12 border-t border-gray-100 text-center">
          <p className="label-metadata mb-6 text-gray-400">Washington Child Support Schedule Center &copy; 2026</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 label-metadata">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link>
            <Link href="/" className="hover:text-indigo-600 transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

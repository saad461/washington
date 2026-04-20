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
    <div className="min-h-screen bg-[#FDFDFE] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">

        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors mb-16">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        <div className="flex items-center gap-5 mb-16">
          <div className="p-4 bg-indigo-600 rounded-[2rem] shadow-xl shadow-indigo-600/20">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-1">E-E-A-T Transparency</p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">About WCSSC</h1>
          </div>
        </div>

        <p className="text-slate-500 font-medium leading-relaxed mb-14 text-lg">
          The Washington Child Support Schedule Center (WCSSC) is an independent educational platform dedicated to helping Washington State families understand and estimate child support obligations under the 2026 guidelines.
        </p>

        <div className="space-y-8 text-slate-600">
          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Scale className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Our Mission</h2>
            </div>
            <p className="font-medium leading-loose pl-9">
              Navigating child support calculations can be overwhelming. WCSSC was built to demystify the process by providing a free, accurate, and easy-to-use calculator based on the official 2026 Washington State Child Support Economic Table. We believe every parent deserves access to transparent, understandable financial guidance — without requiring expensive legal consultations for basic estimates.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Data Sources &amp; Methodology</h2>
            </div>
            <div className="font-medium leading-loose pl-9 space-y-4">
              <p>Our calculations are powered by:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>2026 Washington State Economic Table</strong> — Published by the Administrative Office of the Courts (AOC), effective January 1, 2026.</li>
                <li><strong>RCW 26.19</strong> — Washington&apos;s Revised Code governing child support obligations, including the Self-Support Reserve (SSR) of approximately $2,394/month.</li>
                <li><strong>WAC 388-14A</strong> — Washington Administrative Code rules for child support implementation.</li>
                <li><strong>County Court Data</strong> — Filing addresses, clerk contact information, and courthouse locations for all 39 Washington counties.</li>
              </ul>
              <p>All data is cross-referenced with official government publications and updated when legislative changes occur.</p>
            </div>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Editorial &amp; Legal Review</h2>
            </div>
            <div className="font-medium leading-loose pl-9 space-y-4">
              <p>
                The WCSSC Editorial &amp; Legal Team consists of family law advocates, data analysts, and technical developers with expertise in Washington State family law. Our content undergoes a multi-step review process:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: "01", label: "Data Verification", desc: "Economic table values cross-checked against AOC publications" },
                  { step: "02", label: "Legal Review", desc: "Content reviewed for compliance with RCW 26.19 and current case law" },
                  { step: "03", label: "Technical Audit", desc: "Calculation engine tested against known edge cases and SSR thresholds" },
                ].map((s) => (
                  <div key={s.step} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black mb-3">{s.step}</div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-[11px] text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Globe className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Coverage</h2>
            </div>
            <p className="font-medium leading-loose pl-9">
              WCSSC provides detailed child support calculations for all <strong>39 Washington counties</strong>, including localized courthouse information, filing guidance, and county-specific insights. From King County to Garfield County, our platform covers the full spectrum of Washington State jurisdictions with over 7,800 unique calculation pages.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Important Disclaimer</h2>
            </div>
            <p className="font-medium leading-loose pl-9">
              WCSSC is <strong>not a law firm</strong> and does not provide legal advice. Our calculations are estimates for educational purposes only. Actual court-ordered child support may differ based on healthcare costs, childcare expenses, custody arrangements, deviation petitions, and judicial discretion. We strongly recommend consulting a licensed Washington State family law attorney for specific legal guidance.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-lg font-black text-slate-900">Contact Us</h2>
            </div>
            <div className="font-medium leading-loose pl-9">
              <p className="mb-4">Have questions, feedback, or data correction requests? We&apos;d love to hear from you.</p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
                <p className="text-sm font-bold text-slate-900">General Inquiries &amp; Support</p>
                <a href="mailto:support@wcssc.site" className="text-indigo-600 font-bold underline">support@wcssc.site</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-slate-900 rounded-[3rem] text-center text-slate-400">
          <p className="text-sm font-medium mb-4">Washington Child Support Schedule Center &copy; 2026</p>
          <div className="flex justify-center gap-8 text-xs font-black uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">Disclaimer</Link>
            <Link href="/" className="hover:text-indigo-400 transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

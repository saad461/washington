import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | WCSSC — Washington Child Support Schedule Center',
  description: 'Terms of Service for using the WCSSC child support calculator and educational resources. Read before using our 2026 Washington State calculation tools.',
  alternates: { canonical: 'https://wcssc.site/terms' },
};

export default function TermsPage() {
  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Terms of Service
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Legal Agreement
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Terms of <span className="text-blue-600">Service</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              By accessing or using WCSSC, you agree to be bound by the following Terms of Service. These terms govern your use of our 2026 Washington child support tools.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO ───────────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] py-10 border-b border-gray-100">
        <div className="container-reading">
          <p className="text-xl leading-relaxed text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
            Please read these terms carefully. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </div>
      </section>

      {/* ── TERMS ───────────────────────────────────────────────────────── */}
      {[
        {
          title: "1. Acceptance of Terms",
          body: "By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply to all visitors, users, and others who access or use the service."
        },
        {
          title: "2. Description of Service",
          body: "WCSSC provides an online educational calculator to estimate Washington State child support obligations based on the 2026 official schedule. Our service is provided 'as-is' for informational purposes only."
        },
        {
          title: "3. Permitted Use",
          body: "You may use WCSSC's tools for personal, non-commercial, educational purposes only. You agree not to reproduce or redistribute our content without permission or attempt to interfere with the website's technical systems."
        },
        {
          title: "4. Accuracy Disclaimer",
          body: "Our calculations are based on the 2026 Washington State Child Support Schedule and are updated to the best of our ability. However, we make no warranty as to the accuracy or completeness of any calculation."
        },
        {
          title: "5. Intellectual Property",
          body: "All content, design, code, and data on this website are the intellectual property of WCSSC unless otherwise noted. The underlying Washington State child support tables are public domain government data."
        },
        {
          title: "6. Third-Party Advertising",
          body: "WCSSC displays advertisements provided by Google AdSense. These ads are governed by Google's own terms of service and privacy policies. WCSSC does not control the content of these advertisements."
        },
        {
          title: "7. Limitation of Liability",
          body: "To the fullest extent permitted by law, WCSSC and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this service."
        },
        {
          title: "8. Changes to Terms",
          body: "We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use constitutes acceptance of the new terms."
        },
        {
          title: "9. Governing Law",
          body: "These Terms are governed by the laws of the State of Washington, United States, without regard to its conflict of law provisions."
        },
        {
          title: "10. Contact",
          body: "If you have questions about these Terms, please contact us at: support@wcssc.site."
        }
      ].map((section, i, arr) => (
        <section key={i} className={`section-default ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-bg-subtle)]'} py-10 border-b border-gray-100 ${i === arr.length - 1 ? 'last:border-0' : ''}`}>
          <div className="container-reading">
            <div className="card-standard">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <div className="md:pl-10">
                <p className="leading-relaxed text-[var(--color-text-secondary)] text-lg">{section.body}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, ArrowLeft, Shield } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Washington Child Support Schedule Center',
  description: 'Get in touch with the WCSSC editorial and support team. We value your feedback on our Washington child support tools.',
  alternates: { canonical: 'https://wcssc.site/contact' },
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Support & Feedback
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Contact <span className="text-blue-600">WCSSC</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error, our editorial team is ready to listen.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">How can we help?</h2>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  We value feedback from Washington parents and legal professionals. Reach out to the appropriate department below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-[var(--color-bg-border)] shadow-[var(--shadow-card)] flex items-start gap-4 hover:border-blue-300 transition-all group">
                  <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email Support</p>
                    <p className="font-bold text-[var(--color-text-primary)] break-all">support@wcssc.site</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-[var(--color-bg-border)] shadow-[var(--shadow-card)] flex items-start gap-4 hover:border-blue-300 transition-all group">
                  <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Editorial Team</p>
                    <p className="font-bold text-[var(--color-text-primary)] break-all">editor@wcssc.site</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Response Time</p>
                <p className="text-blue-900/70 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24-48 business hours. Please note that we cannot provide specific legal advice for individual cases.
                </p>
              </div>
            </div>

            {/* Right Column: Simple Contact Form */}
            <div className="lg:col-span-7">
              <div className="card-standard !p-8 md:!p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEGAL NOTICE ────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="p-8 md:p-12 bg-[var(--color-bg-subtle)] rounded-3xl text-center border border-[var(--color-bg-border)]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
              <Shield size={24} className="text-gray-400" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Important Legal Notice</p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
              WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance, please contact the <Link href="/washington-courts" className="text-blue-600 font-medium hover:underline">Washington State Courts</Link> directly or seek a licensed attorney.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

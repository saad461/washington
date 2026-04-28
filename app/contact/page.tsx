import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Washington Child Support Schedule Center',
  description: 'Get in touch with the WCSSC editorial and support team. We value your feedback on our Washington child support tools.',
  alternates: { canonical: 'https://wcssc.site/contact' },
};

export default function ContactPage() {
  return (
    <main className="flex-1 w-full">
      <div className="container section">

        {/* Back Link */}
        <Link href="/" className="btn btn-ghost btn-sm mb-8 md:mb-12">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div className="p-4 bg-brand rounded-2xl shadow-sm">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-overline mb-2">Support & Feedback</p>
            <h1 className="text-h1">Contact WCSSC</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-h2 mb-6">How can we help?</h2>
              <p className="text-body-lg">
                Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error in a county courthouse address, our editorial team is ready to listen.
              </p>
            </div>

            <div className="space-y-4">
              <div className="card !p-6 flex items-start gap-4 hover:border-brand transition-all group">
                <div className="p-4 bg-brand-light rounded-xl group-hover:bg-brand group-hover:text-white transition-colors text-brand">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-overline mb-2 !text-text-muted">Email Support</p>
                  <p className="text-body font-bold mb-0 break-all">support@wcssc.site</p>
                </div>
              </div>

              <div className="card !p-6 flex items-start gap-4 hover:border-brand transition-all group">
                <div className="p-4 bg-brand-light rounded-xl group-hover:bg-brand group-hover:text-white transition-colors text-brand">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-overline mb-2 !text-text-muted">Editorial Team</p>
                  <p className="text-body font-bold mb-0 break-all">editor@wcssc.site</p>
                </div>
              </div>
            </div>

            <div className="card card-brand !p-6">
              <p className="text-overline mb-2">Response Time</p>
              <p className="text-body text-sm mb-0">
                We typically respond to all inquiries within 24-48 business hours. Please note that we cannot provide specific legal advice for individual cases.
              </p>
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Legal Reminder */}
        <div className="mt-12 md:mt-16 card section-subtle !p-8 md:!p-12 text-center">
          <p className="text-overline mb-4 !text-text-muted">Important Legal Notice</p>
          <p className="text-body max-w-2xl mx-auto mb-0">
            WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance regarding child support in Washington, please contact the <Link href="/washington-courts" className="text-brand font-bold hover:underline">Washington State Courts</Link> directly or seek a licensed attorney.
          </p>
        </div>
      </div>
    </main>
  );
}

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
    <main className="flex-1 bg-page">
      <div className="container-wide section-default">

        {/* Back Link */}
        <Link href="/" className="btn-ghost !h-10 !px-0 w-fit mb-8 md:mb-12">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-sm shadow-indigo-600/20">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="label-metadata mb-2">Support & Feedback</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact WCSSC</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">How can we help?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error in a county courthouse address, our editorial team is ready to listen.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all group">
                <div className="p-4 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="label-metadata mb-2 text-gray-500">Email Support</p>
                  <p className="font-semibold text-gray-900 break-all">support@wcssc.site</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all group">
                <div className="p-4 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="label-metadata mb-2 text-gray-500">Editorial Team</p>
                  <p className="font-semibold text-gray-900 break-all">editor@wcssc.site</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="label-metadata text-indigo-600 mb-2">Response Time</p>
              <p className="text-indigo-900/70 text-sm leading-relaxed">
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
        <div className="mt-12 md:mt-16 p-8 md:p-12 bg-gray-50 rounded-3xl text-center border border-gray-200">
          <p className="label-metadata mb-4 text-gray-500">Important Legal Notice</p>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance regarding child support in Washington, please contact the <Link href="/washington-courts" className="text-indigo-600 font-medium hover:underline">Washington State Courts</Link> directly or seek a licensed attorney.
          </p>
        </div>
      </div>
    </main>
  );
}

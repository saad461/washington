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
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-indigo-600 transition-colors mb-12 md:mb-16">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12 md:mb-16">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 mb-1">Support & Feedback</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight font-heading">Contact WCSSC</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Contact Info */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight font-heading">How can we help?</h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-10">
              Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error in a county courthouse address, our editorial team is ready to listen.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Email Support</p>
                  <p className="text-gray-900 font-bold break-all">support@wcssc.site</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Editorial Team</p>
                  <p className="text-gray-900 font-bold break-all">editor@wcssc.site</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-indigo-900 font-bold text-sm mb-2">Response Time</p>
              <p className="text-indigo-700/70 text-sm leading-relaxed">
                We typically respond to all inquiries within 24-48 business hours. Please note that we cannot provide specific legal advice for individual cases.
              </p>
            </div>
          </div>

          {/* Simple Contact Form (UI Only) */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Legal Reminder */}
        <div className="mt-20 p-6 md:p-10 bg-gray-100 rounded-2xl text-center border border-gray-200">
          <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-4">Important Legal Notice</p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance regarding child support in Washington, please contact the <Link href="/washington-courts" className="text-indigo-600 font-bold underline">Washington State Courts</Link> directly or seek a licensed attorney.
          </p>
        </div>
      </div>
    </div>
  );
}

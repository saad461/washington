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
    <div className="min-h-screen bg-[#FDFDFE] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors mb-16">
          <ArrowLeft size={14} />
          Back to Calculator
        </Link>

        {/* Header */}
        <div className="flex items-center gap-5 mb-16">
          <div className="p-4 bg-indigo-600 rounded-[2rem] shadow-xl shadow-indigo-600/20">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1">Support & Feedback</p>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Contact WCSSC</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Contact Info */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">How can we help?</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error in a county courthouse address, our editorial team is ready to listen.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-gray-900 font-bold">support@wcssc.site</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Editorial Team</p>
                  <p className="text-gray-900 font-bold">editor@wcssc.site</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
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
        <div className="mt-20 p-10 bg-gray-50 rounded-[3rem] text-center border border-gray-100">
          <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-4">Important Legal Notice</p>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance regarding child support in Washington, please contact the <Link href="/washington-courts" className="text-indigo-600 font-bold underline">Washington State Courts</Link> directly or seek a licensed attorney.
          </p>
        </div>
      </div>
    </div>
  );
}

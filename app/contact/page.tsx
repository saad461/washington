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
 <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

 {/* Back Link */}
 <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest hover: transition-colors mb-12 md:mb-16">
 <ArrowLeft size={14} />
 Back to Calculator
 </Link>

 {/* Header */}
 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12 md:mb-16">
 <div className="p-4 bg-indigo-600 rounded-2xl shadow-sm shadow-indigo-600/20">
 <Mail className="w-8 h-8 text-white" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Support & Feedback</p>
 <h1 >Contact WCSSC</h1>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
 {/* Contact Info */}
 <div className="md:col-span-5">
 <h2 className=" mb-6 ">How can we help?</h2>
 <p className=" mb-10">
 Whether you found a bug in our 2026 calculator, have a suggestion for our legal glossary, or need to report an error in a county courthouse address, our editorial team is ready to listen.
 </p>

 <div className="space-y-6">
 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all">
 <div className="p-2 bg-indigo-50 rounded-xl">
 <Mail size={20} />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase mb-1">Email Support</p>
 <p className=" break-all">support@wcssc.site</p>
 </div>
 </div>

 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all">
 <div className="p-2 bg-indigo-50 rounded-xl">
 <MessageCircle size={20} />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase mb-1">Editorial Team</p>
 <p className=" break-all">editor@wcssc.site</p>
 </div>
 </div>
 </div>

 <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
 <p className=" text-sm mb-2">Response Time</p>
 <p className="text-indigo-700/70 text-sm ">
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
 <div className="mt-20 p-6 md:p-6 bg-gray-100 rounded-xl text-center border border-gray-200">
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase mb-4">Important Legal Notice</p>
 <p className=" text-sm max-w-2xl mx-auto">
 WCSSC is an educational tool and does not provide legal representation. If you are in immediate need of legal assistance regarding child support in Washington, please contact the <Link href="/washington-courts" className=" underline">Washington State Courts</Link> directly or seek a licensed attorney.
 </p>
 </div>
 </div>
 </div>
 );
}

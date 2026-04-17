"use client";

import Link from 'next/link';
import { Calculator, ArrowLeft, Search } from 'lucide-react';

/**
 * 404 - Not Found Page
 * Provides a SaaS-grade UX to recover users when they hit an invalid county or income slug.
 */
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 text-center py-24 md:py-32 relative overflow-hidden font-sans">
      <div className="max-w-md w-full relative z-10">
        <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-lg rotate-3 group hover:rotate-0 transition-transform duration-300">
          <Calculator className="w-10 h-10 text-indigo-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight font-heading">Page Not Found</h1>
        <p className="text-gray-500 leading-relaxed mb-12 text-lg">
          The requested calculation or county guide could not be located in our 2026 database. Most likely the income or county slug was formatted incorrectly.
        </p>

        <div className="space-y-3">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-3 w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Calculator
          </Link>
          
          <Link 
            href="/worksheet" 
            className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-gray-100 text-gray-900 font-bold rounded-xl shadow-sm hover:border-indigo-200 transition-all active:scale-[0.98]"
          >
            <Search className="w-5 h-5 text-indigo-500" />
            Use Worksheet Pro Wizard
          </Link>

          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
          >
            <Calculator className="w-5 h-5 text-gray-400" />
            Read Legal Guides & Blog
          </Link>
        </div>

        <div className="mt-16 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          Official 2026 WA State Guidelines Index
        </div>
      </div>
    </div>
  );
}

// Custom animation in CSS (via tailwind or global.css if needed, but standard bounce-slow works here)

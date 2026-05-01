"use client";

import Link from 'next/link';
import { Calculator, ArrowLeft, Search, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 text-center section-default relative overflow-hidden min-h-[70vh]">
      <div className="max-w-md w-full relative z-10">
        <div className="w-24 h-24 bg-gray-900 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl rotate-3">
          <Calculator className="w-12 h-12 text-blue-400" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">Page Not Found</h1>
        <p className="leading-relaxed mb-10 text-lg text-gray-700">
          The requested calculation or county guide could not be located in our 2026 database. Most likely the income or county slug was formatted incorrectly.
        </p>

        <div className="grid gap-4">
          <Link
            href="/"
            className="btn-primary w-full h-14 flex items-center justify-center gap-3 !rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Calculator
          </Link>

          <Link
            href="/worksheet"
            className="btn-secondary w-full h-14 flex items-center justify-center gap-3 !rounded-full"
          >
            <Search className="w-5 h-5 text-blue-600" />
            Worksheet Pro Wizard
          </Link>

          <Link
            href="/blog"
            className="btn-ghost w-full h-14 flex items-center justify-center gap-3 font-bold !rounded-full"
          >
            Read Legal Guides <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <footer className="mt-20 pt-10 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Official 2026 WA State Guidelines Index</p>
        </footer>
      </div>
    </div>
  );
}

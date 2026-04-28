"use client";

import Link from 'next/link';
import { Calculator, ArrowLeft, Search, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-8 text-center section relative overflow-hidden">
      <div className="max-w-md w-full relative z-10">
        <div className="w-24 h-24 bg-bg-inverse rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl rotate-3">
          <Calculator className="w-12 h-12 text-brand" />
        </div>

        <h1 className="text-display mb-6">Page Not Found</h1>
        <p className="text-body-lg mb-10">
          The requested calculation or county guide could not be located in our 2026 database. Most likely the income or county slug was formatted incorrectly.
        </p>

        <div className="grid gap-4">
          <Link
            href="/"
            className="btn btn-primary btn-lg w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Calculator
          </Link>

          <Link
            href="/worksheet"
            className="btn btn-secondary btn-lg w-full"
          >
            <Search className="w-5 h-5 text-brand mr-2" />
            Worksheet Pro Wizard
          </Link>

          <Link
            href="/blog"
            className="btn btn-ghost btn-lg w-full"
          >
            Read Legal Guides <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <footer className="mt-20 pt-10 border-t border-border-default">
          <p className="text-overline !text-text-muted">Official 2026 WA Guidelines</p>
        </footer>
      </div>
    </main>
  );
}

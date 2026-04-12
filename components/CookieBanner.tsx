'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('wcssc-cookie-consent');
      if (!consent) {
        // Small delay to avoid layout shift on initial render
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — don't show
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('wcssc-cookie-consent', 'accepted');
    } catch { /* noop */ }
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('wcssc-cookie-consent', 'declined');
      // Set explicit gtag denial for CPRA/GDPR compliance
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
      }
    } catch { /* noop */ }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[999] no-print animate-in slide-in-from-bottom duration-500"
    >
      <div className="bg-slate-900 border-t border-slate-700 shadow-2xl shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-2 bg-indigo-600/20 rounded-xl flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                We use cookies for anonymous analytics and Google AdSense advertising. No personal calculation data is ever stored.{' '}
                <Link href="/privacy" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors font-bold">
                  Privacy Policy
                </Link>
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                Required for GDPR · CCPA Compliance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors border border-slate-700 rounded-xl hover:border-slate-500"
            >
              <X className="w-3 h-3" />
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30 active:scale-95"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

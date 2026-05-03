'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('wcssc-cookie-consent');
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
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
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
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
      className="fixed bottom-0 left-0 right-0 z-[100] no-print animate-in fade-in slide-in-from-bottom-8 duration-500"
    >
      <div className="bg-[#111827] text-white p-8 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] ring-1 ring-white/10 backdrop-blur-2xl">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2.5 bg-indigo-500/20 rounded-2xl flex-shrink-0">
            <Shield className="w-6 h-6 text-[var(--color-brand-primary-hover)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1 leading-tight">Privacy Notice</h3>
            <p className="text-[12px] text-[var(--color-text-disabled)] leading-relaxed font-medium">
              We use cookies for analytics. No personal calculation data is ever stored. {' '}
              <Link href="/privacy" className="text-[var(--color-brand-primary-hover)] hover:underline font-bold">
                Details
              </Link>
            </p>
          </div>
          <button onClick={() => setShow(false)} className="text-white/20 hover:text-white transition-colors p-1 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 h-12 text-[12px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5 cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 h-12 bg-indigo-600 text-white text-[12px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-[var(--shadow-card-md)] shadow-indigo-600/20 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

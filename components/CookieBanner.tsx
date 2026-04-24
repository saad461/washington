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
      className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] no-print animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="bg-heading text-white rounded-3xl p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl bg-opacity-95">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-xl flex-shrink-0">
            <Shield className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold mb-1">Privacy & Transparency</h3>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              We use cookies for analytics and site improvement. No personal calculation data is ever stored. {' '}
              <Link href="/privacy" className="text-indigo-400 hover:underline">
                Read Policy
              </Link>
            </p>
          </div>
          <button onClick={() => setShow(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 h-11 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/10"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 h-11 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

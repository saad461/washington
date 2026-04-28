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
      className="fixed bottom-8 left-8 right-8 md:left-auto md:max-w-sm z-[100] no-print animate-in fade-in slide-in-from-bottom-8 duration-500"
    >
      <div className="section-inverse rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2.5 bg-brand-light/10 rounded-2xl flex-shrink-0">
            <Shield className="w-6 h-6 text-brand" />
          </div>
          <div className="flex-1">
            <h3 className="text-h4 !text-white !mb-1">Privacy Notice</h3>
            <p className="text-xs !text-white opacity-60 mb-0">
              We use cookies for analytics. No personal calculation data is ever stored. {' '}
              <Link href="/privacy" className="text-brand hover:underline font-bold">
                Details
              </Link>
            </p>
          </div>
          <button onClick={() => setShow(false)} className="text-white opacity-20 hover:opacity-100 transition-opacity p-1">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="btn btn-secondary btn-md flex-1 !bg-white/5 !text-white !border-white/10 hover:!bg-white/10"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="btn btn-primary btn-md flex-1"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

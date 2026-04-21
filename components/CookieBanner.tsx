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
 const timer = setTimeout(() => setShow(true), 2000);
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
 className="fixed bottom-0 left-0 right-0 z-[999] no-print animate-in slide-in-from-bottom duration-700"
 >
 <div className="bg-gray-900 border-t border-gray-800 shadow-sm">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
 <div className="flex items-start gap-4 flex-1">
 <div className="p-2.5 bg-gray-800 rounded-xl flex-shrink-0 mt-0.5 shadow-sm">
 <Shield className="w-5 h-5 text-indigo-400" />
 </div>
 <div>
 <p className="text-sm font-medium leading-relaxed font-sans">
 We use cookies for anonymous analytics and advertising. No personal calculation data is ever stored on our servers.{' '}
 <Link href="/privacy" className="text-white underline underline-offset-4 decoration-gray-700 hover:decoration-indigo-400 transition-all font-medium">
 Privacy Policy
 </Link>
 </p>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mt-2">
 GDPR · CCPA · 2026 Compliance Standard
 </p>
 </div>
 </div>

 <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto">
 <button
 onClick={handleDecline}
 className="px-6 py-3  text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase hover:text-white transition-all rounded-xl border border-gray-800 hover:border-gray-700 font-heading"
 >
 Decline
 </button>
 <button
 onClick={handleAccept}
 className="px-6 py-3  bg-indigo-600 text-white text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase rounded-xl hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98] font-heading"
 >
 Accept All
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}

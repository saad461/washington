"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ChevronRight, Printer, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const navLinks = [
    { href: "/", label: "Estimator" },
    { href: "/worksheet", label: "Full Wizard" },
    { href: "/washington-courts", label: "Courts" },
    { href: "/glossary", label: "Glossary" },
    { href: "/compare-2024-2026", label: "2024 vs 2026" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 group-hover:rotate-3 transition-transform">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-black tracking-tight text-slate-800 leading-none uppercase">WCSSC</span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">WA Schedule Center</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 translate-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-[0.15em] py-2 border-b-2 border-transparent hover:border-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
          >
            <Printer size={16} />
            <span>Print Result</span>
          </button>
          
          <Link 
            href="/worksheet" 
            className="hidden sm:flex group items-center justify-center bg-indigo-600 shadow-xl shadow-indigo-500/20 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95"
          >
            Launch Wizard
            <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-2xl shadow-slate-200/50 animate-in slide-in-from-top-2 duration-200 z-50">
          <nav className="flex flex-col px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all min-h-[48px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2 space-y-1">
              <Link href="/terms" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all min-h-[48px]">
                Terms of Service
              </Link>
              <Link href="/disclaimer" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all min-h-[48px]">
                Legal Disclaimer
              </Link>
            </div>
            <div className="pt-4">
              <Link
                href="/worksheet"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center bg-indigo-600 text-white px-6 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
              >
                Launch Wizard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

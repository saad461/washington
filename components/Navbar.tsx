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
    <header className="sticky top-0 z-50 w-full border-b border-border-default bg-white/80 backdrop-blur-xl transition-all duration-300 no-print">
      <div className="container-wide h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-sm shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left font-heading">
            <span className="text-xl font-bold text-heading tracking-tight leading-none">WCSSC</span>
            <span className="label-metadata leading-none mt-1.5">Washington State</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body hover:text-heading transition-colors py-2 border-b-2 border-transparent hover:border-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-body hover:bg-gray-50 transition-all border border-gray-200 min-h-[48px]"
          >
            <Printer size={18} />
            <span>Print</span>
          </button>
          
          <Link 
            href="/worksheet" 
            className="hidden sm:flex btn-primary !h-12"
          >
            Worksheet Wizard
            <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center text-heading"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-default shadow-sm animate-in slide-in-from-top-2 duration-200 z-50">
          <nav className="flex flex-col px-4 py-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-6 py-4 rounded-xl text-base font-semibold text-body hover:bg-indigo-50 hover:text-indigo-700 transition-all min-h-[48px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border-default pt-6 mt-4 space-y-2">
              <Link href="/terms" onClick={() => setMobileOpen(false)} className="flex items-center px-6 py-3 min-h-[48px] rounded-xl text-sm font-medium text-body hover:bg-gray-50 hover:text-heading transition-all">
                Terms of Service
              </Link>
              <Link href="/disclaimer" onClick={() => setMobileOpen(false)} className="flex items-center px-6 py-3 min-h-[48px] rounded-xl text-sm font-medium text-body hover:bg-gray-50 hover:text-heading transition-all">
                Legal Disclaimer
              </Link>
            </div>
            <div className="pt-6 px-4">
              <Link
                href="/worksheet"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Start Calculation Wizard
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

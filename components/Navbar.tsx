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
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all duration-300 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left font-heading">
            <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">WCSSC</span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em] leading-none mt-1.5">Washington State</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors py-2 border-b-2 border-transparent hover:border-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-100 min-h-[44px]"
          >
            <Printer size={18} />
            <span>Print</span>
          </button>
          
          <Link 
            href="/worksheet" 
            className="hidden sm:flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-200 min-h-[48px]"
          >
            Worksheet Wizard
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200 z-50">
          <nav className="flex flex-col px-4 py-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-6 py-4 rounded-2xl text-base font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all min-h-[48px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-50 pt-6 mt-4 space-y-2">
              <Link href="/terms" onClick={() => setMobileOpen(false)} className="flex items-center px-6 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all min-h-[48px]">
                Terms of Service
              </Link>
              <Link href="/disclaimer" onClick={() => setMobileOpen(false)} className="flex items-center px-6 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all min-h-[48px]">
                Legal Disclaimer
              </Link>
            </div>
            <div className="pt-6">
              <Link
                href="/worksheet"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all min-h-[48px]"
              >
                Start Calculation Wizard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}

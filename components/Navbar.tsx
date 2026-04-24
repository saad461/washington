"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, ChevronRight, Printer, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 no-print ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 h-20"
          : "bg-transparent h-24"
      }`}
    >
      <div className="container-wide h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200/50 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left font-heading">
            <span className="text-xl font-bold text-heading tracking-tight leading-none">WCSSC</span>
            <span className="text-[9px] uppercase font-bold text-indigo-600 tracking-widest mt-1">Washington State</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-body hover:text-indigo-600 transition-all py-2 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-5 h-12 rounded-xl text-sm font-bold text-body hover:bg-gray-50 transition-all border border-gray-200"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
          
          <Link 
            href="/worksheet" 
            className="hidden sm:flex btn-primary !h-12 !px-6 !text-sm !shadow-md"
          >
            Launch Wizard
            <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 hover:bg-gray-50 rounded-xl transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center text-heading"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col px-6 py-10 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-5 rounded-2xl text-lg font-bold text-heading hover:bg-indigo-50 hover:text-indigo-700 transition-all"
              >
                {link.label}
                <ChevronRight size={18} className="text-gray-300" />
              </Link>
            ))}
            <div className="pt-10 px-4">
              <Link
                href="/worksheet"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full !h-14 !text-lg"
              >
                Launch Calculator Wizard
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
            <div className="pt-8 border-t border-gray-100 mt-auto flex flex-wrap justify-center gap-6 px-6">
              <Link href="/terms" onClick={() => setMobileOpen(false)} className="text-xs font-bold text-muted hover:text-heading uppercase tracking-widest">
                Terms
              </Link>
              <Link href="/disclaimer" onClick={() => setMobileOpen(false)} className="text-xs font-bold text-muted hover:text-heading uppercase tracking-widest">
                Legal
              </Link>
              <Link href="/privacy" onClick={() => setMobileOpen(false)} className="text-xs font-bold text-muted hover:text-heading uppercase tracking-widest">
                Privacy
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ChevronRight, Printer, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const navLinks = [
    { href: "/",                  label: "Estimator"    },
    { href: "/worksheet",         label: "Full Wizard"  },
    { href: "/washington-courts", label: "Courts"       },
    { href: "/glossary",          label: "Glossary"     },
    { href: "/compare-2024-2026", label: "2024 vs 2026" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Single source of truth for nav height — used for both the header
  // and the drawer top offset so they never mismatch.
  const navH      = scrolled ? "h-16" : "h-16 lg:h-20";
  const drawerTop = scrolled ? "top-16" : "top-16";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${navH} ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide px-6 h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 transition-transform active:scale-95"
            aria-label="WCSSC — Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl shadow-md shadow-indigo-200/60 flex items-center justify-center group-hover:bg-indigo-700 transition-colors shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none font-heading">
              <span className="text-lg sm:text-xl font-bold text-heading tracking-tight">WCSSC</span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest mt-0.5">
                Washington State
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-body hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-4 sm:gap-3 shrink-0">
            <button
              onClick={handlePrint}
              aria-label="Print this page"
              className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-xl text-sm font-semibold text-body hover:bg-gray-50 hover:text-heading transition-all border border-gray-200"
            >
              <Printer size={15} />
              <span className="hidden md:inline">Print</span>
            </button>

          <Link href="/worksheet" className="hidden sm:flex btn-primary !h-9 !px-4 !text-[13px] !rounded-lg !font-semibold">
              <span className="hidden md:inline">Launch</span> Wizard
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden btn-icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────
          FIX: backdrop moved outside header to avoid stacking context issues.
          FIX: glassmorphism overlay style with semi-transparent background.
      ──────────────────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="no-print">
          <div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <nav
            aria-label="Mobile navigation"
            className={`lg:hidden fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur-2xl z-40 overflow-y-auto
              flex flex-col border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300 ${drawerTop}`}
          >
            {/* Links */}
            <div className="flex flex-col px-4 pt-4 pb-2 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold transition-all ${
                    isActive(link.href)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-heading hover:bg-gray-50 hover:text-indigo-700"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className={isActive(link.href) ? "text-indigo-400" : "text-gray-300"} />
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="px-4 pt-4 pb-2 flex flex-col gap-3">
              <Link href="/worksheet" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                Launch Calculator Wizard
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button onClick={() => { handlePrint(); setMobileOpen(false); }} className="btn-secondary w-full">
                <Printer size={16} />
                Print This Page
              </button>
            </div>

            {/* Legal links */}
            <div className="mt-auto px-4 py-5 border-t border-gray-100 flex justify-center gap-8">
              {[
                { href: "/terms",      label: "Terms"   },
                { href: "/disclaimer", label: "Legal"   },
                { href: "/privacy",    label: "Privacy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold text-muted hover:text-heading uppercase tracking-widest transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

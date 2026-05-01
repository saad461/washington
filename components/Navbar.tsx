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
    { href: "/",                  label: "Calculator"          },
    { href: "/worksheet",         label: "Full Wizard"         },
    { href: "/washington-courts", label: "Courts"              },
    { href: "/glossary",          label: "Glossary"            },
    { href: "/compare-2024-2026", label: "What Changed in 2026" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const showPrint =
    pathname === "/" ||
    pathname === "/worksheet" ||
    pathname.includes("-income-") ||
    pathname.includes("-county-income-");

  // Single source of truth for nav height — used for both the header
  // and the drawer top offset so they never mismatch.
  const navH      = scrolled ? "h-16" : "h-16 lg:h-20";
  const drawerTop = scrolled ? "top-16" : "top-16";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${navH} ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-xl shadow-[var(--shadow-card)] border-b border-gray-100"
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
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl shadow-[var(--shadow-card-md)] shadow-indigo-200/60 flex items-center justify-center group-hover:bg-indigo-700 transition-colors shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none font-heading">
              <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] tracking-tight">WCSSC</span>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-blue-600 mt-0.5">
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
                  className={`relative px-3 py-2 text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-600 font-medium hover:text-blue-600 transition-colors"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-4 sm:gap-3 shrink-0">
            {showPrint && (
              <button
                onClick={handlePrint}
                aria-label="Print this page"
                className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all border border-gray-200"
              >
                <Printer size={15} />
                <span className="hidden md:inline">Print</span>
              </button>
            )}

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
              flex flex-col border-t border-[var(--color-bg-border-soft)] animate-in fade-in slide-in-from-top-2 duration-300 ${drawerTop}`}
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
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] hover:text-indigo-700"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className={isActive(link.href) ? "text-[var(--color-brand-primary-hover)]" : "text-[var(--color-text-secondary)]"} />
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="px-4 pt-4 pb-2 flex flex-col gap-3">
              <Link href="/worksheet" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                Launch Wizard
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Legal links */}
            <div className="mt-auto px-4 py-5 border-t border-[var(--color-bg-border-soft)] flex justify-center gap-8">
              {[
                { href: "/terms",      label: "Terms"   },
                { href: "/disclaimer", label: "Legal"   },
                { href: "/privacy",    label: "Privacy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-medium text-[var(--color-text-secondary)] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] uppercase tracking-widest transition-colors"
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

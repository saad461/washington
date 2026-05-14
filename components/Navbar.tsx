"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import SearchMock from "./SearchMock";

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
    { href: "/joint-custody-calculator", label: "Joint Custody" },
    { href: "/worksheet",         label: "Worksheet Wizard"    },
    { href: "/washington-courts", label: "Courts"              },
    { href: "/glossary",          label: "Glossary"            },
    { href: "/compare-2024-2026", label: "2026 Updates"        },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

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
          <div className="flex items-center gap-8 flex-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0 transition-transform active:scale-95"
              aria-label="WSCSS — Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl shadow-[var(--shadow-card-md)] shadow-indigo-200/60 flex items-center justify-center group-hover:bg-indigo-700 transition-colors shrink-0">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none font-heading">
                <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] tracking-tight">WSCSS</span>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-blue-600 mt-0.5">
                  Washington State
                </span>
              </div>
            </Link>

            <div className="hidden lg:block w-full max-w-sm">
              <SearchMock isNavbar={true} />
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {/* Main Calculator Dropdown */}
            <div className="relative group px-3 py-2">
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${isActive("/") || isActive("/joint-custody-calculator") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                Calculator
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link href="/" className="flex flex-col px-4 py-2 hover:bg-blue-50 transition-colors">
                  <span className="text-sm font-bold text-gray-900">Standard Calculator</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Default RCW 26.19</span>
                </Link>
                <Link href="/joint-custody-calculator" className="flex flex-col px-4 py-2 hover:bg-blue-50 transition-colors">
                  <span className="text-sm font-bold text-gray-900">Joint Custody Calculator</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">50/50 & Shared Schedules</span>
                </Link>
              </div>
            </div>

            {navLinks.filter(l => l.href !== "/" && l.href !== "/joint-custody-calculator").map((link) => (
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
            {pathname === "/worksheet" ? (
              <a
                href="#wizard"
                className="hidden sm:flex btn btn-primary !h-9 !px-4 !text-[13px] !rounded-lg !font-semibold items-center gap-1"
              >
                Back to Top ↑
              </a>
            ) : (
              <Link
                href="/worksheet"
                className="hidden sm:flex btn btn-primary !h-9 !px-4 !text-[13px] !rounded-lg !font-semibold"
              >
                <span className="hidden md:inline">Launch</span> Wizard
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden btn btn-icon"
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
      <div className="no-print">
        {/* Backdrop Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Right-side Drawer */}
        <nav
          aria-label="Mobile navigation"
          className={`lg:hidden fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white z-50 shadow-2xl transition-transform duration-250 ease-in-out flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
            <span className="font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-6 mb-4">
              <SearchMock isNavbar={true} />
            </div>

            {/* Links ordered as requested */}
            <div className="flex flex-col">
              {[
                navLinks.find(l => l.href === "/"),
                navLinks.find(l => l.href === "/joint-custody-calculator"),
                navLinks.find(l => l.href === "/worksheet"),
                navLinks.find(l => l.href === "/washington-courts"),
                navLinks.find(l => l.href === "/glossary"),
                navLinks.find(l => l.href === "/compare-2024-2026"),
              ].map((link) => link && (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-6 py-4 text-base font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className={isActive(link.href) ? "text-blue-600" : "text-gray-400"} />
                </Link>
              ))}
            </div>

            <div className="mx-6 my-4 border-t border-gray-100" />

            <div className="px-6">
              <Link
                href="/worksheet"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary w-full justify-center"
              >
                Launch Wizard
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Legal link at the very bottom */}
          <div className="p-6 border-t border-gray-100 mt-auto">
            <Link
              href="/disclaimer"
              onClick={() => setMobileOpen(false)}
              className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors block text-center"
            >
              Legal Disclaimer
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

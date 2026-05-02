"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ChevronRight, Menu, X, Search, MapPin } from "lucide-react";
import { washingtonCounties } from '@/data/washingtonCounties';
import { Calculator, ChevronRight, Menu, X } from "lucide-react";
import SearchMock from "./SearchMock";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState("");
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
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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

  // Single source of truth for nav height — used for both the header
  // and the drawer top offset so they never mismatch.
  const navH      = scrolled ? "h-16" : "h-16 lg:h-20";
  const drawerTop = scrolled ? "top-16" : "top-16";

  const filteredCounties = washingtonCounties.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.seat.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

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

            <div className="hidden lg:block w-full max-w-sm">
              <SearchMock isNavbar={true} />
            </div>
          </div>

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
            <div className="hidden lg:relative lg:flex lg:items-center">
               <div className={`flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 transition-all duration-300 ${searchOpen || query ? 'w-64 border-blue-400 ring-2 ring-blue-100' : 'w-40'}`}>
                 <Search className={`w-4 h-4 ${searchOpen || query ? 'text-blue-600' : 'text-gray-400'}`} />
                 <input
                   type="text"
                   value={query}
                   onFocus={() => setSearchOpen(true)}
                   onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                   onChange={(e) => setQuery(e.target.value)}
                   placeholder="Search counties..."
                   className="bg-transparent border-none focus:ring-0 text-sm w-full py-2 px-2 placeholder:text-gray-400 text-gray-700"
                 />
               </div>

               {searchOpen && query.length > 0 && (
                 <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
                   {filteredCounties.length > 0 ? (
                     <div className="p-2">
                       {filteredCounties.map((county) => (
                         <Link
                           key={county.slug}
                           href={`/${county.slug}-income-5000-2-children`}
                           className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors group"
                         >
                           <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                             <MapPin size={14} />
                           </div>
                           <div className="flex flex-col">
                             <span className="text-sm font-bold text-gray-900">{county.name}</span>
                             <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">{county.seat}, WA</span>
                           </div>
                         </Link>
                       ))}
                     </div>
                   ) : (
                     <div className="p-6 text-center">
                       <p className="text-sm text-gray-500">No matching counties</p>
                     </div>
                   )}
                 </div>
               )}
            </div>

            {pathname === "/worksheet" ? (
              <a
                href="#wizard"
                className="hidden sm:flex bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-[13px] hover:bg-blue-700 transition-colors items-center gap-1"
              >
                Back to Top ↑
              </a>
            ) : (
              <Link
                href="/worksheet"
                className="hidden sm:flex btn-primary !h-9 !px-4 !text-[13px] !rounded-lg !font-semibold"
              >
                <span className="hidden md:inline">Launch</span> Wizard
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}

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
            {/* Mobile Search */}
            <div className="px-4 pt-6 pb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find your county..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
              </div>

              {query.length > 0 && (
                <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                  {filteredCounties.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {filteredCounties.map((county) => (
                        <Link
                          key={county.slug}
                          href={`/${county.slug}-income-5000-2-children`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-4 p-4 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <MapPin size={16} className="text-gray-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900">{county.name}</span>
                            <span className="text-[12px] text-gray-500 font-medium uppercase tracking-widest">{county.seat}, WA</span>
                          </div>
                          <ChevronRight size={16} className="ml-auto text-gray-300" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm text-gray-500">No results found</p>
                    </div>
                  )}
                </div>
              )}

            <div className="px-4 pt-4 pb-2">
               <SearchMock isNavbar={true} />

            </div>

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
              {pathname === "/worksheet" ? (
                <a
                  href="#wizard"
                  onClick={() => setMobileOpen(false)}
                  className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-center transition-colors"
                >
                  Back to Top ↑
                </a>
              ) : (
                <Link href="/worksheet" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                  Launch Wizard
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
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

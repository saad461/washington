"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ChevronRight, Printer, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <>
      <header className={`nav no-print ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="nav-inner">
          {/* ── Logo ── */}
          <Link href="/" className="nav-logo" aria-label="WCSSC — Home">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="nav-logo-text">WCSSC</span>
              <span className="nav-logo-sub">Washington</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="nav-actions">
            <button
              onClick={handlePrint}
              aria-label="Print this page"
              className="btn btn-secondary btn-sm btn-print-hide"
            >
              <Printer size={15} />
              <span className="hidden md:inline">Print</span>
            </button>

            <Link href="/worksheet" className="btn btn-primary btn-sm">
              <span className="hidden md:inline">Launch</span> Wizard
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-primary"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-text-primary/10 backdrop-blur-sm z-[150]"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              aria-label="Mobile navigation"
              className="nav-drawer md:hidden !bg-white/95 !backdrop-blur-2xl border-l border-border-default z-[200] !fixed !right-0 !left-auto !w-[280px] !h-full !inset-y-0"
            >
              <div className="flex items-center justify-between mb-8">
                 <span className="text-overline !text-brand">Navigation</span>
                 <button
                   onClick={() => setMobileOpen(false)}
                   className="p-2 -mr-2 text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
                   aria-label="Close navigation menu"
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl text-base font-semibold border border-transparent transition-all ${
                      isActive(link.href)
                        ? "bg-brand-light text-brand border-brand-border"
                        : "text-text-primary hover:bg-bg-subtle hover:border-border-default"
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={16} className={isActive(link.href) ? "opacity-100" : "opacity-0"} />
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-border-default flex flex-col gap-3">
                <Link href="/worksheet" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-md !h-12">
                  Launch Wizard
                  <ChevronRight size={18} />
                </Link>
                <button onClick={() => { handlePrint(); setMobileOpen(false); }} className="btn btn-secondary btn-md !h-12">
                  <Printer size={18} />
                  Print Page
                </button>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

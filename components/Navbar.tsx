"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ChevronRight, Menu, X, Clock, Shield, Scale, Plus, DollarSign, Wallet, GraduationCap, HeartPulse, Coins, Landmark } from "lucide-react";
import SearchMock from "./SearchMock";
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/worksheet",         label: "Worksheet Wizard"    },
    { href: "/washington-courts", label: "Courts"              },
    { href: "/glossary",          label: "Glossary"            },
    { href: "/compare-2024-2026", label: "2026 Updates"        },
  ];

  const coreCalculators = [
    { href: "/", label: "Income Estimator", icon: Wallet },
    { href: "/joint-custody-calculator", label: "Joint Custody", icon: Scale },
    { href: "/deviation-calculator", label: "Deviation Tool", icon: Shield },
    { href: "/modification-calculator", label: "Modification Check", icon: Clock },
    { href: "/extra-expenses", label: "Expense Splitter", icon: Coins },
    { href: "/compare", label: "Compare Scenarios", icon: Calculator },
  ];

  const expenseTimeTools = [
    { href: "/parenting-time-calculator", label: "Parenting Time", icon: Clock },
    { href: "/childcare-calculator", label: "Childcare Split", icon: Coins },
    { href: "/health-insurance-calculator", label: "Health Insurance", icon: Shield },
    { href: "/medical-expense-calculator", label: "Medical Expense", icon: HeartPulse },
    { href: "/education-expense-calculator", label: "Education Expense", icon: GraduationCap },
    { href: "/arrears-calculator", label: "Arrears & Interest", icon: Landmark },
    { href: "/net-income-calculator", label: "Net Income (Gross to Net)", icon: Wallet },
    { href: "/tax-benefit-calculator", label: "Child Tax Benefit", icon: DollarSign },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const navH      = scrolled ? "h-16" : "h-16 lg:h-20";

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
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`relative px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                  [...coreCalculators, ...expenseTimeTools].some(c => isActive(c.href))
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 font-medium hover:text-blue-600 transition-colors"
                }`}
              >
                Calculators
                <ChevronRight className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-90" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[500px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-8"
                  >
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Core Calculators</p>
                      <div className="space-y-1">
                        {coreCalculators.map((calc) => (
                          <Link
                            key={calc.href}
                            href={calc.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(calc.href)
                                ? "bg-blue-50 text-blue-600 font-bold"
                                : "text-gray-600 hover:bg-gray-50 font-medium"
                            }`}
                          >
                            <calc.icon size={16} className={isActive(calc.href) ? "text-blue-600" : "text-gray-400"} />
                            {calc.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Expense & Time Tools</p>
                      <div className="space-y-1">
                        {expenseTimeTools.map((calc) => (
                          <Link
                            key={calc.href}
                            href={calc.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(calc.href)
                                ? "bg-blue-50 text-blue-600 font-bold"
                                : "text-gray-600 hover:bg-gray-50 font-medium"
                            }`}
                          >
                            <calc.icon size={16} className={isActive(calc.href) ? "text-blue-600" : "text-gray-400"} />
                            {calc.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

      {/* ── Mobile Drawer ── */}
      <div className="no-print">
        <div
          className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <nav
          aria-label="Mobile navigation"
          className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white z-50 shadow-2xl transition-transform duration-250 ease-in-out flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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

          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-6">
              <SearchMock isNavbar={true} />
            </div>

            <div className="flex flex-col">
              <div className="px-6 mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Core Calculators</p>
                <div className="grid grid-cols-1 gap-1">
                  {coreCalculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 text-sm font-semibold transition-colors ${
                        isActive(calc.href) ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <calc.icon size={18} className={isActive(calc.href) ? "text-blue-600" : "text-gray-300"} />
                        {calc.label}
                      </span>
                      <ChevronRight size={14} className={isActive(calc.href) ? "text-blue-600" : "text-gray-300"} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-6 mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Expense & Time Tools</p>
                <div className="grid grid-cols-1 gap-1">
                  {expenseTimeTools.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 text-sm font-semibold transition-colors ${
                        isActive(calc.href) ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <calc.icon size={18} className={isActive(calc.href) ? "text-blue-600" : "text-gray-300"} />
                        {calc.label}
                      </span>
                      <ChevronRight size={14} className={isActive(calc.href) ? "text-blue-600" : "text-gray-300"} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="my-2 border-t border-gray-50" />

              {navLinks.map((link) => (
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

            <div className="p-6">
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

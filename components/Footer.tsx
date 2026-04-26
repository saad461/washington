import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    /*
     * FIX: Removed redundant pb-16 md:pb-24 — section-default already
     * handles vertical padding. Also removed mt-auto (handled by flex layout).
     * FIX: border-t moved to top of footer, not inside.
     */
    <footer className="w-full bg-gray-900 border-t border-gray-800 no-print">
      <div className="container-wide py-12 md:py-16 lg:py-20">

        {/*
         * FIX: was grid-cols-2 md:grid-cols-4 with gap-12 (48px).
         * On a 375px phone, 2 cols + 48px gap = ~148px per col — cramped.
         * New: single column mobile → 2-col tablet → 4-col desktop.
         * Gap scaled down on mobile: gap-8 sm:gap-10 md:gap-12 lg:gap-16.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-8 sm:gap-10 lg:gap-16 mb-12 md:mb-16">

          {/* ── Brand ── */}
          {/* FIX: was col-span-2 md:col-span-1 — full width on mobile now */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-700 transition-colors shrink-0">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">WCSSC</span>
            </Link>
            {/* FIX: was text-base — fine, kept. Leading relaxed for readability. */}
            <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-400 max-w-xs">
              Precision child support calculations for Washington State families. Official AOC-aligned data source.
            </p>
            <a
              href="mailto:support@wcssc.site"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              aria-label="Email support"
            >
              <span className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors shrink-0">
                <Mail size={16} />
              </span>
              <span className="hidden sm:inline">support@wcssc.site</span>
            </a>
          </div>

          {/* ── Calculators ── */}
          <div>
            {/* FIX: was text-[10px] — kept at minimum readable size */}
            <h4 className="label-metadata text-gray-500 mb-5">
              Calculators
            </h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors inline-block py-0.5">
                  Quick Estimator
                </Link>
              </li>
              <li>
                <Link href="/worksheet" className="hover:text-white transition-colors inline-block py-0.5">
                  Worksheet Pro Wizard
                </Link>
              </li>
              <li>
                <Link href="/king-county-income-5000-2-children" className="hover:text-white transition-colors inline-block py-0.5">
                  King County Guide
                </Link>
              </li>
              <li>
                <Link href="/pierce-county-income-5000-2-children" className="hover:text-white transition-colors inline-block py-0.5">
                  Pierce County Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="label-metadata text-gray-500 mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li>
                <a
                  href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  AOC Mandatory Forms
                </a>
              </li>
              <li>
                <a
                  href="https://www.dshs.wa.gov/esa/division-child-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  WA DSHS Support Center
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors inline-block py-0.5">
                  Legal Guides & Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors inline-block py-0.5">
                  About WCSSC
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className="label-metadata text-gray-500 mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li>
                <Link href="/privacy" className="flex items-center gap-2 hover:text-white transition-colors py-0.5 w-fit">
                  <Shield size={13} className="shrink-0" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 hover:text-white transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial-methodology" className="flex items-center gap-2 hover:text-white transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="flex items-center gap-2 hover:text-white transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────────────────
            FIX: was items-start — badge floated oddly on mobile.
            Now items-center on all sizes, stacks vertically on mobile.
            FIX: disclaimer was text-[10px] uppercase — nearly unreadable.
            Now text-xs (12px) normal case, still understated.
        ──────────────────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left max-w-xl">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2">
              &copy; 2026 Washington Child Support Schedule Center
            </p>
            {/* FIX: was uppercase tracking-wider — hard to read at xs size */}
            <p className="text-xs text-gray-500 leading-relaxed">
              WCSSC is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
            </p>
          </div>

          {/* Status badge — centered on mobile */}
          <div className="shrink-0">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
              RCW 26.19 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

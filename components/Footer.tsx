import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827] border-t border-gray-800 no-print">
      <div className="container-wide py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-8 sm:gap-10 lg:gap-16 mb-12 md:mb-16">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-xl shadow-lg shadow-[var(--color-brand-primary)]/20 flex items-center justify-center group-hover:bg-[var(--color-brand-primary-hover)] transition-colors shrink-0">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">WSCSS</span>
            </Link>
            <p className="text-sm sm:text-base leading-relaxed mb-6 text-gray-300 max-w-xs">
              Precision child support calculations for Washington State families. Official AOC-aligned data source.
            </p>
            <a
              href="mailto:support@wscss.site"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
              aria-label="Email support"
            >
              <span className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-brand-primary)] transition-colors shrink-0">
                <Mail size={16} className="text-gray-300 group-hover:text-white" />
              </span>
              <span className="hidden sm:inline">support@wscss.site</span>
            </a>
          </div>

          {/* ── Calculators ── */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-50 uppercase tracking-[0.05em] mb-5">
              Calculators
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/worksheet" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Worksheet Pro Wizard
                </Link>
              </li>
              <li>
                <Link href="/washington-courts/king-county" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  King County Guide
                </Link>
              </li>
              <li>
                <Link href="/washington-courts/pierce-county" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Pierce County Guide
                </Link>
              </li>
              <li>
                <Link href="/washington-courts/snohomish-county" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Snohomish County Guide
                </Link>
              </li>
              <li>
                <Link href="/washington-courts/spokane-county" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Spokane County Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-50 uppercase tracking-[0.05em] mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li>
                <a
                  href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline inline-block py-0.5"
                >
                  AOC Mandatory Forms
                </a>
              </li>
              <li>
                <a
                  href="https://www.dshs.wa.gov/esa/division-child-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline inline-block py-0.5"
                >
                  WA DSHS Support Center
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  Legal Guides & Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors hover:underline inline-block py-0.5">
                  About WSCSS
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className="text-[14px] font-semibold text-gray-50 uppercase tracking-[0.05em] mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li>
                <Link href="/privacy" className="flex items-center gap-2 text-[#93C5FD] hover:text-[#BFDBFE] hover:underline transition-colors py-0.5 w-fit">
                  <Shield size={13} className="shrink-0" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 text-[#93C5FD] hover:text-[#BFDBFE] hover:underline transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial-methodology" className="flex items-center gap-2 text-[#93C5FD] hover:text-[#BFDBFE] hover:underline transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="flex items-center gap-2 text-[#93C5FD] hover:text-[#BFDBFE] hover:underline transition-colors py-0.5 w-fit">
                  <Scale size={13} className="shrink-0" />
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left max-w-xl">
            <p className="text-[13px] font-semibold text-gray-400 mb-2">
              &copy; 2026 Washington State Child Support Schedule
            </p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              WSCSS is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
            </p>
          </div>

          <div className="shrink-0">
            <span className="flex items-center gap-2 text-[12px] font-bold font-bold uppercase tracking-[0.15em] text-[#F9FAFB] bg-white/5 px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full shrink-0" />
              RCW 26.19 Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="container">
        <div className="footer-grid">
          {/* ── Brand ── */}
          <div>
            <Link href="/" className="nav-logo mb-6">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="nav-logo-text text-xl">WCSSC</span>
            </Link>
            <p className="text-body mb-6 max-w-xs">
              Precision child support calculations for Washington State families. Official AOC-aligned data source.
            </p>
            <a
              href="mailto:support@wcssc.site"
              className="footer-links a group flex items-center gap-2"
              aria-label="Email support"
            >
              <Mail size={16} />
              <span>support@wcssc.site</span>
            </a>
          </div>

          {/* ── Calculators ── */}
          <div>
            <h4 className="footer-col-label">Calculators</h4>
            <ul className="footer-links">
              <li><Link href="/">Quick Estimator</Link></li>
              <li><Link href="/worksheet">Worksheet Pro Wizard</Link></li>
              <li><Link href="/king-county-income-5000-2-children">King County Guide</Link></li>
              <li><Link href="/pierce-county-income-5000-2-children">Pierce County Guide</Link></li>
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="footer-col-label">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16" target="_blank" rel="noopener noreferrer">
                  AOC Mandatory Forms
                </a>
              </li>
              <li>
                <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="noopener noreferrer">
                  WA DSHS Support Center
                </a>
              </li>
              <li><Link href="/blog">Legal Guides & Blog</Link></li>
              <li><Link href="/about">About WCSSC</Link></li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className="footer-col-label">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link href="/privacy" className="flex items-center gap-2">
                  <Shield size={13} className="shrink-0" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2">
                  <Scale size={13} className="shrink-0" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial-methodology" className="flex items-center gap-2">
                  <Scale size={13} className="shrink-0" />
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="flex items-center gap-2">
                  <Scale size={13} className="shrink-0" />
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p className="text-overline mb-2">&copy; 2026 Washington Child Support Schedule Center</p>
            <p>
              WCSSC is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
            </p>
          </div>

          <div className="shrink-0">
            <span className="badge badge-success !py-2 !px-4">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              RCW 26.19 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

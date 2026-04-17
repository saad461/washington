import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-16 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">WCSSC</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Providing precision child support calculations for Washington State families since 2026. Official AOC-aligned data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Calculators</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Quick Estimator</Link></li>
              <li><Link href="/worksheet" className="hover:text-indigo-400 transition-colors">Worksheet Pro Wizard</Link></li>
              <li><Link href="/king-county-income-5000-2-children" className="hover:text-indigo-400 transition-colors">King County Guide</Link></li>
              <li><Link href="/pierce-county-income-5000-2-children" className="hover:text-indigo-400 transition-colors">Pierce County Guide</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">AOC Mandatory Forms &rarr;</a></li>
              <li><a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">WA DSHS Support Center &rarr;</a></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Guides &amp; Blog</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About WCSSC</Link></li>
              <li><Link href="/disclaimer#faq" className="hover:text-indigo-400 transition-colors">Legal FAQ &amp; Disclaimer</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /><a href="mailto:support@wcssc.site" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li className="flex items-center gap-2"><Shield size={14} /><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li className="flex items-center gap-2"><Scale size={14} /><Link href="/terms-of-service" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li className="flex items-center gap-2"><Scale size={14} /><Link href="/editorial-methodology" className="hover:text-indigo-400 transition-colors">Editorial Methodology</Link></li>
              <li className="flex items-center gap-2"><Scale size={14} /><Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <div className="text-left">
            <p className="mb-2">&copy; 2026 Washington Child Support Schedule Center. All Rights Reserved.</p>
            <p className="text-slate-400 max-w-xl normal-case font-medium">
              DISCLAIMER: WCSSC is not a law firm and this is not legal advice. We are a private resource providing calculations based on 2026 WA State Guidelines.
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-emerald-500 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Guidelines 01/2026 Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

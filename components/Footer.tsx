import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 section-default mt-auto border-t border-gray-800 pb-16 md:pb-24">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-20">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">WCSSC</span>
            </Link>
            <p className="text-base leading-relaxed mb-8 text-gray-400">
              Providing precision child support calculations for Washington State families since 2026. Official AOC-aligned data source.
            </p>
            <div className="flex gap-4">
               <a href="mailto:support@wcssc.site" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                  <Mail size={18} />
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-8">Calculators</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Quick Estimator</Link></li>
              <li><Link href="/worksheet" className="hover:text-white transition-colors">Worksheet Pro Wizard</Link></li>
              <li><Link href="/king-county-income-5000-2-children" className="hover:text-white transition-colors">King County Guide</Link></li>
              <li><Link href="/pierce-county-income-5000-2-children" className="hover:text-white transition-colors">Pierce County Guide</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-8">Resources</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AOC Mandatory Forms</a></li>
              <li><a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WA DSHS Support Center</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Legal Guides & Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About WCSSC</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-8">Legal</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/privacy" className="flex items-center gap-2 hover:text-white transition-colors"><Shield size={14} />Privacy Policy</Link></li>
              <li><Link href="/terms" className="flex items-center gap-2 hover:text-white transition-colors"><Scale size={14} />Terms of Service</Link></li>
              <li><Link href="/editorial-methodology" className="flex items-center gap-2 hover:text-white transition-colors"><Scale size={14} />Methodology</Link></li>
              <li><Link href="/disclaimer" className="flex items-center gap-2 hover:text-white transition-colors"><Scale size={14} />Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4">&copy; 2026 Washington Child Support Schedule Center.</p>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider font-semibold">
              DISCLAIMER: WCSSC is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates.
            </p>
          </div>
          <div className="flex gap-6 items-center shrink-0">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              RCW 26.19 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

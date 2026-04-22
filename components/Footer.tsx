import React from "react";
import Link from "next/link";
import { Calculator, Shield, Scale, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-10 md:py-16 mt-auto border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 mb-10 md:mb-16">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-8">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-sm shadow-indigo-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white font-heading">WCSSC</span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 text-gray-500">
              Providing precision child support calculations for Washington State families since 2026. Official AOC-aligned data source.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5 md:mb-8">Calculators</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Quick Estimator</Link></li>
              <li><Link href="/worksheet" className="hover:text-indigo-400 transition-colors">Worksheet Pro Wizard</Link></li>
              <li><Link href="/king-county-income-5000-2-children" className="hover:text-indigo-400 transition-colors">King County Guide</Link></li>
              <li><Link href="/pierce-county-income-5000-2-children" className="hover:text-indigo-400 transition-colors">Pierce County Guide</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5 md:mb-8">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">AOC Mandatory Forms</a></li>
              <li><a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">WA DSHS Support Center</a></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Legal Guides & Blog</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About WCSSC</Link></li>
              <li><Link href="/disclaimer#faq" className="hover:text-indigo-400 transition-colors">Calculation FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-5 md:mb-8">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer"><Mail size={14} /><a href="mailto:support@wcssc.site">Contact Us</a></li>
              <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer"><Shield size={14} /><Link href="/privacy">Privacy Policy</Link></li>
              <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer"><Scale size={14} /><Link href="/terms">Terms of Service</Link></li>
              <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer"><Scale size={14} /><Link href="/editorial-methodology">Editorial Methodology</Link></li>
              <li className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer"><Scale size={14} /><Link href="/disclaimer">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6">
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">&copy; 2026 Washington Child Support Schedule Center.</p>
            <p className="max-w-2xl text-[10px] font-bold uppercase tracking-widest text-gray-600 leading-relaxed">
              DISCLAIMER: WCSSC is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines.
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Guidelines 01/2026 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

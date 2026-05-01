import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, ShieldCheck, ArrowLeft, ChevronRight } from "lucide-react";
import CalculatorSchema from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Editorial Methodology — WCSSC",
  description: "Learn about the independent editorial methodology behind the Washington Child Support Calculator.",
  alternates: { canonical: 'https://wcssc.site/editorial-methodology' },
};

export default function EditorialMethodology() {
  return (
    <div className="flex-1 bg-white">
      <CalculatorSchema url="https://wcssc.site/editorial-methodology" />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Transparency & Accuracy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Our Editorial <span className="text-blue-600">Methodology</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              At WCSSC, accuracy in child support estimation is our primary mission. Our calculator is engineered to mirror the official Washington State Child Support Schedule (WSCSS).
            </p>
          </div>
        </div>
      </section>

      {/* ── LEGAL FRAMEWORK ─────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Legal Framework & Data Sources</h2>
          </div>
          <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)]">
            <p>
              All calculations performed by WCSSC are based on <strong className="text-[var(--color-text-primary)]">Chapter 26.19</strong> of the Revised Code of Washington (RCW). We specifically integrate the following standards into our algorithmic logic:
            </p>
            <ul className="space-y-4 mt-8 list-none pl-0">
              {[
                { id: "RCW 26.19.020", desc: "Implementation of the Monthly Basic Support Obligation Economic Table." },
                { id: "RCW 26.19.071", desc: "Standards for determination of gross and net income, including mandatory deductions." },
                { id: "RCW 26.19.065", desc: "Application of the 2026 Updated Self-Support Reserve (SSR)." },
                { id: "RCW 26.19.035", desc: "Standards for applying the schedule across all Washington counties." }
              ].map((item) => (
                <li key={item.id} className="flex items-start gap-4 p-6 bg-white border border-[var(--color-bg-border)] rounded-2xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <div>
                    <strong className="text-[var(--color-text-primary)] block mb-1">{item.id}</strong>
                    <span className="text-[var(--color-text-secondary)] leading-relaxed text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 2026 COMPLIANCE ─────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Scale size={20} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">2026 Update Compliance</h2>
          </div>
          <div className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)]">
            <p>Our system has been updated to reflect the significant <strong className="text-[var(--color-text-primary)]">January 1, 2026</strong> legislative changes, including:</p>
            <div className="grid gap-6 mt-8">
              <div className="card-standard p-6 border-l-4 border-l-blue-600">
                <h4 className="font-bold mb-2 text-[var(--color-text-primary)]">Expanded Economic Table</h4>
                <p className="text-sm text-[var(--color-text-body)] leading-relaxed">We support combined monthly net incomes up to $50,000, extending beyond the previous $12,000 limit used in older versions of the schedule.</p>
              </div>
              <div className="card-standard p-6 border-l-4 border-l-blue-600">
                <h4 className="font-bold mb-2 text-[var(--color-text-primary)]">PFML Integration</h4>
                <p className="text-sm text-[var(--color-text-body)] leading-relaxed">Our logic accounts for Paid Family and Medical Leave (PFML) premiums as mandatory deductions in net income calculations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERIFICATION ────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard bg-blue-600 !p-12 text-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
             <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">Independent Verification</h2>
             <p className="text-blue-50 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Every calculation is cross-referenced against the Washington State Department of Social and Health Services (DSHS) tools and official manual worksheets to ensure parity.
             </p>
             <div className="flex flex-wrap justify-center gap-8 relative z-10">
                <Link href="/glossary" className="text-white font-bold hover:underline flex items-center gap-2">
                  View Glossary <ChevronRight size={16} />
                </Link>
                <Link href="/disclaimer" className="text-white font-bold hover:underline flex items-center gap-2">
                  Legal Disclaimer <ChevronRight size={16} />
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

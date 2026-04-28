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
    <main className="flex-1">
      <CalculatorSchema url="https://wcssc.site/editorial-methodology" />
      <div className="container-reading section">

        <nav className="mb-12">
          <Link href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={14} className="mr-2" />
            Back to Calculator
          </Link>
        </nav>

        <header className="mb-16 md:mb-24">
          <p className="text-overline mb-6">Transparency & Accuracy</p>
          <h1 className="text-display mb-8">
            Our Editorial Methodology
          </h1>
          <p className="text-body-lg">
            At WCSSC, accuracy in child support estimation is our primary mission. Our calculator is engineered to mirror the official Washington State Child Support Schedule (WSCSS) as mandated by the state legislature.
          </p>
        </header>

        <div className="space-y-16 md:space-y-24">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-brand-light text-brand rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-h2">Legal Framework & Data Sources</h2>
            </div>
            <div>
              <p className="text-body">
                All calculations performed by WCSSC are based on Chapter 26.19 of the Revised Code of Washington (RCW). We specifically integrate the following standards into our algorithmic logic:
              </p>
              <ul className="space-y-4 mt-8 list-none p-0">
                {[
                  { id: "RCW 26.19.020", desc: "Implementation of the Monthly Basic Support Obligation Economic Table." },
                  { id: "RCW 26.19.071", desc: "Standards for determination of gross and net income, including mandatory deductions." },
                  { id: "RCW 26.19.065", desc: "Application of the 2026 Updated Self-Support Reserve (SSR)." },
                  { id: "RCW 26.19.035", desc: "Standards for applying the schedule across all Washington counties." }
                ].map((item) => (
                  <li key={item.id} className="flex items-start gap-4 p-6 card">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-1" />
                    <div>
                      <strong className="text-text-primary block mb-1">{item.id}</strong>
                      <span className="text-text-muted leading-relaxed text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
             <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-brand-light text-brand rounded-2xl">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-h2">2026 Update Compliance</h2>
            </div>
            <div>
              <p className="text-body">Our system has been updated to reflect the significant January 1, 2026 legislative changes, including:</p>
              <div className="grid gap-8 mt-8">
                <div className="card !p-6 border-l-4 border-l-brand">
                  <h4 className="text-h4 mb-2">Expanded Economic Table</h4>
                  <p className="text-sm text-text-muted leading-relaxed mb-0">We support combined monthly net incomes up to $50,000, extending beyond the previous $12,000 limit used in older versions of the schedule.</p>
                </div>
                <div className="card !p-6 border-l-4 border-l-brand">
                  <h4 className="text-h4 mb-2">PFML Integration</h4>
                  <p className="text-sm text-text-muted leading-relaxed mb-0">Our logic accounts for Paid Family and Medical Leave (PFML) premiums as mandatory deductions in net income calculations.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-inverse p-8 md:p-12 rounded-3xl text-center shadow-xl">
             <h2 className="text-h2 !text-white mb-8">Independent Verification</h2>
             <p className="text-body-lg !text-white mb-12 opacity-80">
              Every calculation is cross-referenced against the Washington State Department of Social and Health Services (DSHS) tools and official manual worksheets to ensure parity.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <Link href="/glossary" className="btn btn-ghost !text-white hover:!bg-white/10">
                  View Glossary <ChevronRight size={16} />
                </Link>
                <Link href="/disclaimer" className="btn btn-ghost !text-white hover:!bg-white/10">
                  Legal Disclaimer <ChevronRight size={16} />
                </Link>
             </div>
          </section>
        </div>
      </div>
    </main>
  );
}

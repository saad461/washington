"use client";

import React, { useState } from 'react';
import { getExactSupport } from '@/data/washingtonTable2026';
import { ArrowRight, Info, Calculator, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ComparisonTool() {
  const [income, setIncome] = useState<string>('5000');
  const [children, setChildren] = useState<number>(2);

  const parsedIncome = parseFloat(income) || 0;

  // Calculate 2026 Value
  const res2026 = getExactSupport(parsedIncome, children);
  const actual2026 = res2026.status === "calculated" ? res2026.totalSupport : null;

  // Custom Logic for 2024 vs 2026 Comparison
  let actual2024: number | null = null;
  let statusText = '';
  let statusColor = '';

  if (parsedIncome >= 0 && parsedIncome <= 2200) {
    if (actual2026 !== null) {
      actual2024 = Math.round(actual2026 * 0.95); // -5% modifier for low income (old SSR)
    }
  } else if (parsedIncome >= 2201 && parsedIncome <= 12000) {
    actual2024 = actual2026; // Exactly the same
  } else if (parsedIncome > 12000) {
    const res2024 = getExactSupport(12000, children);
    actual2024 = res2024.status === "calculated" ? res2024.totalSupport : null; // Frozen at 12000 cap for 2024
  }

  const difference = (actual2026 || 0) - (actual2024 || 0);

  if (difference > 0) {
    statusText = `+$${difference.toLocaleString()} Increase in 2026`;
    statusColor = 'bg-indigo-50 text-indigo-700 border-indigo-100';
  } else if (difference < 0) {
    statusText = `-$${Math.abs(difference).toLocaleString()} Decrease in 2026`;
    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-100';
  } else {
    statusText = 'No Presumptive Change';
    statusColor = 'bg-gray-50 text-gray-600 border-gray-100';
  }

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <main className="container-wide section-default relative z-10">
      <header className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-8 shadow-sm">
          <ArrowRight className="w-8 h-8 rotate-45" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          2024 vs 2026 Guideline Comparison
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          See exactly how Washington State&apos;s new 2026 economic tables (HB 1014 impacts) change your presumptive child support obligation compared to the old rules.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <div className="card-standard lg:sticky lg:top-24 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-indigo-600" />
              Impact Calculator
            </h2>

            <div className="space-y-8 mb-10">
              <div>
                <label className="block label-metadata mb-3 text-gray-500">Combined Monthly Net Income</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-400 group-focus-within:text-indigo-600 transition-colors">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full h-14 pl-12 pr-6 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all text-2xl"
                  />
                </div>
              </div>

              <div>
                <label className="block label-metadata mb-3 text-gray-500">Number of Children</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildren(num)}
                      className={`flex-1 h-10 rounded-xl text-sm font-bold border-2 transition-all ${
                        children === num
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                          : 'border-gray-100 bg-white hover:border-indigo-200 text-gray-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center font-bold tracking-widest uppercase text-[13px] tracking-[0.05em] text-[#374151] ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:px-6 md:py-8 shadow-sm flex flex-col justify-center min-h-[160px]">
              <p className="label-metadata mb-6 text-gray-400">Old 2024 Presumptive</p>
              <p className="text-4xl font-bold text-gray-900 mb-2">
                {actual2024 !== null ? curFormatter.format(actual2024) : 'Court Discretion'}
              </p>
              <p className="label-metadata text-gray-400">Legacy Estimate</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:px-6 md:py-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[160px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
              <p className="label-metadata mb-6 text-indigo-400">New 2026 Presumptive</p>
              <p className="text-4xl font-bold text-white mb-2">
                {actual2026 !== null ? curFormatter.format(actual2026) : 'Court Discretion'}
              </p>
              <p className="label-metadata text-indigo-400">Official 2026 Tables</p>
            </div>
          </div>

          <div className="card-standard p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl font-bold mb-10">Why did it change?</h3>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Expanded Economic Tables (Up to $50,000)</h4>
                  <p className="text-gray-600 leading-relaxed">
                    In 2024, the official economic table explicitly capped at $12,000 combined monthly net income. In 2026, tables expand to $50,000, creating much higher presumptive base obligations for high-income earners.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">New 180% Self-Support Reserve (SSR)</h4>
                  <p className="text-gray-600 leading-relaxed">
                    The 2026 changes index the SSR to 180% of the federal poverty level (approximately $2,394/month). This provides stronger poverty protections, lowering presumptive payments for low-income earners.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Mandatory Insurance Deductions</h4>
                  <p className="text-indigo-900/70 leading-relaxed">
                    The 2026 rules allow for specific deductions like Mandatory State Insurance Premiums (e.g., WA Cares Fund), reducing net income calculation before the table is applied.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
              <Link href="/worksheet" className="btn-primary !bg-gray-900 w-auto px-8 btn-h-44 flex items-center justify-center gap-3">
                Use Full 2026 Worksheet Pro <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

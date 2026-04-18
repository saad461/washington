"use client";

import React, { useState } from 'react';
import { getExactSupport } from '@/data/washingtonTable2026';
import { ArrowRight, Info, Calculator, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ComparisonTool() {
  const [income, setIncome] = useState<string>('5000');
  const [children, setChildren] = useState<number>(2);

  const parsedIncome = parseFloat(income) || 0;
  
  // Calculate 2026 Value
  const actual2026 = getExactSupport(parsedIncome, children);
  
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
    actual2024 = getExactSupport(12000, children); // Frozen at 12000 cap for 2024
  }

  const difference = (actual2026 || 0) - (actual2024 || 0);

  if (difference > 0) {
    statusText = `+$${difference.toLocaleString()} Increase in 2026`;
    statusColor = 'text-indigo-600 bg-indigo-50 border-indigo-100';
  } else if (difference < 0) {
    statusText = `-$${Math.abs(difference).toLocaleString()} Decrease in 2026`;
    statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-100';
  } else {
    statusText = 'No Presumptive Change';
    statusColor = 'text-gray-500 bg-gray-50 border-gray-100';
  }

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 sm:px-6 lg:px-8 relative z-10 font-sans">
      
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-8">
          <ArrowRight className="w-8 h-8 rotate-45" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-tight">
          2024 vs 2026 Guideline Comparison
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          See exactly how Washington State&apos;s new 2026 economic tables (HB 1014 impacts) change your presumptive child support obligation compared to the old rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-10 lg:sticky lg:top-32">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3 font-heading">
              <Calculator className="w-6 h-6 text-indigo-600" />
              Impact Calculator
            </h2>
            
            <div className="space-y-8 mb-10">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Combined Monthly Net Income</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium group-focus-within:text-indigo-600 transition-colors">$</span>
                  <input 
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full h-14 pl-8 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none font-bold text-gray-900 transition-all text-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Number of Children</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildren(num)}
                      className={`flex-1 h-12 rounded-xl text-sm font-bold border transition-all ${
                        children === num 
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' 
                        : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-center font-bold text-sm tracking-tight ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 relative overflow-hidden group">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">Old 2024 Presumptive</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-400 mb-2 font-heading">
                {actual2024 !== null ? curFormatter.format(actual2024) : 'Court Discretion'}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Averages Estimate</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">New 2026 Presumptive</p>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2 font-heading">
                {actual2026 !== null ? curFormatter.format(actual2026) : 'Court Discretion'}
              </p>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Official 2026 Tables</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-heading">Why did it change?</h3>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 font-heading">Expanded Economic Tables (Up to $50,000)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    In 2024, the official economic table explicitly capped at $12,000 combined monthly net income. In 2026, tables expand to $50,000, creating much higher presumptive base obligations for high-income earners.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 font-heading">New 180% Self-Support Reserve (SSR)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    The 2026 changes index the SSR to 180% of the federal poverty level. This provides stronger poverty protections, lowering presumptive payments for earners under $2,200 net.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-50">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                  <Info className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900 mb-2 font-heading">Mandatory Insurance Deductions</h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    The 2026 rules allow for specific deductions like Mandatory State Insurance Premiums (e.g., WA Cares Fund), reducing net income calculation before the table is applied.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
               <Link href="/worksheet" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] w-full font-heading">
                Use Full 2026 Worksheet Pro
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

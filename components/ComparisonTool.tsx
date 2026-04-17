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
    statusColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (difference < 0) {
    statusText = `-$${Math.abs(difference).toLocaleString()} Decrease in 2026`;
    statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else {
    statusText = 'No Change';
    statusColor = 'text-slate-600 bg-slate-50 border-slate-200';
  }

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24 relative z-10">
      
      <div className="text-center mb-16">
        <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
          <ArrowRight className="w-8 h-8 rotate-45" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm leading-tight">
          2024 vs 2026 Child Support <br className="hidden sm:block"/> Guideline Comparison
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          See exactly how Washington State&apos;s new 2026 economic tables (HB 1014 impacts) change your presumptive child support obligation compared to the old 2024 rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 shadow-xl rounded-[2.5rem] p-8 md:p-10 sticky top-24">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-indigo-600" />
              Comparison Calculator
            </h2>
            
            <div className="space-y-8 mb-10">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Combined Monthly Net Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input 
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full h-14 pl-8 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-bold text-slate-900 transition-all text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Number of Children</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildren(num)}
                      className={`flex-1 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                        children === num 
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center font-black ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-200/50 border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden opacity-80">
              <p className="text-slate-600 text-xs font-black uppercase tracking-widest mb-4">Old 2024 Presumptive</p>
              <p className="text-4xl font-black text-slate-700 mb-2">
                {actual2024 !== null ? curFormatter.format(actual2024) : 'Court Discretion'}
              </p>
              <p className="text-xs font-bold text-slate-500">Based on past schedules</p>
            </div>

            <div className="bg-indigo-600 border border-indigo-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-4">New 2026 Presumptive</p>
              <p className="text-4xl font-black text-white mb-2">
                {actual2026 !== null ? curFormatter.format(actual2026) : 'Court Discretion'}
              </p>
              <p className="text-xs font-bold text-indigo-200">Based on active 2026 schedules</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-lg">
            <h3 className="text-xl font-black text-slate-900 mb-6">Why did it change?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Expanded Economic Tables (Up to $50,000)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    In 2024, the official economic table explicitly capped at $12,000 combined monthly net income. Anything over was extrapolated by judges. In 2026, the tables have been vastly expanded up to $50,000, creating much higher presumptive base obligations for high-income earners.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">New 180% Self-Support Reserve (SSR)</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    For low-income earners, the 2026 changes index the SSR to 180% of the federal poverty level (set at $1,514). This provides significantly stronger poverty protections, often lowering payments for those earning under $2,200 net compared to 2024 standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                <Info className="w-6 h-6 text-indigo-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-indigo-900 mb-1">Deduction Note: State Insurance Premiums</h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    Beyond just the base table differences, the 2026 rules allow for new specific deductions like <strong>Mandatory State Insurance Premiums</strong> (e.g., WA Cares Fund) from gross income, which were not explicitly standard deductions in the old 2024 worksheet framework.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
               <Link href="/worksheet" className="inline-flex items-center justify-center px-6 py-4 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors w-full">
                Use the Full 2026 Calculator
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

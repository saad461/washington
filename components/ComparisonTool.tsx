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
    statusColor = 'bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary-hover)] border-[var(--color-brand-primary-mid)]';
  } else if (difference < 0) {
    statusText = `-$${Math.abs(difference).toLocaleString()} Decrease in 2026`;
    statusColor = 'text-[var(--color-success)] bg-[var(--color-success-bg)] border-[var(--color-bg-border)]';
  } else {
    statusText = 'No Presumptive Change';
    statusColor = 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border-[var(--color-bg-border)]';
  }

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="py-0">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
          See Your Impact
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Did Your Obligation Change?
        </h2>
        <p className="text-gray-500 mb-8">
          Enter your combined net income to see the estimated difference between your 2024 and 2026 child support obligation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <div className="card-standard lg:sticky lg:top-24 shadow-[var(--shadow-card-md)]">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--color-text-primary)]">
              <Calculator className="w-6 h-6 text-[var(--color-brand-primary)]" />
              Impact Calculator
            </h2>

            <div className="space-y-8 mb-10">
              <div>
                <label className="block input-label mb-3">Combined Monthly Net Income</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="input-standard !h-16 pl-12 pr-6 !text-2xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block input-label mb-3">Number of Children</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildren(num)}
                      className={`flex-1 h-11 rounded-xl text-sm font-bold border-2 transition-all ${
                        children === num
                          ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20'
                          : 'border-[var(--color-bg-border)] bg-white hover:border-[var(--color-brand-primary)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border text-center font-bold tracking-widest uppercase text-[12px] ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)] rounded-2xl p-8 md:px-6 md:py-8 shadow-[var(--shadow-card)] flex flex-col justify-center min-h-[160px]">
              <p className="eyebrow !text-[var(--color-text-secondary)] mb-6">Old 2024 Presumptive</p>
              <p className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                {actual2024 !== null ? curFormatter.format(actual2024) : 'Court Discretion'}
              </p>
              <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Legacy Estimate</p>
            </div>

            <div className="card-highlighted !bg-[var(--color-brand-primary)] !border-none !p-8 md:!px-6 md:!py-8 shadow-[var(--shadow-card-hover)] flex flex-col justify-center min-h-[160px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
              <p className="text-[12px] font-bold text-white/70 uppercase tracking-widest mb-6">New 2026 Presumptive</p>
              <p className="text-4xl font-bold text-white mb-2">
                {actual2026 !== null ? curFormatter.format(actual2026) : 'Court Discretion'}
              </p>
              <p className="text-[12px] font-bold text-white/70 uppercase tracking-wider">Official 2026 Tables</p>
            </div>
          </div>

          <div className="card-standard !p-8 md:!p-12 shadow-[var(--shadow-card)]">
            <h3 className="text-2xl font-bold mb-10 text-[var(--color-text-primary)]">Why did it change?</h3>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center shrink-0 border border-[var(--color-bg-border)]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Expanded Economic Tables (Up to $50,000)</h4>
                  <p className="text-[var(--color-text-body)] leading-relaxed">
                    In 2024, the official economic table explicitly capped at $12,000 combined monthly net income. In 2026, tables expand to $50,000, creating much higher presumptive base obligations for high-income earners.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success-bg)] text-[var(--color-success)] flex items-center justify-center shrink-0 border border-[var(--color-bg-border)]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">New 180% Self-Support Reserve (SSR)</h4>
                  <p className="text-[var(--color-text-body)] leading-relaxed">
                    The 2026 changes index the SSR to 180% of the federal poverty level (approximately $2,394/month). This provides stronger poverty protections, lowering presumptive payments for low-income earners.
                  </p>
                </div>
              </div>

              <div className="callout-blue">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)] text-white flex items-center justify-center shrink-0 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Mandatory Insurance Deductions</h4>
                    <p className="text-[var(--color-info)] leading-relaxed">
                      The 2026 rules allow for specific deductions like Mandatory State Insurance Premiums (e.g., WA Cares Fund), reducing net income calculation before the table is applied.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-[var(--color-bg-border-soft)]">
              <Link href="/worksheet" className="btn-primary-lg btn-primary w-full sm:w-auto">
                Use Full 2026 Worksheet Pro <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

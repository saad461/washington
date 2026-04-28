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
      actual2024 = Math.round(actual2026 * 0.95);
    }
  } else if (parsedIncome >= 2201 && parsedIncome <= 12000) {
    actual2024 = actual2026;
  } else if (parsedIncome > 12000) {
    const res2024 = getExactSupport(12000, children);
    actual2024 = res2024.status === "calculated" ? res2024.totalSupport : null;
  }

  const difference = (actual2026 || 0) - (actual2024 || 0);

  if (difference > 0) {
    statusText = `+$${difference.toLocaleString()} Increase in 2026`;
    statusColor = 'badge-brand';
  } else if (difference < 0) {
    statusText = `-$${Math.abs(difference).toLocaleString()} Decrease in 2026`;
    statusColor = 'badge-success';
  } else {
    statusText = 'No Presumptive Change';
    statusColor = 'badge-neutral';
  }

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <main className="container section relative z-10">
      <header className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <div className="inline-flex p-4 bg-brand-light text-brand rounded-2xl mb-8">
          <ArrowRight className="w-8 h-8 rotate-45" />
        </div>
        <h1 className="text-display mb-8">
          2024 vs 2026 Comparison
        </h1>
        <p className="text-body-lg">
          See exactly how Washington State&apos;s new 2026 economic tables (HB 1014 impacts) change your presumptive child support obligation compared to the old rules.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="card card-elevated lg:sticky lg:top-24">
            <h2 className="text-h2 mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-brand" />
              Impact Calculator
            </h2>

            <div className="space-y-8 mb-10">
              <div className="field">
                <label>Combined Monthly Net Income</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-text-muted/40">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="input !h-14 pl-12 text-h2 !mb-0"
                  />
                </div>
              </div>

              <div className="field">
                <label>Number of Children</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildren(num)}
                      className={`btn btn-md flex-1 ${children === num ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`badge ${statusColor} !p-4 !rounded-xl w-full justify-center !text-sm`}>
              {statusText}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="compare-grid !mt-0">
            <div className="compare-card-old flex flex-col justify-center min-h-[160px]">
              <p className="text-overline mb-6 !text-text-muted">Old 2024 Presumptive</p>
              <p className="compare-amount !text-text-primary mb-2">
                {actual2024 !== null ? curFormatter.format(actual2024) : 'Court Discretion'}
              </p>
              <p className="text-overline !text-text-muted">Legacy Estimate</p>
            </div>

            <div className="compare-card-new flex flex-col justify-center min-h-[160px]">
              <p className="text-overline mb-6 !text-brand-light">New 2026 Presumptive</p>
              <p className="compare-amount !text-white mb-2">
                {actual2026 !== null ? curFormatter.format(actual2026) : 'Court Discretion'}
              </p>
              <p className="text-overline !text-brand-light">Official 2026 Tables</p>
            </div>
          </div>

          <div className="card p-8 md:p-12">
            <h3 className="text-h2 mb-10">Why did it change?</h3>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-success-light text-success flex items-center justify-center shrink-0 border border-success">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-h4 mb-2">Expanded Economic Tables</h4>
                  <p className="text-body mb-0">
                    In 2024, the official economic table explicitly capped at $12,000 combined monthly net income. In 2026, tables expand to $50,000.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-success-light text-success flex items-center justify-center shrink-0 border border-success">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-h4 mb-2">New 180% SSR</h4>
                  <p className="text-body mb-0">
                    The 2026 changes index the SSR to 180% of the federal poverty level (approximately $2,394/month).
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 card card-brand">
                <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="text-h4 mb-2">Mandatory Insurance</h4>
                  <p className="text-body mb-0 opacity-80">
                    The 2026 rules allow for specific deductions like Mandatory State Insurance Premiums (e.g., WA Cares Fund).
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-border-default">
              <Link href="/worksheet" className="btn btn-primary btn-lg w-full sm:w-auto">
                Use Full 2026 Worksheet Pro <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

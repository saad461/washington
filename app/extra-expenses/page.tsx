"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExtraExpensesCalculator() {
  const [parent1Income, setParent1Income] = useState<string>('');
  const [parent2Income, setParent2Income] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');

  const p1 = parseFloat(parent1Income) || 0;
  const p2 = parseFloat(parent2Income) || 0;
  const expense = parseFloat(expenseAmount) || 0;

  const combined = p1 + p2;
  const p1Share = combined > 0 ? p1 / combined : 0;
  const p2Share = combined > 0 ? p2 / combined : 0;

  const p1Cost = expense * p1Share;
  const p2Cost = expense * p2Share;

  const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const perFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 });

  return (
    <main className="flex-1 bg-white relative overflow-hidden">
      <div className="container-reading section-default relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-2xl mb-8 shadow-[var(--shadow-card)]">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[var(--color-text-primary)]">
            Proportional Expense Splitter
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            In Washington State, &quot;extraordinary expenses&quot; like daycare and health insurance premiums must be split proportionally based on each parent&apos;s net income.
          </p>
        </header>

        <div className="card-standard !p-8 md:!p-12 mb-16 shadow-[var(--shadow-card-md)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <label className="input-label">Parent 1 Net Income</label>
              <div className="relative group">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={parent1Income}
                  onChange={(e) => setParent1Income(e.target.value)}
                  className="input-standard pl-12 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="input-label">Parent 2 Net Income</label>
              <div className="relative group">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={parent2Income}
                  onChange={(e) => setParent2Income(e.target.value)}
                  className="input-standard pl-12 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <label className="input-label">Total Monthly Extraordinary Expense (e.g. Daycare)</label>
            <div className="relative group max-w-md">
              <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] transition-colors" />
              <input
                type="number"
                placeholder="0.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="input-standard !h-16 pl-12 text-2xl font-bold"
              />
            </div>
          </div>

          <AnimatePresence>
            {combined > 0 && expense > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-highlighted !bg-[var(--color-brand-primary)] !border-none !p-8 md:!p-10 shadow-[var(--shadow-card-hover)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
                <span className="text-[12px] font-bold text-white/80 uppercase tracking-widest block mb-8">Proportional Split Results</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <p className="text-[12px] font-bold font-bold text-white/60 uppercase tracking-widest mb-3">Parent 1 Share ({perFormatter.format(p1Share)})</p>
                    <p className="text-4xl font-bold text-white mb-3">{curFormatter.format(p1Cost)}</p>
                    <p className="text-[12px] font-bold font-bold text-white/40 uppercase">{curFormatter.format(p1)} / mo net income</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <p className="text-[12px] font-bold font-bold text-white/60 uppercase tracking-widest mb-3">Parent 2 Share ({perFormatter.format(p2Share)})</p>
                    <p className="text-4xl font-bold text-white mb-3">{curFormatter.format(p2Cost)}</p>
                    <p className="text-[12px] font-bold font-bold text-white/40 uppercase">{curFormatter.format(p2)} / mo net income</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="card-standard bg-[var(--color-bg-subtle)] border-dashed border-2 border-[var(--color-bg-border)] !p-12 text-center shadow-none">
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">Want the complete breakdown?</h3>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-lg mx-auto leading-relaxed">
            This tool only calculates the add-on expenses. To calculate the mandatory base support and print your official forms, use the full worksheet.
          </p>
          <Link href="/worksheet" className="btn-primary-lg btn-primary !rounded-full">
            Open Full Calculator <ArrowRight size={18} className="ml-2" />
          </Link>
        </section>

      </div>
    </main>
  );
}

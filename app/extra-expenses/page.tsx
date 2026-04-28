"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, ArrowRight } from 'lucide-react';
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
    <main className="flex-1 w-full overflow-hidden">
      <div className="container-reading section relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-brand-light text-brand rounded-2xl mb-8">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-display mb-8">
            Proportional Splitter
          </h1>
          <p className="text-body-lg">
            In Washington State, extraordinary expenses like daycare and health insurance are split proportionally based on each parent&apos;s net income.
          </p>
        </header>

        <div className="card card-elevated !p-8 md:!p-12 mb-16">
          <div className="input-row-2 mb-12">
            <div className="field">
              <label>Parent 1 Net Income</label>
              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/40" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={parent1Income}
                  onChange={(e) => setParent1Income(e.target.value)}
                  className="input pl-12 text-h4"
                />
              </div>
            </div>
            <div className="field">
              <label>Parent 2 Net Income</label>
              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/40" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={parent2Income}
                  onChange={(e) => setParent2Income(e.target.value)}
                  className="input pl-12 text-h4"
                />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <label>Total Monthly Expense</label>
            <div className="relative max-w-md">
              <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/40" />
              <input
                type="number"
                placeholder="0.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="input pl-12 !h-16 text-h2 !mb-0"
              />
            </div>
          </div>

          <AnimatePresence>
            {combined > 0 && expense > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="section-inverse rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
              >
                <h3 className="text-overline !text-brand-light mb-8">Split Results</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-overline !text-white/50 mb-3">Parent 1 Share ({perFormatter.format(p1Share)})</p>
                    <p className="compare-amount !text-white mb-3">{curFormatter.format(p1Cost)}</p>
                    <p className="text-xs opacity-40 mb-0">{curFormatter.format(p1)} / mo net</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-overline !text-brand-light mb-3">Parent 2 Share ({perFormatter.format(p2Share)})</p>
                    <p className="compare-amount !text-brand-light mb-3">{curFormatter.format(p2Cost)}</p>
                    <p className="text-xs opacity-40 mb-0">{curFormatter.format(p2)} / mo net</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="section-subtle p-12 rounded-[2rem] text-center border border-border-default">
          <h3 className="text-h3 mb-6">Want the complete breakdown?</h3>
          <p className="text-body-lg mb-10 max-w-lg mx-auto">
            This tool only calculates add-on expenses. For mandatory base support and official forms, use the full wizard.
          </p>
          <Link href="/worksheet" className="btn btn-primary btn-lg w-full md:w-fit">
            Open Full Calculator <ArrowRight size={18} />
          </Link>
        </section>

      </div>
    </main>
  );
}

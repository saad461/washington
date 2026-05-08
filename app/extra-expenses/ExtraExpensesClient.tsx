"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
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
    <div className="flex-1 bg-white relative overflow-hidden">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Proportional Splitter
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Extraordinary <span className="text-blue-600">Expense Splitter</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              In Washington State, expenses like daycare and health insurance must be split proportionally based on each parent&apos;s net income share.
            </p>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <div className="card-standard !p-8 md:!p-12 mb-16 shadow-[var(--shadow-card-md)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-2">
                <label className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Parent 1 Net Income</label>
                <div className="relative group">
                  <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
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
                <label className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Parent 2 Net Income</label>
                <div className="relative group">
                  <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
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
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Total Monthly Extraordinary Expense (e.g. Daycare)</label>
              <div className="relative group max-w-md mt-2">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="input-standard !h-16 pl-14 text-2xl font-bold"
                />
              </div>
            </div>

            <AnimatePresence>
              {combined > 0 && expense > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-blue-600 rounded-3xl !p-8 md:!p-10 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />
                  <span className="text-[12px] font-bold text-white/80 uppercase tracking-widest block mb-8">Proportional Split Results</span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-3">Parent 1 Share ({perFormatter.format(p1Share)})</p>
                      <p className="text-4xl font-bold text-white mb-3">{curFormatter.format(p1Cost)}</p>
                      <p className="text-[12px] font-bold text-white/40 uppercase">{curFormatter.format(p1)} / mo net income</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-[12px] font-bold text-white/60 uppercase tracking-widest mb-3">Parent 2 Share ({perFormatter.format(p2Share)})</p>
                      <p className="text-4xl font-bold text-white mb-3">{curFormatter.format(p2Cost)}</p>
                      <p className="text-[12px] font-bold text-white/40 uppercase">{curFormatter.format(p2)} / mo net income</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading text-center">
          <div className="card-standard border-dashed border-2 border-gray-200 !p-12 shadow-none">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Want the complete breakdown?</h3>
            <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
              This tool only calculates the add-on expenses. To calculate the mandatory base support and print your official forms, use the full worksheet.
            </p>
            <Link href="/worksheet" className="btn btn-primary btn-primary-lg !rounded-full">
              Open Full Calculator <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

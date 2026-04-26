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
    <main className="flex-1 bg-page relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-50/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container-reading section-default relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-8 shadow-sm">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Proportional Expense Splitter
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            In Washington State, &quot;extraordinary expenses&quot; like daycare and health insurance premiums must be split proportionally based on each parent&apos;s net income.
          </p>
        </header>

        <div className="card-standard p-8 md:p-12 mb-16 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <label className="input-label text-gray-500 uppercase tracking-widest text-[10px]">Parent 1 Net Income</label>
              <div className="relative group">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
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
              <label className="input-label text-gray-500 uppercase tracking-widest text-[10px]">Parent 2 Net Income</label>
              <div className="relative group">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
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
            <label className="input-label text-gray-500 uppercase tracking-widest text-[10px]">Total Monthly Extraordinary Expense (e.g. Daycare)</label>
            <div className="relative group max-w-md">
              <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="number"
                placeholder="0.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="input-standard pl-12 text-2xl font-bold h-16"
              />
            </div>
          </div>

          <AnimatePresence>
            {combined > 0 && expense > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
                <h3 className="label-metadata text-indigo-400 mb-8 tracking-widest uppercase">Proportional Split Results</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <p className="label-metadata text-gray-400 mb-3">Parent 1 Share ({perFormatter.format(p1Share)})</p>
                    <p className="text-4xl font-bold mb-3">{curFormatter.format(p1Cost)}</p>
                    <p className="text-xs text-white/40 font-medium">{curFormatter.format(p1)} / mo net income</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <p className="label-metadata text-indigo-400 mb-3">Parent 2 Share ({perFormatter.format(p2Share)})</p>
                    <p className="text-4xl font-bold mb-3 text-indigo-400">{curFormatter.format(p2Cost)}</p>
                    <p className="text-xs text-white/40 font-medium">{curFormatter.format(p2)} / mo net income</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="bg-gray-50 p-12 rounded-[2rem] text-center border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Want the complete breakdown?</h3>
          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
            This tool only calculates the add-on expenses. To calculate the mandatory base support and print your official forms, use the full worksheet.
          </p>
          <Link href="/worksheet" className="btn-primary w-full md:w-fit px-10 h-14 flex items-center justify-center gap-3 group">
            Open Full Calculator <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}

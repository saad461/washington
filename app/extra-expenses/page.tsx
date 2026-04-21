"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

 const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
 const perFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 });

 return (
 <div className="flex-1 bg-[#FDFDFE] relative w-full overflow-hidden font-sans min-h-screen">
 <div className="max-w-3xl mx-auto px-6 py-10 md:py-16 relative z-10">

 <div className="mb-16 text-center">
 <div className="inline-flex p-3 bg-indigo-50 rounded-xl mb-6">
 <Calculator className="w-8 h-8" />
 </div>
 <h1 className=" mb-6 ">
 Proportional Expense Splitter
 </h1>
 <p className="text-lg max-w-2xl mx-auto ">
 In Washington State, &quot;extraordinary expenses&quot; like daycare, private school tuition, and health insurance premiums are completely separate from the base transfer payment. They must be split proportionally based on each parent&apos;s net income.
 </p>
 </div>

 <div className="bg-white border border-gray-100 rounded-xl shadow-sm shadow-indigo-900/5 p-6 md:p-14 mb-12">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
 <div>
 <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Parent 1 Net Income</label>
 <div className="relative group">
 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
 <input
 type="number"
 placeholder="0.00"
 value={parent1Income}
 onChange={(e) => setParent1Income(e.target.value)}
 className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
 />
 </div>
 </div>
 <div>
 <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Parent 2 Net Income</label>
 <div className="relative group">
 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
 <input
 type="number"
 placeholder="0.00"
 value={parent2Income}
 onChange={(e) => setParent2Income(e.target.value)}
 className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
 />
 </div>
 </div>
 </div>

 <div className="mb-12">
 <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Total Monthly Extraordinary Expense (e.g. Daycare)</label>
 <div className="relative group max-w-md">
 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
 <input
 type="number"
 placeholder="0.00"
 value={expenseAmount}
 onChange={(e) => setExpenseAmount(e.target.value)}
 className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-lg"
 />
 </div>
 </div>

 {combined > 0 && expense > 0 && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-gray-900 rounded-2xl p-6 text-white mt-10 relative overflow-hidden"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
 <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-6">Proportional Split Results</h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-white/10 rounded-xl p-6 border border-white/5">
 <p className=" text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Parent 1 Share ({perFormatter.format(p1Share)})</p>
 <p className="text-3xl ">{curFormatter.format(p1Cost)}</p>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase mt-2">{curFormatter.format(p1)} / mo net income</p>
 </div>
 <div className="bg-white/10 rounded-xl p-6 border border-white/5">
 <p className=" text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Parent 2 Share ({perFormatter.format(p2Share)})</p>
 <p className="text-3xl text-indigo-400">{curFormatter.format(p2Cost)}</p>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase mt-2">{curFormatter.format(p2)} / mo net income</p>
 </div>
 </div>
 </motion.div>
 )}
 </div>

 <div className="text-center">
 <h3 className=" mb-4">Want the complete breakdown?</h3>
 <p className=" mb-8 max-w-lg mx-auto">This tool only calculates the add-on expenses. To calculate the mandatory base support and print your official forms, use the full worksheet.</p>
 <Link href="/worksheet" className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-gray-100 transition-all hover:-translate-y-1">
 Open Full Calculator <ChevronRight className="w-5 h-5 ml-2" />
 </Link>
 </div>

 </div>
 </div>
 );
}

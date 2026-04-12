"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, Shield, Calculator, ChevronRight } from "lucide-react";
import { getExactSupport } from "@/data/washingtonTable2026";

export default function HomeCalculator() {
  const [parent1Income, setParent1Income] = useState("");
  const [parent2Income, setParent2Income] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [result, setResult] = useState<{
    combinedIncome: number;
    parent1Share: number;
    parent2Share: number;
    totalSupport: number | null;
    parent1Support: number;
    parent2Support: number;
  } | null>(null);

  const handleCalculate = () => {
    setError("");
    setResult(null);

    const p1 = parseFloat(parent1Income);
    const p2 = parseFloat(parent2Income);

    if (isNaN(p1) || p1 < 0 || isNaN(p2) || p2 < 0 || (p1 === 0 && p2 === 0)) {
      setError("Please enter valid income for at least one parent.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const combinedIncome = p1 + p2;
      const parent1Share = combinedIncome > 0 ? p1 / combinedIncome : 0;
      const parent2Share = combinedIncome > 0 ? p2 / combinedIncome : 0;
      const totalSupport = getExactSupport(combinedIncome, childrenCount);

      setResult({
        combinedIncome,
        parent1Share,
        parent2Share,
        totalSupport,
        parent1Support: (totalSupport || 0) * parent1Share,
        parent2Support: (totalSupport || 0) * parent2Share,
      });

      setIsLoading(false);
    }, 500);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <>
      {/* Full Calculator UI Card */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 transform transition-all duration-300 hover:shadow-2xl">
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
          
          <div className="flex flex-col text-left">
            <label htmlFor="parent1-income" className="mb-2 text-sm font-semibold text-slate-700">
              Parent 1 Monthly Net Income
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 font-medium">$</span>
              <input 
                type="number" 
                id="parent1-income"
                value={parent1Income}
                onChange={(e) => setParent1Income(e.target.value)}
                placeholder="e.g. 4000"
                className={`w-full pl-9 pr-4 py-3 rounded-xl border ${error ? 'border-red-400 bg-red-50 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:ring-indigo-500/50 focus:border-indigo-500'} text-slate-900 text-lg transition-colors focus:bg-white focus:outline-none focus:ring-2 h-14 placeholder:text-slate-400`}
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="parent2-income" className="mb-2 text-sm font-semibold text-slate-700">
              Parent 2 Monthly Net Income
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 font-medium">$</span>
              <input 
                type="number" 
                id="parent2-income"
                value={parent2Income}
                onChange={(e) => setParent2Income(e.target.value)}
                placeholder="e.g. 2000"
                className={`w-full pl-9 pr-4 py-3 rounded-xl border ${error ? 'border-red-400 bg-red-50 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:ring-indigo-500/50 focus:border-indigo-500'} text-slate-900 text-lg transition-colors focus:bg-white focus:outline-none focus:ring-2 h-14 placeholder:text-slate-400`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="children-count" className="mb-2 text-sm font-semibold text-slate-700">
              Number of Children
            </label>
            <div className="relative">
              <select 
                id="children-count"
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="w-full px-4 py-3 appearance-none rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-lg transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 h-14"
              >
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
                <option value="4">4 Children</option>
                <option value="5">5 Children</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`mt-2 w-full text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-900/20 ${isLoading ? 'bg-slate-700 cursor-not-allowed opacity-80' : 'bg-slate-900 hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]'}`}
          >
            {isLoading ? "Calculating..." : "Calculate Estimate"}
          </button>
          <p className="text-xs text-slate-500 text-center mt-3 px-2 leading-relaxed">
            Based on the official Washington State Child Support Schedule (Effective January 2026). Actual court-ordered support may vary.
          </p>

          <div aria-live="polite" aria-atomic="true">
            {result !== null && (
              <div className="mt-6 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl transform transition-all animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-5 text-center">
                  Estimated Support Breakdown
                </h3>
                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex justify-between items-center border-b border-indigo-200/60 pb-3">
                    <span className="font-medium">Combined Monthly Income</span>
                    <span className="font-bold text-slate-900">{formatCurrency(result.combinedIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-indigo-200/60 pb-3">
                    <span className="font-medium">Total Basic Support Obligation</span>
                    <span className="font-bold text-slate-900">
                      {result.totalSupport !== null ? formatCurrency(result.totalSupport) : "Court Discretion"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="font-semibold text-slate-800">Parent 1 Share</p>
                      <p className="text-xs text-slate-500 mt-0.5">{(result.parent1Share * 100).toFixed(1)}% of total</p>
                    </div>
                    <p className="text-lg font-bold text-indigo-700">{formatCurrency(result.parent1Support)}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="font-semibold text-slate-800">Parent 2 Share</p>
                      <p className="text-xs text-slate-500 mt-0.5">{(result.parent2Share * 100).toFixed(1)}% of total</p>
                    </div>
                    <p className="text-lg font-bold text-indigo-700">{formatCurrency(result.parent2Support)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Quick Tips */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 transform hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Scale size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-3">Legal Precision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">Updated with official 2026 Washington State Economic Tables and mandatory guidelines.</p>
        </div>
        
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 transform hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-3">Privacy First</h3>
          <p className="text-sm text-slate-600 leading-relaxed">No data is stored on our servers. All calculations happen locally in your browser.</p>
        </div>

        <div className="p-8 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 transform hover:-translate-y-1 transition-all text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-white/20 transition-colors" />
          <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
            <Calculator size={24} />
          </div>
          <h3 className="font-bold mb-3">Need a Full Worksheet?</h3>
          <p className="text-sm text-indigo-100 leading-relaxed mb-6">Generate the mandatory 8-part official PDF worksheet using our advanced Pro Wizard.</p>
          <Link href="/worksheet" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors">
            Launch Pro Wizard
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}

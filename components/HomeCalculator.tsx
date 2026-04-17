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
      setError("Please enter valid monthly net income.");
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
    }, 400);
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <>
      {/* Full Calculator UI Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 font-sans">
        <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>

          <div className="flex flex-col text-left">
            <label htmlFor="parent1-income" className="mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Parent 1 Monthly Net Income
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-medium group-focus-within:text-indigo-600 transition-colors">$</span>
              <input
                type="number"
                id="parent1-income"
                value={parent1Income}
                onChange={(e) => setParent1Income(e.target.value)}
                placeholder="0.00"
                className={`w-full h-14 pl-8 pr-4 rounded-xl border ${error ? 'border-red-200 bg-red-50 focus:ring-red-500/5 focus:border-red-500' : 'border-gray-200 bg-gray-50/50 focus:ring-indigo-500/5 focus:border-indigo-600'} text-gray-900 text-xl font-bold transition-all focus:bg-white focus:outline-none`}
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="parent2-income" className="mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Parent 2 Monthly Net Income
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-medium group-focus-within:text-indigo-600 transition-colors">$</span>
              <input
                type="number"
                id="parent2-income"
                value={parent2Income}
                onChange={(e) => setParent2Income(e.target.value)}
                placeholder="0.00"
                className={`w-full h-14 pl-8 pr-4 rounded-xl border ${error ? 'border-red-200 bg-red-50 focus:ring-red-500/5 focus:border-red-500' : 'border-gray-200 bg-gray-50/50 focus:ring-indigo-500/5 focus:border-indigo-600'} text-gray-900 text-xl font-bold transition-all focus:bg-white focus:outline-none`}
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-3 animate-pulse">{error}</p>}
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="children-count" className="mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Number of Children
            </label>
            <div className="relative">
              <select
                id="children-count"
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="w-full h-14 px-4 appearance-none rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-lg font-bold transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600"
              >
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
                <option value="4">4 Children</option>
                <option value="5">5 Children</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gray-900 text-white rounded-xl h-14 font-bold text-sm uppercase tracking-widest transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800 active:scale-[0.98]'}`}
          >
            {isLoading ? "Synchronizing..." : "Calculate Presumptive Support"}
          </button>

          <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed font-medium">
            Based on official 2026 WA State Schedule guidelines (RCW 26.19). This is a target estimate only.
          </p>

          <div aria-live="polite" aria-atomic="true">
            {result !== null && (
              <div className="mt-4 p-8 bg-gray-50 border border-gray-100 rounded-2xl animate-in fade-in slide-in-from-bottom-3 duration-500">
                <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-6 text-center">
                  Calculation Results (2026)
                </h3>
                <div className="space-y-5 text-sm">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-medium text-gray-500">Combined Income</span>
                    <span className="font-bold text-gray-900 font-heading">{formatCurrency(result.combinedIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-medium text-gray-500">Table Obligation</span>
                    <span className="font-bold text-gray-900 font-heading">
                      {result.totalSupport !== null ? formatCurrency(result.totalSupport) : "Court Discretion"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">P1 Transfer</p>
                      <p className="text-xl font-bold text-indigo-600 font-heading">{formatCurrency(result.parent1Support)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">P2 Transfer</p>
                      <p className="text-xl font-bold text-indigo-600 font-heading">{formatCurrency(result.parent2Support)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Quick Tips */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-4">
        <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Scale size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 font-heading text-lg">Legal Precision</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">Mapped exactly to the new 2026 Washington State Economic Tables and statutory updates.</p>
        </div>

        <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-100 transition-all group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <Shield size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 font-heading text-lg">Privacy First</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">No calculation data is stored. All processing remains local in your browser session for 100% privacy.</p>
        </div>

        <div className="p-10 bg-gray-900 rounded-2xl shadow-lg shadow-gray-200 transition-all text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
          <div className="w-12 h-12 bg-gray-800 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
            <Calculator size={24} />
          </div>
          <h3 className="font-bold mb-3 font-heading text-lg">Worksheet Pro Wizard</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.</p>
          <Link href="/worksheet" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest bg-white text-gray-900 px-6 py-4 rounded-xl hover:bg-indigo-50 transition-all active:scale-[0.98]">
            Launch Wizard
            <ChevronRight size={14} className="text-indigo-600" />
          </Link>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Scale, Shield, Calculator, ChevronRight, CheckCircle, AlertCircle, Info, Download, ArrowRight } from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (latest) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(latest)
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function HomeCalculator() {
  // Core Inputs
  const [parent1Income, setParent1Income] = useState("");
  const [parent2Income, setParent2Income] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [incomeType, setIncomeType] = useState("monthly");
  const [payingParent, setPayingParent] = useState("P1");
  const [parentingTime, setParentingTime] = useState(0);

  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    const p1 = parseFloat(parent1Income) || 0;
    const p2 = parseFloat(parent2Income) || 0;

    if (p1 === 0 && p2 === 0) {
      setError("Please enter income to see results.");
      setResult(null);
      return;
    }

    setError("");

    const calcResult = calculateChildSupport({
      "1a": { p1, p2 },
      "5_children": { p1: childrenCount },
      "incomeType": { p1: incomeType },
      "payingParent": { p1: payingParent },
      "parentingTime": { p1: parentingTime },
      "otherChildren": { p1: 0 },
      "healthInsurance": { p1: 0 },
      "daycare": { p1: 0 }
    });

    setResult(calcResult);
  }, [parent1Income, parent2Income, childrenCount, incomeType, payingParent, parentingTime]);

  // Live calculation with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 400);
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  return (
    <div className="w-full">
      {/* SaaS Dashboard Layout - ONLY FOR CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">

        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card-standard !p-6 md:!p-10 shadow-xl border-indigo-50/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-heading leading-tight">Income Estimator</h2>
                <p className="text-sm text-muted">Enter monthly figures for both parents</p>
              </div>
            </div>

            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col text-left">
                  <label htmlFor="income-type" className="mb-2 label-metadata">Income Cycle</label>
                  <select
                    id="income-type"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="input-standard w-full"
                  >
                    <option value="monthly">Monthly Net</option>
                    <option value="yearly">Yearly Net</option>
                  </select>
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="children-count" className="mb-2 label-metadata">Number of Children</label>
                  <select
                    id="children-count"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="input-standard w-full"
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex flex-col text-left">
                  <label htmlFor="parent1-income" className="mb-2 label-metadata !text-indigo-600">Parent 1 Net Income</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading opacity-40">$</span>
                    <input
                      type="number"
                      id="parent1-income"
                      value={parent1Income}
                      onChange={(e) => setParent1Income(e.target.value)}
                      placeholder="0.00"
                      className="input-standard w-full pl-8 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="parent2-income" className="mb-2 label-metadata !text-purple-600">Parent 2 Net Income</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading opacity-40">$</span>
                    <input
                      type="number"
                      id="parent2-income"
                      value={parent2Income}
                      onChange={(e) => setParent2Income(e.target.value)}
                      placeholder="0.00"
                      className="input-standard w-full pl-8 focus:ring-4 focus:ring-purple-500/10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col text-left">
                  <label className="mb-4 label-metadata">Designated Payer</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPayingParent("P1")}
                      className={`h-14 px-5 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${payingParent === "P1" ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' : 'bg-white border-border-default text-body hover:border-gray-300'}`}
                    >
                      {payingParent === "P1" && <CheckCircle size={18} />}
                      Parent 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayingParent("P2")}
                      className={`h-14 px-5 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${payingParent === "P2" ? 'bg-purple-50 border-purple-600 text-purple-700 shadow-sm' : 'bg-white border-border-default text-body hover:border-gray-300'}`}
                    >
                      {payingParent === "P2" && <CheckCircle size={18} />}
                      Parent 2
                    </button>
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <label htmlFor="parenting-time" className="label-metadata block mb-1">Parenting Time Split</label>
                      <p className="text-xs text-muted">Overnight stays with Payer</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-indigo-600 leading-none">{parentingTime}%</span>
                    </div>
                  </div>

                  <input
                    id="parenting-time"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={parentingTime}
                    onChange={(e) => setParentingTime(Number(e.target.value))}
                    className="w-full h-2 mb-6 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600 appearance-none hover:accent-indigo-700 transition-all"
                  />

                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner border border-gray-200/50">
                    <motion.div
                      initial={false}
                      animate={{ width: `${parentingTime}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 relative group"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div className="flex-1 h-full bg-gray-100" />
                  </div>
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Paying Parent Time</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Custodial Time</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 animate-in fade-in zoom-in duration-200">
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card-standard border-dashed border-2 flex flex-col items-center justify-center py-20 px-10 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <Calculator size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading">Ready to calculate</h3>
                  <p className="text-sm text-muted">Enter income details to see your estimated support obligation and breakdown.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                ref={resultsRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-heading rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="label-metadata text-white/50 mb-6 tracking-[0.2em]">Estimated Monthly Transfer</h3>
                    <div className="text-5xl md:text-6xl font-bold text-white font-heading mb-8 tracking-tight">
                      <AnimatedNumber value={result.finalSupport} />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                      {result.ssrApplied && <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-500/30 flex items-center gap-1.5"><AlertCircle size={12} /> SSR Protection</span>}
                      {result.isLowIncome && <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/30 flex items-center gap-1.5"><Info size={12} /> Low Income Minimum</span>}
                      {result.is45PercentCapped && <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/30 flex items-center gap-1.5"><AlertCircle size={12} /> 45% Net Cap</span>}
                    </div>
                    <Link href="/worksheet" className="btn-primary !bg-white !text-heading hover:!bg-gray-100 !h-14 !px-8 !rounded-2xl group w-full sm:w-auto">
                      <span>Get Official PDF</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="card-standard !p-8 space-y-6 shadow-lg">
                  <h4 className="label-metadata text-heading font-bold border-b border-gray-100 pb-4">Calculation Breakdown</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-medium text-body">Combined Family Income</span>
                      <span className="font-bold text-heading"><AnimatedNumber value={result.combinedIncome} /></span>
                    </div>
                    <div className="py-2">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">P1: {Math.round(result.shareP1 * 100)}%</span>
                        <span className="text-[10px] font-bold text-purple-600 uppercase">P2: {Math.round(result.shareP2 * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP1 * 100}%` }} className="h-full bg-indigo-500" />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP2 * 100}%` }} className="h-full bg-purple-500" />
                      </div>
                    </div>
                    <div className="pt-4 space-y-4 border-t border-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-body">Base Support (Payer Share)</span>
                        <span className="font-bold text-heading"><AnimatedNumber value={result.breakdown.baseSupport} /></span>
                      </div>
                      {result.breakdown.parentingAdjustment !== 0 && (
                        <div className="flex justify-between items-center text-emerald-600">
                          <span className="text-sm font-medium">Parenting Time Credit</span>
                          <span className="font-bold"><AnimatedNumber value={result.breakdown.parentingAdjustment} /></span>
                        </div>
                      )}
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-heading">Presumptive Total</span>
                        <span className="text-xl font-bold text-indigo-600"><AnimatedNumber value={result.finalSupport} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* NON-CALCULATOR SECTIONS: CENTERED LAYOUT */}
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Comparison Table Section */}
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4 tracking-tight leading-tight">
              Why Legal Pros Trust WCSSC
            </h2>
            <p className="text-lg text-body leading-relaxed max-w-2xl mx-auto">
              Unlike generic calculators, WCSSC is engineered to the exact 2026 Washington statutory logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {[
                "Compliant with RCW 26.19 standards",
                "Includes Self-Support Reserve (SSR) logic",
                "Applies the 45% net income safety cap",
                "Live updates as you adjust inputs"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} />
                  </div>
                  <span className="font-medium text-heading">{text}</span>
                </div>
              ))}
            </div>

            <div className="table-container shadow-2xl ring-1 ring-gray-200">
              <div className="p-6 border-b border-border-default bg-gray-50/50">
                <h3 className="label-metadata text-heading">Feature Comparison</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Detailed Calculation Breakdown</caption>
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="table-header">Engine Logic</th>
                    <th className="table-header text-center">WCSSC</th>
                    <th className="table-header text-center">Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: "2026 SSR Protection", wcssc: true },
                    { name: "45% Net Income Cap", wcssc: true },
                    { name: "Parenting Credit", wcssc: true },
                    { name: "RCW 26.19 Compliant", wcssc: true },
                  ].map((row, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell font-semibold text-body text-sm">{row.name}</td>
                      <td className="table-cell text-center"><CheckCircle size={18} className="mx-auto text-indigo-600" /></td>
                      <td className="table-cell text-center"><div className="w-4 h-1 bg-gray-200 mx-auto rounded-full" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-interactive group bg-white text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <Scale size={28} />
            </div>
            <h3 className="text-xl font-bold text-heading mb-4">Legal Precision</h3>
            <p className="text-body leading-relaxed text-sm">Mapped exactly to the new 2026 Washington State Economic Tables and statutory updates.</p>
          </div>

          <div className="card-interactive group bg-white text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-heading mb-4">Privacy First</h3>
            <p className="text-body leading-relaxed text-sm">No calculation data is stored. All processing remains local in your browser session for 100% privacy.</p>
          </div>

          <div className="card-interactive group bg-white text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
              <Calculator size={28} />
            </div>
            <h3 className="text-xl font-bold text-heading mb-4">Worksheet Wizard</h3>
            <p className="text-body leading-relaxed text-sm mb-8 flex-1">Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.</p>
            <Link href="/worksheet" className="btn-secondary w-full group-hover:border-purple-600 group-hover:text-purple-600">
              Launch Wizard
              <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-lg border-t border-indigo-100 shadow-[0_-10px_30px_rgba(99,102,241,0.15)]"
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
              <div>
                <span className="label-metadata !text-[9px] block">Estimated Support</span>
                <span className="text-2xl font-bold text-heading font-heading"><AnimatedNumber value={result.finalSupport} /></span>
              </div>
              <button
                onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary !h-12 !px-5 !text-sm flex-1"
              >
                View Breakdown
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

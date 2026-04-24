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

 // Advanced Options
 const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
 const [otherChildren, setOtherChildren] = useState(0);
 const [healthInsurance, setHealthInsurance] = useState("");
 const [daycare, setDaycare] = useState("");

 const [error, setError] = useState<string>("");
 const [isLoading] = useState(false);

 const [result, setResult] = useState<any>(null);

 const handleCalculate = useCallback(() => {
 const p1 = parseFloat(parent1Income) || 0;
 const p2 = parseFloat(parent2Income) || 0;

 if (p1 === 0 && p2 === 0) {
 setError("Please enter at least one parent's income to calculate.");
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
 "otherChildren": { p1: otherChildren },
 "healthInsurance": { p1: parseFloat(healthInsurance) || 0 },
 "daycare": { p1: parseFloat(daycare) || 0 }
 });

 setResult(calcResult);
 }, [parent1Income, parent2Income, childrenCount, incomeType, payingParent, parentingTime, otherChildren, healthInsurance, daycare]);

 // Live calculation with debounce
 useEffect(() => {
 const timer = setTimeout(() => {
 handleCalculate();
 }, 400);
 return () => clearTimeout(timer);
 }, [handleCalculate]);

 return (
 <>
 {/* Full Calculator UI Card */}
 <div className="w-full max-w-lg card-standard">
 <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>

 {/* Income Type Selector */}
 <div className="flex flex-col text-left">
 <label htmlFor="income-type" className="mb-3 label-metadata">
 Income Type
 </label>
 <select
 id="income-type"
 value={incomeType}
 onChange={(e) => setIncomeType(e.target.value)}
 className="input-standard w-full"
 >
 <option value="monthly">Monthly</option>
 <option value="yearly">Yearly</option>
 </select>
 </div>

 <div className="grid grid-cols-1 gap-6">
 <div className="flex flex-col text-left">
 <label htmlFor="parent1-income" className="mb-3 label-metadata">
 Parent 1 {incomeType === 'monthly' ? 'Monthly' : 'Yearly'} Net Income
 </label>
 <div className="relative group">
 <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading">$</span>
 <input
 type="number"
 id="parent1-income"
 value={parent1Income}
 onChange={(e) => setParent1Income(e.target.value)}
 placeholder="0.00"
 className={`input-standard w-full pl-8 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
 />
 </div>
 </div>

 <div className="flex flex-col text-left">
 <label htmlFor="parent2-income" className="mb-3 label-metadata">
 Parent 2 {incomeType === 'monthly' ? 'Monthly' : 'Yearly'} Net Income
 </label>
 <div className="relative group">
 <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading">$</span>
 <input
 type="number"
 id="parent2-income"
 value={parent2Income}
 onChange={(e) => setParent2Income(e.target.value)}
 placeholder="0.00"
 className={`input-standard w-full pl-8 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
 />
 </div>
 {error && <p className="text-red-500 label-metadata mt-3 animate-pulse">{error}</p>}
 </div>
 </div>

 <div className="flex flex-col text-left">
 <label htmlFor="children-count" className="mb-3 label-metadata">
 Number of Children
 </label>
 <div className="relative">
 <select
 id="children-count"
 value={childrenCount}
 onChange={(e) => setChildrenCount(Number(e.target.value))}
 className="input-standard w-full appearance-none"
 >
 <option value="1">1 Child</option>
 <option value="2">2 Children</option>
 <option value="3">3 Children</option>
 <option value="4">4 Children</option>
 <option value="5">5 Children</option>
 </select>
 </div>
 </div>

 {/* Paying Parent Selector */}
 <div className="flex flex-col text-left">
 <label className="mb-3 label-metadata">
 Who is paying support?
 </label>
 <div className="grid grid-cols-2 gap-4">
 <button
 type="button"
 onClick={() => setPayingParent("P1")}
 className={`h-12 px-5 rounded-xl border font-bold transition-all ${payingParent === "P1" ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-border-default text-body hover:bg-gray-50'}`}
 >
 Parent 1
 </button>
 <button
 type="button"
 onClick={() => setPayingParent("P2")}
 className={`h-12 px-5 rounded-xl border font-bold transition-all ${payingParent === "P2" ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-border-default text-body hover:bg-gray-50'}`}
 >
 Parent 2
 </button>
 </div>
 </div>

 {/* Parenting Time Slider */}
 <div className="flex flex-col text-left">
 <div className="flex justify-between mb-3">
 <label htmlFor="parenting-time" className="label-metadata">
 Parenting Time (Paying Parent)
 </label>
 <div className="flex gap-4">
 <span className="label-metadata text-indigo-600 font-bold">Paying: {parentingTime}%</span>
 <span className="label-metadata text-gray-400">Other: {100 - parentingTime}%</span>
 </div>
 </div>

 <input
 id="parenting-time"
 type="range"
 min="0"
 max="100"
 value={parentingTime}
 onChange={(e) => setParentingTime(Number(e.target.value))}
 className="w-full h-1.5 mb-4 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600"
 />

 <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
 <div
 className="h-full bg-indigo-500 transition-all duration-300"
 style={{ width: `${parentingTime}%` }}
 />
 </div>

 <div className="space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
 <p className="text-sm text-body leading-snug">
 Enter the percentage of time the paying parent spends with the children.
 </p>
 <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
 Hint: Most cases fall between 20%–40%
 </p>
 </div>
 </div>

 {/* Advanced Options Collapsible */}
 <div className="flex flex-col">
 <button
 type="button"
 onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
 className="flex items-center justify-between py-2 label-metadata text-heading hover:text-indigo-600 transition-colors"
 >
 Advanced Options
 {isAdvancedOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
 </button>

 {isAdvancedOpen && (
 <div className="mt-4 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
 <div className="flex flex-col text-left">
 <label htmlFor="other-children" className="mb-3 label-metadata">
 Other Children (outside this case)
 </label>
 <select
 id="other-children"
 value={otherChildren}
 onChange={(e) => setOtherChildren(Number(e.target.value))}
 className="input-standard w-full appearance-none"
 >
 {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
 </select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col text-left">
 <label htmlFor="health-insurance" className="mb-3 label-metadata">
 Health Insurance ($)
 </label>
 <input
 id="health-insurance"
 type="number"
 value={healthInsurance}
 onChange={(e) => setHealthInsurance(e.target.value)}
 placeholder="0"
 className="input-standard w-full"
 />
 </div>
 <div className="flex flex-col text-left">
 <label htmlFor="daycare" className="mb-3 label-metadata">
 Daycare ($)
 </label>
 <input
 id="daycare"
 type="number"
 value={daycare}
 onChange={(e) => setDaycare(e.target.value)}
 placeholder="0"
 className="input-standard w-full"
 />
 </div>
 </div>
 </div>
 )}
 </div>

 <button
 type="submit"
 disabled={isLoading}
 className="btn-primary w-full shadow-lg"
 >
 {isLoading ? "Calculating..." : "Calculate Presumptive Support"}
 </button>

 <div aria-live="polite" aria-atomic="true">
 {result !== null && (
 <div className="mt-8 stack-space animate-in fade-in slide-in-from-bottom-3 duration-500">
 <div className="bg-heading rounded-2xl p-8 text-center relative overflow-hidden shadow-xl">
 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
 <h3 className="label-metadata text-white/40 mb-4">
 Final Estimate (You Pay)
 </h3>

 <div className="text-center relative z-10">
 {result.status === "SUCCESS" ? (
 <>
 <div className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
 <AnimatedNumber value={result.finalSupport} />
 </div>

 <div className="flex flex-col items-center gap-3 mb-8">
 {result.ssrApplied && (
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-200 label-metadata rounded-full border border-indigo-500/30">
 <AlertCircle size={12} />
 Protected by Self-Support Reserve
 </span>
 )}
 {result.is45PercentCapped && (
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-200 label-metadata rounded-full border border-amber-500/30">
 <AlertCircle size={12} />
 Washington 45% Net Income Cap
 </span>
 )}
 </div>
 </>
 ) : (
 <div className="mb-8">
 <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
 <AlertCircle size={24} />
 <span className="font-bold uppercase tracking-wider text-xs">Manual Review Required</span>
 </div>
 <p className="text-white text-lg font-medium leading-tight">
 {result.adjustmentReason || "Judicial determination required"}
 </p>
 <p className="text-white/60 text-xs mt-3 max-w-xs mx-auto">
 Standard table calculations do not apply to this financial scenario. A judge must determine the final obligation.
 </p>
 </div>
 )}

 <div className="mt-4">
 <Link
 href="/worksheet"
 className="btn-primary !bg-white !text-heading hover:!bg-gray-100 !h-12 !px-6"
 >
 <Download size={14} className="text-indigo-600" />
 Download Court Worksheet (PDF)
 </Link>
 </div>
 </div>
 <p className="text-xs text-gray-500 mt-4 text-center px-4">
 Parenting time adjustments may affect final support amounts under Washington guidelines.
 </p>
 </div>

 <div className="stack-space pt-8 border-t border-border-default">
 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Combined Net Income</span>
 <span className="font-bold text-heading">
 <AnimatedNumber value={result.combinedIncome} />
 </span>
 </div>

 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Parent 1 Share (%)</span>
 <span className="font-bold text-heading">
 {Math.round(result.shareP1 * 100)}%
 </span>
 </div>

 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Parent 2 Share (%)</span>
 <span className="font-bold text-heading">
 {Math.round(result.shareP2 * 100)}%
 </span>
 </div>

 <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
 <span className="font-medium text-body">Base Support</span>
 <span className="font-bold text-heading">
 <AnimatedNumber value={result.breakdown.baseSupport} />
 </span>
 </div>

 {result.breakdown.otherChildrenAdjustment !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Other Children Adj.</span>
 <span className="font-bold text-emerald-600">
 <AnimatedNumber value={result.breakdown.otherChildrenAdjustment} />
 </span>
 </div>
 )}

 {result.breakdown.parentingAdjustment !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Parenting Adjustment</span>
 <span className="font-bold text-emerald-600">
 <AnimatedNumber value={result.breakdown.parentingAdjustment} />
 </span>
 </div>
 )}

 {result.breakdown.extraCosts !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium text-body">Extra Costs</span>
 <span className="font-bold text-heading">
 +<AnimatedNumber value={result.breakdown.extraCosts} />
 </span>
 </div>
 )}

 <div className="mt-10 pt-10 border-t border-border-default">
 <h4 className="label-metadata text-heading font-semibold mb-6">
 What This Means
 </h4>
 <ul className="space-y-4">
 {result.ssrApplied ? (
 <>
 <li className="flex items-start gap-4 text-sm text-body leading-relaxed">
 <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
 Your income is below the protected threshold (Self-Support Reserve).
 </li>
 <li className="flex items-start gap-4 text-sm text-body leading-relaxed">
 <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
 The court limits your payment to ensure you can support yourself.
 </li>
 </>
 ) : (
 <>
 <li className="flex items-start gap-4 text-sm text-body leading-relaxed">
 <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
 Based on your proportional share of the combined family income.
 </li>
 <li className="flex items-start gap-4 text-sm text-body leading-relaxed">
 <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
 Parenting time and other child obligations have been applied.
 </li>
 </>
 )}
 <li className="flex items-start gap-4 text-sm text-muted italic leading-relaxed">
 <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-gray-200" />
 This is an estimate only — a judge has final discretion on all orders.
 </li>
 </ul>
 </div>

 <div className="mt-8 pt-8 border-t border-gray-100">
 <p className="label-metadata text-center italic">
 This estimate follows Washington State child support guidelines (RCW 26.19).
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 </form>
 </div>

 {/* Comparison Table Section */}
 <div className="mt-20 w-full max-w-lg mx-auto">
 <div className="table-container shadow-sm overflow-hidden">
 <div className="p-6 border-b border-border-default bg-gray-50/50">
 <h3 className="label-metadata text-heading">
 Why Our Calculator is More Accurate
 </h3>
 </div>
 <table className="w-full text-left border-collapse"><caption className="sr-only">Detailed Calculation Breakdown</caption>
 <thead>
 <tr className="border-b border-border-default">
 <th className="table-header">Feature</th>
 <th className="table-header text-center">WCSSC</th>
 <th className="table-header text-center">Others</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {[
 { name: "2026 SSR Protection", wcssc: true, others: false },
 { name: "45% Net Income Cap", wcssc: true, others: false },
 { name: "Parenting Adjustment", wcssc: true, others: false },
 { name: "Expense Adjustments", wcssc: true, others: false },
 ].map((row, i) => (
 <tr key={i} className="table-row">
 <td className="table-cell font-semibold text-body">{row.name}</td>
 <td className="table-cell text-center">
 <CheckCircle size={18} className="mx-auto text-indigo-600" />
 </td>
 <td className="table-cell text-center">
 <div className="w-4 h-1 bg-gray-200 mx-auto rounded-full" />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 <div className="p-4 bg-indigo-50/30 border-t border-indigo-100 text-center">
 <span className="label-metadata text-indigo-600">
 Official Washington State RCW 26.19 Compliant
 </span>
 </div>
 </div>

 <p className="mt-8 label-metadata text-center leading-relaxed">
 This calculator follows Washington State guidelines (RCW 26.19). <br />
 It is for estimation purposes only and does not constitute legal advice.
 </p>
 </div>

 {/* Quick Tips / Feature Cards */}
 <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 container-wide">
 <div className="card-interactive group">
 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
 <Scale size={28} />
 </div>
 <h3 className="text-xl font-bold text-heading mb-4">Legal Precision</h3>
 <p className="text-body leading-relaxed">Mapped exactly to the new 2026 Washington State Economic Tables and statutory updates.</p>
 </div>

 <div className="card-interactive group">
 <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
 <Shield size={28} />
 </div>
 <h3 className="text-xl font-bold text-heading mb-4">Privacy First</h3>
 <p className="text-body leading-relaxed">No calculation data is stored. All processing remains local in your browser session for 100% privacy.</p>
 </div>

 <div className="card-interactive group flex flex-col">
 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
 <Calculator size={28} />
 </div>
 <h3 className="text-xl font-bold text-heading mb-4">Worksheet Pro Wizard</h3>
 <p className="text-body leading-relaxed mb-8 flex-1">Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.</p>
 <div className="btn-secondary w-full group-hover:border-indigo-600 group-hover:text-indigo-600">
 Launch Wizard
 <ChevronRight size={14} className="ml-1" />
 </div>
 </div>
 </div>
 </>
 );

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
      // Advanced options removed as per user request for SaaS feel on home page
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
      {/* SaaS Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: INPUTS (lg:col-span-7) */}
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
              {/* Income Type & Children Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col text-left">
                  <label htmlFor="income-type" className="mb-2 label-metadata">
                    Income Cycle
                  </label>
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
                  <label htmlFor="children-count" className="mb-2 label-metadata">
                    Number of Children
                  </label>
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

              {/* Incomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex flex-col text-left">
                  <label htmlFor="parent1-income" className="mb-2 label-metadata !text-indigo-600">
                    Parent 1 Net Income
                  </label>
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
                  <label htmlFor="parent2-income" className="mb-2 label-metadata !text-purple-600">
                    Parent 2 Net Income
                  </label>
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

              {/* Payer & Parenting Time */}
              <div className="space-y-8">
                <div className="flex flex-col text-left">
                  <label className="mb-4 label-metadata">
                    Designated Payer
                  </label>
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
                      <label htmlFor="parenting-time" className="label-metadata block mb-1">
                        Parenting Time Split
                      </label>
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

                  {/* Proportional Split Visualizer */}
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

        {/* RIGHT COLUMN: RESULTS (lg:col-span-5) */}
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
                {/* Main Result Card */}
                <div className="bg-heading rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="label-metadata text-white/50 mb-6 tracking-[0.2em]">
                      Estimated Monthly Transfer
                    </h3>

                    <div className="text-5xl md:text-6xl font-bold text-white font-heading mb-8 tracking-tight">
                      <AnimatedNumber value={result.finalSupport} />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                      {result.ssrApplied && (
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                          <AlertCircle size={12} /> SSR Protection
                        </span>
                      )}
                      {result.isLowIncome && (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                          <Info size={12} /> Low Income Minimum
                        </span>
                      )}
                      {result.is45PercentCapped && (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/30 flex items-center gap-1.5">
                          <AlertCircle size={12} /> 45% Net Cap
                        </span>
                      )}
                    </div>

                    <Link
                      href="/worksheet"
                      className="btn-primary !bg-white !text-heading hover:!bg-gray-100 !h-14 !px-8 !rounded-2xl group w-full sm:w-auto"
                    >
                      <span>Get Official PDF</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Breakdown Details */}
                <div className="card-standard !p-8 space-y-6 shadow-lg">
                  <h4 className="label-metadata text-heading font-bold border-b border-gray-100 pb-4">Calculation Breakdown</h4>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-medium text-body flex items-center gap-2">
                        Combined Family Income
                      </span>
                      <span className="font-bold text-heading">
                        <AnimatedNumber value={result.combinedIncome} />
                      </span>
                    </div>

                    {/* Proportional Split Bar */}
                    <div className="py-2">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">P1: {Math.round(result.shareP1 * 100)}%</span>
                        <span className="text-[10px] font-bold text-purple-600 uppercase">P2: {Math.round(result.shareP2 * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.shareP1 * 100}%` }}
                          className="h-full bg-indigo-500"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.shareP2 * 100}%` }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 space-y-4 border-t border-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-body">Base Support (Payer Share)</span>
                        <span className="font-bold text-heading">
                          <AnimatedNumber value={result.breakdown.baseSupport} />
                        </span>
                      </div>

                      {result.breakdown.parentingAdjustment !== 0 && (
                        <div className="flex justify-between items-center text-emerald-600">
                          <span className="text-sm font-medium flex items-center gap-2">
                            Parenting Time Credit
                          </span>
                          <span className="font-bold">
                            <AnimatedNumber value={result.breakdown.parentingAdjustment} />
                          </span>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-heading">Presumptive Total</span>
                        <span className="text-xl font-bold text-indigo-600">
                          <AnimatedNumber value={result.finalSupport} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-100">
                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                      <p className="text-xs leading-relaxed text-indigo-900/70 font-medium">
                        <strong>Note:</strong> This is an estimation based on the 2026 economic table. Judicial discretion and extraordinary expenses like healthcare may alter the final court order.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE STICKY RESULT BAR */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-lg border-t border-indigo-100 shadow-[0_-10px_30px_rgba(99,102,241,0.15)]"
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
              <div>
                <span className="label-metadata !text-[9px] block">Estimated Support</span>
                <span className="text-2xl font-bold text-heading font-heading">
                  <AnimatedNumber value={result.finalSupport} />
                </span>
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

      {/* BOTTOM SECTION: Comparison Table Section */}
      <div className="mt-20 lg:mt-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-heading mb-6 tracking-tight leading-tight">
              Why Legal Pros Trust WCSSC
            </h2>
            <p className="text-lg text-body mb-8 leading-relaxed">
              Unlike generic calculators, WCSSC is engineered to the exact 2026 Washington statutory logic, ensuring you don&apos;t overpay or under-calculate your rights.
            </p>
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
          </div>

          <div className="table-container shadow-2xl ring-1 ring-gray-200">
            <div className="p-6 border-b border-border-default bg-gray-50/50">
              <h3 className="label-metadata text-heading">
                Feature Comparison
              </h3>
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
                    <td className="table-cell text-center">
                      <CheckCircle size={18} className="mx-auto text-indigo-600" />
                    </td>
                    <td className="table-cell text-center">
                      <div className="w-4 h-1 bg-gray-200 mx-auto rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Tips / Feature Cards */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-interactive group bg-white">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <Scale size={28} />
          </div>
          <h3 className="text-xl font-bold text-heading mb-4">Legal Precision</h3>
          <p className="text-body leading-relaxed text-sm">Mapped exactly to the new 2026 Washington State Economic Tables and statutory updates.</p>
        </div>

        <div className="card-interactive group bg-white">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <Shield size={28} />
          </div>
          <h3 className="text-xl font-bold text-heading mb-4">Privacy First</h3>
          <p className="text-body leading-relaxed text-sm">No calculation data is stored. All processing remains local in your browser session for 100% privacy.</p>
        </div>

        <div className="card-interactive group flex flex-col bg-white">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
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
  );
}

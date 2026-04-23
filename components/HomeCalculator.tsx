"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Scale, Shield, Calculator, ChevronRight, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Info, Download } from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { motion, useSpring, useTransform } from "framer-motion";

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
 const [parentingTime, setParentingTime] = useState(20);

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
 <span className="label-metadata text-indigo-600">{parentingTime}%</span>
 </div>

 <div className="flex gap-2 mb-4">
 {[10, 20, 30, 40, 50].map((val) => (
 <button
 key={val}
 type="button"
 onClick={() => setParentingTime(val)}
 className={`flex-1 py-2 label-metadata rounded-lg border transition-all ${parentingTime === val ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-border-default text-body hover:bg-gray-50'}`}
 >
 {val}%
 </button>
 ))}
 </div>

 <input
 id="parenting-time"
 type="range"
 min="0"
 max="50"
 value={parentingTime}
 onChange={(e) => setParentingTime(Number(e.target.value))}
 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
 />
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
 {result.isLowIncome && (
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-200 label-metadata rounded-full border border-emerald-500/30">
 <Info size={12} />
 Minimum Support Applied ($50/child)
 </span>
 )}
 {result.is45PercentCapped && (
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-200 label-metadata rounded-full border border-amber-500/30">
 <AlertCircle size={12} />
 Washington 45% Net Income Cap
 </span>
 )}
 </div>

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
}

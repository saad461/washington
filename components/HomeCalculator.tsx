"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
 const [isLoading, setIsLoading] = useState(false);

 const [result, setResult] = useState<any>(null);

 const handleCalculate = useCallback(() => {
 const p1 = parseFloat(parent1Income) || 0;
 const p2 = parseFloat(parent2Income) || 0;

 if (p1 === 0 && p2 === 0) {
 setResult(null);
 return;
 }

 setError("");
 // We don't set result to null here to allow smooth transitions

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

 const formatCurrency = (val: number) =>
 new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

 return (
 <>
 {/* Full Calculator UI Card */}
 <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-6 font-sans">
 <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>

 {/* Income Type Selector */}
 <div className="flex flex-col text-left">
 <label htmlFor="income-type" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Income Type
 </label>
 <select
 id="income-type"
 value={incomeType}
 onChange={(e) => setIncomeType(e.target.value)}
 className="w-full h-14 px-4 appearance-none rounded-xl border border-gray-200 bg-gray-50/50 text-lg font-medium transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600"
 >
 <option value="monthly">Monthly</option>
 <option value="yearly">Yearly</option>
 </select>
 </div>

 <div className="grid grid-cols-1 gap-6">
 <div className="flex flex-col text-left">
 <label htmlFor="parent1-income" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Parent 1 {incomeType === 'monthly' ? 'Monthly' : 'Yearly'} Net Income
 </label>
 <div className="relative group">
 <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-medium group-focus-within: transition-colors">$</span>
 <input
 type="number"
 id="parent1-income"
 value={parent1Income}
 onChange={(e) => setParent1Income(e.target.value)}
 placeholder="0.00"
 className={`w-full h-14 pl-8 pr-4 rounded-xl border ${error ? 'border-red-200 bg-red-50 focus:ring-red-500/5 focus:border-red-500' : 'border-gray-200 bg-gray-50/50 focus:ring-indigo-500/5 focus:border-indigo-600'} text-xl font-medium transition-all focus:bg-white focus:outline-none`}
 />
 </div>
 </div>

 <div className="flex flex-col text-left">
 <label htmlFor="parent2-income" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Parent 2 {incomeType === 'monthly' ? 'Monthly' : 'Yearly'} Net Income
 </label>
 <div className="relative group">
 <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-medium group-focus-within: transition-colors">$</span>
 <input
 type="number"
 id="parent2-income"
 value={parent2Income}
 onChange={(e) => setParent2Income(e.target.value)}
 placeholder="0.00"
 className={`w-full h-14 pl-8 pr-4 rounded-xl border ${error ? 'border-red-200 bg-red-50 focus:ring-red-500/5 focus:border-red-500' : 'border-gray-200 bg-gray-50/50 focus:ring-indigo-500/5 focus:border-indigo-600'} text-xl font-medium transition-all focus:bg-white focus:outline-none`}
 />
 </div>
 {error && <p className="text-red-500 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mt-3 animate-pulse">{error}</p>}
 </div>
 </div>

 <div className="flex flex-col text-left">
 <label htmlFor="children-count" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Number of Children
 </label>
 <div className="relative">
 <select
 id="children-count"
 value={childrenCount}
 onChange={(e) => setChildrenCount(Number(e.target.value))}
 className="w-full h-14 px-4 appearance-none rounded-xl border border-gray-200 bg-gray-50/50 text-lg font-medium transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600"
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
 <label className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Who is paying support?
 </label>
 <div className="grid grid-cols-2 gap-4">
 <button
 type="button"
 onClick={() => setPayingParent("P1")}
 className={`h-12 rounded-xl border font-medium text-sm transition-all ${payingParent === "P1" ? 'bg-gray-900 border-gray-900 text-white shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-indigo-200'}`}
 >
 Parent 1
 </button>
 <button
 type="button"
 onClick={() => setPayingParent("P2")}
 className={`h-12 rounded-xl border font-medium text-sm transition-all ${payingParent === "P2" ? 'bg-gray-900 border-gray-900 text-white shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-indigo-200'}`}
 >
 Parent 2
 </button>
 </div>
 </div>

 {/* Parenting Time Slider */}
 <div className="flex flex-col text-left">
 <div className="flex justify-between mb-3">
 <label htmlFor="parenting-time" className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Parenting Time (Paying Parent)
 </label>
 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">{parentingTime}%</span>
 </div>

 <div className="flex gap-2 mb-4">
 {[10, 20, 30, 40, 50].map((val) => (
 <button
 key={val}
 type="button"
 onClick={() => setParentingTime(val)}
 className={`flex-1 py-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold rounded-lg border transition-all ${parentingTime === val ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-gray-100 hover:border-indigo-200'}`}
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
 className="flex items-center justify-between py-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase hover: transition-colors"
 >
 Advanced Options
 {isAdvancedOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
 </button>

 {isAdvancedOpen && (
 <div className="mt-4 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
 <div className="flex flex-col text-left">
 <label htmlFor="other-children" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Other Children (outside this case)
 </label>
 <select
 id="other-children"
 value={otherChildren}
 onChange={(e) => setOtherChildren(Number(e.target.value))}
 className="w-full h-12 px-4 appearance-none rounded-xl border border-gray-200 bg-gray-50/50 font-medium transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600"
 >
 {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
 </select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col text-left">
 <label htmlFor="health-insurance" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Health Insurance ($)
 </label>
 <input
 id="health-insurance"
 type="number"
 value={healthInsurance}
 onChange={(e) => setHealthInsurance(e.target.value)}
 placeholder="0"
 className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 font-medium transition-all focus:bg-white focus:outline-none"
 />
 </div>
 <div className="flex flex-col text-left">
 <label htmlFor="daycare" className="mb-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">
 Daycare ($)
 </label>
 <input
 id="daycare"
 type="number"
 value={daycare}
 onChange={(e) => setDaycare(e.target.value)}
 placeholder="0"
 className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 font-medium transition-all focus:bg-white focus:outline-none"
 />
 </div>
 </div>
 </div>
 )}
 </div>

 <button
 type="submit"
 disabled={isLoading}
 className={`w-full bg-gray-900 text-white rounded-xl h-14 font-medium text-sm uppercase transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100 active:scale-[0.98]'}`}
 >
 {isLoading ? "Calculating..." : "Calculate Presumptive Support"}
 </button>

 <div aria-live="polite" aria-atomic="true">
 {result !== null && (
 <div className="mt-4 p-6 bg-gray-50 border border-gray-100 rounded-xl animate-in fade-in slide-in-from-bottom-3 duration-500">
 <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-semibold uppercase mb-6 text-center">
 Final Estimate (You Pay)
 </h3>

 <div className="text-center mb-8">
 <p className="text-3xl md:text-4xl font-medium font-heading mb-2">
 <AnimatedNumber value={result.finalSupport} />
 </p>

 <div className="mt-6 mb-2">
 <Link
 href="/worksheet"
 className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-gray-900 text-white text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98] shadow-sm shadow-gray-200"
 >
 <Download size={14} className="text-indigo-400" />
 Download Full Court Worksheet (PDF)
 </Link>
 </div>
 <div className="flex flex-col items-center gap-2 mt-4">
 {result.ssrApplied && (
 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase rounded-full border border-amber-100">
 <AlertCircle size={12} />
 Protected by Self-Support Reserve
 </span>
 )}
 {result.isLowIncome && (
 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase rounded-full border border-blue-100">
 <Info size={12} />
 Minimum Support Rule Applied ($50/child)
 </span>
 )}
 {result.is45PercentCapped && (
 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase rounded-full border border-red-100">
 <AlertCircle size={12} />
 Limited by Washington 45% Net Income Rule
 </span>
 )}
 </div>
 </div>

 <div className="space-y-6 text-sm pt-6 border-t border-gray-200">
 <div className="flex justify-between items-center">
 <span className="font-medium ">Combined Net Income</span>
 <span className="font-medium ">
 <AnimatedNumber value={result.combinedIncome} />
 </span>
 </div>

 <div className="flex justify-between items-center">
 <span className="font-medium ">Parent 1 Share (%)</span>
 <span className="font-medium ">
 {Math.round(result.shareP1 * 100)}%
 </span>
 </div>

 <div className="flex justify-between items-center">
 <span className="font-medium ">Parent 2 Share (%)</span>
 <span className="font-medium ">
 {Math.round(result.shareP2 * 100)}%
 </span>
 </div>

 <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
 <span className="font-medium ">Base Support</span>
 <span className="font-medium ">
 <AnimatedNumber value={result.breakdown.baseSupport} />
 </span>
 </div>

 {result.breakdown.otherChildrenAdjustment !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium ">Other Children Adj.</span>
 <span className="font-medium text-emerald-500">
 <AnimatedNumber value={result.breakdown.otherChildrenAdjustment} />
 </span>
 </div>
 )}

 {result.breakdown.parentingAdjustment !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium ">Parenting Adjustment</span>
 <span className="font-medium text-emerald-500">
 <AnimatedNumber value={result.breakdown.parentingAdjustment} />
 </span>
 </div>
 )}

 {result.breakdown.extraCosts !== 0 && (
 <div className="flex justify-between items-center">
 <span className="font-medium ">Extra Costs</span>
 <span className="font-medium ">
 +<AnimatedNumber value={result.breakdown.extraCosts} />
 </span>
 </div>
 )}

 <div className="mt-8 pt-8 border-t border-gray-200">
 <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-semibold uppercase mb-4">
 What This Means
 </h4>
 <ul className="space-y-3">
 {result.ssrApplied ? (
 <>
 <li className="flex items-start gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed">
 <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
 Your income is below the protected threshold (Self-Support Reserve).
 </li>
 <li className="flex items-start gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed">
 <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
 The court limits your payment to ensure you can support yourself.
 </li>
 </>
 ) : (
 <>
 <li className="flex items-start gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed">
 <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
 Based on your proportional share of the combined family income.
 </li>
 <li className="flex items-start gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed">
 <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
 Parenting time and other child obligations have been applied.
 </li>
 </>
 )}
 <li className="flex items-start gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed">
 <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-300" />
 This is an estimate only — a judge has final discretion on all orders.
 </li>
 </ul>
 </div>

 <div className="mt-6 pt-6 border-t border-gray-100">
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-relaxed font-medium text-center italic">
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
 <div className="mt-24 w-full max-w-lg mx-auto">
 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
 <div className="p-6 border-b border-gray-50 bg-gray-50/50">
 <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-semibold uppercase ">
 Why Our Calculator is More Accurate
 </h3>
 </div>
 <table className="w-full text-left border border-gray-100 rounded-xl overflow-hidden"><caption className="sr-only">Detailed Calculation Breakdown</caption>
 <thead>
 <tr className="border-b border-gray-50">
 <th className="px-6 py-3 min-h-[48px] text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">Feature</th>
 <th className="px-6 py-3 min-h-[48px] text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase text-center">WCSSC</th>
 <th className="px-6 py-3 min-h-[48px] text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase text-center">Others</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50">
 {[
 { name: "2026 SSR Protection", wcssc: true, others: false },
 { name: "45% Net Income Cap", wcssc: true, others: false },
 { name: "Parenting Adjustment", wcssc: true, others: false },
 { name: "Expense Adjustments", wcssc: true, others: false },
 ].map((row, i) => (
 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
 <td className="px-6 py-3 min-h-[48px] text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold ">{row.name}</td>
 <td className="px-6 py-3 min-h-[48px] text-center">
 <CheckCircle size={16} className=" mx-auto" />
 </td>
 <td className="px-6 py-3 min-h-[48px] text-center">
 <div className="w-4 h-0.5 bg-gray-200 mx-auto rounded-full" />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 <div className="p-4 bg-indigo-50/30 border-t border-indigo-50">
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-medium text-center uppercase ">
 Official Washington State RCW 26.19 Compliant
 </p>
 </div>
 </div>

 <p className="mt-8 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-medium text-center leading-relaxed">
 This calculator follows Washington State guidelines (RCW 26.19). <br />
 It is for estimation purposes only and does not constitute legal advice.
 </p>
 </div>

 {/* Quick Tips */}
 <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4">
 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all group">
 <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
 <Scale size={24} />
 </div>
 <h3 className="font-semibold mb-3 font-heading text-lg">Legal Precision</h3>
 <p className="text-sm leading-relaxed font-medium">Mapped exactly to the new 2026 Washington State Economic Tables and statutory updates.</p>
 </div>

 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all group">
 <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
 <Shield size={24} />
 </div>
 <h3 className="font-semibold mb-3 font-heading text-lg">Privacy First</h3>
 <p className="text-sm leading-relaxed font-medium">No calculation data is stored. All processing remains local in your browser session for 100% privacy.</p>
 </div>

 <div className="p-6 bg-gray-900 rounded-2xl shadow-sm shadow-gray-200 transition-all text-white relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
 <div className="w-12 h-12 bg-gray-800 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
 <Calculator size={24} />
 </div>
 <h3 className="font-semibold mb-3 font-heading text-lg">Worksheet Pro Wizard</h3>
 <p className="text-sm leading-relaxed mb-8">Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.</p>
 <Link href="/worksheet" className="inline-flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase bg-white px-6 py-3 min-h-[48px] rounded-xl hover:bg-indigo-50 transition-all active:scale-[0.98]">
 Launch Wizard
 <ChevronRight size={14}  />
 </Link>
 </div>
 </div>
 </>
 );
}

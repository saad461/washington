"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator,
  ChevronRight, ChevronDown, CheckCircle, AlertCircle, Info, ArrowRight, Printer,
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import ParentingTimeSelector from "@/components/calculator/ParentingTimeSelector";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import HeroCard from "@/components/hero/HeroCard";
import PrintReport from "@/components/calculator/PrintReport";
import IncomeHelper from "@/components/calculator/IncomeHelper";
import AttorneyCTA from "@/components/calculator/AttorneyCTA";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";
import HistoryPanel from "@/components/calculator/HistoryPanel";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/* ─── Animated currency number ─── */
function AnimatedNumber({ value }: { value: number }) {
  const spring  = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (latest) =>
    new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", maximumFractionDigits: 0,
    }).format(latest)
  );
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

/* ─── Shared toggle button styles ─── */
function toggleBtn(active: boolean) {
  const base = "h-11 sm:h-12 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm select-none w-full";
  if (active) return `${base} bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-card)]`;
  return `${base} bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-text-disabled)]`;
}

/* ─── Sanitize numeric input ─── */
function sanitizeIncome(raw: string): string {
  if (raw === "" || raw === "-") return "";
  const n = parseFloat(raw);
  if (!isFinite(n) || n < 0) return "0";
  return raw;
}

interface HomeCalculatorProps {
  selectedCounty?: string;
  setSelectedCounty?: (county: string) => void;
}

export default function HomeCalculator({ selectedCounty = "", setSelectedCounty }: HomeCalculatorProps) {
  const [parent1Income,          setParent1Income]          = useState("");
  const [parent2Income,          setParent2Income]          = useState("");
  const [childrenCount,          setChildrenCount]          = useState(1);
  const [incomeType,             setIncomeType]             = useState("monthly");
  const [payingParent,           setPayingParent]           = useState("P1");
  const [parentingTime,          setParentingTime]          = useState(0);
  const [useParentingDeviation,  setUseParentingDeviation]  = useState(false);
  const [error,  setError]  = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateChildSupport> | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // What-If Sliders State
  const [whatIfP1, setWhatIfP1] = useState<number | null>(null);
  const [whatIfP2, setWhatIfP2] = useState<number | null>(null);

  const handleCalculate = useCallback(() => {
    const p1 = parseFloat(parent1Income) || 0;
    const p2 = parseFloat(parent2Income) || 0;
    if (p1 === 0 && p2 === 0) {
      setError("Please enter income for at least one parent.");
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateChildSupport({
      "1a":                   { p1, p2 },
      "5_children":           { p1: childrenCount },
      "incomeType":           { p1: incomeType },
      "payingParent":         { p1: payingParent },
      "parentingTime":        { p1: parentingTime },
      "useParentingDeviation":{ p1: useParentingDeviation },
      "otherChildren":        { p1: 0 },
      "healthInsurance":      { p1: 0 },
      "daycare":              { p1: 0 },
    }));
  }, [
    parent1Income, parent2Income, childrenCount,
    incomeType, payingParent, parentingTime, useParentingDeviation,
  ]);

  useEffect(() => {
    const t = setTimeout(handleCalculate, 400);
    return () => clearTimeout(t);
  }, [handleCalculate]);

  // Sync what-if sliders with main inputs when result is first generated or inputs change
  useEffect(() => {
    if (result) {
      if (whatIfP1 === null) setWhatIfP1(parseFloat(parent1Income) || 0);
      if (whatIfP2 === null) setWhatIfP2(parseFloat(parent2Income) || 0);
    } else {
      setWhatIfP1(null);
      setWhatIfP2(null);
    }
  }, [result, parent1Income, parent2Income]);

  const whatIfResult = useMemo(() => {
    if (whatIfP1 === null || whatIfP2 === null) return null;
    return calculateChildSupport({
      "1a":                   { p1: whatIfP1, p2: whatIfP2 },
      "5_children":           { p1: childrenCount },
      "incomeType":           { p1: incomeType },
      "payingParent":         { p1: payingParent },
      "parentingTime":        { p1: parentingTime },
      "useParentingDeviation":{ p1: useParentingDeviation },
      "otherChildren":        { p1: 0 },
      "healthInsurance":      { p1: 0 },
      "daycare":              { p1: 0 },
    });
  }, [whatIfP1, whatIfP2, childrenCount, incomeType, payingParent, parentingTime, useParentingDeviation]);

  const toggleValue = (val: number) => isYearly ? val * 12 : val;

  return (
    <div className="w-full">

      {/* ══ CALCULATOR GRID ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 md:mb-12 no-print">

        {/* ── LEFT: Input panel ──────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <div className="card-standard shadow-[var(--shadow-card-md)] !p-6 md:!p-8">

            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[var(--color-brand-primary)] rounded-lg flex items-center justify-center text-white shadow-[var(--shadow-card-md)] shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] leading-tight">Income Estimator</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">Enter net monthly figures for both parents</p>
              </div>
            </div>

            <div className="flex flex-col gap-8">

              {/* County Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="county-select" className="input-label">Your county (optional)</label>
                <select
                  id="county-select"
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty?.(e.target.value)}
                  className="input-standard appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                >
                  <option value="">Select a county...</option>
                  <option value="king-county">King County</option>
                  <option value="pierce-county">Pierce County</option>
                  <option value="snohomish-county">Snohomish County</option>
                  <option value="spokane-county">Spokane County</option>
                </select>
              </div>

              {/* Income cycle + children count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="flex flex-col">
                  <span className="input-label mb-2">Income Cycle</span>
                  <div className="flex bg-white border border-[var(--color-bg-border)] rounded-xl p-1 gap-1 h-12">
                    <button
                      type="button"
                      onClick={() => setIncomeType("monthly")}
                      className={`flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        incomeType === "monthly"
                          ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                      }`}
                    >
                      Monthly Net
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncomeType("yearly")}
                      className={`flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        incomeType === "yearly"
                          ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                      }`}
                    >
                      Yearly Net
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="children-count" className="input-label">Number of Children</label>
                  <select
                    id="children-count"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="input-standard appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                  >
                    {[1,2,3,4,5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <IncomeHelper onUseAmount={(amt) => setParent1Income(amt)} label="P1: Not sure of your monthly net income?" />
              <IncomeHelper onUseAmount={(amt) => setParent2Income(amt)} label="P2: Not sure of your monthly net income?" />

              <p className="text-sm font-medium text-blue-600 -mb-6">Start with your monthly take-home pay after taxes</p>

              {/* Parent income inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-bg-border)]">
                <div className="flex flex-col">
                  <label htmlFor="parent1-income" className="input-label">
                    Parent 1 Net Income
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-[var(--color-text-primary)]/40 pointer-events-none select-none">$</span>
                    <input
                      type="number"
                      id="parent1-income"
                      value={parent1Income}
                      onChange={(e) => setParent1Income(sanitizeIncome(e.target.value))}
                      onBlur={(e) => {
                        if (e.target.value === "" || isNaN(parseFloat(e.target.value))) setParent1Income("");
                      }}
                      placeholder="e.g. 5,000"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      autoComplete="off"
                      className="input-standard pl-8 w-full shadow-sm"
                    />
                  </div>
                  <p className="input-helper">After taxes & mandatory deductions</p>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="parent2-income" className="input-label">
                    Parent 2 Net Income
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-[var(--color-text-primary)]/40 pointer-events-none select-none">$</span>
                    <input
                      type="number"
                      id="parent2-income"
                      value={parent2Income}
                      onChange={(e) => setParent2Income(sanitizeIncome(e.target.value))}
                      onBlur={(e) => {
                        if (e.target.value === "" || isNaN(parseFloat(e.target.value))) setParent2Income("");
                      }}
                      placeholder="e.g. 5,000"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      autoComplete="off"
                      className="input-standard pl-8 w-full shadow-sm"
                    />
                  </div>
                  <p className="input-helper">After taxes & mandatory deductions</p>
                </div>
              </div>

              <div className="space-y-8">

                {/* Payer toggle */}
                <div className="flex flex-col">
                  <span id="payer-label" className="input-label mb-0">Who pays support?</span>
                  <p className="text-sm text-gray-500 mb-4">Usually the parent with less custody time</p>
                  <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="payer-label">
                    <button type="button" onClick={() => setPayingParent("P1")} className={toggleBtn(payingParent === "P1")}>
                      {payingParent === "P1" && <CheckCircle size={15} className="shrink-0 text-white" />}
                      Parent 1
                    </button>
                    <button type="button" onClick={() => setPayingParent("P2")} className={toggleBtn(payingParent === "P2")}>
                      {payingParent === "P2" && <CheckCircle size={15} className="shrink-0 text-white" />}
                      Parent 2
                    </button>
                  </div>
                </div>

                <ParentingTimeSelector
                  useParentingDeviation={useParentingDeviation}
                  setUseParentingDeviation={setUseParentingDeviation}
                  parentingTime={parentingTime}
                  setParentingTime={setParentingTime}
                />
              </div>

              {error && (
                <div className="callout-amber">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} className="shrink-0 text-[var(--color-warning)]" />
                    <p className="text-sm font-medium text-[var(--color-highlight)]">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Results panel ──────────────────────────────────────── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-4 sm:p-6 h-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col"
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Calculator size={18} />
                    </div>
                    <span className="font-bold text-gray-900">Live Calculation Example</span>
                  </div>
                  <HeroCard />
                  <div className="mt-8 text-center">
                    <p className="text-sm font-semibold text-gray-500">Enter income to update this result</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results" ref={resultsRef}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Monthly / Yearly Toggle */}
                <div className="flex bg-white border border-gray-200 rounded-xl p-1 h-11 mb-2">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`flex-1 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${!isYearly ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    Monthly View
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`flex-1 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${isYearly ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    Yearly View
                  </button>
                </div>

                {/* SSR Protection Info Banner */}
                {result.ssrApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 shadow-sm"
                  >
                    <Shield size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 leading-snug">
                      Payer net income ({curFormatter.format(payingParent === "P1" ? result.netP1 : result.netP2)}) is protected by the $2,394 Self-Support Reserve (RCW 26.19.065). Obligation reduced to protect basic needs.
                    </p>
                  </motion.div>
                )}

                {/* Main Results Card */}
                <div className="card-standard !p-0 overflow-hidden shadow-[var(--shadow-card-md)] border-gray-200">

                  {/* INCOME BREAKDOWN SECTION */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Scale size={14} /> Income Breakdown
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">P1 {isYearly ? 'Annual' : 'Monthly'} Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={toggleValue(result.netP1)} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">P2 {isYearly ? 'Annual' : 'Monthly'} Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={toggleValue(result.netP2)} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-sm font-bold text-gray-900">Combined {isYearly ? 'Annual' : 'Monthly'} Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={toggleValue(result.combinedIncome)} />
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-[12px] font-bold text-blue-600 uppercase">P1 Share: {Math.round(result.shareP1 * 100)}%</span>
                        <span className="text-[12px] font-bold text-purple-600 uppercase">P2 Share: {Math.round(result.shareP2 * 100)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP1 * 100}%` }} className="h-full bg-blue-600" />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP2 * 100}%` }} className="h-full bg-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* SUPPORT CALCULATION SECTION */}
                  <div className="p-6 sm:p-8 bg-gray-50/50 border-y border-gray-100 space-y-6">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Calculator size={14} /> Support Calculation
                    </h4>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{isYearly ? 'Annual' : 'Basic'} Support Obligation</span>
                          <span className="text-[12px] text-gray-500">
                            2026 schedule · combined {curFormatter.format(result.roundedCombinedIncome)} · {result.children} {result.children === 1 ? 'child' : 'children'}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={toggleValue(result.baseSupport)} />
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          {payingParent === "P1" ? "P1" : "P2"} Proportional Share ({Math.round((payingParent === "P1" ? result.shareP1 : result.shareP2) * 100)}%)
                        </span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={toggleValue(result.breakdown.baseSupport)} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* FINAL TOTAL SECTION */}
                  <div className="p-6 sm:p-8 bg-blue-50/30 border-t border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">{isYearly ? 'Annual' : 'Monthly'} Transfer Payment</span>
                      <div className="text-right">
                        <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight tabular-nums">
                          <AnimatedNumber value={toggleValue(result.finalSupport)} />
                        </div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1">RCW 26.19 Compliant</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanatory Section */}
                <div className="mt-2">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-blue-600 transition-colors py-2 px-1"
                  >
                    How was this calculated? {showExplanation ? "▲" : "▼"}
                  </button>
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        key="explanation"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 p-6 bg-white border border-gray-200 rounded-2xl text-sm text-gray-600 leading-relaxed shadow-sm space-y-4">
                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                              <p>We took P1 income <strong>{curFormatter.format(result.netP1)}</strong> and P2 income <strong>{curFormatter.format(result.netP2)}</strong> to get combined income <strong>{curFormatter.format(result.combinedIncome)}</strong></p>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                              <p>We looked up combined income <strong>{curFormatter.format(result.roundedCombinedIncome)}</strong> with {result.children} {result.children === 1 ? 'child' : 'children'} in the 2026 Washington Schedule table — basic obligation: <strong>{curFormatter.format(result.baseSupport)}</strong></p>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                              <p>P1 income share = <strong>{Math.round(result.shareP1 * 100)}%</strong> | P2 income share = <strong>{Math.round(result.shareP2 * 100)}%</strong></p>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">4</div>
                              <p>P1 proportional share = <strong>{curFormatter.format(result.netP1 * result.baseSupport / (result.netP1 + result.netP2 || 1))}</strong> (approx based on shares)</p>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">5</div>
                              <p>Monthly transfer payment = <strong>{curFormatter.format(result.finalSupport)}</strong> ({payingParent === "P1" ? "P1 pays P2" : "P2 pays P1"})</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* What-If Sliders */}
                {whatIfP1 !== null && whatIfP2 !== null && whatIfResult && (
                  <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Explore What If Scenarios</h4>
                    <p className="text-xs text-gray-500 mb-6">Explore scenarios below — your original calculation above is not affected.</p>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-gray-700">P1 Monthly Net: {curFormatter.format(whatIfP1)}</label>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="20000"
                          step="100"
                          value={whatIfP1}
                          onChange={(e) => setWhatIfP1(Number(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-gray-700">P2 Monthly Net: {curFormatter.format(whatIfP2)}</label>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="20000"
                          step="100"
                          value={whatIfP2}
                          onChange={(e) => setWhatIfP2(Number(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Combined</p>
                          <p className="text-sm font-bold text-gray-900">{curFormatter.format(whatIfResult.combinedIncome)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Obligation</p>
                          <p className="text-sm font-bold text-gray-900">{curFormatter.format(whatIfResult.baseSupport)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Transfer</p>
                          <p className="text-sm font-bold text-blue-600">{curFormatter.format(whatIfResult.finalSupport)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <HistoryPanel
                  storageKey="wscss_history_basic"
                  currentInputs={{ parent1Income, parent2Income, childrenCount, payingParent }}
                  currentResult={result.finalSupport}
                  onReload={(inputs) => {
                    setParent1Income(inputs.parent1Income);
                    setParent2Income(inputs.parent2Income);
                    setChildrenCount(inputs.childrenCount);
                    setPayingParent(inputs.payingParent);
                  }}
                  formatResult={(val) => curFormatter.format(val)}
                />

                {/* Action Buttons Below Card */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/worksheet" className="btn btn-primary btn-primary-lg flex-1 shadow-sm">
                    Launch Full Wizard
                    <ArrowRight size={18} />
                  </Link>
                  <button onClick={() => window.print()} className="btn btn-secondary btn-secondary-lg px-6">
                    <Printer size={18} />
                    Print Results
                  </button>
                </div>

                <AttorneyCTA />
                <CrossSuggestions calculatorType="basic" />

                <p className="text-[11px] font-medium text-gray-400 text-center leading-relaxed px-4 pt-4">
                  Estimate only. Official calculations require a full Washington State Child Support Worksheet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>


      {/* ══ MOBILE STICKY BAR ════════════════════════════════════════════ */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] px-5 pt-4 pb-8 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-8px_30px_rgb(0,0,0,0.08)]"
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-6">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{isYearly ? 'Annual' : 'Monthly'} Transfer Payment</span>
                <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
                  <AnimatedNumber value={toggleValue(result.finalSupport)} />
                </div>
              </div>
              <button
                onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="btn btn-primary !px-5 whitespace-nowrap"
              >
                View Full Breakdown ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PRINT-ONLY BREAKDOWN ────────────────────────────────────────── */}
      {result && (
        <PrintReport
          caseContext={[
            { label: "Parent 1 Net Income:", value: curFormatter.format(result.netP1) },
            { label: "Parent 2 Net Income:", value: curFormatter.format(result.netP2) },
            { label: "Combined Family Income:", value: curFormatter.format(result.combinedIncome) },
          ]}
          calculationBase={[
            { label: "Number of Children:", value: childrenCount },
            { label: "Proportional Share:", value: `P1: ${Math.round(result.shareP1 * 100)}% | P2: ${Math.round(result.shareP2 * 100)}%` },
            { label: "Designated Payer:", value: payingParent === "P1" ? "Parent 1" : "Parent 2" },
          ]}
          analysisItems={[
            { label: "Base Support (Payer Share)", value: curFormatter.format(result.breakdown.baseSupport) },
            ...(result.parentingDeviationApplied && result.breakdown.parentingAdjustment < 0 ? [{
              label: "Parenting Time Credit",
              value: curFormatter.format(result.breakdown.parentingAdjustment),
              isBold: true,
              isIndigo: true,
              description: result.adjustmentReason
            }] : []),
            ...(result.ssrApplied ? [{
              label: "SSR Protection Applied",
              value: "Limit Applied",
              isBold: true,
              isAmber: true,
              description: "Payer income is protected by Self-Support Reserve guidelines."
            }] : []),
          ]}
          totalLabel="Total Basic Obligation"
          totalValue={curFormatter.format(result.totalObligation)}
          secondaryTotalLabel={`${payingParent === "P1" ? "Parent 1" : "Parent 2"} Transfer Payment`}
          secondaryTotalValue={curFormatter.format(result.finalSupport)}
          assumptions="This calculation is based on the official 2026 Washington State Child Support Schedule (RCW 26.19). It assumes all income entered is net monthly income (gross minus taxes and mandatory deductions)."
          disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
        />
      )}
    </div>
  );
}

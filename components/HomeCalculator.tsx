"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator,
  ChevronRight, ChevronDown, CheckCircle, AlertCircle, Info, ArrowRight, Printer,
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import ParentingTimeSelector from "@/components/calculator/ParentingTimeSelector";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import HeroCard from "@/components/hero/HeroCard";

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
  const [showIncomeHint, setShowIncomeHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full">

      {/* ══ CALCULATOR GRID ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 md:mb-12">

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

              {/* Net income hint (collapsible) */}
              <div>
                <button
                  id="net-income-hint-trigger"
                  type="button"
                  onClick={() => setShowIncomeHint(!showIncomeHint)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
                >
                  What counts as net income? <Info size={14} />
                </button>
                <AnimatePresence>
                  {showIncomeHint && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 leading-relaxed">
                        <strong className="font-bold">Court standard:</strong> Enter each parent&apos;s monthly net income — gross wages minus mandatory deductions (taxes, FICA, required union dues, mandatory retirement). Do not enter gross income.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                        <span className="text-sm text-gray-600">P1 Monthly Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={result.netP1} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">P2 Monthly Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={result.netP2} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-sm font-bold text-gray-900">Combined Monthly Net Income</span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={result.combinedIncome} />
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
                          <span className="text-sm font-bold text-gray-900">Basic Support Obligation</span>
                          <span className="text-[12px] text-gray-500">
                            2026 schedule · combined {curFormatter.format(result.roundedCombinedIncome)} · {result.children} {result.children === 1 ? 'child' : 'children'}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={result.baseSupport} />
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          {payingParent === "P1" ? "P1" : "P2"} Proportional Share ({Math.round((payingParent === "P1" ? result.shareP1 : result.shareP2) * 100)}%)
                        </span>
                        <span className="font-bold text-gray-900 tabular-nums">
                          <AnimatedNumber value={result.breakdown.baseSupport} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADJUSTMENTS SECTION (Conditional) */}
                  {(Math.abs(result.breakdown.ssrAdjustment) > 0 ||
                    Math.abs(result.breakdown.parentingAdjustment) > 0 ||
                    Math.abs(result.breakdown.otherChildrenAdjustment) > 0 ||
                    result.breakdown.healthInsurance > 0 ||
                    result.breakdown.daycare > 0) && (
                    <div className="p-6 sm:p-8 space-y-5">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Adjustments</h4>
                      <div className="space-y-3">
                        {Math.abs(result.breakdown.ssrAdjustment) > 0 && (
                          <div className="flex justify-between items-center text-amber-700">
                            <span className="text-sm">SSR Protection Applied (RCW 26.19.065)</span>
                            <span className="font-bold tabular-nums">
                              -<AnimatedNumber value={Math.abs(result.breakdown.ssrAdjustment)} />
                            </span>
                          </div>
                        )}
                        {Math.abs(result.breakdown.otherChildrenAdjustment) > 0 && (
                          <div className="flex justify-between items-center text-gray-700">
                            <span className="text-sm">Other Children Adjustment</span>
                            <span className="font-bold tabular-nums">
                              {result.breakdown.otherChildrenAdjustment < 0 ? '-' : '+'}
                              <AnimatedNumber value={Math.abs(result.breakdown.otherChildrenAdjustment)} />
                            </span>
                          </div>
                        )}
                        {Math.abs(result.breakdown.parentingAdjustment) > 0 && (
                          <div className="flex justify-between items-center text-blue-700">
                            <span className="text-sm">Parenting Time Credit</span>
                            <span className="font-bold tabular-nums">
                              -<AnimatedNumber value={Math.abs(result.breakdown.parentingAdjustment)} />
                            </span>
                          </div>
                        )}
                        {result.breakdown.healthInsurance > 0 && (
                          <div className="flex justify-between items-center text-green-700">
                            <span className="text-sm">Health Insurance Adjustment</span>
                            <span className="font-bold tabular-nums">
                              +<AnimatedNumber value={result.breakdown.healthInsurance} />
                            </span>
                          </div>
                        )}
                        {result.breakdown.daycare > 0 && (
                          <div className="flex justify-between items-center text-green-700">
                            <span className="text-sm">Childcare Adjustment</span>
                            <span className="font-bold tabular-nums">
                              +<AnimatedNumber value={result.breakdown.daycare} />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* FINAL TOTAL SECTION */}
                  <div className="p-6 sm:p-8 bg-blue-50/30 border-t border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Monthly Transfer Payment</span>
                      <div className="text-right">
                        <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight tabular-nums">
                          <AnimatedNumber value={result.finalSupport} />
                        </div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1">RCW 26.19 Compliant</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanatory Tooltip Section */}
                <div className="mt-2">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-blue-600 transition-colors py-2 px-1"
                  >
                    How was this calculated? <Info size={15} className="text-blue-400" />
                    <motion.div animate={{ rotate: showExplanation ? 180 : 0 }}>
                      <ChevronDown size={15} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 p-5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-600 leading-relaxed shadow-sm space-y-4">
                          <p>
                            Washington uses the <strong>Income Shares Model</strong>. Both parents&apos; net incomes are combined and looked up in the 2026 Economic Table to find the basic support obligation. Each parent pays their proportional share based on their percentage of combined income.
                          </p>
                          <p>
                            The <strong>Self-Support Reserve (SSR)</strong> of $2,394/mo ensures the paying parent retains enough income for basic needs.
                          </p>
                          <p className="text-xs italic text-gray-400">
                            This estimate does not include healthcare, childcare, or extraordinary expenses which may be added by the court.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons Below Card */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/worksheet" className="btn btn-primary btn-primary-lg flex-1 shadow-sm">
                    Launch Full Wizard
                    <ArrowRight size={18} />
                  </Link>
                  <button onClick={() => window.print()} className="btn btn-secondary btn-secondary-lg px-6">
                    <Printer size={18} />
                    Print
                  </button>
                </div>

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
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Monthly Transfer Payment</span>
                <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
                  <AnimatedNumber value={result.finalSupport} />
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
        <div className="hidden print:block fixed inset-0 bg-white z-[1000] p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="border-b-2 border-indigo-600 pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Child Support Estimate</h1>
                <p className="text-indigo-600 font-semibold">Washington State (2026 Guidelines)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 font-medium">Ref: RCW 26.19 Compliance</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-10">
              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b pb-2">Parental Income</h2>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parent 1 Net Income:</span>
                  <span className="font-bold">{curFormatter.format(result.netP1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parent 2 Net Income:</span>
                  <span className="font-bold">{curFormatter.format(result.netP2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-bold">Combined Family Income:</span>
                  <span className="font-bold">{curFormatter.format(result.combinedIncome)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-bold border-b pb-2">Case Details</h2>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Children:</span>
                  <span className="font-bold">{childrenCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Proportional Share:</span>
                  <span className="font-bold">P1: {Math.round(result.shareP1 * 100)}% | P2: {Math.round(result.shareP2 * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Designated Payer:</span>
                  <span className="font-bold">{payingParent === "P1" ? "Parent 1" : "Parent 2"}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calculation Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700">Base Support (Payer Share)</span>
                  <span className="font-bold text-gray-900">{curFormatter.format(result.breakdown.baseSupport)}</span>
                </div>

                {result.parentingDeviationApplied && result.breakdown.parentingAdjustment < 0 && (
                  <div className="flex justify-between items-start pt-2 border-t border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">Parenting Time Credit</p>
                      <p className="text-sm text-gray-500">{result.adjustmentReason}</p>
                    </div>
                    <span className="font-bold text-indigo-600">{curFormatter.format(result.breakdown.parentingAdjustment)}</span>
                  </div>
                )}

                {result.ssrApplied && (
                   <div className="flex justify-between items-start pt-2 border-t border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">SSR Protection Applied</p>
                      <p className="text-sm text-gray-500">Payer income is protected by Self-Support Reserve guidelines.</p>
                    </div>
                    <span className="font-bold text-amber-600">Limit Applied</span>
                  </div>
                )}

                {/* ── CHANGE 5: Print — show totalObligation ── */}
                <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300 mt-4">
                  <span className="text-2xl font-bold text-gray-900">Total Basic Obligation</span>
                  <span className="text-3xl font-bold text-indigo-600">{curFormatter.format(result.totalObligation)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">{payingParent === "P1" ? "Parent 1" : "Parent 2"} Transfer Payment</span>
                  <span className="text-xl font-bold text-gray-700">{curFormatter.format(result.finalSupport)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Legal Context & Assumptions</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This calculation is based on the official 2026 Washington State Child Support Schedule (RCW 26.19).
                  It assumes all income entered is <strong>net monthly income</strong> (gross minus taxes and mandatory deductions).
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800 font-semibold mb-2">Disclaimer: Official Estimate Only</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  This document provides an estimate only and does not constitute legal advice or a binding court order.
                  Actual support obligations are determined by a judge based on the full Child Support Worksheet,
                  which may include healthcare costs, daycare expenses, other children, and specific judicial findings.
                </p>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-gray-200 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Generated via WSCSS Calculator — Washington Child Support Software
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

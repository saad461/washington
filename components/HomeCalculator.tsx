"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator,
  ChevronRight, CheckCircle, AlertCircle, Info, ArrowRight, Printer,
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import ParentingTimeSelector from "@/components/calculator/ParentingTimeSelector";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

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

export default function HomeCalculator() {
  const [parent1Income,          setParent1Income]          = useState("");
  const [parent2Income,          setParent2Income]          = useState("");
  const [childrenCount,          setChildrenCount]          = useState(1);
  const [incomeType,             setIncomeType]             = useState("monthly");
  const [payingParent,           setPayingParent]           = useState("P1");
  const [parentingTime,          setParentingTime]          = useState(0);
  const [useParentingDeviation,  setUseParentingDeviation]  = useState(false);
  const [error,  setError]  = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateChildSupport> | null>(null);
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
                      placeholder="0"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      autoComplete="off"
                      className="input-standard pl-8 w-full"
                    />
                  </div>
                  <p className="input-helper">After taxes &amp; mandatory deductions</p>
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
                      placeholder="0"
                      min="0"
                      step="1"
                      inputMode="decimal"
                      autoComplete="off"
                      className="input-standard pl-8 w-full"
                    />
                  </div>
                  <p className="input-helper">After taxes &amp; mandatory deductions</p>
                </div>
              </div>

              {/* Net income hint */}
              <div className="callout-blue">
                <div className="flex items-start gap-4">
                  <Info size={16} className="text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <p className="text-[var(--color-info)] text-sm leading-relaxed">
                    <strong className="font-semibold">Court standard:</strong> Enter each parent&apos;s monthly net income — gross wages minus mandatory deductions (taxes, FICA, required union dues, mandatory retirement). Do not enter gross income.
                  </p>
                </div>
              </div>

              <div className="space-y-8">

                {/* Payer toggle */}
                <div className="flex flex-col">
                  <span className="input-label mb-0">Designated Payer</span>
                  <p className="text-sm text-gray-500 mb-4">Which parent will make monthly payments to the other?</p>
                  <div className="grid grid-cols-2 gap-4">
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
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                className="bg-white border-dashed border-2 border-gray-300 rounded-[var(--radius-card)] flex flex-col items-center justify-center py-16 text-center gap-4 h-full"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[var(--color-text-secondary)] shadow-[var(--shadow-card)]">
                  <Calculator size={28} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-secondary)]">Ready to calculate</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 max-w-[220px] mx-auto">
                    Enter income details to see your estimated support obligation.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results" ref={resultsRef}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Result hero - Professional Legal Aesthetic */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl sm:rounded-3xl p-8 text-center relative overflow-hidden shadow-[var(--shadow-card)]">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-blue-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-[12px] font-bold text-gray-600 uppercase tracking-[0.15em] mb-4">
                      Estimated Monthly Transfer
                    </p>

                    <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight tabular-nums">
                      <AnimatedNumber value={result.finalSupport} />
                    </div>

                    {/* Status badges */}
                    {(result.ssrApplied || result.isLowIncome || result.is45PercentCapped || result.parentingDeviationApplied) && (
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {result.ssrApplied              && <span className="badge-warning">SSR Protection</span>}
                        {result.isLowIncome             && <span className="badge-success">Low Income Min.</span>}
                        {result.is45PercentCapped       && <span className="badge-warning">45% Cap</span>}
                        {result.parentingDeviationApplied && <span className="badge-category">Est. Deviation</span>}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/worksheet"
                        className="btn-primary-lg w-full sm:w-auto shadow-[var(--shadow-card-md)]"
                      >
                        Get Official PDF
                        <ArrowRight size={18} />
                      </Link>
                      <button
                        onClick={() => window.print()}
                        className="btn-secondary-lg w-full sm:w-auto shadow-[var(--shadow-card-md)]"
                      >
                        <Printer size={18} />
                        Print Results
                      </button>
                    </div>
                  </div>
                </div>

                {/* Above Table Maximum Notice */}
                {result.isAboveMaximum && (
                  <div className="callout-amber">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="shrink-0 text-[var(--color-warning)] mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-[var(--color-highlight)] mb-1">Income Exceeds Table Maximum</p>
                        <p className="text-xs text-[var(--color-highlight)] leading-relaxed">
                          Combined income exceeds $50,000/mo. The presumptive amount is shown, but the court may order a higher amount based on the family&apos;s standard of living.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SSR Protection Explanation */}
                {result.ssrApplied && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0 border border-amber-200">
                        <Shield size={20} className="text-amber-700" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-amber-900 mb-1">SSR Protection Active</p>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Payer net income ({curFormatter.format(payingParent === "P1" ? result.netP1 : result.netP2)}) is protected by the $2,394 Self-Support Reserve. The obligation has been reduced to ensure basic needs can be met (RCW 26.19.065).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Breakdown card */}
                <div className="card-standard space-y-6 shadow-[var(--shadow-card-md)]">
                  <h4 className="eyebrow border-b border-[var(--color-bg-border-soft)] pb-3 mb-0">
                    Calculation Breakdown
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--color-text-body)]">Combined Family Income</span>
                      <span className="font-bold text-[var(--color-text-primary)] tabular-nums">
                        <AnimatedNumber value={result.combinedIncome} />
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[12px] font-semibold text-[var(--color-text-secondary)] font-bold text-[var(--color-brand-primary)] uppercase">P1: {Math.round(result.shareP1 * 100)}%</span>
                        <span className="text-[12px] font-semibold text-[var(--color-text-secondary)] font-bold text-purple-600 uppercase">P2: {Math.round(result.shareP2 * 100)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-[var(--color-bg-muted)] rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP1 * 100}%` }} className="h-full bg-[var(--color-brand-primary)]" />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP2 * 100}%` }} className="h-full bg-purple-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-4 border-y border-[var(--color-bg-border-soft)]">
                      <div className="stat-block text-center">
                        <p className="stat-label text-[var(--color-brand-primary)]">P1 Net</p>
                        <p className="stat-value text-lg tabular-nums">
                          <AnimatedNumber value={result.netP1} />
                        </p>
                      </div>
                      <div className="stat-block text-center">
                        <p className="stat-label text-purple-600">P2 Net</p>
                        <p className="stat-value text-lg tabular-nums">
                          <AnimatedNumber value={result.netP2} />
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-body)]">Base Support (Payer Share)</span>
                        <span className="font-bold text-[var(--color-text-primary)] tabular-nums">
                          <AnimatedNumber value={result.breakdown.baseSupport} />
                        </span>
                      </div>

                      {result.parentingDeviationApplied && result.breakdown.parentingAdjustment < 0 && (
                        <div className="flex justify-between items-start text-[var(--color-highlight)]">
                          <div className="flex flex-col pr-2">
                            <span className="text-sm font-medium">Parenting Time Credit</span>
                            <span className="text-[12px] font-semibold text-[var(--color-text-secondary)] mt-0.5 line-clamp-1 overflow-hidden text-ellipsis">
                              {result.adjustmentReason}
                            </span>
                          </div>
                          <span className="font-bold tabular-nums shrink-0">
                            <AnimatedNumber value={result.breakdown.parentingAdjustment} />
                          </span>
                        </div>
                      )}

                      {result.ssrApplied && result.breakdown.ssrAdjustment < 0 && (
                        <div className="flex justify-between items-start text-amber-600">
                          <div className="flex flex-col pr-2">
                            <span className="text-sm font-medium">SSR Protection Applied</span>
                            <span className="text-[12px] font-semibold opacity-80 mt-0.5">
                              RCW 26.19.065(2)(b)
                            </span>
                          </div>
                          <span className="font-bold tabular-nums shrink-0">
                            <AnimatedNumber value={result.breakdown.ssrAdjustment} />
                          </span>
                        </div>
                      )}

                      {result.is45PercentCapped && result.breakdown.cap45Adjustment < 0 && (
                        <div className="flex justify-between items-start text-amber-600">
                          <div className="flex flex-col pr-2">
                            <span className="text-sm font-medium">45% Net Income Cap</span>
                            <span className="text-[12px] font-semibold opacity-80 mt-0.5">
                              RCW 26.19.065(1)
                            </span>
                          </div>
                          <span className="font-bold tabular-nums shrink-0">
                            <AnimatedNumber value={result.breakdown.cap45Adjustment} />
                          </span>
                        </div>
                      )}

                      <div className="pt-4 border-t border-[var(--color-bg-border-soft)] flex justify-between items-center">
                        <span className="font-bold text-[var(--color-text-primary)]">Presumptive Total</span>
                        <span className="text-2xl font-bold text-[var(--color-brand-primary)] tabular-nums">
                          <AnimatedNumber value={result.finalSupport} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] text-[var(--color-text-secondary)] text-center leading-relaxed px-4">
                  Estimate only. Does not constitute legal advice. Actual court orders may differ based on deviations, extraordinary expenses, and judicial findings.
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
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] px-4 pt-3 pb-6 bg-white/95 backdrop-blur-lg border-t border-[var(--color-bg-border)] shadow-[var(--shadow-card-hover)]"
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[12px] font-semibold text-[var(--color-text-secondary)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-0.5">Estimated Support</span>
                <span className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                  <AnimatedNumber value={result.finalSupport} />
                </span>
              </div>
              <button
                onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View Breakdown
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

                <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300 mt-4">
                  <span className="text-2xl font-bold text-gray-900">Estimated Monthly Transfer</span>
                  <span className="text-3xl font-bold text-indigo-600">{curFormatter.format(result.finalSupport)}</span>
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
                Generated via WCSSC Calculator — Washington Child Support Software
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

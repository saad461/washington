"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator,
  ChevronRight, CheckCircle, AlertCircle, Info, ArrowRight,
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

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
function toggleBtn(active: boolean, color: "indigo" | "purple") {
  const base = "h-11 sm:h-12 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm select-none";
  if (active && color === "indigo") return `${base} bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm`;
  if (active && color === "purple") return `${base} bg-purple-50 border-purple-600 text-purple-700 shadow-sm`;
  return `${base} bg-white border-gray-200 text-body hover:border-gray-300`;
}

export default function HomeCalculator() {
  const [parent1Income, setParent1Income] = useState("");
  const [parent2Income, setParent2Income] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [incomeType,    setIncomeType]    = useState("monthly");
  const [payingParent,  setPayingParent]  = useState("P1");
  const [parentingTime, setParentingTime] = useState(0);
  const [error,  setError]  = useState("");
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
    setResult(calculateChildSupport({
      "1a":             { p1, p2 },
      "5_children":     { p1: childrenCount },
      "incomeType":     { p1: incomeType },
      "payingParent":   { p1: payingParent },
      "parentingTime":  { p1: parentingTime },
      "otherChildren":  { p1: 0 },
      "healthInsurance":{ p1: 0 },
      "daycare":        { p1: 0 },
    }));
  }, [parent1Income, parent2Income, childrenCount, incomeType, payingParent, parentingTime]);

  useEffect(() => {
    const t = setTimeout(handleCalculate, 400);
    return () => clearTimeout(t);
  }, [handleCalculate]);

  return (
    <div className="w-full">

      {/* ══ CALCULATOR GRID ══════════════════════════════════════════════ */}
      {/* FIX: mb-24 → mb-12 md:mb-20 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 md:mb-20">

        {/* ── LEFT: Input panel ──────────────────────────────────────── */}
        <div className="lg:col-span-7">
          {/* FIX: was card-standard !p-6 md:!p-10 — removed !important overrides */}
          <div className="card-standard shadow-xl" style={{ borderColor: "rgb(238 242 255 / 0.8)" }}>

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-heading leading-tight">Income Estimator</h2>
                <p className="text-sm text-muted">Enter figures for both parents</p>
              </div>
            </div>

            <form className="flex flex-col gap-6 md:gap-8" onSubmit={(e) => e.preventDefault()}>

              {/* Income cycle + children count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label htmlFor="income-type" className="input-label">Income Cycle</label>
                  <select id="income-type" value={incomeType} onChange={(e) => setIncomeType(e.target.value)} className="input-standard">
                    <option value="monthly">Monthly Net</option>
                    <option value="yearly">Yearly Net</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="children-count" className="input-label">Number of Children</label>
                  <select id="children-count" value={childrenCount} onChange={(e) => setChildrenCount(Number(e.target.value))} className="input-standard">
                    {[1,2,3,4,5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Parent income inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50/60 rounded-xl sm:rounded-2xl border border-gray-100">
                <div className="flex flex-col">
                  {/* FIX: was label-metadata !text-indigo-600 — removed !important */}
                  <label htmlFor="parent1-income" className="input-label" style={{ color: "#6366f1" }}>Parent 1 Net Income</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading/40 pointer-events-none select-none">$</span>
                    <input type="number" id="parent1-income" value={parent1Income} onChange={(e) => setParent1Income(e.target.value)} placeholder="0.00" className="input-standard pl-8 w-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  {/* FIX: was !text-purple-600 — removed !important */}
                  <label htmlFor="parent2-income" className="input-label" style={{ color: "#9333ea" }}>Parent 2 Net Income</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-heading/40 pointer-events-none select-none">$</span>
                    <input type="number" id="parent2-income" value={parent2Income} onChange={(e) => setParent2Income(e.target.value)} placeholder="0.00" className="input-standard pl-8 w-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">

                {/* Payer toggle */}
                <div className="flex flex-col">
                  <span className="input-label mb-3">Designated Payer</span>
                  {/* FIX: h-14 hardcoded → h-11 sm:h-12 via toggleBtn() */}
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPayingParent("P1")} className={toggleBtn(payingParent === "P1", "indigo")}>
                      {payingParent === "P1" && <CheckCircle size={15} className="shrink-0" />}
                      Parent 1
                    </button>
                    <button type="button" onClick={() => setPayingParent("P2")} className={toggleBtn(payingParent === "P2", "purple")}>
                      {payingParent === "P2" && <CheckCircle size={15} className="shrink-0" />}
                      Parent 2
                    </button>
                  </div>
                </div>

                {/* Parenting time */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <label htmlFor="parenting-time" className="input-label block">Parenting Time Split</label>
                      <p className="text-xs text-muted mt-0.5">Overnight stays with Payer</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-indigo-600 leading-none tabular-nums">{parentingTime}%</span>
                  </div>

                  <input
                    id="parenting-time" type="range" min="0" max="100" step="5"
                    value={parentingTime} onChange={(e) => setParentingTime(Number(e.target.value))}
                    className="w-full h-2 mb-5 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600"
                  />

                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner border border-gray-200/50">
                    <motion.div
                      initial={false}
                      animate={{ width: `${parentingTime}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">Paying Parent</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Custodial</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800">
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ── RIGHT: Results panel ───────────────────────────────────────
            FIX: lg:top-28 (112px) didn't match nav heights.
            Nav scrolled = h-16 (64px) + 8px buffer = ~72px.
            lg:top-24 (96px) gives safe clearance in all nav states.
        ──────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                className="card-standard border-dashed border-2 flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <Calculator size={28} />
                </div>
                <div>
                  <p className="font-semibold text-heading">Ready to calculate</p>
                  <p className="text-sm text-muted mt-1 max-w-[220px] mx-auto">Enter income details to see your estimated support obligation.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results" ref={resultsRef}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Result hero */}
                <div className="bg-heading rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="relative z-10">
                    <p className="label-metadata text-white/50 mb-4 tracking-[0.18em]">Estimated Monthly Transfer</p>

                    {/* FIX: was text-5xl md:text-6xl — too large on mobile. Now 3-step scale. */}
                    <div className="text-4xl sm:text-5xl font-bold text-white font-heading mb-6 tracking-tight tabular-nums">
                      <AnimatedNumber value={result.finalSupport} />
                    </div>

                    {(result.ssrApplied || result.isLowIncome || result.is45PercentCapped) && (
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {result.ssrApplied     && <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"><AlertCircle size={11} /> SSR Protection</span>}
                        {result.isLowIncome    && <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><Info size={11} /> Low Income Min.</span>}
                        {result.is45PercentCapped && <span className="badge bg-amber-500/20 text-amber-300 border border-amber-500/30"><AlertCircle size={11} /> 45% Cap</span>}
                      </div>
                    )}

                    {/* FIX: was btn-primary !bg-white !text-heading !h-14 !px-8 !rounded-2xl (5× !important) */}
                    <Link
                      href="/worksheet"
                      className="btn-primary w-full sm:w-auto group"
                      style={{ background: "white", color: "var(--color-heading)", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      Get Official PDF
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Breakdown */}
                {/* FIX: was card-standard !p-8 — removed !important */}
                <div className="card-standard space-y-5 shadow-md">
                  <h4 className="label-metadata text-heading border-b border-gray-100 pb-3">Calculation Breakdown</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-body">Combined Family Income</span>
                      <span className="font-bold text-heading tabular-nums"><AnimatedNumber value={result.combinedIncome} /></span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">P1: {Math.round(result.shareP1 * 100)}%</span>
                        <span className="text-[10px] font-bold text-purple-600 uppercase">P2: {Math.round(result.shareP2 * 100)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP1 * 100}%` }} className="h-full bg-indigo-500" />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.shareP2 * 100}%` }} className="h-full bg-purple-500" />
                      </div>
                    </div>

                    <div className="pt-3 space-y-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-body">Base Support (Payer Share)</span>
                        <span className="font-bold text-heading tabular-nums"><AnimatedNumber value={result.breakdown.baseSupport} /></span>
                      </div>
                      {result.breakdown.parentingAdjustment !== 0 && (
                        <div className="flex justify-between items-center text-emerald-600">
                          <span className="text-sm font-medium">Parenting Time Credit</span>
                          <span className="font-bold tabular-nums"><AnimatedNumber value={result.breakdown.parentingAdjustment} /></span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-heading">Presumptive Total</span>
                        <span className="text-lg sm:text-xl font-bold text-indigo-600 tabular-nums"><AnimatedNumber value={result.finalSupport} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ BELOW-CALCULATOR SECTIONS ═══════════════════════════════════
          FIX: space-y-24 → space-y-12 md:space-y-20
          FIX: h2/h3 hardcoded sizes removed — global styles apply
      ════════════════════════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-20">

        {/* Why Legal Pros Trust WCSSC */}
        <div>
          <div className="text-center mb-8 md:mb-12 space-y-3">
            <h2>Why Legal Pros Trust WCSSC</h2>
            <p className="text-base sm:text-lg text-body leading-relaxed max-w-2xl mx-auto">
              Unlike generic calculators, WCSSC is engineered to the exact 2026 Washington statutory logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4">
              {[
                "Compliant with RCW 26.19 standards",
                "Includes Self-Support Reserve (SSR) logic",
                "Applies the 45% net income safety cap",
                "Live updates as you adjust inputs",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={13} />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-heading">{text}</span>
                </div>
              ))}
            </div>

            <div className="table-container shadow-xl ring-1 ring-gray-200">
              <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50/60">
                <h3 className="label-metadata text-heading">Feature Comparison</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Feature comparison: WCSSC vs standard calculators</caption>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="table-header">Engine Logic</th>
                    <th className="table-header text-center">WCSSC</th>
                    <th className="table-header text-center">Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {["2026 SSR Protection","45% Net Income Cap","Parenting Credit","RCW 26.19 Compliant"].map((name, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell font-semibold text-sm">{name}</td>
                      <td className="table-cell text-center"><CheckCircle size={17} className="mx-auto text-indigo-600" /></td>
                      <td className="table-cell text-center"><div className="w-4 h-0.5 bg-gray-200 mx-auto rounded-full" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        {/* FIX: sm:col-span-2 on 3rd card so it doesn't orphan on 2-col tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="card-interactive group text-center flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm shrink-0">
              <Scale size={24} />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">Legal Precision</h3>
            <p className="text-sm text-body leading-relaxed">Mapped exactly to the 2026 Washington State Economic Tables and statutory updates.</p>
          </div>

          <div className="card-interactive group text-center flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm shrink-0">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">Privacy First</h3>
            <p className="text-sm text-body leading-relaxed">No data is stored. All processing stays local in your browser session for 100% privacy.</p>
          </div>

          <div className="card-interactive group text-center flex flex-col items-center sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm shrink-0">
              <Calculator size={24} />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">Worksheet Wizard</h3>
            <p className="text-sm text-body leading-relaxed mb-6 flex-1">Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.</p>
            <Link href="/worksheet" className="btn-secondary w-full sm:w-auto group-hover:border-purple-500 group-hover:text-purple-600">
              Launch Wizard <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* ══ MOBILE STICKY BAR ════════════════════════════════════════════
          FIX: all !important overrides removed.
          FIX: label was !text-[9px] — now text-[10px] (readable minimum).
          FIX: safe-area-inset-bottom for iPhone home indicator.
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pt-3 bg-white/95 backdrop-blur-lg border-t border-indigo-100 shadow-[0_-8px_24px_rgba(99,102,241,0.12)]"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="label-metadata block">Estimated Support</span>
                <span className="text-xl font-bold text-heading font-heading tabular-nums">
                  <AnimatedNumber value={result.finalSupport} />
                </span>
              </div>
              <button onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn-primary shrink-0">
                View Breakdown
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

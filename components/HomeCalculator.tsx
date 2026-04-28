"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator,
  ChevronRight, CheckCircle, AlertCircle, Info, ArrowRight, ToggleLeft, ToggleRight,
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* ── LEFT: Input panel ──────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <div className="card card-elevated !p-6 md:!p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-h2">Income Estimator</h2>
                <p className="text-sm">Enter net monthly figures for both parents</p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="input-row-2">
                <div className="field">
                  <label htmlFor="income-type">Income Cycle</label>
                  <select
                    id="income-type"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="input select"
                  >
                    <option value="monthly">Monthly Net</option>
                    <option value="yearly">Yearly Net</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="children-count">Number of Children</label>
                  <select
                    id="children-count"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="input select"
                  >
                    {[1,2,3,4,5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-row-2 p-6 bg-surface-subtle rounded-xl border border-border-default">
                <div className="field">
                  <label htmlFor="parent1-income" className="!text-brand">Parent 1 Net Income</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-text-muted/40 pointer-events-none">$</span>
                    <input
                      type="number"
                      id="parent1-income"
                      value={parent1Income}
                      onChange={(e) => setParent1Income(sanitizeIncome(e.target.value))}
                      placeholder="0"
                      className="input pl-8"
                    />
                  </div>
                  <p className="text-xs mt-1.5">After taxes & deductions</p>
                </div>

                <div className="field">
                  <label htmlFor="parent2-income" className="!text-purple-600">Parent 2 Net Income</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-text-muted/40 pointer-events-none">$</span>
                    <input
                      type="number"
                      id="parent2-income"
                      value={parent2Income}
                      onChange={(e) => setParent2Income(sanitizeIncome(e.target.value))}
                      placeholder="0"
                      className="input pl-8"
                    />
                  </div>
                  <p className="text-xs mt-1.5">After taxes & deductions</p>
                </div>
              </div>

              <div className="flex items-start gap-4 px-4 py-4 bg-brand-light border border-brand-border rounded-xl">
                <Info size={16} className="text-brand shrink-0 mt-0.5" />
                <p className="text-xs text-text-body leading-relaxed">
                  <strong>Court standard:</strong> Enter net income — gross wages minus mandatory deductions.
                </p>
              </div>

              <div className="space-y-8">
                <div className="field">
                  <span className="label mb-2">Designated Payer</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPayingParent("P1")}
                      className={`btn btn-md ${payingParent === "P1" ? "btn-primary" : "btn-secondary"}`}
                    >
                      {payingParent === "P1" && <CheckCircle size={15} className="shrink-0" />}
                      Parent 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayingParent("P2")}
                      className={`btn btn-md ${payingParent === "P2" ? "btn-primary" : "btn-secondary"}`}
                    >
                      {payingParent === "P2" && <CheckCircle size={15} className="shrink-0" />}
                      Parent 2
                    </button>
                  </div>
                </div>

                <div className="field">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border-default bg-surface-subtle cursor-pointer select-none"
                    onClick={() => setUseParentingDeviation(!useParentingDeviation)}
                  >
                    <div className="flex items-center gap-2.5">
                      {useParentingDeviation
                        ? <ToggleRight size={24} className="text-brand shrink-0" />
                        : <ToggleLeft  size={24} className="text-text-muted shrink-0" />
                      }
                      <div>
                        <p className="text-sm font-bold text-text-primary">Parenting Time Deviation</p>
                        <p className="text-xs text-text-muted">Estimated credit per RCW 26.19.075</p>
                      </div>
                    </div>
                    <span className={`badge ${useParentingDeviation ? "badge-brand" : "badge-neutral"}`}>
                      {useParentingDeviation ? "On" : "Off"}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {useParentingDeviation && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-6">
                          <div className="flex justify-between items-end">
                            <div>
                              <label htmlFor="parenting-time">Payer&apos;s Overnights %</label>
                            </div>
                            <span className="text-numeric-lg !text-2xl text-brand">
                              {parentingTime}%
                            </span>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={parentingTime}
                            onChange={(e) => setParentingTime(Number(e.target.value))}
                            className="w-full h-2 bg-border-default rounded-full cursor-pointer accent-brand"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {error && (
                <div className="badge badge-warning !p-4 !rounded-xl w-full">
                  <AlertCircle size={18} className="shrink-0 mr-2" />
                  <span className="font-semibold">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Results panel ──────────────────────────────────────── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="card border-dashed border-2 flex flex-col items-center justify-center py-20 text-center gap-4"
              >
                <Calculator size={48} className="text-border-default" />
                <p className="text-h4">Ready to calculate</p>
              </motion.div>
            ) : (
              <motion.div
                key="results" ref={resultsRef}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="calc-result !mt-0 shadow-lg">
                  <p className="calc-result-label">Estimated Monthly Transfer</p>
                  <div className="calc-result-amount">
                    <AnimatedNumber value={result.finalSupport} />
                  </div>
                  <p className="calc-result-period">per month</p>

                  <div className="mt-8">
                    <Link href="/worksheet" className="btn btn-secondary btn-md w-full sm:w-auto">
                      Get Official PDF
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>

                <div className="card space-y-6">
                  <h4 className="label border-b border-border-default pb-3">Breakdown</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Combined Income</span>
                      <span className="text-numeric">
                        <AnimatedNumber value={result.combinedIncome} />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-default">
                      <div className="text-center">
                        <p className="label !mb-1 text-brand">P1 Net</p>
                        <p className="text-numeric text-sm">
                          <AnimatedNumber value={result.netP1} />
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="label !mb-1 text-purple-600">P2 Net</p>
                        <p className="text-numeric text-sm">
                          <AnimatedNumber value={result.netP2} />
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Presumptive Total</span>
                        <span className="text-numeric-lg !text-xl text-brand">
                          <AnimatedNumber value={result.finalSupport} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE STICKY BAR (Relocated to top) ────────────────────────── */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: -100 }} animate={{ y: 60 }} exit={{ y: -100 }}
            className="lg:hidden fixed top-0 left-0 right-0 z-[70] h-14 px-4 bg-bg-inverse text-text-inverse border-b border-white/10 shadow-xl flex items-center justify-between"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] uppercase font-bold text-white/40">Estimate</span>
              <span className="text-numeric text-xl">
                <AnimatedNumber value={result.finalSupport} />
              </span>
              <span className="text-[10px] text-white/40">/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="btn btn-secondary !bg-white/10 !text-white !border-white/20 !h-8 !px-3 !text-xs"
              >
                Breakdown
              </button>
              <Link href="/worksheet" className="btn btn-primary !h-8 !px-3 !text-xs">
                Launch Wizard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

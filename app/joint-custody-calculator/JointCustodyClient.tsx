"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Scale, Shield, Calculator, Info, AlertCircle, CheckCircle, Printer, ArrowRight, Calendar
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import FAQAccordion from "@/components/FAQAccordion";
import { motion, AnimatePresence } from "framer-motion";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

/* ─── Shared toggle button styles ─── */
function toggleBtn(active: boolean) {
  const base = "h-11 sm:h-12 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm select-none w-full";
  if (active) return `${base} bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-md`;
  return `${base} bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-text-disabled)]`;
}

interface JointCustodyClientProps {
  faqs: { question: string; answer: string }[];
}

export default function JointCustodyClient({ faqs }: JointCustodyClientProps) {
  const [parent1Income, setParent1Income] = useState("");
  const [parent2Income, setParent2Income] = useState("");
  const [childrenCount, setChildrenCount] = useState(2);
  const [incomeType, setIncomeType] = useState("monthly");
  const [payingParent, setPayingParent] = useState("P1");
  const [custodyType, setCustodyType] = useState("50/50");
  const [customPayingTime, setCustomPayingTime] = useState("50");
  const [customReceivingTime, setCustomReceivingTime] = useState("50");
  const [useCredit, setUseCredit] = useState(true);

  // Derived Values
  const payingParentTime = useMemo(() => {
    if (custodyType === "50/50") return 50;
    if (custodyType === "60/40") return 40;
    if (custodyType === "70/30") return 30;
    if (custodyType === "80/20") return 20;
    return parseFloat(customPayingTime) || 0;
  }, [custodyType, customPayingTime]);

  const receivingParentTime = useMemo(() => {
    if (custodyType === "50/50") return 50;
    if (custodyType === "60/40") return 60;
    if (custodyType === "70/30") return 70;
    if (custodyType === "80/20") return 80;
    return parseFloat(customReceivingTime) || 0;
  }, [custodyType, customReceivingTime]);

  const isValid = useMemo(() => {
    if (custodyType !== "custom") return true;
    return (parseFloat(customPayingTime) || 0) + (parseFloat(customReceivingTime) || 0) === 100;
  }, [custodyType, customPayingTime, customReceivingTime]);

  const result = useMemo(() => {
    const p1 = parseFloat(parent1Income) || 0;
    const p2 = parseFloat(parent2Income) || 0;
    if ((p1 === 0 && p2 === 0) || !isValid) return null;

    // 1. Get standard calculation result using engine
    const engineResult = calculateChildSupport({
      "1a": { p1: incomeType === "yearly" ? p1 : p1, p2: incomeType === "yearly" ? p2 : p2 },
      "5_children": { p1: childrenCount },
      "incomeType": { p1: incomeType },
      "payingParent": { p1: payingParent },
      "parentingTime": { p1: 0 }, // Disable engine's own deviation logic
      "useParentingDeviation": { p1: false },
    });

    // 2. Extract Line 9 (after SSR, before deviations)
    // In our engine, breakdown.baseSupport is the presumptive payer share.
    // ssrAdjustment is the change from SSR.
    // Line 9 = engineResult.breakdown.baseSupport + engineResult.breakdown.ssrAdjustment
    const line9 = engineResult.breakdown.baseSupport + engineResult.breakdown.ssrAdjustment;

    // 3. Apply Joint Custody Credit Logic
    const getParentingCreditPercent = (time: number): number => {
      if (!useCredit) return 0;
      if (time >= 50) return 0.25;
      if (time < 20) return 0;
      return Math.min((time / 50) * 0.25, 0.25);
    };

    const creditPercent = getParentingCreditPercent(payingParentTime);
    const creditAmount = line9 * creditPercent;

    const finalTransfer = Math.max(
      line9 - creditAmount,
      50 * childrenCount
    );

    return {
      ...engineResult,
      line9,
      creditPercent,
      creditAmount,
      finalTransfer,
      payingParentTime,
      receivingParentTime
    };
  }, [parent1Income, parent2Income, childrenCount, incomeType, payingParent, custodyType, customPayingTime, customReceivingTime, useCredit, isValid, payingParentTime, receivingParentTime]);

  return (
    <div className="flex-1 flex flex-col bg-white w-full">
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="pt-12 pb-8 bg-white border-b border-gray-100">
        <div className="container-wide px-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Washington Joint Custody Child Support Calculator 2026
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
              Calculate child support for shared parenting schedules using the official 2026 Washington State economic table.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50/50">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* INPUT PANEL */}
            <div className="lg:col-span-7 space-y-6">
              <div className="card-standard !p-6 md:!p-8 shadow-sm">

                {/* SECTION 1: INCOME */}
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <Scale size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Section 1 — Income</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="input-label mb-2">Income Cycle</span>
                      <div className="flex bg-white border border-[var(--color-bg-border)] rounded-xl p-1 gap-1 h-12">
                        <button onClick={() => setIncomeType("monthly")} className={`flex-1 rounded-lg text-sm font-bold transition-all ${incomeType === "monthly" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>Monthly Net</button>
                        <button onClick={() => setIncomeType("yearly")} className={`flex-1 rounded-lg text-sm font-bold transition-all ${incomeType === "yearly" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>Yearly Net</button>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="input-label">Number of Children</label>
                      <select value={childrenCount} onChange={(e) => setChildrenCount(Number(e.target.value))} className="input-standard">
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white rounded-xl border border-gray-100">
                    <div>
                      <label className="input-label">Parent 1 Monthly Net Income</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input type="number" value={parent1Income} onChange={(e) => setParent1Income(e.target.value)} placeholder="0" className="input-standard pl-8" />
                      </div>
                    </div>
                    <div>
                      <label className="input-label">Parent 2 Monthly Net Income</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input type="number" value={parent2Income} onChange={(e) => setParent2Income(e.target.value)} placeholder="0" className="input-standard pl-8" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="input-label">Who pays support?</span>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <button onClick={() => setPayingParent("P1")} className={toggleBtn(payingParent === "P1")}>Parent 1</button>
                      <button onClick={() => setPayingParent("P2")} className={toggleBtn(payingParent === "P2")}>Parent 2</button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Usually the parent with higher income and less residential time pays support.
                    </p>
                  </div>
                </div>

                {/* SECTION 2: CUSTODY SCHEDULE */}
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Calendar size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Section 2 — Custody Schedule</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {["50/50", "60/40", "70/30", "80/20", "custom"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCustodyType(type)}
                        className={`px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${custodyType === type ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-purple-200'}`}
                      >
                        {type === 'custom' ? 'Custom %' : type + (type === '50/50' ? ' Equal Time' : ' Split')}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {custodyType === "custom" && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-6 p-6 bg-purple-50 rounded-xl border border-purple-100">
                          <div>
                            <label className="input-label text-purple-900 text-xs">Paying parent time %</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={customPayingTime}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomPayingTime(val);
                                  const n = parseFloat(val);
                                  if (!isNaN(n)) setCustomReceivingTime((100 - n).toString());
                                }}
                                className="input-standard pr-8"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                          </div>
                          <div>
                            <label className="input-label text-purple-900 text-xs">Receiving parent time %</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={customReceivingTime}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomReceivingTime(val);
                                  const n = parseFloat(val);
                                  if (!isNaN(n)) setCustomPayingTime((100 - n).toString());
                                }}
                                className="input-standard pr-8"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* VISUAL TIME SPLIT BAR */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-blue-600">Receiving: {receivingParentTime}%</span>
                      <span className="text-purple-600">Paying: {payingParentTime}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${receivingParentTime}%` }} />
                      <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${payingParentTime}%` }} />
                    </div>
                    <p className="text-sm text-gray-500 italic text-center mt-2">
                      Child lives with receiving parent {receivingParentTime}% of time. Paying parent has child {payingParentTime}% of time.
                    </p>
                  </div>
                </div>

                {/* SECTION 3: PARENTING CREDIT */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                      <h3 className="font-bold text-blue-900">Apply parenting time credit?</h3>
                      <p className="text-xs text-blue-700 max-w-md mt-1">
                        Washington courts may reduce child support when the paying parent has significant residential time under RCW 26.19.075.
                      </p>
                    </div>
                    <button
                      onClick={() => setUseCredit(!useCredit)}
                      className={`w-14 h-8 rounded-full relative transition-colors ${useCredit ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${useCredit ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 px-4">
                    The standard reference is 25% of Line 9. Default is ON for joint custody.
                  </p>
                </div>

                {!isValid && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800">
                    <AlertCircle size={20} />
                    <p className="text-sm font-bold">Percentages must add up to 100%. Currently showing { (parseFloat(customPayingTime)||0) + (parseFloat(customReceivingTime)||0) }%. Please adjust.</p>
                  </div>
                )}

              </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div key="empty" className="card-standard text-center py-20 bg-white shadow-sm border-dashed border-2 border-gray-200">
                    <Calculator size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">Enter income and schedule to see results</p>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                    {/* CREDIT EXPLANATION CARD */}
                    {useCredit && (
                      <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Shield size={18} />
                          </div>
                          <h3 className="font-bold">Custody Adjustment Applied</h3>
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                          Based on your <strong>{result.payingParentTime}%</strong> residential time, your estimated parenting credit is <strong>{Math.round(result.creditPercent * 100)}%</strong>.
                        </p>
                        <div className="text-2xl font-bold">
                          -{curFormatter.format(result.creditAmount)}/mo reduction
                        </div>
                      </div>
                    )}

                    {/* MAIN RESULTS DISPLAY */}
                    <div className="card-standard !p-0 overflow-hidden shadow-xl border-gray-200 bg-white">
                      <div className="p-6 sm:p-8 space-y-6">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Scale size={14} /> Income Breakdown
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">P1 Monthly Net Income</span>
                            <span className="font-bold">{curFormatter.format(result.netP1)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">P2 Monthly Net Income</span>
                            <span className="font-bold">{curFormatter.format(result.netP2)}</span>
                          </div>
                          <div className="pt-2 border-t flex justify-between font-bold">
                            <span>Combined Net Income</span>
                            <span>{curFormatter.format(result.combinedIncome)}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold text-blue-600 uppercase">P1 Share: {Math.round(result.shareP1 * 100)}%</span>
                            <span className="text-[10px] font-bold text-purple-600 uppercase">P2 Share: {Math.round(result.shareP2 * 100)}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-blue-600" style={{ width: `${result.shareP1 * 100}%` }} />
                            <div className="h-full bg-purple-600" style={{ width: `${result.shareP2 * 100}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 bg-gray-50 border-y border-gray-100 space-y-6">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Calculator size={14} /> Support Calculation
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">Total Basic Obligation</span>
                              <span className="text-[11px] text-gray-500">2026 table · {result.children} children</span>
                            </div>
                            <span className="font-bold">{curFormatter.format(result.baseSupport)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>{payingParent} Proportional Share</span>
                            <span className="font-bold">{curFormatter.format(result.breakdown.baseSupport)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Custody Adjustment</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Custody Schedule</span>
                            <span className="font-bold">{custodyType === 'custom' ? 'Custom' : custodyType}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Standard Obligation (Line 9)</span>
                            <span className="font-bold">{curFormatter.format(result.line9)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-blue-600">
                            <span className="font-semibold">Parenting Time Credit ({Math.round(result.creditPercent * 100)}%)</span>
                            <span className="font-bold">-{curFormatter.format(result.creditAmount)}</span>
                          </div>
                        </div>
                      </div>

                      {result.ssrApplied && (
                        <div className="p-6 sm:p-8 border-t border-gray-100 space-y-2">
                           <h4 className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">SSR Protection Applied</h4>
                           <div className="flex justify-between text-sm text-amber-700">
                             <span>RCW 26.19.065 Adjustment</span>
                             <span className="font-bold">-{curFormatter.format(Math.abs(result.breakdown.ssrAdjustment))}</span>
                           </div>
                        </div>
                      )}

                      <div className="p-8 bg-blue-600 text-white">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-bold uppercase tracking-wider opacity-80">Monthly Transfer</span>
                          <span className="text-5xl font-black">{curFormatter.format(result.finalTransfer)}<span className="text-lg opacity-60 ml-1">/mo</span></span>
                        </div>
                        <div className="pt-4 border-t border-white/20 text-center font-bold">
                          Parent {payingParent === 'P1' ? '1' : '2'} pays Parent {payingParent === 'P1' ? '2' : '1'}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                      <div className="flex gap-3">
                        <AlertCircle className="text-amber-600 shrink-0 mt-1" size={20} />
                        <div className="space-y-4">
                          <h4 className="font-bold text-amber-900">⚠️ Important Note About Joint Custody</h4>
                          <p className="text-sm text-amber-800 leading-relaxed">
                            The parenting time credit is a deviation from the standard calculation under RCW 26.19.075. Courts are not required to grant this credit automatically.
                          </p>
                          <ul className="text-sm text-amber-800 space-y-2 list-disc pl-4">
                            <li>Higher income parent typically still pays support to equalize resources.</li>
                            <li>The credit is not automatic — you must request it in writing.</li>
                            <li>Actual court orders may differ from this estimate.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link href="/worksheet" className="btn btn-primary btn-primary-lg shadow-lg">
                        Go to Professional Worksheet Wizard
                        <ArrowRight size={20} />
                      </Link>
                      <button onClick={() => window.print()} className="btn btn-secondary btn-secondary-lg">
                        <Printer size={20} />
                        Print Calculation Report
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT SECTION ───────────────────────────────────── */}
      <section className="py-20 bg-white no-print">
        <div className="container-wide px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">How Joint Custody Affects Child Support in Washington State</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Washington State calculates child support using the Income Shares Model under RCW 26.19. Even with a 50/50 custody schedule child support is rarely zero. The parent with higher income typically pays support to ensure children have equal resources in both households.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">The Parenting Time Credit Explained</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                When the paying parent has significant residential time the court may grant a parenting time credit (deviation) under RCW 26.19.075. Washington uses 25% of the basic obligation on Line 9 as a reference point for this credit. The credit is not automatic — you must request it in writing with evidence of your actual residential schedule.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">50/50 Custody Child Support Example</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[10px]">P1 Net Income</span>
                    <span className="text-lg font-bold text-gray-900">$5,000</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[10px]">P2 Net Income</span>
                    <span className="text-lg font-bold text-gray-900">$3,000</span>
                  </div>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>Combined income: <strong>$8,000</strong></p>
                  <p>2026 Table at $8,000 / 2 children: <strong>$960 per child × 2 = $1,920</strong></p>
                  <p>P1 income share: <strong>62.5%</strong></p>
                  <p>P1 obligation: $1,920 × 62.5% = <strong>$1,200</strong></p>
                  <p>Parenting time credit (50/50 = 25%): <strong>$1,200 × 25% = $300</strong></p>
                  <div className="p-6 bg-blue-600 text-white rounded-2xl">
                    <div className="text-sm font-bold uppercase opacity-80">Final Transfer Result</div>
                    <div className="text-3xl font-black mt-1">$900/mo</div>
                    <p className="mt-2 font-medium">Parent 1 pays Parent 2: $900/mo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">When Is Child Support Zero in Joint Custody?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Child support can be very low or approach zero in joint custody cases when both parents earn nearly equal incomes AND have equal residential time. However Washington courts rarely order exactly zero support as children are entitled to benefit from both parents&apos; combined income.
              </p>
            </div>

            <div className="pt-16 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} />
            </div>

          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 no-print">
        <div className="container-wide px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Need a more detailed breakdown?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/worksheet" className="btn btn-primary">Try the Professional Worksheet Wizard</Link>
            <Link href="/washington-courts" className="btn btn-secondary">Find your County Court Guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

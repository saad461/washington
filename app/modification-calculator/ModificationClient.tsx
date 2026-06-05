"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator, Info, ArrowLeft, CheckCircle, AlertCircle, Printer, Scale, Shield, Clock, TrendingUp
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { motion, AnimatePresence } from "framer-motion";
import PrintReport from "@/components/calculator/PrintReport";
import FAQAccordion from "@/components/FAQAccordion";
import IncomeHelper from "@/components/calculator/IncomeHelper";
import AttorneyCTA from "@/components/calculator/AttorneyCTA";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";
import HistoryPanel from "@/components/calculator/HistoryPanel";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const perFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
});

function sanitizeIncome(raw: string): string {
  if (raw === "" || raw === "-") return "";
  const n = parseFloat(raw);
  if (!isFinite(n) || n < 0) return "0";
  return raw;
}

interface ModificationClientProps {
  faqs: { question: string; answer: string }[];
}

export default function ModificationClient({ faqs }: ModificationClientProps) {
  const [orderDate, setOrderDate] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [originalP1Net, setOriginalP1Net] = useState("");
  const [originalP2Net, setOriginalP2Net] = useState("");
  const [currentP1Net, setCurrentP1Net] = useState("");
  const [currentP2Net, setCurrentP2Net] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [reason, setReason] = useState("Income change");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const result = useMemo(() => {
    // Calculate original obligation using 2026 schedule and original incomes
    const originalCalc = calculateChildSupport({
      "incomeType": { p1: "monthly" },
      "1a": { p1: parseFloat(originalP1Net) || 0, p2: parseFloat(originalP2Net) || 0 },
      "5_children": { p1: childrenCount },
    });

    // Calculate new obligation using 2026 schedule and current incomes
    const newCalc = calculateChildSupport({
      "incomeType": { p1: "monthly" },
      "1a": { p1: parseFloat(currentP1Net) || 0, p2: parseFloat(currentP2Net) || 0 },
      "5_children": { p1: childrenCount },
    });

    const originalObligation = originalCalc.obligationP1; // Assuming P1 is payer
    const newObligation = newCalc.obligationP1;

    const dollarDiff = newObligation - originalObligation;
    const percentChange = originalObligation > 0 ? (newObligation - originalObligation) / originalObligation : 0;

    // Threshold 1: Amount change >= 15%
    const threshold1Met = Math.abs(percentChange) >= 0.15;

    // Threshold 2: Time >= 3 years
    let yearsPassed = 0;
    let threshold2Met = false;
    if (orderDate) {
      const start = new Date(orderDate);
      const end = new Date(); // Current date (2026 in context of task)
      yearsPassed = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      threshold2Met = yearsPassed >= 3;
    }

    const modificationWarranted = threshold1Met || threshold2Met;

    return {
      originalObligation,
      newObligation,
      dollarDiff,
      percentChange,
      yearsPassed,
      threshold1Met,
      threshold2Met,
      modificationWarranted
    };
  }, [orderDate, originalP1Net, originalP2Net, currentP1Net, currentP2Net, childrenCount]);

  const toggleValue = (val: number) => isYearly ? val * 12 : val;

  return (
    <div className="flex-1 w-full bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col gap-4">
            <p className="eyebrow">
              RCW 26.09.170 · 2026 Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Support Modification Calculator 2026</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Life circumstances change — income goes up or down, custody arrangements shift, children grow up. Washington State law allows either parent to request a modification to an existing child support order when certain thresholds are met. This calculator uses the 2026 Washington State Child Support Schedule and RCW 26.09.170 to estimate whether your current order qualifies for modification.
            </p>
          </div>
        </div>
      </section>

      <section className="section-default bg-[var(--color-bg-subtle)] pb-4">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* INPUT PANEL */}
            <div className="lg:col-span-7 no-print">
              <div className="card-standard shadow-[var(--shadow-card-md)] !p-6 md:!p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Clock size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Existing Order Context</h2>
                </div>

                <div className="space-y-8">
                  <IncomeHelper
                    label="Not sure of current monthly net income? Estimate it here"
                    targets={[
                      { label: "P1", onUse: (amt) => setCurrentP1Net(amt) },
                      { label: "P2", onUse: (amt) => setCurrentP2Net(amt) }
                    ]}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="order-date" className="input-label">Current Court Order Date</label>
                      <input
                        id="order-date"
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="input-standard w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="current-amount" className="input-label">Current Monthly Order Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="current-amount"
                          type="number"
                          value={currentAmount}
                          onChange={(e) => setCurrentAmount(sanitizeIncome(e.target.value))}
                          placeholder="e.g. 650"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Original Incomes</h3>
                      <div>
                        <label htmlFor="original-p1-net" className="input-label">P1 Original Monthly Net</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            id="original-p1-net"
                            type="number"
                            value={originalP1Net}
                            onChange={(e) => setOriginalP1Net(sanitizeIncome(e.target.value))}
                            className="input-standard pl-8 w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="original-p2-net" className="input-label">P2 Original Monthly Net</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            id="original-p2-net"
                            type="number"
                            value={originalP2Net}
                            onChange={(e) => setOriginalP2Net(sanitizeIncome(e.target.value))}
                            className="input-standard pl-8 w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Current Incomes</h3>
                      <div>
                        <label htmlFor="current-p1-net" className="input-label">P1 Current Monthly Net</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            id="current-p1-net"
                            type="number"
                            value={currentP1Net}
                            onChange={(e) => setCurrentP1Net(sanitizeIncome(e.target.value))}
                            className="input-standard pl-8 w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="current-p2-net" className="input-label">P2 Current Monthly Net</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            id="current-p2-net"
                            type="number"
                            value={currentP2Net}
                            onChange={(e) => setCurrentP2Net(sanitizeIncome(e.target.value))}
                            className="input-standard pl-8 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="children-count" className="input-label">Number of Children</label>
                      <select
                        id="children-count"
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(Number(e.target.value))}
                        className="input-standard w-full"
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="input-label">Reason for Modification</label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option>Income change</option>
                        <option>Job loss</option>
                        <option>New child in household</option>
                        <option>Child turned 18</option>
                        <option>Custody arrangement change</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Threshold Analysis
                </h3>

                <div className="space-y-6">
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

                  <div className="card-standard !p-0 overflow-hidden shadow-[var(--shadow-card-md)] border-gray-200">
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Original Obligation (2026 Table)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.originalObligation))}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">New Obligation (2026 Table)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.newObligation))}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold">Percentage Change</span>
                        <span className={`font-bold ${result.threshold1Met ? "text-blue-600" : "text-gray-900"}`}>
                          {result.percentChange > 0 ? "+" : ""}{perFormatter.format(result.percentChange)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100 space-y-4">
                      <div className={`p-4 rounded-xl border flex items-center justify-between ${result.threshold1Met ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                          <TrendingUp size={18} className={result.threshold1Met ? "text-blue-600" : "text-gray-400"} />
                          <span className="text-sm font-bold">Threshold 1: 15% Change</span>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${result.threshold1Met ? "text-blue-600" : "text-gray-400"}`}>
                          {result.threshold1Met ? "MET" : "NOT MET"}
                        </span>
                      </div>
                      <div className={`p-4 rounded-xl border flex items-center justify-between ${result.threshold2Met ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                          <Clock size={18} className={result.threshold2Met ? "text-blue-600" : "text-gray-400"} />
                          <span className="text-sm font-bold">Threshold 2: 3 Years Passed</span>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${result.threshold2Met ? "text-blue-600" : "text-gray-400"}`}>
                          {result.threshold2Met ? "MET" : "NOT MET"}
                        </span>
                      </div>
                    </div>

                    <div className={`p-6 sm:p-8 border-t ${result.modificationWarranted ? "bg-blue-50/30 border-blue-100" : "bg-gray-50/50 border-gray-100"}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Final Verdict</span>
                        <div className="text-right">
                          <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${result.modificationWarranted ? "text-blue-600" : "text-gray-600"}`}>
                            {result.modificationWarranted ? "MODIFICATION WARRANTED" : "NOT WARRANTED"}
                          </div>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${result.modificationWarranted ? "text-blue-400" : "text-gray-400"}`}>
                            {result.modificationWarranted ? "Threshold Met" : "Thresholds Not Met"}
                          </p>
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
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">6</div>
                                <p>Original obligation under 2026 schedule: <strong>{curFormatter.format(result.originalObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">7</div>
                                <p>New obligation under 2026 schedule: <strong>{curFormatter.format(result.newObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">8</div>
                                <p>Difference: <strong>{curFormatter.format(result.dollarDiff)}</strong> ({perFormatter.format(result.percentChange)})</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">9</div>
                                <p>15% threshold: <strong>{result.threshold1Met ? "met" : "not met"}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">10</div>
                                <p>3 year threshold: <strong>{result.threshold2Met ? "met" : "not met"}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">11</div>
                                <p>Verdict: <strong>modification {result.modificationWarranted ? "warranted" : "not warranted"}</strong></p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <HistoryPanel
                    storageKey="wscss_history_modification"
                    currentInputs={{ orderDate, currentAmount, originalP1Net, originalP2Net, currentP1Net, currentP2Net, childrenCount, reason }}
                    currentResult={result.modificationWarranted ? 1 : 0}
                    onReload={(inputs) => {
                      setOrderDate(inputs.orderDate);
                      setCurrentAmount(inputs.currentAmount);
                      setOriginalP1Net(inputs.originalP1Net);
                      setOriginalP2Net(inputs.originalP2Net);
                      setCurrentP1Net(inputs.currentP1Net);
                      setCurrentP2Net(inputs.currentP2Net);
                      setChildrenCount(inputs.childrenCount);
                      setReason(inputs.reason);
                    }}
                    formatResult={(val) => val === 1 ? "Warranted" : "Not Warranted"}
                  />

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <button onClick={() => window.print()} className="btn btn-secondary w-full">
                      <Printer size={18} /> Print Results
                    </button>
                  </div>

                  <AttorneyCTA />
                  <CrossSuggestions calculatorType="modification" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW CONTENT BLOCK */}
      <section className="section-default bg-white !pt-0">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 text-gray-700">

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Do You Qualify to Change Your Child Support in Washington State?</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Whether your income has shifted, your child’s needs have grown, or you want to apply the newly updated <strong className="text-gray-900 font-bold">2026 Washington State Child Support Schedule</strong>, our Qualification Check Tool reviews your situation against strict state rules. In Washington, updating an order falls under two legal paths: a full <strong className="text-gray-900 font-bold">Modification</strong> or an <strong className="text-gray-900 font-bold">Adjustment</strong> under RCW 26.09.170.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Use this quick tool to see if your current scenario passes the legal threshold required by family law courts across all 39 counties.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-slate-800 rounded-r-md shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">💡</span>
                    <div className="space-y-2">
                      <h4 className="font-bold text-blue-900 uppercase tracking-wide text-sm">CRITICAL 2026 LEGAL UPDATE</h4>
                      <p className="leading-relaxed">
                        On January 1, 2026, Washington State expanded its child support economic tables to cover a combined monthly net income of up to <strong className="font-bold">$50,000</strong> (previously capped at $12,000). If you or the other parent are high earners, your current transfer payment may be vastly outdated. This structural shift alone provides the legal grounds to check your case eligibility immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">3 Legal Fast-Tracks for a Child Support Update in 2026</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Under Washington State law (RCW 26.09.170), you do not always have to prove a massive crisis to get a judge to review your support worksheets. You can fast-track a review if you meet any of these three specific criteria:
                </p>

                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                      The 24-Month "No-Fault" Rule
                    </h3>
                    <p className="leading-relaxed pl-11">
                      If <strong className="text-gray-900 font-bold">24 months or more</strong> have passed since your current child support order was signed or last modified, you can request an adjustment based entirely on changes to parental income or the 2026 economic table standards. You do <em>not</em> have to prove a "substantial change of circumstances" under this statutory provision.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                      The Age Category Transition
                    </h3>
                    <p className="leading-relaxed pl-11">
                      The Washington State Child Support Schedule separates kids into two age tiers: <strong className="text-gray-900 font-bold">ages 0–11</strong> and <strong className="text-gray-900 font-bold">ages 12–18</strong>. If your child has recently turned 12 since your last order was filed, you are legally eligible to request an upward adjustment to account for the higher baseline costs of raising an older child.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                      Post-Secondary Educational Support
                    </h3>
                    <p className="leading-relaxed pl-11">
                      Is your teenager finishing high school and planning to attend college or trade school? You can file a motion before their 18th birthday to extend child support payments to cover university tuition, books, and living expenses under RCW 26.09.170(6)(c).
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-slate-800 rounded-r-md shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div className="space-y-2">
                      <h4 className="font-bold text-red-900 uppercase tracking-wide text-sm">WARNING: RETROACTIVE TRANSFERS ARE RARE</h4>
                      <p className="leading-relaxed">
                        In Washington State, child support updates are strictly <strong className="font-bold text-red-900">prospective</strong>. This means any financial relief or modification granted by a judge will only apply from the <em className="font-bold">exact date you formally file and serve your petition</em> moving forward. Waiting to file because of an informal verbal agreement can cost you thousands of dollars that cannot legally be recovered retroactively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">What Qualifies as a "Substantial Change in Circumstances"?</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  If your order is less than one year old, the court will dismiss an adjustment request unless you establish a sudden, unanticipated, and permanent shift in your life. Valid examples that our tool evaluates include:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <p className="text-gray-600"><strong className="text-gray-900 font-bold">Involuntary Income Cuts:</strong> Being laid off, suffering a company downsizing, or encountering a health status change that permanently reduces your earning capacity.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <p className="text-gray-600"><strong className="text-gray-900 font-bold">The 15% Modification Threshold:</strong> The Division of Child Support (DCS) generally looks for a projected change of at least 15% in the net support amount before accepting a review request.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <p className="text-gray-600"><strong className="text-gray-900 font-bold">A New Child to Support:</strong> If you have had a new biological child with a new partner, the court may grant a downward deviation to ensure resources are equitably balanced among all your dependents.</p>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-blue-600/20"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
                      <span className="text-3xl">🛠️</span>
                      NEXT STEP TO TAKE
                    </h3>
                    <p className="text-slate-300 text-lg max-w-xl">
                      If our tool indicates that you qualify for a change, run your updated income numbers through our primary <strong className="text-white font-bold">Washington State Child Support Calculator</strong>. This will generate a direct side-by-side estimate showing exactly how your monthly payment obligation will swing under the new 2026 guidelines.
                    </p>
                  </div>
                  <Link
                    href="/joint-custody-calculator"
                    className="btn bg-blue-600 hover:bg-blue-500 text-white border-none px-8 py-4 h-auto text-lg font-bold shadow-lg shadow-blue-900/20 whitespace-nowrap"
                  >
                    View 2026 Calculator
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER SECTION */}
      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">When Can You Modify Child Support in Washington State</h2>
                <p className="text-gray-600 leading-relaxed">
                  Washington State law permits a modification request when at least one of two conditions is met. Either the recalculated support amount differs from the current order by 15% or more, or it has been at least 3 years since the order was entered or last modified. You only need to meet one of these two thresholds — not both.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">The 3 Year Rule Explained</h2>
                <p className="text-gray-600 leading-relaxed">
                  Even if income has not changed dramatically, Washington State allows either parent to request a modification every 3 years as a matter of right. This ensures child support stays reasonably aligned with both parents' current financial situations over time.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">What Happens After a Modification Is Warranted</h2>
                <p className="text-gray-600 leading-relaxed">
                  This calculator tells you whether a modification is likely warranted based on the numbers. If it is, the next step is filing a petition for modification with your county Superior Court or working with the Washington State Division of Child Support. An attorney can help ensure the process goes smoothly.
                </p>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} renderSchema={false} />
            </div>

            <div className="p-8 bg-amber-50 border border-amber-100 rounded-2xl">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Legal Disclaimer
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Meeting a statutory threshold (15% change or 3 years passed) allows you to petition for a modification, but it does not guarantee that the court will grant one. Judges have broad discretion to review the entire financial situation of both parents. This tool should not be considered legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PrintReport
        caseContext={[
          { label: "Current Order Date:", value: orderDate || "Not provided" },
          { label: "Original P1 Net:", value: curFormatter.format(parseFloat(originalP1Net) || 0) },
          { label: "Original P2 Net:", value: curFormatter.format(parseFloat(originalP2Net) || 0) },
        ]}
        calculationBase={[
          { label: "Current P1 Net:", value: curFormatter.format(parseFloat(currentP1Net) || 0) },
          { label: "Current P2 Net:", value: curFormatter.format(parseFloat(currentP2Net) || 0) },
          { label: "Children:", value: childrenCount },
        ]}
        analysisItems={[
          { label: "Original 2026 Obligation:", value: curFormatter.format(result.originalObligation) },
          { label: "New 2026 Obligation:", value: curFormatter.format(result.newObligation) },
          { label: "Percentage Change:", value: perFormatter.format(result.percentChange), isBold: true },
          { label: "Threshold 1 (15%):", value: result.threshold1Met ? "YES" : "NO" },
          { label: "Threshold 2 (3 Years):", value: result.threshold2Met ? "YES" : "NO" }
        ]}
        totalLabel="Verdict"
        totalValue={result.modificationWarranted ? "WARRANTED" : "NOT WARRANTED"}
        secondaryTotalLabel="Reasoning"
        secondaryTotalValue={result.modificationWarranted ? "Threshold Met" : "Thresholds Not Met"}
        assumptions="Based on RCW 26.09.170 and 2026 economic tables."
        disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
      />
    </div>
  );
}

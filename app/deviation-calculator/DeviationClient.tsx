"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator, ArrowLeft, CheckCircle, AlertCircle, Printer, Scale, Plus, Minus
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { convertGrossToNet } from "@/utils/taxUtils";
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

/* ─── Shared toggle button styles ─── */
function toggleBtn(active: boolean) {
  const base = "h-11 sm:h-12 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm select-none w-full cursor-pointer";
  if (active) return `${base} bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-card)]`;
  return `${base} bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-text-placeholder)]`;
}

function sanitizeIncome(raw: string): string {
  if (raw === "" || raw === "-") return "";
  const n = parseFloat(raw);
  if (!isFinite(n) || n < 0) return "0";
  return raw;
}

const DEVIATION_REASONS = [
  { id: "medical", label: "Extraordinary medical expenses" },
  { id: "educational", label: "Educational expenses" },
  { id: "transportation", label: "Long distance transportation costs" },
  { id: "debt", label: "Debt obligations prior to separation" },
  { id: "other_children", label: "Children from other relationships" },
  { id: "child_assets", label: "Significant assets of the child" },
];

interface DeviationClientProps {
  faqs: { question: string; answer: string }[];
}

export default function DeviationClient({ faqs }: DeviationClientProps) {
  const [obligorAnnual, setObligorAnnual] = useState("");
  const [obligeeAnnual, setObligeeAnnual] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [reasonAmounts, setReasonAmounts] = useState<Record<string, string>>({});
  const [deviationDirection, setDeviationDirection] = useState<"upward" | "downward">("upward");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const toggleReason = (id: string) => {
    setSelectedReasons(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const setAmount = (id: string, val: string) => {
    setReasonAmounts(prev => ({ ...prev, [id]: sanitizeIncome(val) }));
  };

  const result = useMemo(() => {
    const obligorNet = convertGrossToNet(parseFloat(obligorAnnual) || 0);
    const obligeeNet = convertGrossToNet(parseFloat(obligeeAnnual) || 0);

    const calc = calculateChildSupport({
      "incomeType": { p1: "monthly" },
      "1a": { p1: obligorNet, p2: obligeeNet },
      "5_children": { p1: childrenCount },
    });

    const standardObligation = calc.obligationP1; // P1 is obligor

    let totalDeviation = 0;
    selectedReasons.forEach(id => {
      totalDeviation += parseFloat(reasonAmounts[id]) || 0;
    });

    const adjustedObligation = deviationDirection === "upward"
      ? standardObligation + totalDeviation
      : Math.max(0, standardObligation - totalDeviation);

    const percentDiff = standardObligation > 0
      ? (adjustedObligation - standardObligation) / standardObligation
      : 0;

    return {
      netObligor: obligorNet,
      netObligee: obligeeNet,
      combined: calc.combinedIncome,
      standardObligation,
      totalDeviation,
      adjustedObligation,
      percentDiff,
      reasons: selectedReasons.map(id => ({
        label: DEVIATION_REASONS.find(r => r.id === id)?.label || id,
        amount: parseFloat(reasonAmounts[id]) || 0
      })),
      shareP1: calc.shareP1,
      shareP2: calc.shareP2,
      baseSupport: calc.baseSupport
    };
  }, [obligorAnnual, obligeeAnnual, childrenCount, selectedReasons, reasonAmounts, deviationDirection]);

  const toggleValue = (val: number) => isYearly ? val * 12 : val;

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col gap-4">
            <p className="eyebrow">
              RCW 26.19.075 · 2026 Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Support Deviation Calculator 2026</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Washington State child support begins with the standard schedule amount but courts can order more or less based on specific circumstances. This deviation calculator helps you estimate how qualifying factors under RCW 26.19.075 may adjust your support obligation above or below the 2026 Washington State Child Support Schedule amount.
            </p>
          </div>
        </div>
      </section>

      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 no-print">
              <div className="card-standard shadow-[var(--shadow-card-md)] !p-6 md:!p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Scale size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Standard Obligation</h2>
                </div>

                <div className="space-y-8">
                  <IncomeHelper
                    label="Not sure of monthly net income? Estimate it here"
                    targets={[
                      { label: "Obligor", onUse: (amt) => setObligorAnnual((parseFloat(amt) * 1.25 * 12).toString()) },
                      { label: "Obligee", onUse: (amt) => setObligeeAnnual((parseFloat(amt) * 1.25 * 12).toString()) }
                    ]}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="obligor-annual" className="input-label">Obligor Annual Gross</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="obligor-annual"
                          type="number"
                          value={obligorAnnual}
                          onChange={(e) => setObligorAnnual(sanitizeIncome(e.target.value))}
                          placeholder="e.g. 48,000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="obligee-annual" className="input-label">Obligee Annual Gross</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="obligee-annual"
                          type="number"
                          value={obligeeAnnual}
                          onChange={(e) => setObligeeAnnual(sanitizeIncome(e.target.value))}
                          placeholder="e.g. 18,000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                  </div>

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

                  <hr className="border-gray-200" />

                  <div>
                    <h3 className="text-lg font-bold mb-4">Deviation Factors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DEVIATION_REASONS.map(reason => (
                        <button
                          key={reason.id}
                          onClick={() => toggleReason(reason.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                            selectedReasons.includes(reason.id)
                              ? "bg-blue-50 border-blue-600 ring-2 ring-blue-100"
                              : "bg-white border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            selectedReasons.includes(reason.id) ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
                          }`}>
                            {selectedReasons.includes(reason.id) && <CheckCircle size={14} />}
                          </div>
                          <span className={`text-sm font-bold ${selectedReasons.includes(reason.id) ? "text-blue-900" : "text-gray-600"}`}>
                            {reason.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedReasons.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-bold">Deviation Amounts</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedReasons.map(id => (
                            <div key={id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <span className="text-sm font-bold text-gray-700">{DEVIATION_REASONS.find(r => r.id === id)?.label}</span>
                              <div className="relative max-w-[200px]">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                  type="number"
                                  value={reasonAmounts[id] || ""}
                                  onChange={(e) => setAmount(id, e.target.value)}
                                  placeholder="0.00"
                                  className="input-standard pl-8 w-full !h-10"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="input-label">Deviation Direction</label>
                          <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setDeviationDirection("upward")} className={toggleBtn(deviationDirection === "upward")}>
                              <Plus size={16} /> Upward
                            </button>
                            <button onClick={() => setDeviationDirection("downward")} className={toggleBtn(deviationDirection === "downward")}>
                              <Minus size={16} /> Downward
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Deviation Analysis
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
                        <span className="text-gray-500">Standard 2026 Obligation</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.standardObligation))}</span>
                      </div>
                      {result.totalDeviation > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Total Deviation ({deviationDirection})</span>
                          <span className={`font-bold ${deviationDirection === "upward" ? "text-blue-600" : "text-amber-600"}`}>
                            {deviationDirection === "upward" ? "+" : "-"}{curFormatter.format(toggleValue(result.totalDeviation))}
                          </span>
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {result.reasons.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100 space-y-3"
                        >
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Included Factors</h4>
                          {result.reasons.map((r, i) => (
                            <div key={i} className="flex justify-between text-[13px]">
                              <span className="text-gray-600">{r.label}</span>
                              <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(r.amount))}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="p-6 sm:p-8 bg-blue-50/30 border-t border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Adjusted Support Amount</span>
                        <div className="text-right">
                          <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                            {curFormatter.format(toggleValue(result.adjustedObligation))}
                          </div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1">
                            {result.percentDiff > 0 ? "+" : ""}{perFormatter.format(result.percentDiff)} from 2026 standard
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
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                                <p>We took P1 income <strong>{curFormatter.format(result.netObligor)}</strong> and P2 income <strong>{curFormatter.format(result.netObligee)}</strong> to get combined income <strong>{curFormatter.format(result.combined)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                                <p>We looked up combined income with {childrenCount} children in the 2026 Washington Schedule table — basic obligation: <strong>{curFormatter.format(result.baseSupport)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                                <p>P1 income share = <strong>{Math.round(result.shareP1 * 100)}%</strong> | P2 income share = <strong>{Math.round(result.shareP2 * 100)}%</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">4</div>
                                <p>P1 proportional share = <strong>{curFormatter.format(result.standardObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">5</div>
                                <p>Monthly transfer payment = <strong>{curFormatter.format(result.standardObligation)}</strong> (P1 pays P2)</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">6</div>
                                <p>Standard obligation: <strong>{curFormatter.format(result.standardObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">7</div>
                                <div className="flex-1">
                                  <p>Deviation reasons:</p>
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {result.reasons.length > 0 ? result.reasons.map((r, i) => (
                                      <li key={i}>{r.label}: {curFormatter.format(r.amount)}</li>
                                    )) : <li>No reasons selected</li>}
                                  </ul>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">8</div>
                                <p>Total deviation: <strong>{curFormatter.format(result.totalDeviation)}</strong> ({deviationDirection})</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">9</div>
                                <p>Final adjusted amount: <strong>{curFormatter.format(result.adjustedObligation)}</strong></p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <HistoryPanel
                    storageKey="wscss_history_deviation"
                    currentInputs={{ obligorAnnual, obligeeAnnual, childrenCount, selectedReasons, reasonAmounts, deviationDirection }}
                    currentResult={result.adjustedObligation}
                    onReload={(inputs) => {
                      setObligorAnnual(inputs.obligorAnnual);
                      setObligeeAnnual(inputs.obligeeAnnual);
                      setChildrenCount(inputs.childrenCount);
                      setSelectedReasons(inputs.selectedReasons);
                      setReasonAmounts(inputs.reasonAmounts);
                      setDeviationDirection(inputs.deviationDirection);
                    }}
                    formatResult={(val) => curFormatter.format(val)}
                  />

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <button onClick={() => window.print()} className="btn btn-secondary w-full">
                      <Printer size={18} /> Print Results
                    </button>
                  </div>

                  <AttorneyCTA />
                  <CrossSuggestions calculatorType="deviation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">What Is a Child Support Deviation in Washington State</h2>
                <p className="text-gray-600 leading-relaxed">
                  A deviation is a court approved adjustment to the standard child support amount. Washington law under RCW 26.19.075 allows either parent to request a deviation when specific financial circumstances make the standard amount unjust or inappropriate. Deviations can go upward — increasing support — or downward — reducing it.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Common Reasons for Upward Deviation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Courts may order above standard support when a child has extraordinary medical needs, significant educational expenses such as private school or tutoring, or when long distance parenting arrangements create substantial transportation costs that one parent bears alone.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Common Reasons for Downward Deviation</h2>
                <p className="text-gray-600 leading-relaxed">
                  Courts may reduce support below the standard amount when the paying parent has substantial prior debts from before the separation, supports children from other relationships, or when the child has significant independent assets or income of their own.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">How Courts Decide on Deviations</h2>
                <p className="text-gray-600 leading-relaxed">
                  A judge does not automatically grant a deviation request. The requesting parent must show that applying the standard amount would be unjust given the specific circumstances. This calculator helps you estimate the adjusted amount but a family law attorney should be consulted before requesting a formal deviation.
                </p>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100 space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Grounds for a Child Support Deviation in Washington State</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  When using a deviation calculator, it is vital to know which statutory factors the court legally recognizes. Under Washington law (RCW 26.19.075), judges will not grant a deviation for lifestyle preferences. You must qualify under specific legal categories.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="card-standard p-6 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">1. Nonrecurring Income or One-Time Financial Windfalls</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      If a parent’s income is temporarily inflated by a one-time bonus, inheritance, lottery winnings, or a short-term real estate sale, the court may deviate downward from using that specific year's tax returns. Courts can isolate baseline income from these nonrecurring windfalls when determining a just transfer payment.
                    </p>
                  </div>

                  <div className="card-standard p-6 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">2. Income of Other Adults in the Household</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      While a step-parent or new live-in partner has no legal duty to support your child, their financial contributions to rent, groceries, and utilities change your financial position. A judge may use this household income to deny a downward deviation or justify an upward adjustment.
                    </p>
                  </div>

                  <div className="card-standard p-6 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">3. Extraordinary Expenses and Debt Obligations</h3>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                      <p>Standard child support schedules assume basic cost-of-living metrics. You can request a deviation if you pay for:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Special Needs:</strong> Extraordinary medical, dental, or mental health costs.</li>
                        <li><strong>Educational Needs:</strong> Specialized private schooling or tutoring for a disabled child.</li>
                        <li><strong>Prior Debt:</strong> Court-ordered debt from a previous marriage that severely limits current income.</li>
                        <li><strong>Long-Distance Travel:</strong> High costs associated with transporting the child between parents for residential time.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-standard p-6 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">4. Children from Other Relationships</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      If the paying parent has a legal duty to support biological children from a different relationship, Washington law allows for a downward deviation. This ensures that children from a first or subsequent family are not financially starved by the current child support transfer payment.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Was My Child Support Deviation Denied?</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Even if our deviation tool shows you qualify for an adjustment, a family law judge can still deny your request. The two most common reasons for denial in Washington courts are:
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Scale size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Substantial Hardship Rule</h3>
                      <p className="text-gray-600 leading-relaxed">
                        The court will reject any downward deviation if reducing the support payment pushes the receiving parent's household below the federal poverty line or leaves them unable to provide basic shelter and food for the child.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Printer size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Lack of Strict Documentation</h3>
                      <p className="text-gray-600 leading-relaxed">
                        You cannot use estimates. If you request a deviation for extraordinary medical bills or travel, you must provide the court with receipts, clear invoices, and a history of payment records.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
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
                Deviations from the Washington State child support schedule are determined by a judge based on the standards in RCW 26.19.075. This calculator provides an estimate based on the values you enter, but the final determination requires written findings of fact from a court.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PrintReport
        caseContext={[
          { label: "Obligor Annual Gross:", value: curFormatter.format(parseFloat(obligorAnnual) || 0) },
          { label: "Obligee Annual Gross:", value: curFormatter.format(parseFloat(obligeeAnnual) || 0) },
          { label: "Combined Income:", value: curFormatter.format(result.combined) },
        ]}
        calculationBase={[
          { label: "Children:", value: childrenCount },
          { label: "Standard Obligation:", value: curFormatter.format(result.standardObligation) },
        ]}
        analysisItems={[
          ...result.reasons.map(r => ({
            label: r.label,
            value: curFormatter.format(r.amount),
          })),
          { label: "Deviation Direction:", value: deviationDirection.toUpperCase(), isBold: true },
          { label: "Total Deviation:", value: curFormatter.format(result.totalDeviation), isBold: true }
        ]}
        totalLabel="Adjusted Support Amount"
        totalValue={curFormatter.format(result.adjustedObligation)}
        secondaryTotalLabel="Percentage Change"
        secondaryTotalValue={perFormatter.format(result.percentDiff)}
        assumptions="Based on RCW 26.19.075 and 2026 economic tables. Net income estimated using simplified 2026 conversion."
        disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
      />
    </div>
  );
}

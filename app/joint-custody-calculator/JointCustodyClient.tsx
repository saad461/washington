"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Calculator, ArrowLeft, AlertCircle, Printer, Scale
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

interface JointCustodyClientProps {
  faqs: { question: string; answer: string }[];
}

export default function JointCustodyClient({ faqs }: JointCustodyClientProps) {
  const [parentAAnnual, setParentAAnnual] = useState("");
  const [parentBAnnual, setParentBAnnual] = useState("");
  const [childrenCount, setChildrenCount] = useState(1);
  const [parentADays, setParentADays] = useState("182");
  const [parentBDays, setParentBDays] = useState("183");
  const [hasChildcare, setHasChildcare] = useState(false);
  const [monthlyChildcare, setMonthlyChildcare] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  // What-If Sliders State
  const [whatIfADays, setWhatIfADays] = useState<number | null>(null);

  const pADaysNum = parseInt(parentADays) || 0;
  const pBDaysNum = parseInt(parentBDays) || 0;

  const calculateResult = (pAAnn: string, pBAnn: string, childCount: number, pAD: number, pBD: number, hasCC: boolean, mCC: string) => {
    const pANet = convertGrossToNet(parseFloat(pAAnn) || 0);
    const pBNet = convertGrossToNet(parseFloat(pBAnn) || 0);
    const childcare = hasCC ? (parseFloat(mCC) || 0) : 0;

    // Use existing calculator engine for base obligation using NET incomes
    const calc = calculateChildSupport({
      "incomeType": { p1: "monthly" },
      "1a": { p1: pANet, p2: pBNet },
      "5_children": { p1: childCount },
    });

    const basicObligation = calc.baseSupport;
    const shareA = calc.shareP1;
    const shareB = calc.shareP2;

    const parentAStandardObligation = basicObligation * shareA;
    const parentBStandardObligation = basicObligation * shareB;

    // Residential credit applies if BOTH parents have 135+ days (per standard joint custody interpretation)
    const creditApplies = pAD >= 135 && pBD >= 135;

    let adjustedA = parentAStandardObligation;
    let adjustedB = parentBStandardObligation;

    if (creditApplies) {
      // Offset method: share * (days with other parent / 365)
      adjustedA = parentAStandardObligation * (pBD / 365);
      adjustedB = parentBStandardObligation * (pAD / 365);
    }

    const netSupport = adjustedA - adjustedB;

    const shareChildcareA = childcare * shareA;
    const shareChildcareB = childcare * shareB;

    let finalTransfer = 0;
    let payer = "Parent A";
    if (netSupport > 0) {
      finalTransfer = netSupport + shareChildcareA;
      payer = "Parent A";
    } else {
      finalTransfer = Math.abs(netSupport) + shareChildcareB;
      payer = "Parent B";
    }

    return {
      netA: pANet,
      netB: pBNet,
      combined: calc.combinedIncome,
      baseSupport: basicObligation,
      pADaysNum: pAD,
      pBDaysNum: pBD,
      creditApplies,
      parentAStandardObligation,
      parentBStandardObligation,
      adjustedA,
      adjustedB,
      finalTransfer,
      payer,
      childcare,
      shareChildcareA,
      shareChildcareB,
      shareA,
      shareB
    };
  };

  const result = useMemo(() => calculateResult(parentAAnnual, parentBAnnual, childrenCount, pADaysNum, pBDaysNum, hasChildcare, monthlyChildcare),
    [parentAAnnual, parentBAnnual, childrenCount, pADaysNum, pBDaysNum, hasChildcare, monthlyChildcare]);

  const whatIfResult = useMemo(() => {
    if (whatIfADays === null) return null;
    return calculateResult(parentAAnnual, parentBAnnual, childrenCount, whatIfADays, 365 - whatIfADays, hasChildcare, monthlyChildcare);
  }, [whatIfADays, parentAAnnual, parentBAnnual, childrenCount, hasChildcare, monthlyChildcare]);

  // Sync what-if slider
  useEffect(() => {
    if (pADaysNum >= 0) {
      if (whatIfADays === null) setWhatIfADays(pADaysNum);
    }
  }, [pADaysNum]);

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
              RCW 26.19.080 · 2026 Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State Joint Custody <span className="text-blue-600">Child Support Calculator 2026</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              When parents share residential time with their children, Washington State law requires a special adjustment to the standard child support calculation. This joint custody calculator applies the residential credit formula under RCW 26.19.080 using the 2026 Washington State Child Support Schedule to estimate your adjusted monthly support obligation.
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
                  <h2 className="text-xl font-bold">Calculation Inputs</h2>
                </div>

                <div className="space-y-8">
                  <IncomeHelper onUseAmount={(amt) => setParentAAnnual((parseFloat(amt) * 1.25 * 12).toString())} label="Parent A: Calculate annual gross from net monthly" />
                  <IncomeHelper onUseAmount={(amt) => setParentBAnnual((parseFloat(amt) * 1.25 * 12).toString())} label="Parent B: Calculate annual gross from net monthly" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="parent-a-annual" className="input-label">Parent A Annual Gross</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="parent-a-annual"
                          type="number"
                          value={parentAAnnual}
                          onChange={(e) => setParentAAnnual(sanitizeIncome(e.target.value))}
                          placeholder="e.g. 72,000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="parent-b-annual" className="input-label">Parent B Annual Gross</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="parent-b-annual"
                          type="number"
                          value={parentBAnnual}
                          onChange={(e) => setParentBAnnual(sanitizeIncome(e.target.value))}
                          placeholder="e.g. 36,000"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="parent-a-days" className="input-label">Parent A Days Per Year</label>
                      <input
                        id="parent-a-days"
                        type="number"
                        value={parentADays}
                        onChange={(e) => setParentADays(e.target.value)}
                        className="input-standard w-full"
                        min="0" max="365"
                      />
                    </div>
                    <div>
                      <label htmlFor="parent-b-days" className="input-label">Parent B Days Per Year</label>
                      <input
                        id="parent-b-days"
                        type="number"
                        value={parentBDays}
                        onChange={(e) => setParentBDays(e.target.value)}
                        className="input-standard w-full"
                        min="0" max="365"
                      />
                    </div>
                  </div>

                  {((pADaysNum >= 90 && pADaysNum < 135) || (pBDaysNum >= 90 && pBDaysNum < 135)) && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-blue-800 leading-relaxed">
                        <strong>Notice:</strong> While automatic baseline formulas calculate residential credits starting at 135 overnights, Washington judges possess the statutory discretion under <a href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.19.075" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-blue-200 underline-offset-2 hover:text-blue-900 transition-colors">RCW 26.19.075</a> to grant downward adjustments for anything over 90 overnights on a case-by-case basis.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="input-label">Work related childcare costs?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setHasChildcare(true)} className={toggleBtn(hasChildcare)}>Yes</button>
                      <button onClick={() => setHasChildcare(false)} className={toggleBtn(!hasChildcare)}>No</button>
                    </div>
                    {hasChildcare && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="input-label">Monthly childcare amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            type="number"
                            value={monthlyChildcare}
                            onChange={(e) => setMonthlyChildcare(sanitizeIncome(e.target.value))}
                            placeholder="e.g. 800"
                            className="input-standard pl-8 w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Calculation Results
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
                        <span className="text-gray-500">Parent A {isYearly ? 'Annual' : 'Monthly'} Net (Est.)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.netA))}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Parent B {isYearly ? 'Annual' : 'Monthly'} Net (Est.)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.netB))}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold">Combined Net Income</span>
                        <span className="font-bold text-blue-600">{curFormatter.format(toggleValue(result.combined))}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 bg-gray-50/50 border-y border-gray-100 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{isYearly ? 'Annual' : 'Basic'} Support Obligation</span>
                          <span className="text-[12px] text-gray-500">2026 Economic Table</span>
                        </div>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.baseSupport))}</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {result.creditApplies && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-6 sm:p-8 space-y-4"
                        >
                          <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Residential Credit (RCW 26.19.080)</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                              <span className="text-gray-700 font-medium">A Adjusted Obligation</span>
                              <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.adjustedA))}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700 font-medium">B Adjusted Obligation</span>
                              <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.adjustedB))}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="p-6 sm:p-8 bg-blue-50/30 border-t border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">{isYearly ? 'Annual' : 'Monthly'} Transfer Payment</span>
                        <div className="text-right">
                          <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                            {curFormatter.format(toggleValue(result.finalTransfer))}
                          </div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1">
                            {result.payer} pays {result.payer === "Parent A" ? "Parent B" : "Parent A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!result.creditApplies && (pADaysNum > 0 || pBDaysNum > 0) && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                      <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-amber-800">
                        Residential credit typically requires both parents to have 135+ days (37% time) per RCW 26.19.080. Using standard transfer calculation.
                      </p>
                    </div>
                  )}

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
                                <p>We took Parent A net income <strong>{curFormatter.format(result.netA)}</strong> and Parent B net income <strong>{curFormatter.format(result.netB)}</strong> to get combined income <strong>{curFormatter.format(result.combined)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                                <p>We looked up combined income with {childrenCount} children in the 2026 Washington Schedule table — basic obligation: <strong>{curFormatter.format(result.baseSupport)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                                <p>Parent A income share = <strong>{Math.round(result.shareA * 100)}%</strong> | Parent B income share = <strong>{Math.round(result.shareB * 100)}%</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">4</div>
                                <p>Parent A proportional share = <strong>{curFormatter.format(result.parentAStandardObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">5</div>
                                <p>Monthly transfer payment = <strong>{curFormatter.format(result.finalTransfer)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">6</div>
                                <p>Parent A has {result.pADaysNum} days and Parent B has {result.pBDaysNum} days ({result.creditApplies ? "Above" : "Below"} 135 day threshold)</p>
                              </div>
                              {result.creditApplies && (
                                <>
                                  <div className="flex gap-4">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">7</div>
                                    <p>Residential credit calculated: Parent A gets reduction to <strong>{curFormatter.format(result.adjustedA)}</strong> and Parent B gets reduction to <strong>{curFormatter.format(result.adjustedB)}</strong></p>
                                  </div>
                                  <div className="flex gap-4">
                                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">8</div>
                                    <p>Adjusted transfer payment after credit: <strong>{curFormatter.format(result.finalTransfer)}</strong></p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* What-If Sliders */}
                  {whatIfADays !== null && whatIfResult && (
                    <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Explore What If Scenarios</h4>
                      <p className="text-xs text-gray-500 mb-6">Explore scenarios below — your original calculation above is not affected.</p>

                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className={`text-sm font-bold ${whatIfADays >= 135 ? "text-green-600" : "text-gray-700"}`}>Parent A Days: {whatIfADays}</label>
                            <label className={`text-sm font-bold ${365 - whatIfADays >= 135 ? "text-green-600" : "text-gray-700"}`}>Parent B Days: {365 - whatIfADays}</label>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="365"
                            step="1"
                            value={whatIfADays}
                            onChange={(e) => setWhatIfADays(Number(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          {whatIfADays >= 135 && 365 - whatIfADays >= 135 && (
                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest text-center">135 day threshold met ✓</p>
                          )}
                        </div>

                        <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Residential Credit</p>
                            <p className="text-sm font-bold text-gray-900">
                              {whatIfResult.creditApplies ? curFormatter.format(whatIfResult.parentAStandardObligation - whatIfResult.adjustedA) : "$0"}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Adjusted Transfer</p>
                            <p className="text-sm font-bold text-blue-600">{curFormatter.format(whatIfResult.finalTransfer)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <HistoryPanel
                    storageKey="wscss_history_joint"
                    currentInputs={{ parentAAnnual, parentBAnnual, childrenCount, parentADays, parentBDays, hasChildcare, monthlyChildcare }}
                    currentResult={result.finalTransfer}
                    onReload={(inputs) => {
                      setParentAAnnual(inputs.parentAAnnual);
                      setParentBAnnual(inputs.parentBAnnual);
                      setChildrenCount(inputs.childrenCount);
                      setParentADays(inputs.parentADays);
                      setParentBDays(inputs.parentBDays);
                      setHasChildcare(inputs.hasChildcare);
                      setMonthlyChildcare(inputs.monthlyChildcare);
                    }}
                    formatResult={(val) => curFormatter.format(val)}
                  />

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <button onClick={() => window.print()} className="btn btn-secondary w-full">
                      <Printer size={18} /> Print Results
                    </button>
                  </div>

                  <AttorneyCTA />
                  <CrossSuggestions calculatorType="joint" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* New SEO Optimized Body Content */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Calculating Washington Child Support for 50/50 Custody Arrangements</h2>
                <p className="text-gray-600 leading-relaxed">
                  Navigating child support during a divorce or separation can be complicated, particularly when parents share equal time with their children. A common misconception is that a 50/50 joint residential schedule completely eliminates the obligation to pay child support. In Washington State, this is rarely the case.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The Washington State Child Support Schedule (WSCSS) calculates support obligations based on combined parental income to ensure the child enjoys financial stability in both households. However, parents sharing joint custody can seek a residential credit (formally known as a residential deviation) to lower their monthly transfer payments. Discover how shared parenting time impacts your financial obligations under the major 2026 Washington Child Support statutory updates, how courts calculate residential adjustments, and how to use our specialized calculator tools to project your household budget.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">The Major 2026 Washington Child Support Law Overhaul (HB 1014)</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you are entering a new family law matter or seeking to modify an existing support order, it is critical to understand the laws enacted through Engrossed House Bill 1014. These sweeping statutory reforms completely transform how child support is assessed across all income spectrums in Washington State:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong>The $50,000 Income Table Expansion:</strong> For over a decade, Washington’s presumptive Economic Table capped out at a combined monthly net income of $12,000. For high-income families, judges had to manually improvise or extrapolate discretionary child support numbers. The updated schedule expands the presumptive Economic Table up to $50,000 in combined monthly net income. High-earning households will see significantly more predictable—and often higher—baseline child support transfer payments.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong>New Allowable Deductions:</strong> Parents can now explicitly deduct mandatory state payroll insurance premiums from their gross income, including Paid Family Medical Leave (PFML) and WA Cares Fund premiums, before calculating their net income percentage.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Increased Self-Support Reserve:</strong> To protect low-income households, the self-support reserve baseline has been raised from 125% to 180% of the federal poverty guidelines.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">How Does 50/50 Custody Affect Your Child Support Calculation?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Washington courts utilize an "Income Shares Model" to establish child support. First, the state determines the Basic Support Obligation by combining both parents' net monthly incomes and matching the total against the official economic table. This baseline cost is then allocated proportionally between the parents based on their respective percentages of the total income pool.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  In a standard custody scenario, the parent with less residential time (the non-custodial parent) pays their full proportional share directly to the primary residential parent. In a 50/50 joint custody arrangement, the system adapts by allowing the parent who owes a transfer payment to request a residential deviation under <a href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.19.075" target="_blank" rel="noopener noreferrer" className="eyebrow !text-blue-600 hover:underline">RCW 26.19.075</a>. Because the child spends half the year living with the paying parent, that parent directly absorbs significant duplicate costs—such as groceries, electricity, and entertainment. The residential credit acts as a downward adjustment to prevent the paying parent from being unfairly billed twice for the same basic needs.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">The 90-Overnight Rule vs. The 135-Overnight Threshold</h2>
                <p className="text-gray-600 leading-relaxed">
                  While generic online calculators often assume that a parent must hit a strict threshold of 135 overnights (roughly 37% of the year) to qualify for a residential credit, Washington statutory law is far more flexible. Under state guidelines and local county rules (such as those practiced in King County, Pierce County, and Snohomish County family courts), a judge may consider a downward residential deviation if the non-primary parent has substantial residential time.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Local court precedents regularly recognize any schedule exceeding 90 overnights per year (approximately 25% residential time) as substantial enough to trigger a credit evaluation. The precise amount of the credit depends on a detailed breakdown of shared expenses. Our automated <Link href="/joint-custody-calculator" className="text-blue-600 font-bold hover:underline">WSCSS Joint Custody Deviation Tool</Link> handles these complex, tiered overnight formulas automatically.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">How to Project Your Payments Using Our Calculators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
                    <div className="text-blue-600 font-bold text-sm uppercase tracking-widest">Step 1</div>
                    <h3 className="text-xl font-bold text-gray-900">Determine Your Baseline</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Use the <Link href="/" className="text-blue-600 font-bold hover:underline">WSCSS Basic Calculator</Link> to determine your baseline, unadjusted transfer payment. This establishes your standard support obligation using the newly expanded economic table.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
                    <div className="text-blue-600 font-bold text-sm uppercase tracking-widest">Step 2</div>
                    <h3 className="text-xl font-bold text-gray-900">Apply Joint Custody Credits</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Apply the <Link href="/joint-custody-calculator" className="text-blue-600 font-bold hover:underline">WSCSS Joint Custody Deviation Tool</Link> to layer on your specific overnight schedule. By inputting your precise breakdown of parenting time and shared household expenses, you can estimate the exact downward credit a Washington court is likely to grant.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} />
            </div>

            <div className="p-8 bg-amber-50 border border-amber-100 rounded-2xl">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Legal Disclaimer
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                This Joint Custody Calculator is provided for informational purposes only. It uses the 2026 Washington State Child Support Schedule and the offset method derived from <a href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.19.080" target="_blank" rel="noopener noreferrer" className="eyebrow !text-amber-900 hover:underline">RCW 26.19.080</a>. Residential credits are discretionary and subject to judicial approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PrintReport
        caseContext={[
          { label: "Parent A Gross:", value: curFormatter.format(parseFloat(parentAAnnual) || 0) },
          { label: "Parent B Gross:", value: curFormatter.format(parseFloat(parentBAnnual) || 0) },
          { label: "Combined Income:", value: curFormatter.format(result.combined) },
        ]}
        calculationBase={[
          { label: "Children:", value: childrenCount },
          { label: "Residential Schedule:", value: `A: ${result.pADaysNum} days | B: ${result.pBDaysNum} days` },
        ]}
        analysisItems={[
          { label: "Standard A Share:", value: curFormatter.format(result.parentAStandardObligation) },
          { label: "Standard B Share:", value: curFormatter.format(result.parentBStandardObligation) },
          ...(result.creditApplies ? [
            { label: "Adjusted A Share:", value: curFormatter.format(result.adjustedA) },
            { label: "Adjusted B Share:", value: curFormatter.format(result.adjustedB) }
          ] : []),
          ...(hasChildcare ? [
            { label: "Total Childcare:", value: curFormatter.format(result.childcare) },
            { label: "A Childcare Share:", value: curFormatter.format(result.shareChildcareA) },
            { label: "B Childcare Share:", value: curFormatter.format(result.shareChildcareB) }
          ] : [])
        ]}
        totalLabel="Final Transfer Payment"
        totalValue={curFormatter.format(result.finalTransfer)}
        secondaryTotalLabel="Designated Payer"
        secondaryTotalValue={result.payer}
        assumptions="Based on RCW 26.19.080 and 2026 economic tables. Net income estimated using simplified 2026 conversion."
        disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
      />
    </div>
  );
}

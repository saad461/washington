"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Calculator, ArrowLeft, AlertCircle, Printer, Scale, Info
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
import RangeDisplay from "@/components/calculator/RangeDisplay";

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
  const [whatIfPayerDays, setWhatIfPayerDays] = useState<number | null>(null);

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

    const shareA = calc.shareP1;
    const shareB = calc.shareP2;
    const standardAmountFull = calc.baseSupport; // 100% Table Total

    // Determine Payer based on higher income share
    const payer = shareA >= shareB ? "Parent A" : "Parent B";
    const payerShare = payer === "Parent A" ? shareA : shareB;
    const recipientShare = payer === "Parent A" ? shareB : shareA;

    // standardAmount is the payer's individual proportional share (Worksheet Line 9)
    const standardAmount = Math.round(standardAmountFull * payerShare);

    // Payer's overnights
    const payerOvernights = payer === "Parent A" ? pAD : pBD;

    let lowEstimate = standardAmount;
    let highEstimate = standardAmount;
    let tier = "none";
    let message = "";

    if (payerOvernights <= 90) {
      tier = "standard";
      message = "Based on Washington state guidelines, the standard calculation applies. Courts rarely deviate below 90 overnights per year with the paying parent.";
    } else if (payerOvernights <= 182) {
      tier = "significant";
      lowEstimate = Math.round(standardAmount * 0.75);
      highEstimate = Math.round(standardAmount * 0.90);
      message = "Washington courts MAY reduce support when the paying parent has significant parenting time. The actual amount depends on each parent's increased expenses and requires written court findings. RCW 26.19.075(1)(d)";
    } else {
      tier = "equal";
      lowEstimate = Math.round(standardAmount * 0.50);
      highEstimate = Math.round(standardAmount * 0.75);
      message = "With approximately equal parenting time, Washington courts often reduce support significantly. However the exact amount requires written court findings based on actual expenses of both households. RCW 26.19.075(1)(d)";
    }

    // 50% Floor Cap (RCW 26.19.075 - deviation cannot result in near-zero)
    const minFloor = Math.round(standardAmount * 0.50);
    if (lowEstimate < minFloor) {
      lowEstimate = minFloor;
    }

    const finalTransfer = standardAmount + Math.round(childcare * payerShare);

    return {
      netA: pANet,
      netB: pBNet,
      combined: calc.combinedIncome,
      baseSupport: standardAmountFull,
      standardAmount,
      payer,
      payerShare,
      recipientShare,
      payerOvernights,
      lowEstimate,
      highEstimate,
      tier,
      message,
      finalTransfer,
      childcare,
      shareA,
      shareB
    };
  };

  const result = useMemo(() => calculateResult(parentAAnnual, parentBAnnual, childrenCount, pADaysNum, pBDaysNum, hasChildcare, monthlyChildcare),
    [parentAAnnual, parentBAnnual, childrenCount, pADaysNum, pBDaysNum, hasChildcare, monthlyChildcare]);

  const whatIfResult = useMemo(() => {
    if (whatIfPayerDays === null) return null;
    // For what-if, we simulate the payer's days. We need to know which one is the payer first.
    const tempResult = calculateResult(parentAAnnual, parentBAnnual, childrenCount, pADaysNum, pBDaysNum, hasChildcare, monthlyChildcare);
    const pA = tempResult.payer === "Parent A" ? whatIfPayerDays : 365 - whatIfPayerDays;
    const pB = tempResult.payer === "Parent B" ? whatIfPayerDays : 365 - whatIfPayerDays;
    return calculateResult(parentAAnnual, parentBAnnual, childrenCount, pA, pB, hasChildcare, monthlyChildcare);
  }, [whatIfPayerDays, parentAAnnual, parentBAnnual, childrenCount, hasChildcare, monthlyChildcare, pADaysNum, pBDaysNum]);

  // Sync what-if slider
  useEffect(() => {
    if (result.payerOvernights >= 0) {
      if (whatIfPayerDays === null) setWhatIfPayerDays(result.payerOvernights);
    }
  }, [result.payerOvernights, whatIfPayerDays]);

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

                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3">
                    <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-[12px] text-indigo-800 leading-relaxed">
                      <strong>Payer Identification:</strong> {result.payer} is the paying parent because they earn {Math.round(result.payerShare * 100)}% of the combined household income.
                    </p>
                  </div>

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
                          <span className="text-sm font-bold text-gray-900">{isYearly ? 'Annual' : 'Standard'} Calculation</span>
                          <span className="text-[12px] text-gray-500">Payer's Share of 2026 Table</span>
                        </div>
                        <span className="font-bold text-gray-900">{curFormatter.format(toggleValue(result.standardAmount))}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                        {result.message}
                      </p>

                      {result.tier !== "standard" && (
                        <RangeDisplay
                          low={toggleValue(result.lowEstimate)}
                          high={toggleValue(result.highEstimate)}
                        />
                      )}
                    </div>

                    <div className="p-6 sm:p-8 bg-blue-50/30 border-t border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">{isYearly ? 'Annual' : 'Total'} Transfer Payment</span>
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
                                <p>{result.payer} proportional share (Standard Amount) = <strong>{curFormatter.format(result.standardAmount)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">5</div>
                                <p>{result.payer} has {result.payerOvernights} overnights per year ({result.tier === "standard" ? "0-90" : result.tier === "significant" ? "91-182" : "183+"} tier)</p>
                              </div>
                              {result.tier !== "standard" && (
                                <div className="flex gap-4">
                                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">6</div>
                                  <p>Estimated Court Range: <strong>{curFormatter.format(result.lowEstimate)} — {curFormatter.format(result.highEstimate)}</strong></p>
                                </div>
                              )}
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                                  {result.tier !== "standard" ? "7" : "6"}
                                </div>
                                <p>Total transfer payment including childcare: <strong>{curFormatter.format(result.finalTransfer)}</strong></p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* What-If Sliders */}
                  {whatIfPayerDays !== null && whatIfResult && (
                    <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Live Range Sandbox</h4>
                      <p className="text-xs text-gray-500 mb-6">Drag to see how overnight tiers impact the estimated range.</p>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                              {result.payer}'s Overnights: {whatIfPayerDays}
                            </label>
                            <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full uppercase">
                              {whatIfResult.tier === "standard" ? "Standard" : whatIfResult.tier === "significant" ? "Significant" : "Equal"} Tier
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="365"
                            step="1"
                            value={whatIfPayerDays}
                            onChange={(e) => setWhatIfPayerDays(Number(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-500 font-medium">Standard Amount</span>
                             <span className="font-bold text-gray-900">{curFormatter.format(whatIfResult.standardAmount)}</span>
                           </div>
                           {whatIfResult.tier !== "standard" ? (
                             <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                               <span className="text-blue-600 font-bold">Estimated Range</span>
                               <span className="font-bold text-blue-700">
                                 {curFormatter.format(whatIfResult.lowEstimate)} — {curFormatter.format(whatIfResult.highEstimate)}
                               </span>
                             </div>
                           ) : (
                             <div className="text-[11px] text-gray-500 italic text-center pt-2 border-t border-gray-200">
                               Standard calculation applies below 91 overnights.
                             </div>
                           )}
                        </div>

                        <p className="text-[12px] text-gray-500 leading-relaxed italic">
                          {whatIfResult.message}
                        </p>
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
                <h2 className="text-3xl font-bold text-gray-900">Residential Deviations for Significant Parenting Time</h2>
                <p className="text-gray-600 leading-relaxed">
                  While generic online calculators often assume that a parent must hit a strict threshold or follow a fixed formula to qualify for a residential credit, Washington statutory law is far more flexible. Under state guidelines and local county rules (such as those practiced in King County, Pierce County, and Snohomish County family courts), a judge may consider a downward residential deviation if the non-primary parent has significant residential time.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Local court precedents regularly recognize any schedule exceeding 90 overnights per year (approximately 25% residential time) as substantial enough to trigger a deviation evaluation under <a href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.19.075" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">RCW 26.19.075</a>. The precise amount of the reduction depends on a detailed breakdown of shared expenses and the actual increased costs of the paying parent. Our automated <Link href="/joint-custody-calculator" className="text-blue-600 font-bold hover:underline">WSCSS Joint Custody Deviation Tool</Link> handles these complex, tiered overnight estimates automatically.
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
                This Joint Custody Calculator is provided for informational purposes only. It uses the 2026 Washington State Child Support Schedule and the deviation principles derived from <a href="https://app.leg.wa.gov/RCW/default.aspx?cite=26.19.075" target="_blank" rel="noopener noreferrer" className="eyebrow !text-amber-900 hover:underline">RCW 26.19.075</a>. Residential deviations are discretionary and subject to judicial approval based on written findings of fact.
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
          { label: "Residential Schedule:", value: `A: ${pADaysNum} days | B: ${pBDaysNum} days` },
          { label: "Payer Overnights:", value: `${result.payerOvernights} (${Math.round(result.payerOvernights / 365 * 100)}%)` },
        ]}
        analysisItems={[
          { label: "Standard Amount:", value: curFormatter.format(result.standardAmount) },
          { label: "Overnight Tier:", value: result.tier === "standard" ? "0-90 Days" : result.tier === "significant" ? "91-182 Days" : "183+ Days" },
          ...(result.tier !== "standard" ? [
            { label: "Estimated Court Range:", value: `${curFormatter.format(result.lowEstimate)} — ${curFormatter.format(result.highEstimate)}` },
          ] : []),
          ...(hasChildcare ? [
            { label: "Total Childcare:", value: curFormatter.format(result.childcare) },
            { label: "Payer Childcare Share:", value: curFormatter.format(Math.round(result.childcare * result.payerShare)) }
          ] : [])
        ]}
        totalLabel="Standard Transfer Amount"
        totalValue={curFormatter.format(result.finalTransfer)}
        secondaryTotalLabel="Designated Payer"
        secondaryTotalValue={result.payer}
        assumptions="Based on RCW 26.19.075 and 2026 economic tables. Range estimate uses 50-90% deviation bands based on typical Washington court patterns."
        disclaimerText="This is an estimate only. Washington courts determine actual deviation amounts based on written findings of fact per RCW 26.19.075. Consult a Washington family law attorney for accurate advice."
      />
    </div>
  );
}

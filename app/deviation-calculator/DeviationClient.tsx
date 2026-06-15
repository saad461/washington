"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator, ArrowLeft, CheckCircle, AlertCircle, Printer, Scale, Plus, Minus, Info, ChevronDown, ChevronUp
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { convertGrossToNet } from "@/utils/deviationTaxUtils";
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

interface DeviationReason {
  id: string;
  label: string;
  citation: string;
  tooltip: string;
  explanation: string;
  example: string;
}

const DEVIATION_REASONS: DeviationReason[] = [
  {
    id: "medical",
    label: "Extraordinary medical expenses",
    citation: "RCW 26.19.075(1)(c)(iv)",
    tooltip: "Significant medical expenses not covered by insurance.",
    explanation: "This covers uninsured medical, dental, or mental health costs that exceed what is normally expected.",
    example: "Example: Ongoing specialized therapy or orthodontic work not covered by insurance."
  },
  {
    id: "educational",
    label: "Educational expenses",
    citation: "RCW 26.19.075(1)(c)(i)",
    tooltip: "Tuition and related costs for private schools or special needs.",
    explanation: "Includes costs for private school, tutoring, or specialized educational programs that meet the specific needs of the child.",
    example: "Example: Private school tuition when a child has specific learning requirements that public school cannot meet."
  },
  {
    id: "transportation",
    label: "Long distance transportation costs",
    citation: "RCW 26.19.075(1)(c)(i)",
    tooltip: "Travel costs for residential time when parents live far apart.",
    explanation: "Costs associated with transporting the child between parents for residential time, such as airfare or significant gas expenses.",
    example: "Example: Monthly flights for a child to visit a parent living in another state."
  },
  {
    id: "debt",
    label: "Debt obligations prior to separation",
    citation: "RCW 26.19.075(1)(c)(i)",
    tooltip: "Debts incurred during the relationship that are still being paid.",
    explanation: "Significant debt obligations incurred by the parents before they separated that one parent is still responsible for paying.",
    example: "Example: Large joint credit card debt or loans used for family expenses prior to separation."
  },
  {
    id: "other_children",
    label: "Children from other relationships",
    citation: "RCW 26.19.075(1)(e)",
    tooltip: "Legal duty to support biological children from other relationships.",
    explanation: "The court considers the total household circumstances, including support paid for other biological children.",
    example: "Example: A parent paying $500/month for a child from a previous marriage."
  },
  {
    id: "child_assets",
    label: "Significant assets of the child",
    citation: "RCW 26.19.075(1)(a)(vii)",
    tooltip: "Child has substantial independent wealth or assets.",
    explanation: "When a child has their own significant savings, investments, or trust funds that can contribute to their support.",
    example: "Example: A child who inherited a large trust fund from a grandparent."
  },
  {
    id: "spouse_income",
    label: "Income of new spouse or domestic partner",
    citation: "RCW 26.19.075(1)(a)(i)",
    tooltip: "May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone.",
    explanation: "While a new partner isn't legally required to support the child, their contribution to household costs can be considered if another deviation is also requested.",
    example: "Example: A new spouse pays the entire rent, freeing up more of the parent's income for child support."
  },
  {
    id: "nonrecurring",
    label: "Nonrecurring income",
    citation: "RCW 26.19.075(1)(b)",
    tooltip: "Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years.",
    explanation: "This applies when income included in the calculation (like a bonus or overtime) will not recur in future years. The court reviews the past 2 calendar years of this income.",
    example: "Example: A one-time $10,000 bonus that will not be repeated."
  },
  {
    id: "substantial_wealth",
    label: "Possession of substantial wealth",
    citation: "RCW 26.19.075(1)(a)(vi)",
    tooltip: "Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets.",
    explanation: "Courts may deviate if a parent has significant wealth that isn't reflected in their monthly net income, such as large investment accounts.",
    example: "Example: A parent with $2 million in liquid stocks but relatively low monthly salary."
  },
  {
    id: "child_income",
    label: "Extraordinary income of a child",
    citation: "RCW 26.19.075(1)(a)(vii)",
    tooltip: "Child has significant income of their own.",
    explanation: "Applies when a child is earning significant income, often through professional work or business interests.",
    example: "Example: A teenager who earns substantial income from a successful social media business."
  },
  {
    id: "tax_planning",
    label: "Tax planning considerations",
    citation: "RCW 26.19.075(1)(a)(viii)",
    tooltip: "Deviation may be granted only if children receive no lesser economic benefit as a result.",
    explanation: "Allows for adjustments based on complex tax strategies, provided the child's financial situation does not worsen.",
    example: "Example: Adjusting support to optimize tax filings between parents for a higher total household net."
  },
  {
    id: "disabled_child",
    label: "Special needs of disabled child",
    citation: "RCW 26.19.075(1)(c)(iii)",
    tooltip: "Physical, mental, or emotional disabilities requiring special care or expenses.",
    explanation: "Accounts for the additional costs of raising a child with significant physical or mental disabilities.",
    example: "Example: Specialized home care or medical equipment required for a child with a chronic condition."
  },
  {
    id: "psychological",
    label: "Psychological needs of child",
    citation: "RCW 26.19.075(1)(c)(iv)",
    tooltip: "Special psychological or mental health needs beyond normal healthcare expenses.",
    explanation: "Focuses on the mental and emotional health requirements of a child that necessitate extra spending.",
    example: "Example: Intensive weekly counseling or specialized mental health programs."
  },
  {
    id: "reunification",
    label: "Court ordered reunification costs",
    citation: "RCW 26.19.075(1)(c)(v)",
    tooltip: "Costs to comply with court ordered reunification efforts under chapter 13.34 RCW.",
    explanation: "Covers the mandatory costs a parent must pay to participate in court-ordered programs to reunite with their child.",
    example: "Example: Court-mandated supervised visitation fees or reunification therapy costs."
  },
  {
    id: "income_disparity",
    label: "Significant income disparity",
    citation: "RCW 26.19.075(1)(c)(ii)",
    tooltip: "Significant difference in living costs between households due to conditions beyond parents control.",
    explanation: "May be used when one parent's living expenses are vastly different from the other due to factors they cannot control.",
    example: "Example: One parent must live in a much more expensive area for work, creating a vast disparity in disposable income."
  }
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
  const [reasonDirections, setReasonDirections] = useState<Record<string, "upward" | "downward">>({});
  const [expandedLearnMore, setExpandedLearnMore] = useState<string | null>(null);

  // Other children specific state
  const [otherChildrenCount, setOtherChildrenCount] = useState(1);
  const [otherChildrenSupport, setOtherChildrenSupport] = useState("");
  const [otherChildrenPaid, setOtherChildrenPaid] = useState(true);
  const [otherChildrenDirection, setOtherChildrenDirection] = useState<"upward" | "downward">("downward");

  const [deviationDirectionGlobal, setDeviationDirectionGlobal] = useState<"upward" | "downward">("upward");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const toggleReason = (id: string) => {
    setSelectedReasons(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
    if (id === "other_children") {
      setReasonDirections(prev => ({ ...prev, [id]: "downward" }));
    } else {
      setReasonDirections(prev => ({ ...prev, [id]: deviationDirectionGlobal }));
    }
  };

  const setAmount = (id: string, val: string) => {
    setReasonAmounts(prev => ({ ...prev, [id]: sanitizeIncome(val) }));
  };

  const setDirection = (id: string, dir: "upward" | "downward") => {
    setReasonDirections(prev => ({ ...prev, [id]: dir }));
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

    let netDeviation = 0;
    const details: { label: string; amount: number; direction: "upward" | "downward"; citation: string }[] = [];

    selectedReasons.forEach(id => {
      const reasonObj = DEVIATION_REASONS.find(r => r.id === id);
      let amount = 0;
      let direction: "upward" | "downward" = reasonDirections[id] || deviationDirectionGlobal;

      if (id === "other_children") {
        amount = parseFloat(otherChildrenSupport) || 0;
        direction = otherChildrenDirection;
      } else {
        amount = parseFloat(reasonAmounts[id]) || 0;
      }

      if (amount > 0) {
        if (direction === "upward") {
          netDeviation += amount;
        } else {
          netDeviation -= amount;
        }
        details.push({
          label: reasonObj?.label || id,
          amount,
          direction,
          citation: reasonObj?.citation || ""
        });
      }
    });

    // Apply minimum floor check: Support cannot go below $50 per child per month
    const minFloor = childrenCount * 50;
    const adjustedObligation = Math.max(minFloor, standardObligation + netDeviation);
    const isAtFloor = adjustedObligation === minFloor && (standardObligation + netDeviation) < minFloor;

    const percentDiff = standardObligation > 0
      ? (adjustedObligation - standardObligation) / standardObligation
      : 0;

    return {
      netObligor: obligorNet,
      netObligee: obligeeNet,
      combined: calc.combinedIncome,
      standardObligation,
      netDeviation,
      adjustedObligation,
      percentDiff,
      reasons: details,
      shareP1: calc.shareP1,
      shareP2: calc.shareP2,
      baseSupport: calc.baseSupport,
      isAtFloor
    };
  }, [obligorAnnual, obligeeAnnual, childrenCount, selectedReasons, reasonAmounts, reasonDirections, deviationDirectionGlobal, otherChildrenSupport, otherChildrenDirection]);

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
              RCW 26.19.075 · 2025 IRS Tax Brackets
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Support Deviation Calculator</span>
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
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                    <p className="text-sm text-blue-800">
                      <strong>Federal tax estimate based on 2025 IRS tax brackets.</strong> Standard deduction of $15,000 applied.
                    </p>
                  </div>

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
                    <div className="grid grid-cols-1 gap-4">
                      {DEVIATION_REASONS.map(reason => (
                        <div key={reason.id} className="flex flex-col">
                          <button
                            onClick={() => toggleReason(reason.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                              selectedReasons.includes(reason.id)
                                ? "bg-blue-50 border-blue-600 ring-2 ring-blue-100"
                                : "bg-white border-gray-100 hover:border-gray-300"
                            }`}
                          >
                            <div className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                              selectedReasons.includes(reason.id) ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
                            }`}>
                              {selectedReasons.includes(reason.id) && <CheckCircle size={14} />}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col">
                                <span className={`text-sm font-bold ${selectedReasons.includes(reason.id) ? "text-blue-900" : "text-gray-600"}`}>
                                  {reason.label}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium">{reason.citation}</span>
                              </div>
                            </div>
                            <Info size={16} className="text-gray-300 mt-1" title={reason.tooltip} />
                          </button>

                          <div className="px-4 py-2">
                            <button
                              onClick={() => setExpandedLearnMore(expandedLearnMore === reason.id ? null : reason.id)}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                            >
                              {expandedLearnMore === reason.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              Learn more
                            </button>

                            <AnimatePresence>
                              {expandedLearnMore === reason.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-2">
                                    <p className="font-medium text-gray-700">{reason.explanation}</p>
                                    <p className="italic">{reason.example}</p>
                                    <p className="text-blue-600 font-bold">{reason.citation}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
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
                        <h3 className="text-lg font-bold">Deviation Details</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedReasons.map(id => {
                            const reasonObj = DEVIATION_REASONS.find(r => r.id === id);
                            if (id === "other_children") {
                              return (
                                <div key={id} className="p-6 bg-white rounded-xl border-2 border-blue-100 shadow-sm space-y-6">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                      <Scale size={16} />
                                    </div>
                                    <span className="font-bold text-gray-900">{reasonObj?.label}</span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                      <label className="input-label">Number of other children</label>
                                      <input
                                        type="number"
                                        min="1"
                                        value={otherChildrenCount}
                                        onChange={(e) => setOtherChildrenCount(parseInt(e.target.value) || 1)}
                                        className="input-standard w-full"
                                      />
                                    </div>
                                    <div>
                                      <label className="input-label">Monthly support ordered</label>
                                      <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                          type="number"
                                          value={otherChildrenSupport}
                                          onChange={(e) => setOtherChildrenSupport(sanitizeIncome(e.target.value))}
                                          placeholder="0.00"
                                          className="input-standard pl-8 w-full"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-bold text-gray-700">Is support actually being paid?</span>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => setOtherChildrenPaid(true)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${otherChildrenPaid ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200"}`}
                                      >YES</button>
                                      <button
                                        onClick={() => setOtherChildrenPaid(false)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!otherChildrenPaid ? "bg-red-600 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200"}`}
                                      >NO</button>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="input-label">Deviation direction</label>
                                    <div className="grid grid-cols-2 gap-4">
                                      <button onClick={() => setOtherChildrenDirection("downward")} className={toggleBtn(otherChildrenDirection === "downward")}>
                                        <Minus size={16} /> Downward
                                      </button>
                                      <button onClick={() => setOtherChildrenDirection("upward")} className={toggleBtn(otherChildrenDirection === "upward")}>
                                        <Plus size={16} /> Upward
                                      </button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 mt-2 font-medium">Having children from other relationships typically results in a downward deviation.</p>
                                  </div>

                                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                                    Court will consider total household circumstances. Enter monthly support amount ordered for other children above. This typically results in a downward deviation of that amount or less.
                                  </div>

                                  {otherChildrenDirection === "upward" && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-relaxed font-medium">
                                      ⚠️ Note: Upward deviation for children from other relationships is uncommon. Courts typically grant downward deviations for this factor. RCW 26.19.075(1)(e)
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <div key={id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <span className="text-sm font-bold text-gray-700">{reasonObj?.label}</span>
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
                                <div className="grid grid-cols-2 gap-3">
                                  <button onClick={() => setDirection(id, "upward")} className={`h-9 px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-bold transition-all ${reasonDirections[id] === "upward" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                                    <Plus size={14} /> Upward
                                  </button>
                                  <button onClick={() => setDirection(id, "downward")} className={`h-9 px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-bold transition-all ${reasonDirections[id] === "downward" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                                    <Minus size={14} /> Downward
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <label className="input-label text-gray-400 text-[10px] uppercase tracking-wider">Default Direction for New Factors</label>
                          <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setDeviationDirectionGlobal("upward")} className={toggleBtn(deviationDirectionGlobal === "upward")}>
                              <Plus size={16} /> Upward
                            </button>
                            <button onClick={() => setDeviationDirectionGlobal("downward")} className={toggleBtn(deviationDirectionGlobal === "downward")}>
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
                      {Math.abs(result.netDeviation) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Net Deviation Adjustment</span>
                          <span className={`font-bold ${result.netDeviation >= 0 ? "text-blue-600" : "text-amber-600"}`}>
                            {result.netDeviation >= 0 ? "+" : "-"}{curFormatter.format(toggleValue(Math.abs(result.netDeviation)))}
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
                            <div key={i} className="flex justify-between items-start gap-4 text-[13px]">
                              <div className="flex flex-col">
                                <span className="text-gray-600 leading-tight">{r.label}</span>
                                <span className="text-[10px] text-gray-400 font-medium">{r.citation}</span>
                              </div>
                              <span className={`font-bold whitespace-nowrap ${r.direction === "upward" ? "text-blue-600" : "text-amber-600"}`}>
                                {r.direction === "upward" ? "+" : "-"}{curFormatter.format(toggleValue(r.amount))}
                              </span>
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

                      {result.isAtFloor && (
                        <div className="mt-4 p-3 bg-blue-100/50 border border-blue-200 rounded-lg text-[11px] text-blue-800 font-medium">
                          💡 Washington law requires a minimum support obligation of $50 per child ($50 x {childrenCount} = {curFormatter.format(childrenCount * 50)}). Your deviation cannot reduce support below this mandatory floor.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Legal Disclaimer Output Section */}
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-[13px] text-gray-600 leading-relaxed shadow-sm">
                    Deviation amounts are determined by the court after considering all circumstances. This calculator provides an estimate only. Courts require written findings of fact for any deviation from the standard calculation per RCW 26.19.075(2). Consult a Washington family law attorney for accurate advice.
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
                                <p>Standard obligation: <strong>{curFormatter.format(result.standardObligation)}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">6</div>
                                <div className="flex-1">
                                  <p>Deviation reasons:</p>
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {result.reasons.length > 0 ? result.reasons.map((r, i) => (
                                      <li key={i}>{r.label}: {r.direction === "upward" ? "+" : "-"}{curFormatter.format(r.amount)}</li>
                                    )) : <li>No reasons selected</li>}
                                  </ul>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">7</div>
                                <p>Net deviation: <strong>{result.netDeviation >= 0 ? "+" : "-"}{curFormatter.format(Math.abs(result.netDeviation))}</strong></p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">8</div>
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
                    currentInputs={{ obligorAnnual, obligeeAnnual, childrenCount, selectedReasons, reasonAmounts, reasonDirections, deviationDirectionGlobal, otherChildrenCount, otherChildrenSupport, otherChildrenPaid, otherChildrenDirection }}
                    currentResult={result.adjustedObligation}
                    onReload={(inputs) => {
                      setObligorAnnual(inputs.obligorAnnual);
                      setObligeeAnnual(inputs.obligeeAnnual);
                      setChildrenCount(inputs.childrenCount);
                      setSelectedReasons(inputs.selectedReasons);
                      setReasonAmounts(inputs.reasonAmounts || {});
                      setReasonDirections(inputs.reasonDirections || {});
                      setDeviationDirectionGlobal(inputs.deviationDirectionGlobal || "upward");
                      setOtherChildrenCount(inputs.otherChildrenCount || 1);
                      setOtherChildrenSupport(inputs.otherChildrenSupport || "");
                      setOtherChildrenPaid(inputs.otherChildrenPaid !== undefined ? inputs.otherChildrenPaid : true);
                      setOtherChildrenDirection(inputs.otherChildrenDirection || "downward");
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
            value: (r.direction === "upward" ? "+" : "-") + curFormatter.format(r.amount),
          })),
          { label: "Net Deviation:", value: (result.netDeviation >= 0 ? "+" : "-") + curFormatter.format(Math.abs(result.netDeviation)), isBold: true }
        ]}
        totalLabel="Adjusted Support Amount"
        totalValue={curFormatter.format(result.adjustedObligation)}
        secondaryTotalLabel="Percentage Change"
        secondaryTotalValue={perFormatter.format(result.percentDiff)}
        assumptions="Based on RCW 26.19.075 and 2026 economic tables. Net income estimated using 2025 federal tax brackets and $15,000 standard deduction."
        disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
      />
    </div>
  );
}

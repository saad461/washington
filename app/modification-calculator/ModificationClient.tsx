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

  const result = useMemo(() => {
    // Calculate original obligation using 2026 schedule and original incomes (as per Answer 4)
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

      <section className="section-default bg-[var(--color-bg-subtle)]">
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
                  <div className="card-standard !p-0 overflow-hidden shadow-[var(--shadow-card-md)] border-gray-200">
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Original Obligation (2026 Table)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(result.originalObligation)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">New Obligation (2026 Table)</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(result.newObligation)}</span>
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

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <button onClick={() => window.print()} className="btn btn-secondary w-full">
                      <Printer size={18} /> Print Report
                    </button>
                    <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                      Statutory thresholds are defined by RCW 26.09.170. Other factors may also apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER SECTION */}
      <section className="section-default border-t border-gray-100">
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
                <h2 className="text-2xl font-bold text-gray-900">The 15% Rule Explained</h2>
                <p className="text-gray-600 leading-relaxed">
                  If your or the other parent's income has changed significantly, the new calculated support amount may differ from your current order by 15% or more. This threshold exists to prevent constant court filings over minor income changes while still allowing modifications when the financial difference is meaningful.
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
              <FAQAccordion faqs={faqs} />
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
        disclaimerText="Estimate only. Final orders determined by court."
      />
    </div>
  );
}

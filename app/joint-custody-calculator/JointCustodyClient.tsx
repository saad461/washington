"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator, ArrowLeft, AlertCircle, Printer, Scale
} from "lucide-react";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { convertGrossToNet } from "@/utils/taxUtils";
import { motion, AnimatePresence } from "framer-motion";
import PrintReport from "@/components/calculator/PrintReport";
import FAQAccordion from "@/components/FAQAccordion";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/* ─── Shared toggle button styles ─── */
function toggleBtn(active: boolean) {
  const base = "h-11 sm:h-12 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm select-none w-full";
  if (active) return `${base} bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-card)]`;
  return `${base} bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-text-disabled)]`;
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

  const pADaysNum = parseInt(parentADays) || 0;
  const pBDaysNum = parseInt(parentBDays) || 0;

  const result = useMemo(() => {
    const pANet = convertGrossToNet(parseFloat(parentAAnnual) || 0);
    const pBNet = convertGrossToNet(parseFloat(parentBAnnual) || 0);
    const childcare = hasChildcare ? (parseFloat(monthlyChildcare) || 0) : 0;

    // Use existing calculator engine for base obligation using NET incomes
    const calc = calculateChildSupport({
      "incomeType": { p1: "monthly" },
      "1a": { p1: pANet, p2: pBNet },
      "5_children": { p1: childrenCount },
    });

    const basicObligation = calc.baseSupport;
    const shareA = calc.shareP1;
    const shareB = calc.shareP2;

    const parentAStandardObligation = basicObligation * shareA;
    const parentBStandardObligation = basicObligation * shareB;

    // Residential credit applies if BOTH parents have 135+ days (per standard joint custody interpretation)
    const creditApplies = pADaysNum >= 135 && pBDaysNum >= 135;

    let adjustedA = parentAStandardObligation;
    let adjustedB = parentBStandardObligation;

    if (creditApplies) {
      // Offset method: share * (days with other parent / 365)
      adjustedA = parentAStandardObligation * (pBDaysNum / 365);
      adjustedB = parentBStandardObligation * (pADaysNum / 365);
    }

    const netSupport = adjustedA - adjustedB;

    const shareChildcareA = childcare * shareA;
    const shareChildcareB = childcare * shareB;

    let finalTransfer = 0;
    let payer = "Parent A";
    if (netSupport > 0) {
      // Parent A pays Parent B.
      // We assume the recipient (B) pays for childcare, so A pays their share to B.
      finalTransfer = netSupport + shareChildcareA;
      payer = "Parent A";
    } else {
      // Parent B pays Parent A.
      // We assume the recipient (A) pays for childcare, so B pays their share to A.
      finalTransfer = Math.abs(netSupport) + shareChildcareB;
      payer = "Parent B";
    }

    return {
      netA: pANet,
      netB: pBNet,
      combined: calc.combinedIncome,
      baseSupport: basicObligation,
      pADaysNum,
      pBDaysNum,
      creditApplies,
      parentAStandardObligation,
      parentBStandardObligation,
      adjustedA,
      adjustedB,
      finalTransfer,
      payer,
      childcare,
      shareChildcareA,
      shareChildcareB
    };
  }, [parentAAnnual, parentBAnnual, childrenCount, parentADays, parentBDays, hasChildcare, monthlyChildcare]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
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
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Parent A Monthly Net (Est.)</span>
                      <span className="font-bold text-gray-900">{curFormatter.format(result.netA)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Parent B Monthly Net (Est.)</span>
                      <span className="font-bold text-gray-900">{curFormatter.format(result.netB)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm font-bold">Combined Net Income</span>
                      <span className="font-bold text-blue-600">{curFormatter.format(result.combined)}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Basic Support Obligation</span>
                        <span className="text-[12px] text-gray-500">2026 Economic Table</span>
                      </div>
                      <span className="font-bold text-gray-900">{curFormatter.format(result.baseSupport)}</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {result.creditApplies && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-4"
                      >
                        <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Residential Credit (RCW 26.19.080)</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm pt-2 border-t border-blue-200/50">
                            <span className="text-blue-700">A Adjusted Obligation</span>
                            <span className="font-bold text-blue-900">{curFormatter.format(result.adjustedA)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-700">B Adjusted Obligation</span>
                            <span className="font-bold text-blue-900">{curFormatter.format(result.adjustedB)}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!result.creditApplies && (pADaysNum > 0 || pBDaysNum > 0) && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                      <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-amber-800">
                        Residential credit typically requires both parents to have 135+ days (37% time) per RCW 26.19.080. Using standard transfer calculation.
                      </p>
                    </div>
                  )}

                  <div className="p-6 bg-blue-600 rounded-xl shadow-lg text-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Monthly Transfer Payment</p>
                    <div className="text-4xl font-extrabold mb-1">
                      {curFormatter.format(result.finalTransfer)}
                    </div>
                    <p className="text-sm font-bold">
                      {result.payer} pays {result.payer === "Parent A" ? "Parent B" : "Parent A"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <button onClick={() => window.print()} className="btn btn-secondary w-full">
                      <Printer size={18} /> Print Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">How Joint Custody Affects Child Support in Washington</h2>
                <p className="text-gray-600 leading-relaxed">
                  In a standard custody arrangement, the paying parent's support obligation is straightforward. However when a child spends significant time — 135 days or more per year — with both parents, Washington State applies a residential credit that reduces the transfer payment to reflect the actual costs each parent bears directly.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">The 135 Day Threshold</h2>
                <p className="text-gray-600 leading-relaxed">
                  Washington's residential credit only applies when a parent has the child for at least 135 overnights per year. This equals roughly 37% of the year. If only one parent meets this threshold, the credit applies only to that parent's calculation. If both parents exceed 135 days, both receive a proportional credit and the difference becomes the transfer payment.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">What This Calculator Does Not Include</h2>
                <p className="text-gray-600 leading-relaxed">
                  This calculator provides an estimate based on the 2026 schedule. It does not account for extraordinary medical expenses, childcare costs adjustments, or court ordered deviations. For a complete picture use our Deviation Calculator after getting your joint custody estimate.
                </p>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQAccordion items={faqs} />
            </div>

            <div className="p-8 bg-amber-50 border border-amber-100 rounded-2xl">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Legal Disclaimer
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                This Joint Custody Calculator is provided for informational purposes only. It uses the 2026 Washington State Child Support Schedule and the offset method derived from RCW 26.19.080. Residential credits are discretionary and subject to judicial approval.
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
        disclaimerText="Estimate only. Final orders determined by court."
      />
    </div>
  );
}

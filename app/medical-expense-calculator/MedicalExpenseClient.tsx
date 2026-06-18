"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Stethoscope, HeartPulse, Info, DollarSign } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface MedicalExpenseClientProps {
  faqs: { question: string; answer: string }[];
}

export default function MedicalExpenseClient({ faqs }: MedicalExpenseClientProps) {
  const [p1Income, setP1Income] = useState("");
  const [p2Income, setP2Income] = useState("");
  const [expense, setExpense] = useState("");
  const [type, setType] = useState("onetime");
  const [whoPaid, setWhoPaid] = useState("p1");

  const results = useMemo(() => {
    const inc1 = parseFloat(p1Income) || 0;
    const inc2 = parseFloat(p2Income) || 0;
    const amount = parseFloat(expense) || 0;
    const totalInc = inc1 + inc2;

    if (totalInc === 0) return null;

    const p1Share = inc1 / totalInc;
    const p2Share = inc2 / totalInc;
    const p1Owes = amount * p1Share;
    const p2Owes = amount * p2Share;

    let reimbursement = 0;
    let direction = "";
    if (whoPaid === "p1") {
      reimbursement = p2Owes;
      direction = "Parent 2 reimburses Parent 1";
    } else {
      reimbursement = p1Owes;
      direction = "Parent 1 reimburses Parent 2";
    }

    return {
      p1SharePercent: (p1Share * 100).toFixed(1),
      p2SharePercent: (p2Share * 100).toFixed(1),
      p1Owes,
      p2Owes,
      reimbursement,
      direction,
      annualTotal: type === "monthly" ? amount * 12 : null
    };
  }, [p1Income, p2Income, expense, type, whoPaid]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Medical Expense Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.080(2) · 2026 Guidelines</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington <span className="text-blue-600">Medical Expense Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate the split for uninsured medical expenses such as copays, deductibles, and orthodontia. Washington law requires these costs to be shared proportionally based on income.
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
                    <HeartPulse size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Expense Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="p1-income" className="input-label">P1 Monthly Net Income</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="p1-income"
                          type="number"
                          value={p1Income}
                          onChange={(e) => setP1Income(e.target.value)}
                          placeholder="e.g. 5000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="p2-income" className="input-label">P2 Monthly Net Income</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="p2-income"
                          type="number"
                          value={p2Income}
                          onChange={(e) => setP2Income(e.target.value)}
                          placeholder="e.g. 3000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expense" className="input-label">Uninsured Medical Expense</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="expense"
                          type="number"
                          value={expense}
                          onChange={(e) => setExpense(e.target.value)}
                          placeholder="0.00"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">Amount not covered by insurance</p>
                    </div>
                    <div>
                      <label htmlFor="type" className="input-label">Expense Type</label>
                      <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="onetime">One-time expense</option>
                        <option value="monthly">Recurring monthly</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="who-paid" className="input-label">Who Paid?</label>
                    <select
                      id="who-paid"
                      value={whoPaid}
                      onChange={(e) => setWhoPaid(e.target.value)}
                      className="input-standard w-full"
                    >
                      <option value="p1">I paid (Parent 1)</option>
                      <option value="p2">Other parent paid (Parent 2)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Split Analysis
                </h3>

                {results ? (
                  <div className="space-y-6">
                    <div className="card-standard shadow-sm border-gray-200">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P1 Share ({results.p1SharePercent}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p1Owes)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P2 Share ({results.p2SharePercent}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p2Owes)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Reimbursement Due</span>
                          <div className="text-right">
                            <div className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.reimbursement)}</div>
                            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{results.direction}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {results.annualTotal && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="card-subtle !p-4 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-500 uppercase">Annual Recurring Total</span>
                          <span className="text-lg font-bold text-gray-900">{curFormatter.format(results.annualTotal)}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed font-medium">
                      Legal Citation: <strong>RCW 26.19.080(2)</strong>. Extraordinary medical expenses shall be shared by the parents in the same proportion as the basic child support obligation.
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/childcare-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Childcare Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="basic" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <Stethoscope size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and expense to see the split analysis.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Handling Uninsured Medical Costs in Washington</h2>
            <div className="prose-standard">
              <p>
                In addition to the basic child support transfer payment, Washington law requires parents to share the costs of medical expenses that are not covered by insurance. This is governed by <strong>RCW 26.19.080(2)</strong>.
              </p>

              <h3>What qualifies?</h3>
              <ul>
                <li>Insurance copays and deductibles</li>
                <li>Prescription medications</li>
                <li>Dental work and orthodontia (braces)</li>
                <li>Vision care and glasses/contacts</li>
                <li>Mental health counseling and therapy</li>
              </ul>

              <h3>How to get reimbursed?</h3>
              <p>
                The standard procedure is for the parent who incurs the expense to provide the other parent with a copy of the receipt or invoice within a reasonable timeframe (often defined as 30 days in court orders). The other parent then has a set period to pay their proportional share.
              </p>

              <h3>Documentation is Key</h3>
              <p>
                Always keep digital or physical copies of all medical receipts. If the other parent refuses to pay their share, you may need these records to file a motion for enforcement in Superior Court.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} renderSchema={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

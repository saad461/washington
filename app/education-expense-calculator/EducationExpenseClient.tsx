"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, GraduationCap, BookOpen, Info, DollarSign, AlertCircle } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface EducationExpenseClientProps {
  faqs: { question: string; answer: string }[];
}

export default function EducationExpenseClient({ faqs }: EducationExpenseClientProps) {
  const [p1Income, setP1Income] = useState("");
  const [p2Income, setP2Income] = useState("");
  const [expense, setExpense] = useState("");
  const [type, setType] = useState("tuition");
  const [frequency, setFrequency] = useState("monthly");
  const [whoPaid, setWhoPaid] = useState("p1");

  const results = useMemo(() => {
    const inc1 = parseFloat(p1Income) || 0;
    const inc2 = parseFloat(p2Income) || 0;
    let amount = parseFloat(expense) || 0;
    const totalInc = inc1 + inc2;

    if (totalInc === 0) return null;

    let monthlyAmount = amount;
    if (frequency === "annual") monthlyAmount = amount / 12;
    if (frequency === "onetime") monthlyAmount = 0; // Don't show recurring if one-time

    const p1Share = inc1 / totalInc;
    const p2Share = inc2 / totalInc;

    const p1Owes = (frequency === "onetime" ? amount : monthlyAmount) * p1Share;
    const p2Owes = (frequency === "onetime" ? amount : monthlyAmount) * p2Share;

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
      monthlyTotal: frequency === "onetime" ? null : monthlyAmount,
      annualTotal: frequency === "onetime" ? null : monthlyAmount * 12
    };
  }, [p1Income, p2Income, expense, type, frequency, whoPaid]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Education Expense Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.080(3) · 2026 Guidelines</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington <span className="text-blue-600">Education Expense Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate the proportional split for school tuition, supplies, and college expenses. Washington law handles education costs as special child-rearing expenses.
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
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Income & Education Costs</h2>
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
                      <label htmlFor="expense" className="input-label">Expense Amount</label>
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
                    </div>
                    <div>
                      <label htmlFor="type" className="input-label">Expense Type</label>
                      <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="tuition">Private school tuition</option>
                        <option value="supplies">School supplies and fees</option>
                        <option value="activities">School activities/sports</option>
                        <option value="college">Post-secondary / college</option>
                        <option value="other">Other education expense</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="frequency" className="input-label">Frequency</label>
                      <select
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual (once per year)</option>
                        <option value="onetime">One-time expense</option>
                      </select>
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

                  {type === "college" && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed font-medium flex gap-3">
                      <AlertCircle size={18} className="shrink-0" />
                      <p>
                        <strong>Post-secondary support is advisory in Washington.</strong> Courts may order support up to age 23 if child is enrolled and in good standing. RCW 26.19.090
                      </p>
                    </div>
                  )}
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

                    {results.monthlyTotal !== null && results.monthlyTotal > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="card-subtle !p-4 flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Equivalent</span>
                          <span className="text-lg font-bold text-gray-900">{curFormatter.format(results.monthlyTotal)}</span>
                        </div>
                        <div className="card-subtle !p-4 flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Annual Total</span>
                          <span className="text-lg font-bold text-gray-900">{curFormatter.format(results.annualTotal || 0)}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed font-medium">
                      Legal Citation: <strong>RCW 26.19.080(3)</strong>. Special child rearing expenses, including education expenses, shall be shared by the parents in the same proportion as the basic child support obligation.
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
                    <GraduationCap size={40} className="mx-auto mb-4 opacity-20" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Education Expenses in Washington State</h2>
            <div className="prose-standard">
              <p>
                Education-related costs are handled similarly to medical and childcare expenses in Washington. They are classified as "extraordinary" or "special child-rearing expenses" under <strong>RCW 26.19.080(3)</strong>.
              </p>

              <h3>Private School Tuition</h3>
              <p>
                Courts do not automatically order parents to split private school tuition. A judge will look at whether the child has a history of attending private school, if it meets the child's specific educational needs, and if the parents can reasonably afford the cost.
              </p>

              <h3>College (Post-Secondary) Support</h3>
              <p>
                Washington is one of the few states where a court can order child support to continue past high school graduation. Under <strong>RCW 26.19.090</strong>, the court has discretion to order "post-secondary educational support" if the child is dependent on the parents for the reasonable necessities of life and is enrolled in an accredited academic or vocational program.
              </p>

              <h3>Extracurricular & Activity Fees</h3>
              <p>
                School-related activities like sports, band, and clubs are also split proportionally by income. Parents should specify in their parenting plan or support order how these costs will be approved and reimbursed.
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

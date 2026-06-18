"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, HeartPulse, Landmark, AlertTriangle, Info, DollarSign, TrendingUp } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const curSmallFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

interface MedicalExpenseClientProps {
  faqs: { question: string; answer: string }[];
}

export default function MedicalExpenseClient({ faqs }: MedicalExpenseClientProps) {
  const [p1Income, setP1Income] = useState("");
  const [p2Income, setP2Income] = useState("");
  const [medicalExpense, setMedicalExpense] = useState("");
  const [expenseType, setExpenseType] = useState("onetime");
  const [whoPaid, setWhoPaid] = useState("p1");

  const results = useMemo(() => {
    const income1 = parseFloat(p1Income) || 0;
    const income2 = parseFloat(p2Income) || 0;
    const cost = parseFloat(medicalExpense) || 0;

    if (income1 + income2 === 0 || cost === 0) return null;

    const combined = income1 + income2;
    const p1Share = income1 / combined;
    const p2Share = 1 - p1Share;

    const p1Owes = cost * p1Share;
    const p2Owes = cost * p2Share;

    let reimbursement = 0;
    let direction = "";
    if (whoPaid === "p1") {
      reimbursement = p2Owes;
      direction = "Parent 2 pays Parent 1";
    } else {
      reimbursement = p1Owes;
      direction = "Parent 1 pays Parent 2";
    }

    return {
      p1Share: (p1Share * 100).toFixed(1),
      p2Share: (p2Share * 100).toFixed(1),
      p1Owes,
      p2Owes,
      reimbursement,
      direction,
      annualTotal: expenseType === "monthly" ? cost * 12 : null
    };
  }, [p1Income, p2Income, medicalExpense, expenseType, whoPaid]);

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
            <p className="eyebrow">RCW 26.19.080(2) · Uninsured Medical</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Medical Expense Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how uninsured medical expenses are split between parents proportionally by income. Split copays, deductibles, and dental costs accurately under Washington law.
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
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="medical-expense" className="input-label">Uninsured Medical Expense</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="medical-expense"
                          type="number"
                          value={medicalExpense}
                          onChange={(e) => setMedicalExpense(e.target.value)}
                          placeholder="e.g. 500"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="expense-type" className="input-label">Expense Type</label>
                      <select
                        id="expense-type"
                        value={expenseType}
                        onChange={(e) => setExpenseType(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="onetime">One-time expense</option>
                        <option value="monthly">Recurring monthly</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="who-paid" className="input-label">Who Paid the Expense?</label>
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
                    <div className="card-standard shadow-sm border-gray-200 !p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P1 Share ({results.p1Share}%)</span>
                          <span className="font-bold text-gray-900">{curSmallFormatter.format(results.p1Owes)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P2 Share ({results.p2Share}%)</span>
                          <span className="font-bold text-gray-900">{curSmallFormatter.format(results.p2Owes)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Reimbursement Due</span>
                          <span className="text-2xl font-extrabold text-blue-600">{curSmallFormatter.format(results.reimbursement)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{results.direction}</span>
                        </div>
                      </div>
                    </div>

                    {results.annualTotal && (
                      <div className="card-subtle !p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Total</div>
                        <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.annualTotal)}</div>
                      </div>
                    )}

                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Legal Citaton</div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        Based on proportional income share according to <strong>RCW 26.19.080(2)</strong>.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/health-insurance-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Premium Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="medical-expense" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and expense details to see the proportional split.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Uninsured Medical Expense Calculator (2026) — Split Healthcare Costs by Income</h2>
            <div className="prose-standard">
              <p>
                Even with health insurance, children have medical expenses that insurance does not cover — copayments, deductibles, dental work, orthodontia, prescription medications, and mental health treatment. Under <strong>RCW 26.19.080(2)</strong>, these uninsured costs are split between Washington parents in the same proportion as their basic child support obligation. The parent who pays an out-of-pocket medical expense is entitled to timely reimbursement from the other parent for their share.
              </p>

              <h2>What Counts as Uninsured Medical Expenses in Washington</h2>
              <p>
                Washington law defines extraordinary health care expenses broadly. Under <strong>RCW 26.19.080(2)</strong>, parents typically share the costs of:
              </p>
              <ul>
                <li><strong>Copayments and Deductibles:</strong> Any out-of-pocket costs required by the insurance plan for office visits, ER visits, or procedures.</li>
                <li><strong>Dental and Orthodontia:</strong> Routine cleanings, fillings, braces, and other specialized dental work.</li>
                <li><strong>Vision and Eyeglasses:</strong> Eye exams, frames, lenses, and contact lenses.</li>
                <li><strong>Mental Health Treatment:</strong> Counseling, therapy, and psychiatric evaluations.</li>
                <li><strong>Prescription Medications:</strong> The cost of medications not fully covered by insurance.</li>
                <li><strong>Chiropractic and Specialized Care:</strong> When medically necessary or ordered by a court.</li>
              </ul>

              <h2>Example Calculations</h2>
              <p><strong>One-Time Expense Example:</strong></p>
              <p>
                A child needs braces costing <strong>$5,000</strong>. Parent 1 earns 60% of the income, and Parent 2 earns 40%. Parent 1 pays the orthodontist in full. Parent 2 owes Parent 1 <strong>$2,000</strong> (40% of $5,000) as reimbursement.
              </p>
              <p><strong>Recurring Monthly Example:</strong></p>
              <p>
                A child has a monthly prescription copay of <strong>$50</strong>. Parent 1 (60% share) pays for the medication each month. Parent 2 (40% share) owes Parent 1 <strong>$20</strong> every month.
              </p>

              <h2>How to Request Medical Expense Reimbursement in Washington</h2>
              <p>
                To ensure you are reimbursed correctly, follow these steps:
              </p>
              <ol>
                <li><strong>Pay the expense and keep the receipt:</strong> You must have proof of payment and an itemized statement of what was provided.</li>
                <li><strong>Send a written request:</strong> Provide the other parent with a copy of the receipt and a clear statement of their proportional share within a reasonable time (often 30 days per many court orders).</li>
                <li><strong>Allow time for payment:</strong> The other parent typically has a reasonable timeframe to reimburse you (check your specific court order for deadlines).</li>
                <li><strong>Enforcement:</strong> If the other parent refuses to pay their share, you may need to file a motion for enforcement at your county Superior Court.</li>
              </ol>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8">
                <h3 className="text-blue-900 mt-0">2026 Washington Medical Split Updates</h3>
                <p className="text-blue-800 mb-0">
                  There were no changes to the proportional approach under <strong>RCW 26.19.080(2)</strong> from EHB 1014. The same income-based splitting rules apply in 2026 as in previous years. Accuracy in determining your "proportional share" percentage remains the most critical step in calculating these reimbursements correctly.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your standard child support obligation first using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>Split monthly <Link href="/health-insurance-calculator">health insurance premiums</Link> or <Link href="/childcare-calculator">childcare costs</Link> proportionally.</li>
                <li><Link href="/washington-courts/snohomish-county">Snohomish County parents</Link> can find local court rules for reimbursement documentation.</li>
                <li>Learn about <Link href="/glossary/healthcare-expenses">healthcare expenses</Link> and what counts in our Washington child support glossary.</li>
              </ul>
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

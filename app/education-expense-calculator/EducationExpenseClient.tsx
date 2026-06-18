"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, GraduationCap, Landmark, AlertTriangle, Info, DollarSign, TrendingUp } from "lucide-react";
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
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("tuition");
  const [frequency, setFrequency] = useState("monthly");
  const [whoPaid, setWhoPaid] = useState("p1");

  const results = useMemo(() => {
    const income1 = parseFloat(p1Income) || 0;
    const income2 = parseFloat(p2Income) || 0;
    let cost = parseFloat(expenseAmount) || 0;

    if (income1 + income2 === 0 || cost === 0) return null;

    if (frequency === "annual") {
      cost = cost / 12;
    }

    const combined = income1 + income2;
    const p1Share = income1 / combined;
    const p2Share = 1 - p1Share;

    const p1Owes = cost * p1Share;
    const p2Owes = cost * p2Share;

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
      p1Share: (p1Share * 100).toFixed(1),
      p2Share: (p2Share * 100).toFixed(1),
      p1Owes,
      p2Owes,
      reimbursement,
      direction,
      monthlyCost: cost,
      annualCost: cost * 12
    };
  }, [p1Income, p2Income, expenseAmount, frequency, whoPaid]);

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
            <p className="eyebrow">RCW 26.19.080(3) · Special Expenses</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Education Expense Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how education and school-related expenses are split between parents proportionally by income. Covers K-12 tuition and post-secondary support.
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
                    <GraduationCap size={20} />
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="expense-amount" className="input-label">Expense Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="expense-amount"
                          type="number"
                          value={expenseAmount}
                          onChange={(e) => setExpenseAmount(e.target.value)}
                          placeholder="e.g. 1000"
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
                        <option value="tuition">Private school tuition</option>
                        <option value="supplies">School supplies and fees</option>
                        <option value="activities">School activities/sports</option>
                        <option value="college">Post-secondary / college</option>
                        <option value="other">Other education expense</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="frequency" className="input-label">Frequency</label>
                      <select
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                        <option value="onetime">One-time</option>
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

              {expenseType === "college" && (
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 shadow-sm no-print">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Info className="text-blue-600" size={20} />
                    College Support Info
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed font-medium">
                    Post-secondary support is advisory in Washington. Courts may order support up to age 23 if the child is enrolled and in good standing. <strong>RCW 26.19.090</strong>
                  </p>
                </div>
              )}
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
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p1Owes)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P2 Share ({results.p2Share}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p2Owes)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Reimbursement</span>
                          <span className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.reimbursement)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{results.direction}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="card-subtle !p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly Cost</div>
                        <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.monthlyCost)}</div>
                      </div>
                      <div className="card-subtle !p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Total</div>
                        <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.annualCost)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/childcare-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Childcare Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="education-expense" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Education Expense Calculator (2026) — Split School and College Costs</h2>
            <div className="prose-standard">
              <p>
                Education expenses, from private school tuition to college costs, can be ordered as part of a Washington child support case. Under <strong>RCW 26.19.080(3)</strong>, school fees, supplies, and long-distance transportation for visitation are split proportionally by income share, just like childcare. Post-secondary education support is handled differently under <strong>RCW 26.19.090</strong> and is advisory rather than mandatory. This calculator covers both K-12 and college expense splits.
              </p>

              <h2>K-12 Education Expenses in Washington</h2>
              <p>
                Washington courts categorize education-related costs as "extraordinary expenses" that are shared in addition to basic child support. Under <strong>RCW 26.19.080(3)</strong>, common shared costs include:
              </p>
              <ul>
                <li><strong>Private School Tuition:</strong> While not automatic, courts may order tuition splitting if private school is "reasonable and necessary" based on the child&apos;s history or special needs.</li>
                <li><strong>School Supplies and Activity Fees:</strong> Registration fees, required uniforms, lab fees, and textbooks.</li>
                <li><strong>Extracurricular Activities:</strong> School-sponsored sports, music programs, and academic clubs.</li>
                <li><strong>Visitation Transportation:</strong> The cost of transporting a child for long-distance residential time can be split proportionally.</li>
              </ul>
              <p>
                The formula for K-12 expenses is a simple proportional split: if Parent A earns 60% of the total income, they pay 60% of the education expense.
              </p>

              <h2>Post-Secondary Education Support (RCW 26.19.090)</h2>
              <p>
                Unlike basic support, which ends when a child turns 18 or graduates high school, Washington courts can order "post-secondary support" for college or vocational training.
              </p>
              <ul>
                <li><strong>Advisory Nature:</strong> The court has broad discretion (advisory) on whether to order college support. It is not mandatory.</li>
                <li><strong>Eligibility:</strong> The child must be enrolled in an accredited school and in good academic standing.</li>
                <li><strong>Duration:</strong> Support typically cannot be ordered beyond the child&apos;s 23rd birthday.</li>
                <li><strong>Academic Records:</strong> The child must provide academic records to both parents to remain eligible.</li>
                <li><strong>Direct Payment:</strong> Courts often order that support be paid directly to the educational institution rather than the other parent.</li>
              </ul>
              <p>
                When deciding whether to order college support, courts consider the parents&apos; education levels, the child&apos;s aptitude, and the parents&apos; financial resources.
              </p>

              <h2>Worked Example — Private School Split</h2>
              <p>
                Parent 1 (P1) earns $5,000/month. Parent 2 (P2) earns $3,000/month. Total: $8,000.
                P1 Share: 62.5%. P2 Share: 37.5%.
              </p>
              <p>
                If private school tuition is <strong>$1,000/month</strong> and P2 pays the school:
              </p>
              <ul>
                <li>P1&apos;s share: $625</li>
                <li>P2&apos;s share: $375</li>
                <li><strong>P1 reimburses P2 $625/month.</strong></li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl my-8 shadow-sm">
                <h3 className="text-amber-900 mt-0">2026 Education Policy Note</h3>
                <p className="text-amber-800 mb-0">
                  The 2026 <strong>EHB 1014</strong> reforms clarified that educational expenses are generally outside the standard Economic Table. Courts retain full discretion to address extraordinary education costs through specific deviation findings under <strong>RCW 26.19.075</strong>. This means education costs are now more clearly treated as additional expenses added on top of the base table amount.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your standard child support obligation first using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>Split other costs like <Link href="/childcare-calculator">childcare</Link> or <Link href="/medical-expense-calculator">uninsured medical expenses</Link> proportionally.</li>
                <li><Link href="/washington-courts/king-county">King County family courts</Link> have specialized dockets for post-secondary support motions.</li>
                <li>Learn about <Link href="/glossary/extraordinary-expenses">extraordinary expenses</Link> requirements in our Washington child support glossary.</li>
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

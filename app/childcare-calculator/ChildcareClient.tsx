"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Coins, Landmark, AlertTriangle, Info, DollarSign, TrendingUp } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface ChildcareClientProps {
  faqs: { question: string; answer: string }[];
}

export default function ChildcareClient({ faqs }: ChildcareClientProps) {
  const [p1Income, setP1Income] = useState("");
  const [p2Income, setP2Income] = useState("");
  const [childcareCost, setChildcareCost] = useState("");
  const [whoPays, setWhoPays] = useState("p1");

  const results = useMemo(() => {
    const income1 = parseFloat(p1Income) || 0;
    const income2 = parseFloat(p2Income) || 0;
    const cost = parseFloat(childcareCost) || 0;

    if (income1 + income2 === 0 || cost === 0) return null;

    const combined = income1 + income2;
    const p1Share = income1 / combined;
    const p2Share = 1 - p1Share;

    const p1Owes = cost * p1Share;
    const p2Owes = cost * p2Share;

    let transfer = 0;
    let direction = "";

    if (whoPays === "p1") {
      transfer = p2Owes;
      direction = "Parent 2 pays Parent 1";
    } else if (whoPays === "p2") {
      transfer = p1Owes;
      direction = "Parent 1 pays Parent 2";
    } else {
      transfer = 0;
      direction = "Already split correctly";
    }

    return {
      p1Share: (p1Share * 100).toFixed(1),
      p2Share: (p2Share * 100).toFixed(1),
      p1Owes,
      p2Owes,
      transfer,
      direction,
      annualCost: cost * 12
    };
  }, [p1Income, p2Income, childcareCost, whoPays]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Childcare Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.080(3) · Proportional Split</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Childcare Cost Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how childcare costs are split between parents proportionally based on income. Under Washington law, special expenses are shared in addition to basic child support.
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
                    <Coins size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Expense Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="p1-income" className="input-label">Your Monthly Net Income</label>
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
                      <label htmlFor="p2-income" className="input-label">Other Parent Monthly Net Income</label>
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

                  <div>
                    <label htmlFor="childcare-cost" className="input-label">Total Monthly Childcare Cost</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="childcare-cost"
                        type="number"
                        value={childcareCost}
                        onChange={(e) => setChildcareCost(e.target.value)}
                        placeholder="e.g. 800"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">Daycare, after-school, summer</p>
                  </div>

                  <div>
                    <label htmlFor="who-pays" className="input-label">Who Pays the Provider?</label>
                    <select
                      id="who-pays"
                      value={whoPays}
                      onChange={(e) => setWhoPays(e.target.value)}
                      className="input-standard w-full"
                    >
                      <option value="p1">I pay (Parent 1)</option>
                      <option value="p2">Other parent pays (Parent 2)</option>
                      <option value="split">We split it already</option>
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
                          <span className="text-gray-500 font-medium">Parent 1 Share ({results.p1Share}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p1Owes)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Parent 2 Share ({results.p2Share}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p2Owes)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Monthly Transfer</span>
                          <span className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.transfer)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{results.direction}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="card-subtle !p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Cost</div>
                        <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.annualCost)}</div>
                      </div>
                      <div className="card-subtle !p-4 bg-blue-50/50 border-blue-100">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Citaton</div>
                        <div className="text-sm font-bold text-blue-600">RCW 26.19.080(3)</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Basic Support <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="childcare" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and cost details to see the proportional split.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Childcare Cost Calculator (2026) — Split Daycare Expenses Proportionally</h2>
            <div className="prose-standard">
              <p>
                Childcare costs are not included in Washington&apos;s basic child support obligation. Under <strong>RCW 26.19.080(3)</strong>, daycare and other work-related childcare expenses are split separately between parents in the same proportion as their basic support obligation — that is, proportionally by income share. This means the parent who earns more pays more of the childcare bill, regardless of who writes the check to the provider.
              </p>

              <h2>How Washington Splits Childcare Costs</h2>
              <p>
                Washington&apos;s proportional income share approach to childcare costs reflects a simple principle: each parent contributes to their child&apos;s care in proportion to their financial capacity.
              </p>
              <p><strong>Step 1 — Calculate each parent&apos;s income share percentage.</strong></p>
              <p>
                Divide each parent&apos;s monthly net income by the combined monthly net income.
                Example: Parent A earns $5,000. Parent B earns $3,000. Combined: $8,000.
                Parent A share: 62.5%. Parent B share: 37.5%.
              </p>
              <p><strong>Step 2 — Apply each share to the total monthly childcare cost.</strong></p>
              <p>
                Example: Daycare costs $800/month.
                Parent A owes: $800 × 62.5% = $500.
                Parent B owes: $800 × 37.5% = $300.
              </p>
              <p><strong>Step 3 — Determine the transfer payment.</strong></p>
              <p>
                If Parent A pays the provider directly, Parent B owes Parent A $300/month as reimbursement.
              </p>
              <p>
                Under the 2026 Washington State Child Support Schedule, this proportional approach applies to:
              </p>
              <ul>
                <li>Work-related daycare expenses</li>
                <li>Before and after school care programs</li>
                <li>Summer childcare programs</li>
                <li>Other necessary work-related care</li>
              </ul>
              <p>
                Personal childcare expenses not related to work or the child&apos;s wellbeing may not qualify under <strong>RCW 26.19.080(3)</strong>.
              </p>

              <h2>Example — Daycare Split Calculation</h2>
              <p>
                Parent A net income: $6,000/month (60%)<br />
                Parent B net income: $4,000/month (40%)<br />
                Monthly daycare cost: $1,200
              </p>
              <p>
                Parent A owes: $720/month (60%)<br />
                Parent B owes: $480/month (40%)
              </p>
              <p>
                Parent A pays the daycare provider $1,200. Parent B reimburses Parent A $480/month. This amount is separate from basic child support.
              </p>
              <p>
                Annual daycare cost: $14,400<br />
                Parent A annual share: $8,640<br />
                Parent B annual share: $5,760
              </p>

              <h2>What Childcare Expenses Qualify in Washington Child Support</h2>
              <p>
                Under <strong>RCW 26.19.080(3)</strong>, the following expenses are generally included if they are work-related:
              </p>
              <ul>
                <li><strong>Work-Related Care:</strong> Costs incurred so either parent can work or attend school/training.</li>
                <li><strong>School Age Programs:</strong> Before and after school care required for work schedules.</li>
                <li><strong>Summer Programs:</strong> Summer camps or daycare when school is not in session.</li>
                <li><strong>Special Needs Care:</strong> Necessary care related to a child&apos;s disability.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8">
                <h3 className="text-blue-900 mt-0">2026 Washington Childcare Updates</h3>
                <p className="text-blue-800 mb-0">
                  The 2026 <strong>EHB 1014</strong> reforms did not change how childcare costs are calculated. The proportional income share approach under RCW 26.19.080(3) remains the same. However, the updated economic table means some parents will have higher basic support obligations, which changes the income share percentages used for childcare splits.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your standard child support obligation first using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>Split other medical costs with our <Link href="/health-insurance-calculator">health insurance calculator</Link> and <Link href="/medical-expense-calculator">medical expense calculator</Link>.</li>
                <li><Link href="/washington-courts/king-county">King County</Link> has specific rules for documented daycare provider payments.</li>
                <li>Learn what <Link href="/glossary/proportional-share">proportional share</Link> means in our Washington child support glossary.</li>
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

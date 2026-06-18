"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, DollarSign, Users, Info, Plus } from "lucide-react";
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
  const [cost, setCost] = useState("");
  const [whoPays, setWhoPays] = useState("p1");

  const results = useMemo(() => {
    const inc1 = parseFloat(p1Income) || 0;
    const inc2 = parseFloat(p2Income) || 0;
    const childcareCost = parseFloat(cost) || 0;
    const totalInc = inc1 + inc2;

    if (totalInc === 0) return null;

    const p1Share = inc1 / totalInc;
    const p2Share = inc2 / totalInc;
    const p1Owes = childcareCost * p1Share;
    const p2Owes = childcareCost * p2Share;

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
      annualCost: childcareCost * 12
    };
  }, [p1Income, p2Income, cost, whoPays]);

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
            <p className="eyebrow">RCW 26.19.080(3) · 2026 Guidelines</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Childcare Split Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how childcare and daycare expenses are shared between parents in Washington State. Costs are split proportionally based on each parent's monthly net income.
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
                    <Users size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Income & Costs</h2>
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
                    <label htmlFor="cost" className="input-label">Total Monthly Childcare Cost</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="cost"
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="e.g. 800"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">Daycare, after-school, summer programs</p>
                  </div>

                  <div>
                    <label htmlFor="who-pays" className="input-label">Who Pays Provider?</label>
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
                    <div className="card-standard shadow-sm border-gray-200">
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
                          <div className="text-right">
                            <div className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.transfer)}</div>
                            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{results.direction}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="card-subtle !p-4 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase">Annual Total Cost</span>
                        <span className="text-lg font-bold text-gray-900">{curFormatter.format(results.annualCost)}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed font-medium">
                      Legal Citation: <strong>RCW 26.19.080(3)</strong>. Special child rearing expenses, including daycare and childcare, shall be shared by the parents in the same proportion as the basic child support obligation.
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/health-insurance-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Health Insurance Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="basic" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <DollarSign size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and costs to see the split analysis.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How Childcare Costs Work in Washington State</h2>
            <div className="prose-standard">
              <p>
                In Washington State, childcare expenses are considered "special child-rearing expenses." Unlike the basic support obligation which covers food, clothing, and shelter, childcare costs are listed as a separate line item on the child support worksheet.
              </p>
              <p>
                According to <strong>RCW 26.19.080(3)</strong>, these costs must be shared proportionally based on the parents' monthly net incomes.
              </p>

              <h3>What is Included?</h3>
              <ul>
                <li>Work-related daycare or preschool</li>
                <li>Before and after school care</li>
                <li>Summer camps and seasonal programs required for parent employment</li>
              </ul>

              <h3>How to Handle Payments</h3>
              <p>
                Typically, the parent who pays the provider directly is entitled to a monthly reimbursement from the other parent for their proportional share. This is usually added to the monthly child support transfer payment or paid as a separate reimbursement.
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

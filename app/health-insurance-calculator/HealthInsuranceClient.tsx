"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, HeartPulse, Shield, Info, DollarSign } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface HealthInsuranceClientProps {
  faqs: { question: string; answer: string }[];
}

export default function HealthInsuranceClient({ faqs }: HealthInsuranceClientProps) {
  const [p1Income, setP1Income] = useState("");
  const [p2Income, setP2Income] = useState("");
  const [premium, setPremium] = useState("");
  const [whoPays, setWhoPays] = useState("p1");

  const results = useMemo(() => {
    const inc1 = parseFloat(p1Income) || 0;
    const inc2 = parseFloat(p2Income) || 0;
    const premiumCost = parseFloat(premium) || 0;
    const totalInc = inc1 + inc2;

    if (totalInc === 0) return null;

    const p1Share = inc1 / totalInc;
    const p2Share = inc2 / totalInc;
    const p1Owes = premiumCost * p1Share;
    const p2Owes = premiumCost * p2Share;

    let transfer = 0;
    let direction = "";
    if (whoPays === "p1") {
      transfer = p2Owes;
      direction = "Parent 2 reimburses Parent 1";
    } else {
      transfer = p1Owes;
      direction = "Parent 1 reimburses Parent 2";
    }

    return {
      p1SharePercent: (p1Share * 100).toFixed(1),
      p2SharePercent: (p2Share * 100).toFixed(1),
      p1Owes,
      p2Owes,
      transfer,
      direction,
      annualTotal: premiumCost * 12
    };
  }, [p1Income, p2Income, premium, whoPays]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Health Insurance Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.080(2) · 2026 Guidelines</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Health Insurance Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how to split the cost of health insurance premiums for your children. Washington State law requires parents to share these costs proportionally based on income.
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
                    <Shield size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Premium & Income</h2>
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

                  <div>
                    <label htmlFor="premium" className="input-label">Monthly Premium for Children</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="premium"
                        type="number"
                        value={premium}
                        onChange={(e) => setPremium(e.target.value)}
                        placeholder="e.g. 400"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">Children's portion only. Not your own coverage.</p>
                  </div>

                  <div>
                    <label htmlFor="who-pays" className="input-label">Who Pays Premium?</label>
                    <select
                      id="who-pays"
                      value={whoPays}
                      onChange={(e) => setWhoPays(e.target.value)}
                      className="input-standard w-full"
                    >
                      <option value="p1">I pay (Parent 1)</option>
                      <option value="p2">Other parent pays (Parent 2)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Premium Analysis
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
                          <span className="text-base font-bold text-gray-900">Monthly Reimbursement</span>
                          <div className="text-right">
                            <div className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.transfer)}</div>
                            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{results.direction}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="card-subtle !p-4 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase">Annual Premium Total</span>
                        <span className="text-lg font-bold text-gray-900">{curFormatter.format(results.annualTotal)}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed font-medium">
                      Legal Citation: <strong>RCW 26.19.080(2)</strong>. Health care costs shall be shared by the parents in the same proportion as the basic child support obligation.
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/medical-expense-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Medical Expense Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="basic" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <HeartPulse size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and premium to see the split analysis.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Health Insurance Rules in Washington Child Support</h2>
            <div className="prose-standard">
              <p>
                In Washington State, health insurance for children is a mandatory part of every child support order. Under <strong>RCW 26.19.080</strong>, parents are required to provide medical support for their children.
              </p>

              <h3>Who provides the insurance?</h3>
              <p>
                The court will typically order the parent who has access to the best health insurance at the most reasonable cost (usually through an employer) to maintain coverage for the children.
              </p>

              <h3>Proportional Sharing</h3>
              <p>
                The <em>cost</em> of the insurance premium (specifically the portion attributable to the children) is shared between parents based on their respective incomes. If Parent 1 pays a $400 premium and earns 60% of the combined income, they are responsible for $240 of that cost, and Parent 2 must reimburse them for the remaining $160 (40%).
              </p>

              <h3>Reasonable Cost</h3>
              <p>
                Health insurance is generally considered mandatory if it is available at a "reasonable cost," which is typically defined as not exceeding 5% of the parent's gross income.
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

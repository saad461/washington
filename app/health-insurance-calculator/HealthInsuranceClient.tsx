"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Shield, Landmark, AlertTriangle, Info, DollarSign, TrendingUp } from "lucide-react";
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
    const income1 = parseFloat(p1Income) || 0;
    const income2 = parseFloat(p2Income) || 0;
    const cost = parseFloat(premium) || 0;

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
      direction = "Parent 2 reimburses Parent 1";
    } else {
      transfer = p1Owes;
      direction = "Parent 1 reimburses Parent 2";
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
            <p className="eyebrow">RCW 26.19.080(2) · Healthcare Split</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Health Insurance Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate how to split children&apos;s health insurance premiums between parents proportionally by income. This ensures both parents contribute fairly to medical coverage costs.
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
                  <h2 className="text-xl font-bold">Premium Details</h2>
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

                  <div>
                    <label htmlFor="premium-cost" className="input-label">Monthly Premium for Children</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="premium-cost"
                        type="number"
                        value={premium}
                        onChange={(e) => setPremium(e.target.value)}
                        placeholder="e.g. 400"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">Children&apos;s portion only. Not your own coverage.</p>
                  </div>

                  <div>
                    <label htmlFor="who-pays" className="input-label">Who Pays the Premium?</label>
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
                  Split Analysis
                </h3>

                {results ? (
                  <div className="space-y-6">
                    <div className="card-standard shadow-sm border-gray-200 !p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P1 Obligation ({results.p1Share}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p1Owes)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">P2 Obligation ({results.p2Share}%)</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.p2Owes)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Reimbursement</span>
                          <span className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.transfer)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{results.direction}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="card-subtle !p-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Annual Total</div>
                        <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.annualCost)}</div>
                      </div>
                      <div className="card-subtle !p-4 bg-blue-50/50 border-blue-100">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Citaton</div>
                        <div className="text-sm font-bold text-blue-600">RCW 26.19.080(2)</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/medical-expense-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Calculate Uninsured Split <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="health-insurance" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter income and premium details to see the proportional split.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Health Insurance Calculator (2026) — Split Children&apos;s Premium Costs</h2>
            <div className="prose-standard">
              <p>
                Health insurance premiums for children are not included in Washington&apos;s basic child support obligation. Under <strong>RCW 26.19.080(2)</strong>, healthcare costs are shared between parents in the same proportion as their basic support obligation. The parent who carries the children on their insurance plan is entitled to reimbursement from the other parent for their proportional share of the premium cost each month.
              </p>

              <h2>How Washington Splits Health Insurance Premiums</h2>
              <p>
                Washington uses a proportional income share approach to splitting health insurance premiums. This means that if Parent A earns 60% of the combined monthly net income and Parent B earns 40%, Parent A is responsible for 60% of the children&apos;s premium cost and Parent B is responsible for 40%.
              </p>
              <p>
                Under <strong>RCW 26.19.080(2)</strong>, health care costs include:
              </p>
              <ul>
                <li><strong>Medical Premiums:</strong> The monthly cost to add the children to an insurance plan.</li>
                <li><strong>Dental Insurance:</strong> Premiums for children&apos;s dental coverage.</li>
                <li><strong>Vision Insurance:</strong> Monthly costs for vision-specific plans.</li>
                <li><strong>Specialized Care:</strong> Orthodontia, chiropractic, mental health, and prescriptions.</li>
              </ul>
              <p>
                The court can order either parent to maintain health insurance if it is available at a "reasonable cost" through their employer. If both parents have coverage available, the court will typically choose the plan that provides the best value or coverage for the children.
              </p>

              <h2>Worked Example</h2>
              <p>
                Parent 1 (P1) Monthly Net Income: $5,000<br />
                Parent 2 (P2) Monthly Net Income: $3,000<br />
                Combined Net Income: $8,000
              </p>
              <p>
                P1 Income Share: 62.5% ($5,000 ÷ $8,000)<br />
                P2 Income Share: 37.5% ($3,000 ÷ $8,000)
              </p>
              <p>
                If the monthly health insurance premium for the children is <strong>$400</strong> and P1 pays the employer directly:
              </p>
              <ul>
                <li>P1&apos;s share: $250 ($400 × 62.5%)</li>
                <li>P2&apos;s share: $150 ($400 × 37.5%)</li>
                <li><strong>P2 reimburses P1 $150/month.</strong></li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8">
                <h3 className="text-blue-900 mt-0">2026 Washington Healthcare Updates</h3>
                <p className="text-blue-800 mb-0">
                  The <strong>EHB 1014</strong> reforms did not change how healthcare cost splitting works in Washington. The proportional approach under RCW 26.19.080(2) remains unchanged. However, because the updated 2026 economic table covers higher combined incomes (up to $50,000/month), courts are now more likely to see cases where premium splitting involves substantial employer-sponsored plan costs.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your standard child support obligation first using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>Split other costs like <Link href="/childcare-calculator">childcare</Link> or <Link href="/medical-expense-calculator">uninsured medical expenses</Link> using our proportional tools.</li>
                <li><Link href="/washington-courts/pierce-county">Pierce County parents</Link> use this same proportional formula for premium splits.</li>
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

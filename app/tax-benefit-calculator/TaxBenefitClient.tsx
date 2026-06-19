"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, DollarSign, Landmark, AlertTriangle, Info, TrendingUp } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface TaxBenefitClientProps {
  faqs: { question: string; answer: string }[];
}

export default function TaxBenefitClient({ faqs }: TaxBenefitClientProps) {
  const [annualIncome, setAnnualIncome] = useState("");
  const [children, setChildren] = useState("1");
  const [filingStatus, setFilingStatus] = useState("single");
  const [whoClaims, setWhoClaims] = useState("notset");

  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const numChildren = parseInt(children) || 1;

    if (income === 0) return null;

    // 2026 Estimated CTC: $2,000 per child
    const CTC_PER_CHILD = 2000;
    const phaseoutThreshold = filingStatus === "married" ? 400000 : 200000;

    const excessIncome = Math.max(0, income - phaseoutThreshold);
    const reductionPer1000 = Math.floor(excessIncome / 1000) * 50;
    const finalCTCPerChild = Math.max(0, CTC_PER_CHILD - reductionPer1000);
    const totalCTC = finalCTCPerChild * numChildren;

    return {
      ctcPerChild: finalCTCPerChild,
      numChildren,
      totalCTC,
      monthlyBenefit: totalCTC / 12,
      isPhasedOut: reductionPer1000 > 0,
      phaseoutThreshold
    };
  }, [annualIncome, children, filingStatus]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Tax Benefit Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">2026 Child Tax Credit · RCW 26.19.100</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Tax Benefit Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Estimate the financial value of claiming your child as a dependent on your federal taxes. Calculate the 2026 Child Tax Credit and understand how Washington courts allocate exemptions.
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
                    <DollarSign size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Tax Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="annual-income" className="input-label">Your Annual Gross Income</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="annual-income"
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        placeholder="e.g. 80000"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">The annual income of the parent claiming the child</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="num-children" className="input-label">Children to Claim</label>
                      <input
                        id="num-children"
                        type="number"
                        min="1"
                        max="5"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className="input-standard w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="filing-status" className="input-label">Filing Status</label>
                      <select
                        id="filing-status"
                        value={filingStatus}
                        onChange={(e) => setFilingStatus(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="single">Single</option>
                        <option value="hoh">Head of household</option>
                        <option value="married">Married filing jointly</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="who-claims" className="input-label">Who Currently Claims the Children?</label>
                    <select
                      id="who-claims"
                      value={whoClaims}
                      onChange={(e) => setWhoClaims(e.target.value)}
                      className="input-standard w-full"
                    >
                      <option value="me">I claim the child</option>
                      <option value="other">Other parent claims</option>
                      <option value="alternating">We alternate years</option>
                      <option value="notset">Not yet determined</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm no-print">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="text-blue-500" size={20} />
                  Court Authority
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Washington courts can order which parent claims children as dependents under <strong>RCW 26.19.100</strong>. Courts may alternate years, split exemptions among children, or order a parent to sign <strong>IRS Form 8332</strong>.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Benefit Analysis
                </h3>

                {results ? (
                  <div className="space-y-6">
                    <div className="card-standard shadow-sm border-gray-200 !p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">CTC Per Child</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.ctcPerChild)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Number of Children</span>
                          <span className="font-bold text-gray-900">{results.numChildren}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Total Annual Credit</span>
                          <span className="text-2xl font-extrabold text-blue-600">{curFormatter.format(results.totalCTC)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-blue-50">
                          <span className="text-sm font-bold text-gray-500">Monthly Equivalent</span>
                          <span className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.monthlyBenefit)}/mo</span>
                        </div>
                      </div>
                    </div>

                    {results.isPhasedOut && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-relaxed font-medium">
                        <strong>Phase-out Note:</strong> Your income is above the {curFormatter.format(results.phaseoutThreshold)} threshold. The Child Tax Credit is reduced by $50 for every $1,000 of excess income.
                      </div>
                    )}

                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-[11px] text-gray-500 italic shadow-sm">
                      Tax estimates based on projected 2026 guidelines. Consult a tax professional for advice specific to your financial situation.
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/net-income-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Check Net Income <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="tax-benefit" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter your annual income to see the estimated tax credit value.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Child Tax Benefit Calculator (2026) — How Much Is Claiming Your Child Worth?</h2>
            <div className="prose-standard">
              <p>
                Claiming a child as a dependent on federal taxes is worth up to $2,000 per child in 2026 through the Child Tax Credit. Washington courts can order which parent claims the child as a dependent or alternate the exemption between parents under <strong>RCW 26.19.100</strong>. Courts can also order a parent to sign <strong>IRS Form 8332</strong> releasing the exemption. Understanding the financial value of this benefit helps parents negotiate parenting plans and support orders.
              </p>

              <h2>2026 Child Tax Credit — What Is It Worth?</h2>
              <p>
                The Child Tax Credit (CTC) is a direct reduction of your federal income tax liability. In 2026, the estimated credit is <strong>$2,000 per qualifying child</strong>.
              </p>
              <ul>
                <li><strong>Income Phase-outs:</strong> The credit begins to phase out for single/HOH filers earning over <strong>$200,000</strong> and married filers earning over <strong>$400,000</strong>.</li>
                <li><strong>Reduction Formula:</strong> For every $1,000 of income over the threshold, the credit is reduced by $50.</li>
                <li><strong>Refundability:</strong> If your tax liability is zero, a portion of the credit (the Additional Child Tax Credit) may still be refundable to you.</li>
                <li><strong>Monthly Value:</strong> At the full $2,000 amount, the credit is worth approximately <strong>$167 per month</strong> per child. This is significant when compared to the average monthly child support payment.</li>
              </ul>

              <h2>How Washington Courts Handle the Tax Exemption (RCW 26.19.100)</h2>
              <p>
                Under Washington law, the tax exemption is an asset that the court has the authority to allocate. Per <strong>RCW 26.19.100</strong>, courts typically handle the exemption in one of three ways:
              </p>
              <ol>
                <li><strong>Awarding to one parent:</strong> Often the parent with whom the child resides the majority of the time.</li>
                <li><strong>Alternating years:</strong> Parent A claims the child in even years, and Parent B claims in odd years.</li>
                <li><strong>Splitting among children:</strong> If there are multiple children, the court may award one exemption to each parent.</li>
              </ol>
              <p>
                The court can order a parent to sign <strong>IRS Form 8332</strong>, which allows the non-custodial parent to claim the child. While the court will usually respect an agreement between the parents, they must ensure the allocation is equitable. Note that under <strong>RCW 26.19.075</strong>, the tax benefit alone cannot be the sole reason for a deviation from the standard child support amount.
              </p>

              <h2>Worked Example — Child Tax Credit</h2>
              <p>
                A single parent earning <strong>$60,000/year</strong> with one child:
              </p>
              <ul>
                <li><strong>Base Credit:</strong> $2,000</li>
                <li><strong>Phase-out Threshold:</strong> $200,000 (Income is below threshold)</li>
                <li><strong>Total Credit:</strong> $2,000</li>
                <li><strong>Monthly Value:</strong> $166.67/month</li>
              </ul>
              <p>
                In this case, the parent receives the full $2,000 credit, which offsets their federal tax bill dollar-for-dollar.
              </p>

              <h2>Who Benefits More From Claiming the Child?</h2>
              <p>
                While this tool provides estimates, the actual benefit depends on your total tax picture. Generally:
              </p>
              <ul>
                <li><strong>Higher Income Parents:</strong> Usually benefit more from the full $2,000 CTC value if they have a tax liability to offset.</li>
                <li><strong>Lower Income Parents:</strong> May benefit more from filing as <strong>Head of Household</strong>, which provides a higher standard deduction and lower tax rates, regardless of who claims the $2,000 credit.</li>
                <li><strong>High Earners:</strong> Once income exceeds $200k/$400k, the credit phases out, making the exemption less valuable to the high earner than to the other parent.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8">
                <h3 className="text-blue-900 mt-0">2026 Tax Planning</h3>
                <p className="text-blue-800 mb-0">
                  The 2026 tax year marks the return of several standard tax rules following the expiration of temporary pandemic-era expansions. The <strong>EHB 1014</strong> reforms in Washington did not change RCW 26.19.100, so the court&apos;s authority to allocate these exemptions remains unchanged. Always coordinate with your CPA or tax advisor when negotiating these terms in a parenting plan.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your standard child support obligation first using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>Understand how your filing status affects your <Link href="/net-income-calculator">net monthly income</Link>.</li>
                <li>If you need to change who claims the child, check our <Link href="/modification-calculator">modification calculator</Link> for eligibility.</li>
                <li><Link href="/washington-courts/king-county">King County family court</Link> judges often use alternating-year exemptions as a default for 50/50 parents.</li>
                <li>Learn the difference between a <Link href="/glossary/dependent-exemption">dependent exemption</Link> and the tax credit in our glossary.</li>
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

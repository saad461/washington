"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, ShieldCheck, Info, DollarSign, Users, Scale, AlertCircle } from "lucide-react";
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
  const [income, setIncome] = useState("");
  const [children, setChildren] = useState("1");
  const [filingStatus, setFilingStatus] = useState("single");
  const [whoClaims, setWhoClaims] = useState("notset");

  const results = useMemo(() => {
    const annualIncome = parseFloat(income) || 0;
    const numChildren = parseInt(children) || 1;

    // 2026 CTC Estimate: $2,000 per child
    const CTC_PER_CHILD = 2000;
    const phaseoutThreshold = filingStatus === "married" ? 400000 : 200000;

    const excessIncome = Math.max(0, annualIncome - phaseoutThreshold);
    const reductionPer1000 = Math.floor(excessIncome / 1000) * 50;
    const ctcPerChild = Math.max(0, CTC_PER_CHILD - reductionPer1000);
    const totalCTC = ctcPerChild * numChildren;
    const monthlyBenefit = totalCTC / 12;

    return {
      ctcPerChild,
      numChildren,
      totalCTC,
      monthlyBenefit,
      isPhasedOut: reductionPer1000 > 0,
      phaseoutThreshold
    };
  }, [income, children, filingStatus]);

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
            <p className="eyebrow">RCW 26.19.100 · 2026 Estimates</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Tax Benefit Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Estimate the value of the Child Tax Credit (CTC) for your children in 2026. See how claiming a dependent affects your household finances and child support planning.
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
                  <h2 className="text-xl font-bold">Tax Filing Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="income" className="input-label">Your Annual Gross Income</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        id="income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="e.g. 80000"
                        className="input-standard pl-8 w-full"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">The parent claiming the child</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="children" className="input-label">Number of Children to Claim</label>
                      <input
                        id="children"
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
                    <label htmlFor="who-claims" className="input-label">Who Currently Claims?</label>
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
                  <Scale className="text-blue-600" size={20} />
                  Court Authority
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Washington courts can order which parent claims children as dependents under <strong>RCW 26.19.100</strong>. The court has the authority to alternate years or split exemptions among multiple children to ensure a fair distribution of tax benefits.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Benefit Analysis
                </h3>

                <div className="space-y-6">
                  <div className="card-standard shadow-sm border-gray-200 !p-6 bg-green-50/30">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Credit Per Child</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(results.ctcPerChild)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Qualifying Children</span>
                        <span className="font-bold text-gray-900">{results.numChildren}</span>
                      </div>
                      <hr className="border-green-100" />
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Annual Benefit</span>
                        <span className="text-2xl font-extrabold text-green-600">{curFormatter.format(results.totalCTC)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-green-100">
                        <span className="text-sm font-bold text-gray-700">Monthly Equivalent</span>
                        <span className="text-lg font-bold text-green-700">{curFormatter.format(results.monthlyBenefit)}/mo</span>
                      </div>
                    </div>
                  </div>

                  {results.isPhasedOut && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed font-medium flex gap-3">
                      <AlertCircle size={18} className="shrink-0" />
                      <p>
                        <strong>Phase-out Active:</strong> Your income exceeds the {curFormatter.format(results.phaseoutThreshold)} threshold. The Child Tax Credit is reduced by $50 for every $1,000 over the limit.
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-[11px] text-gray-500 leading-relaxed">
                    <strong>Disclaimer:</strong> Tax estimates based on projected 2026 guidelines. Consult a tax professional for advice specific to your situation. Official 2026 IRS rules will be published in late 2025.
                  </div>

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <Link href="/net-income-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                      Check Net Monthly Income <ArrowRight size={18} />
                    </Link>
                  </div>

                  <CrossSuggestions calculatorType="modification" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Child Tax Credit in 2026</h2>
            <div className="prose-standard">
              <p>
                The federal Child Tax Credit (CTC) is one of the most significant financial benefits available to parents. When parents divorce or separate in Washington, determining who gets to claim this credit is often a major point of negotiation.
              </p>

              <h3>Who gets to claim the credit?</h3>
              <p>
                Under IRS rules, the "custodial parent" (the parent with whom the child lives for the greater part of the year) typically has the right to claim the child. However, Washington State courts have the authority under <strong>RCW 26.19.100</strong> to allocate the tax exemption to the non-custodial parent if it is deemed fair.
              </p>

              <h3>IRS Form 8332</h3>
              <p>
                If the court orders the non-custodial parent to claim the child, the custodial parent must sign <strong>IRS Form 8332</strong>. This form "releases" the claim to the other parent. Without this signed form, the non-custodial parent cannot legally claim the child, even if a state court order says they can.
              </p>

              <h3>Phase-out Limits</h3>
              <p>
                The Child Tax Credit is not available to everyone. It begins to phase out (decrease) once your income reaches a certain level:
              </p>
              <ul>
                <li><strong>Single / Head of Household:</strong> Starts phasing out at $200,000</li>
                <li><strong>Married Filing Jointly:</strong> Starts phasing out at $400,000</li>
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

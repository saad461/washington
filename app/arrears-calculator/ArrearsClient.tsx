"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Landmark, AlertTriangle, Info, DollarSign, TrendingUp } from "lucide-react";
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

interface ArrearsClientProps {
  faqs: { question: string; answer: string }[];
}

export default function ArrearsClient({ faqs }: ArrearsClientProps) {
  const [monthlyOrder, setMonthlyOrder] = useState("");
  const [monthsMissed, setMonthsMissed] = useState("");
  const [existingArrears, setExistingArrears] = useState("0");
  const [partialPayments, setPartialPayments] = useState("0");

  const results = useMemo(() => {
    const orderAmt = parseFloat(monthlyOrder) || 0;
    const missed = parseInt(monthsMissed) || 0;
    const existing = parseFloat(existingArrears) || 0;
    const partial = parseFloat(partialPayments) || 0;

    if (orderAmt === 0 && existing === 0) return null;

    const newArrears = (orderAmt * missed) - partial;
    const totalArrears = existing + Math.max(0, newArrears);

    const INTEREST_RATE = 0.12; // 12%
    const annualInterest = totalArrears * INTEREST_RATE;
    const monthlyInterest = annualInterest / 12;
    const totalWithInterest = totalArrears + annualInterest;

    const payoff10 = totalArrears * 0.10;
    const payoff20 = totalArrears * 0.20;

    return {
      newArrears,
      existingArrears: existing,
      totalArrears,
      annualInterest,
      monthlyInterest,
      totalWithInterest,
      payoff10,
      payoff20
    };
  }, [monthlyOrder, monthsMissed, existingArrears, partialPayments]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Arrears Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.23.060 · 12% Interest</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Arrears Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate unpaid child support arrears and the 12% annual interest required by Washington law. Estimate how long it will take to pay off back child support.
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
                    <Landmark size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Unpaid Support Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="monthly-order" className="input-label">Monthly Court Ordered Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="monthly-order"
                          type="number"
                          value={monthlyOrder}
                          onChange={(e) => setMonthlyOrder(e.target.value)}
                          placeholder="e.g. 794"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="months-missed" className="input-label">Months of Missed Payments</label>
                      <input
                        id="months-missed"
                        type="number"
                        min="1"
                        value={monthsMissed}
                        onChange={(e) => setMonthsMissed(e.target.value)}
                        placeholder="e.g. 6"
                        className="input-standard w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="existing-arrears" className="input-label">Existing Arrears Balance</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="existing-arrears"
                          type="number"
                          value={existingArrears}
                          onChange={(e) => setExistingArrears(e.target.value)}
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="partial-payments" className="input-label">Total Partial Payments Made</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="partial-payments"
                          type="number"
                          value={partialPayments}
                          onChange={(e) => setPartialPayments(e.target.value)}
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">Payments made during missed period</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm no-print">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={20} />
                  Legal Warning
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Washington charges <strong>12% annual interest</strong> on unpaid child support under <strong>RCW 26.23.060</strong>. Interest accrues from the date each payment was due. Failure to pay can lead to license suspension, wage garnishment, and contempt of court.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Arrears Analysis
                </h3>

                {results ? (
                  <div className="space-y-6">
                    <div className="card-standard shadow-sm border-gray-200 !p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">New Arrears Accumulation</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.newArrears)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Existing Balance</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.existingArrears)}</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Total Arrears</span>
                          <span className="text-2xl font-extrabold text-red-600">{curFormatter.format(results.totalArrears)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-standard shadow-sm border-gray-200 !p-6 bg-red-50/30">
                      <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-4">Interest Calculations (12%)</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Monthly Interest Accrual</span>
                          <span className="font-bold text-gray-900">{curSmallFormatter.format(results.monthlyInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Annual Interest Total</span>
                          <span className="font-bold text-gray-900">{curSmallFormatter.format(results.annualInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2 border-t border-red-100">
                          <span className="text-gray-900 font-bold">Total with 1yr Interest</span>
                          <span className="font-extrabold text-gray-900">{curSmallFormatter.format(results.totalWithInterest)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Payoff Scenarios</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="card-subtle !p-4 flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold text-blue-600 uppercase">10% Extra Plan</div>
                            <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.payoff10)}/mo</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Duration</div>
                            <div className="text-sm font-bold text-gray-900">10 Months</div>
                          </div>
                        </div>
                        <div className="card-subtle !p-4 flex justify-between items-center">
                          <div>
                            <div className="text-xs font-bold text-blue-600 uppercase">20% Extra Plan</div>
                            <div className="text-lg font-extrabold text-gray-900">{curFormatter.format(results.payoff20)}/mo</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Duration</div>
                            <div className="text-sm font-bold text-gray-900">5 Months</div>
                          </div>
                        </div>
                        <div className="card-subtle !p-4 border-red-100 bg-red-50/50">
                           <div className="flex justify-between items-center mb-1">
                             <div className="text-xs font-bold text-red-600 uppercase">Interest Only</div>
                             <div className="text-lg font-extrabold text-gray-900">{curSmallFormatter.format(results.monthlyInterest)}/mo</div>
                           </div>
                           <p className="text-[10px] text-red-500 font-bold leading-tight">
                             ⚠️ Warning: Paying interest only means your arrears balance never decreases.
                           </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/modification-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Check for Modification <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="modification" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter your order details to calculate arrears and interest.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Child Support Arrears in Washington</h2>
            <div className="prose-standard">
              <p>
                In Washington State, when a parent fails to pay their court-ordered child support, the unpaid amount is called <strong>arrears</strong> or back child support. Arrears are a legal debt that is enforceable by the court and the Division of Child Support (DCS).
              </p>

              <h3>Interest Rates</h3>
              <p>
                Under <strong>RCW 26.23.060</strong>, all past-due child support payments automatically accrue interest at the rate of <strong>12% per annum</strong>. This interest is mandatory and cannot be waived by a judge unless specifically allowed by limited state programs for state-owed debt.
              </p>

              <h3>Enforcement Actions</h3>
              <p>
                The state has powerful tools to collect child support arrears, including:
              </p>
              <ul>
                <li><strong>Wage Garnishment:</strong> Deducting money directly from your paycheck.</li>
                <li><strong>Tax Intercept:</strong> Seizing federal tax refunds.</li>
                <li><strong>License Suspension:</strong> Suspending driver's, professional, or recreational licenses.</li>
                <li><strong>Passport Denial:</strong> If arrears exceed $2,500, you may be ineligible for a US passport.</li>
                <li><strong>Liens:</strong> Placing legal claims on property, bank accounts, or insurance settlements.</li>
              </ul>

              <h3>Do Arrears Ever Expire?</h3>
              <p>
                No. In Washington State, child support judgments do not expire. Arrears remain a valid debt until paid in full, even after the child reaches adulthood.
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

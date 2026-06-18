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

                    <CrossSuggestions calculatorType="arrears" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Child Support Arrears Calculator (2026) — Calculate Back Pay and 12% Annual Interest</h2>
            <div className="prose-standard">
              <p>
                Missing a child support payment in Washington is expensive. The state charges 12% annual interest on unpaid child support under <strong>RCW 26.23.060</strong> — compounding annually. A parent who falls $5,000 behind owes $600 in interest in the first year alone, on top of the missed payments. This calculator shows your total arrears balance, accrued interest, and a realistic payoff timeline before enforcement actions escalate.
              </p>

              <h2>Washington&apos;s 12% Arrears Interest Rate</h2>
              <p>
                Washington State has one of the highest child support interest rates in the country. Under <strong>RCW 26.23.060</strong>, all past-due child support payments automatically accrue interest at the rate of 12% per annum.
              </p>
              <ul>
                <li><strong>Compounds Annually:</strong> The interest is added to the principal balance, making the debt grow exponentially if left unpaid.</li>
                <li><strong>Accrues from Due Date:</strong> Interest begins accruing from the date each individual payment was due, not from the date of a court judgment.</li>
                <li><strong>Mandatory:</strong> This interest is mandatory and cannot be waived by a judge unless specifically allowed by limited state programs for state-owed debt.</li>
                <li><strong>Example:</strong> A $10,000 arrears balance generates <strong>$1,200 per year</strong> in interest, which is <strong>$100 per month</strong> just to keep the balance from growing.</li>
              </ul>

              <h2>Washington Child Support Enforcement Consequences</h2>
              <p>
                The state has powerful tools to collect child support arrears, and falling behind can have severe legal and financial consequences:
              </p>
              <ul>
                <li><strong>Wage Garnishment:</strong> Deducting money directly from your paycheck (up to 50-65% under <strong>RCW 26.18.070</strong>).</li>
                <li><strong>Tax Intercept:</strong> Seizing federal and state tax refunds.</li>
                <li><strong>License Suspension:</strong> Suspending driver&apos;s, professional, or recreational licenses when arrears exceed $2,500.</li>
                <li><strong>Passport Denial:</strong> If arrears exceed $2,500, you are ineligible for a US passport.</li>
                <li><strong>Liens and Seizures:</strong> Placing legal claims on property, bank accounts, or insurance settlements.</li>
                <li><strong>Credit Reporting:</strong> Reporting balances over $1,000 to credit bureaus, severely damaging your credit score.</li>
                <li><strong>Contempt of Court:</strong> Possible jail time for willful failure to pay under <strong>RCW 26.18.050</strong>.</li>
                <li><strong>Judgment Duration:</strong> Child support judgments last 10 years after the child turns 18 under <strong>RCW 4.56.210</strong>.</li>
              </ul>

              <h2>How to Pay Off Child Support Arrears in Washington</h2>
              <p>
                If you have an arrears balance of <strong>$4,764</strong> (the example used in our calculator), here are three common payoff scenarios:
              </p>
              <p><strong>Option 1: Pay 10% extra per month</strong></p>
              <ul>
                <li>Extra Payment: $476/month</li>
                <li>Payoff Timeline: Approximately 10 months</li>
              </ul>
              <p><strong>Option 2: Pay 20% extra per month</strong></p>
              <ul>
                <li>Extra Payment: $953/month</li>
                <li>Payoff Timeline: Approximately 5 months</li>
              </ul>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg my-4">
                <p className="text-red-800 font-bold mb-1">Option 3: Interest Only (Warning)</p>
                <p className="text-red-700 text-sm mb-0">
                  Monthly interest on $4,764 at 12% is <strong>$47.64</strong>. If you only pay the interest amount, your principal arrears balance will never decrease.
                </p>
              </div>

              <h2>Working with Washington DCS on Arrears</h2>
              <p>
                The Division of Child Support (DCS) manages most enforcement actions. It is often better to contact DCS to make a payment arrangement before they initiate garnishment or license suspension. Note that there is a difference between "state-owed" arrears (owed if the child received public assistance) and "parent-owed" arrears. The state has more flexibility to compromise state-owed debt than debt owed to the other parent.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8 shadow-sm">
                <h3 className="text-blue-900 mt-0">2026 Enforcement Note</h3>
                <p className="text-blue-800 mb-0">
                  The 12% interest rate under <strong>RCW 26.23.060</strong> was not changed by the 2026 <strong>EHB 1014</strong> reforms. While the 2026 updates focused on the economic table and self-support reserve, the enforcement mechanisms for unpaid support remain as strict as ever.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your current standard obligation using our <Link href="/">Washington child support calculator</Link>.</li>
                <li>If your income has changed, you may be eligible to lower future payments using our <Link href="/modification-calculator">modification calculator</Link>.</li>
                <li>Understand the deductions used to calculate your income with our <Link href="/net-income-calculator">net income calculator</Link>.</li>
                <li><Link href="/washington-courts/king-county">King County Superior Court</Link> handles the highest volume of child support enforcement cases in the state.</li>
                <li>Learn the formal definition of <Link href="/glossary/arrears">arrears</Link> in our Washington child support glossary.</li>
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

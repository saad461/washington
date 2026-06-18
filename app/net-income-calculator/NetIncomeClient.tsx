"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Landmark, ShieldCheck, Info, DollarSign, Wallet, MinusCircle, ChevronDown, ChevronUp } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";
import { calculateNetIncome2026 } from "@/utils/netIncomeUtils";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface NetIncomeClientProps {
  faqs: { question: string; answer: string }[];
}

export default function NetIncomeClient({ faqs }: NetIncomeClientProps) {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("annual");
  const [filingStatus, setFilingStatus] = useState<"single" | "hoh" | "married">("single");

  const [showOptional, setShowOptional] = useState(false);
  const [pension, setPension] = useState("");
  const [union, setUnion] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [other, setOther] = useState("");

  const results = useMemo(() => {
    let annualGross = parseFloat(amount) || 0;
    if (period === "monthly") annualGross *= 12;
    if (period === "biweekly") annualGross *= 26;
    if (period === "weekly") annualGross *= 52;

    const optionalTotal = (parseFloat(pension) || 0) +
                          (parseFloat(union) || 0) +
                          (parseFloat(maintenance) || 0) +
                          (parseFloat(other) || 0);

    const calc = calculateNetIncome2026(annualGross, filingStatus, optionalTotal);

    return calc;
  }, [amount, period, filingStatus, pension, union, maintenance, other]);

  return (
    <div className="flex-1 w-full bg-white">
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Net Income Calculator</span>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.071 · 2026 Estimates</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Net Income Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Convert your gross income into the net monthly income used for Washington State child support. This tool uses projected 2026 tax brackets and mandatory state deductions.
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
                    <Wallet size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Income Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="amount" className="input-label">Gross Income Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="e.g. 60000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="period" className="input-label">Income Period</label>
                      <select
                        id="period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="input-standard w-full"
                      >
                        <option value="annual">Per year</option>
                        <option value="monthly">Per month</option>
                        <option value="biweekly">Every 2 weeks</option>
                        <option value="weekly">Per week</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="filing-status" className="input-label">Filing Status</label>
                    <select
                      id="filing-status"
                      value={filingStatus}
                      onChange={(e) => setFilingStatus(e.target.value as any)}
                      className="input-standard w-full"
                    >
                      <option value="single">Single</option>
                      <option value="hoh">Head of household</option>
                      <option value="married">Married filing jointly</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowOptional(!showOptional)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {showOptional ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      Optional Mandatory Deductions
                    </button>

                    {showOptional && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="pension" className="input-label">Mandatory Pension ($/mo)</label>
                          <input id="pension" type="number" value={pension} onChange={(e)=>setPension(e.target.value)} className="input-standard w-full" />
                        </div>
                        <div>
                          <label htmlFor="union" className="input-label">Union Dues ($/mo)</label>
                          <input id="union" type="number" value={union} onChange={(e)=>setUnion(e.target.value)} className="input-standard w-full" />
                        </div>
                        <div>
                          <label htmlFor="maintenance" className="input-label">Maintenance Paid ($/mo)</label>
                          <input id="maintenance" type="number" value={maintenance} onChange={(e)=>setMaintenance(e.target.value)} className="input-standard w-full" />
                        </div>
                        <div>
                          <label htmlFor="other" className="input-label">Other Mandatory ($/mo)</label>
                          <input id="other" type="number" value={other} onChange={(e)=>setOther(e.target.value)} className="input-standard w-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm no-print">
                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Info size={20} />
                  2026 Bracket Estimates
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Federal tax estimates use projected 2026 bracket estimates based on 2025 IRS data and standard inflation adjustments. Official 2026 IRS brackets will be confirmed by the IRS in late 2025.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Net Income Analysis
                </h3>

                <div className="space-y-6">
                  <div className="card-standard shadow-sm border-gray-200 !p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Gross Monthly Income</span>
                        <span className="font-bold text-gray-900">{curFormatter.format(results.monthlyGross)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><MinusCircle size={14} /> Fed Income Tax</span>
                        <span className="font-bold text-red-600">-{curFormatter.format(results.fedTax)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><MinusCircle size={14} /> FICA (7.65%)</span>
                        <span className="font-bold text-red-600">-{curFormatter.format(results.fica)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><MinusCircle size={14} /> WA PFML (0.92%)</span>
                        <span className="font-bold text-red-600">-{curFormatter.format(results.pfml)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><MinusCircle size={14} /> WA LTC (0.58%)</span>
                        <span className="font-bold text-red-600">-{curFormatter.format(results.ltc)}</span>
                      </div>
                      {results.optional > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 flex items-center gap-1"><MinusCircle size={14} /> Other Deductions</span>
                          <span className="font-bold text-red-600">-{curFormatter.format(results.optional)}</span>
                        </div>
                      )}
                      <hr className="border-gray-100" />
                      <div className="flex flex-col gap-2">
                        <span className="text-base font-bold text-gray-900">Estimated Net Monthly</span>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                          <div className="text-3xl font-extrabold text-green-700">{curFormatter.format(results.monthlyNet)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs text-gray-600 leading-relaxed font-medium mb-4 text-center">
                      Your estimated net monthly income: <strong>{curFormatter.format(results.monthlyNet)}</strong>
                    </p>
                    <Link href="/" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                      Use in Child Support Calculator <ArrowRight size={18} />
                    </Link>
                  </div>

                  <CrossSuggestions calculatorType="deviation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How Net Income is Calculated in Washington</h2>
            <div className="prose-standard">
              <p>
                Washington State child support is based on the <strong>monthly net income</strong> of both parents. This is not the "take-home pay" shown on your paystub, but a specific legal calculation defined in <strong>RCW 26.19.071</strong>.
              </p>

              <h3>Step 1: Determine Gross Income</h3>
              <p>
                Gross income includes all income from all sources, including wages, salaries, commissions, bonuses, overtime, dividends, and self-employment income.
              </p>

              <h3>Step 2: Allowable Deductions</h3>
              <p>
                Only specific deductions are allowed by law to reach your net income:
              </p>
              <ul>
                <li><strong>Federal Income Taxes:</strong> Based on the standard deduction and tax brackets for your filing status.</li>
                <li><strong>FICA:</strong> Social Security and Medicare taxes.</li>
                <li><strong>Washington State Mandatory Insurances:</strong> Paid Family & Medical Leave (PFML) and the LTC Trust (WA Cares).</li>
                <li><strong>Mandatory Pension:</strong> Contributions required by your employer.</li>
                <li><strong>Union Dues:</strong> Mandatory dues for your employment.</li>
              </ul>

              <h3>Step 3: Calculating the Transfer Payment</h3>
              <p>
                Once both parents' net incomes are determined, they are combined to find the basic support obligation from the state economic table. Each parent's share of that obligation is then proportional to their share of the combined net income.
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

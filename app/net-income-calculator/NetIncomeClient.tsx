"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Wallet, Landmark, AlertTriangle, Info, DollarSign, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";
import { calculateNetIncome, DeductionResults } from "@/utils/netIncomeUtils";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface NetIncomeClientProps {
  faqs: { question: string; answer: string }[];
}

export default function NetIncomeClient({ faqs }: NetIncomeClientProps) {
  const [grossAmount, setGrossAmount] = useState("");
  const [period, setPeriod] = useState<"annual" | "monthly" | "biweekly" | "weekly">("annual");
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "hoh">("single");

  const [showOptional, setShowOptional] = useState(false);
  const [mandatoryPension, setMandatoryPension] = useState("");
  const [unionDues, setUnionDues] = useState("");
  const [maintenancePaid, setMaintenancePaid] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");

  const results = useMemo(() => {
    const gross = parseFloat(grossAmount) || 0;
    if (gross === 0) return null;

    const optional = {
      mandatoryPension: parseFloat(mandatoryPension) || 0,
      unionDues: parseFloat(unionDues) || 0,
      maintenancePaid: parseFloat(maintenancePaid) || 0,
      otherDeductions: parseFloat(otherDeductions) || 0,
    };

    return calculateNetIncome(gross, period, filingStatus, optional);
  }, [grossAmount, period, filingStatus, mandatoryPension, unionDues, maintenancePaid, otherDeductions]);

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
            <p className="eyebrow">2026 Federal Brackets · WA Deductions</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Net Income Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Convert your gross pay into the monthly net income used for Washington State child support calculations. Uses 2026 tax estimates and mandatory insurance premiums.
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
                      <label htmlFor="gross-amount" className="input-label">Gross Income Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          id="gross-amount"
                          type="number"
                          value={grossAmount}
                          onChange={(e) => setGrossAmount(e.target.value)}
                          placeholder="e.g. 60000"
                          className="input-standard pl-8 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="income-period" className="input-label">Income Period</label>
                      <select
                        id="income-period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
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

                  <div className="pt-4">
                    <button
                      onClick={() => setShowOptional(!showOptional)}
                      className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {showOptional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      Optional Deductions (Mandatory Pension, Union Dues, etc.)
                    </button>

                    {showOptional && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div>
                          <label htmlFor="pension" className="input-label">Mandatory Pension ($/mo)</label>
                          <input
                            id="pension"
                            type="number"
                            value={mandatoryPension}
                            onChange={(e) => setMandatoryPension(e.target.value)}
                            className="input-standard w-full bg-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="union" className="input-label">Union Dues ($/mo)</label>
                          <input
                            id="union"
                            type="number"
                            value={unionDues}
                            onChange={(e) => setUnionDues(e.target.value)}
                            className="input-standard w-full bg-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="maintenance" className="input-label">Maintenance Paid ($/mo)</label>
                          <input
                            id="maintenance"
                            type="number"
                            value={maintenancePaid}
                            onChange={(e) => setMaintenancePaid(e.target.value)}
                            className="input-standard w-full bg-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="other" className="input-label">Other Mandatory ($/mo)</label>
                          <input
                            id="other"
                            type="number"
                            value={otherDeductions}
                            onChange={(e) => setOtherDeductions(e.target.value)}
                            className="input-standard w-full bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm no-print">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="text-blue-500" size={20} />
                  Tax Estimates Note
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Federal tax estimates use projected <strong>2026 bracket estimates</strong> based on inflation indexing. Official 2026 IRS brackets will be confirmed by the Treasury in late 2025. This tool also includes the mandatory Washington State PFML and LTC deductions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Monthly Net Analysis
                </h3>

                {results ? (
                  <div className="space-y-6">
                    <div className="card-standard shadow-sm border-gray-200 !p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Gross Monthly Income</span>
                          <span className="font-bold text-gray-900">{curFormatter.format(results.grossMonthly)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-red-500 font-medium italic">Federal Income Tax</span>
                          <span className="font-bold text-red-600">-{curFormatter.format(results.fedTax)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-red-500 font-medium italic">FICA (7.65%)</span>
                          <span className="font-bold text-red-600">-{curFormatter.format(results.fica)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-red-500 font-medium italic">WA PFML (0.92%)</span>
                          <span className="font-bold text-red-600">-{curFormatter.format(results.waPFML)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-red-500 font-medium italic">WA LTC (0.58%)</span>
                          <span className="font-bold text-red-600">-{curFormatter.format(results.waLTC)}</span>
                        </div>
                        {results.optionalTotal > 0 && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-red-500 font-medium italic">Optional Deductions</span>
                            <span className="font-bold text-red-600">-{curFormatter.format(results.optionalTotal)}</span>
                          </div>
                        )}
                        <hr className="border-gray-100" />
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-green-800">Estimated Net Monthly</span>
                            <span className="text-2xl font-extrabold text-green-600">{curFormatter.format(results.netMonthly)}</span>
                          </div>
                          <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest leading-none">
                             Use this amount for child support calculations
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 no-print">
                      <Link href="/" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                        Use in Child Support Calculator <ArrowRight size={18} />
                      </Link>
                    </div>

                    <CrossSuggestions calculatorType="net-income" />
                  </div>
                ) : (
                  <div className="card-standard !p-8 text-center text-gray-400">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Enter your gross income and filing status to see the net conversion.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Net Income Calculator (2026) — Convert Gross to Net for Child Support</h2>
            <div className="prose-standard">
              <p>
                Washington child support is calculated on net monthly income — not gross. Under <strong>RCW 26.19.071(5)</strong>, parents deduct federal taxes, FICA, mandatory pension, union dues, and Washington mandatory insurance premiums before calculating their child support obligation. Getting this conversion right matters: even a small error in net income can change your monthly obligation by hundreds of dollars. This calculator uses 2026 federal tax estimates and all Washington-specific deductions.
              </p>

              <h2>What Counts as Income in Washington Child Support (RCW 26.19.071)</h2>
              <p>
                The first step in any calculation is identifying all sources of income. Washington law is broad regarding what must be included.
              </p>
              <p><strong>INCLUDED INCOME (RCW 26.19.071(3)):</strong></p>
              <ul>
                <li>Wages, salaries, bonuses, commissions, and overtime</li>
                <li>Self-employment and business income</li>
                <li>Rental income, dividends, and interest</li>
                <li>Social Security benefits and Unemployment benefits</li>
                <li>Workers&apos; compensation and Spousal maintenance received</li>
                <li>Pension and retirement income</li>
              </ul>
              <p><strong>EXCLUDED INCOME (RCW 26.19.071(4)):</strong></p>
              <ul>
                <li>New spouse or domestic partner income</li>
                <li>SSI, TANF, ABD, and food stamps</li>
                <li>Child support received from other cases</li>
                <li>Gifts and prizes</li>
                <li>Overtime beyond 40hrs/week (if the court finds it was worked to provide for the child&apos;s basic needs)</li>
              </ul>

              <h2>Allowed Deductions from Gross Income (RCW 26.19.071(5))</h2>
              <p>
                To arrive at "net income," you are allowed to subtract specific mandatory costs from your gross monthly total:
              </p>

              <h2>Worked Example — Gross to Net</h2>
              <p>
                Parent earning <strong>$60,000/year</strong> ($5,000/month) filing as Single:
              </p>
              <ul>
                <li><strong>Gross Monthly:</strong> $5,000</li>
                <li><strong>Federal Income Tax:</strong> -$447</li>
                <li><strong>FICA (7.65%):</strong> -$383</li>
                <li><strong>WA PFML/LTC:</strong> -$75</li>
                <li><strong>Estimated Net Monthly:</strong> $4,095</li>
              </ul>
              <p>
                In this example, the parent&apos;s "net income" for Washington child support purposes is $4,095. This is the figure that would be entered on Line 1 of the Child Support Worksheet.
              </p>

              <ul>
                <li><strong>Federal Income Tax:</strong> Calculated based on your filing status and 2026 estimated brackets.</li>
                <li><strong>FICA:</strong> Social Security (6.2%) and Medicare (1.45%) taxes.</li>
                <li><strong>Washington Mandatory Insurance:</strong> WA Paid Family Medical Leave (PFML) and WA Long-Term Care (LTC) Trust premiums.</li>
                <li><strong>State Industrial Insurance:</strong> Premiums for workers&apos; compensation.</li>
                <li><strong>Union Dues:</strong> Mandatory union or professional dues required for employment.</li>
                <li><strong>Mandatory Pension:</strong> Contributions required by your employer or by law.</li>
                <li><strong>Voluntary Retirement:</strong> Contributions up to $5,000/year (if you have a mandatory plan) or higher in some cases.</li>
                <li><strong>Maintenance Paid:</strong> Court-ordered spousal maintenance paid to a former spouse.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-8">
                <h3 className="text-blue-900 mt-0">2026 EHB 1014 Update: New Deductions</h3>
                <p className="text-blue-800 mb-0">
                  The 2026 reforms under <strong>EHB 1014</strong> added new mandatory deductions to the schedule. Washington Paid Family Medical Leave (PFML) premiums and Washington Long-Term Services and Supports (LTC) Trust program premiums are now explicitly deductible under <strong>RCW 26.19.071(5)(e)</strong>. This reduces the net income used for child support calculations compared to older versions of the worksheet.
                </p>
              </div>

              <h2>Internal Resources</h2>
              <ul>
                <li>Calculate your final obligation with our <Link href="/">Washington child support calculator</Link>.</li>
                <li>See if special expenses allow for a <Link href="/deviation-calculator">deviation from the standard amount</Link>.</li>
                <li>If your net income has changed by 15% or more, use our <Link href="/modification-calculator">modification calculator</Link>.</li>
                <li>Learn the formal definition of <Link href="/glossary/net-income">net income</Link> and <Link href="/glossary/imputed-income">imputed income</Link> in our glossary.</li>
                <li><Link href="/washington-courts/pierce-county">Pierce County courts</Link> have specific local forms for financial declarations.</li>
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

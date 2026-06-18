"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Percent, Info, Calculator, Scale, History } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CrossSuggestions from "@/components/calculator/CrossSuggestions";

interface FAQItem {
  question: string;
  answer: string;
}

interface ParentingTimeClientProps {
  faqs: FAQItem[];
}

const SCHEDULE_OPTIONS = [
  { id: "eow", label: "Every other weekend (52 nights)", nights: 52 },
  { id: "eow_wed", label: "Every other weekend + Wednesday (82 nights)", nights: 82 },
  { id: "extended", label: "Extended summer schedule (140 nights)", nights: 140 },
  { id: "alt_weeks", label: "Alternating weeks 50/50 (182 nights)", nights: 182 },
  { id: "two_two_three", label: "2-2-3 rotation 50/50 (182 nights)", nights: 182 },
  { id: "week_on_off", label: "Week on / week off (182 nights)", nights: 182 },
  { id: "custom", label: "Enter custom overnights", nights: 0 },
];

export default function ParentingTimeClient({ faqs }: ParentingTimeClientProps) {
  const [schedule, setSchedule] = useState("eow");
  const [customOvernights, setCustomOvernights] = useState("");

  const results = useMemo(() => {
    let overnights = 0;
    if (schedule === "custom") {
      overnights = parseInt(customOvernights) || 0;
    } else {
      overnights = SCHEDULE_OPTIONS.find(s => s.id === schedule)?.nights || 0;
    }

    const percentage = (overnights / 365) * 100;
    const daysPerYear = overnights;
    const hoursPerYear = overnights * 24;

    let tier = "";
    let tierNote = "";
    let badgeClass = "";

    if (overnights >= 183) {
      tier = "Equal Parenting Time";
      tierNote = "183+ overnights. Court may deviate from standard calculation. RCW 26.19.075(1)(d)";
      badgeClass = "badge-success";
    } else if (overnights >= 128) {
      tier = "Significant Residential Time";
      tierNote = "128-182 overnights. Court may consider deviation. RCW 26.19.075(1)(d)";
      badgeClass = "badge-success";
    } else if (overnights >= 91) {
      tier = "Substantial Parenting Time";
      tierNote = "91-127 overnights. Deviation possible but less common. RCW 26.19.075(1)(d)";
      badgeClass = "badge-warning";
    } else {
      tier = "Standard Parenting Time";
      tierNote = "Under 91 overnights. Standard calculation typically applies.";
      badgeClass = "badge-meta";
    }

    return {
      overnights,
      percentage: percentage.toFixed(1),
      daysPerYear,
      hoursPerYear,
      tier,
      tierNote,
      badgeClass
    };
  }, [schedule, customOvernights]);

  return (
    <div className="flex-1 w-full bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
        <div className="container-wide relative z-10 text-left">
          <nav className="breadcrumbs-container">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Parenting Time Calculator</span>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="eyebrow">RCW 26.19.075(1)(d) · 2026 Guidelines</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Parenting Time Calculator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Calculate overnights and parenting time percentages for Washington State child support. Determining your accurate parenting tier is the first step toward a potential residential deviation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Card */}
            <div className="lg:col-span-7 no-print">
              <div className="card-standard shadow-[var(--shadow-card-md)] !p-6 md:!p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Calendar size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Schedule Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="schedule-type" className="input-label">Parenting Schedule</label>
                    <select
                      id="schedule-type"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      className="input-standard w-full"
                    >
                      {SCHEDULE_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {schedule === "custom" && (
                    <div>
                      <label htmlFor="custom-overnights" className="input-label">Overnights Per Year</label>
                      <input
                        id="custom-overnights"
                        type="number"
                        min="0"
                        max="365"
                        value={customOvernights}
                        onChange={(e) => setCustomOvernights(e.target.value)}
                        placeholder="e.g. 150"
                        className="input-standard w-full"
                      />
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">Nights child sleeps at your home per year</p>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 leading-relaxed">
                    <div className="flex gap-3">
                      <Info size={18} className="shrink-0 mt-0.5" />
                      <p>
                        In Washington, parenting time is measured by <strong>overnights</strong>. One overnight equals one night where the child sleeps at your residence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-5">
              <div className="bg-[#F3F4F6] border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  Parenting Analysis
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-standard !p-4 flex flex-col items-center text-center">
                      <Clock size={20} className="text-blue-600 mb-2" />
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Overnights</span>
                      <span className="text-2xl font-bold text-gray-900">{results.overnights}</span>
                    </div>
                    <div className="card-standard !p-4 flex flex-col items-center text-center">
                      <Percent size={20} className="text-blue-600 mb-2" />
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Percentage</span>
                      <span className="text-2xl font-bold text-gray-900">{results.percentage}%</span>
                    </div>
                    <div className="card-standard !p-4 flex flex-col items-center text-center">
                      <Calendar size={20} className="text-blue-600 mb-2" />
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Days/Year</span>
                      <span className="text-2xl font-bold text-gray-900">{results.daysPerYear}</span>
                    </div>
                    <div className="card-standard !p-4 flex flex-col items-center text-center">
                      <History size={20} className="text-blue-600 mb-2" />
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Hours/Year</span>
                      <span className="text-2xl font-bold text-gray-900">{results.hoursPerYear}</span>
                    </div>
                  </div>

                  <div className="card-standard !p-6 bg-white shadow-sm border-gray-200">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">Parenting Tier</span>
                        <span className={`badge-category ${results.badgeClass}`}>{results.tier}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        {results.tierNote}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-[13px] text-gray-600 leading-relaxed shadow-sm">
                    <strong>Note:</strong> Washington does not have a mechanical "offset" formula. Residential deviations are discretionary and based on the actual expenses and financial situation of both parents.
                  </div>

                  <div className="flex flex-col gap-3 pt-4 no-print">
                    <Link href="/joint-custody-calculator" className="btn btn-primary w-full shadow-lg shadow-blue-900/20">
                      Calculate Joint Custody Support <ArrowRight size={18} />
                    </Link>
                  </div>

                  <CrossSuggestions calculatorType="basic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-default border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Parenting Time in Washington State</h2>
            <div className="prose-standard">
              <p>
                In Washington State, child support is calculated using the standard economic table, but judges have the authority to "deviate" from that amount if a child spends a significant amount of time with the paying parent. This is known as a <strong>residential deviation</strong> under RCW 26.19.075(1)(d).
              </p>

              <h3>Parenting Time Tiers</h3>
              <p>
                While not strictly defined in the law, most Washington courts look at parenting time in four primary tiers:
              </p>
              <ul>
                <li><strong>Standard (Under 91 Overnights):</strong> The standard calculation typically applies without adjustment.</li>
                <li><strong>Substantial (91-127 Overnights):</strong> Deviations are possible but often require showing a high income disparity or specific financial hardship.</li>
                <li><strong>Significant (128-182 Overnights):</strong> Courts are much more likely to consider a downward deviation to account for the expenses incurred in the second household.</li>
                <li><strong>Equal (183+ Overnights):</strong> In 50/50 arrangements, deviations are common, though the higher-earning parent will still likely owe support to ensure the child has similar resources in both homes.</li>
              </ul>

              <h3>How Percentage is Calculated</h3>
              <p>
                Washington uses a 365-day year for parenting time calculations. To find your percentage, take the total number of overnights assigned to you in your parenting plan and divide by 365.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-8">
                <p className="text-center font-bold text-gray-900 mb-0">
                  (Overnights ÷ 365) × 100 = Parenting Time %
                </p>
              </div>
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

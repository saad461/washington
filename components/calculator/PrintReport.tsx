"use client";

import React from 'react';

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface PrintReportProps {
  title?: string;
  subtitle?: string;
  date?: string;
  refCode?: string;
  caseContext: { label: string; value: string | number }[];
  calculationBase: { label: string; value: string | number; isIndigo?: boolean; isAmber?: boolean }[];
  analysisTitle?: string;
  analysisItems: { label: string; value: string | number; isBold?: boolean; isIndigo?: boolean; isAmber?: boolean; description?: string }[];
  totalLabel?: string;
  totalValue?: string | number;
  secondaryTotalLabel?: string;
  secondaryTotalValue?: string | number;
  assumptions: string;
  disclaimerTitle?: string;
  disclaimerText: string;
  footerText?: string;
}

export default function PrintReport({
  title = "Child Support Estimate",
  subtitle = "Washington State (2026 Guidelines)",
  date = new Date().toLocaleDateString(),
  refCode = "RCW 26.19 Compliance",
  caseContext,
  calculationBase,
  analysisTitle = "Calculation Breakdown",
  analysisItems,
  totalLabel,
  totalValue,
  secondaryTotalLabel,
  secondaryTotalValue,
  assumptions,
  disclaimerTitle = "Disclaimer: Official Estimate Only",
  disclaimerText,
  footerText = "Generated via WSCSS Calculator — Washington Child Support Software"
}: PrintReportProps) {
  return (
    <div className="hidden print:block bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="border-b-2 border-indigo-600 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-indigo-600 font-semibold">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium">Date: {date}</p>
            <p className="text-sm text-gray-500 font-medium">Ref: {refCode}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-10">
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b pb-2">Case Context</h2>
            {caseContext.map((item, idx) => (
              <div key={idx} className={`flex justify-between ${idx === caseContext.length - 1 ? 'border-t pt-2 mt-2' : ''}`}>
                <span className={`text-gray-600 ${idx === caseContext.length - 1 ? 'font-bold text-indigo-600' : ''}`}>{item.label}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b pb-2">Calculation Base</h2>
            {calculationBase.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className={`font-bold ${item.isIndigo ? 'text-indigo-600' : ''} ${item.isAmber ? 'text-amber-600' : ''}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{analysisTitle}</h2>
          <div className="space-y-4">
            {analysisItems.map((item, idx) => (
              <div key={idx} className={`flex justify-between items-start ${idx > 0 && item.isBold ? 'pt-2 border-t border-gray-200' : ''}`}>
                <div>
                   <p className={`${item.isBold ? 'font-semibold text-gray-900' : 'text-gray-700'} ${!item.isBold && idx === 0 ? 'text-lg' : ''}`}>{item.label}</p>
                   {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
                <span className={`font-bold ${item.isIndigo ? 'text-indigo-600' : ''} ${item.isAmber ? 'text-amber-600' : ''} ${!item.isBold && idx === 0 ? 'text-lg text-gray-900' : ''}`}>{item.value}</span>
              </div>
            ))}

            {(totalLabel && totalValue) && (
              <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300 mt-4">
                <span className="text-2xl font-bold text-gray-900">{totalLabel}</span>
                <span className="text-3xl font-bold text-indigo-600">{totalValue}</span>
              </div>
            )}

            {(secondaryTotalLabel && secondaryTotalValue) && (
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-600">{secondaryTotalLabel}</span>
                <span className="text-xl font-bold text-gray-700">{secondaryTotalValue}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Legal Context & Assumptions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {assumptions}
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-800 font-semibold mb-2">{disclaimerTitle}</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              {disclaimerText}
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
}

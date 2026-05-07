"use client";

import React, { useState } from 'react';
import { Printer, AlertCircle } from 'lucide-react';
import { generateIncomePagePdf } from '@/utils/generatePdf';

interface PrintButtonProps {
  countySlug: string;
  income: number;
  children: number;
}

export default function PrintButton({ countySlug, income, children }: PrintButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = async () => {
    setIsLoading(true);
    setError(null);

    const childrenLabel = children === 1 ? '1-child' : `${children}-children`;
    const filename = `${countySlug}-child-support-${income}-${childrenLabel}-2026.pdf`;

    try {
      await generateIncomePagePdf('pdf-content', filename);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setError("PDF generation failed. Try again or use your browser's print function (Ctrl+P).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={handlePrint}
        disabled={isLoading}
        aria-label="Print this child support calculation as PDF"
        className="btn btn-primary w-full shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating PDF...
          </>
        ) : (
          <>
            <Printer size={18} />
            Print Calculation
          </>
        )}
      </button>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

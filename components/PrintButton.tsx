"use client";

import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  countySlug: string;
  income: number;
  children: number;
}

export default function PrintButton({ countySlug, income, children }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-3 w-full no-print">
      <button
        onClick={handlePrint}
        aria-label="Print this child support calculation"
        className="btn btn-primary w-full shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Printer size={18} />
        Print Calculation
      </button>
    </div>
  );
}

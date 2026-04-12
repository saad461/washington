"use client";

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="mt-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors no-print border-t border-indigo-50 pt-6 w-full justify-center"
    >
      <Printer size={14} />
      Print Calculation for Court
    </button>
  );
}

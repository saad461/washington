"use client";

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
 return (
 <button
 onClick={() => window.print()}
 className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase hover:text-indigo-700 transition-colors no-print border-t border-indigo-50 pt-6 w-full justify-center min-h-[48px]"
 >
 <Printer size={14} />
 Print Calculation for Court
 </button>
 );
}

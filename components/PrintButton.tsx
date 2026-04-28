"use client";

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
 return (
 <button
 onClick={() => window.print()}
 className="btn btn-ghost btn-md w-full border-t border-border-default !rounded-none !pt-8 mt-8"
 >
 <Printer size={16} />
 Print Calculation for Court
 </button>
 );
}

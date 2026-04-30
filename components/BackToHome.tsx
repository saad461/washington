"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackToHome() {
  return (
    <div className="container-wide py-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        ← Back to Calculator
      </Link>
    </div>
  );
}

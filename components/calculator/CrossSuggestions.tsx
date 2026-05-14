"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, Shield, Clock, Calculator } from "lucide-react";

interface Suggestion {
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
}

interface CrossSuggestionsProps {
  calculatorType: "basic" | "joint" | "deviation" | "modification";
}

export default function CrossSuggestions({ calculatorType }: CrossSuggestionsProps) {
  const allSuggestions: Record<string, Suggestion[]> = {
    basic: [
      {
        title: "Joint Custody Calculator",
        desc: "If child spends time with both parents",
        href: "/joint-custody-calculator",
        icon: Scale,
      },
      {
        title: "Deviation Calculator",
        desc: "If special circumstances apply",
        href: "/deviation-calculator",
        icon: Shield,
      },
      {
        title: "Modification Calculator",
        desc: "If you have an existing order",
        href: "/modification-calculator",
        icon: Clock,
      },
    ],
    joint: [
      {
        title: "Deviation Calculator",
        desc: "Add extraordinary expenses to your result",
        href: "/deviation-calculator",
        icon: Shield,
      },
      {
        title: "Basic Calculator",
        desc: "Standard calculation without custody adjustment",
        href: "/",
        icon: Calculator,
      },
      {
        title: "Modification Calculator",
        desc: "Compare to your existing order",
        href: "/modification-calculator",
        icon: Clock,
      },
    ],
    deviation: [
      {
        title: "Joint Custody Calculator",
        desc: "Combine deviation with custody adjustment",
        href: "/joint-custody-calculator",
        icon: Scale,
      },
      {
        title: "Modification Calculator",
        desc: "See if your order needs updating",
        href: "/modification-calculator",
        icon: Clock,
      },
      {
        title: "Basic Calculator",
        desc: "See standard amount without deviation",
        href: "/",
        icon: Calculator,
      },
    ],
    modification: [
      {
        title: "Basic Calculator",
        desc: "Recalculate from scratch",
        href: "/",
        icon: Calculator,
      },
      {
        title: "Deviation Calculator",
        desc: "Check if deviations apply",
        href: "/deviation-calculator",
        icon: Shield,
      },
      {
        title: "Joint Custody Calculator",
        desc: "Recalculate with custody adjustment",
        href: "/joint-custody-calculator",
        icon: Scale,
      },
    ],
  };

  const suggestions = allSuggestions[calculatorType] || [];

  return (
    <div className="mt-12">
      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">You may also need</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {suggestions.map((s, i) => (
          <Link
            key={i}
            href={s.href}
            className="card-standard !p-5 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col h-full"
          >
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <s.icon size={20} />
            </div>
            <h5 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{s.title}</h5>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-bold text-blue-600">
              Open Tool <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleLeft, ToggleRight, AlertCircle, Info, CheckCircle } from "lucide-react";

interface ParentingTimeSelectorProps {
  useParentingDeviation: boolean;
  setUseParentingDeviation: (val: boolean) => void;
  parentingTime: number;
  setParentingTime: (val: number) => void;
}

export const PARENTING_TIERS = [
  { label: "0% — No overnights",    value: 0,   nights: "0 nights" },
  { label: "25% — ~91 nights/yr",   value: 91,  nights: "91 nights" },
  { label: "35% — ~128 nights/yr",  value: 128, nights: "128 nights" },
  { label: "50% — Equal (183 nights)", value: 183, nights: "183 nights" },
];

export default function ParentingTimeSelector({
  useParentingDeviation,
  setUseParentingDeviation,
  parentingTime,
  setParentingTime,
}: ParentingTimeSelectorProps) {
  return (
    <div className="flex flex-col">
      {/* Toggle header */}
      <div
        className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-bg-border)] bg-[var(--color-bg-subtle)] cursor-pointer select-none"
        onClick={() => setUseParentingDeviation(!useParentingDeviation)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setUseParentingDeviation(!useParentingDeviation)}
        aria-expanded={useParentingDeviation}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {useParentingDeviation ? (
            <ToggleRight size={20} className="text-[var(--color-brand-primary)] shrink-0" />
          ) : (
            <ToggleLeft size={20} className="text-[var(--color-text-secondary)] shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--color-text-primary)] leading-snug">
              I share custody (optional parenting credit)
              <span className="ml-2 badge-warning">Estimated</span>
            </p>
            <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] mt-0.5">
              {useParentingDeviation
                ? "On — parenting time deviation will be applied"
                : "Off — using standard table amount"}
            </p>
          </div>
        </div>
        <span
          className={`text-[12px] font-bold px-2 py-1 rounded-lg shrink-0 ml-2 ${
            useParentingDeviation
              ? "bg-[var(--color-brand-primary-mid)] text-[var(--color-brand-primary-hover)]"
              : "badge-meta"
          }`}
        >
          {useParentingDeviation ? "On" : "Off"}
        </span>
      </div>

      {/* Expandable parenting time controls */}
      <AnimatePresence initial={false}>
        {useParentingDeviation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="pt-6 space-y-6">
              {/* Approximation warning */}
              <div className="callout-amber">
                <div className="flex items-start gap-4">
                  <AlertCircle size={16} className="text-[var(--color-warning)] shrink-0 mt-0.5" />
                  <p className="text-[var(--color-highlight)] text-sm leading-relaxed">
                    <strong className="font-semibold">Approximation only.</strong> Washington courts
                    apply parenting time deviations on a case-by-case basis under RCW
                    26.19.075(1)(d). There is no fixed statutory formula. This estimate may differ
                    significantly from a court order.
                  </p>
                </div>
              </div>

              {/* Time tier selection */}
              <div>
                <label className="input-label block mb-2">
                  Payer&apos;s Overnight Parenting Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PARENTING_TIERS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setParentingTime(p.value)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all flex flex-col items-start ${
                        parentingTime === p.value
                          ? "bg-[var(--color-brand-primary-light)] border-[var(--color-brand-primary)] text-[var(--color-brand-primary-hover)] shadow-[var(--shadow-card)]"
                          : "bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-brand-primary)]"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          parentingTime === p.value
                            ? "text-[var(--color-brand-primary-hover)]"
                            : "text-[var(--color-text-primary)]"
                        }`}
                      >
                        {p.label}
                      </span>
                      <span
                        className={`text-[12px] mt-0.5 font-semibold ${
                          parentingTime === p.value
                            ? "text-[var(--color-brand-primary)]/70"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {p.nights}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

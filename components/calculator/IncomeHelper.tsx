"use client";

import React, { useState } from "react";
import { Info, Calculator, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IncomeHelperProps {
  onUseAmount: (amount: string) => void;
  label?: string;
}

export default function IncomeHelper({ onUseAmount, label = "Not sure of your monthly net income? Calculate it here" }: IncomeHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"hourly" | "annual">("hourly");

  // Hourly state
  const [hourlyWage, setHourlyWage] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");

  // Annual state
  const [annualGross, setAnnualGross] = useState("");

  const calculateMonthlyNet = () => {
    if (mode === "hourly") {
      const wage = parseFloat(hourlyWage) || 0;
      const hours = parseFloat(hoursPerWeek) || 0;
      return (wage * hours * 52 / 12) * 0.80;
    } else {
      const annual = parseFloat(annualGross) || 0;
      return (annual / 12) * 0.80;
    }
  };

  const monthlyNet = calculateMonthlyNet();

  return (
    <div className="w-full mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
      >
        {label} {isOpen ? "▲" : "▼"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-5 bg-white border border-blue-100 rounded-xl shadow-sm space-y-4">
              <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
                <button
                  type="button"
                  onClick={() => setMode("hourly")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    mode === "hourly" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Hourly Wage
                </button>
                <button
                  type="button"
                  onClick={() => setMode("annual")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    mode === "annual" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Annual Salary
                </button>
              </div>

              {mode === "hourly" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hourly Wage</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        value={hourlyWage}
                        onChange={(e) => setHourlyWage(e.target.value)}
                        placeholder="25"
                        className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hours / Week</label>
                    <input
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                      placeholder="40"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Annual Gross Salary</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={annualGross}
                      onChange={(e) => setAnnualGross(e.target.value)}
                      placeholder="60000"
                      className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Estimated Monthly Net</p>
                  <p className="text-xl font-extrabold text-gray-900">
                    ${Math.round(monthlyNet).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onUseAmount(Math.round(monthlyNet).toString())}
                  className="btn btn-primary !py-2 !px-4 !text-xs"
                  disabled={monthlyNet <= 0}
                >
                  Use this amount
                </button>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  This is an estimate. Formula: {(mode === "hourly" ? "hourly × hours × 52 / 12" : "annual / 12")} × 0.80 (20% tax estimate). Actual net income may vary based on deductions and tax situation.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator, Plus, Trash2, Printer,
  ArrowLeft, Scale, Shield, AlertCircle, Info, ChevronRight, CheckCircle
} from "lucide-react";
import Link from "next/link";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import { convertGrossToNet } from "@/utils/taxUtils";
import { motion, AnimatePresence } from "framer-motion";
import PrintReport from "@/components/calculator/PrintReport";

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface Scenario {
  id: string;
  name: string;
  p1Income: string;
  p2Income: string;
  children: number;
  custodyType: "Standard" | "Joint Custody" | "With Deviation";
  daysA?: number;
  deviationAmount?: string;
  deviationDirection?: "upward" | "downward";
}

export default function ComparisonTool() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: "1", name: "Scenario 1", p1Income: "", p2Income: "", children: 1, custodyType: "Standard" },
    { id: "2", name: "Scenario 2", p1Income: "", p2Income: "", children: 1, custodyType: "Standard" },
  ]);

  const addScenario = () => {
    if (scenarios.length < 3) {
      setScenarios([...scenarios, {
        id: Date.now().toString(),
        name: `Scenario ${scenarios.length + 1}`,
        p1Income: "",
        p2Income: "",
        children: 1,
        custodyType: "Standard"
      }]);
    }
  };

  const removeScenario = (id: string) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter(s => s.id !== id));
    }
  };

  const updateScenario = (id: string, updates: Partial<Scenario>) => {
    setScenarios(scenarios.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const results = useMemo(() => {
    return scenarios.map(s => {
      const p1Net = parseFloat(s.p1Income) || 0;
      const p2Net = parseFloat(s.p2Income) || 0;

      const calc = calculateChildSupport({
        "incomeType": { p1: "monthly" },
        "1a": { p1: p1Net, p2: p2Net },
        "5_children": { p1: s.children },
      });

      let basicObligation = calc.baseSupport;
      let transferPayment = calc.finalSupport;

      if (s.custodyType === "Joint Custody" && s.daysA !== undefined) {
        const daysB = 365 - s.daysA;
        if (s.daysA >= 135 && daysB >= 135) {
           const shareA = calc.shareP1;
           const shareB = calc.shareP2;
           const adjA = (basicObligation * shareA) * (daysB / 365);
           const adjB = (basicObligation * shareB) * (s.daysA / 365);
           transferPayment = Math.abs(adjA - adjB);
        }
      } else if (s.custodyType === "With Deviation" && s.deviationAmount) {
        const devAmt = parseFloat(s.deviationAmount) || 0;
        if (s.deviationDirection === "upward") {
          transferPayment += devAmt;
        } else {
          transferPayment = Math.max(0, transferPayment - devAmt);
        }
      }

      return {
        id: s.id,
        basicObligation,
        transferPayment,
        annualTotal: transferPayment * 12
      };
    });
  }, [scenarios]);

  const highlights = useMemo(() => {
    if (scenarios.length < 2) return {};

    let minVal = Infinity;
    let maxVal = -Infinity;
    let minIds: string[] = [];
    let maxIds: string[] = [];

    results.forEach(r => {
      if (r.transferPayment < minVal) {
        minVal = r.transferPayment;
        minIds = [r.id];
      } else if (r.transferPayment === minVal) {
        minIds.push(r.id);
      }

      if (r.transferPayment > maxVal) {
        maxVal = r.transferPayment;
        maxIds = [r.id];
      } else if (r.transferPayment === maxVal) {
        maxIds.push(r.id);
      }
    });

    const res: Record<string, "min" | "max" | null> = {};
    if (minVal === maxVal) {
      results.forEach(r => res[r.id] = "min");
    } else {
      minIds.forEach(id => res[id] = "min");
      maxIds.forEach(id => res[id] = "max");
    }
    return res;
  }, [results, scenarios]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 no-print">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compare Calculation Scenarios</h2>
          <p className="text-sm text-gray-500 mt-1">Run up to 3 different scenarios side-by-side to see how changes affect support.</p>
        </div>
        <div className="flex gap-3">
          {scenarios.length < 3 && (
            <button onClick={addScenario} className="btn btn-secondary flex items-center gap-2">
              <Plus size={18} /> Add Scenario
            </button>
          )}
          <button onClick={() => window.print()} className="btn btn-primary flex items-center gap-2">
            <Printer size={18} /> Print Comparison
          </button>
        </div>
      </div>

      <div className="no-print overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-6 min-w-[840px] lg:min-w-0">
          {scenarios.map((s, idx) => {
            const res = results[idx];
            const highlight = highlights[s.id];

            return (
              <div key={s.id} className="flex-1 min-w-[280px] space-y-6">
                <div className="card-standard !p-6 border-2 transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <input
                      className="text-lg font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none w-full mr-4"
                      value={s.name}
                      onChange={(e) => updateScenario(s.id, { name: e.target.value })}
                    />
                    {scenarios.length > 1 && (
                      <button
                        onClick={() => removeScenario(s.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${s.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">P1 Monthly Net</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          value={s.p1Income}
                          onChange={(e) => updateScenario(s.id, { p1Income: e.target.value })}
                          className="input-standard !h-10 pl-7 w-full shadow-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">P2 Monthly Net</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          value={s.p2Income}
                          onChange={(e) => updateScenario(s.id, { p2Income: e.target.value })}
                          className="input-standard !h-10 pl-7 w-full shadow-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Children</label>
                      <select
                        value={s.children}
                        onChange={(e) => updateScenario(s.id, { children: Number(e.target.value) })}
                        className="input-standard !h-10 w-full shadow-sm"
                      >
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Custody Type</label>
                      <select
                        value={s.custodyType}
                        onChange={(e) => updateScenario(s.id, { custodyType: e.target.value as any })}
                        className="input-standard !h-10 w-full shadow-sm"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Joint Custody">Joint Custody</option>
                        <option value="With Deviation">With Deviation</option>
                      </select>
                    </div>

                    {s.custodyType === "Joint Custody" && (
                      <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Parent A Days</label>
                        <input
                          type="number"
                          value={s.daysA ?? ""}
                          onChange={(e) => updateScenario(s.id, { daysA: Number(e.target.value) })}
                          className="input-standard !h-10 w-full shadow-sm"
                          placeholder="182"
                          max="365"
                        />
                      </div>
                    )}

                    {s.custodyType === "With Deviation" && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deviation Amount</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                              type="number"
                              value={s.deviationAmount ?? ""}
                              onChange={(e) => updateScenario(s.id, { deviationAmount: e.target.value })}
                              className="input-standard !h-10 pl-7 w-full shadow-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
                          <button
                            onClick={() => updateScenario(s.id, { deviationDirection: "upward" })}
                            className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${s.deviationDirection !== "downward" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
                          >
                            UPWARD
                          </button>
                          <button
                            onClick={() => updateScenario(s.id, { deviationDirection: "downward" })}
                            className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${s.deviationDirection === "downward" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
                          >
                            DOWNWARD
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`card-standard !p-0 overflow-hidden shadow-md border-2 transition-all ${
                  highlight === "min" ? "border-green-500 ring-4 ring-green-500/10" :
                  highlight === "max" ? "border-red-500 ring-4 ring-red-500/10" :
                  "border-gray-200"
                }`}>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Basic Obligation</span>
                      <span className="font-bold text-gray-900">{curFormatter.format(res.basicObligation)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Annual Total</span>
                      <span className="font-bold text-gray-900">{curFormatter.format(res.annualTotal)}</span>
                    </div>
                  </div>
                  <div className={`p-6 border-t ${
                    highlight === "min" ? "bg-green-50" :
                    highlight === "max" ? "bg-red-50" :
                    "bg-blue-50/30"
                  }`}>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transfer Payment</p>
                      <p className={`text-3xl font-extrabold ${
                        highlight === "min" ? "text-green-600" :
                        highlight === "max" ? "text-red-600" :
                        "text-blue-600"
                      }`}>
                        {curFormatter.format(res.transferPayment)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="no-print lg:hidden text-center text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
        Scroll sideways to see all scenarios →
      </p>

      {/* PRINT LAYOUT */}
      <div className="hidden print:block space-y-8">
        {scenarios.map((s, idx) => (
          <PrintReport
            key={s.id}
            title={`Scenario Comparison: ${s.name}`}
            caseContext={[
              { label: "P1 Monthly Net:", value: curFormatter.format(parseFloat(s.p1Income) || 0) },
              { label: "P2 Monthly Net:", value: curFormatter.format(parseFloat(s.p2Income) || 0) },
            ]}
            calculationBase={[
              { label: "Children:", value: s.children },
              { label: "Custody Type:", value: s.custodyType },
              ...(s.custodyType === "Joint Custody" ? [{ label: "Parent A Days:", value: s.daysA ?? 182 }] : []),
              ...(s.custodyType === "With Deviation" ? [
                { label: "Deviation Amount:", value: curFormatter.format(parseFloat(s.deviationAmount || "0")) },
                { label: "Direction:", value: s.deviationDirection?.toUpperCase() || "UPWARD" }
              ] : [])
            ]}
            analysisItems={[
              { label: "Basic Obligation:", value: curFormatter.format(results[idx].basicObligation) },
              { label: "Annual Total:", value: curFormatter.format(results[idx].annualTotal) },
            ]}
            totalLabel="Transfer Payment"
            totalValue={curFormatter.format(results[idx].transferPayment)}
            assumptions="Based on 2026 Washington State Child Support Schedule."
            disclaimerText="This estimate is based on the 2026 Washington State Child Support Schedule. This is not a legal document. Consult a family law attorney for advice."
          />
        ))}
      </div>
    </div>
  );
}

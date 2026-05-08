"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2, Circle,
  Calculator, Info, ArrowRight, LayoutDashboard, Printer, FileText,
} from "lucide-react";
import worksheetSchema from "@/data/wa_csw_2026_schema.json";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import ParentingTimeSelector from "@/components/calculator/ParentingTimeSelector";

type FieldValue  = string | number | boolean;
type ParentValue = { p1: FieldValue; p2: FieldValue };
type FormData    = Record<string, ParentValue>;

interface WorksheetField {
  id: string;
  label: string;
  type: "currency" | "percentage" | "number" | "text" | "boolean" | "per";
  description?: string;
  tooltip?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  group?: string;
  options?: { label: string; value: string }[];
}

const PARTS = Object.keys(worksheetSchema);
const curFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const perFormatter = new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 1 });


/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = Object.keys(worksheetSchema).length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-end items-center mb-3">
        <span className="text-[12px] font-bold text-[var(--color-brand-primary)] uppercase tracking-wider">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-brand-primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   MOBILE STEP NAV & BOTTOM SHEET
───────────────────────────────────────────── */
const MobileStepNav = ({
  currentStep, onStepClick,
}: {
  currentStep: number; onStepClick: (idx: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const totalSteps = PARTS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentPartLabel = PARTS[currentStep].split(":")[1]?.trim() || PARTS[currentStep];

  return (
    <>
      <div className="lg:hidden no-print w-full bg-white border-b border-gray-200 sticky top-20 z-30 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Part {currentStep + 1} of {totalSteps} · {currentPartLabel}</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 uppercase tracking-widest"
          >
            [≡ Parts]
          </button>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2">{Math.round(progress)}% complete</p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[70] p-6 lg:hidden max-h-[60%] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">SELECT A PART</p>
              <div className="space-y-2">
                {PARTS.map((part, idx) => {
                  const isCompleted = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  const isFuture = idx > currentStep;
                  const label = part.split(":")[1]?.trim() || part;
                  return (
                    <button
                      key={idx}
                      disabled={isFuture}
                      onClick={() => {
                        onStepClick(idx);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : isFuture
                          ? "bg-gray-50 border-gray-100 text-gray-300 opacity-50"
                          : "bg-white border-gray-100 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3 font-bold text-sm">
                        <span>{isCompleted ? "✅" : idx + 1}</span>
                        <span>{label}</span>
                      </div>
                      {isCurrent && <ChevronRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


/* ─────────────────────────────────────────────
   INPUT FIELD
───────────────────────────────────────────── */
const InputField = ({
  field, values, onChange, activeTooltip, setActiveTooltip,
}: {
  field: WorksheetField;
  values: ParentValue;
  onChange: (parent: "p1" | "p2", val: FieldValue) => void;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
}) => {
  const isCurrency   = field.type === "currency";
  const isPercentage = field.type === "percentage";
  const isBoolean    = field.type === "boolean";
  const isCalculated = ["1g","2j","3","4","5_per_child","6","7","9","14","15","16d","17","18","19"].includes(field.id);
  const showTooltip = activeTooltip === field.id;

  const tooltipTexts: Record<string, string> = {
    "1a": "Your regular monthly pay before taxes. Include salary, hourly wages, commissions, and bonuses.",
    "1b": "Monthly income from bank accounts, stocks, or investments.",
    "1c": "Monthly profit from self-employment, rental property, or business ownership after expenses.",
    "1d": "Monthly alimony or spousal support you currently receive from a court order.",
    "1e": "Any other regular monthly income not listed above such as pension, workers comp, or unemployment.",
    "1f": "Income the court assigns if a parent is voluntarily unemployed or underemployed. Leave blank if both parents are employed.",
    "2a": "Your actual monthly federal and state income tax owed — not the amount withheld from your paycheck. Use last year's tax return divided by 12.",
    "2b": "Social Security (6.2%) and Medicare (1.45%) deducted from your pay. Self-employed: use 15.3% of net self-employment income.",
    "2c": "Required Washington State deductions including paid family and medical leave and long-term care premiums.",
    "2d": "Workers compensation premiums deducted from your pay by your employer.",
    "2e": "Required monthly union fees or professional licensing dues. Voluntary dues do not count.",
    "2f": "Required retirement contributions you must pay. Voluntary 401k contributions go in line 2g.",
    "2g": "Optional retirement savings up to $416/month ($5,000/year) may be deducted. Must show a consistent pattern of contributions.",
    "2h": "Monthly alimony or spousal support you pay under a current court order.",
    "2i": "If self-employed, your regular monthly business costs. Court requires justification if disputed."
  };

  const tooltipContent = tooltipTexts[field.id] || field.description;

  const toggleTooltip = () => {
    setActiveTooltip(showTooltip ? null : field.id);
  };

  const renderInput = (parent: "p1" | "p2") => {
    const val = values[parent];

    if (isBoolean) {
      return (
        <button
          type="button"
          onClick={() => onChange(parent, !val)}
          onFocus={triggerTooltip}
          className={`flex items-center justify-center w-full h-12 rounded-xl border-2 transition-all font-bold uppercase tracking-widest text-[12px] ${
            val
              ? "bg-[var(--color-brand-primary-light)] border-[var(--color-brand-primary)] text-[var(--color-brand-primary-hover)] shadow-[var(--shadow-card)]"
              : "bg-white border-[var(--color-bg-border)] text-[var(--color-text-body)] hover:border-[var(--color-brand-primary)]"
          }`}
        >
          {val
            ? <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
            : <Circle       className="w-4 h-4 mr-2 shrink-0" />
          }
          {val ? "Yes" : "No"}
        </button>
      );
    }

    return (
      <div className="relative group">
        {isCurrency && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] pointer-events-none select-none">
            $
          </span>
        )}
        <input
          type={field.type === "number" || isCurrency || isPercentage ? "number" : "text"}
          value={val as string}
          onChange={(e) => onChange(parent, e.target.value)}
          placeholder="0.00"
          className={`input-standard w-full font-medium ${isCurrency ? "pl-8" : ""} ${isPercentage ? "pr-8" : ""} ${isCalculated ? "bg-[#f3f4f6] border-[#e5e7eb] cursor-not-allowed text-[#374151]" : ""}`}
          readOnly={isCalculated}
        />
        {isCalculated && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <span className="text-gray-400">🔒</span>
          </div>
        )}
        {isPercentage && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] pointer-events-none select-none">
            %
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-start gap-3 mb-4">
        <span className="badge-meta !text-[12px] font-bold !font-bold !py-1 !px-2 shrink-0 mt-0.5">
          {field.id}
        </span>
        <label className="text-[15px] font-bold text-[var(--color-text-primary)] leading-snug">
          {field.label}
        </label>
        {tooltipContent && (
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={toggleTooltip}
              className="focus:outline-none"
            >
              <Info className="w-4 h-4 text-[var(--color-text-secondary)] cursor-help mt-1" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showTooltip && tooltipContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 leading-relaxed">
              {tooltipContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Parent 1</p>
          {renderInput("p1")}
        </div>
        <div className="space-y-2">
          <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Parent 2</p>
          {renderInput("p2")}
        </div>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function WorksheetWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData,    setFormData]    = useState<FormData>({});
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const hasIncomeInput = React.useMemo(() => {
    const incomeFields = ["1a", "1b", "1c", "1d", "1e", "1f"];
    return incomeFields.some((id) => {
      const val = formData[id];
      return Number(val?.p1) > 0 || Number(val?.p2) > 0;
    });
  }, [formData]);
  const [useParentingDeviation, setUseParentingDeviation] = useState(false);
  const [parentingTime, setParentingTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [county, setCounty] = useState("");
  const [caseNumber, setCaseNumber] = useState("");

  const currentPartKey = PARTS[currentStep];
  const currentFields  = (worksheetSchema as Record<string, WorksheetField[]>)[currentPartKey];
  const calculation    = React.useMemo(() => calculateChildSupport({
    ...formData,
    "useParentingDeviation": { p1: useParentingDeviation, p2: useParentingDeviation },
    "parentingTime": { p1: parentingTime, p2: parentingTime },
  }), [formData, useParentingDeviation, parentingTime]);

  const payingParent = String(formData["payingParent"]?.p1 || "P1");

  const partDescriptions: Record<string, string> = {
    "Part 1: Income": "Enter gross monthly income for both parents. Deductions are calculated next.",
    "Part 2: Basic Child Support Obligation": "Review your basic child support obligation from the 2026 economic table.",
    "Part 3: Healthcare, Daycare & Education": "Add monthly healthcare premiums, daycare, and education costs for the children.",
    "Part 4: Gross Child Support Obligation": "Your gross obligation combines basic support with healthcare and daycare expenses.",
    "Part 5: Child Support Credits": "Apply credits for expenses paid directly to providers outside the transfer.",
    "Part 6: Standard Calculation & Presumptive Amount": "Review the final presumptive transfer payment amount for each parent.",
    "Part 7: Additional Informational Factors": "Document the 45% income limit and 25% basic support reference values.",
    "Part 8: Additional Factors for Court": "Add any additional factors for court consideration or deviation requests."
  };

  const derivedData: Record<string, { p1: number; p2: number; reason?: string }> = React.useMemo(() => ({
    "1g":      { p1: calculation.grossP1,       p2: calculation.grossP2       },
    "2j":      { p1: calculation.deductionsP1,  p2: calculation.deductionsP2  },
    "3":       { p1: calculation.netP1,         p2: calculation.netP2         },
    "4":       { p1: calculation.combinedIncome,p2: calculation.combinedIncome },
    "5_per_child": { p1: calculation.baseSupport / calculation.children, p2: calculation.baseSupport / calculation.children },
    "6":       { p1: calculation.shareP1,       p2: calculation.shareP2       },
    "7":       { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
    "8_reason":{ p1: 0, p2: 0, reason: calculation.adjustmentReason },
    "9":       { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
    "14":      { p1: 0, p2: 0 },
    "16d":     { p1: 0, p2: 0 },
    "17":      { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
    "18":      { p1: calculation.netP1 * 0.45,  p2: calculation.netP2 * 0.45  },
    "19":      { p1: calculation.obligationP1 * 0.25, p2: calculation.obligationP2 * 0.25 },
    "ssr_adj": {
      p1: payingParent === "P1" ? calculation.breakdown.ssrAdjustment : 0,
      p2: payingParent === "P2" ? calculation.breakdown.ssrAdjustment : 0
    },
    "cap_adj": {
      p1: payingParent === "P1" ? calculation.breakdown.cap45Adjustment : 0,
      p2: payingParent === "P2" ? calculation.breakdown.cap45Adjustment : 0
    },
  }), [calculation, payingParent]);

  if (!currentFields || !Array.isArray(currentFields)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center p-12 bg-white rounded-3xl border border-[var(--color-bg-border)] shadow-[var(--shadow-card-hover)] max-w-md w-full">
          <Calculator className="w-12 h-12 mx-auto mb-6 text-[var(--color-text-secondary)]" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Step Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">The requested worksheet step could not be loaded.</p>
          <button
            onClick={() => setCurrentStep(0)}
            className="btn btn-primary w-full"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, parent: "p1" | "p2", value: FieldValue) => {
    const calculatedIds = ["1g","2j","3","4","5","5_per_child","6","7","9","10c","10d","11e","12","13","14","15","16d","17","18","19"];
    if (calculatedIds.includes(fieldId)) return;
    setFormData((prev) => ({
      ...prev,
      [fieldId]: { ...(prev[fieldId] || { p1: "", p2: "" }), [parent]: value },
    }));
  };

  const goToStep = (idx: number) => {
    setCurrentStep(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = () => {
    if (currentStep === PARTS.length - 1) {
      setShowSummary(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => { if (currentStep > 0) goToStep(currentStep - 1); };
  const resetWizard = () => { setShowSummary(false); setCurrentStep(0); };

  const handleDownloadPDF = async () => {
    const element  = document.getElementById("pdf-summary-content");
    if (!element) return;

    const jsPDF = (await import("jspdf")).default;
    const html2canvas = (await import("html2canvas")).default;

    const actionRow = document.getElementById("summary-action-row");
    if (actionRow) actionRow.style.display = "none";
    const editBtn = document.getElementById("pdf-edit-btn");
    if (editBtn) editBtn.style.display = "none";

    try {
      const canvas  = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf     = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w       = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, w, (canvas.height * w) / canvas.width);
      pdf.save(`WSCSS_Worksheet_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Could not generate PDF. Try printing the page directly.");
    } finally {
      if (actionRow) actionRow.style.display = "flex";
      if (editBtn) editBtn.style.display = "flex";
    }
  };

  const handleCopyToClipboard = () => {
    const text = `Washington Child Support Worksheet
Date: ${new Date().toLocaleDateString()} | County: ${county || "Not specified"}
─────────────────────────────
Combined Net Income: ${curFormatter.format(calculation.combinedIncome)}
P1 Share: ${perFormatter.format(calculation.shareP1)} | P2 Share: ${perFormatter.format(calculation.shareP2)}
Basic Obligation: ${curFormatter.format(calculation.baseSupport)}
P1 Transfer Payment: ${curFormatter.format(derivedData["17"]?.p1 || 0)}
P2 Transfer Payment: ${curFormatter.format(derivedData["17"]?.p2 || 0)}
─────────────────────────────
Generated by wscss.site
Estimate only — not legal advice`;

    navigator.clipboard.writeText(text).then(() => {
      alert("Summary copied to clipboard!");
    });
  };


  /* ── SUMMARY VIEW ────────────────────────────────────────────────── */
  const renderSummaryContent = () => {
    const today = new Date().toLocaleDateString();

    const summaryRows = [
      { section: "INCOME", rows: [
        { label: "Combined Monthly Net Income (Line 4)", id: "4", value: calculation.combinedIncome }
      ]},
      { section: "BASIC SUPPORT", rows: [
        { label: "Basic Support Per Child (Line 5)", id: "5_per_child" },
        { label: "Total Basic Obligation (Line 5)", id: "base", value: calculation.baseSupport },
        { label: "P1 Proportional Share (Line 6)", id: "6", type: "per" },
        { label: "P2 Proportional Share (Line 6)", id: "6", type: "per", parent: "p2" }
      ]},
      { section: "AFTER LIMITATIONS (Line 9)", rows: [
        { label: "P1 Basic Obligation", id: "9" },
        { label: "P2 Basic Obligation", id: "9", parent: "p2" }
      ]},
      { section: "ADDITIONAL EXPENSES (Line 13)", rows: [
        { label: "Healthcare + Daycare Total", id: "13", value: (formData["10d"]?.p1 as number || 0) + (formData["12"]?.p1 as number || 0) }
      ]},
      { section: "GROSS OBLIGATION (Line 15)", rows: [
        { label: "P1 Gross Obligation", id: "15", value: derivedData["9"]?.p1 + (calculation.breakdown.extraCosts || 0) },
        { label: "P2 Gross Obligation", id: "15", value: derivedData["9"]?.p2 + (payingParent === "P2" ? calculation.breakdown.extraCosts : 0) }
      ]},
      { section: "CREDITS (Line 16d)", rows: [
        { label: "P1 Credits", id: "16d", value: formData["16d"]?.p1 as number || 0 },
        { label: "P2 Credits", id: "16d", value: formData["16d"]?.p2 as number || 0 }
      ]},
      { section: "PRESUMPTIVE TRANSFER (Line 17)", rows: [
        { label: "P1 Transfer Payment", id: "17", isTransfer: true },
        { label: "P2 Transfer Payment", id: "17", parent: "p2", isTransfer: true }
      ]},
      { section: "INFORMATIONAL", rows: [
        { label: "45% Net Income Limit (Line 18)", id: "18" },
        { label: "25% Basic Support (Line 19)", id: "19" }
      ]}
    ];

    return (
      <motion.div
        id="pdf-summary-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-16 bg-white p-4 sm:p-10 rounded-2xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">WORKSHEET SUMMARY — 2026 AOC FORMAT</h1>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <span>Date: {today}</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span>RCW 26.19 Compliant</span>
            </div>
            {county && (
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-2">{county} County {caseNumber && `· Case: ${caseNumber}`}</p>
            )}
          </div>
          <button
            id="pdf-edit-btn"
            onClick={resetWizard}
            className="btn btn-secondary !rounded-full !px-6"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Edit Data
          </button>
        </div>

        <div className="space-y-10">
          {summaryRows.map((section) => (
            <div key={section.section} className="space-y-4">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{section.section}</p>
              <div className="space-y-3">
                {section.rows.map((row, idx) => {
                  const val = row.value !== undefined ? row.value : (row.parent === "p2" ? derivedData[row.id]?.p2 : derivedData[row.id]?.p1);
                  const displayVal = hasIncomeInput ? (row.type === "per" ? perFormatter.format(val || 0) : curFormatter.format(val || 0)) : "—";

                  return (
                    <div key={idx} className="flex justify-between items-center">
                      <span className={`text-sm ${row.isTransfer ? "font-bold text-gray-900" : "text-gray-600"}`}>{row.label}:</span>
                      <span className={`tabular-nums ${row.isTransfer ? "text-2xl font-bold text-blue-600" : "font-bold text-gray-900"}`}>
                        {displayVal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="callout-gray !p-8 !bg-gray-50 !border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed text-center max-w-3xl mx-auto italic">
            This worksheet produces estimates based on the 2026 Washington State Child Support Schedule. All calculations are estimates only. Final orders are determined by a Washington State court.
          </p>
        </div>

        <div id="summary-action-row" className="flex flex-col sm:flex-row justify-center gap-4 no-print pt-6">
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary !h-14 !px-10 !rounded-xl !font-bold !text-lg"
          >
            Download Official PDF
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary !h-14 !px-10 !rounded-xl !font-bold"
          >
            Print Entire Worksheet
          </button>
          <button
            onClick={handleCopyToClipboard}
            className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
          >
            Copy Summary to Clipboard
          </button>
        </div>
      </motion.div>
    );
  };


  /* ── MAIN RENDER ─────────────────────────────────────────────────── */
  return (
    <div id="wizard" className="scroll-mt-24 min-h-screen bg-white flex flex-col lg:flex-row selection:bg-[var(--color-brand-primary-light)] selection:text-[var(--color-brand-primary-hover)] items-start">

      {/* ── PRINT-ONLY ALL STEPS ────────────────────────────────────────── */}
      <div className="hidden print:block w-full p-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="border-b-4 border-indigo-600 pb-6 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Official Child Support Worksheet</h1>
              <p className="text-indigo-600 font-semibold text-lg">Washington State Guidelines (2026)</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Results Summary in Print */}
          <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-10">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Calculation Results Summary</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm text-indigo-700 font-bold uppercase tracking-wider">Total Combined Net</p>
                <p className="text-2xl font-bold text-gray-900">{curFormatter.format(calculation.combinedIncome)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-indigo-700 font-bold uppercase tracking-wider">Presumptive Transfer (17)</p>
                <div className="flex justify-between">
                  <span className="text-gray-700">P1: <span className="font-bold">{curFormatter.format(derivedData["17"]?.p1 || 0)}</span></span>
                  <span className="text-gray-700">P2: <span className="font-bold">{curFormatter.format(derivedData["17"]?.p2 || 0)}</span></span>
                </div>
              </div>
            </div>
          </section>

          {/* All Input Data */}
          {Object.entries(worksheetSchema).map(([partName, fields]) => (
            <section key={partName} className="break-inside-avoid">
              <h3 className="text-lg font-bold bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-indigo-600">{partName}</h3>
              <div className="grid grid-cols-1 gap-4">
                {fields.map((field: WorksheetField) => {
                  const isCalculated = ["1g","2j","3","4","5_per_child","6","18","19"].includes(field.id);
                  const values = isCalculated
                    ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                    : (formData[field.id] || { p1: "", p2: "" });

                  if (!isCalculated && !values.p1 && !values.p2 && field.type !== 'boolean') return null;

                  return (
                    <div key={field.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">{field.id}</span>
                        <span className="text-sm text-gray-700 font-medium">{field.label}</span>
                      </div>
                      <div className="flex gap-8 min-w-[200px] justify-end">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block uppercase">P1</span>
                          <span className="text-sm font-bold">
                            {field.type === 'boolean' ? (values.p1 ? 'Yes' : 'No') : field.type === 'currency' ? curFormatter.format(Number(values.p1)) : values.p1}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block uppercase">P2</span>
                          <span className="text-sm font-bold">
                            {field.type === 'boolean' ? (values.p2 ? 'Yes' : 'No') : field.type === 'currency' ? curFormatter.format(Number(values.p2)) : values.p2}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="pt-10 mt-10 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic text-center leading-relaxed">
              Disclaimer: This is an automated estimate generated by WSCSS Pro based on RCW 26.19 guidelines.
              Actual court orders may vary. This worksheet summary is for informational and preparational purposes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop Sidebar ────────────────────────────────────────── */}
      {!showSummary && (
        <aside className="no-print hidden lg:flex w-80 shrink-0 flex-col border-r border-[#e5e7eb] bg-white sticky top-0 h-screen overflow-y-auto pr-6">
          <div className="flex flex-col h-full p-6 space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[var(--color-text-primary)] rounded-xl shadow-[var(--shadow-card-md)] shrink-0">
                <Calculator className="w-6 h-6 text-[var(--color-brand-primary-light)]" />
              </div>
              <div>
                <p className="font-bold text-[var(--color-text-primary)] text-lg tracking-tight leading-none mb-1.5">
                  Worksheet Pro
                </p>
                <span className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">2026 Guidelines</span>
              </div>
            </div>

            {/* Section 1 — Parts Navigation */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">PARTS</p>
              <nav className="space-y-1" aria-label="Worksheet steps">
                {PARTS.map((part, idx) => {
                  const isCompleted = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  const isFuture = idx > currentStep;
                  const label = part.split(":")[1]?.trim() || part;

                  return (
                    <button
                      key={part}
                      onClick={() => !isFuture && goToStep(idx)}
                      disabled={isFuture}
                      className={`w-full group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-[13px] font-semibold text-left ${
                        isCurrent
                          ? "bg-blue-50 text-blue-700"
                          : isFuture
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="shrink-0">
                        {isCompleted ? "✅" : isCurrent ? `${idx + 1} ·` : `${idx + 1} ·`}
                      </span>
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Section 2 — Live Estimate Card */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">LIVE ESTIMATE</p>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">Combined Income</span>
                    <span className="font-bold text-gray-900">{hasIncomeInput ? curFormatter.format(calculation.combinedIncome) : "$0"}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">P1 Share</span>
                    <span className="font-bold text-gray-900">{hasIncomeInput ? perFormatter.format(calculation.shareP1) : "—"}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-500">P2 Share</span>
                    <span className="font-bold text-gray-900">{hasIncomeInput ? perFormatter.format(calculation.shareP2) : "—"}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-[13px] font-bold text-gray-900">Est. Transfer</span>
                    <span className="text-xl font-bold text-blue-600">
                      {hasIncomeInput ? curFormatter.format(calculation.finalSupport) : "—"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400">Estimate only</p>
                    {!hasIncomeInput && (
                      <p className="text-[10px] text-gray-400 italic">Updates as you type</p>
                    )}
                    {hasIncomeInput && !formData["2a"]?.p1 && !formData["2a"]?.p2 && (
                       <p className="text-[10px] text-gray-400 italic">Deductions not yet entered</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 — Current Step Context */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">YOU ARE HERE</p>
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-900">{currentPartKey}</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {partDescriptions[currentPartKey]}
                </p>
              </div>
            </div>

            {/* Section 4 — 2026 Key Values Reference */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">2026 KEY VALUES</p>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">Self-Support Reserve</p>
                  <p className="text-lg font-bold text-gray-900">$2,394/mo</p>
                  <p className="text-[10px] text-blue-500">RCW 26.19.065(2)(b)</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">Minimum Support</p>
                  <p className="text-sm font-bold text-gray-900">$50 per child per month/month</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">Economic Table Max</p>
                  <p className="text-sm font-bold text-gray-900">$50,000 combined net</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">SSR Update Date</p>
                  <p className="text-sm font-bold text-gray-900">January 1, 2026</p>
                </div>
              </div>
            </div>

             {/* Section 5 — Progress Checklist */}
             <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">YOUR PROGRESS</p>
              <div className="space-y-2">
                {PARTS.map((part, idx) => {
                   const isCompleted = idx < currentStep;
                   const label = part.split(":")[1]?.trim() || part;
                   return (
                     <div key={idx} className="flex items-center gap-2 text-[12px]">
                        <span>{isCompleted ? "✅" : "⬜"}</span>
                        <span className={isCompleted ? "text-gray-500" : "text-gray-400"}>{part.split(":")[0]} · {label}</span>
                     </div>
                   )
                })}
                <hr className="border-gray-100 my-4" />
                <p className="text-[12px] font-bold text-gray-900">{currentStep} of 8 parts complete</p>
              </div>
            </div>

            {/* Section 6 — Need Help */}
            <div className="pt-10 mt-auto">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">NEED HELP?</p>
              <div className="space-y-3">
                <a href="https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <FileText className="w-4 h-4" /> 📄 AOC Instructions
                </a>
                <a href="https://www.courts.wa.gov/forms/documents/WSCSS_Schedule_2026_01.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <LayoutDashboard className="w-4 h-4" /> 📊 2026 Schedule PDF
                </a>
                <Link href="/editorial-methodology" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Info className="w-4 h-4" /> 📖 Our Methodology
                </Link>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 w-full no-print pl-6">

        {!showSummary && (
          <MobileStepNav
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        )}

        <div className="flex-1 w-full bg-white">
          <div className="container-wide py-12 lg:py-0">

            {showSummary ? renderSummaryContent() : (
              <div className="max-w-3xl mx-auto mt-0">
                <ProgressBar currentStep={currentStep} />

                <div className="card-standard !p-8 md:!p-8 shadow-[var(--shadow-card-md)] relative overflow-hidden mt-0">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand-primary-light)]/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <div className="mb-12 md:mb-16 text-center md:text-left relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[12px] font-bold uppercase tracking-widest rounded-lg">
                        Step {currentStep + 1} OF {PARTS.length}
                      </span>
                      <span className="text-[12px] font-bold text-blue-600 uppercase tracking-widest">Follows Official AOC Format · RCW 26.19 Compliant</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">{currentPartKey}</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                      {partDescriptions[currentPartKey]}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <div className="space-y-10">
                        {currentStep === 0 && (
                          <div className="mb-10 pb-10 border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="col-span-full mb-2">
                                <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">CASE INFORMATION</p>
                                <p className="text-xs text-gray-500 mt-1">These fields identify your case for court filing. They do not affect any calculations.</p>
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="county-select" className="text-[15px] font-bold text-gray-900">County</label>
                                <select
                                  id="county-select"
                                  value={county}
                                  onChange={(e) => setCounty(e.target.value)}
                                  className="input-standard w-full"
                                >
                                  <option value="">Select County</option>
                                  {[
                                    "Adams", "Asotin", "Benton", "Chelan", "Clallam", "Clark", "Columbia", "Cowlitz", "Douglas", "Ferry",
                                    "Franklin", "Garfield", "Grant", "Grays Harbor", "Island", "Jefferson", "King", "Kitsap", "Kittitas", "Klickitat",
                                    "Lewis", "Lincoln", "Mason", "Okanogan", "Pacific", "Pend Oreille", "Pierce", "San Juan", "Skagit", "Skamania",
                                    "Snohomish", "Spokane", "Stevens", "Thurston", "Wahkiakum", "Walla Walla", "Whatcom", "Whitman", "Yakima"
                                  ].map(c => (
                                    <option key={c} value={c}>{c} County</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="case-number" className="text-[15px] font-bold text-gray-900">Case Number (optional)</label>
                                <input
                                  id="case-number"
                                  type="text"
                                  value={caseNumber}
                                  onChange={(e) => setCaseNumber(e.target.value)}
                                  placeholder="e.g. 24-2-12345-6"
                                  className="input-standard w-full"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {currentStep === 0 && (
                          <div className="mb-6">
                            <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">PART 1: INCOME</p>
                          </div>
                        )}

                        {currentPartKey === "Part 2: Basic Child Support Obligation" && (
                          <div className="mb-10 pb-10 border-b border-[var(--color-bg-border-soft)]">
                            <ParentingTimeSelector
                              useParentingDeviation={useParentingDeviation}
                              setUseParentingDeviation={setUseParentingDeviation}
                              parentingTime={parentingTime}
                              setParentingTime={setParentingTime}
                            />
                          </div>
                        )}

                        {currentFields.map((field: WorksheetField, idx: number) => {
                          const isCalculated = ["1g","2j","3","4","5_per_child","6","18","19"].includes(field.id);
                          const values = isCalculated
                            ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                            : (formData[field.id] || { p1: "", p2: "" });

                          const showDeductionsDivider = field.id === "2a";

                          return (
                            <div
                              key={field.id}
                              className={`${isCalculated ? "pointer-events-none select-none bg-[var(--color-bg-subtle)] p-6 rounded-2xl border border-[var(--color-bg-border)] mb-4" : "mb-6"}`}
                            >
                            {showDeductionsDivider && (
                              <div className="col-span-full border-t border-gray-200 pt-8 pb-4 mb-8 -mx-8 px-8 bg-gray-50/50">
                                <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">MONTHLY DEDUCTIONS FROM GROSS INCOME</p>
                              </div>
                            )}
                            <>
                              {field.id === "5_children" ? (
                                <div className="mb-8">
                                  <div className="flex items-start gap-3 mb-4">
                                    <span className="badge-meta !text-[12px] font-bold !py-1 !px-2 shrink-0 mt-0.5">5_children</span>
                                    <label className="text-[15px] font-bold text-[var(--color-text-primary)] leading-snug">Number of children</label>
                                  </div>
                                  <div className="max-w-xs mx-auto">
                                    <input
                                      type="number"
                                      value={values.p1 as string}
                                      onChange={(e) => {
                                        handleInputChange("5_children", "p1", e.target.value);
                                        handleInputChange("5_children", "p2", e.target.value);
                                      }}
                                      className="input-standard w-full text-center font-bold text-lg"
                                      placeholder="1"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <InputField
                                  field={field}
                                  values={values as ParentValue}
                                  onChange={(parent, val) => handleInputChange(field.id, parent, val)}
                                  activeTooltip={activeTooltip}
                                  setActiveTooltip={setActiveTooltip}
                                />
                              )}
                              {field.id === "8_reserve" && (
                                <p className="text-[11px] font-bold text-[var(--color-text-secondary)] italic mt-2 ml-10">
                                  * Adjusted annually by the state to reflect updated federal poverty guidelines.
                                </p>
                              )}
                            </>
                              {isCalculated && (
                                <div className="flex items-center gap-2 text-[12px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mt-6 bg-white w-fit px-3 py-1 rounded-full border border-[var(--color-brand-primary-mid)]">
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <Calculator className="w-3 h-3" />
                                  </motion.div>
                                  Calculated automatically
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-[var(--color-bg-border-soft)] relative z-10">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`btn btn-secondary !rounded-full !px-8 h-14 ${
                        currentStep === 0
                          ? "pointer-events-none"
                          : "hover:shadow-[var(--shadow-card-md)] active:scale-[0.98]"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous Step
                    </button>

                    <button
                      onClick={nextStep}
                      className="btn btn-primary !rounded-full !px-10 h-14 shadow-[var(--shadow-card-hover)] shadow-[var(--color-brand-primary)]/20"
                    >
                      {currentStep === PARTS.length - 1 ? "Generate Summary" : "Save & Continue"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
                      <span className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Follows Official AOC Format · RCW 26.19 Compliant</span>
                  </div>
                  <div className="flex gap-8">
                    <Link href="/privacy" className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest hover:text-[var(--color-brand-primary)] transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest hover:text-[var(--color-brand-primary)] transition-colors">
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {!showSummary && (
        <div
          className="lg:hidden no-print fixed bottom-0 left-0 right-0 px-6 h-16 bg-white border-t border-gray-200 z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Est. Transfer</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-gray-900 tabular-nums">
                  {hasIncomeInput ? curFormatter.format(calculation.finalSupport) : "—"}
                </span>
                {calculation.ssrApplied && <div className="w-2 h-2 bg-amber-400 rounded-full" title="SSR Applied" />}
              </div>
            </div>
          </div>
          <button
            onClick={nextStep}
            className="btn btn-primary !rounded-full !px-8 h-11 text-sm font-bold shadow-lg shadow-blue-600/20"
          >
            {currentStep === PARTS.length - 1 ? "Get Summary" : "Continue →"}
          </button>
        </div>
      )}
    </div>
  );
}

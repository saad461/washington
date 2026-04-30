"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2, Circle,
  Calculator, Info, ArrowRight, LayoutDashboard,
} from "lucide-react";
import worksheetSchema from "@/data/wa_csw_2026_schema.json";
import { calculateChildSupport } from "@/utils/calculatorEngine";
import ParentingTimeSelector from "@/components/calculator/ParentingTimeSelector";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
      <div className="flex justify-between items-center mb-3">
        <span className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-[12px] font-bold font-bold text-[var(--color-brand-primary)] uppercase tracking-wider">{Math.round(progress)}% Complete</span>
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
   MOBILE STEP PILLS
───────────────────────────────────────────── */
const MobileStepNav = ({
  currentStep, onStepClick,
}: {
  currentStep: number; onStepClick: (idx: number) => void;
}) => {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  return (
    <div className="lg:hidden no-print w-full bg-white border-b border-[var(--color-bg-border)] shadow-[var(--shadow-card)] sticky top-20 z-30">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {PARTS.map((part, idx) => {
          const isActive = idx === currentStep;
          const isDone   = idx < currentStep;
          const label    = part.split(":")[1]?.trim() || part;
          return (
            <button
              key={idx}
              data-active={isActive ? "true" : "false"}
              onClick={() => onStepClick(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 border text-[12px] font-bold font-bold uppercase tracking-wider ${
                isActive
                  ? "bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)] shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20"
                  : isDone
                  ? "bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-bg-border)]"
                  : "bg-white border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)]"
              }`}
            >
              <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[12px] font-bold font-bold ${
                isActive ? "bg-white/20" : isDone ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)]"
              }`}>
                {isDone ? "✓" : idx + 1}
              </span>
              <span className="max-w-[80px] truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   INPUT FIELD
───────────────────────────────────────────── */
const InputField = ({
  field, values, onChange,
}: {
  field: WorksheetField;
  values: ParentValue;
  onChange: (parent: "p1" | "p2", val: FieldValue) => void;
}) => {
  const isCurrency   = field.type === "currency";
  const isPercentage = field.type === "percentage";
  const isBoolean    = field.type === "boolean";

  const renderInput = (parent: "p1" | "p2") => {
    const val = values[parent];

    if (isBoolean) {
      return (
        <button
          type="button"
          onClick={() => onChange(parent, !val)}
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
          className={`input-standard w-full font-medium ${isCurrency ? "pl-8" : ""} ${isPercentage ? "pr-8" : ""}`}
        />
        {isPercentage && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-brand-primary)] pointer-events-none select-none">
            %
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-start gap-3 mb-4">
        <span className="badge-meta !text-[12px] font-bold !font-bold !py-1 !px-2 shrink-0 mt-0.5">
          {field.id}
        </span>
        <label className="text-[15px] font-bold text-[var(--color-text-primary)] leading-snug">
          {field.label}
        </label>
        {field.description && (
          <div className="group relative shrink-0">
            <Info className="w-4 h-4 text-[var(--color-text-secondary)] cursor-help mt-1" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-[var(--color-text-primary)] text-white text-[13px] leading-relaxed rounded-xl group-hover:block transition-opacity pointer-events-none z-50 shadow-[var(--shadow-card-hover)]">
              {field.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-[var(--color-text-primary)]" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Parent 1</p>
          {renderInput("p1")}
        </div>
        <div className="space-y-2">
          <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest ml-1">Parent 2</p>
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
  const [useParentingDeviation, setUseParentingDeviation] = useState(false);
  const [parentingTime, setParentingTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentPartKey = PARTS[currentStep];
  const currentFields  = (worksheetSchema as Record<string, WorksheetField[]>)[currentPartKey];
  const calculation    = React.useMemo(() => calculateChildSupport({
    ...formData,
    "useParentingDeviation": { p1: useParentingDeviation, p2: useParentingDeviation },
    "parentingTime": { p1: parentingTime, p2: parentingTime },
  }), [formData, useParentingDeviation, parentingTime]);

  const derivedData: Record<string, { p1: number; p2: number }> = React.useMemo(() => ({
    "1g":      { p1: calculation.grossP1,       p2: calculation.grossP2       },
    "2j":      { p1: calculation.deductionsP1,  p2: calculation.deductionsP2  },
    "3":       { p1: calculation.netP1,         p2: calculation.netP2         },
    "4":       { p1: calculation.combinedIncome,p2: calculation.combinedIncome },
    "6":       { p1: calculation.shareP1,       p2: calculation.shareP2       },
    "7":       { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
    "8_reason":{ p1: 0, p2: 0, reason: calculation.adjustmentReason } as never,
    "9":       { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
    "14":      { p1: 0, p2: 0 },
    "16d":     { p1: 0, p2: 0 },
    "17":      { p1: calculation.obligationP1,  p2: calculation.obligationP2  },
  }), [calculation]);

  if (!currentFields || !Array.isArray(currentFields)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center p-12 bg-white rounded-3xl border border-[var(--color-bg-border)] shadow-[var(--shadow-card-hover)] max-w-md w-full">
          <Calculator className="w-12 h-12 mx-auto mb-6 text-[var(--color-text-secondary)]" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Step Not Found</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">The requested worksheet step could not be loaded.</p>
          <button
            onClick={() => setCurrentStep(0)}
            className="btn-primary w-full"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, parent: "p1" | "p2", value: FieldValue) => {
    const calculatedIds = ["1g","2j","3","4","5","6","7","9","10c","10d","11e","12","13","14","15","16d","17"];
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
    const printBtn = document.getElementById("pdf-download-btn");
    const editBtn  = document.getElementById("pdf-edit-btn");
    if (printBtn) printBtn.style.display = "none";
    if (editBtn)  editBtn.style.display  = "none";
    try {
      const canvas  = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf     = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w       = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, w, (canvas.height * w) / canvas.width);
      pdf.save(`WCSSC_Worksheet_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Could not generate PDF. Try printing the page directly.");
    } finally {
      if (printBtn) printBtn.style.display = "flex";
      if (editBtn)  editBtn.style.display  = "flex";
    }
  };


  /* ── SUMMARY VIEW ────────────────────────────────────────────────── */
  const renderSummaryContent = () => (
    <motion.div
      id="pdf-summary-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-16 bg-white p-4 sm:p-10 rounded-2xl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-[var(--color-bg-border-soft)] pb-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Worksheet Summary</h1>
            <span className="badge-category !bg-[var(--color-brand-primary)] !text-white sm:ml-2">2026 OFFICIAL</span>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Official results based on the 2026 Washington State Child Support Schedule.
          </p>
          <div className="flex items-center gap-2 mt-4 text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
            <span>Date of Calculation: {new Date().toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>Ref: RCW 26.19 Compliance</span>
          </div>
        </div>
        <button
          id="pdf-edit-btn"
          onClick={resetWizard}
          className="btn-secondary !rounded-full !px-6"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Edit Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card-highlighted !bg-[var(--color-text-primary)] !border-none !p-8 shadow-[var(--shadow-card-hover)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[12px] font-bold font-bold text-white/60 uppercase tracking-widest block mb-4">Total Combined Net</span>
            <p className="text-3xl font-bold text-white tabular-nums">
              {curFormatter.format(calculation.combinedIncome)}
            </p>
          </div>
        </div>
        <div className="card-standard !p-8 shadow-[var(--shadow-card)]">
          <span className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest block mb-4">Parent 1 Transfer</span>
          <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
            {curFormatter.format(derivedData["17"]?.p1 || 0)}
          </p>
        </div>
        <div className="card-standard !p-8 shadow-[var(--shadow-card)]">
          <span className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest block mb-4">Parent 2 Transfer</span>
          <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
            {curFormatter.format(derivedData["17"]?.p2 || 0)}
          </p>
        </div>
      </div>

      <div className="table-container shadow-[var(--shadow-card)]">
        <table className="w-full text-left border-collapse min-w-[300px]">
          <caption className="sr-only">Official Worksheet Data Breakdown</caption>
          <thead>
            <tr>
              <th className="table-header-cell">Part / Field</th>
              <th className="table-header-cell">P1</th>
              <th className="table-header-cell">P2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-bg-border-soft)]">
            {[
              { label: "Total Gross Income (1g)",   id: "1g"       },
              { label: "Total Deductions (2j)",      id: "2j"       },
              { label: "Monthly Net Income (3)",     id: "3",  highlight: true },
              { label: "Proportional Share (6)",     id: "6",  type: "per"     },
              { label: "Basic Support (Table)",      id: "base", value: calculation.baseSupport },
              { label: "Adjustment Reason",          id: "8_reason", isReason: true },
              { label: "Final Basic Support (9)",    id: "9",  highlight: true },
              { label: "Extra Expenses (14)",        id: "14"       },
              { label: "Total Credits (16d)",        id: "16d"      },
              { label: "Presumptive Transfer (17)",  id: "17", highlight: true, bold: true },
            ].map((row) => (
              <tr
                key={row.id}
                className={`${row.highlight ? "bg-[var(--color-brand-primary-light)]" : ""} hover:bg-[var(--color-bg-subtle)] transition-colors`}
              >
                <td className={`table-body-cell ${row.bold ? "font-bold text-[var(--color-text-primary)]" : "font-medium text-[var(--color-text-secondary)]"}`}>
                  {row.label}
                </td>
                {row.isReason ? (
                  <td colSpan={2} className="table-body-cell text-[12px] font-bold text-[var(--color-text-secondary)] uppercase italic">
                    {(derivedData[row.id] as unknown as { reason?: string })?.reason}
                  </td>
                ) : row.value !== undefined ? (
                  <td colSpan={2} className={`table-body-cell tabular-nums ${row.bold ? "text-xl font-bold text-[var(--color-text-primary)]" : "font-bold"}`}>
                    {curFormatter.format(row.value)}
                  </td>
                ) : (
                  <>
                    <td className={`table-body-cell tabular-nums ${row.bold ? "text-xl font-bold text-[var(--color-brand-primary)]" : "font-bold text-[var(--color-text-primary)]"}`}>
                      {row.type === "per"
                        ? perFormatter.format(derivedData[row.id]?.p1 || 0)
                        : curFormatter.format(derivedData[row.id]?.p1 || 0)}
                    </td>
                    <td className={`table-body-cell tabular-nums ${row.bold ? "text-xl font-bold text-[var(--color-brand-primary)]" : "font-bold text-[var(--color-text-primary)]"}`}>
                      {row.type === "per"
                        ? perFormatter.format(derivedData[row.id]?.p2 || 0)
                        : curFormatter.format(derivedData[row.id]?.p2 || 0)}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="callout-gray !p-8">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed text-center max-w-3xl mx-auto italic">
          Disclaimer: This is an estimate based on the 2026 Washington State Child Support Schedule. Actual support amounts may vary based on judicial deviations, custody arrangements, and localized court rules. This document is for informational use only and does not constitute a court order.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          id="pdf-download-btn"
          onClick={handleDownloadPDF}
          className="btn-primary-lg btn-primary !rounded-full !px-10"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Download Official PDF
        </button>
      </div>
    </motion.div>
  );


  /* ── MAIN RENDER ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row selection:bg-[var(--color-brand-primary-light)] selection:text-[var(--color-brand-primary-hover)]">

      {/* ── Desktop Sidebar ────────────────────────────────────────── */}
      {!showSummary && (
        <aside className="no-print hidden lg:flex w-80 shrink-0 flex-col border-r border-[var(--color-bg-border)] bg-white sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col h-full p-8">
            <div className="mb-10 flex items-center gap-4">
              <div className="p-2.5 bg-[var(--color-text-primary)] rounded-xl shadow-[var(--shadow-card-md)] shrink-0">
                <Calculator className="w-6 h-6 text-[var(--color-brand-primary-light)]" />
              </div>
              <div>
                <p className="font-bold text-[var(--color-text-primary)] text-lg tracking-tight leading-none mb-1.5">
                  Worksheet Pro
                </p>
                <span className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">2026 Guidelines</span>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Worksheet steps">
              {PARTS.map((part, idx) => (
                <button
                  key={part}
                  onClick={() => goToStep(idx)}
                  className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    currentStep === idx
                      ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold border-2 transition-colors shrink-0 ${
                    currentStep === idx
                      ? "bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20"
                      : idx < currentStep
                      ? "bg-[var(--color-success-bg)] border-[var(--color-bg-border)] text-[var(--color-success)]"
                      : "bg-white border-[var(--color-bg-border)] text-[var(--color-text-secondary)] group-hover:border-[var(--color-brand-primary)]"
                  }`}>
                    {idx < currentStep ? "✓" : idx + 1}
                  </span>
                  <span className="truncate">{part.split(":")[1]?.trim() || part}</span>
                </button>
              ))}
            </nav>

            <motion.div
              className="mt-10 p-6 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-2xl relative overflow-hidden shadow-[var(--shadow-card-hover)]"
              layout
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 bg-white/10 rounded-lg shrink-0">
                    <LayoutDashboard className="w-4 h-4 text-indigo-100" />
                  </div>
                  <span className="text-[12px] font-bold font-bold text-white/70 uppercase tracking-widest">Est. Base Support</span>
                </div>
                <p className="text-3xl font-bold text-white tabular-nums">
                  {curFormatter.format(calculation.baseSupport)}
                </p>
              </div>
            </motion.div>
          </div>
        </aside>
      )}

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 w-full">

        {!showSummary && (
          <MobileStepNav
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        )}

        <div className="flex-1 w-full bg-[var(--color-bg-subtle)]">
          <div className="container-wide py-12 lg:py-20">

            {showSummary ? renderSummaryContent() : (
              <div className="max-w-3xl mx-auto">
                <ProgressBar currentStep={currentStep} />

                <div className="card-standard !p-8 md:!p-16 shadow-[var(--shadow-card-md)] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand-primary-light)]/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <div className="mb-12 md:mb-16 text-center md:text-left relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-white border border-[var(--color-bg-border)] text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest rounded-full mb-6">
                      Step {currentStep + 1} OF {PARTS.length}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">{currentPartKey}</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                      Fill in the mandatory fields below. Your live support estimate updates
                      automatically as you input income and deduction details.
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
                        {currentPartKey === "Part II: Basic Child Support Obligation" && (
                          <div className="mb-10 pb-10 border-b border-[var(--color-bg-border-soft)]">
                            <ParentingTimeSelector
                              useParentingDeviation={useParentingDeviation}
                              setUseParentingDeviation={setUseParentingDeviation}
                              parentingTime={parentingTime}
                              setParentingTime={setParentingTime}
                            />
                          </div>
                        )}

                        {currentFields.map((field: WorksheetField) => {
                          const isCalculated = ["1g","2j","3","4","6"].includes(field.id);
                          const values = isCalculated
                            ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                            : (formData[field.id] || { p1: "", p2: "" });
                          return (
                            <div
                              key={field.id}
                              className={isCalculated ? "pointer-events-none select-none bg-[var(--color-bg-subtle)] p-6 rounded-2xl border border-[var(--color-bg-border)]" : ""}
                            >
                              <InputField
                                field={field}
                                values={values as ParentValue}
                                onChange={(parent, val) => handleInputChange(field.id, parent, val)}
                              />
                              {isCalculated && (
                                <div className="flex items-center gap-2 text-[12px] font-bold font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mt-6 bg-white w-fit px-3 py-1 rounded-full border border-[var(--color-brand-primary-mid)]">
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <Calculator className="w-3 h-3" />
                                  </motion.div>
                                  Auto-Calculating…
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-[var(--color-bg-border-soft)] relative z-10">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`btn-secondary !rounded-full !px-8 h-14 ${
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
                      className="btn-primary !rounded-full !px-10 h-14 shadow-[var(--shadow-card-hover)] shadow-[var(--color-brand-primary)]/20"
                    >
                      {currentStep === PARTS.length - 1 ? "Generate Summary" : "Save & Continue"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
                    <span className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">AOC-Certified Worksheet v2026.01</span>
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
          className="lg:hidden fixed bottom-0 left-0 right-0 px-6 pt-4 bg-white/95 backdrop-blur-2xl border-t border-[var(--color-bg-border)] z-50 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <div>
            <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Est. Support</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {curFormatter.format(calculation.baseSupport)}
            </p>
          </div>
          <button
            onClick={nextStep}
            className="btn-primary !rounded-full !px-8 h-12 shadow-[var(--shadow-card-md)] shadow-[var(--color-brand-primary)]/20"
          >
            {currentStep === PARTS.length - 1 ? "Get Summary" : "Next Step"}
          </button>
        </div>
      )}
    </div>
  );
}

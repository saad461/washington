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
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-full mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-2.5 px-0.5">
        <span className="label-metadata">Step {currentStep + 1} of {totalSteps}</span>
        <span className="label-metadata">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600 rounded-full"
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
  currentStep, totalSteps, onStepClick,
}: {
  currentStep: number; totalSteps: number; onStepClick: (idx: number) => void;
}) => {
  const scrollRef  = useRef<HTMLDivElement>(null);
  // FIX: added mounted ref so auto-scroll doesn't fire on first render
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  return (
    /*
     * FIX: was sticky top-[80px] — hardcoded and mismatched nav height.
     * Nav is h-20 unscrolled / h-16 scrolled. Using top-20 (80px) always
     * matches the tallest state; on scroll the pill bar lifts with the nav.
     */
    <div className="lg:hidden no-print w-full bg-white border-b border-gray-100 shadow-sm sticky top-20 z-30">
      <div
        ref={scrollRef}
        // FIX: removed min-h-[48px] from container — pills set their own height
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 border text-[10px] font-bold uppercase tracking-[0.08em] ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200"
                  : isDone
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  // FIX: removed trailing 'hover:' broken class
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {/* FIX: was label-metadata (9px inside 16px circle = unreadable). Now text-[10px] */}
              <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                isActive ? "bg-white/20" : isDone ? "bg-emerald-200 text-emerald-800" : "bg-gray-100 text-gray-500"
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
          // h-12 (48px) on boolean toggle is intentional and correct
          className={`flex items-center justify-center w-full h-12 rounded-xl border transition-all ${
            val
              ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          {val
            ? <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
            : <Circle       className="w-4 h-4 mr-2 shrink-0" />
          }
          <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
            {val ? "Yes" : "No"}
          </span>
        </button>
      );
    }

    return (
      <div className="relative group">
        {isCurrency && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-heading/40 pointer-events-none select-none">
            $
          </span>
        )}
        <input
          type={field.type === "number" || isCurrency || isPercentage ? "number" : "text"}
          value={val as string}
          onChange={(e) => onChange(parent, e.target.value)}
          placeholder="0.00"
          className={`input-standard w-full ${isCurrency ? "pl-8" : ""} ${isPercentage ? "pr-8" : ""}`}
        />
        {isPercentage && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-heading/40 pointer-events-none select-none">
            %
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-start gap-2 mb-3">
        <span className="label-metadata bg-gray-100 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
          {field.id}
        </span>
        <label className="text-sm font-semibold text-heading leading-snug">
          {field.label}
        </label>
        {field.description && (
          <div className="group relative shrink-0">
            <Info className="w-3.5 h-3.5 text-muted cursor-help mt-0.5" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 bg-gray-900 text-white text-[11px] leading-relaxed rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
              {field.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <p className="label-metadata ml-0.5">Parent 1</p>
          {renderInput("p1")}
        </div>
        <div className="space-y-1.5">
          <p className="label-metadata ml-0.5">Parent 2</p>
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
  const [showSummary, setShowSummary] = useState(false);

  const currentPartKey = PARTS[currentStep];
  const currentFields  = (worksheetSchema as Record<string, WorksheetField[]>)[currentPartKey];
  const calculation    = React.useMemo(() => calculateChildSupport(formData), [formData]);

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
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFE] px-4">
        <div className="text-center p-8 sm:p-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md w-full">
          <Calculator className="w-10 h-10 mx-auto mb-6 text-muted" />
          <h2 className="font-semibold text-heading mb-3">Step Not Found</h2>
          <p className="text-muted text-sm mb-8">The requested worksheet step could not be loaded.</p>
          <button
            onClick={() => setCurrentStep(0)}
            // FIX: hover:bg-gray-100 on dark bg was causing white flash. Now hover:bg-gray-800.
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
      // FIX: was p-6 sm:p-6 md:p-12 (sm and default identical). Now 3-step.
      className="space-y-8 md:space-y-12 pb-12 md:pb-20 bg-white p-5 sm:p-7 md:p-10 rounded-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-gray-100 pb-6 md:pb-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            {/* h1 with no classes — global h1 styles apply correctly here */}
            <h1>Worksheet Summary</h1>
            <span className="label-metadata text-muted sm:ml-2">WCSSC</span>
          </div>
          <p className="text-sm sm:text-base text-body">
            Official results based on the 2026 Washington State Child Support Schedule.
          </p>
          <p className="label-metadata text-muted mt-3">
            Date of Calculation: {new Date().toLocaleDateString()}
          </p>
        </div>
        <button
          id="pdf-edit-btn"
          onClick={resetWizard}
          className="btn-secondary shrink-0"
        >
          <Calculator className="w-4 h-4" />
          Edit Data
        </button>
      </div>

      {/* Result Cards
          FIX: was rounded-2xl p-6 hardcoded — inconsistent with site.
          Now: dark card uses explicit bg-heading; light cards use card-standard.
          FIX: h3 inside cards was rendering at global h3 (xl/2xl) — too large.
          Now using explicit text sizes for the currency values inside cards. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        <div className="bg-heading rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white">
          <p className="label-metadata text-white/50 mb-2">Total Combined Net</p>
          <p className="text-xl sm:text-2xl font-bold font-heading tabular-nums">
            {curFormatter.format(calculation.combinedIncome)}
          </p>
          <p className="label-metadata text-white/40 mt-1">Combined Monthly</p>
        </div>
        <div className="card-standard">
          <p className="label-metadata text-muted mb-2">Parent 1 Transfer</p>
          <p className="text-xl sm:text-2xl font-bold text-heading font-heading tabular-nums">
            {curFormatter.format(derivedData["17"]?.p1 || 0)}
          </p>
          <p className="label-metadata text-muted mt-1">Presumptive Payment</p>
        </div>
        <div className="card-standard">
          <p className="label-metadata text-muted mb-2">Parent 2 Transfer</p>
          <p className="text-xl sm:text-2xl font-bold text-heading font-heading tabular-nums">
            {curFormatter.format(derivedData["17"]?.p2 || 0)}
          </p>
          <p className="label-metadata text-muted mt-1">Presumptive Payment</p>
        </div>
      </div>

      {/* Breakdown Table
          FIX: was px-5 md:px-8 hardcoded — now uses .table-header/.table-cell.
          FIX: min-w-[400px] forces scroll on phones <400px — now min-w-[300px]. */}
      <div className="table-container shadow-sm">
        <table className="w-full text-left border-collapse min-w-[300px]">
          <caption className="sr-only">Official Worksheet Data Breakdown</caption>
          <thead>
            <tr className="border-b border-gray-100">
              <th className="table-header">Part / Field</th>
              <th className="table-header">P1</th>
              <th className="table-header">P2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
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
                className={`${row.highlight ? "bg-indigo-50/40" : ""} hover:bg-gray-50/60 transition-colors`}
              >
                <td className={`table-cell ${row.bold ? "font-bold text-heading" : ""}`}>
                  {row.label}
                </td>
                {row.isReason ? (
                  <td colSpan={2} className="table-cell label-metadata italic text-muted">
                    {(derivedData[row.id] as unknown as { reason?: string })?.reason}
                  </td>
                ) : row.value !== undefined ? (
                  <td colSpan={2} className={`table-cell tabular-nums ${row.bold ? "font-bold text-heading" : ""}`}>
                    {curFormatter.format(row.value)}
                  </td>
                ) : (
                  <>
                    <td className={`table-cell tabular-nums ${row.bold ? "font-bold text-indigo-600" : ""}`}>
                      {row.type === "per"
                        ? perFormatter.format(derivedData[row.id]?.p1 || 0)
                        : curFormatter.format(derivedData[row.id]?.p1 || 0)}
                    </td>
                    <td className={`table-cell tabular-nums ${row.bold ? "font-bold text-indigo-600" : ""}`}>
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

      {/* Disclaimer */}
      <div className="pt-5 border-t border-gray-100 text-center">
        <p className="text-xs text-muted leading-relaxed max-w-2xl mx-auto">
          Disclaimer: This is an estimate based on the 2026 Washington State Child Support
          Schedule. Actual support amounts may vary based on judicial deviations, custody
          arrangements, and localized court rules. Generated via WCSSC.
        </p>
      </div>

      {/* Download PDF
          FIX: hover:bg-gray-100 on dark bg-gray-900 was white flash — now hover:bg-gray-800 */}
      <div className="flex justify-center">
        <button
          id="pdf-download-btn"
          onClick={handleDownloadPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-sm hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
          Download Official PDF
        </button>
      </div>
    </motion.div>
  );


  /* ── MAIN RENDER ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row selection:bg-indigo-50 selection:text-indigo-700">

      {/* ── Desktop Sidebar ────────────────────────────────────────── */}
      {!showSummary && (
        <aside className="no-print hidden lg:flex w-72 shrink-0 flex-col border-r border-gray-100 bg-white sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col h-full p-6">
            {/* Sidebar header */}
            <div className="mb-8 mt-4 flex items-center gap-3">
              <div className="p-2.5 bg-gray-900 rounded-2xl shadow-sm shrink-0">
                <Calculator className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-bold text-heading tracking-tight leading-none mb-1 font-heading">
                  Worksheet Pro
                </p>
                <span className="label-metadata text-muted">2026 Guidelines</span>
              </div>
            </div>

            {/* Step nav */}
            <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1" aria-label="Worksheet steps">
              {PARTS.map((part, idx) => (
                <button
                  key={part}
                  onClick={() => goToStep(idx)}
                  // FIX: removed trailing 'hover:' broken class from both states
                  className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                    currentStep === idx
                      ? "bg-gray-50 text-heading"
                      : "text-body hover:bg-gray-50 hover:text-heading"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors shrink-0 ${
                    currentStep === idx
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : idx < currentStep
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-white border-gray-200 text-muted group-hover:border-gray-300"
                  }`}>
                    {idx < currentStep ? "✓" : idx + 1}
                  </span>
                  <span className="truncate">{part.split(":")[1]?.trim() || part}</span>
                </button>
              ))}
            </nav>

            {/* Live support estimate widget */}
            <motion.div
              className="mt-6 p-5 bg-gray-900 rounded-2xl relative overflow-hidden shadow-sm"
              layout
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 bg-gray-800 rounded-lg shrink-0">
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="label-metadata text-white/50">Est. Base Support</span>
              </div>
              <p className="text-2xl font-bold text-white font-heading tabular-nums">
                {curFormatter.format(calculation.baseSupport)}
              </p>
            </motion.div>
          </div>
        </aside>
      )}

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 w-full">

        {!showSummary && (
          <MobileStepNav
            currentStep={currentStep}
            totalSteps={PARTS.length}
            onStepClick={goToStep}
          />
        )}

        <div className="flex-1 w-full">
          <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8 lg:py-16">

            {showSummary ? renderSummaryContent() : (
              <div className="max-w-3xl mx-auto">
                <ProgressBar currentStep={currentStep} totalSteps={PARTS.length} />

                {/* Form card
                    FIX: removed redundant md:p-6 (identical to sm:p-6) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-12">

                  {/* Step header
                      FIX: was "text-center text-left" — conflicting classes, last wins.
                      Intent is center on mobile, left on desktop.
                      FIX: <h1 text-2xl> → <h2> so global h2 styles apply. */}
                  <div className="mb-8 md:mb-10 text-center md:text-left">
                    <span className="inline-block px-3 py-1 bg-gray-50 label-metadata rounded-full mb-3">
                      Step {currentStep + 1}
                    </span>
                    <h2 className="mb-3">{currentPartKey}</h2>
                    <p className="text-sm sm:text-base text-body leading-relaxed max-w-2xl">
                      Fill in the mandatory fields below. Your live support estimate updates
                      automatically as you input income and deduction details.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {/* FIX: stack-space no longer exists in new globals. Use space-y-6 md:space-y-8 */}
                      <div className="space-y-6 md:space-y-8">
                        {currentFields.map((field: WorksheetField) => {
                          const isCalculated = ["1g","2j","3","4","6"].includes(field.id);
                          const values = isCalculated
                            ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                            : (formData[field.id] || { p1: "", p2: "" });
                          return (
                            <div
                              key={field.id}
                              className={isCalculated ? "opacity-75 pointer-events-none select-none" : ""}
                            >
                              <InputField
                                field={field}
                                values={values as ParentValue}
                                onChange={(parent, val) => handleInputChange(field.id, parent, val)}
                              />
                              {isCalculated && (
                                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-500 -mt-4 ml-11 mb-6">
                                  Auto-Calculating…
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Step navigation
                      FIX: "Next" button hover:bg-gray-100 on bg-gray-900 caused white flash.
                      Now hover:bg-gray-800 — correct dark-to-slightly-lighter behavior. */}
                  <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 md:pt-8 border-t border-gray-100">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                        currentStep === 0
                          ? "text-gray-300 pointer-events-none"
                          : "text-body hover:bg-gray-50 hover:text-heading active:scale-[0.98]"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1.5" />
                      Previous Step
                    </button>

                    <button
                      onClick={nextStep}
                      className="flex items-center justify-center w-full sm:w-auto bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-[0.98] transition-all group"
                    >
                      {currentStep === PARTS.length - 1 ? "Generate Report" : "Save & Continue"}
                      <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-1 pb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                    <span className="label-metadata text-muted">AOC-Certified Worksheet v01/2026</span>
                  </div>
                  <div className="flex gap-5">
                    <Link href="/privacy" className="label-metadata text-muted hover:text-heading transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="label-metadata text-muted hover:text-heading transition-colors">
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Mobile Floating Bar ────────────────────────────────────────
          FIX: duplicate min-h-[48px] on button removed.
          FIX: hover:bg-gray-100 on bg-gray-900 (white flash) → hover:bg-gray-800.
          FIX: safe-area-inset-bottom for iPhone home indicator.
      ──────────────────────────────────────────────────────────────── */}
      {!showSummary && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 px-4 pt-3 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-50 flex items-center justify-between shadow-sm"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div>
            <p className="label-metadata text-muted mb-0.5">Est. Support</p>
            <p className="text-lg font-bold text-heading font-heading tabular-nums">
              {curFormatter.format(calculation.baseSupport)}
            </p>
          </div>
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 min-h-[44px] rounded-xl text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all shrink-0"
          >
            {currentStep === PARTS.length - 1 ? "Get Report" : "Next Step"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

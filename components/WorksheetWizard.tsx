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
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = Object.keys(worksheetSchema).length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-overline">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-overline">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-surface-subtle rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MOBILE STEP NAV
───────────────────────────────────────────── */
const MobileStepNav = ({
  currentStep, onStepClick,
}: {
  currentStep: number; onStepClick: (idx: number) => void;
}) => {
  const scrollRef  = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentStep]);

  return (
    <div className="lg:hidden no-print w-full bg-white border-b border-border-default sticky top-[60px] z-30">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 border text-[10px] font-bold uppercase tracking-widest ${
                isActive
                  ? "bg-brand text-white border-brand"
                  : isDone
                  ? "bg-success-light text-success border-success"
                  : "bg-white border-border-default text-text-muted"
              }`}
            >
              {label}
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
  const renderInput = (parent: "p1" | "p2") => {
    const val = values[parent];
    const inputId = `field-${field.id}-${parent}`;

    if (field.type === "boolean") {
      return (
        <button
          id={inputId}
          type="button"
          onClick={() => onChange(parent, !val)}
          className={`btn btn-md w-full ${val ? "btn-primary" : "btn-secondary"}`}
        >
          {val ? "Yes" : "No"}
        </button>
      );
    }

    return (
      <div className="relative">
        {field.type === "currency" && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 font-bold">$</span>
        )}
        <input
          id={inputId}
          type={field.type === "number" || field.type === "currency" || field.type === "percentage" ? "number" : "text"}
          value={val as string}
          onChange={(e) => onChange(parent, e.target.value)}
          placeholder="0.00"
          className={`input ${field.type === "currency" ? "pl-8" : ""}`}
        />
      </div>
    );
  };

  return (
    <div className="wizard-row">
      <div className="wizard-row-label">
        <span className="wizard-row-number">{field.id}</span>
        <div>
           <span className="wizard-row-name">{field.label}</span>
           {field.description && <p className="text-xs text-text-muted mt-1">{field.description}</p>}
        </div>
      </div>
      <div className="input-row-2">
        <div className="field">
          <label htmlFor={`field-${field.id}-p1`}>Parent 1</label>
          {renderInput("p1")}
        </div>
        <div className="field">
          <label htmlFor={`field-${field.id}-p2`}>Parent 2</label>
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
    try {
      const canvas  = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf     = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w       = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, w, (canvas.height * w) / canvas.width);
      pdf.save(`WCSSC_Worksheet_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  if (showSummary) {
    return (
      <div className="section">
        <div className="container">
          <div id="pdf-summary-content" className="card card-elevated p-8 md:p-12 space-y-12">
            <div className="flex justify-between items-start border-b border-border-default pb-8">
              <div>
                <h1 className="text-h1 mb-2">Worksheet Summary</h1>
                <p className="text-body">Official estimates for Washington State 2026.</p>
              </div>
              <button onClick={resetWizard} className="btn btn-secondary btn-sm">Edit Data</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="calc-result">
                  <p className="calc-result-label">Combined Net</p>
                  <p className="text-h2 !text-white">{curFormatter.format(calculation.combinedIncome)}</p>
               </div>
               <div className="card">
                  <p className="label text-text-muted">P1 Transfer</p>
                  <p className="text-h3">{curFormatter.format(derivedData["17"]?.p1 || 0)}</p>
               </div>
               <div className="card">
                  <p className="label text-text-muted">P2 Transfer</p>
                  <p className="text-h3">{curFormatter.format(derivedData["17"]?.p2 || 0)}</p>
               </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Line Item</th>
                    <th>Parent 1</th>
                    <th>Parent 2</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Total Gross Income (1g)",   id: "1g" },
                    { label: "Net Income (3)",             id: "3" },
                    { label: "Proportional Share (6)",     id: "6", type: "per" },
                    { label: "Transfer Amount (17)",       id: "17", bold: true },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td className={row.bold ? "font-bold" : ""}>{row.label}</td>
                      <td className="cell-numeric">{row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p1) : curFormatter.format(derivedData[row.id]?.p1)}</td>
                      <td className="cell-numeric">{row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p2) : curFormatter.format(derivedData[row.id]?.p2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center pt-8 border-t border-border-default">
               <button onClick={handleDownloadPDF} className="btn btn-primary btn-lg">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-white">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-border-default bg-surface-subtle sticky top-[60px] h-[calc(100vh-60px)] p-6">
        <div className="mb-8 flex items-center gap-3">
          <Calculator className="w-6 h-6 text-brand" />
          <span className="text-h4">Worksheet Pro</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
          {PARTS.map((part, idx) => (
            <button
              key={part}
              onClick={() => goToStep(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all border border-transparent ${
                currentStep === idx
                  ? "bg-white shadow-sm text-brand border-border-default"
                  : "text-text-muted hover:bg-white/50"
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Step {idx + 1}</div>
              <div className="truncate">{part.split(":")[1]?.trim() || part}</div>
            </button>
          ))}
        </nav>

        {/* Desktop Sticky Result in Sidebar */}
        <div className="mt-8 pt-8 border-t border-border-default">
           <div className="card-brand !p-4 rounded-xl shadow-sm">
              <p className="text-[10px] uppercase font-bold text-brand mb-2 tracking-widest">Base Support</p>
              <div className="text-numeric text-2xl font-bold text-text-primary">
                {curFormatter.format(calculation.baseSupport)}
              </div>
              <p className="text-[10px] text-text-muted mt-1">Presumptive Estimate</p>
           </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <MobileStepNav currentStep={currentStep} onStepClick={goToStep} />

        <div className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <ProgressBar currentStep={currentStep} />

              <div className="card card-elevated !p-6 md:!p-10">
                <div className="mb-10">
                  <span className="badge badge-brand mb-4">Step {currentStep + 1}</span>
                  <h2 className="text-h2">{currentPartKey}</h2>
                </div>

                <div className="space-y-4">
                  {currentFields.map((field) => {
                    const isCalculated = ["1g","2j","3","4","6"].includes(field.id);
                    const values = isCalculated
                      ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                      : (formData[field.id] || { p1: "", p2: "" });
                    return (
                      <div key={field.id} className={isCalculated ? "wizard-row-auto" : ""}>
                         <InputField
                           field={field}
                           values={values as ParentValue}
                           onChange={(parent, val) => handleInputChange(field.id, parent, val)}
                         />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 flex justify-between pt-8 border-t border-border-default">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="btn btn-secondary btn-md"
                  >
                    Previous
                  </button>
                  <button onClick={nextStep} className="btn btn-primary btn-md">
                    {currentStep === PARTS.length - 1 ? "Review" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bar (Relocated to top) */}
      <AnimatePresence>
        {!showSummary && (
          <motion.div
            initial={{ y: -100 }} animate={{ y: 60 }} exit={{ y: -100 }}
            className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-bg-inverse text-text-inverse px-4 border-b border-white/10 flex justify-between items-center shadow-xl"
          >
             <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase font-bold text-white/40">Base</span>
                <span className="text-numeric text-xl">{curFormatter.format(calculation.baseSupport)}</span>
             </div>
             <button onClick={nextStep} className="btn btn-primary !h-8 !px-3 !text-xs">
                {currentStep === PARTS.length - 1 ? "Review" : "Continue"} <ChevronRight size={14} className="ml-1" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

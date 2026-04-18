"use client";
// SEO note: Metadata for this page is declared in app/worksheet/metadata.ts (server layer)

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Calculator,
  Info,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import worksheetSchema from '@/data/wa_csw_2026_schema.json';
import { calculateChildSupport } from '@/utils/calculatorEngine';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type FieldValue = string | number | boolean;
type ParentValue = { p1: FieldValue; p2: FieldValue };
type FormData = Record<string, ParentValue>;

interface WorksheetField {
  id: string;
  label: string;
  type: 'currency' | 'percentage' | 'number' | 'text' | 'boolean' | 'per';
  description?: string;
  tooltip?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  group?: string;
  options?: { label: string; value: string }[];
}

const PARTS = Object.keys(worksheetSchema);

// --- Progress Bar ---
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-sans">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-sans">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
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

// --- Mobile Step Pills (replaces slide-in sidebar on mobile) ---
const MobileStepNav = ({
  currentStep,
  totalSteps,
  onStepClick,
}: {
  currentStep: number;
  totalSteps: number;
  onStepClick: (idx: number) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active pill into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector(`[data-active="true"]`) as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentStep]);

  return (
    <div className="lg:hidden no-print w-full bg-white border-b border-gray-100 shadow-sm sticky top-[80px] z-30">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PARTS.map((part, idx) => {
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;
          const label = part.split(':')[1]?.trim() || part;
          return (
            <button
              key={idx}
              data-active={isActive ? "true" : "false"}
              onClick={() => onStepClick(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold ${
                isActive ? 'bg-white/20' : isDone ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100'
              }`}>
                {isDone ? '✓' : idx + 1}
              </span>
              <span className="max-w-[80px] truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Input Field ---
const InputField = ({
  field,
  values,
  onChange
}: {
  field: WorksheetField;
  values: ParentValue;
  onChange: (parent: 'p1' | 'p2', val: FieldValue) => void
}) => {
  const isCurrency = field.type === 'currency';
  const isPercentage = field.type === 'percentage';
  const isBoolean = field.type === 'boolean';

  const renderInput = (parent: 'p1' | 'p2') => {
    const val = values[parent];

    if (isBoolean) {
      return (
        <button
          type="button"
          onClick={() => onChange(parent, !val)}
          className={`flex items-center justify-center w-full h-12 rounded-xl border transition-all ${val
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
            }`}
        >
          {val ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2" />}
          <span className="text-[10px] font-bold uppercase tracking-widest">{val ? 'Yes' : 'No'}</span>
        </button>
      );
    }

    return (
      <div className="relative group">
        {isCurrency && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium group-focus-within:text-indigo-600 transition-colors">
            $
          </span>
        )}
        <input
          type={field.type === 'number' || isCurrency || isPercentage ? 'number' : 'text'}
          value={val as string}
          onChange={(e) => onChange(parent, e.target.value)}
          placeholder="0.00"
          className={`w-full h-12 rounded-xl border border-gray-200 bg-white px-4 transition-all focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 focus:outline-none text-gray-900 font-medium ${isCurrency ? 'pl-8' : ''} ${isPercentage ? 'pr-8' : ''}`}
        />
        {isPercentage && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium group-focus-within:text-indigo-600 transition-colors">
            %
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500 font-sans">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">{field.id}</span>
        <label className="text-sm font-bold text-gray-900 leading-snug">
          {field.label}
        </label>
        {field.description && (
          <div className="group relative">
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
              {field.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Parent 1</p>
          {renderInput('p1')}
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Parent 2</p>
          {renderInput('p2')}
        </div>
      </div>
    </div>
  );
};

export default function WorksheetWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [showSummary, setShowSummary] = useState(false);

  const currentPartKey = PARTS[currentStep];
  const currentFields = (worksheetSchema as Record<string, WorksheetField[]>)[currentPartKey];

  const calculation = React.useMemo(() => calculateChildSupport(formData), [formData]);

  const derivedData: Record<string, { p1: number; p2: number }> = React.useMemo(() => {
    return {
      '1g': { p1: calculation.grossP1, p2: calculation.grossP2 },
      '2j': { p1: calculation.deductionsP1, p2: calculation.deductionsP2 },
      '3': { p1: calculation.netP1, p2: calculation.netP2 },
      '4': { p1: calculation.combinedIncome, p2: calculation.combinedIncome },
      '6': { p1: calculation.shareP1, p2: calculation.shareP2 },
      '7': { p1: calculation.obligationP1, p2: calculation.obligationP2 },
      '8_reason': { p1: 0, p2: 0, reason: calculation.adjustmentReason } as never,
      '9': { p1: calculation.obligationP1, p2: calculation.obligationP2 },
      '14': { p1: 0, p2: 0 },
      '16d': { p1: 0, p2: 0 },
      '17': { p1: calculation.obligationP1, p2: calculation.obligationP2 },
    };
  }, [calculation]);

  if (!currentFields || !Array.isArray(currentFields)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFE]">
        <div className="text-center p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl max-w-md">
          <Calculator className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step Not Found</h2>
          <p className="text-gray-500 font-medium mb-8">The requested worksheet step could not be loaded.</p>
          <button onClick={() => setCurrentStep(0)} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors">
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, parent: 'p1' | 'p2', value: FieldValue) => {
    const calculatedIds = ['1g', '2j', '3', '4', '5', '6', '7', '9', '10c', '10d', '11e', '12', '13', '14', '15', '16d', '17'];
    if (calculatedIds.includes(fieldId)) return;
    setFormData(prev => ({
      ...prev,
      [fieldId]: {
        ...(prev[fieldId] || { p1: '', p2: '' }),
        [parent]: value
      }
    }));
  };

  const goToStep = (idx: number) => {
    setCurrentStep(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep === PARTS.length - 1) {
      setShowSummary(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const resetWizard = () => {
    setShowSummary(false);
    setCurrentStep(0);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-summary-content');
    if (!element) return;
    const printBtn = document.getElementById('pdf-download-btn');
    const editBtn = document.getElementById('pdf-edit-btn');
    if (printBtn) printBtn.style.display = 'none';
    if (editBtn) editBtn.style.display = 'none';
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`WCSSC_Worksheet_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('There was an issue generating the PDF. Please try printing the page directly.');
    } finally {
      if (printBtn) printBtn.style.display = 'flex';
      if (editBtn) editBtn.style.display = 'flex';
    }
  };

  const renderSummaryContent = () => {
    const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const perFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 });

    return (
      <motion.div
        id="pdf-summary-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10 md:space-y-12 pb-12 md:pb-24 bg-white p-6 sm:p-8 md:p-12 rounded-2xl"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-100 pb-8 md:pb-10">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-heading">Worksheet Summary</h1>
              <span className="text-indigo-600 font-bold text-lg md:text-xl tracking-widest uppercase font-heading">WCSSC</span>
            </div>
            <p className="text-gray-500 font-medium">Official calculation results based on the 2026 Washington State Child Support Schedule.</p>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-4">Date of Calculation: {new Date().toLocaleDateString()}</p>
          </div>
          <button
            id="pdf-edit-btn"
            onClick={resetWizard}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm shrink-0 text-sm"
          >
            <Calculator className="w-4 h-4" />
            Edit Data
          </button>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Combined Net</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-1 font-heading">{curFormatter.format(calculation.combinedIncome)}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Combined Monthly Income</p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-2">Parent 1 Transfer</p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-heading">{curFormatter.format(derivedData['17']?.p1 || 0)}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Presumptive Payment</p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-2">Parent 2 Transfer</p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-heading">{curFormatter.format(derivedData['17']?.p2 || 0)}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Presumptive Payment</p>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 md:px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">Part / Field</th>
                <th className="px-5 md:px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">P1</th>
                <th className="px-5 md:px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">P2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { label: 'Total Gross Income (1g)', id: '1g' },
                { label: 'Total Deductions (2j)', id: '2j' },
                { label: 'Monthly Net Income (3)', id: '3', highlight: true },
                { label: 'Proportional Share (6)', id: '6', type: 'per' },
                { label: 'Basic Support (Table)', id: 'base', value: calculation.baseSupport },
                { label: 'Adjustment Reason', id: '8_reason', isReason: true },
                { label: 'Final Basic Support (9)', id: '9', highlight: true },
                { label: 'Extra Expenses (14)', id: '14' },
                { label: 'Total Credits (16d)', id: '16d' },
                { label: 'Presumptive Transfer (17)', id: '17', highlight: true, bold: true },
              ].map((row) => (
                <tr key={row.id} className={`${row.highlight ? 'bg-indigo-50/30' : ''} transition-colors hover:bg-gray-50/50`}>
                  <td className={`px-5 md:px-8 py-4 text-sm ${row.bold ? 'font-bold text-gray-900 font-heading' : 'font-medium text-gray-600'}`}>
                    {row.label}
                  </td>
                  {row.isReason ? (
                    <td colSpan={2} className="px-5 md:px-8 py-4 text-xs font-bold text-indigo-600 italic">
                      {(derivedData[row.id] as unknown as { reason?: string })?.reason}
                    </td>
                  ) : row.value !== undefined ? (
                    <td colSpan={2} className="px-5 md:px-8 py-4 text-sm font-bold text-gray-900">
                      {curFormatter.format(row.value)}
                    </td>
                  ) : (
                    <>
                      <td className={`px-5 md:px-8 py-4 text-sm ${row.bold ? 'font-bold text-indigo-600' : 'font-medium text-gray-700'}`}>
                        {row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p1 || 0) : curFormatter.format(derivedData[row.id]?.p1 || 0)}
                      </td>
                      <td className={`px-5 md:px-8 py-4 text-sm ${row.bold ? 'font-bold text-indigo-600' : 'font-medium text-gray-700'}`}>
                        {row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p2 || 0) : curFormatter.format(derivedData[row.id]?.p2 || 0)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Disclaimer: This is an estimate based on the 2026 Washington State Child Support Schedule. Actual support amounts may vary based on judicial deviations, custody arrangements, and localized court rules. Generated via WCSSC.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            id="pdf-download-btn"
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 font-heading"
            onClick={handleDownloadPDF}
          >
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            Download Official PDF
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-indigo-50 selection:text-indigo-700">

      {/* ── Desktop Sidebar Navigation ── */}
      {!showSummary && (
        <aside className="no-print hidden lg:flex w-72 shrink-0 flex-col border-r border-gray-100 bg-white sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col h-full p-6">
            <div className="mb-10 mt-4 flex items-center gap-3">
              <div className="p-2.5 bg-gray-900 rounded-xl shadow-md">
                <Calculator className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight leading-none mb-1 font-heading">Worksheet Pro</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2026 Guidelines</span>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
              {PARTS.map((part, idx) => (
                <button
                  key={part}
                  onClick={() => goToStep(idx)}
                  className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-semibold text-sm ${currentStep === idx
                    ? 'bg-gray-50 text-gray-900'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    currentStep === idx
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : idx < currentStep
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-300'
                    }`}>
                    {idx < currentStep ? '✓' : idx + 1}
                  </div>
                  <span className="truncate">{part.split(':')[1] || part}</span>
                </button>
              ))}
            </nav>

            <motion.div
              className="mt-8 p-5 md:p-6 bg-gray-900 rounded-2xl relative overflow-hidden shadow-md"
              layout
            >
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-1.5 bg-gray-800 rounded-lg">
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Base Support</span>
              </div>
              <p className="text-2xl font-bold text-white leading-tight relative z-10 font-heading">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation.baseSupport)}
              </p>
            </motion.div>
          </div>
        </aside>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 w-full">

        {/* Mobile Step Pills (replaces slide-in sidebar) */}
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
              <div className="max-w-4xl mx-auto">
                <ProgressBar currentStep={currentStep} totalSteps={PARTS.length} />

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 md:p-10 lg:p-12">
                  <div className="mb-8 md:mb-12 text-center sm:text-left">
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 md:mb-4">
                      Requirement Step {currentStep + 1}
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3 md:mb-4 font-heading">
                      {currentPartKey}
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                      Fill in the mandatory fields below. Your live support estimate updates automatically as you input parent income and deduction details.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.99, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.99, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="space-y-4">
                        {currentFields.map((field: WorksheetField) => {
                          const isCalculated = ['1g', '2j', '3', '4', '6'].includes(field.id);
                          const values = isCalculated
                            ? { p1: derivedData[field.id]?.p1 ?? 0, p2: derivedData[field.id]?.p2 ?? 0 }
                            : (formData[field.id] || { p1: '', p2: '' });
                          return (
                            <div key={field.id} className={isCalculated ? "opacity-90 pointer-events-none select-none grayscale-[0.2]" : ""}>
                              <InputField
                                field={field}
                                values={values as ParentValue}
                                onChange={(parent, val) => handleInputChange(field.id, parent, val)}
                              />
                              {isCalculated && (
                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest -mt-6 ml-11 mb-8 animate-pulse">
                                  Auto-Calculating...
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Step Navigation Buttons */}
                  <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 md:pt-10 border-t border-gray-50">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm transition-all ${currentStep === 0
                        ? 'text-gray-200 pointer-events-none'
                        : 'text-gray-400 hover:bg-gray-50 active:scale-[0.98]'
                        }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous Step
                    </button>

                    <button
                      onClick={nextStep}
                      className="flex items-center justify-center w-full sm:w-auto bg-gray-900 text-white px-8 md:px-10 py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-[0.98] group font-heading"
                    >
                      {currentStep === PARTS.length - 1 ? 'Generate Report' : 'Save & Continue'}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!showSummary && (
              <div className="max-w-4xl mx-auto mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 px-4 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">AOC-Certified Worksheet v01/2026</span>
                </div>
                <div className="flex gap-4">
                  <Link href="/privacy" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Terms of Service</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Floating Summary Bar (Mobile Only) ── */}
      {!showSummary && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-50 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Est. Support</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-600 font-heading">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation.baseSupport)}
            </p>
          </div>
          <button
            onClick={() => nextStep()}
            className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs flex items-center shadow-md font-heading gap-2 min-h-[44px]"
          >
            {currentStep === PARTS.length - 1 ? 'Get Report' : 'Next Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

"use client";
// SEO note: Metadata for this page is declared in app/worksheet/metadata.ts (server layer)
// The useEffect title override below is superseded by the server metadata export

import React, { useState } from 'react';
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
  Menu,
  X,
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

// --- Components ---

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

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
          className={`flex items-center justify-center w-full h-12 rounded-xl border-2 transition-all ${val
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
            }`}
        >
          {val ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2" />}
          <span className="text-sm font-semibold uppercase tracking-wider">{val ? 'Yes' : 'No'}</span>
        </button>
      );
    }

    return (
      <div className="relative group">
        {isCurrency && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-indigo-500 transition-colors">
            $
          </span>
        )}
        <input
          type={field.type === 'number' || isCurrency || isPercentage ? 'number' : 'text'}
          value={val as string}
          onChange={(e) => onChange(parent, e.target.value)}
          placeholder="0.00"
          className={`w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 px-4 transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none text-slate-900 font-medium ${isCurrency ? 'pl-8' : ''} ${isPercentage ? 'pr-8' : ''}`}
        />
        {isPercentage && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-indigo-500 transition-colors">
            %
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">{field.id}</span>
        <label className="text-sm font-bold text-slate-700 leading-tight">
          {field.label}
        </label>
        {field.description && (
          <div className="group relative">
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
              {field.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 opacity-60">Parent 1</p>
          {renderInput('p1')}
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 opacity-60">Parent 2</p>
          {renderInput('p2')}
        </div>
      </div>
    </div>
  );
};

export default function WorksheetWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // SEO title is set server-side via app/worksheet/metadata.ts
  // No useEffect title override needed

  const currentPartKey = PARTS[currentStep];
  const currentFields = (worksheetSchema as Record<string, WorksheetField[]>)[currentPartKey];

  // Use the central logic engine for real-time calculations
  const calculation = React.useMemo(() => calculateChildSupport(formData), [formData]);
  
  // Create derived mapping for UI display
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

  // Runtime guard: if schema key doesn't exist, show fallback
  if (!currentFields || !Array.isArray(currentFields)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFE]">
        <div className="text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl max-w-md">
          <Calculator className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-900 mb-4">Step Not Found</h2>
          <p className="text-slate-500 font-medium mb-8">The requested worksheet step could not be loaded.</p>
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

  const nextStep = () => {
    if (currentStep === PARTS.length - 1) {
      setShowSummary(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetWizard = () => {
    setShowSummary(false);
    setCurrentStep(0);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-summary-content');
    if (!element) return;

    // Temporarily hide UI elements not for print
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

  // Simplified summary helper
  const renderSummaryContent = () => {
    const curFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const perFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 });

    return (
      <motion.div
        id="pdf-summary-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 pb-24 bg-white p-8 rounded-3xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="text-center md:text-left w-full">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Worksheet Summary</h1>
              <span className="text-indigo-600 font-black text-xl tracking-widest uppercase">WCSSC.site</span>
            </div>
            <p className="text-slate-500 font-medium">Final calculated results for the 2026 Washington State Child Support Schedule.</p>
            <p className="text-slate-400 text-xs font-bold mt-2">Date of Calculation: {new Date().toLocaleDateString()}</p>
          </div>
          <button
            id="pdf-edit-btn"
            onClick={resetWizard}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm shrink-0"
          >
            <Calculator className="w-5 h-5" />
            Edit Data
          </button>
        </div>

        {/* High-Level Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-indigo-500/30 transition-colors" />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Combined Net</p>
            <h3 className="text-3xl font-black mb-1">{curFormatter.format(calculation.combinedIncome)}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Combined Monthly Income</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2">Parent 1 Transfer</p>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{curFormatter.format(derivedData['17']?.p1 || 0)}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Presumptive Payment</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2">Parent 2 Transfer</p>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{curFormatter.format(derivedData['17']?.p2 || 0)}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Presumptive Payment</p>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-900/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Part / Field</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent 1</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { label: 'Total Gross Income (1g)', id: '1g' },
                { label: 'Total Deductions (2j)', id: '2j' },
                { label: 'Monthly Net Income (3)', id: '3', highlight: true },
                { label: 'Proportional Share (6)', id: '6', type: 'per' },
                { label: 'Basic Support (Table)', id: 'base', value: calculation.baseSupport },
                { label: 'Adjustment Reason', id: '8_reason', isReason: true },
                { label: 'Final Basic Support (9)', id: '9', highlight: true },
                { label: 'Extra Expenses Obligation (14)', id: '14' },
                { label: 'Total Credits (16d)', id: '16d' },
                { label: 'Presumptive Transfer (17)', id: '17', highlight: true, bold: true },
              ].map((row) => (
                <tr key={row.id} className={`${row.highlight ? 'bg-indigo-50/30' : ''} transition-colors hover:bg-slate-50/50`}>
                  <td className={`px-8 py-5 text-sm ${row.bold ? 'font-black text-slate-900' : 'font-semibold text-slate-600'}`}>
                    {row.label}
                  </td>
                  {row.isReason ? (
                    <td colSpan={2} className="px-8 py-5 text-xs font-bold text-indigo-500 italic">
                      {(derivedData[row.id] as unknown as { reason?: string })?.reason}
                    </td>
                  ) : row.value !== undefined ? (
                    <td colSpan={2} className="px-8 py-5 text-sm font-bold text-slate-900">
                      {curFormatter.format(row.value)}
                    </td>
                  ) : (
                    <>
                      <td className={`px-8 py-5 text-sm ${row.bold ? 'font-black text-indigo-700' : 'font-medium text-slate-700'}`}>
                        {row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p1 || 0) : curFormatter.format(derivedData[row.id]?.p1 || 0)}
                      </td>
                      <td className={`px-8 py-5 text-sm ${row.bold ? 'font-black text-indigo-700' : 'font-medium text-slate-700'}`}>
                        {row.type === 'per' ? perFormatter.format(derivedData[row.id]?.p2 || 0) : curFormatter.format(derivedData[row.id]?.p2 || 0)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> This is an estimate based on the 2026 Washington State Child Support Schedule. Actual support amounts may vary based on judicial deviations, custody arrangements, and localized court rules. Consult with a legal professional for official filing and representation. Generated via WCSSC.site.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            id="pdf-download-btn"
            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            onClick={handleDownloadPDF}
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            Download Official PDF
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] flex font-sans selection:bg-indigo-100 selection:text-indigo-700">

      {/* Decorative background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-50/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-blue-50/40 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar Navigation (Desktop) */}
      {!showSummary && (
        <aside className={`no-print fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col p-6">
            <div className="mb-10 mt-4 flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">Worksheet Pro</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v2026 Guidelines</span>
              </div>
            </div>

            <nav className="flex-1 space-y-1">
              {PARTS.map((part, idx) => (
                <button
                  key={part}
                  onClick={() => {
                    setCurrentStep(idx);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 font-semibold text-sm ${currentStep === idx
                    ? 'bg-indigo-50/80 text-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.08)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${currentStep === idx ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'
                    }`}>
                    {idx + 1}
                  </div>
                  <span className="truncate">{part.split(':')[1] || part}</span>
                </button>
              ))}
            </nav>

            <motion.div
              className="mt-auto p-5 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden"
              layout
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl -translate-y-12 translate-x-12" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Estimate</span>
              </div>
              <p className="text-2xl font-black text-white leading-tight relative z-10">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation.baseSupport)}
              </p>
              <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mt-1 relative z-10">Total Basic Obligation</p>
            </motion.div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-y-auto h-screen pb-32 lg:pb-0">

        {/* Mobile Header (Only in Wizard Mode) */}
        {!showSummary && (
          <header className="no-print lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl">
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest truncate max-w-[200px]">
              {currentPartKey}
            </span>
            <div className="w-10" />
          </header>
        )}

        <div className="max-w-6xl mx-auto w-full py-8 px-4 sm:px-10 lg:py-16">

          {showSummary ? renderSummaryContent() : (
            <div className="max-w-4xl mx-auto">
              <ProgressBar currentStep={currentStep} totalSteps={PARTS.length} />

              {/* Form Card */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-900/5 p-6 sm:p-10 md:p-14">

                <div className="mb-12 text-center sm:text-left">
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                    Requirement Step {currentStep + 1}
                  </span>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
                    {currentPartKey}
                  </h1>
                  <p className="text-slate-500 text-base font-medium leading-relaxed max-w-2xl">
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
                              <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest -mt-5 ml-11 mb-8 animate-pulse">
                                Auto-Calculating...
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-14 flex items-center justify-between gap-4 pt-10 border-t border-slate-50">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center justify-center px-6 py-4 rounded-2xl font-bold text-sm transition-all ${currentStep === 0
                      ? 'text-slate-300 pointer-events-none'
                      : 'text-slate-500 hover:bg-slate-50 active:scale-95'
                      }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Return to Previous
                  </button>

                  <button
                    onClick={nextStep}
                    className="flex items-center justify-center bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 transition-all active:scale-95 group"
                  >
                    {currentStep === PARTS.length - 1 ? 'Generate Final Report' : 'Save & Continue'}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {!showSummary && (
            <div className="max-w-4xl mx-auto mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 pb-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AOC-Certified Worksheet v01/2026</span>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Summary Bar (Mobile Only) */}
      {!showSummary && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50 flex items-center justify-between animate-in slide-in-from-bottom duration-500 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Est. Basic Support</p>
            <p className="text-xl font-black text-indigo-700">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation.baseSupport)}
            </p>
          </div>
          <button
            onClick={() => nextStep()}
            disabled={currentStep === PARTS.length - 1}
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center shadow-lg shadow-indigo-200"
          >
            {currentStep === PARTS.length - 1 ? 'Go to Report' : 'Next Part'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}

    </div>
  );
}

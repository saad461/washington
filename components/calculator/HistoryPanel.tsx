"use client";

import React, { useState, useEffect } from "react";
import { History, Trash2, RotateCcw, ChevronDown, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavedCalculation {
  id: string;
  date: string;
  label: string;
  inputs: any;
  result: number;
}

interface HistoryPanelProps {
  storageKey: string;
  currentInputs: any;
  currentResult: number | null;
  onReload: (inputs: any) => void;
  formatResult: (val: number) => string;
}

export default function HistoryPanel({
  storageKey,
  currentInputs,
  currentResult,
  onReload,
  formatResult,
}: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<SavedCalculation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, [storageKey]);

  const saveCalculation = () => {
    if (currentResult === null) return;

    const newEntry: SavedCalculation = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      label: `Calculation ${history.length + 1}`,
      inputs: { ...currentInputs },
      result: currentResult,
    };

    const newHistory = [newEntry, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
  };

  const deleteEntry = (id: string) => {
    const newHistory = history.filter((h) => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="mt-8">
      {currentResult !== null && (
        <button
          onClick={saveCalculation}
          className="btn btn-secondary w-full mb-4 flex items-center justify-center gap-2"
        >
          <Save size={18} />
          Save This Calculation
        </button>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors py-2"
      >
        <History size={18} />
        Your Saved Calculations {isOpen ? "▲" : "▼"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-4 text-center border-2 border-dashed border-gray-100 rounded-xl">
                  No saved calculations yet
                </p>
              ) : (
                <>
                  {history.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{entry.date}</p>
                          <p className="font-bold text-gray-900">{formatResult(entry.result)} <span className="text-xs font-normal text-gray-500">transfer</span></p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onReload(entry.inputs)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Reload inputs"
                            aria-label="Reload these inputs"
                          >
                            <RotateCcw size={16} />
                          </button>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                            aria-label="Delete this saved calculation"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">
                        {Object.entries(entry.inputs)
                          .filter(([key]) => !key.includes("Type") && !key.includes("payingParent"))
                          .map(([key, val]) => `${key}: ${val}`)
                          .join(" | ")}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={clearAll}
                    className="w-full py-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

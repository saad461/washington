'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { GlossaryTerm } from '@/data/glossary';

interface GlossaryClientProps {
  terms: GlossaryTerm[];
}

export default function GlossaryClient({ terms }: GlossaryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  // Derive available letters from terms
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    terms.forEach((term) => {
      const firstLetter = term.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstLetter)) {
        letters.add(firstLetter);
      }
    });
    return ['All', ...Array.from(letters).sort()];
  }, [terms]);

  // Filtering logic
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLetter =
        selectedLetter === 'All' ||
        term.name.charAt(0).toUpperCase() === selectedLetter;

      if (searchQuery) return matchesSearch; // Search overrides letter filter
      return matchesLetter;
    });
  }, [terms, searchQuery, selectedLetter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val) {
      setSelectedLetter('All'); // Reset alphabet filter when searching
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative group max-w-3xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search glossary terms..."
          className="block w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg text-gray-900 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {availableLetters.map((letter) => (
          <button
            key={letter}
            onClick={() => {
              setSelectedLetter(letter);
              setSearchQuery(''); // Reset search when clicking a letter
            }}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              selectedLetter === letter
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Terms Grid or Empty State */}
      <div className="space-y-4 max-w-3xl mx-auto min-h-[400px]">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <article
              key={term.slug}
              className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-white"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {term.name}
                </h2>
                <span className="flex-shrink-0 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  {term.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {term.definition}
              </p>
              <Link
                href={`/glossary/${term.slug}`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {term.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-xl font-bold text-gray-900 mb-2">
              No terms found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-gray-500">
              Try browsing all terms below or use the alphabet filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

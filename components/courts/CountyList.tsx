"use client";

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { WashingtonCounty } from '@/data/washingtonCounties';

interface CountyListProps {
  counties: WashingtonCounty[];
}

export default function CountyList({ counties }: CountyListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCounties = counties.filter(
    county => county.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* ── SEARCH INPUT ────────────────────────────────────────────────── */}
      <div className="mb-8">
        <label htmlFor="county-search" className="sr-only">
          Search Washington counties
        </label>
        <div className="relative">
          <input
            id="county-search"
            type="text"
            placeholder="Search county name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
          />
          <Search
            className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── COURTS GRID ─────────────────────────────────────────────────── */}
      {filteredCounties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCounties.map(county => (
            <article
              key={county.slug}
              className="p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  className="w-4 h-4 text-blue-600"
                  aria-hidden="true"
                />
                <h2 className="font-bold text-gray-900 text-base">
                  {county.name} County
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-1">{county.courtAddress}</p>
              <p className="text-sm text-gray-500 mb-4">{county.clerkPhone}</p>
              <a
                href={county.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Court website →
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm py-8 text-center">
          No county found matching &quot;{searchQuery}&quot;.
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-600 hover:underline ml-1"
          >
            Clear search
          </button>
        </p>
      )}
    </div>
  );
}

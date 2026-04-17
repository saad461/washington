"use client";

import React, { useState } from 'react';
import { Search, MapPin, ChevronRight, Calculator } from 'lucide-react';
import { washingtonCounties } from '@/data/washingtonCounties';
import Link from 'next/link';

const SearchMock = ({ isSidebar = false }: { isSidebar?: boolean }) => {
  const [query, setQuery] = useState('');
  
  const filtered = washingtonCounties.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.seat.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className={`w-full ${isSidebar ? '' : 'max-w-xl mx-auto'} no-print`}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your WA county..."
          className={`w-full ${isSidebar ? 'py-4 px-14 text-sm' : 'py-6 px-16 text-lg'} bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl shadow-indigo-900/5 focus:border-indigo-600 focus:ring-0 transition-all outline-none font-medium placeholder:text-slate-300`}
        />
      </div>

      {query.length > 0 && (
        <div className="absolute z-50 mt-4 w-full bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-4 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((county) => (
                <Link
                  key={county.slug}
                  href={`/${county.slug}-income-5000-2-children`}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group"
                  onClick={() => setQuery('')}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{county.name}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{county.seat}, WA</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
              <div className="pt-4 px-4 border-t border-slate-50 mt-2 text-center">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Showing Top Results for {query}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Calculator className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-sm">No Washington county found matching &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMock;

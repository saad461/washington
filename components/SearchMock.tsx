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
 <Search className="h-5 w-5 text-text-muted" />
 </div>
 <input
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search your WA county..."
 className={`input ${isSidebar ? '!h-12 pl-14' : '!h-16 pl-16 text-h3'}`}
 />
 </div>

 {query.length > 0 && (
 <div className="absolute z-50 mt-4 w-full bg-white border border-border-default rounded-xl shadow-lg p-4 overflow-hidden animate-in fade-in slide-in-from-top-2">
 {filtered.length > 0 ? (
 <div className="space-y-1">
 {filtered.map((county) => (
 <Link
 key={county.slug}
 href={`/${county.slug}-income-5000-2-children`}
 className="flex items-center justify-between p-4 hover:bg-bg-subtle rounded-xl transition-colors group"
 onClick={() => setQuery('')}
 >
 <div className="flex items-center gap-4">
 <div className="p-2 bg-brand-light text-brand rounded-lg group-hover:bg-brand group-hover:text-white transition-colors">
 <MapPin size={16} />
 </div>
 <div>
 <p className="text-body font-bold !mb-0">{county.name}</p>
 <p className="text-overline !text-text-muted">{county.seat}, WA</p>
 </div>
 </div>
 <ChevronRight size={16} className="text-text-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
 </Link>
 ))}
 <div className="pt-4 px-4 border-t border-border-default mt-2 text-center">
 <p className="text-overline !text-text-muted">Showing Top Results for {query}</p>
 </div>
 </div>
 ) : (
 <div className="p-6 text-center">
 <Calculator className="w-10 h-10 text-border-default mx-auto mb-4" />
 <p className="text-body text-sm">No Washington county found matching &quot;{query}&quot;</p>
 </div>
 )}
 </div>
 )}
 </div>
 );
};

export default SearchMock;

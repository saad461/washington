'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface TOCItem {
 id: string;
 text: string;
 level: number;
}

interface TableOfContentsProps {
 headings: TOCItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
 const [activeId, setActiveId] = useState<string>('');
 const [isOpen, setIsOpen] = useState(false);

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setActiveId(entry.target.id);
 }
 });
 },
 { rootMargin: '0px 0px -80% 0px' }
 );

 headings.forEach((heading) => {
 const el = document.getElementById(heading.id);
 if (el) {
 observer.observe(el);
 }
 });

 return () => observer.disconnect();
 }, [headings]);

 if (!headings.length) return null;

 const tocContent = (
 <nav className="space-y-1">
 {headings.map((heading) => (
 <a
 key={heading.id}
 href={`#${heading.id}`}
 onClick={(e) => {
 e.preventDefault();
 document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
 setIsOpen(false);
 }}
 className={`block py-2 text-sm transition-all duration-300 ${
 activeId === heading.id
 ? ' font-bold border-l-2 border-brand pl-4 bg-brand-light text-brand'
 : ' hover: border-l-2 border-border-default pl-4 hover:border-brand hover:text-brand text-text-muted'
 } ${heading.level === 3 ? 'ml-4' : ''}`}
 >
 {heading.text}
 </a>
 ))}
 </nav>
 );

 return (
 <>
 <div className="hidden lg:block card section-subtle !p-6 sticky top-28">
 <h3 className="text-overline mb-6 flex items-center gap-2">
 <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
 Table of Contents
 </h3>
 {tocContent}
 </div>

 <div className="lg:hidden mb-8">
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="w-full flex items-center justify-between bg-bg-subtle border border-border-default rounded-xl px-5 py-4 text-left"
 aria-expanded={isOpen}
 aria-controls="toc-mobile-panel"
 >
 <span className="text-overline flex items-center gap-2">
 <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
 In this guide
 </span>
 <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
 </button>
 {isOpen && (
 <div
 id="toc-mobile-panel"
 className="mt-3 card !p-5 animate-in fade-in slide-in-from-top-2 duration-200"
 >
 {tocContent}
 </div>
 )}
 </div>
 </>

 );
}

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
 ? ' font-medium border-l-2 border-indigo-600 pl-4 bg-indigo-50/30'
 : ' hover: border-l-2 border-transparent pl-4 hover:border-[var(--color-bg-border)]'
 } ${heading.level === 3 ? 'ml-4 label-metadata' : ''}`}
 >
 {heading.text}
 </a>
 ))}
 </nav>
 );

 return (
 <>
 {/* Desktop: Sticky Sidebar TOC */}
 <div className="hidden lg:block bg-white border border-[var(--color-bg-border-soft)] rounded-xl p-6 shadow-[var(--shadow-card)] sticky top-28">
 <h3 className="label-metadata mb-6 flex items-center gap-2">
 <svg className="w-4 h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
 Table of Contents
 </h3>
 {tocContent}
 </div>

 {/* Mobile: Collapsible Dropdown TOC */}
 <div className="lg:hidden mb-8">
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="w-full flex items-center justify-between bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border-soft)] rounded-xl px-5 py-4 min-h-[48px] text-left min-h-[48px]"
 aria-expanded={isOpen}
 aria-controls="toc-mobile-panel"
 >
 <span className="label-metadata flex items-center gap-2">
 <svg className="w-4 h-4 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
 In this guide
 </span>
 <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
 </button>
 {isOpen && (
 <div
 id="toc-mobile-panel"
 className="mt-3 bg-white border border-[var(--color-bg-border-soft)] rounded-xl p-5 shadow-[var(--shadow-card)] animate-in fade-in slide-in-from-top-2 duration-200"
 >
 {tocContent}
 </div>
 )}
 </div>
 </>

 );
}

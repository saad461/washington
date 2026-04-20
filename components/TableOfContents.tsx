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
              ? 'text-indigo-600 font-bold border-l-2 border-indigo-600 pl-4 bg-indigo-50/30' 
              : 'text-gray-600 hover:text-gray-900 border-l-2 border-transparent pl-4 hover:border-gray-200'
          } ${heading.level === 3 ? 'ml-4 text-xs' : ''}`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: Sticky Sidebar TOC */}
      <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-28">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
          Table of Contents
        </h3>
        {tocContent}
      </div>

      {/* Mobile: Collapsible Dropdown TOC */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-left min-h-[48px]"
          aria-expanded={isOpen}
          aria-controls="toc-mobile-panel"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
            In this guide
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div
            id="toc-mobile-panel"
            className="mt-3 bg-white border border-gray-100 rounded-xl p-5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {tocContent}
          </div>
        )}
      </div>
    </>

  );
}

'use client';

import React, { useEffect, useState } from 'react';

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

  return (
    <div className="bg-white border text-left border-indigo-50 rounded-2xl p-6 shadow-xl shadow-indigo-900/5 sticky top-24">
      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-900 mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`block py-1 text-sm transition-all duration-300 ${
              activeId === heading.id 
                ? 'text-indigo-600 font-bold border-l-2 border-indigo-600 pl-3' 
                : 'text-slate-500 hover:text-indigo-900 border-l-2 border-transparent pl-3 hover:border-indigo-200'
            } ${heading.level === 3 ? 'ml-4 text-xs' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

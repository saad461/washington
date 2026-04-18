"use client";

import { TOCItem } from '@/components/TableOfContents';

interface MobileTOCProps {
  headings: TOCItem[];
}

export default function MobileTOC({ headings }: MobileTOCProps) {
  if (!headings || headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close the details element
    const details = (e.currentTarget.closest('details') as HTMLDetailsElement | null);
    if (details) details.open = false;
  };

  return (
    <details className="lg:hidden mb-8 bg-indigo-50 border border-indigo-100 rounded-2xl overflow-hidden group">
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-bold text-sm text-indigo-700 uppercase tracking-widest select-none list-none">
        <span>📑 Table of Contents</span>
        <svg
          className="w-4 h-4 text-indigo-400 transition-transform duration-300 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <nav className="px-5 pb-5 pt-2 space-y-2 border-t border-indigo-100">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => handleClick(e, h.id)}
            className={`block transition-colors leading-snug hover:text-indigo-800 ${
              h.level === 3
                ? 'pl-4 text-xs font-semibold text-indigo-500'
                : 'text-sm font-bold text-indigo-600'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </details>
  );
}

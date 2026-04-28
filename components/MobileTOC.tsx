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
 const details = (e.currentTarget.closest('details') as HTMLDetailsElement | null);
 if (details) details.open = false;
 };

 return (
 <details className="lg:hidden mb-8 bg-brand-light border border-brand-border rounded-xl overflow-hidden group">
 <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-overline !text-brand select-none list-none">
 <span>📑 Table of Contents</span>
 <svg
 className="w-4 h-4 text-brand transition-transform duration-300 group-open:rotate-180"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
 </svg>
 </summary>
 <nav className="px-5 pb-5 pt-2 space-y-2 border-t border-brand-border">
 {headings.map(h => (
 <a
 key={h.id}
 href={`#${h.id}`}
 onClick={(e) => handleClick(e, h.id)}
 className={`block transition-colors leading-snug hover:text-brand-hover ${
 h.level === 3
 ? 'pl-4 text-xs uppercase font-bold text-brand'
 : 'text-sm font-bold text-text-primary'
 }`}
 >
 {h.text}
 </a>
 ))}
 </nav>
 </details>
 );
}

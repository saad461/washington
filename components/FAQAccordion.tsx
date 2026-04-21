"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
 question: string;
 answer: string;
};

interface FAQProps {
 items: FAQItem[];
 defaultOpenCount?: number;
}

export default function FAQAccordion({ items, defaultOpenCount = 2 }: FAQProps) {
 // Initialize state based on the defaultOpenCount (normally the first 2 items)
 const [openIndexes, setOpenIndexes] = useState<number[]>(
 items.slice(0, defaultOpenCount).map((_, i) => i)
 );

 const toggleAccordion = (index: number) => {
 setOpenIndexes((prev) =>
 prev.includes(index)
 ? prev.filter((i) => i !== index)
 : [...prev, index]
 );
 };

 // Generate JSON-LD Schema
 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "mainEntity": items.map(item => ({
 "@type": "Question",
 "name": item.question,
 "acceptedAnswer": {
 "@type": "Answer",
 "text": item.answer
 }
 }))
 };

 return (
 <section className="w-full">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <h2 className="sr-only">Frequently Asked Questions</h2>

 <div className="space-y-6">
 {items.map((item, index) => {
 const isOpen = openIndexes.includes(index);
 const controlId = `faq-content-${index}`;
 const buttonId = `faq-control-${index}`;

 return (
 <div
 key={index}
 className="bg-white border border-gray-100 hover:border-indigo-200 transition-all duration-300 rounded-xl overflow-hidden shadow-sm active:scale-[0.99]"
 >
 <h3>
 <button
 id={buttonId}
 aria-expanded={isOpen}
 aria-controls={controlId}
 role="button"
 onClick={() => toggleAccordion(index)}
 className="w-full flex items-center justify-between min-h-[56px] py-4 min-h-[48px] px-6 md:px-8 cursor-pointer outline-none focus-visible:bg-gray-50 group"
 >
 <span className="text-base font-medium text-left pr-4 font-heading leading-tight group-hover: transition-colors">
 {item.question}
 </span>
 <ChevronDown
 className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
 />
 </button>
 </h3>

 <div
 id={controlId}
 role="region"
 aria-labelledby={buttonId}
 className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
 >
 <div className="overflow-hidden">
 <div className="px-6 pb-6 md:px-8 md:pb-8 text-sm md:text-base leading-relaxed font-medium">
 <p>{item.answer}</p>
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 );
}

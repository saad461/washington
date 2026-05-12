"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
 question: string;
 answer: string;
};

interface FAQProps {
 faqs: FAQItem[];
 defaultOpenCount?: number;
 singleOpen?: boolean;
}

export default function FAQAccordion({ faqs, defaultOpenCount = 2, singleOpen = false }: FAQProps) {
 // Initialize state based on the defaultOpenCount (normally the first 2 items)
 const [openIndexes, setOpenIndexes] = useState<number[]>(
 faqs.slice(0, defaultOpenCount).map((_, i) => i)
 );

 const toggleAccordion = (index: number) => {
 setOpenIndexes((prev) => {
   if (prev.includes(index)) {
     return prev.filter((i) => i !== index);
   }
   if (singleOpen) {
     return [index];
   }
   return [...prev, index];
 });
 };

 // Generate JSON-LD Schema
 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "mainEntity": faqs.map(item => ({
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
 <div className="divide-y divide-[var(--color-bg-border-soft)]">
 {faqs.map((item, index) => {
 const isOpen = openIndexes.includes(index);
 const controlId = `faq-content-${index}`;
 const buttonId = `faq-control-${index}`;

 return (
 <div
 key={index}
 className="faq-item"
 >
 <h3>
 <button
 id={buttonId}
 aria-expanded={isOpen}
 aria-controls={controlId}
 role="button"
 onClick={() => toggleAccordion(index)}
 className="faq-question w-full group"
 >
 <span className="pr-4 leading-tight">
 {item.question}
 </span>
 <ChevronDown
 className={`w-5 h-5 shrink-0 transition-transform duration-200 ease-in-out text-[var(--color-text-secondary)] ${isOpen ? 'rotate-180' : ''}`}
 />
 </button>
 </h3>

 <div
 id={controlId}
 role="region"
 aria-labelledby={buttonId}
 className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
 >
 <div className="overflow-hidden">
 {isOpen && (
 <div className="faq-answer">
 <p>{item.answer}</p>
 </div>
 )}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 );
}

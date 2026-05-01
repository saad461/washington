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
 <div className="divide-y divide-[var(--color-bg-border-soft)]">
 {items.map((item, index) => {
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
 className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]0' : 'grid-rows-[0fr] opacity-0'}`}
 >
 <div className="overflow-hidden">
 <div className="faq-answer">
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

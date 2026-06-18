import { Metadata } from "next";
import MedicalExpenseClient from "./MedicalExpenseClient";

export const metadata: Metadata = {
  title: { absolute: "Washington Medical Expense Calculator 2026 — Uninsured Cost Split" },
  description: "Calculate how uninsured medical expenses are split between parents in Washington State by income. Based on RCW 26.19.080(2).",
  alternates: { canonical: "https://wscss.site/medical-expense-calculator" },
  openGraph: {
    title: "Washington Medical Expense Calculator 2026 — Uninsured Cost Split",
    description: "Calculate how uninsured medical expenses are split between parents in Washington State by income. Based on RCW 26.19.080(2).",
    url: "https://wscss.site/medical-expense-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Medical Expense Calculator 2026 — Uninsured Cost Split",
    description: "Calculate how uninsured medical expenses are split between parents in Washington State by income. Based on RCW 26.19.080(2).",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function MedicalExpensePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How are uninsured medical expenses split in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Split proportionally by income under RCW 26.19.080(2). The parent who paid is reimbursed by the other for their share."
        }
      },
      {
        "@type": "Question",
        "name": "What counts as uninsured medical expense in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copays, deductibles, dental, orthodontia, glasses, mental health, prescriptions not covered by insurance."
        }
      },
      {
        "@type": "Question",
        "name": "How do I request reimbursement for medical expenses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Provide receipts to the other parent. If refused file a motion for enforcement with your county Superior Court."
        }
      }
    ]
  };

  const faqs = faqSchema.mainEntity.map(item => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MedicalExpenseClient faqs={faqs} />
    </>
  );
}

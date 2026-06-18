import { Metadata } from "next";
import MedicalExpenseClient from "./MedicalExpenseClient";

export const metadata: Metadata = {
  title: { absolute: "Medical Expense Calculator | wscss.site — 2026" },
  description: "Calculate how to split uninsured medical expenses between parents proportionally for 2026. Free tool covers dental and copays per RCW 26.19.080(2).",
  alternates: { canonical: "https://wscss.site/medical-expense-calculator" },
  openGraph: {
    title: "Medical Expense Calculator | wscss.site — 2026",
    description: "Calculate how to split uninsured medical expenses between parents proportionally for 2026. Covers dental, prescriptions, and copays per RCW 26.19.080(2).",
    url: "https://wscss.site/medical-expense-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Expense Calculator | wscss.site — 2026",
    description: "Calculate how to split uninsured medical expenses between parents proportionally for 2026. Covers dental, prescriptions, and copays per RCW 26.19.080(2).",
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
          "text": "Uninsured medical expenses are split proportionally by income under RCW 26.19.080(2). The parent who paid the out-of-pocket expense is reimbursed by the other parent for their share."
        }
      },
      {
        "@type": "Question",
        "name": "What counts as uninsured medical expense in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copays, deductibles, dental work, orthodontia, glasses, mental health counseling, and prescriptions not covered by insurance all count as extraordinary medical expenses."
        }
      },
      {
        "@type": "Question",
        "name": "How do I request reimbursement for medical expenses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Provide receipts to the other parent within a reasonable timeframe. If they refuse to pay their share, you may need to file a motion for enforcement with your county Superior Court."
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

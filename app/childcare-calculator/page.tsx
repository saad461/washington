import { Metadata } from "next";
import ChildcareClient from "./ChildcareClient";

export const metadata: Metadata = {
  title: { absolute: "Washington Childcare Cost Calculator 2026 — Split Daycare" },
  description: "Calculate how Washington State splits childcare costs between parents proportionally by income. Based on RCW 26.19.080(3).",
  alternates: { canonical: "https://wscss.site/childcare-calculator" },
  openGraph: {
    title: "Washington Childcare Cost Calculator 2026 — Split Daycare",
    description: "Calculate how Washington State splits childcare costs between parents proportionally by income. Based on RCW 26.19.080(3).",
    url: "https://wscss.site/childcare-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Childcare Cost Calculator 2026 — Split Daycare",
    description: "Calculate how Washington State splits childcare costs between parents proportionally by income. Based on RCW 26.19.080(3).",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function ChildcarePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How are childcare costs split in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under RCW 26.19.080(3) childcare costs are split in the same proportion as each parent's share of combined monthly net income."
        }
      },
      {
        "@type": "Question",
        "name": "Does the court order childcare cost sharing in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Washington courts routinely include childcare cost sharing in child support orders listed separately from basic support."
        }
      },
      {
        "@type": "Question",
        "name": "What childcare expenses qualify in Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Work-related daycare, before and after school care, and summer programs qualify under RCW 26.19.080(3)."
        }
      },
      {
        "@type": "Question",
        "name": "Can childcare costs be modified separately from child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Either parent can request modification of the childcare portion under RCW 26.09.170 if costs change significantly."
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
      <ChildcareClient faqs={faqs} />
    </>
  );
}

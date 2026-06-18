import { Metadata } from "next";
import HealthInsuranceClient from "./HealthInsuranceClient";

export const metadata: Metadata = {
  title: { absolute: "Health Insurance Calculator | wscss.site — 2026" },
  description: "Split children's health insurance premiums between parents by income share for 2026. Free calculator with accurate RCW 26.19.080(2) split in Washington.",
  alternates: { canonical: "https://wscss.site/health-insurance-calculator" },
  openGraph: {
    title: "Health Insurance Calculator | wscss.site — 2026",
    description: "Split children's health insurance premiums between parents by income share for 2026. Free calculator with accurate RCW 26.19.080(2) split in Washington.",
    url: "https://wscss.site/health-insurance-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Insurance Calculator | wscss.site — 2026",
    description: "Split children's health insurance premiums between parents by income share for 2026. Free calculator with accurate RCW 26.19.080(2) split in Washington.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function HealthInsurancePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is health insurance split in Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under RCW 26.19.080(2) premiums are split proportionally by income. The parent carrying insurance is reimbursed by the other parent for their share of the children's portion of the premium."
        }
      },
      {
        "@type": "Question",
        "name": "What health expenses are included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical, dental, orthodontia, vision, chiropractic, mental health, and prescriptions under RCW 26.19.080(2). These are shared proportionally separate from basic support."
        }
      },
      {
        "@type": "Question",
        "name": "Can I be required to provide health insurance in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Courts can order either parent to maintain health insurance if available at reasonable cost through their employer."
        }
      },
      {
        "@type": "Question",
        "name": "What if insurance costs change?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Either parent can request modification if the premium changes substantially, separate from a basic support order modification."
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
      <HealthInsuranceClient faqs={faqs} />
    </>
  );
}

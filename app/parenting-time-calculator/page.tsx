import { Metadata } from "next";
import ParentingTimeClient from "./ParentingTimeClient";

export const metadata: Metadata = {
  title: { absolute: "Parenting Time Calculator | wscss.site — 2026" },
  description: "Calculate parenting time overnights and custody percentage for 2026 child support free. See how your schedule affects payments under RCW 26.19.075.",
  alternates: { canonical: "https://wscss.site/parenting-time-calculator" },
  openGraph: {
    title: "Parenting Time Calculator | wscss.site — 2026",
    description: "Calculate parenting time overnights and custody percentage for 2026 child support free. See how your schedule affects payments under RCW 26.19.075.",
    url: "https://wscss.site/parenting-time-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parenting Time Calculator | wscss.site — 2026",
    description: "Calculate parenting time overnights and custody percentage for 2026 child support free. See how your schedule affects payments under RCW 26.19.075.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function ParentingTimePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many overnights is 50/50 custody in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "50/50 custody equals 182-183 overnights per year depending on the schedule used."
        }
      },
      {
        "@type": "Question",
        "name": "Does parenting time affect child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington courts may deviate from the standard calculation when the paying parent has significant parenting time under RCW 26.19.075(1)(d). There is no fixed formula — courts consider actual expenses of both households."
        }
      },
      {
        "@type": "Question",
        "name": "What is the parenting time threshold in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington does not have a fixed threshold. Courts consider whether the child spends a significant amount of time with the paying parent. Common practice suggests 91+ overnights may support a deviation request."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate parenting time percentage in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Divide your overnights per year by 365 and multiply by 100. For example 182 overnights divided by 365 equals 49.9% parenting time."
        }
      },
      {
        "@type": "Question",
        "name": "What is the standard possession order in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington does not have a standard possession order like Texas. Judges create parenting plans based on the best interests of the child under RCW 26.09.187."
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
      <ParentingTimeClient faqs={faqs} />
    </>
  );
}

import { Metadata } from "next";
import ArrearsClient from "./ArrearsClient";

export const metadata: Metadata = {
  title: { absolute: "Washington Child Support Arrears Calculator 2026 — Back Pay & Interest" },
  description: "Calculate unpaid child support arrears and 12% interest in Washington State. Based on RCW 26.23.060.",
  alternates: { canonical: "https://wscss.site/arrears-calculator" },
  openGraph: {
    title: "Washington Child Support Arrears Calculator 2026 — Back Pay & Interest",
    description: "Calculate unpaid child support arrears and 12% interest in Washington State. Based on RCW 26.23.060.",
    url: "https://wscss.site/arrears-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Child Support Arrears Calculator 2026 — Back Pay & Interest",
    description: "Calculate unpaid child support arrears and 12% interest in Washington State. Based on RCW 26.23.060.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function ArrearsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the interest rate on arrears in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "12% annual interest under RCW 26.23.060. Accrues from the date each payment was due."
        }
      },
      {
        "@type": "Question",
        "name": "Can child support arrears be forgiven in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "State cannot forgive arrears owed to other parent without their consent. Courts can compromise state-owed arrears in some cases."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I do not pay arrears in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wage garnishment, tax refund interception, license suspension, passport denial, credit reporting, and contempt of court charges."
        }
      },
      {
        "@type": "Question",
        "name": "How long can arrears be collected in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington child support judgments do not expire. Arrears collected indefinitely until paid in full including all accrued interest."
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
      <ArrearsClient faqs={faqs} />
    </>
  );
}

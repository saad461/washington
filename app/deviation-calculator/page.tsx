import { Metadata } from "next";
import DeviationClient from "./DeviationClient";

export const metadata: Metadata = {
  title: { absolute: "Washington State Child Support Deviation Calculator 2026 | WSCSS" },
  description: "Calculate above or below standard child support in Washington State. Enter deviation reasons per RCW 26.19.075 and get your adjusted 2026 support estimate instantly.",
  alternates: { canonical: "https://wscss.site/deviation-calculator" },
  openGraph: {
    title: "Washington Child Support Deviation Calculator 2026",
    description: "Free Washington State deviation calculator. See how extraordinary expenses, prior debts, and other factors adjust your standard 2026 child support obligation up or down.",
    url: "https://wscss.site/deviation-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Child Support Deviation Calculator 2026",
    description: "Free Washington State deviation calculator. See how extraordinary expenses, prior debts, and other factors adjust your standard 2026 child support obligation up or down.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function DeviationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a child support deviation in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A child support deviation in Washington State is a court approved adjustment that sets support above or below the standard schedule amount. It is governed by RCW 26.19.075 and requires the requesting parent to show that the standard amount would be unjust given their specific circumstances."
        }
      },
      {
        "@type": "Question",
        "name": "What qualifies for a downward deviation in Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Qualifying reasons for a downward deviation in Washington include significant debt obligations incurred before the separation, support obligations for children from other relationships, a child's significant independent assets or income, and other financial hardships that make the standard amount unjust."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get more child support than the standard amount in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. An upward deviation can be requested in Washington State when a child has extraordinary medical expenses, significant educational costs, or when long distance transportation costs create an additional financial burden beyond what the standard schedule accounts for."
        }
      },
      {
        "@type": "Question",
        "name": "How much can child support deviate from the standard in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington law does not set a fixed cap on deviation amounts. The adjustment is based on the actual documented costs and circumstances presented to the court. A judge has discretion to set any amount they determine is just and appropriate based on the evidence."
        }
      },
      {
        "@type": "Question",
        "name": "Do both parents have to agree to a deviation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Either parent can request a deviation independently. However a judge must approve it. If both parents agree to a deviation amount, the court will typically approve it as long as it is not against the child's best interests."
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
      <DeviationClient faqs={faqs} />
    </>
  );
}

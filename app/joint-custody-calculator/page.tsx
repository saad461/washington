import { Metadata } from "next";
import JointCustodyClient from "./JointCustodyClient";

export const metadata: Metadata = {
  title: { absolute: "Washington State Joint Custody Child Support Calculator 2026 | WSCSS" },
  description: "Calculate child support for joint custody arrangements in Washington State using the 2026 schedule. Includes residential credit calculation per RCW 26.19.080.",
  alternates: { canonical: "https://wscss.site/joint-custody-calculator" },
  openGraph: {
    title: "Washington Joint Custody Child Support Calculator 2026",
    description: "Free Washington State joint custody support calculator. Enter both parents' income and residential days to get your adjusted 2026 child support estimate instantly.",
    url: "https://wscss.site/joint-custody-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Joint Custody Child Support Calculator 2026",
    description: "Free Washington State joint custody support calculator. Enter both parents' income and residential days to get your adjusted 2026 child support estimate instantly.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function JointCustodyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does joint custody affect child support in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Washington State, when a child spends 135 or more overnights per year with a parent, a residential credit is applied under RCW 26.19.080. This credit reduces the standard child support obligation to reflect the costs each parent directly bears during their residential time."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 135 day rule in Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 135 day rule means that if a parent has the child for at least 135 overnights per year (approximately 37% of the year), they qualify for a residential credit adjustment to the standard child support calculation under Washington State law."
        }
      },
      {
        "@type": "Question",
        "name": "Does 50/50 custody eliminate child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Even in a 50/50 custody arrangement, child support is still typically owed in Washington State. The higher earning parent usually pays the lower earning parent the difference between their proportional obligations. The residential credit reduces but rarely eliminates the payment entirely."
        }
      },
      {
        "@type": "Question",
        "name": "Which parent pays child support in joint custody?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Washington State joint custody arrangements, the parent with the higher income typically pays child support to the lower income parent. The amount is reduced by the residential credit formula if both parents meet the 135 day threshold."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator accurate for 2026 Washington State cases?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator uses the 2026 Washington State Child Support Schedule and applies the RCW 26.19.080 residential credit formula. It provides a close estimate but actual court ordered amounts may vary based on deviations, childcare costs, and other factors. Always consult a family law attorney for legal advice."
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
      <JointCustodyClient faqs={faqs} />
    </>
  );
}

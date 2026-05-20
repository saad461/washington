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
        "name": "Does 50/50 custody mean no one pays child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Equal parenting time does not automatically waive child support. Washington family courts prioritize minimizing the standard-of-living gap between households. If one parent has a higher monthly net income, they will usually owe a child support transfer payment, though it may be adjusted downward using a residential deviation."
        }
      },
      {
        "@type": "Question",
        "name": "Which parent pays child support in a joint custody arrangement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The parent with the higher monthly net income is designated as the payer (obligor). Even in strict 50/50 parenting schedules, the higher earner pays a calculated transfer payment to ensure the child has adequate resources in both homes."
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
        "name": "Are residential custody credits guaranteed by WA family courts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, residential credits are entirely discretionary under RCW 26.19.075. A judge can deny your request for a downward residential deviation if reducing the support transfer payment leaves the lower-earning household without enough funds to cover the child's basic necessities like housing and utilities."
        }
      },
      {
        "@type": "Question",
        "name": "Can I modify my old child support order under the new 2026 guidelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The implementation of House Bill 1014, which expanded the Washington presumptive child support economic table from a $12,000/month cap to a $50,000/month cap, creates a valid opportunity for parents—especially middle and high-income earners—to file for a modification of their child support order."
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

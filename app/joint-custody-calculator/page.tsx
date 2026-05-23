import { Metadata } from "next";
import JointCustodyClient from "./JointCustodyClient";

export const metadata: Metadata = {
  title: { absolute: "WA Joint Custody Support Calculator 2026" },
  description: "Calculate Washington child support for joint custody. Estimate residential credits, split placement impact, and shared parenting costs instantly.",
  alternates: { canonical: "https://wscss.site/joint-custody-calculator" },
  openGraph: {
    title: "WA Joint Custody Support Calculator 2026",
    description: "Calculate Washington child support for joint custody. Estimate residential credits, split placement impact, and shared parenting costs instantly.",
    url: "https://wscss.site/joint-custody-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WA Joint Custody Support Calculator 2026",
    description: "Calculate Washington child support for joint custody. Estimate residential credits, split placement impact, and shared parenting costs instantly.",
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
        "name": "How does joint custody affect child support in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Washington State, there is no fixed formula for joint custody. Instead, courts have the discretion to deviate from the standard calculation under RCW 26.19.075(1)(d) if the child spends significant time with the paying parent. The court considers the actual increased expenses of the paying parent and decreased expenses of the receiving parent."
        }
      },
      {
        "@type": "Question",
        "name": "What are the requirements for a residential deviation in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To receive a residential deviation, the paying parent must show they have significant parenting time (usually more than 90 overnights). The court must make written findings of fact explaining why the deviation is appropriate based on the households' actual expenses. No fixed percentages or 'offset methods' exist in official Washington law."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator accurate for 2026 Washington State cases?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator uses the 2026 Washington State Child Support Schedule and provides an estimated range for potential residential deviations based on RCW 26.19.075. It provides a close estimate but actual court ordered amounts are determined by a judge based on written findings. Always consult a family law attorney for legal advice."
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

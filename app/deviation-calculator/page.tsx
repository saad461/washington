import { Metadata } from "next";
import DeviationClient from "./DeviationClient";

export const metadata: Metadata = {
  title: { absolute: "WA Child Support Deviation Calculator 2026" },
  description: "Calculate above or below standard child support in Washington. Factor in high income, debt, split families, and non-standard court deviations.",
  alternates: { canonical: "https://wscss.site/deviation-calculator" },
  openGraph: {
    title: "WA Child Support Deviation Calculator 2026",
    description: "Calculate above or below standard child support in Washington. Factor in high income, debt, split families, and non-standard court deviations.",
    url: "https://wscss.site/deviation-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WA Child Support Deviation Calculator 2026",
    description: "Calculate above or below standard child support in Washington. Factor in high income, debt, split families, and non-standard court deviations.",
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
      },
      {
        "@type": "Question",
        "name": "How does nonrecurring income affect child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under RCW 26.19.075, if your income is temporarily inflated by a one-time bonus, inheritance, or lottery winnings, the court may deviate downward from the standard calculation to isolate your baseline income from these nonrecurring windfalls."
        }
      },
      {
        "@type": "Question",
        "name": "Does my partner's income count towards child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While a step-parent or live-in partner has no legal duty to support your child, their financial contributions to household expenses like rent and utilities can change your financial position. A judge may use this household income to justify an upward adjustment or deny a downward deviation."
        }
      },
      {
        "@type": "Question",
        "name": "What extraordinary expenses qualify for a deviation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Qualifying extraordinary expenses include special medical or mental health costs, specialized private schooling for a disabled child, court-ordered debt from a previous marriage, and high costs for long-distance transportation between parents."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a deviation if I have children from another relationship?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Washington law allows for a downward deviation if the paying parent has a legal duty to support biological children from a different relationship, ensuring that all children are financially supported."
        }
      },
      {
        "@type": "Question",
        "name": "Why might a judge deny my child support deviation request?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common reasons for denial include the 'Substantial Hardship Rule'—where a deviation would push the receiving parent below the poverty line—and a lack of strict documentation, such as failing to provide receipts or invoices for claimed expenses."
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

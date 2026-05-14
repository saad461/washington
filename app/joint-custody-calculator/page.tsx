import { Metadata } from "next";
import JointCustodyClient from "./JointCustodyClient";

export const metadata: Metadata = {
  title: { absolute: "Washington Joint Custody Child Support Calculator 2026 | WSCSS" },
  description: "Calculate child support for joint custody and 50/50 schedules in Washington State 2026. Uses the official AOC economic table and parenting time credit under RCW 26.19.075.",
  alternates: { canonical: "https://wscss.site/joint-custody-calculator" },
  openGraph: {
    title: "Washington Joint Custody Child Support Calculator 2026 | WSCSS",
    description: "Free calculator for joint custody child support in Washington 2026. Includes parenting time credit for 50/50 and shared schedules.",
    url: "https://wscss.site/joint-custody-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Joint Custody Child Support Calculator 2026 | WSCSS",
    description: "Calculate child support for joint custody and 50/50 schedules in Washington 2026. Official AOC economic table. Free.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function JointCustodyPage() {
  const faqs = [
    {
      question: "Does 50/50 custody mean no child support in Washington?",
      answer: "Not automatically. Washington calculates support based on both parents' incomes. If one parent earns significantly more they will typically still pay support even with equal custody time. The parenting time credit reduces but rarely eliminates the obligation."
    },
    {
      question: "How is the parenting time credit calculated in Washington?",
      answer: "Washington uses 25% of the basic obligation (Line 9 of the worksheet) as a reference for the parenting time credit in 50/50 schedules. For other schedules the credit is proportional to residential time. The credit requires court approval."
    },
    {
      question: "What is the difference between joint custody and 50/50 custody?",
      answer: "Joint custody refers to shared legal decision-making. 50/50 custody refers to equal residential time. You can have joint legal custody without equal residential time. Child support is calculated based on residential time not legal custody status."
    },
    {
      question: "Can we agree to no child support in a 50/50 arrangement?",
      answer: "Parents can request zero support but a Washington court must approve it with written findings. The court considers whether zero support serves the best interests of the children before approving any deviation from the standard calculation."
    },
    {
      question: "How does Washington handle expenses in a 50/50 schedule?",
      answer: "Healthcare and daycare costs are shared proportionally based on income share percentages regardless of the custody schedule. These are separate from the basic transfer payment and added to the total obligation on the worksheet."
    },
    {
      question: "What if we have a 60/40 schedule?",
      answer: "The parenting time credit is proportionally lower for 60/40 than 50/50. Washington courts consider the actual increase in expenses for the paying parent and the decrease in expenses for the receiving parent when setting the credit amount."
    }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Washington Joint Custody Child Support Calculator 2026",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "url": "https://wscss.site/joint-custody-calculator",
    "description": "Calculate child support for joint custody and 50/50 schedules in Washington State using the official 2026 AOC economic table and parenting time credit under RCW 26.19.075",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wscss.site/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Joint Custody Calculator",
        "item": "https://wscss.site/joint-custody-calculator"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JointCustodyClient faqs={faqs} />
    </>
  );
}

import { Metadata } from "next";
import ModificationClient from "./ModificationClient";

export const metadata: Metadata = {
  title: { absolute: "Washington State Child Support Modification Calculator 2026 | WSCSS" },
  description: "Find out if your Washington State child support order qualifies for modification in 2026. Compare old vs new income and check the 15% threshold per RCW 26.09.170.",
  alternates: { canonical: "https://wscss.site/modification-calculator" },
  openGraph: {
    title: "Washington Child Support Modification Calculator 2026",
    description: "Free Washington State modification calculator. Enter current and original incomes to instantly see if your support order has changed enough to warrant a 2026 modification.",
    url: "https://wscss.site/modification-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Child Support Modification Calculator 2026",
    description: "Free Washington State modification calculator. Enter current and original incomes to instantly see if your support order has changed enough to warrant a 2026 modification.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function ModificationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When can I modify child support in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Washington State you can request a child support modification when either the recalculated amount differs from your current order by 15% or more, or it has been at least 3 years since the order was entered or last modified. Only one condition needs to be met under RCW 26.09.170."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 15% rule for child support modification in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 15% rule means that if recalculating child support under the current Washington State schedule produces an amount that is 15% higher or lower than your existing court order, you may have grounds to request a modification regardless of when the order was last set."
        }
      },
      {
        "@type": "Question",
        "name": "Can I modify child support if I lost my job in Washington State?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Job loss is a qualifying reason for a child support modification in Washington State. If your income has dropped significantly enough that the recalculated amount differs from your current order by 15% or more, you can petition the court for a modification under RCW 26.09.170."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a child support modification take in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline varies by county and complexity. A straightforward agreed modification can take 4 to 8 weeks. A contested modification that requires a hearing may take 3 to 6 months or longer. The Washington State Division of Child Support can also process administrative modifications which may be faster than going through court."
        }
      },
      {
        "@type": "Question",
        "name": "Does child support automatically change when income changes in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Child support does not change automatically in Washington State when income changes. You must file a formal modification petition with the court or through the Division of Child Support. Until a new order is entered, the existing order remains legally in effect and must be paid as ordered."
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
      <ModificationClient faqs={faqs} />
    </>
  );
}

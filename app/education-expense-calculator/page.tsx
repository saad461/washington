import { Metadata } from "next";
import EducationExpenseClient from "./EducationExpenseClient";

export const metadata: Metadata = {
  title: { absolute: "Education Expense Calculator | wscss.site — 2026" },
  description: "Split school tuition and education costs proportionally for 2026. Free calculator with updated RCW 26.19.080(3) and RCW 26.19.090 college support info.",
  alternates: { canonical: "https://wscss.site/education-expense-calculator" },
  openGraph: {
    title: "Education Expense Calculator | wscss.site — 2026",
    description: "Split school tuition and education costs proportionally for 2026. Free calculator with updated RCW 26.19.080(3) and RCW 26.19.090 college support info.",
    url: "https://wscss.site/education-expense-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Expense Calculator | wscss.site — 2026",
    description: "Split school tuition and education costs proportionally for 2026. Free calculator with updated RCW 26.19.080(3) and RCW 26.19.090 college support info.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function EducationExpensePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are private school costs covered in Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Private school tuition can be included as a special child-rearing expense under RCW 26.19.080(3) if the court finds the expense to be reasonable and necessary for the child."
        }
      },
      {
        "@type": "Question",
        "name": "Does Washington cover college costs in child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Post-secondary support is advisory under RCW 26.19.090. Courts may order support for college up to age 23 if the child is enrolled and in good academic standing."
        }
      },
      {
        "@type": "Question",
        "name": "How are school activity fees split in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "School fees and activities are typically split proportionally by income as special child-rearing expenses under RCW 26.19.080(3)."
        }
      },
      {
        "@type": "Question",
        "name": "What education expenses can I include in my child support order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tuition, school fees, supplies, and long-distance transportation for visitation are common education costs addressed under RCW 26.19.080(3)."
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
      <EducationExpenseClient faqs={faqs} />
    </>
  );
}

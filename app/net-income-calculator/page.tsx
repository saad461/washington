import { Metadata } from "next";
import NetIncomeClient from "./NetIncomeClient";

export const metadata: Metadata = {
  title: { absolute: "Net Income Calculator | wscss.site — 2026" },
  description: "Convert gross to net monthly income for child support in 2026. Free calculator with federal brackets, FICA, and WA PFML/LTC RCW 26.19.071(5) deductions.",
  alternates: { canonical: "https://wscss.site/net-income-calculator" },
  openGraph: {
    title: "Net Income Calculator | wscss.site — 2026",
    description: "Convert gross to net monthly income for child support calculations in 2026. Free calculator with federal brackets, FICA, and WA PFML/LTC RCW 26.19.071(5) deductions.",
    url: "https://wscss.site/net-income-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Net Income Calculator | wscss.site — 2026",
    description: "Convert gross to net monthly income for child support calculations in 2026. Free calculator with federal brackets, FICA, and WA PFML/LTC RCW 26.19.071(5) deductions.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function NetIncomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What counts as income for Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wages, salaries, bonuses, overtime, self-employment, rental income, investments, and most other sources under RCW 26.19.071(3)."
        }
      },
      {
        "@type": "Question",
        "name": "What deductions are allowed for Washington child support income?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Federal taxes, FICA, mandatory pension, union dues, WA PFML, WA LTC Trust premiums, and court-ordered maintenance under RCW 26.19.071(5)."
        }
      },
      {
        "@type": "Question",
        "name": "Does Washington have state income tax for child support purposes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington has no state income tax. Only federal tax, FICA, and WA mandatory insurance premiums (PFML and LTC) are deducted for child support."
        }
      },
      {
        "@type": "Question",
        "name": "What income is excluded from Washington child support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New spouse income, SSI, TANF, food stamps, gifts, and certain overtime and second job income under RCW 26.19.071(4)."
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
      <NetIncomeClient faqs={faqs} />
    </>
  );
}

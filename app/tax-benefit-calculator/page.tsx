import { Metadata } from "next";
import TaxBenefitClient from "./TaxBenefitClient";

export const metadata: Metadata = {
  title: { absolute: "Washington Child Tax Benefit Calculator 2026 — Dependent Exemption Value" },
  description: "Estimate the 2026 value of claiming your child as a dependent. Free calculator with Child Tax Credit phase-outs and RCW 26.19.100 rules for Washington.",
  alternates: { canonical: "https://wscss.site/tax-benefit-calculator" },
  openGraph: {
    title: "Washington Child Tax Benefit Calculator 2026 — Dependent Exemption Value",
    description: "Estimate the 2026 value of claiming your child as a dependent. Free calculator with Child Tax Credit phase-outs and RCW 26.19.100 rules for Washington.",
    url: "https://wscss.site/tax-benefit-calculator",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Child Tax Benefit Calculator 2026 — Dependent Exemption Value",
    description: "Estimate the 2026 value of claiming your child as a dependent. Free calculator with Child Tax Credit phase-outs and RCW 26.19.100 rules for Washington.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function TaxBenefitPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who claims the child on taxes after divorce in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Washington courts can order which parent claims children under RCW 26.19.100. Courts may award to one parent, alternate annually, or split among children."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Child Tax Credit in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Child Tax Credit is estimated at $2,000 per qualifying child in 2026. It phases out for single filers above $200,000 and married filers above $400,000."
        }
      },
      {
        "@type": "Question",
        "name": "Can the court order the other parent to sign the tax waiver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Courts can order a parent to sign IRS Form 8332 releasing the dependency exemption under RCW 26.19.100."
        }
      },
      {
        "@type": "Question",
        "name": "Does claiming the child affect child support in Washington?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tax exemption is separate from child support calculations. However, courts may consider tax benefits when reviewing support amounts."
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
      <TaxBenefitClient faqs={faqs} />
    </>
  );
}

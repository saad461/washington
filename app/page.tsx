import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: {
    absolute: "Washington Child Support Calculator 2026 — Free Instant Estimate | WCSSC"
  },
  description: "Calculate Washington child support in seconds using the official 2026 RCW 26.19 economic tables. Free, private, and updated for EHB 1014 — covers all 39 counties.",
  alternates: { canonical: "https://wcssc.site/" },
};

export default function Home() {
  const homeFaqs = [
    {
      question: "What is the minimum child support in Washington state?",
      answer: "The statutory minimum child support in Washington is $50 per child per month. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent's self-support reserve is protected.",
    },
    {
      question: "How is Washington child support calculated in 2026?",
      answer: "Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income.",
    },
    {
      question: "What is the Self-Support Reserve (SSR) for 2026?",
      answer: "The 2026 Self-Support Reserve (SSR) is approximately $2,394 per month. This low-income protection ensures that a paying parent is not left with less than approximately $2,394 to live on after making a basic child support payment.",
    },
    {
      question: "Does child support cover extraordinary expenses like daycare?",
      answer: "No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WCSSC — Washington Child Support Schedule Center",
    url: "https://wcssc.site",
    description: "Washington's most accurate 2026 child support calculator.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema url="https://wcssc.site" />
      <FAQSchema faqs={homeFaqs} />
      <HomeClient homeFaqs={homeFaqs} />
    </>
  );
}

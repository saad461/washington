import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: { absolute: "WA Child Support Calculator 2026 | Free | WSCSS" },
  description: "Calculate your 2026 Washington child support instantly using the official AOC economic table. Free for all 39 counties. Trusted by parents and attorneys.",
  alternates: { canonical: "https://wscss.site/" },
  openGraph: {
    title: "WA Child Support Calculator 2026 | Free | WSCSS",
    description: "Calculate your 2026 Washington child support instantly using the official AOC economic table. Free for all 39 counties.",
    url: "https://wscss.site/",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WA Child Support Calculator 2026 | WSCSS",
    description: "Free instant child support estimate for Washington 2026. Official AOC economic table. All 39 counties covered.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function Home() {
  const homeFaqs = [
    {
      question: "What is the minimum child support in Washington state?",
      answer: "The statutory minimum child support in Washington is $50 per child per month. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent's <a href='/glossary/self-support-reserve' class='text-blue-600 hover:underline'>self-support reserve</a> is protected.",
    },
    {
      question: "How is Washington child support calculated in 2026?",
      answer: "Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income.",
    },
    {
      question: "What is the Self-Support Reserve (SSR) for 2026?",
      answer: "The 2026 Self-Support Reserve (SSR) is $2,394 per month. This low-income protection ensures that a paying parent is not left with less than $2,394 to live on after making a basic child support payment. Learn more in our <a href='/glossary/self-support-reserve' class='text-blue-600 hover:underline'>glossary</a>.",
    },
    {
      question: "Does child support cover extraordinary expenses like daycare?",
      answer: "No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income.",
    },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WSCSS — Washington State Child Support Schedule",
    "url": "https://wscss.site",
    "description": "Free Washington State child support calculator using the official 2026 AOC economic table. All 39 counties covered.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://wscss.site/washington-courts?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wscss.site/wscss-og.webp",
        "width": 1200,
        "height": 630
      }
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Washington Child Support Calculator 2026",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "url": "https://wscss.site",
    "description": "Free Washington State child support calculator using the official 2026 AOC economic table under RCW 26.19",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "2026 Washington State economic table",
      "All 39 Washington counties",
      "SSR protection calculation",
      "Healthcare and daycare expense sharing",
      "Official AOC worksheet generator"
    ],
    "provider": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <CalculatorSchema url="https://wscss.site" />
      <FAQSchema faqs={homeFaqs} />
      <HomeClient homeFaqs={homeFaqs} />
    </>
  );
}

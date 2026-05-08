import { Metadata } from "next";
import ExtraExpensesClient from "./ExtraExpensesClient";

export const metadata: Metadata = {
  title: { absolute: "Extraordinary Expenses Splitter | WA Child Support | WSCSS" },
  description: "Calculate proportional shares for healthcare and daycare expenses in Washington child support. Ensure compliance with RCW 26.19 proportional split rules.",
  alternates: { canonical: 'https://wscss.site/extra-expenses' },
  openGraph: {
    title: "Extraordinary Expenses Splitter | WA Child Support | WSCSS",
    description: "Calculate proportional shares for healthcare and daycare expenses in Washington child support. RCW 26.19 compliant.",
    url: "https://wscss.site/extra-expenses",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extraordinary Expenses Splitter | WA Child Support | WSCSS",
    description: "Calculate proportional shares for healthcare and daycare expenses in WA child support.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default function ExtraExpensesPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Washington Child Support Extraordinary Expenses Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "url": "https://wscss.site/extra-expenses",
    "description": "Calculate healthcare, daycare, and extraordinary expense sharing between parents in Washington State child support under RCW 26.19.080",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "provider": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wscss.site/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Extra Expenses Calculator",
        "item": "https://wscss.site/extra-expenses",
      },
    ],
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
      <ExtraExpensesClient />
    </>
  );
}

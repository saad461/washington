import { Metadata } from "next";
import ExtraExpensesClient from "./ExtraExpensesClient";

export const metadata: Metadata = {
  title: { absolute: "WA Extraordinary Expenses Calculator 2026" },
  description: "Calculate proportional shares for healthcare, daycare, and education expenses under the official Washington child support guidelines.",
  alternates: { canonical: 'https://wscss.site/extra-expenses' },
  openGraph: {
    title: "WA Extraordinary Expenses Calculator 2026",
    description: "Calculate proportional shares for healthcare, daycare, and education expenses under the official Washington child support guidelines.",
    url: "https://wscss.site/extra-expenses",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WA Extraordinary Expenses Calculator 2026",
    description: "Calculate proportional shares for healthcare, daycare, and education expenses under the official Washington child support guidelines.",
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
        "item": "https://wscss.site",
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

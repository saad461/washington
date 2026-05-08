import { Metadata } from "next";
import ExtraExpensesClient from "./ExtraExpensesClient";

export const metadata: Metadata = {
  title: { absolute: "Extraordinary Expenses Splitter | WA Child Support | WSCSS" },
  description: "Calculate proportional shares for healthcare and daycare expenses in Washington child support. Ensure compliance with RCW 26.19 proportional split rules.",
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
  return <ExtraExpensesClient />;
}

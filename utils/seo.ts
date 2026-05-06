import { Metadata } from "next";
import { WashingtonCounty } from "@/data/washingtonCounties";

/**
 * Formats a number with commas and no decimals.
 * Example: 5000 -> "5,000"
 */
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Returns "1 Child" or "N Children" based on the count.
 */
const getChildrenLabel = (count: number): string => {
  return count === 1 ? "1 Child" : `${count} Children`;
};

interface CountyMetaProps {
  county: WashingtonCounty;
}

/**
 * Generates SEO metadata for County-specific court pages.
 */
export function getCountyPageMeta({ county }: CountyMetaProps): Metadata {
  const filingFee = county.filingFee.includes("$") ? county.filingFee.replace("$", "") : county.filingFee;
  const ssr = "2,394";

  return {
    // Note: <title> tag is kept as-is in the page component to avoid regression
    openGraph: {
      title: `${county.name} Child Support 2026 | Calculator, Court Info & Filing Guide`,
      description: `Calculate your 2026 child support obligation in ${county.name}, Washington. Get courthouse contacts, local filing tips, SSR protection rules, and instant estimates.`,
      url: `https://wscss.site/washington-courts/${county.slug}`,
      siteName: "WSCSS",
      images: [
        {
          url: "https://wscss.site/wscss-og.webp",
          width: 1200,
          height: 630,
          alt: `${county.name} Child Support Calculator 2026 — WSCSS`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${county.name} Child Support Calculator 2026 | WSCSS`,
      description: `Instant 2026 child support estimates for ${county.name}, WA. Official AOC economic table, local court info, and RCW 26.19 guidelines.`,
      images: ["https://wscss.site/wscss-og.webp"],
    },
    description: `Free 2026 child support calculator for ${county.name}, WA. Courthouse address, filing fee ($${filingFee}), Self-Support Reserve ($${ssr}), and step-by-step filing guide. RCW 26.19 compliant.`,
  };
}

interface IncomeMetaProps {
  county: WashingtonCounty | null;
  income: number;
  children: number;
  amount: number;
  slug: string;
}

/**
 * Generates SEO metadata for programmatic income calculation pages.
 */
export function getIncomePageMeta({
  county,
  income,
  children,
  amount,
  slug,
}: IncomeMetaProps): Metadata {
  const countyName = county ? county.name : "Washington";
  const formattedIncome = formatNumber(income);
  const formattedAmount = formatNumber(Math.round(amount));
  const childrenLabel = getChildrenLabel(children);

  const title = `Child Support $${formattedIncome} – ${countyName}, WA (${childrenLabel}) | 2026 | WSCSS`;
  const description = `2026 child support for $${formattedIncome}/mo combined income and ${childrenLabel} in ${countyName}, WA. Presumptive amount: $${formattedAmount}/mo. Includes SSR protection, income split, and court filing info.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wscss.site/${slug}`,
    },
    openGraph: {
      title: `$${formattedIncome} Income Child Support in ${countyName} – ${childrenLabel} | 2026`,
      description: `Your 2026 child support in ${countyName} is ~$${formattedAmount}/mo for $${formattedIncome} combined net income and ${childrenLabel}. Includes SSR rules and courthouse details.`,
      url: `https://wscss.site/${slug}`,
      siteName: "WSCSS",
      images: [
        {
          url: "https://wscss.site/wscss-og.webp",
          width: 1200,
          height: 630,
          alt: `${countyName} Child Support Calculator 2026 — $${formattedIncome} income, ${childrenLabel} — WSCSS`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${countyName} Child Support $${formattedIncome} / ${childrenLabel} | 2026 WSCSS`,
      description: `Presumptive 2026 child support for $${formattedIncome} income and ${childrenLabel} in ${countyName}, WA: ~$${formattedAmount}/mo. Based on official AOC economic table.`,
      images: ["https://wscss.site/wscss-og.webp"],
    },
  };
}

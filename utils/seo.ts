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
  const ssr = "2,394";

  const title = { absolute: `${county.name} Child Support Guide 2026 | Court Info | WSCSS` };
  const description = `Calculate 2026 child support in ${county.name}, WA. Courthouse address, filing fee, SSR rules ($${ssr}), and filing guides under RCW 26.19.`.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: title.absolute.slice(0, 60),
      description: `Calculate 2026 child support in ${county.name}, WA. Courthouse address, filing fee, and SSR rules ($${ssr}).`.slice(0, 160),
      url: `https://wscss.site/washington-courts/${county.slug}`,
      siteName: "WSCSS — Washington State Child Support Schedule",
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
      title: title.absolute.slice(0, 60),
      description: `Instant 2026 child support estimates for ${county.name}, WA. Official AOC economic table and RCW 26.19 guidelines.`.slice(0, 160),
      images: ["https://wscss.site/wscss-og.webp"],
    },
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

  const titleText = `Child Support $${formattedIncome} – ${countyName}, WA (${childrenLabel}) | 2026 | WSCSS`;
  const descriptionText = `2026 child support for $${formattedIncome}/mo income and ${childrenLabel} in ${countyName}, WA. Presumptive: $${formattedAmount}/mo. Includes SSR and RCW 26.19 rules.`;

  return {
    title: { absolute: titleText.slice(0, 60) },
    description: descriptionText.slice(0, 160),
    alternates: {
      canonical: `https://wscss.site/${slug}`,
    },
    openGraph: {
      title: `$${formattedIncome} Child Support in ${countyName} – ${childrenLabel} | 2026`.slice(0, 60),
      description: `2026 child support in ${countyName} is ~$${formattedAmount}/mo for $${formattedIncome} combined net income and ${childrenLabel}. Includes SSR and court info.`.slice(0, 160),
      url: `https://wscss.site/${slug}`,
      siteName: "WSCSS — Washington State Child Support Schedule",
      images: [
        {
          url: "https://wscss.site/wscss-og.webp",
          width: 1200,
          height: 630,
          alt: `${countyName} Child Support Calculator 2026 — $${formattedIncome} income, ${childrenLabel} — WSCSS`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${countyName} Support $${formattedIncome} | ${childrenLabel} | 2026`.slice(0, 60),
      description: `2026 child support for $${formattedIncome} income and ${childrenLabel} in ${countyName}, WA: ~$${formattedAmount}/mo. Based on AOC economic table.`.slice(0, 160),
      images: ["https://wscss.site/wscss-og.webp"],
    },
  };
}

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

  const title = { absolute: `${county.name} Child Support 2026 | WSCSS` };
  const description = `Calculate 2026 child support in ${county.name}, WA. Courthouse address, filing fee, SSR rules ($${ssr}), and filing guides under RCW 26.19.`.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://wscss.site/washington-courts/${county.slug}`,
    },
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
          alt: `${county.name} Child Support Calculator & Court Guide 2026 | WSCSS`,
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
  const isHighIncome = income > 50000;

  // Base values
  const countyNameTitle = county ? county.name : "Washington State";
  const countyNameDesc = county ? `${county.name}, WA` : "Washington State";
  const courtRulesName = county
    ? `${county.name} court rules`
    : "Washington State court rules";

  const formattedIncome = `$${formatNumber(income)}`;
  const formattedSupport = isHighIncome
    ? "Court Discretion"
    : `$${formatNumber(Math.round(amount))}`;

  // Capitalization: Title uses "Child/Children", Description uses "child/children"
  const childrenTextTitle = children === 1 ? "1 Child" : `${children} Children`;
  const childrenTextDesc = children === 1 ? "1 child" : `${children} children`;

  // New Title Pattern:
  // [countyName] Child Support: [formattedIncome] Income, [childrenText] (2026) | [formattedSupport]/mo
  const titleText = isHighIncome
    ? `${countyNameTitle} Child Support: ${formattedIncome} Income, ${childrenTextTitle} (2026) | Court Discretion`
    : `${countyNameTitle} Child Support: ${formattedIncome} Income, ${childrenTextTitle} (2026) | ${formattedSupport}/mo`;

  // New Description Pattern:
  // Standard: What is child support for [children] at [income] in [location]? The 2026 presumptive amount is [amount]. See how SSR, deviations, and [rules] affect your final order.
  // Court Discretion: What is child support for [children] at [income] in [location]? See how SSR, deviations, and [rules] determine your final order.
  const descriptionText = isHighIncome
    ? `What is child support for ${childrenTextDesc} at ${formattedIncome}/mo in ${countyNameDesc}? See how SSR, deviations, and ${courtRulesName} determine your final order.`
    : `What is child support for ${childrenTextDesc} at ${formattedIncome}/mo in ${countyNameDesc}? The 2026 presumptive amount is ${formattedSupport}/mo. See how SSR, deviations, and ${courtRulesName} affect your final order.`;

  return {
    title: { absolute: titleText },
    description: descriptionText,
    alternates: {
      canonical: `https://wscss.site/${slug}`,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: `https://wscss.site/${slug}`,
      siteName: "WSCSS — Washington State Child Support Schedule",
      images: [
        {
          url: "https://wscss.site/wscss-og.webp",
          width: 1200,
          height: 630,
          alt: `Child Support for ${formattedIncome} Income in ${countyNameTitle} 2026 | WSCSS`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: ["https://wscss.site/wscss-og.webp"],
    },
  };
}

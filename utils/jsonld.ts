import { FaqItem } from "@/data/washingtonCounties";

/**
 * Generates FAQPage schema for county pages.
 */
export function getFaqPageSchema(faqs: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Generates WebPage schema for county pages.
 */
export function getWebPageSchema(params: {
  name: string;
  description: string;
  url: string;
  dateModified: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "dateModified": params.dateModified,
    "publisher": {
      "@type": "Organization",
      "name": "WSCSS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wscss.site/wscss-og.webp",
      },
    },
  };
}

/**
 * Generates BreadcrumbList schema used on both county and income pages.
 */
export function getBreadcrumbSchema(crumbs: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url,
    })),
  };
}

/**
 * Generates LocalBusiness (GovernmentOffice) schema for courthouse info.
 */
export function getCourthouseSchema(params: {
  countyName: string;
  courthouseName: string;
  courthouseAddress: string;
  courthousePhone: string;
  courthouseUrl?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    "name": params.courthouseName,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": params.courthouseAddress,
      "addressRegion": "WA",
      "addressCountry": "US",
    },
    "telephone": params.courthousePhone,
    "url": params.courthouseUrl || "https://wscss.site/washington-courts",
    "parentOrganization": {
      "@type": "GovernmentOrganization",
      "name": "Washington State Administrative Office of the Courts",
      "url": "https://www.courts.wa.gov",
    },
  };
}

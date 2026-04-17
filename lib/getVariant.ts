import { contentVariants } from './contentVariants';
import { cleanEmDashContent } from './textOptimizer';

/**
 * Generates a deterministic hash from a string (the slug).
 * This is a simple implementation of the Java String.hashCode() algorithm.
 */
function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Selects a variant index for each section based on the slug's hash.
 * This ensures that for a given slug, the content is always the same,
 * but different slugs will have different content combinations.
 */
export function getVariantIndices(slug: string) {
  const hash = getHash(slug);
  
  return {
    introIndex: hash % contentVariants.introductions.length,
    calcIndex: (hash + 1) % contentVariants.calculations.length,
    ssrIndex: (hash + 2) % contentVariants.ssrExplanations.length,
    conclusionIndex: (hash + 3) % contentVariants.conclusions.length,
    legalIndex: (hash + 4) % contentVariants.legalDisclaimers.length,
  };
}

/**
 * Replaces placeholders in the variant text with actual values.
 */
export function formatVariant(
  text: string, 
  values: { 
    formattedIncome: string; 
    formattedSupport: string; 
    childrenText: string; 
    countyName: string;
    locationName: string;
  }
): string {
  const formatted = text
    .replace(/{formattedIncome}/g, values.formattedIncome)
    .replace(/{formattedSupport}/g, values.formattedSupport)
    .replace(/{childrenText}/g, values.childrenText)
    .replace(/{countyName}/g, values.countyName)
    .replace(/{locationName}/g, values.locationName);
    
  return cleanEmDashContent(formatted);
}

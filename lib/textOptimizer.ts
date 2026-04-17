/**
 * Utility to clean excessive em dashes from programmatic content.
 * Reduces AI footprint and improves readability.
 */
export function cleanEmDashContent(text: string): string {
  if (!text || typeof text !== 'string') return text;
  
  // 1. Replace pairs of em dashes first (e.g., "The system — updated — works")
  let processed = text.replace(/(?:\s*)—(?:\s*)(.*?)(?:\s*)—(?:\s*)/g, (match, innerText, offset) => {
    // Deterministic style choice based on position
    if (offset % 2 === 0) {
      return `, ${innerText.trim()}, `;
    } else {
      return ` (${innerText.trim()}) `;
    }
  });

  // 2. Replace remaining single em dashes
  processed = processed.replace(/(?:\s*)—(?:\s*)/g, (match, offset) => {
    // Keep a natural dash about 20% of the time
    if (offset % 5 === 0) return ' — ';
    
    // Remainder: Alternate between period (split sentence) and comma
    if (offset % 2 === 0) return '. ';
    return ', ';
  });

  // 3. Fix Capitalization after a newly inserted period
  processed = processed.replace(/\.\s+([a-z])/g, (match, letter) => `. ${letter.toUpperCase()}`);
  
  // 4. Clean up spaces that might have been distorted
  processed = processed.replace(/\s+,/g, ',');
  processed = processed.replace(/\s+\./g, '.');
  processed = processed.replace(/\s+/g, ' ');
  processed = processed.replace(/\(\s+/g, '(');
  processed = processed.replace(/\s+\)/g, ')');
  
  return processed.trim();
}

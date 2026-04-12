"use client";

import { useEffect } from 'react';

/**
 * PerformanceMonitor: Invisible utility to log RUM (Real User Metrics) in development.
 * Uses dynamic import pattern to ensure it never runs during SSR/pre-rendering.
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only runs in browser, never during SSR
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;

    const handleTTI = () => {
      const now = performance.now();
      console.log(
        `%c[WCSSC Performance] TTI Approx: ${now.toFixed(0)}ms`,
        "color: #4F46E5; font-weight: bold;"
      );
    };

    if (document.readyState === 'complete') {
      handleTTI();
    } else {
      window.addEventListener('load', handleTTI, { once: true });
    }
  }, []);

  return null;
}

import React from 'react';
import { Metadata } from 'next';
import { ComparisonToolClient as ComparisonTool } from '@/components/ClientDynamic';
import CalculatorSchema from '@/components/CalculatorSchema';

export const metadata: Metadata = {
  title: '2024 vs 2026 Child Support Comparison | WCSSC',
  description: 'Compare Washington State child support guidelines for 2024 and 2026. See how the new SSR ($1,514) and expanded economic tables impact your payments.',
  alternates: { canonical: 'https://wcssc.site/compare-2024-2026' },
};

export default function CompareToolPage() {
  return (
    <div className="flex-1 bg-slate-50 relative w-full overflow-hidden font-sans min-h-screen">
      <CalculatorSchema year={2026} url="https://wcssc.site/compare-2024-2026" />
      <ComparisonTool />
    </div>
  );
}

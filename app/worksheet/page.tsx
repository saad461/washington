import { Metadata } from 'next';
import { WorksheetWizardClient as WorksheetWizard } from '@/components/ClientDynamic';

export const metadata: Metadata = {
  title: 'Worksheet Pro Wizard — 2026 WA Official Child Support | WCSSC',
  description: 'Complete the official 8-part Washington State Child Support Worksheet online. Real-time calculations for both parents using 2026 AOC guidelines. Free, accurate, court-ready.',
  alternates: { canonical: 'https://wcssc.site/worksheet' },
  openGraph: {
    title: 'Worksheet Pro Wizard — 2026 WA Child Support',
    description: 'Step-by-step 2026 Washington Child Support Worksheet. Covers all 8 mandatory parts: income, deductions, net income, proportional share, and final transfer payment.',
    url: 'https://wcssc.site/worksheet',
    siteName: 'WCSSC',
    images: [{ url: '/wcssc-og.jpg', width: 1200, height: 630, alt: 'WCSSC Worksheet Pro Wizard' }],
    locale: 'en_US',
    type: 'website',
  },
};

import CalculatorSchema from '@/components/CalculatorSchema';
import Link from 'next/link';

export default function WorksheetPage() {
  return (
    <div className="flex-1 w-full bg-white font-sans">
      <CalculatorSchema url="https://wcssc.site/worksheet" />
      <WorksheetWizard />

      {/* AI Search Optimization (AEO) Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Example Calculation</h2>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Support Scenario: $5,000 Income in King County</h3>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm mb-10">
            <p className="mb-3 text-gray-700"><strong>Input:</strong> Combined Monthly Net Income: $5,000 | Children: 2 | County: King County</p>
            <p className="mb-6 text-gray-900 font-bold"><strong>Output:</strong> Estimated Monthly Basic Support Obligation: $1,155</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              <strong>Short explanation:</strong> In King County, courts use the standard Washington State economic table. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,155. This amount may be split proportionally between parents based on their respective incomes, and may not include extraordinary expenses like healthcare or daycare.
            </p>
          </div>
          
          <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            Want to know how we arrived at these figures? 
            <Link href="/editorial-methodology" className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 hover:text-indigo-700">
              Read our Editorial Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

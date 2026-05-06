import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';

interface RelatedCalculationsProps {
  countySlug: string;
  countyName: string;
}

const POPULOUS_COUNTIES = [
  { name: "King County", slug: "king-county" },
  { name: "Pierce County", slug: "pierce-county" },
  { name: "Snohomish County", slug: "snohomish-county" },
  { name: "Spokane County", slug: "spokane-county" },
];

const RelatedCalculations: React.FC<RelatedCalculationsProps> = ({ countySlug, countyName }) => {
  const nearbyIncomeTiers = [3000, 4000, 5000, 7500];

  // Get comparison counties, excluding the current one
  const comparisonCounties = POPULOUS_COUNTIES
    .filter(c => c.slug !== countySlug)
    .slice(0, 3);

  return (
    <section className="section-default bg-white border-t border-gray-100">
      <div className="container-wide">
        <div className="flex flex-col items-center mb-8">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            More Calculations
          </p>
          <h2 className="text-4xl font-bold text-center text-gray-900">Explore Related Calculations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-5xl mx-auto">
          {/* Subsection 1 — Nearby Income Tiers */}
          <div className="p-10 bg-[var(--color-bg-subtle)] rounded-3xl border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8">Nearby Income Tiers</h3>
            <div className="flex flex-wrap gap-3">
              {nearbyIncomeTiers.map((income) => (
                <Link
                  key={income}
                  href={`/${countySlug}-income-${income}-2-children`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  Estimate ${income.toLocaleString()} for 2 Children →
                </Link>
              ))}
            </div>
          </div>

          {/* Subsection 2 — Compare Washington Counties */}
          <div className="p-10 bg-[var(--color-bg-subtle)] rounded-3xl border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8">Compare Washington Counties</h3>
            <div className="flex flex-wrap gap-3">
              {comparisonCounties.map((c) => (
                <Link
                  key={c.slug}
                  href={`/washington-courts/${c.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  <MapPin
                    size={14}
                    className="text-gray-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {c.name} Child Support Guide →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedCalculations;

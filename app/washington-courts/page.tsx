import { Metadata } from 'next';
import Link from 'next/link';
import { washingtonCounties } from '@/data/washingtonCounties';
import { MapPin, Phone, Building2, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Washington Child Support Courthouses & Filing Directory (2026)',
  description: 'Find official local filing addresses, clerk phone numbers, and family court addresses for all 39 Washington counties. Verified 2026 data.',
  alternates: { canonical: 'https://wcssc.site/washington-courts' },
};

export default function CourtsIndex() {
  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Statewide Directory
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington Child Support <span className="text-blue-600">Filing Directory</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              While the economic tables are statewide, enforcing and filing your order is localized. Find your specific county courthouse and clerk contact information.
            </p>
          </div>
        </div>
      </section>

      {/* ── COURTS GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {washingtonCounties.map((court) => (
              <Link
                key={court.slug}
                href={`/washington-courts/${court.slug}`}
                className="group card-standard flex flex-col hover:border-blue-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-blue-600 transition-colors">
                    {court.name}
                  </h2>
                  <div className="p-2 rounded-full bg-[var(--color-bg-subtle)] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <p className="text-sm text-[var(--color-text-body)] leading-relaxed">
                      {court.courtAddress}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Phone className="w-4 h-4 shrink-0" />
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      {court.clerkPhone}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSING COURTHOUSE ─────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="card-standard border-dashed border-2 border-gray-200 !p-12 text-center shadow-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-text-primary)]">Missing a Courthouse?</h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              If a local courthouse has moved or contact information has changed, please contact our editorial team so we can update our 2026 directory.
            </p>
            <Link href="/contact" className="btn-primary-lg btn-primary !rounded-full">
              Contact Support Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

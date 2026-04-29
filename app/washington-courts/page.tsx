import { Metadata } from 'next';
import Link from 'next/link';
import { washingtonCounties } from '@/data/washingtonCounties';
import { MapPin, Phone, Building2, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Washington Child Support Courthouses & Filing Directory (2026)',
  description: 'Find official local filing addresses, clerk phone numbers, and family court addresses for all 39 Washington counties. Verified 2026 data.',
  alternates: { canonical: 'https://wcssc.site/washington-courts' },
};

export default function CourtsIndex() {
  return (
    <main className="flex-1 bg-white">
      <div className="container-wide section-default relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-2xl mb-8 shadow-[var(--shadow-card)]">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[var(--color-text-primary)]">
            Washington Child Support Filing Directory
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            While the economic tables are statewide, enforcing and filing your child support order is intensely localized. Find your specific county courthouse, clerk phone number, and physical address for filing family law documents in 2026.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {washingtonCounties.map((court) => (
            <Link
              key={court.slug}
              href={`/washington-courts/${court.slug}`}
              className="group card-standard flex flex-col hover:border-[var(--color-success)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-success)] transition-colors">
                  {court.name}
                </h2>
                <div className="p-2 rounded-full bg-[var(--color-bg-subtle)] group-hover:bg-[var(--color-success-bg)] group-hover:text-[var(--color-success)] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg group-hover:bg-[var(--color-success-bg)] group-hover:text-[var(--color-success)] transition-colors">
                    <MapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-sm text-[var(--color-text-body)] leading-relaxed">
                    {court.courtAddress}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[var(--color-bg-subtle)] rounded-lg group-hover:bg-[var(--color-success-bg)] group-hover:text-[var(--color-success)] transition-colors">
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

        <section className="card-standard bg-[var(--color-bg-subtle)] border-dashed border-2 border-[var(--color-bg-border)] !p-12 text-center shadow-none mt-24 md:mt-32">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-text-primary)]">Missing a Courthouse?</h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            If a local courthouse has moved or contact information has changed, please contact our editorial team so we can update our 2026 directory.
          </p>
          <Link href="/contact" className="btn-primary-lg btn-primary !rounded-full">
            Contact Support Team
          </Link>
        </section>
      </div>
    </main>
  );
}

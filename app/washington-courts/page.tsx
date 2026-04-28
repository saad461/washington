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
    <main className="flex-1 w-full">
      <div className="container section relative z-10">

        <header className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          <div className="inline-flex p-4 bg-brand-light text-brand rounded-2xl mb-8">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-display mb-8">
            Washington Filing Directory
          </h1>
          <p className="text-body-lg">
            Enforcing and filing your child support order is intensely localized. Find your specific county courthouse, clerk phone, and address for 2026.
          </p>
        </header>

        <div className="card-grid-3">
          {washingtonCounties.map((court) => (
            <Link
              key={court.slug}
              href={`/washington-courts/${court.slug}`}
              className="group card hover:border-brand flex flex-col transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h4 group-hover:text-brand transition-colors">
                  {court.name}
                </h2>
                <div className="p-2 rounded-full bg-bg-subtle group-hover:bg-brand group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-bg-subtle rounded-lg group-hover:bg-brand-light group-hover:text-brand transition-colors">
                    <MapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-sm text-text-muted mb-0">
                    {court.courtAddress}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-bg-subtle rounded-lg group-hover:bg-brand-light group-hover:text-brand transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-sm font-bold text-text-primary mb-0">
                    {court.clerkPhone}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-24 section-inverse p-8 md:p-12 rounded-3xl text-center shadow-xl">
          <h2 className="text-h2 !text-white mb-6">Missing a Courthouse?</h2>
          <p className="text-body-lg !text-white opacity-80 mb-8 max-w-2xl mx-auto">
            If a local courthouse has moved or contact information has changed, please contact our editorial team so we can update our directory.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact Support Team
          </Link>
        </section>
      </div>
    </main>
  );
}

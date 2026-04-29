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
    <main className="flex-1 bg-page">
      <div className="container-wide section-default relative z-10">

        <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-8 shadow-sm">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Washington Child Support Filing Directory
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            While the economic tables are statewide, enforcing and filing your child support order is intensely localized. Find your specific county courthouse, clerk phone number, and physical address for filing family law documents in 2026.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {washingtonCounties.map((court) => (
            <Link
              key={court.slug}
              href={`/washington-courts/${court.slug}`}
              className="group card-standard flex flex-col hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {court.name}
                </h2>
                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <MapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {court.courtAddress}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {court.clerkPhone}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-24 md:mt-32 p-8 md:p-12 bg-gray-900 rounded-3xl text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-6">Missing a Courthouse?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            If a local courthouse has moved or contact information has changed, please contact our editorial team so we can update our 2026 directory.
          </p>
          <Link href="/contact" className="btn-primary w-full md:w-fit px-8 py-4 inline-flex">
            Contact Support Team
          </Link>
        </section>
      </div>
    </main>
  );
}

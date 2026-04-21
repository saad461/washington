import { Metadata } from 'next';
import Link from 'next/link';
import { washingtonCounties } from '@/data/washingtonCounties';
import { MapPin, Phone, Building2 } from 'lucide-react';

export const metadata: Metadata = {
 title: 'Washington Child Support Courthouses & Filing Directory (2026)',
 description: 'Find official local filing addresses, clerk phone numbers, and family court addresses for all 39 Washington counties. Verified 2026 data.',
 alternates: { canonical: 'https://wcssc.site/washington-courts' },
};

export default function CourtsIndex() {
 return (
 <div className="flex-1 bg-gray-50 relative w-full overflow-hidden font-sans">
 <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 relative z-10">

 <div className="mb-16 text-center max-w-3xl mx-auto">
 <div className="inline-flex p-3 bg-emerald-50 text-emerald-500 rounded-xl mb-6">
 <Building2 className="w-8 h-8" />
 </div>
 <h1 className=" mb-6 drop-shadow-sm ">
 Washington Child Support Filing Directory
 </h1>
 <p className="text-lg ">
 While the economic tables are statewide, enforcing and filing your child support order is intensely localized. Find your specific county courthouse, clerk phone number, and physical address for filing family law documents in 2026.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {washingtonCounties.map((court) => (
 <Link
 key={court.slug}
 href={`/washington-courts/${court.slug}`}
 className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-sm hover:shadow-emerald-900/5 transition-all group"
 >
 <h2 className=" mb-4 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
 <span>{court.name}</span>
 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest bg-gray-50 px-2 py-1 rounded-lg">View</span>
 </h2>

 <div className="space-y-3">
 <div className="flex items-start gap-3">
 <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
 <p className="text-sm ">
 {court.courtAddress}
 </p>
 </div>
 <div className="flex items-center gap-3">
 <Phone className="w-4 h-4 shrink-0" />
 <p className="text-sm ">
 {court.clerkPhone}
 </p>
 </div>
 </div>
 </Link>
 ))}
 </div>

 </div>
 </div>
 );
}

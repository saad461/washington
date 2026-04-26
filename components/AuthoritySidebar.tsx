import React from 'react';
import { 
 ShieldCheck,
 ExternalLink,
 FileText,
 Gavel,
 HelpCircle,
 MapPin,
 Clock,
 Globe
} from 'lucide-react';
import { WashingtonCounty } from '@/data/washingtonCounties';
import SearchMock from './SearchMock';

interface AuthoritySidebarProps {
 county: WashingtonCounty | null;
}

const AuthoritySidebar: React.FC<AuthoritySidebarProps> = ({ county }) => {
 return (
 <aside className="w-full space-y-10 no-print font-sans">
 {/* 1. Verified Status Badge */}
 <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
 <div className="flex items-center gap-3 mb-6 relative z-10">
 <ShieldCheck className="w-6 h-6 text-indigo-400" />
 <span className="label-metadata">Verified Legal Source</span>
 </div>
 <h3 className="font-semibold mb-4 relative z-10 leading-tight font-heading">2026 Data Synchronized</h3>
 <p className=" text-sm leading-relaxed mb-8">
 This calculator is calibrated to the official 2026 Washington State Child Support Schedule.
 </p>
 <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-[4px] label-metadata !text-emerald-400 border border-gray-700">
 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
 Status: LIVE 2026
 </div>
 </div>

 {/* 2. Interactive Search */}
 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-visible">
 <h3 className="label-metadata font-semibold uppercase mb-6 flex items-center gap-2">
 <Gavel className="w-4 h-4 " />
 Change Location
 </h3>
 <div className="relative">
 <SearchMock isSidebar />
 </div>
 </div>

 {/* 3. Official Source Links (E-E-A-T) */}
 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
 <h3 className="label-metadata font-semibold uppercase mb-8">Official Authorities</h3>
 <div className="space-y-3">
 {[
 { label: "WA DSHS Support Center", url: "https://www.dshs.wa.gov/esa/division-child-support", icon: Globe },
 { label: "State Court Forms", url: "https://www.courts.wa.gov/forms/", icon: FileText },
 { label: "Legal WA Resource Portal", url: "https://www.washingtonlawhelp.org/", icon: HelpCircle }
 ].map((link, i) => (
 <a
 key={i}
 href={link.url}
 target="_blank"
 rel="noopener noreferrer"
 className="group flex items-center justify-between p-[10px_0] bg-white border-b border-gray-100 hover:border-indigo-400 transition-all"
 >
 <div className="flex items-center gap-[10px]">
 <div className="w-5 h-5 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors shrink-0">
 <ExternalLink size={14} className=" group-hover:text-indigo-600" />
 </div>
 <span className="label-metadata group-hover:text-indigo-600 transition-colors">{link.label}</span>
 </div>
 </a>
 ))}
 </div>
 </div>

 {/* 4. Local Quick Info (If county exists) */}
 {county && (
 <div className="p-6 border border-gray-100 rounded-xl border-dashed bg-white">
 <div className="flex items-center gap-3 mb-6">
 <MapPin className="w-5 h-5 text-indigo-600" />
 <h4 className="label-metadata font-semibold uppercase ">{county.name} Filing Info</h4>
 </div>
 <p className="label-metadata mb-2">Primary Seat: {county.seat}</p>
 <p className="label-metadata leading-relaxed mb-6">{county.courtAddress}</p>
 <div className="flex items-center gap-2 label-metadata ">
 <Clock className="w-3 h-3" />
 Clerk: {county.clerkPhone}
 </div>
 </div>
 )}
 </aside>
 );
};

export default AuthoritySidebar;

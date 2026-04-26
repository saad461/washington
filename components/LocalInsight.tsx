import React from 'react';
import { 
 MapPin,
 PhoneCall,
 Scale,
 Info,
 DollarSign,
 ExternalLink
} from 'lucide-react';
import { WashingtonCounty } from '@/data/washingtonCounties';

interface LocalInsightProps {
 county: WashingtonCounty;
}

const LocalInsight: React.FC<LocalInsightProps> = ({ county }) => {
 return (
 <section className="container-reading section-default">
 <div className="card-standard !p-0 overflow-hidden group shadow-xl">
 <div className="flex flex-col md:flex-row">
 {/* Left Side: Courthouse Identity */}
 <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100">
 <div className="flex items-center gap-4 mb-8">
 <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20">
 <Scale className="w-6 h-6 text-white" />
 </div>
 <div>
 <h2 className="text-lg font-bold leading-none mb-2 text-gray-900">Local Authority</h2>
 <p className="label-metadata text-indigo-600">{county.name} Filing Guide</p>
 </div>
 </div>

 <h3 className="text-xl font-bold text-gray-900 mb-8 italic tracking-tight">{county.court}</h3>

 <div className="space-y-6">
 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 transition-colors group-hover/item:bg-indigo-50">
 <MapPin className="w-5 h-5 text-indigo-600" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-gray-400">Courthouse Address</p>
 <p className="text-sm font-semibold text-gray-700 leading-relaxed">{county.courtAddress}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 transition-colors group-hover/item:bg-emerald-50">
 <PhoneCall className="w-5 h-5 text-emerald-600" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-gray-400">Clerk of the Court</p>
 <p className="text-sm font-bold text-gray-900">{county.clerkPhone}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 transition-colors group-hover/item:bg-indigo-50">
 <DollarSign className="w-5 h-5 text-indigo-600" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-gray-400">Standard Filing Fee</p>
 <p className="text-sm font-bold text-gray-900">{county.filingFee}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Side: Pro-Tips & Intent */}
 <div className="flex-1 p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-6">
 <Info className="w-5 h-5 text-indigo-600" />
 <p className="label-metadata text-gray-900 font-bold">Jurisdictionary Insight</p>
 </div>

 <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm mb-8 relative group/tip hover:border-indigo-600 transition-colors">
 <p className="text-gray-900 font-medium leading-relaxed italic text-lg">
 &quot;{county.localTip}&quot;
 </p>
 </div>

 <a
 href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-primary w-full md:w-fit px-8 h-14 flex items-center justify-center gap-3 shadow-lg"
 >
 <span>Visit Official Court Portal</span>
 <ExternalLink className="w-4 h-4" />
 </a>
 </div>
 </div>
 </div>
 </section>
 );
};

export default LocalInsight;

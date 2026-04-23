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
 <section className="container-reading mb-16 md:mb-24 px-6 md:px-0">
 <div className="card-standard !p-0 overflow-hidden group">
 <div className="flex flex-col md:flex-row">
 {/* Left Side: Courthouse Identity */}
 <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-default">
 <div className="flex items-center gap-4 mb-8">
 <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20">
 <Scale className="w-6 h-6 text-white" />
 </div>
 <div>
 <h2 className="text-lg font-bold leading-none mb-1 text-heading">Local Authority</h2>
 <p className="label-metadata">{county.name} Filing Guide</p>
 </div>
 </div>

 <h3 className="text-xl font-bold text-heading mb-8 italic tracking-tight">{county.court}</h3>

 <div className="space-y-6">
 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-border-default transition-colors group-hover/item:bg-indigo-50">
 <MapPin className="w-5 h-5 text-indigo-600" />
 </div>
 <div>
 <p className="label-metadata mb-1">Courthouse Address</p>
 <p className="text-sm font-semibold text-body leading-relaxed">{county.courtAddress}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-border-default transition-colors group-hover/item:bg-emerald-50">
 <PhoneCall className="w-5 h-5 text-emerald-600" />
 </div>
 <div>
 <p className="label-metadata mb-1">Clerk of the Court</p>
 <p className="text-sm font-bold text-heading">{county.clerkPhone}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-border-default transition-colors group-hover/item:bg-indigo-50">
 <DollarSign className="w-5 h-5 text-indigo-600" />
 </div>
 <div>
 <p className="label-metadata mb-1">Standard Filing Fee</p>
 <p className="text-sm font-bold text-heading">{county.filingFee}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Side: Pro-Tips & Intent */}
 <div className="flex-1 p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-6">
 <Info className="w-5 h-5 text-indigo-600" />
 <p className="label-metadata text-heading">Jurisdictionary Insight</p>
 </div>

 <div className="p-6 bg-white rounded-2xl border border-border-default shadow-sm mb-8 relative group/tip hover:border-indigo-600 transition-colors">
 <p className="text-heading font-medium leading-relaxed italic text-lg">
 &quot;{county.localTip}&quot;
 </p>
 </div>

 <a
 href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-primary w-full shadow-lg"
 >
 <span>Visit Official Court Portal</span>
 <ExternalLink className="w-4 h-4 ml-1" />
 </a>
 </div>
 </div>
 </div>
 </section>
 );
};

export default LocalInsight;

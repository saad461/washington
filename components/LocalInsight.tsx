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
 <section className="w-full max-w-3xl mx-auto mb-24 px-6 md:px-0">
 <div className="bg-white rounded-2xl border-2 border-gray-50 shadow-sm shadow-indigo-900/5 overflow-hidden transition-all hover:shadow-indigo-900/10">
 <div className="flex flex-col md:flex-row">
 {/* Left Side: Courthouse Identity */}
 <div className="flex-1 p-12 md:p-16 border-b md:border-b-0 md:border-r border-gray-50">
 <div className="flex items-center gap-4 mb-10">
 <div className="p-3 bg-indigo-600 rounded-2xl shadow-sm shadow-indigo-500/20">
 <Scale className="w-6 h-6 text-white" />
 </div>
 <div>
 <h2 className="font-semibold leading-none mb-2">Local Authority</h2>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase">{county.name} Filing Guide</p>
 </div>
 </div>

 <h3 className="font-semibold text-gray-800 mb-8 italic tracking-tight">{county.court}</h3>

 <div className="space-y-8">
 <div className="flex items-start gap-5 group">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-50">
 <MapPin className="w-5 h-5 group-hover:" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mb-1">Courthouse Address</p>
 <p className="text-sm font-medium leading-snug">{county.courtAddress}</p>
 </div>
 </div>

 <div className="flex items-start gap-5 group">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-emerald-50">
 <PhoneCall className="w-5 h-5 group-hover:text-emerald-500" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mb-1">Clerk of the Court</p>
 <p className="text-sm font-medium ">{county.clerkPhone}</p>
 </div>
 </div>

 <div className="flex items-start gap-5 group">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-50">
 <DollarSign className="w-5 h-5 group-hover:" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mb-1">Standard Filing Fee</p>
 <p className="text-sm font-medium ">{county.filingFee}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Side: Pro-Tips & Intent */}
 <div className="flex-1 p-12 md:p-16 bg-gray-50/50 flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-8">
 <Info className="w-5 h-5 text-indigo-600" />
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase ">Jurisdictionary Insight</p>
 </div>

 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 relative group hover:border-indigo-500 transition-colors">
 <p className=" font-medium leading-relaxed italic text-lg">
 &quot;{county.localTip}&quot;
 </p>
 </div>

 <a
 href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-between p-6 bg-gray-900 rounded-2xl text-white font-medium text-sm transition-all hover:bg-gray-100 hover:shadow-sm active:scale-95 group"
 >
 <span>Visit Official Court Portal</span>
 <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
 <ExternalLink className="w-4 h-4 text-white" />
 </div>
 </a>
 </div>
 </div>
 </div>
 </section>
 );
};

export default LocalInsight;

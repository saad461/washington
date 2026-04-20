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
    <section className="w-full max-w-4xl mx-auto mb-24 px-6 md:px-0">
      <div className="bg-white rounded-2xl border-2 border-gray-50 shadow-2xl shadow-indigo-900/5 overflow-hidden transition-all hover:shadow-indigo-900/10">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Courthouse Identity */}
          <div className="flex-1 p-12 md:p-16 border-b md:border-b-0 md:border-r border-gray-50">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-none mb-2">Local Authority</h2>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{county.name} Filing Guide</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-8 italic tracking-tight">{county.court}</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-50">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Courthouse Address</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{county.courtAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-emerald-50">
                  <PhoneCall className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Clerk of the Court</p>
                  <p className="text-sm font-bold text-gray-900">{county.clerkPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-50">
                  <DollarSign className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Standard Filing Fee</p>
                  <p className="text-sm font-bold text-gray-900">{county.filingFee}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Pro-Tips & Intent */}
          <div className="flex-1 p-12 md:p-16 bg-gray-50/50 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-5 h-5 text-indigo-500" />
              <p className="text-xs font-bold text-indigo-900 uppercase tracking-[0.2em]">Jurisdictionary Insight</p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 relative group hover:border-indigo-500 transition-colors">
              <p className="text-gray-600 font-medium leading-relaxed italic text-lg">
                &quot;{county.localTip}&quot;
              </p>
            </div>

            <a 
              href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-6 bg-gray-900 rounded-2xl text-white font-bold text-sm transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95 group"
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

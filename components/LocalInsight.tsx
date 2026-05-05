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
 <div className="card-standard !p-0 overflow-hidden group shadow-[var(--shadow-card-hover)]">
 <div className="flex flex-col md:flex-row">
 {/* Left Side: Courthouse Identity */}
 <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--color-bg-border-soft)]">
 <div className="flex items-center gap-4 mb-8">
 <div className="p-3 bg-indigo-600 rounded-2xl shadow-[var(--shadow-card-md)] shadow-indigo-600/20">
 <Scale className="w-6 h-6 text-white" />
 </div>
 <div>
 <h2 className="text-lg font-bold leading-none mb-2 text-[var(--color-text-primary)]">Local Authority</h2>
 <p className="label-metadata text-[var(--color-brand-primary)]">{county.name} Filing Guide</p>
 </div>
 </div>

 <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-8 italic tracking-tight">{county.court}</h3>

 <div className="space-y-6">
 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center shrink-0 border border-[var(--color-bg-border-soft)] transition-colors group-hover/item:bg-indigo-50">
 <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-[var(--color-text-secondary)]">Courthouse Address</p>
 <p className="text-sm font-semibold text-[var(--color-text-secondary)] leading-relaxed">{county.courtAddress}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center shrink-0 border border-[var(--color-bg-border-soft)] transition-colors group-hover/item:bg-emerald-50">
 <PhoneCall className="w-5 h-5 text-[var(--color-success)]" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-[var(--color-text-secondary)]">Clerk of the Court</p>
 <p className="text-sm font-bold text-[var(--color-text-primary)]">{county.clerkPhone}</p>
 </div>
 </div>

 <div className="flex items-start gap-4 group/item">
 <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center shrink-0 border border-[var(--color-bg-border-soft)] transition-colors group-hover/item:bg-indigo-50">
 <DollarSign className="w-5 h-5 text-[var(--color-brand-primary)]" />
 </div>
 <div>
 <p className="label-metadata mb-1 text-[var(--color-text-secondary)]">Standard Filing Fee</p>
 <p className="text-sm font-bold text-[var(--color-text-primary)]">{county.filingFee}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Side: Pro-Tips & Intent */}
 <div className="flex-1 p-8 md:p-12 bg-[var(--color-bg-subtle)] flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-6">
 <Info className="w-5 h-5 text-[var(--color-brand-primary)]" />
 <p className="label-metadata text-[var(--color-text-primary)] font-bold">Jurisdictionary Insight</p>
 </div>

 <div className="p-6 bg-white rounded-3xl border border-[var(--color-bg-border-soft)] shadow-[var(--shadow-card)] mb-8 relative group/tip hover:border-indigo-600 transition-colors">
 <p className="text-[var(--color-text-primary)] font-medium leading-relaxed italic text-lg">
 &quot;{county.localTip}&quot;
 </p>
 </div>

 <a
 href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="btn btn-primary w-full md:w-fit px-8 h-14 flex items-center justify-center gap-3 shadow-[var(--shadow-card-md)]"
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

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
 <section className="container-reading section">
 <div className="card !p-0 overflow-hidden shadow-xl">
 <div className="flex flex-col md:flex-row">
 <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-default">
 <div className="flex items-center gap-4 mb-8">
 <div className="p-3 bg-brand rounded-2xl shadow-lg shadow-brand/20">
 <Scale className="w-6 h-6 text-white" />
 </div>
 <div>
 <h2 className="text-h4 !mb-1">Local Authority</h2>
 <p className="text-overline">{county.name} Filing Guide</p>
 </div>
 </div>

 <h3 className="text-h3 italic mb-8 tracking-tight">{county.court}</h3>

 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center shrink-0 border border-border-default">
 <MapPin className="w-5 h-5 text-brand" />
 </div>
 <div>
 <p className="text-overline mb-1 !text-text-muted">Courthouse Address</p>
 <p className="text-body font-semibold mb-0">{county.courtAddress}</p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center shrink-0 border border-border-default">
 <PhoneCall className="w-5 h-5 text-success" />
 </div>
 <div>
 <p className="text-overline mb-1 !text-text-muted">Clerk of the Court</p>
 <p className="text-body font-bold mb-0">{county.clerkPhone}</p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center shrink-0 border border-border-default">
 <DollarSign className="w-5 h-5 text-brand" />
 </div>
 <div>
 <p className="text-overline mb-1 !text-text-muted">Standard Filing Fee</p>
 <p className="text-body font-bold mb-0">{county.filingFee}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="flex-1 p-8 md:p-12 bg-bg-subtle flex flex-col justify-center">
 <div className="flex items-center gap-3 mb-6">
 <Info className="w-5 h-5 text-brand" />
 <p className="text-overline !text-text-primary">Jurisdictionary Insight</p>
 </div>

 <div className="p-6 card !bg-white mb-8">
 <p className="text-body font-medium italic text-lg mb-0">
 &quot;{county.localTip}&quot;
 </p>
 </div>

 <a
 href={`https://www.google.com/search?q=${encodeURIComponent(county.court + ' ' + county.name + ' Washington')}`}
 target="_blank"
 rel="noopener noreferrer"
 className="btn btn-primary btn-lg w-full md:w-fit"
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

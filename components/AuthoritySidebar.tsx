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
 {/* 1. Verified Status Badge - Tinted card variant */}
 <div className="card-highlighted !p-8 shadow-[var(--shadow-card)]">
 <div className="flex items-center gap-3 mb-6 relative z-10">
 <ShieldCheck className="w-6 h-6 text-[var(--color-brand-primary)]" />
 <span className="eyebrow !mb-0">Verified Legal Source</span>
 </div>
 <h3 className="font-bold mb-4 relative z-10 leading-tight text-[var(--color-text-primary)]">2026 Data Synchronized</h3>
 <p className="text-sm leading-relaxed mb-8 text-[var(--color-text-body)]">
 This calculator is calibrated to the official 2026 Washington State Child Support Schedule.
 </p>
 <div className="badge-success !px-3 !py-1.5 !rounded-lg !text-[12px] font-bold !font-bold">
 <div className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full animate-pulse mr-2" />
 Status: LIVE 2026
 </div>
 </div>

 {/* 2. Interactive Search */}
 <div className="card-standard !p-6 relative overflow-visible">
 <h3 className="eyebrow !mb-6 flex items-center gap-2">
 <Gavel className="w-4 h-4 " />
 Change Location
 </h3>
 <div className="relative">
 <SearchMock isSidebar />
 </div>
 </div>

 {/* 3. Official Source Links (E-E-A-T) */}
 <div className="card-subtle !p-6">
 <h3 className="eyebrow !mb-8">Official Authorities</h3>
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
 className="group flex items-center justify-between py-4 border-b border-[var(--color-bg-border-soft)] hover:border-[var(--color-brand-primary)] transition-all"
 >
 <div className="flex items-center gap-3">
 <div className="w-5 h-5 rounded-lg bg-[var(--color-bg-subtle)] flex items-center justify-center group-hover:bg-[var(--color-brand-primary-light)] transition-colors shrink-0">
 <ExternalLink size={14} className="group-hover:text-[var(--color-brand-primary)]" />
 </div>
 <span className="text-[13px] font-semibold text-[var(--color-text-body)] group-hover:text-[var(--color-brand-primary)] transition-colors uppercase tracking-wider">{link.label}</span>
 </div>
 </a>
 ))}
 </div>
 </div>

 {/* 4. Local Quick Info (If county exists) */}
 {county && (
 <div className="p-6 border border-[var(--color-bg-border)] rounded-xl border-dashed bg-white">
 <div className="flex items-center gap-3 mb-6">
 <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
 <h4 className="eyebrow !mb-0">{county.name} Filing Info</h4>
 </div>
 <div className="space-y-2">
 <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Primary Seat: {county.seat}</p>
 <p className="text-[13px] font-medium leading-relaxed text-[var(--color-text-body)] mb-4">{county.courtAddress}</p>
 <div className="flex items-center gap-2 text-[var(--color-brand-primary)] font-bold text-[12px]">
 <Clock className="w-3 h-3" />
 Clerk: {county.clerkPhone}
 </div>
 </div>
 </div>
 )}
 </aside>
 );
};

export default AuthoritySidebar;

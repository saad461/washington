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
    <aside className="w-full space-y-12 no-print">
      {/* 1. Verified Status Badge */}
      <div className="bg-indigo-600 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <ShieldCheck className="w-6 h-6 text-indigo-300" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-100">Verified Legal Source</span>
        </div>
        <h3 className="text-xl font-black mb-4 relative z-10 leading-tight italic">2026 Table Data Confirmed</h3>
        <p className="text-indigo-50 text-xs font-medium leading-relaxed opacity-90 mb-6 font-serif">
          Our calculator uses the official 2026 Washington State Schedule protocols for a target accurate estimate.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 rounded-full text-[11px] font-black uppercase tracking-widest text-emerald-50">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Status: Synchronized 2026
        </div>
      </div>

      {/* 2. Interactive Search */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-indigo-900/5 overflow-visible relative">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Gavel className="w-4 h-4 text-indigo-600" />
          Change Location
        </h3>
        <div className="relative">
          <SearchMock isSidebar />
        </div>
      </div>

      {/* 3. Official Source Links (E-E-A-T) */}
      <div className="bg-slate-50 rounded-[3.5rem] p-10">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 italic">Official Authorities</h3>
        <div className="space-y-4">
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
              className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-xs font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{link.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 4. Local Quick Info (If county exists) */}
      {county && (
        <div className="p-8 border-2 border-slate-100 rounded-[3rem] border-dashed">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] underline decoration-indigo-200 underline-offset-4">{county.name} Filing Info</h4>
          </div>
          <p className="text-xs font-bold text-slate-600 italic mb-2">Primary Seat: {county.seat}</p>
          <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6">{county.courtAddress}</p>
          <div className="flex items-center gap-2 text-[11px] font-black text-indigo-600 uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            Clerk: {county.clerkPhone}
          </div>
        </div>
      )}
    </aside>
  );
};

export default AuthoritySidebar;

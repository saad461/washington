import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  FileText,
  Gavel,
  HelpCircle,
  MapPin,
  Phone,
  Clock,
  Globe
} from 'lucide-react';
import { WashingtonCounty } from '@/data/washingtonCounties';
import SearchMock from './SearchMock';
import AuthorBox from './AuthorBox';

interface CountySidebarProps {
  // Always required
  countyName: string;
  countySlug: string;
  courthouseName: string;
  courthouseAddress: string;
  courthousePhone: string;
  courthousePrimarySeat: string;
  filingFee: number;
  filingFeeIsRange?: boolean;
  courthouseUrl?: string;

  // Income page only — optional
  presumptiveAmount?: number;
  combinedIncome?: number;
  numberOfChildren?: number;
  lastUpdated?: string;
}

const CountySidebar: React.FC<CountySidebarProps> = ({
  countyName,
  courthouseName,
  courthouseAddress,
  courthousePhone,
  courthousePrimarySeat,
  filingFee,
  filingFeeIsRange,
  courthouseUrl,
  presumptiveAmount,
  combinedIncome,
  numberOfChildren,
  lastUpdated
}) => {
  const mapQuery = encodeURIComponent(courthouseAddress);
  const formattedFilingFee = filingFeeIsRange ? `Up to $${filingFee}` : `$${filingFee}`;

  return (
    <aside className="w-full space-y-8 no-print font-sans">
      {/* Section 1 — 2026 Data Synchronized badge */}
      <div className="card-highlighted !p-8 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <ShieldCheck className="w-6 h-6 text-[var(--color-brand-primary)]" />
          <span className="eyebrow !mb-0">Verified Legal Source</span>
        </div>
        <h3 className="font-bold mb-4 relative z-10 leading-tight text-[var(--color-text-primary)]">2026 Data Synchronized</h3>
        <p className="text-sm leading-relaxed mb-8 text-[var(--color-text-body)]">
          This calculator is calibrated to the official 2026 Washington State Child Support Schedule.
        </p>
        <div className="badge-success !px-3 !py-1.5 !rounded-lg !text-[12px] font-bold">
          <div className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full animate-pulse mr-2" />
          Status: LIVE 2026
        </div>
      </div>

      {/* Section 2 — Change Location */}
      <div className="card-standard !p-6 relative overflow-visible">
        <h3 className="eyebrow !mb-6 flex items-center gap-2">
          <Gavel className="w-4 h-4" />
          Change Location
        </h3>
        <div className="relative">
          <SearchMock isSidebar />
        </div>
      </div>

      {/* Section 3 — Official Authorities */}
      <div className="card-subtle !p-6">
        <h3 className="eyebrow !mb-8">Official Authorities</h3>
        <div className="space-y-3">
          {[
            { label: "WA DSHS Support Center", url: "https://www.dshs.wa.gov/esa/division-child-support", icon: Globe, aria: "WA DSHS Support Center — opens in new tab" },
            { label: "State Court Forms", url: "https://www.courts.wa.gov/forms/", icon: FileText, aria: "Washington State Court Forms — opens in new tab" },
            { label: "Legal WA Resource Portal", url: "https://www.washingtonlawhelp.org/", icon: HelpCircle, aria: "Washington Law Help — opens in new tab" }
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.aria}
              className="group flex items-center justify-between py-4 border-b border-[var(--color-bg-border-soft)] hover:border-[var(--color-brand-primary)] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[var(--color-bg-subtle)] flex items-center justify-center group-hover:bg-[var(--color-brand-primary-light)] transition-colors shrink-0">
                  <link.icon size={14} className="group-hover:text-[var(--color-brand-primary)]" />
                </div>
                <span className="text-[13px] font-semibold text-[var(--color-text-body)] group-hover:text-[var(--color-brand-primary)] transition-colors uppercase tracking-wider">{link.label}</span>
              </div>
              <ExternalLink size={14} className="text-gray-400 group-hover:text-[var(--color-brand-primary)]" />
            </a>
          ))}
        </div>
      </div>

      {/* Section 4 — County Filing Info */}
      <div className="card-standard !p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-5 h-5 text-[var(--color-brand-primary)]" />
          <h3 className="eyebrow !mb-0">{countyName} Filing Info</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Seat</p>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">{courthousePrimarySeat}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
            <p className="text-sm text-[var(--color-text-body)] leading-relaxed">{courthouseAddress}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Clerk Phone</p>
            <a href={`tel:${courthousePhone.replace(/[^\d]/g, '')}`} className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline flex items-center gap-2 mb-2">
              <Phone size={14} /> {courthousePhone}
            </a>
            <div className="flex items-start gap-2 mt-2">
              <Clock size={12} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium text-gray-500 leading-relaxed uppercase">
                Call ahead to verify current clerk hours before visiting.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--color-bg-border-soft)]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Filing Fee</p>
            <p className="text-2xl font-black text-[var(--color-text-primary)]">{formattedFilingFee}</p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          {courthouseUrl && (
            <a
              href={courthouseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full text-xs"
              aria-label={`${courthouseName} website — opens in new tab`}
            >
              Court Website <ExternalLink size={14} />
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-xs shadow-lg shadow-blue-500/20"
            aria-label={`Get directions to ${courthouseName} — opens in new tab`}
          >
            Get Directions <MapPin size={14} />
          </a>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Clock size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium text-gray-500 leading-relaxed uppercase">
            Call ahead to verify current clerk hours before visiting {courthousePrimarySeat}.
          </p>
        </div>
      </div>

      {/* Section 5 — Presumptive Amount (income pages only) */}
      {presumptiveAmount !== undefined && (
        <div className="card-highlighted !p-8 bg-blue-600 text-white border-none shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-2">2026 Presumptive Amount</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">${Math.round(presumptiveAmount).toLocaleString()}</span>
                <span className="text-sm font-bold text-blue-200">/ mo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Net Income</p>
                <p className="text-sm font-bold text-white">${combinedIncome?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Children</p>
                <p className="text-sm font-bold text-white">{numberOfChildren}</p>
              </div>
            </div>

            {lastUpdated && (
              <p className="text-[10px] font-medium text-blue-200 uppercase tracking-widest">
                Data Updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Section 6 & 7 — Editorial & Legal Team + Transparency Disclosure */}
      <AuthorBox />
    </aside>
  );
};

export default CountySidebar;

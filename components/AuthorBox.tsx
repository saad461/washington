import React from 'react';
import { ShieldCheck as Shield, Mail as MailIcon, CheckCircle2 as Check } from 'lucide-react';

const AuthorBox = () => {
  return (
    <section className="w-full max-w-3xl mx-auto py-4 border-t border-[var(--color-bg-border)] no-print">
      <div className="card-standard !p-8 md:!p-12 group overflow-hidden shadow-[var(--shadow-card-md)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-primary-light)] rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-24 bg-[var(--color-text-primary)] rounded-3xl flex items-center justify-center shadow-[var(--shadow-card-hover)] group-hover:rotate-3 transition-transform duration-300">
              <Shield className="w-12 h-12 text-[var(--color-brand-primary-mid)]" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-[var(--color-success)] rounded-full text-white ring-4 ring-white shadow-[var(--shadow-card-md)]">
              <Check size={14} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="eyebrow mb-2">Academic & Legal Entity</span>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">WSCSS Editorial & Legal Team</h3>

            <p className="text-[var(--color-text-body)] text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Our calculations and guides are rigorously audited by family law advocates and technical developers to ensure compliance with <strong className="text-[var(--color-text-primary)]">RCW 26.19</strong> and the latest 2026 economic table updates. We maintain a strict editorial protocol based on official AOC mandatory forms and WAC guidelines.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)] shadow-[var(--shadow-card)]">
                  <MailIcon size={14} className="text-[var(--color-brand-primary)]" />
                </div>
                <span className="text-[12px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider">support@wscss.site</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)] shadow-[var(--shadow-card)]">
                  <Check size={14} className="text-[var(--color-success)]" />
                </div>
                <span className="text-[12px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider">RCW 26.19 Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center px-6">
        <p className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-widest leading-loose">
          Transparency Disclosure: WSCSS is an independent resource center. We are not a government agency or a law firm. Our calculations are provided for educational and estimation purposes based on the latest 2026 guidelines.
        </p>
      </div>
    </section>
  );
};

export default AuthorBox;

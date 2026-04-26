import React from 'react';
import { ShieldCheck as Shield, Mail as MailIcon, CheckCircle2 as Check } from 'lucide-react';

const AuthorBox = () => {
  return (
    <section className="w-full max-w-3xl mx-auto py-16 border-t border-gray-100 no-print">
      <div className="card-standard p-8 md:p-12 group overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-24 bg-gray-900 rounded-3xl flex items-center justify-center shadow-xl group-hover:rotate-3 transition-transform duration-300">
              <Shield className="w-12 h-12 text-indigo-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 rounded-full text-white ring-4 ring-white shadow-lg">
              <Check size={14} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="label-metadata text-indigo-600 mb-2 tracking-widest uppercase">Academic & Legal Entity</h3>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">WCSSC Editorial & Legal Team</h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Our calculations and guides are rigorously audited by family law advocates and technical developers to ensure compliance with RCW 26.19 and the latest 2026 economic table updates. We maintain a strict editorial protocol based on official AOC mandatory forms and WAC guidelines.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                  <MailIcon size={14} className="text-indigo-600" />
                </div>
                <span className="label-metadata text-gray-900 font-bold">support@wcssc.site</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                </div>
                <span className="label-metadata text-gray-900 font-bold">RCW 26.19 Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center px-6">
        <p className="label-metadata text-gray-400 uppercase tracking-widest leading-loose text-[10px]">
          Transparency Disclosure: WCSSC is an independent resource center. We are not a government agency or a law firm. Our calculations are provided for educational and estimation purposes based on the latest 2026 guidelines.
        </p>
      </div>
    </section>
  );
};

export default AuthorBox;

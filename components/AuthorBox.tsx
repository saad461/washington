import React from 'react';
import { ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

const AuthorBox = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-24 border-t-2 border-slate-50 pt-16 no-print">
      <div className="bg-white rounded-[4rem] border border-slate-100 p-12 md:p-16 shadow-2xl shadow-indigo-900/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-[3rem] -translate-y-16 translate-x-16" />
        
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left relative z-10">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30 group-hover:rotate-3 transition-transform">
              <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-full text-white ring-4 ring-white">
              <CheckCircle2 size={16} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-2">Academic & Legal Entity</h3>
            <h2 className="text-2xl font-black text-slate-900 mb-6 italic tracking-tight">WCSSC Editorial & Legal Team</h2>
            
            <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-2xl font-serif">
              Our calculations and guides are rigorously audited by family law advocates and technical developers to ensure compliance with RCW 26.19 and the latest 2026 economic table updates. We maintain a strict editorial protocol based on official AOC mandatory forms and WAC guidelines.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                  <Mail size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">support@wcssc.site</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Strict RCW 26.19 Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center px-12">
        <p className="text-xs font-medium text-slate-500 leading-loose italic">
          Transparency Disclosure: WCSSC is an independent resource center. We are not a government agency or a law firm. Our calculations are provided for educational and estimation purposes based on the latest 2026 guidelines.
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;

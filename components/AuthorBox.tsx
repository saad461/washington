import React from 'react';
import { ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

const AuthorBox = () => {
 return (
 <div className="w-full max-w-3xl mx-auto my-20 pt-16 border-t border-gray-100 no-print font-sans">
 <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-12 shadow-sm relative overflow-hidden group">
 <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative z-10">
 <div className="relative">
 <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-3 transition-transform duration-300">
 <ShieldCheck className="w-12 h-12 text-indigo-400" />
 </div>
 <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 rounded-full text-white ring-4 ring-white">
 <CheckCircle2 size={14} />
 </div>
 </div>

 <div className="flex-1">
 <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase mb-2">Academic & Legal Entity</h3>
 <h2 className="font-semibold mb-6 font-heading tracking-tight">WCSSC Editorial & Legal Team</h2>

 <p className=" font-medium leading-relaxed mb-8 max-w-2xl text-sm md:text-base">
 Our calculations and guides are rigorously audited by family law advocates and technical developers to ensure compliance with RCW 26.19 and the latest 2026 economic table updates. We maintain a strict editorial protocol based on official AOC mandatory forms and WAC guidelines.
 </p>

 <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ">
 <Mail size={14} />
 </div>
 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase">support@wcssc.site</span>
 </div>
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ">
 <CheckCircle2 size={14} />
 </div>
 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold uppercase">Strict RCW 26.19 Compliance</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-10 text-center px-12">
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest md:text-[10px] uppercase font-bold text-gray-500 tracking-widest font-bold leading-loose">
 Transparency Disclosure: WCSSC is an independent resource center. We are not a government agency or a law firm. Our calculations are provided for educational and estimation purposes based on the latest 2026 guidelines.
 </p>
 </div>
 </div>
 );
};

export default AuthorBox;

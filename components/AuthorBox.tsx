import React from 'react';
import { ShieldCheck as Shield, Mail as MailIcon, CheckCircle2 as Check } from 'lucide-react';

const AuthorBox = () => {
  return (
    <section className="w-full max-w-prose mx-auto py-16 border-t border-border-default no-print">
      <div className="card !p-8 md:!p-12 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-24 bg-bg-inverse rounded-3xl flex items-center justify-center shadow-xl">
              <Shield className="w-12 h-12 text-brand" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-success rounded-full text-white ring-4 ring-white shadow-lg">
              <Check size={14} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-overline mb-2">Academic & Legal Entity</h3>
            <h2 className="text-h2 mb-6">WCSSC Editorial & Legal Team</h2>

            <p className="text-body text-sm md:text-base mb-8">
              Our calculations and guides are rigorously audited by family law advocates and technical developers to ensure compliance with RCW 26.19 and the latest 2026 economic table updates.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-subtle flex items-center justify-center border border-border-default">
                  <MailIcon size={14} className="text-brand" />
                </div>
                <span className="text-overline !text-text-primary">support@wcssc.site</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-subtle flex items-center justify-center border border-border-default">
                  <Check size={14} className="text-success" />
                </div>
                <span className="text-overline !text-text-primary">RCW 26.19 Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center px-6">
        <p className="text-xs text-text-muted italic">
          Transparency Disclosure: WCSSC is an independent resource center. We are not a government agency or a law firm. Our calculations are provided for educational and estimation purposes based on the latest 2026 guidelines.
        </p>
      </div>
    </section>
  );
};

export default AuthorBox;

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { BookA, ChevronRight, Calculator, ArrowLeft, Scale } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 2592000;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const termData = glossaryTerms.find(t => t.slug === resolvedParams.slug);
  if (!termData) return {};

  return {
    title: `What is ${termData.term} in WA? | Child Support Glossary`,
    description: `Clear, legal definition and practical examples of ${termData.term} under 2026 Washington State Child Support guidelines.`,
    alternates: { canonical: `https://wcssc.site/glossary/${termData.slug}` }
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const resolvedParams = await params;
  const termData = glossaryTerms.find(t => t.slug === resolvedParams.slug);

  if (!termData) {
    notFound();
  }

  return (
    <div className="flex-1 bg-white">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10">
          <Link href="/glossary" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Glossary
          </Link>

          <header className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Legal Definition
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {termData.term}
            </h1>
          </header>
        </div>
      </section>

      {/* ── DEFINITION & EXAMPLE ───────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-reading">
          <article className="card-standard !p-8 md:!p-12 shadow-xl border-none">
            <div className="space-y-12">
              <section>
                <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">Formal Definition</p>
                <p className="text-2xl md:text-4xl text-gray-900 font-bold leading-tight border-l-4 border-blue-600 pl-8 py-2">
                  {termData.definition}
                </p>
              </section>

              <section className="bg-blue-50/50 rounded-3xl p-8 md:p-10 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Real-World Application</h4>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  &ldquo;{termData.example}&rdquo;
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>

      {/* ── RELATED RESOURCES ──────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <h3 className="text-xs font-bold text-gray-400 mb-10 uppercase tracking-widest text-center">Related Tools & Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {termData.relatedLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center justify-between p-8 bg-[var(--color-bg-subtle)] hover:bg-white hover:border-blue-300 hover:shadow-lg text-gray-900 rounded-3xl transition-all group border border-gray-100"
              >
                <span className="flex items-center gap-4 font-bold text-lg">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  {link.label}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-24 card-standard border-dashed border-2 border-gray-200 !p-12 text-center shadow-none bg-[var(--color-bg-subtle)]">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Need a full calculation?</h2>
            <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Use our 2026 Washington State estimator to see how these legal terms impact your support amount.
            </p>
            <Link href="/" className="btn-primary-lg btn-primary !rounded-full">
              Start Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

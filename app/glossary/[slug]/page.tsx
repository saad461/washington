import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { BookA, ChevronRight, Calculator, ArrowLeft } from 'lucide-react';

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
    <main className="flex-1 bg-white">
      <div className="container-reading section-default relative z-10">

        <nav className="mb-8">
          <Link href="/glossary" className="cta-link !font-bold">
            <ArrowLeft size={14} className="mr-1" />
            Back to Glossary
          </Link>
        </nav>

        <article className="card-standard !p-8 md:!p-16 mb-16 shadow-[var(--shadow-card-md)]">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div className="p-4 bg-[var(--color-brand-accent-light)] text-[var(--color-brand-accent)] rounded-2xl shadow-sm">
              <BookA className="w-10 h-10" />
            </div>
            <div>
              <span className="eyebrow mb-1">Legal Term</span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {termData.term}
              </h1>
            </div>
          </header>

          <div className="space-y-12">
            <section>
              <h3 className="text-[12px] font-bold text-[var(--color-text-secondary)] mb-6 uppercase tracking-widest">Definition</h3>
              <p className="text-2xl md:text-3xl text-[var(--color-text-primary)] font-medium leading-tight border-l-4 border-[var(--color-brand-accent)] pl-8 py-2">
                {termData.definition}
              </p>
            </section>

            <section className="bg-[var(--color-success-bg)] rounded-2xl p-8 md:p-10 border border-[var(--color-bg-border)]">
              <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Real-World Example</h4>
              <p className="text-lg text-[var(--color-text-body)] leading-relaxed italic">
                &ldquo;{termData.example}&rdquo;
              </p>
            </section>

            <section className="pt-12 border-t border-[var(--color-bg-border-soft)]">
              <h3 className="text-[12px] font-bold text-[var(--color-text-secondary)] mb-8 uppercase tracking-widest">Related Tools & Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {termData.relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center justify-between p-6 bg-[var(--color-bg-subtle)] hover:bg-[var(--color-brand-primary-light)] text-[var(--color-text-primary)] rounded-xl transition-all group border border-[var(--color-bg-border)]"
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <Calculator className="w-5 h-5 text-[var(--color-brand-primary)]" />
                      {link.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)] -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <section className="card-standard bg-[var(--color-bg-subtle)] border-dashed border-2 border-[var(--color-bg-border)] !p-12 text-center shadow-none">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">Need a full calculation?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto leading-relaxed">
            Use our 2026 Washington State estimator to see how these legal terms impact your support amount.
          </p>
          <Link href="/" className="btn-primary-lg btn-primary !rounded-full">
            Start Free Estimate
          </Link>
        </section>
      </div>
    </main>
  );
}

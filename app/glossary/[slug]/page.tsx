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
    <main className="flex-1 w-full">
      <div className="container-reading section relative z-10">

        <nav className="mb-12">
          <Link href="/glossary" className="btn btn-ghost btn-sm">
            <ArrowLeft size={14} className="mr-2" />
            Back to Glossary
          </Link>
        </nav>

        <article className="card card-elevated !p-8 md:!p-16 mb-16">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div className="p-4 bg-brand-light text-brand rounded-2xl">
              <BookA className="w-10 h-10" />
            </div>
            <div>
              <p className="text-overline mb-1">Legal Term</p>
              <h1 className="text-h1">
                {termData.term}
              </h1>
            </div>
          </header>

          <div className="space-y-12">
            <section>
              <h2 className="text-overline !text-text-muted mb-4">Definition</h2>
              <p className="text-h2 !text-text-primary border-l-4 border-brand pl-8 py-2">
                {termData.definition}
              </p>
            </section>

            <section className="badge-success !p-8 md:!p-10 rounded-3xl block">
              <h3 className="text-h4 !text-success mb-4">Real-World Example</h3>
              <p className="text-body !text-success font-medium italic mb-0">
                &ldquo;{termData.example}&rdquo;
              </p>
            </section>

            <section className="pt-12 border-t border-border-default">
              <h3 className="text-overline !text-text-muted mb-8">Related Tools & Resources</h3>
              <div className="card-grid-2">
                {termData.relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center justify-between p-6 card section-subtle hover:bg-brand hover:!text-white rounded-2xl transition-all group"
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <Calculator className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                      {link.label}
                    </span>
                    <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <section className="section-inverse p-8 md:p-12 rounded-3xl text-center shadow-xl">
          <h2 className="text-h2 !text-white mb-6">Need a full calculation?</h2>
          <p className="text-body-lg !text-white opacity-80 mb-8 max-w-lg mx-auto">
            Use our 2026 Washington State estimator to see how these legal terms impact your support amount.
          </p>
          <Link href="/" className="btn btn-primary btn-lg w-full md:w-fit">
            Start Free Estimate
          </Link>
        </section>
      </div>
    </main>
  );
}

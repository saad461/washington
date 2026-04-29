import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { BookA, ChevronRight, Calculator, ExternalLink, ArrowLeft } from 'lucide-react';

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
    <main className="flex-1 bg-page">
      <div className="container-reading section-default relative z-10">

        <nav className="mb-12">
          <Link href="/glossary" className="btn-ghost !h-10 !px-0 w-fit">
            <ArrowLeft size={14} className="mr-2" />
            Back to Glossary
          </Link>
        </nav>

        <article className="card-standard p-8 md:p-16 mb-16 shadow-xl">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
              <BookA className="w-10 h-10" />
            </div>
            <div>
              <p className="label-metadata text-indigo-600 mb-1 tracking-widest uppercase">Legal Term</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {termData.term}
              </h1>
            </div>
          </header>

          <div className="space-y-12">
            <section>
              <h2 className="label-metadata text-gray-400 mb-4 uppercase tracking-widest">Definition</h2>
              <p className="text-2xl md:text-3xl text-gray-900 font-medium leading-tight border-l-4 border-indigo-600 pl-8 py-2">
                {termData.definition}
              </p>
            </section>

            <section className="bg-emerald-50 rounded-3xl p-8 md:p-10 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Real-World Example</h3>
              <p className="text-lg text-emerald-800 leading-relaxed italic">
                &ldquo;{termData.example}&rdquo;
              </p>
            </section>

            <section className="pt-12 border-t border-gray-100">
              <h3 className="label-metadata text-gray-400 mb-8 uppercase tracking-widest">Related Tools & Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {termData.relatedLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center justify-between p-6 bg-gray-50 hover:bg-indigo-600 text-gray-900 hover:text-white rounded-2xl transition-all group border border-transparent hover:shadow-lg"
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <Calculator className="w-5 h-5 opacity-70 group-hover:text-white" />
                      {link.label}
                    </span>
                    <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <section className="bg-gray-900 p-8 md:p-12 rounded-3xl text-center shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-6">Need a full calculation?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto opacity-80">
            Use our 2026 Washington State estimator to see how these legal terms impact your support amount.
          </p>
          <Link href="/" className="btn-primary w-full md:w-fit px-10">
            Start Free Estimate
          </Link>
        </section>
      </div>
    </main>
  );
}

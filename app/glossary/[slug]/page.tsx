import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { BookA, ChevronRight, Calculator, ExternalLink } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

// ISR: Avoid SSG prerendering which crashes client components.
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `What does ${termData.term} mean in Washington child support?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": termData.definition
      }
    }]
  };

  return (
    <div className="flex-1 bg-[#FDFDFE] relative w-full overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link href="/glossary" className="hover:text-indigo-600 transition-colors">Glossary</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-gray-900">{termData.term}</span>
        </nav>

        <article className="bg-white border border-gray-100 shadow-2xl shadow-indigo-900/5 rounded-2xl p-8 md:p-14 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
              <BookA className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              {termData.term}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="text-xl font-medium text-gray-800 leading-relaxed border-l-4 border-indigo-500 pl-6 bg-gray-50 p-6 rounded-r-2xl">
              {termData.definition}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Real-World Example</h3>
            <p className="leading-relaxed bg-emerald-50 text-emerald-900 p-6 rounded-2xl">
              {termData.example}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Related Tools & Resources</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {termData.relatedLinks.map((link, idx) => (
                <Link 
                  key={idx}
                  href={link.href}
                  className="flex items-center justify-between p-5 bg-gray-50 hover:bg-indigo-600 hover:text-white text-indigo-900 rounded-2xl font-bold transition-colors group flex-1"
                >
                  <span className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 opacity-70 group-hover:text-white" />
                    {link.label}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </article>

      </div>
    </div>
  );
}

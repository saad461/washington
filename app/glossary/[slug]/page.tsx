import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { ChevronRight, Calculator, ArrowLeft, Scale, BookOpen, Calculator as CalcIcon, HelpCircle, Link as LinkIcon, FileText } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 2592000;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const termData = glossaryTerms.find(t => t.slug === resolvedParams.slug);
  if (!termData) notFound();

  return {
    title: { absolute: termData.metaTitle.slice(0, 60) },
    description: termData.metaDescription.slice(0, 160),
    openGraph: {
      title: termData.ogTitle.slice(0, 60),
      description: termData.ogDescription.slice(0, 160),
      url: `https://wscss.site/glossary/${termData.slug}`,
      type: "article",
      siteName: "WSCSS — Washington State Child Support Schedule",
      images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630, alt: `${termData.name} — Washington Child Support Glossary 2026 | WSCSS` }]
    },
    twitter: {
      card: "summary_large_image",
      title: termData.ogTitle.slice(0, 60),
      description: termData.ogDescription.slice(0, 160),
      images: ["https://wscss.site/wscss-og.webp"]
    },
    alternates: { canonical: `https://wscss.site/glossary/${termData.slug}` }
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const resolvedParams = await params;
  const termData = glossaryTerms.find(t => t.slug === resolvedParams.slug);

  if (!termData) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wscss.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Glossary",
        "item": "https://wscss.site/glossary"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": termData.name,
        "item": `https://wscss.site/glossary/${termData.slug}`
      }
    ]
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://wscss.site/glossary/${termData.slug}#term`,
    "name": termData.name,
    "description": termData.definition,
    "inDefinedTermSet": "https://wscss.site/glossary"
  };

  return (
    <div className="flex-1 bg-white pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

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
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 uppercase tracking-wider">
                {termData.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {termData.h1Title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span>Last updated: January 2026</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>RCW 26.19 Compliant</span>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {termData.definition}
            </p>
          </header>
        </div>
      </section>

      {/* ── CONTENT BODY ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-reading space-y-20">
          {/* Legal Definition */}
          <section className="prose-standard">
            <div className="flex items-center gap-3 mb-6 not-prose">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Scale className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="!mt-0 !mb-0 font-bold text-gray-900 leading-tight" style={{ fontSize: '28px' }}>Legal Definition Under Washington Law</h2>
            </div>
            <div>
              <p className="border-l-4 border-blue-600 pl-6 py-1 italic bg-blue-50/30 rounded-r-lg">
                {termData.legalDefinition}
              </p>
            </div>
          </section>

          {/* How it Works */}
          <section className="prose-standard">
            <div className="flex items-center gap-3 mb-6 not-prose">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="!mt-0 !mb-0 font-bold text-gray-900 leading-tight" style={{ fontSize: '28px' }}>How {termData.name} Works in Practice</h2>
            </div>
            <div className="space-y-6">
              {termData.howItWorks.map((para, i) => (
                <p key={i}>
                  {para}
                  {i === 0 && (
                    <> Understanding this term is important when completing your child support calculation. <Link href="/worksheet" className="text-blue-600 hover:underline">Use our worksheet calculator</Link> to see how this applies to your case.</>
                  )}
                </p>
              ))}
            </div>
          </section>

          {/* Real-World Example */}
          <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm prose-standard">
            <div className="flex items-center gap-3 mb-8 not-prose">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CalcIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="!my-0 text-[28px] font-bold text-gray-900">Real-World Example</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 font-mono text-sm md:text-base text-gray-800 border border-gray-200 whitespace-pre-wrap leading-relaxed shadow-inner not-prose">
              {termData.fullExample}
            </div>
          </section>

          {/* How it Affects Amount */}
          <section className="prose-standard">
            <div className="flex items-center gap-3 mb-6 not-prose">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="!mt-0 !mb-0 font-bold text-gray-900 leading-tight" style={{ fontSize: '28px' }}>How {termData.name} Affects Your Child Support Amount</h2>
            </div>
            <p>
              {termData.howItAffects}
            </p>
          </section>

          {/* FAQs */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-bold text-gray-900 leading-tight" style={{ fontSize: '28px' }}>Frequently Asked Questions</h2>
            </div>
            <FAQAccordion faqs={termData.faqs} defaultOpenCount={1} />
          </section>

          {/* Related Terms */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <LinkIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-bold text-gray-900 leading-tight" style={{ fontSize: '28px' }}>Related Terms</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {termData.relatedTerms.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center justify-between p-5 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl transition-all group"
                >
                  <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <div className="pt-10 border-t border-gray-100">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

               <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Need a full calculation?</h2>
               <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                 Use our 2026 Washington State estimator to see how these legal terms impact your support amount. All calculators are RCW 26.19 compliant.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                 <Link href="/" className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto !rounded-full !px-10 !py-4 font-bold text-lg shadow-lg">
                   Start Free Estimate →
                 </Link>
                 <Link href="/worksheet" className="btn btn-secondary border-2 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto !rounded-full !px-10 !py-4 font-bold text-lg">
                   Use Full Worksheet →
                 </Link>
               </div>
            </div>
          </div>

          {/* RCW Reference Footer */}
          <footer className="pt-8 text-center border-t border-gray-100">
            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">
              Statutory Source: <span className="text-gray-600">{termData.rcw}</span>
            </p>
            <p className="mt-8 text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
              Disclaimer: This information is for educational purposes only and does not constitute legal advice. Child support laws are complex; always consult with a qualified family law attorney or the Washington Division of Child Support (DCS) for your specific case.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

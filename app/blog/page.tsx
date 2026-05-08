import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import BlogGridClient from '@/components/BlogGridClient';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';

export const metadata: Metadata = {
  title: { absolute: "WA Child Support Legal Guides 2026 | WSCSS" },
  description: "Expert guides on Washington child support guidelines, 2026 law changes, county filing guides, and calculation walkthroughs from the WSCSS editorial team.",
  alternates: { canonical: 'https://wscss.site/blog' },
  openGraph: {
    title: "WA Child Support Legal Guides 2026 | WSCSS",
    description: "Expert guides on 2026 Washington child support law changes, county filing guides, and calculation walkthroughs from the WSCSS editorial team.",
    url: "https://wscss.site/blog",
    type: "website",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WA Child Support Legal Guides 2026 | WSCSS",
    description: "Expert guides on 2026 Washington child support law, county filing, and calculation walkthroughs.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams;
  const category = params?.category;

  const articles = blogs;
  const filteredArticles = category && category !== 'All'
    ? articles.filter(a => a.category === category)
    : articles;

  const featured = articles.find(a => a.featured) || articles[0];
  const gridArticles = filteredArticles.filter(a => a.slug !== featured?.slug);

  return (
    <div className="flex-1 bg-white relative overflow-hidden w-full">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <div className="max-w-3xl">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Resource Center
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Expert Insights for <span className="text-blue-600">Washington Parents</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WSCSS team.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ────────────────────────────────────────────── */}
      {!category && featured && (
        <section className="section-default bg-[var(--color-bg-subtle)] relative z-10">
          <div className="container-wide">
            <Link
              href={`/blog/${featured.slug}`}
              className="group card-standard !p-0 block shadow-[var(--shadow-card-md)] overflow-hidden"
            >
              <div className="flex flex-col">
                {featured.image?.url ? (
                  <div className="relative w-full h-48 md:h-64 bg-gray-100">
                    <Image
                      src={featured.image.url}
                      alt={featured.image.alt || featured.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-blue-300 text-sm font-medium">WSCSS Legal Guide</span>
                  </div>
                )}

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Badge text="Featured" variant="featured" />
                    <Badge text={featured.category} variant="category" />
                    <Badge text={`${featured.readTime} read`} variant="readtime" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6 group-hover:text-[var(--color-brand-primary)] transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-lg text-[var(--color-text-body)] mb-12 line-clamp-3 leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)] group-hover:bg-blue-50 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        W
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)] leading-none mb-2">{featured.author}</p>
                      <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Editorial & Legal Audit</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── BLOG GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-white relative z-10">
        <div className="container-wide">
          <BlogGridClient
            articles={gridArticles}
            initialCategory={category || 'All'}
          />
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)]">
        <div className="container-reading text-center">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6 mx-auto">Start Your Estimate</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8">Ready for a Precise Calculation?</h2>
          <p className="text-lg text-[var(--color-text-body)] mb-12 leading-relaxed">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="btn btn-primary btn-primary-lg w-full sm:w-auto">
              Launch Estimator <ArrowRight size={18} />
            </Link>
            <Link href="/worksheet" className="btn btn-secondary btn-primary-lg w-full sm:w-auto">
              Pro Worksheet Wizard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

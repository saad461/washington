import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, User, ArrowRight, Clock } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { BlogGridClientClient as BlogGridClient } from '@/components/ClientDynamic';

export const metadata: Metadata = {
  title: 'WA Child Support Resource Center | WCSSC Blog',
  description: 'Expert legal guides, county-specific filing roadmaps, and 2026 Washington State Child Support Schedule updates. Stay informed with our legal team.',
  alternates: { canonical: 'https://wcssc.site/blog' },
};

export default function BlogListingPage() {
  const featuredPost = blogs.find(p => p.featured) || blogs[0];

  return (
    <main className="flex-1 bg-white relative overflow-hidden w-full">
      {/* Hero Header */}
      <section className="section-default relative z-10 bg-[var(--color-bg-subtle)] border-b border-[var(--color-bg-border)]">
        <div className="container-wide">
          <header className="max-w-3xl mx-auto text-center">
            <span className="eyebrow mb-6">Resource Center</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-[var(--color-text-primary)]">
              Expert Insights for Washington Parents
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
            </p>
          </header>
        </div>
      </section>

      {/* Featured Article Spotlight */}
      <section className="section-default relative z-10">
        <div className="container-wide">
          {featuredPost && (
            <div className="mb-24">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group card-standard !p-8 md:!p-12 block shadow-[var(--shadow-card-md)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="badge-category !bg-[var(--color-brand-primary)] !text-white !px-4 !py-1.5 !text-[12px] font-semibold text-[var(--color-text-secondary)] !uppercase">
                        Featured Article
                      </span>
                      <div className="badge-meta !px-4 !py-1.5">
                        <Clock size={14} className="mr-2" />
                        {featuredPost.readTime} Read
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6 group-hover:text-[var(--color-brand-primary)] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-[var(--color-text-body)] mb-12 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)] group-hover:bg-[var(--color-brand-primary-light)] transition-colors">
                        <User size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-brand-primary)]" />
                      </div>
                      <div>
                        <p className="font-bold text-[var(--color-text-primary)] leading-none mb-2">{featuredPost.author}</p>
                        <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Editorial & Legal Audit</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <div className="p-16 bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)] rounded-3xl group-hover:bg-[var(--color-brand-primary-light)] transition-all duration-500">
                      <TrendingUp className="w-24 h-24 text-[var(--color-bg-border)] group-hover:text-[var(--color-brand-primary-mid)] group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid Section */}
          <BlogGridClient initialBlogs={blogs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-default bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]">
        <div className="container-reading text-center">
          <span className="eyebrow mb-6">Start Your Estimate</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8">Ready for a Precise Calculation?</h2>
          <p className="text-lg text-[var(--color-text-body)] mb-12 leading-relaxed">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="btn-primary-lg btn-primary w-full sm:w-auto">
              Launch Estimator <ArrowRight size={18} />
            </Link>
            <Link href="/worksheet" className="btn-primary-lg btn-secondary w-full sm:w-auto">
              Pro Wizard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

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
    <main className="flex-1 w-full">
      {/* Hero Header */}
      <section className="section">
        <div className="container">
          <header className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-overline mb-6">Resource Center</p>
            <h1 className="text-display mb-8">
              Expert Insights for Washington Parents
            </h1>
            <p className="text-body-lg">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
            </p>
          </header>

          {/* Featured Post Spotlight */}
          {featuredPost && (
            <div className="mb-24">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group card card-elevated block md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="badge badge-brand">
                        Featured Article
                      </span>
                      <div className="flex items-center gap-4 text-text-muted">
                        <Clock size={14} />
                        <span className="text-overline">{featuredPost.readTime} Read</span>
                      </div>
                    </div>
                    <h2 className="text-h1 mb-6 group-hover:text-brand transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-body-lg mb-12 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-surface-subtle flex items-center justify-center border border-border-default group-hover:border-brand transition-colors">
                        <User size={20} className="text-text-muted group-hover:text-brand" />
                      </div>
                      <div>
                        <p className="text-body font-bold mb-1">{featuredPost.author}</p>
                        <p className="text-overline">Editorial & Legal Audit</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <div className="p-16 bg-surface-subtle border border-border-default rounded-3xl group-hover:bg-brand-light group-hover:border-brand-border transition-all duration-500">
                      <TrendingUp className="w-24 h-24 text-border-default group-hover:text-brand-border group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="container pb-24 relative z-10">
        <BlogGridClient initialBlogs={blogs} />
      </section>

      {/* CTA Section */}
      <section className="section section-inverse text-center">
        <div className="container-reading">
          <p className="text-overline mb-6 !text-brand-light">Start Your Estimate</p>
          <h2 className="text-h1 !text-white mb-8">Ready for a Precise Calculation?</h2>
          <p className="text-body-lg !text-white opacity-80 mb-12">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="btn btn-primary btn-lg">
              Launch Estimator <ArrowRight size={18} />
            </Link>
            <Link href="/worksheet" className="btn btn-secondary btn-lg !bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
              Pro Wizard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

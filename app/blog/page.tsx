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
    <main className="flex-1 bg-page relative overflow-hidden w-full">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-indigo-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-60" />
      </div>

      {/* Hero Header */}
      <section className="section-default relative z-10">
        <div className="container-wide">
          <header className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <p className="label-metadata mb-6 text-indigo-600 tracking-widest uppercase">Resource Center</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Expert Insights for Washington Parents
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
            </p>
          </header>

          {/* Featured Post Spotlight */}
          {featuredPost && (
            <div className="mb-24">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group card-interactive block md:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full label-metadata text-[10px]">
                        Featured Article
                      </span>
                      <div className="flex items-center gap-4 text-gray-400">
                        <Clock size={14} />
                        <span className="label-metadata">{featuredPost.readTime} Read</span>
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 transition-colors">
                        <User size={20} className="text-gray-400 group-hover:text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-none mb-2">{featuredPost.author}</p>
                        <p className="label-metadata text-gray-400">Editorial & Legal Audit</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <div className="p-16 bg-gray-50 border border-gray-100 rounded-3xl group-hover:bg-indigo-50 transition-all duration-500">
                      <TrendingUp className="w-24 h-24 text-gray-200 group-hover:text-indigo-200 group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="container-wide pb-24 md:pb-32 relative z-10">
        <BlogGridClient initialBlogs={blogs} />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="container-reading text-center">
          <p className="label-metadata mb-6 text-indigo-400 tracking-widest uppercase">Start Your Estimate</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready for a Precise Calculation?</h2>
          <p className="text-lg text-indigo-100 mb-12 leading-relaxed opacity-80">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="btn-primary w-full sm:w-fit px-8 h-14 flex items-center justify-center gap-3">
              Launch Estimator <ArrowRight size={18} />
            </Link>
            <Link href="/worksheet" className="btn-secondary w-full sm:w-fit px-8 h-14 flex items-center justify-center gap-3 text-white border-white/20 hover:bg-white/10">
              Pro Wizard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

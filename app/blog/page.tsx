import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Sparkles, TrendingUp, FileText, Clock, User } from 'lucide-react';
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
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
        <div className="w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-40 absolute top-[-10%] translate-x-[-30%]" />
        <div className="w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[80px] opacity-40 absolute bottom-[0%] translate-x-[30%]" />
      </div>

      {/* Hero / Featured Section */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Resource Center</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-8 font-heading px-2">
              Expert Insights for Washington Parents
            </h1>
            <p className="max-w-2xl text-gray-600 font-medium text-lg md:text-xl leading-relaxed mx-auto">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
            </p>
          </div>

          {/* Featured Post Spotlight */}
          {featuredPost && (
            <div className="mb-20 lg:mb-32">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Featured Article
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                        {featuredPost.readTime} Read
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight tracking-tight font-heading">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-white transition-colors">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] leading-none mb-1">{featuredPost.author}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none">Editorial & Legal Audit</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <div className="p-10 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-white transition-colors">
                      <TrendingUp className="w-16 h-16 text-gray-200 group-hover:text-indigo-100 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-40 relative z-10">
        <BlogGridClient initialBlogs={blogs} />
      </section>

      {/* Call to Action Footer */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 mb-6">Start Your Estimate</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-8 font-heading">Ready for a Precise Calculation?</h2>
          <p className="text-gray-600 font-medium mb-12 text-lg md:text-xl leading-relaxed">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-center">
              Launch Estimator
            </Link>
            <Link href="/worksheet" className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all text-center">
              Pro Wizard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

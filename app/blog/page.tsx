import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Sparkles, TrendingUp, FileText } from 'lucide-react';
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
      
      {/* Hero / Featured Section */}
      <section className="relative pt-14 md:pt-20 pb-16 md:pb-28 overflow-hidden w-full">
        {/* Decorative Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-indigo-50/40 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-12 md:mb-20">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20 mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-4">Resource Center</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-8 font-heading">
              Expert Insights for WA Parents
            </h1>
            <p className="max-w-2xl text-gray-700 font-medium text-lg leading-relaxed">
              Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
            </p>
          </div>

          {/* Featured Post Spotlight */}
          {featuredPost && (
            <div className="group relative mb-12 md:mb-20 lg:mb-24">
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <div className="bg-gray-900 rounded-3xl p-10 md:p-20 text-white relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:bg-indigo-500/30" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-lg text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30">
                          < Sparkles size={12} />
                          Featured Article
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{featuredPost.readTime} Read</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight font-heading">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 line-clamp-2 md:line-clamp-none">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">W</div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{featuredPost.author}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Editorial & Legal Audit</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex justify-end">
                      <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <TrendingUp className="w-24 h-24 text-indigo-400 opacity-20" />
                        <div className="mt-8 space-y-3">
                          <div className="h-2 w-32 bg-white/10 rounded-full" />
                          <div className="h-2 w-48 bg-white/10 rounded-full" />
                          <div className="h-2 w-40 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-28 lg:pb-40">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1">Expert Analysis</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-heading">Legal Guides</h2>
            </div>
          </div>
          <div className="hidden md:block p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Status: Updated 2026</p>
            <p className="text-xs text-emerald-800 font-medium">Latest AOC Economic Table changes integrated.</p>
          </div>
        </div>
        <BlogGridClient initialBlogs={blogs} />
      </section>

      {/* Call to Action Footer */}
      <section className="bg-white border-t border-gray-100 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 font-heading">Ready for a Precise Calculation?</h2>
          <p className="text-gray-500 font-medium mb-12 text-lg">
            Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all font-heading">
              Launch Estimator
            </Link>
            <Link href="/worksheet" className="px-10 py-5 bg-gray-900 text-white font-bold rounded-xl shadow-xl shadow-gray-900/10 hover:scale-105 active:scale-95 transition-all uppercase text-[12px] tracking-widest font-heading">
              Pro Wizard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

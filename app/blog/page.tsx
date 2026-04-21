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
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-6">Resource Center</p>
 <h1 className=" mb-8 px-2">
 Expert Insights for Washington Parents
 </h1>
 <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-700 mx-auto">
 Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
 </p>
 </div>

 {/* Featured Post Spotlight */}
 {featuredPost && (
 <div className="mb-20 lg:mb-32">
 <Link
 href={`/blog/${featuredPost.slug}`}
 className="group block bg-white rounded-2xl border border-gray-100 p-6 md:p-12 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all duration-300"
 >
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
 <div className="lg:col-span-8">
 <div className="flex items-center gap-4 mb-8">
 <span className=" text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase ">
 Featured Article
 </span>
 <span className="w-1 h-1 bg-gray-300 rounded-full" />
 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase ">
 {featuredPost.readTime} Read
 </span>
 </div>
 <h2 className="text-2xl md:text-3xl md:text-4xl mb-6 group-hover: transition-colors ">
 {featuredPost.title}
 </h2>
 <p className=" text-base md:text-lg leading-relaxed text-gray-700 mb-8 line-clamp-3">
 {featuredPost.excerpt}
 </p>
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
 <User size={16} />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase leading-none mb-1">{featuredPost.author}</p>
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest uppercase leading-none">Editorial & Legal Audit</p>
 </div>
 </div>
 </div>

 <div className="hidden lg:flex lg:col-span-4 justify-end">
 <div className="p-6 bg-gray-50 border border-gray-100 rounded-xl group-hover:bg-white transition-colors">
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
 <section className="bg-gray-50 border-y border-gray-100 py-20 md:py-3  px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto text-center">
 <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-6">Start Your Estimate</p>
 <h2 className="text-3xl md:text-4xl mb-8 ">Ready for a Precise Calculation?</h2>
 <p className=" mb-12 text-base md:text-lg leading-relaxed text-gray-700 ">
 Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
 <Link href="/" className="w-full sm:w-auto px-6 py-3 min-h-[48px] bg-indigo-600 text-white rounded-xl shadow-sm shadow-indigo-100 hover:bg-gray-100 transition-all text-center">
 Launch Estimator
 </Link>
 <Link href="/worksheet" className="w-full sm:w-auto px-6 py-3 min-h-[48px] bg-gray-900 text-white rounded-xl shadow-sm shadow-gray-200 hover:bg-gray-100 transition-all text-center">
 Pro Wizard
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, User } from 'lucide-react';
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
 <div className="min-h-screen bg-page relative overflow-hidden w-full">

 {/* Decorative blurred backgrounds */}
 <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
 <div className="w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-20 absolute top-[-10%] translate-x-[-30%]" />
 <div className="w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[80px] opacity-20 absolute bottom-[0%] translate-x-[30%]" />
 </div>

 {/* Hero / Featured Section */}
 <section className="section-hero relative z-10 w-full px-4 sm:px-6 lg:px-8">
 <div className="container-wide">
 <div className="flex flex-col items-center text-center mb-16 md:mb-20">
 <p className="label-metadata mb-6">Resource Center</p>
 <h1 className="mb-8">
 Expert Insights for Washington Parents
 </h1>
 <p className="max-w-2xl text-body mx-auto">
 Deep-dives into Washington&apos;s 2026 Child Support tables, courthouse-specific filing guides, and legal analysis from the WCSSC team.
 </p>
 </div>

 {/* Featured Post Spotlight */}
 {featuredPost && (
 <div className="mb-16 md:mb-24">
 <Link
 href={`/blog/${featuredPost.slug}`}
 className="group card-interactive !p-8 md:!p-12 block"
 >
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
 <div className="lg:col-span-8">
 <div className="flex items-center gap-4 mb-6">
 <span className="label-metadata text-indigo-600">
 Featured Article
 </span>
 <span className="w-1 h-1 bg-gray-300 rounded-full" />
 <span className="label-metadata">
 {featuredPost.readTime} Read
 </span>
 </div>
 <h2 className="mb-6 group-hover:text-indigo-600 transition-colors">
 {featuredPost.title}
 </h2>
 <p className="text-body mb-8 line-clamp-3">
 {featuredPost.excerpt}
 </p>
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
 <User size={16} />
 </div>
 <div>
 <p className="label-metadata text-heading leading-none mb-1">{featuredPost.author}</p>
 <p className="label-metadata leading-none">Editorial & Legal Audit</p>
 </div>
 </div>
 </div>

 <div className="hidden lg:flex lg:col-span-4 justify-end">
 <div className="p-10 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-white transition-all duration-300">
 <TrendingUp className="w-20 h-20 text-muted group-hover:text-indigo-100 transition-colors" />
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

 {/* Call to Action Footer */}
 <section className="bg-section-alt border-y border-border-default py-16 md:py-20 px-4 sm:px-6 lg:px-8">
 <div className="container-reading text-center">
 <p className="label-metadata mb-6">Start Your Estimate</p>
 <h2 className="text-3xl md:text-4xl mb-8">Ready for a Precise Calculation?</h2>
 <p className="mb-12">
 Our expert tools are updated for the 2026 Washington State Child Support Schedule. Start your local county calculation now.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
 <Link href="/" className="btn-primary w-full sm:w-auto !h-12 !px-8">
 Launch Estimator
 </Link>
 <Link href="/worksheet" className="btn-secondary w-full sm:w-auto !h-12 !px-8">
 Pro Wizard
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}

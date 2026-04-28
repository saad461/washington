'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/data/blogs';

interface BlogGridClientProps {
 initialBlogs: BlogPost[];
}

export default function BlogGridClient({ initialBlogs }: BlogGridClientProps) {
 const [selectedCategory, setSelectedCategory] = useState<string>('All');

 const categories = useMemo(() => {
 const cats = new Set(initialBlogs.map(b => b.category));
 return ['All', ...Array.from(cats)];
 }, [initialBlogs]);

 const filteredBlogs = useMemo(() => {
 if (selectedCategory === 'All') return initialBlogs;
 return initialBlogs.filter(b => b.category === selectedCategory);
 }, [selectedCategory, initialBlogs]);

 return (
 <>
 <div className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 gap-6">
 <div className="flex items-center gap-4">
 <div className="p-3 bg-bg-subtle rounded-2xl border border-border-default">
 <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
 </div>
 <div>
 <p className="text-overline mb-1">Expert Analysis</p>
 <h2 className="text-h4">Legal Guides</h2>
 </div>
 </div>

 <div className="flex flex-wrap items-center justify-center gap-3">
 {categories.map((cat) => (
 <button
 key={cat}
 onClick={() => setSelectedCategory(cat)}
 className={`btn btn-sm ${
 selectedCategory === cat
 ? 'btn-primary'
 : 'btn-secondary'
 }`}
 >
 {cat}
 </button>
 ))}
 </div>

 <span className="text-overline !text-text-muted shrink-0">
 {filteredBlogs.length} Article{filteredBlogs.length !== 1 && 's'}
 </span>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
 {filteredBlogs.map((post) => (
 <BlogCard key={post.slug} post={post} />
 ))}
 </div>
 </>
 );
}

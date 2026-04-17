'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/data/blogs';

interface BlogGridClientProps {
  initialBlogs: BlogPost[];
}

export default function BlogGridClient({ initialBlogs }: BlogGridClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract all unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialBlogs.map(b => b.category));
    return ['All', ...Array.from(cats)];
  }, [initialBlogs]);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return initialBlogs;
    return initialBlogs.filter(b => b.category === selectedCategory);
  }, [selectedCategory, initialBlogs]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 gap-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading uppercase shrink-0">Latest Guidance</h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="h-px flex-1 mx-6 bg-gray-100 hidden lg:block" />
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] shrink-0">
          Showing {filteredBlogs.length} Article{filteredBlogs.length !== 1 && 's'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 font-medium">
            No articles found in this category.
          </div>
        )}
      </div>
    </>
  );
}

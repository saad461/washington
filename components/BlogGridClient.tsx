'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/data/blogs';

interface BlogGridClientProps {
  articles: BlogPost[];
  initialCategory: string;
}

export default function BlogGridClient({ articles, initialCategory }: BlogGridClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive category from URL, fallback to prop from server
  const selectedCategory = searchParams.get('category') || initialCategory;

  // Extract all unique categories
  const categories = useMemo(() => {
    return ['All', 'Legal Guide', 'County Guide', 'Calculation Guide'];
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return articles;
    return articles.filter(b => b.category === selectedCategory);
  }, [selectedCategory, articles]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }

    const queryString = params.toString();
    const url = `/blog${queryString ? `?${queryString}` : ''}`;
    // router.push will trigger searchParams change, which updates selectedCategory above
    router.push(url, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-bg-border)]">
            <svg className="w-6 h-6 text-[var(--color-brand-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <span className="eyebrow !mb-0">Expert Analysis</span>
            <h3 className="font-bold tracking-tight text-[var(--color-text-primary)] uppercase !text-[14px]">Legal Guides</h3>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full !text-[12px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)] shadow-[var(--shadow-card)]'
                  : 'bg-white border-[var(--color-bg-border)] hover:border-[var(--color-brand-primary)] text-[var(--color-text-secondary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest shrink-0">
          {filteredBlogs.length} Article{filteredBlogs.length !== 1 && 's'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
        {filteredBlogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-20 text-center font-medium text-[var(--color-text-secondary)]">
            No articles found in this category.
          </div>
        )}
      </div>
    </>
  );
}

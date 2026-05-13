import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blogs';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPost;
  compact?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, compact = false }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group card-standard flex flex-col h-full overflow-hidden ${compact ? '!p-4' : ''}`}
    >
      <div className={`relative w-full rounded-xl overflow-hidden bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)] ${compact ? 'aspect-video mb-4' : 'aspect-[16/10] mb-6'}`}>
        <Image
          src={post.image?.url || '/img/blog-placeholder.webp'}
          alt={post.image?.alt || post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 800px"
          quality={80}
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Badge text={post.category} variant="category" />
        <span className="w-1 h-1 bg-[var(--color-bg-border)] rounded-full" />
        <Badge text={`${post.readTime} read`} variant="readtime" />
      </div>

      <h3 className={`${compact ? 'text-base' : 'text-xl'} font-semibold mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors leading-tight line-clamp-2`}>
        {post.title}
      </h3>

      {!compact && (
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed mb-8 line-clamp-3 text-[var(--color-text-body)]">
            {post.excerpt}
          </p>
        </div>
      )}

      <div className={`${compact ? 'pt-4' : 'pt-6'} border-t border-[var(--color-bg-border-soft)] flex items-center justify-between mt-auto`}>
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-medium text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="cta-link text-xs font-bold text-blue-600 flex items-center gap-1">
          Read <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

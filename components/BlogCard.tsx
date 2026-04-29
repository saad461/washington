import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogCardProps {
 post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
 return (
 <Link
 href={`/blog/${post.slug}`}
 className="group card-standard flex flex-col h-full overflow-hidden"
 >
 <div className="relative w-full aspect-[16/10] mb-6 rounded-xl overflow-hidden bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)]">
 <Image
 src={post.image?.url || '/img/blog-placeholder.webp'}
 alt={post.image?.alt || post.title}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
 </div>

 <div className="flex items-center gap-4 mb-4">
 <span className="badge-category">
 {post.category}
 </span>
 <span className="w-1 h-1 bg-[var(--color-bg-border)] rounded-full" />
 <div className="badge-meta">
 {post.readTime}
 </div>
 </div>

 <h3 className="font-semibold mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors leading-tight">
 {post.title}
 </h3>

 <div className="flex-1">
 <p className="text-sm font-medium leading-relaxed mb-8 line-clamp-3 text-[var(--color-text-body)]">
 {post.excerpt}
 </p>
 </div>

 <div className="pt-6 border-t border-[var(--color-bg-border-soft)] flex items-center justify-between">
 <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-medium text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
 <Calendar size={12} className="text-[var(--color-text-secondary)]" />
 {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
 </div>
 <div className="cta-link">
 Read Article <ArrowRight size={14} />
 </div>
 </div>
 </Link>
 );
};

export default BlogCard;

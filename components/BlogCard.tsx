import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:border-indigo-200 hover:bg-gray-50 transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      <div className="relative w-full aspect-[16/10] mb-6 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={post.image?.url || '/img/blog-placeholder.webp'}
          alt={post.image?.alt || post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          {post.category}
        </span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          {post.readTime}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight font-heading">
        {post.title}
      </h3>

      <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
        {post.excerpt}
      </p>

      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Calendar size={12} className="text-gray-400" />
          {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1 border border-gray-100">
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

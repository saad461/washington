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
 className="group card !p-0 flex flex-col h-full overflow-hidden hover:border-brand transition-colors"
 >
 <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg-subtle border-b border-border-default">
 <Image
 src={post.image?.url || '/img/blog-placeholder.webp'}
 alt={post.image?.alt || post.title}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
 </div>

 <div className="p-6 flex flex-col flex-1">
   <div className="flex items-center gap-4 mb-4">
     <span className="badge badge-brand">
       {post.category}
     </span>
     <span className="text-overline !text-text-muted">
       {post.readTime}
     </span>
   </div>

   <h3 className="text-h4 mb-4 group-hover:text-brand transition-colors">
     {post.title}
   </h3>

   <div className="flex-1">
     <p className="text-sm text-text-body line-clamp-3 mb-8">
       {post.excerpt}
     </p>
   </div>

   <div className="pt-6 border-t border-border-default flex items-center justify-between">
     <div className="flex items-center gap-2 text-overline !text-text-muted">
       <Calendar size={12}  />
       {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
     </div>
     <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
       <ArrowRight size={14} />
     </div>
   </div>
 </div>
 </Link>
 );
};

export default BlogCard;

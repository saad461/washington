import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  User,
  Clock,
  HelpCircle,
  Scale,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { blogs, type BlogPost } from '@/data/blogs';
import MobileTOC from '@/components/MobileTOC';
import AuthorBox from '@/components/AuthorBox';
import FAQAccordion from '@/components/FAQAccordion';
import AdContainer from '@/components/AdContainer';
import BlogCTA from '@/components/BlogCTA';
import { cleanEmDashContent } from '@/lib/textOptimizer';
import BlogCard from '@/components/BlogCard';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find(p => p.slug === slug);

  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://wcssc.site/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      url: `https://wcssc.site/blog/${slug}`,
      images: [{ url: post.image?.url || '/wcssc-og.jpg', width: 1200, height: 630 }],
    },
  };
}

function getValidPost(slug: string): BlogPost | null {
  const post = blogs.find(p => p.slug === slug);
  if (!post || !post.title || !post.content || !post.createdAt) return null;
  return post;
}

function parseTOC(htmlContent: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<(h[23])>(.*?)<\/\1>/g;

  const updatedHtml = htmlContent.replace(regex, (match, tag, text) => {
    const rawText = text.replace(/<[^>]+>/g, '').trim();
    const id = rawText.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text: rawText, level: tag === 'h2' ? 2 : 3 });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { headings, updatedHtml };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getValidPost(slug);

  if (!post) notFound();

  const cleanedContent = cleanEmDashContent(post.content);
  const { headings, updatedHtml } = parseTOC(cleanedContent);

  // Related Articles Logic
  const allOtherArticles = blogs.filter(b => b.slug !== slug);
  const sameCategory = allOtherArticles.filter(b => b.category === post.category);
  const others = allOtherArticles.filter(b => b.category !== post.category);

  const relatedArticles = [...sameCategory, ...others].slice(0, 3);

  // Prev/Next Navigation
  const currentIndex = blogs.findIndex(b => b.slug === slug);
  const prevArticle = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextArticle = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <div className="flex-1 bg-white relative overflow-hidden">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-reading relative z-10">
          <nav className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft size={16} />
              Back to Resource Center
            </Link>
          </nav>

          <header>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="badge-category !px-4 !py-1.5 !text-[11px] !font-bold !uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Updated {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-gray-900">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10 py-8 border-y border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Author</p>
                  <p className="font-bold text-gray-900 leading-none">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Clock size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reading Time</p>
                  <p className="font-bold text-gray-900 leading-none">{post.readTime}</p>
                </div>
              </div>
            </div>

            {post.image?.url && (
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden mt-12 shadow-xl border border-gray-100">
                <Image src={post.image.url} alt={post.image.alt || post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
              </div>
            )}
          </header>
        </div>
      </section>

      {/* ── ARTICLE CONTENT ─────────────────────────────────────────────── */}
      <section className="section-default bg-white relative z-10">
        <div className="container-reading">
          <div className="mb-12">
            <MobileTOC headings={headings} />
          </div>

          <AdContainer slot="top" wordCount={updatedHtml.split(' ').length} />

          <div className="prose prose-gray max-w-none mb-20 text-[17px] leading-[1.8] text-gray-700">
             <style dangerouslySetInnerHTML={{ __html: `
               .prose h2 { font-size: 28px; font-weight: 700; color: #111827; margin-top: 64px; margin-bottom: 24px; line-height: 1.25; }
               .prose h3 { font-size: 22px; font-weight: 700; color: #111827; margin-top: 40px; margin-bottom: 16px; line-height: 1.35; }
               .prose p { margin-bottom: 24px; }
               .prose strong { color: #111827; font-weight: 700; }
               .prose a { color: #2563eb; font-weight: 600; text-decoration: none; }
               .prose a:hover { text-decoration: underline; }
               .prose ul, .prose ol { margin-bottom: 32px; padding-left: 20px; }
               .prose li { margin-bottom: 12px; }
               .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 24px; italic; color: #4b5563; margin: 40px 0; }
             `}} />
             <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
          </div>

          <AdContainer slot="mid" wordCount={updatedHtml.split(' ').length} />

          {/* Related Articles Section */}
          <section aria-label="Related articles" className="my-12 pt-8 border-t border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Keep Reading
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Washington Child Support Guides</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map(article => (
                <BlogCard key={article.slug} post={article} compact />
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ── FAQS ────────────────────────────────────────────────────────── */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="section-default bg-[var(--color-bg-subtle)] border-y border-gray-100">
          <div className="container-reading">
            <div className="text-center mb-12 space-y-4">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Common Parent Questions</p>
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions About Washington Child Support</h2>
            </div>
            <FAQAccordion faqs={post.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
          </div>
        </section>
      )}

      {/* ── FOOTER CONTENT ──────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading">
          <div className="mb-24">
            <BlogCTA />
          </div>

          <div className="pt-16 border-t border-gray-100">
            <AuthorBox />
          </div>

          <div className="mt-16 p-10 bg-[var(--color-bg-subtle)] border border-gray-200 rounded-3xl">
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              All WCSSC insights are reviewed for compliance with <strong className="text-gray-900">RCW 26.19.065</strong> and official Washington State guidelines. Our team cross-references all data with official AOC publications.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link href="/editorial-methodology" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                Our methodology <ChevronRight size={14} />
              </Link>
              <Link href="/disclaimer" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                Legal Disclaimer <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Article Navigation */}
          <nav aria-label="Article navigation" className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
            <div>
              {prevArticle && (
                <Link href={`/blog/${prevArticle.slug}`} className="group flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">← Previous</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {prevArticle.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {nextArticle && (
                <Link href={`/blog/${nextArticle.slug}`} className="group flex flex-col items-end">
                  <span className="text-xs text-gray-400 mb-1">Next →</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {nextArticle.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

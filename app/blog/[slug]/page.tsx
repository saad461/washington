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

  return (
    <main className="flex-1 bg-white relative overflow-hidden">
      <div className="container-reading section-default relative z-10">
        <nav className="mb-12">
          <Link href="/blog" className="cta-link !font-bold">
            <ArrowLeft size={14} className="mr-1" />
            Back to Resource Center
          </Link>
        </nav>

        <article>
          <header className="mb-12 md:mb-20">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="badge-category !px-4 !py-1.5 !text-[12px] !font-bold">
                {post.category}
              </span>
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">
                Updated {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-[var(--color-text-primary)]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-[var(--color-bg-border-soft)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)]">
                  <User size={18} className="text-[var(--color-text-secondary)]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Author</p>
                  <p className="font-bold text-[var(--color-text-primary)] leading-none">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center border border-[var(--color-bg-border)]">
                  <Clock size={18} className="text-[var(--color-text-secondary)]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Reading Time</p>
                  <p className="font-bold text-[var(--color-text-primary)] leading-none">{post.readTime}</p>
                </div>
              </div>
            </div>

            {post.image?.url && (
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden mt-12 shadow-[var(--shadow-card-md)] border border-[var(--color-bg-border)]">
                <Image src={post.image.url} alt={post.image.alt || post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
              </div>
            )}
          </header>

          <div className="mb-12">
            <MobileTOC headings={headings} />
          </div>

          <AdContainer slot="top" wordCount={updatedHtml.split(' ').length} />

          {/* Article prose */}
          <div className="prose prose-gray max-w-none mb-20 text-[16px] leading-[1.8] text-[var(--color-text-body)]">
             <style dangerouslySetInnerHTML={{ __html: `
               .prose h2 { font-size: 24px; font-weight: 700; color: var(--color-text-primary); margin-top: 48px; margin-bottom: 24px; line-height: 1.3; }
               .prose h3 { font-size: 20px; font-weight: 600; color: var(--color-text-primary); margin-top: 32px; margin-bottom: 16px; line-height: 1.4; }
               .prose p { font-size: 16px; line-height: 1.8; color: var(--color-text-body); margin-bottom: 24px; }
               .prose strong { color: var(--color-text-primary); font-weight: 700; }
               .prose a { color: var(--color-brand-primary); font-weight: 500; text-decoration: none; }
               .prose a:hover { text-decoration: underline; }
               .prose ul, .prose ol { margin-bottom: 24px; }
               .prose li { font-size: 16px; line-height: 1.8; margin-bottom: 8px; }
             `}} />
             <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
          </div>

          <AdContainer slot="mid" wordCount={updatedHtml.split(' ').length} />

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-24 md:mt-32">
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-[var(--color-text-primary)]">
                <HelpCircle className="w-8 h-8 text-[var(--color-brand-primary)]" />
                Common Questions
              </h2>
              <FAQAccordion items={post.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
            </section>
          )}

          <div className="mt-24">
            <BlogCTA />
          </div>

          <div className="mt-24 border-t border-[var(--color-bg-border-soft)] pt-16">
            <AuthorBox />
          </div>

          <div className="callout-gray mt-16 !p-8 md:!p-10 border-2">
            <p className="text-[12px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" /> E-E-A-T Disclosure
            </p>
            <p className="text-sm text-[var(--color-text-body)] leading-relaxed mb-6">
              All WCSSC insights are reviewed for compliance with <strong className="text-[var(--color-text-primary)]">RCW 26.19.065</strong> and official Washington State guidelines. Our team cross-references all data with official AOC publications.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link href="/editorial-methodology" className="cta-link !font-bold">
                Our methodology <ChevronRight size={14} />
              </Link>
              <Link href="/disclaimer" className="cta-link !font-bold">
                Legal Disclaimer <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

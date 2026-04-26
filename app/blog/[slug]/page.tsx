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
    <main className="flex-1 bg-page relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-50/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container-reading section-default relative z-10">
        <nav className="mb-12">
          <Link href="/blog" className="btn-ghost !h-10 !px-0 w-fit">
            <ArrowLeft size={14} className="mr-2" />
            Back to Resource Center
          </Link>
        </nav>

        <article>
          <header className="mb-12 md:mb-20">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full label-metadata font-bold">
                {post.category}
              </span>
              <span className="label-metadata text-gray-400">
                Updated {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="label-metadata text-gray-400 mb-0.5">Author</p>
                  <p className="font-bold text-gray-900 leading-none">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <Clock size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="label-metadata text-gray-400 mb-0.5">Reading Time</p>
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

          <div className="mb-12">
            <MobileTOC headings={headings} />
          </div>

          <AdContainer slot="top" wordCount={updatedHtml.split(' ').length} />

          <div className="prose-reading mb-20" dangerouslySetInnerHTML={{ __html: updatedHtml }} />

          <AdContainer slot="mid" wordCount={updatedHtml.split(' ').length} />

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-24 md:mt-32">
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                <HelpCircle className="w-8 h-8 text-indigo-600" />
                Common Questions
              </h2>
              <FAQAccordion items={post.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
            </section>
          )}

          <div className="mt-24">
            <BlogCTA />
          </div>

          <div className="mt-24 border-t border-gray-100 pt-16">
            <AuthorBox />
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="label-metadata mb-4 flex items-center gap-2 text-indigo-600">
              <Scale className="w-4 h-4" /> E-E-A-T Disclosure
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              All WCSSC insights are reviewed for compliance with RCW 26.19.065 and official Washington State guidelines. Our team cross-references all data with official AOC publications.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link href="/editorial-methodology" className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-2">
                Our methodology <ChevronRight size={14} />
              </Link>
              <Link href="/disclaimer" className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-2">
                Legal Disclaimer <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  User, 
  Clock, 
  HelpCircle,
  Scale
} from 'lucide-react';
import { blogs, type BlogPost } from '@/data/blogs';
import TableOfContents, { TOCItem } from '@/components/TableOfContents';
import MobileTOC from '@/components/MobileTOC';
import AuthorBox from '@/components/AuthorBox';
import FAQAccordion from '@/components/FAQAccordion';
import AdContainer from '@/components/AdContainer';
import BlogCTA from '@/components/BlogCTA';
import { cleanEmDashContent } from '@/lib/textOptimizer';

type Props = {
  params: Promise<{ slug: string }>;
};

// SSG: Generate paths at build time
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

// SEO: Metadata generation
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
      images: [
        { 
          url: post.image?.url || '/wcssc-og.jpg', 
          width: post.image?.width || 1200, 
          height: post.image?.height || 630,
          alt: post.image?.alt || post.title
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image?.url || '/wcssc-og.jpg'],
    }
  };
}

// Validate blog structure
function getValidPost(slug: string): BlogPost | null {
  const post = blogs.find(p => p.slug === slug);
  if (!post) return null;
  if (!post.title || !post.content || !post.createdAt) return null;
  return post;
}

function parseTOC(htmlContent: string) {
  const headings: TOCItem[] = [];
  const regex = /<(h[23])>(.*?)<\/\1>/g;
  
  const updatedHtml = htmlContent.replace(regex, (match, tag, text) => {
    // Strip nested tags, if any, to get raw text for the TOC item
    const rawText = text.replace(/<[^>]+>/g, '').trim();
    // Create a safe anchor ID
    const id = rawText.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
    
    headings.push({ id, text: rawText, level: tag === 'h2' ? 2 : 3 });
    // Inject the ID into the original tag 
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { headings, updatedHtml };
}

const Breadcrumbs = ({ title }: { title: string }) => (
  <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 flex-wrap">
    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
    <span className="mx-3 opacity-30">/</span>
    <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
    <span className="mx-3 opacity-30">/</span>
    <span className="text-gray-900 line-clamp-1">{title}</span>
  </nav>
);

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getValidPost(slug);

  if (!post) notFound();

  // Extract structural content safely
  const cleanedContent = cleanEmDashContent(post.content);
  const { headings, updatedHtml } = parseTOC(cleanedContent);

  // Structured Data (Article + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.metaDescription,
        "author": {
          "@type": "Person",
          "name": "WCSSC Editorial Team",
          "url": "https://wcssc.site/about"
        },
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt || post.createdAt,
        "image": post.image?.url ? `https://wcssc.site${post.image.url}` : "https://wcssc.site/wcssc-og.webp",
        "publisher": {
          "@type": "Organization",
          "name": "Washington Child Support Schedule Center",
          "logo": { "@type": "ImageObject", "url": "https://wcssc.site/wcssc-og.webp", "width": 1200, "height": 630 }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://wcssc.site/blog/${slug}` }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Decorative blurred backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
        <div className="w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-40 absolute top-[-10%] translate-x-[-30%]" />
        <div className="w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[80px] opacity-40 absolute bottom-[0%] translate-x-[30%]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        
        <Breadcrumbs title={post.title} />

        {/* Global Article Wrapper */}
        <div className="w-full">
          
          {/* Main Content */}
          <article className="w-full">
            
            {/* Header */}
            <header className="mb-12 md:mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                  {post.category}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Updated: {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-8 font-heading">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">Author</p>
                    <p className="text-sm font-bold text-gray-900 leading-none">{post.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">Time</p>
                    <p className="text-sm font-bold text-gray-900 leading-none">{post.readTime} Read</p>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.image?.url && (
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-sm border border-gray-100">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}
            </header>

            {/* Mobile TOC (collapsed, above article body on small screens) */}
            <div className="mb-10">
              <MobileTOC headings={headings} />
            </div>

            {/* Ad Container: TOP */}
            <AdContainer slot="top" wordCount={updatedHtml.split(' ').length} />

            {/* Content Body */}
            <div className="prose prose-gray prose-lg max-w-none
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-6 prose-h2:-scroll-mt-24 prose-h2:font-heading
              prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-900 prose-h3:mt-10 prose-h3:mb-4 prose-h3:-scroll-mt-24 prose-h3:font-heading
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-a:text-indigo-600 prose-a:font-bold prose-a:no-underline prose-a:border-b prose-a:border-indigo-100 hover:prose-a:border-indigo-600 transition-colors
              prose-li:text-gray-700 prose-li:mb-2
              prose-img:rounded-2xl prose-img:border prose-img:border-gray-100
            "
              dangerouslySetInnerHTML={{ __html: updatedHtml }}
            />

            {/* Ad Container: MIDDLE */}
            <AdContainer slot="mid" wordCount={updatedHtml.split(' ').length} />

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-20">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-10 flex items-center gap-3 font-heading">
                  <HelpCircle className="w-6 h-6 text-gray-400" />
                  Common Questions
                </h2>
                <FAQAccordion items={post.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
              </section>
            )}

            {/* Ad Container: BOTTOM */}
            <div className="mt-16">
              <AdContainer slot="bottom" wordCount={updatedHtml.split(' ').length} />
            </div>

            {/* CTA Block */}
            <BlogCTA />

            {/* Author Credit */}
            <div className="mt-20">
              <AuthorBox />
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-400" /> E-E-A-T Disclosure
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                All WCSSC insights are reviewed for compliance with RCW 26.19.065 and official AOC guidelines.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/editorial-methodology" className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-800 transition-colors">
                  Our methodology &rarr;
                </Link>
                <Link href="/disclaimer" className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-800 transition-colors">
                  Legal Disclaimer &rarr;
                </Link>
              </div>
            </div>

          </article>

        </div>
      </div>
    </div>
  );
}

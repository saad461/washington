import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  HelpCircle
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
    <div className="min-h-screen bg-[#FDFDFE] font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Back navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors mb-20 group no-print">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Resource Center
        </Link>

        {/* Global Article Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Main Content Column */}
          <article className="lg:col-span-8">
            
            {/* Header */}
            <header className="mb-10 md:mb-16">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] rounded-md ring-1 ring-indigo-200">
                  {post.category}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Updated: {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-10 italic">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 py-8 border-t border-slate-100 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Author</p>
                    <p className="text-sm font-black text-slate-900 leading-none">{post.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Time</p>
                    <p className="text-sm font-black text-slate-900 leading-none">{post.readTime} Read</p>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.image?.url && (
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-[2rem] overflow-hidden mb-12 shadow-xl shadow-indigo-900/5 ring-1 ring-slate-100">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt || post.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}
            </header>

            {/* Mobile TOC (collapsed, above article body on small screens) */}
            <MobileTOC headings={headings} />

            {/* Ad Placeholder: TOP */}
            <AdContainer slot="top" wordCount={updatedHtml.split(' ').length} />

            {/* Content Body */}
            <div className="prose prose-slate prose-lg max-w-none 
              prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tight prose-h2:text-slate-900 prose-h2:italic prose-h2:mt-16 prose-h2:mb-8 prose-h2:-scroll-mt-24
              prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-10 prose-h3:mb-4 prose-h3:-scroll-mt-24
              prose-p:text-slate-600 prose-p:font-medium prose-p:leading-loose prose-p:mb-8
              prose-strong:text-slate-900 prose-strong:font-black
              prose-a:text-indigo-600 prose-a:font-black prose-a:no-underline prose-a:decoration-indigo-100 prose-a:underline-offset-4 hover:prose-a:underline
              prose-li:text-slate-600 prose-li:font-medium prose-li:mb-2
            "
              dangerouslySetInnerHTML={{ __html: updatedHtml }}
            />

            {/* Ad Placeholder: MIDDLE */}
            <AdContainer slot="mid" wordCount={updatedHtml.split(' ').length} />

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-20">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight italic mb-10 flex items-center gap-4">
                  <HelpCircle className="w-8 h-8 text-indigo-600" />
                  Common Questions
                </h2>
                <FAQAccordion items={post.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
              </section>
            )}

            {/* Ad Placeholder: BOTTOM */}
            <div className="mt-16">
              <AdContainer slot="bottom" wordCount={updatedHtml.split(' ').length} />
            </div>

            {/* CTA Block */}
            <BlogCTA />

            {/* Author Credit */}
            <div className="mt-20">
              <AuthorBox />
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 no-print relative">
            {headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}
            
            <div className={`p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 italic ${headings.length > 0 ? 'mt-12' : ''}`}>
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">E-E-A-T Disclosure</h4>
              <p className="text-xs text-indigo-900 font-bold leading-relaxed mb-6">
                All WCSSC insights are reviewed for compliance with RCW 26.19.065 and official AOC guidelines.
              </p>
              <Link href="/editorial-methodology" className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors block mb-2">
                Our calculation methodology &rarr;
              </Link>
              <Link href="/disclaimer" className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors">
                Read Legal Disclaimer &rarr;
              </Link>
            </div>

            {/* Other Blogs Promo */}
            <div className="mt-12 sticky top-24">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 ml-4">Trending Read</h4>
              <div className="space-y-4">
                {blogs.filter(p => p.slug !== slug).slice(0, 3).map((other) => (
                  <Link 
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group block p-6 bg-white border border-slate-100 shadow-sm rounded-[1.5rem] hover:border-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-900/5"
                  >
                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 italic">{other.category}</p>
                    <p className="text-sm font-black text-slate-900 transition-colors group-hover:text-indigo-600 leading-tight">
                      {other.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

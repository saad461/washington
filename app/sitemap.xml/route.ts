import { washingtonCounties } from '@/data/washingtonCounties';
import { blogs } from '@/data/blogs';
import { glossaryTerms } from '@/data/glossary';

export async function GET() {
  const baseUrl = 'https://wscss.site';
  const lastModified = '2026-04-09';

  const pages = [
    { url: '', lastmod: lastModified, freq: 'weekly', priority: '1.0' },
    { url: '/worksheet', lastmod: lastModified, freq: 'monthly', priority: '0.9' },
    { url: '/extra-expenses', lastmod: lastModified, freq: 'monthly', priority: '0.9' },
    { url: '/glossary', lastmod: lastModified, freq: 'monthly', priority: '0.8' },
    { url: '/blog', lastmod: '2026-05-07', freq: 'weekly', priority: '0.8' },
    { url: '/washington-courts', lastmod: lastModified, freq: 'monthly', priority: '0.7' },
    { url: '/about', lastmod: lastModified, freq: 'monthly', priority: '0.7' },
    { url: '/how-to-file-child-support-washington', lastmod: lastModified, freq: 'monthly', priority: '0.7' },
    { url: '/compare-2024-2026', lastmod: lastModified, freq: 'monthly', priority: '0.7' },
    { url: '/editorial-methodology', lastmod: lastModified, freq: 'monthly', priority: '0.7' },
  ];

  // Target counties
  ['king-county', 'pierce-county', 'snohomish-county', 'spokane-county'].forEach((slug) => {
    pages.push({
      url: `/${slug}-income-5000-2-children`,
      lastmod: lastModified,
      freq: 'monthly',
      priority: '0.8',
    });
  });

  // 39 Counties
  washingtonCounties.forEach((county) => {
    pages.push({
      url: `/washington-courts/${county.slug}`,
      lastmod: lastModified,
      freq: 'monthly',
      priority: '0.8',
    });
  });

  // Glossary
  glossaryTerms.forEach((term) => {
    pages.push({
      url: `/glossary/${term.slug}`,
      lastmod: lastModified,
      freq: 'monthly',
      priority: '0.7',
    });
  });

  // Blogs
  blogs.forEach((post) => {
    pages.push({
      url: `/blog/${post.slug}`,
      lastmod: post.createdAt,
      freq: 'monthly',
      priority: '0.7',
    });
  });

  const escapeXml = (unsafe: string) => unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(`${baseUrl}${page.url}`)}</loc>
    <lastmod>${escapeXml(page.lastmod)}</lastmod>
    <changefreq>${escapeXml(page.freq)}</changefreq>
    <priority>${escapeXml(page.priority)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

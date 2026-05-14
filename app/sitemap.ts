import { MetadataRoute } from 'next';
import { washingtonCounties } from '@/data/washingtonCounties';
import { blogs } from '@/data/blogs';
import { glossaryTerms } from '@/data/glossary';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wscss.site';
  const lastModified = '2026-04-09';

  // Base routes with specific priorities and frequencies
  const sitemapUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/worksheet`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/joint-custody-calculator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/extra-expenses`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: '2026-05-07',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/washington-courts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-to-file-child-support-washington`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/compare-2024-2026`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editorial-methodology`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // County income pages (all 4 specified)
  const targetCounties = ['king-county', 'pierce-county', 'snohomish-county', 'spokane-county'];
  targetCounties.forEach((slug) => {
    sitemapUrls.push({
      url: `${baseUrl}/${slug}-income-5000-2-children`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // All 39 county subpages
  washingtonCounties.forEach((county) => {
    sitemapUrls.push({
      url: `${baseUrl}/washington-courts/${county.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // All 20 glossary term pages
  glossaryTerms.forEach((term) => {
    sitemapUrls.push({
      url: `${baseUrl}/glossary/${term.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // All blog posts
  blogs.forEach((post) => {
    sitemapUrls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.createdAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapUrls;
}

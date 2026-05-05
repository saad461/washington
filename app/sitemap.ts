import { MetadataRoute } from 'next';
import { washingtonCounties } from '@/data/washingtonCounties';
import { blogs } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wscss.site';

  const lastModified = new Date();

  // Base priority routes (homepage + all static pages)
  const sitemapUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/worksheet`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Add Blog Posts — use real post dates for accurate lastmod
  blogs.forEach((post) => {
    sitemapUrls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // RESTRICT SITEMAP FOR NEW DOMAIN: 
  // Submitting 8,000 URLs to a brand new domain triggers Google Sandbox filters.
  // Phase 1 (Launch): Submit only priority county pages (4 common income tiers, 2 children counts).
  const priorityIncomes = [3000, 5000, 7000, 10000];
  const priorityChildren = [1, 2];

  // Generate Priority County Pages (39 * 4 * 2 = 312 high-intent URLs)
  for (const county of washingtonCounties) {
    for (const income of priorityIncomes) {
      for (const children of priorityChildren) {
        const slug = `${county.slug}-income-${income}-${children}-${children === 1 ? 'child' : 'children'}`;
        sitemapUrls.push({
          url: `${baseUrl}/${slug}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.65,
        });
      }
    }
  }

  // Generic pages for baseline indexing
  for (const income of priorityIncomes) {
    for (const children of priorityChildren) {
      const slug = `income-${income}-${children}-${children === 1 ? 'child' : 'children'}`;
      sitemapUrls.push({
        url: `${baseUrl}/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return sitemapUrls;
}

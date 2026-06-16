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
      url: `${baseUrl}/extra-expenses`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/joint-custody-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/deviation-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/modification-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: '2026-05-14',
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
      lastModified: '2026-05-18',
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
    // New 2026 Blogs
    {
      url: `${baseUrl}/blog/joint-custody-child-support-washington-2026`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/washington-child-support-deviation-2026`,
      lastModified: '2026-05-15',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-modify-child-support-washington-2026`,
      lastModified: '2026-05-16',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/what-counts-as-income-child-support-washington-2026`,
      lastModified: '2026-05-17',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/washington-child-support-schedule-2026-economic-table`,
      lastModified: '2026-05-18',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Programmatic Income Pages (Top Counties & Generic)
  // To keep sitemap size manageable (< 50k), we index high-value tiers
  const topCounties = ['king-county', 'pierce-county', 'snohomish-county', 'spokane-county'];
  const genericIncrements = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 18000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
  const topIncrements = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 14000, 15000, 16000, 17500, 20000, 25000, 30000, 40000, 50000];
  const standardIncrements = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000];
  const commonChildren = [1, 2, 3];

  // 1. Generic Income Pages (no county)
  genericIncrements.forEach((income) => {
    commonChildren.forEach((children) => {
      const childrenText = children === 1 ? '1-child' : `${children}-children`;
      sitemapUrls.push({
        url: `${baseUrl}/income-${income}-${childrenText}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // 2. High-value County Income Pages
  washingtonCounties.forEach((county) => {
    const isTop = topCounties.includes(county.slug);
    const increments = isTop ? topIncrements : standardIncrements;

    increments.forEach((income) => {
      // 1 & 2 children are most common
      [1, 2].forEach((children) => {
        const childrenText = children === 1 ? '1-child' : `${children}-children`;
        sitemapUrls.push({
          url: `${baseUrl}/${county.slug}-income-${income}-${childrenText}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: isTop ? 0.6 : 0.5,
        });
      });
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

  // All blog posts (excluding the new ones already added explicitly)
  const explicitBlogSlugs = [
    'joint-custody-child-support-washington-2026',
    'washington-child-support-deviation-2026',
    'how-to-modify-child-support-washington-2026',
    'what-counts-as-income-child-support-washington-2026',
    'washington-child-support-schedule-2026-economic-table'
  ];

  blogs.forEach((post) => {
    if (explicitBlogSlugs.includes(post.slug)) return;
    sitemapUrls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.createdAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapUrls;
}

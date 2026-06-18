import { Metadata, MetadataRoute } from 'next';
import { washingtonCounties } from '@/data/washingtonCounties';
import { blogs } from '@/data/blogs';
import { glossaryTerms } from '@/data/glossary';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wscss.site';
  const lastModified = new Date().toISOString().split('T')[0];

  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/worksheet`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/extra-expenses`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/joint-custody-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/deviation-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/modification-calculator`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: '2026-05-14',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // New 8 Calculators Phase 3
    {
      url: `${baseUrl}/parenting-time-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/childcare-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/health-insurance-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/medical-expense-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education-expense-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arrears-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/net-income-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tax-benefit-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: '2026-05-18',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/washington-courts`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-to-file-child-support-washington`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/compare-2024-2026`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editorial-methodology`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  const sitemapUrls: MetadataRoute.Sitemap = [...staticPages];

  // Programmatic Income Pages
  const genericIncrements = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 18000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
  const standardIncrements = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000];
  const commonChildren = [1, 2, 3];

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

  washingtonCounties.forEach((county) => {
    standardIncrements.forEach((income) => {
      [1, 2].forEach((children) => {
        const childrenText = children === 1 ? '1-child' : `${children}-children`;
        sitemapUrls.push({
          url: `${baseUrl}/${county.slug}-income-${income}-${childrenText}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    });

    sitemapUrls.push({
      url: `${baseUrl}/washington-courts/${county.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  glossaryTerms.forEach((term) => {
    sitemapUrls.push({
      url: `${baseUrl}/glossary/${term.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

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

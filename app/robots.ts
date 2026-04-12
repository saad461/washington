import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/tmp/'
      ],
    },
    sitemap: 'https://wcssc.site/sitemap.xml',
  };
}

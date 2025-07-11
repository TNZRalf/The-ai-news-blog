import { getAllArticles } from '../../lib/articles';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const articles = getAllArticles();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainews.com';
    
    // Static pages with their priorities and change frequencies
    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' }, // Homepage
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/contact', changefreq: 'monthly', priority: '0.7' },
      { url: '/support', changefreq: 'monthly', priority: '0.7' },
      { url: '/topics', changefreq: 'weekly', priority: '0.9' },
      { url: '/insights', changefreq: 'weekly', priority: '0.9' },
      { url: '/ai-tools', changefreq: 'weekly', priority: '0.8' },
      { url: '/subscribe', changefreq: 'monthly', priority: '0.6' },
      { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
      { url: '/terms', changefreq: 'yearly', priority: '0.3' }
    ];

    const currentDate = new Date().toISOString();
    
    // Generate sitemap XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages.map(page => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${articles.map(article => `
  <url>
    <loc>${siteUrl}/${article.slug}</loc>
    <lastmod>${new Date(article.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${article.image ? `
    <image:image>
      <image:loc>${article.image}</image:loc>
      <image:title><![CDATA[${article.title}]]></image:title>
      <image:caption><![CDATA[${article.description}]]></image:caption>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;

    // Set appropriate headers for XML sitemap
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24 hour cache
    
    return res.status(200).send(sitemapXml);
  } catch (error) {
    console.error('Sitemap Generation Error:', error);
    return res.status(500).json({ message: 'Error generating sitemap' });
  }
} 
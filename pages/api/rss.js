import { getAllArticles } from '../../lib/articles';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const articles = getAllArticles();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainews.com';
    const feedTitle = 'The AI NEWS';
    const feedDescription = 'Latest AI news, insights, and tools for the artificial intelligence community';
    
    // Generate RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <managingEditor>the.ainews0@gmail.com (The AI NEWS)</managingEditor>
    <webMaster>the.ainews0@gmail.com (The AI NEWS)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>${feedTitle}</title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.description}]]></description>
      <link>${siteUrl}/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>the.ainews0@gmail.com (${article.source})</author>
      ${article.tags ? article.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
      ${article.image ? `<enclosure url="${article.image}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

    // Set appropriate headers for RSS feed
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return res.status(200).send(rssXml);
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return res.status(500).json({ message: 'Error generating RSS feed' });
  }
} 
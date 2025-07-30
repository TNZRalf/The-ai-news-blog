const fs = require('fs').promises;
const path = require('path');

async function rebuildBlogContent() {
  try {
    console.log('🔄 Rebuilding blog_content.json with all 59 articles from formatted_articles.json...');
    
    // Read the enhanced articles
    const formattedArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const formattedArticles = JSON.parse(await fs.readFile(formattedArticlesPath, 'utf8'));
    
    // Read the original blog content structure
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const originalBlogContent = JSON.parse(await fs.readFile(blogContentPath, 'utf8'));
    
    // Create backup of current blog_content.json
    const backupPath = path.join(process.cwd(), 'public', `blog_content_backup_${Date.now()}.json`);
    await fs.writeFile(backupPath, JSON.stringify(originalBlogContent, null, 2));
    console.log(`✅ Backup created: ${path.basename(backupPath)}`);
    
    // Convert formatted articles to blog content format
    const convertedArticles = formattedArticles.map(article => ({
      id: article.originalId,
      title: article.title,
      url: article.originalUrl,
      source: article.source,
      published: new Date(article.date + 'T00:00:00Z').toISOString(),
      summary: "",
      full_content: article.content,
      content_available: true,
      content_word_count: article.wordCount,
      tags: article.tags,
      quality_score: article.qualityScore,
      image_url: article.image,
      has_image: true,
      generated_at: new Date().toISOString(),
      metadata: {
        word_count: Math.floor(article.wordCount / 50), // Approximate
        summary_source: "",
        blog_ready: true,
        fetched_with_full_content: true
      },
      enhanced: article.enhanced || false,
      enhanced_at: article.enhancedAt || null
    }));
    
    // Create new blog content structure
    const newBlogContent = {
      generation_metadata: {
        timestamp: new Date().toISOString(),
        total_scheduled_articles: convertedArticles.length,
        blog_articles_generated: convertedArticles.length,
        full_content_fetched: convertedArticles.length,
        failed_content_fetch: 0,
        dry_run: false
      },
      generated_at: new Date().toISOString(),
      total_articles: convertedArticles.length,
      articles: convertedArticles,
      enhanced_at: new Date().toISOString(),
      enhanced_articles_count: convertedArticles.filter(a => a.enhanced).length,
      rebuilt_at: new Date().toISOString()
    };
    
    // Write the new blog content
    await fs.writeFile(blogContentPath, JSON.stringify(newBlogContent, null, 2));
    
    console.log(`✅ Successfully rebuilt blog_content.json`);
    console.log(`📊 Total articles: ${convertedArticles.length}`);
    console.log(`📊 Enhanced articles: ${convertedArticles.filter(a => a.enhanced).length}`);
    console.log(`📊 Success rate: ${((convertedArticles.filter(a => a.enhanced).length / convertedArticles.length) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Error rebuilding blog content:', error);
    process.exit(1);
  }
}

// Run the rebuild
rebuildBlogContent(); 
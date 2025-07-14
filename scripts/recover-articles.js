const fs = require('fs').promises;
const path = require('path');

async function recoverAndMergeArticles() {
  try {
    console.log('🔄 Starting article recovery and merge...');
    
    const oldArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles_before_fallbacks.json');
    const newArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const outputPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    
    // Read old articles
    console.log('📖 Reading old articles from backup...');
    const oldArticlesRaw = await fs.readFile(oldArticlesPath, 'utf-8');
    const oldArticles = JSON.parse(oldArticlesRaw);
    console.log(`Found ${oldArticles.length} old articles`);
    
    // Read new articles
    console.log('📖 Reading new articles...');
    const newArticlesRaw = await fs.readFile(newArticlesPath, 'utf-8');
    const newArticles = JSON.parse(newArticlesRaw);
    console.log(`Found ${newArticles.length} new articles`);
    
    // Create a Set of new article titles and URLs to avoid duplicates
    const newArticleTitles = new Set(newArticles.map(article => article.title.toLowerCase()));
    const newArticleUrls = new Set(newArticles.map(article => article.originalUrl).filter(Boolean));
    
    // Filter out any old articles that might duplicate new ones
    const uniqueOldArticles = oldArticles.filter(article => {
      const titleMatch = newArticleTitles.has(article.title.toLowerCase());
      const urlMatch = article.originalUrl && newArticleUrls.has(article.originalUrl);
      
      if (titleMatch || urlMatch) {
        console.log(`🔄 Skipping duplicate article: "${article.title}"`);
        return false;
      }
      return true;
    });
    
    console.log(`📝 After deduplication: ${uniqueOldArticles.length} old articles to keep`);
    
    // Update IDs to ensure they don't conflict
    let nextId = Math.max(...newArticles.map(a => a.id), 0) + 1;
    
    uniqueOldArticles.forEach(article => {
      article.id = nextId++;
    });
    
    // Merge articles: new articles first (to maintain recent date order), then old articles
    const mergedArticles = [...newArticles, ...uniqueOldArticles];
    
    // Sort by date (newest first)
    mergedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create backup of current state before merging
    const backupPath = path.join(process.cwd(), 'public', `formatted_articles_backup_${Date.now()}.json`);
    await fs.copyFile(newArticlesPath, backupPath);
    console.log(`💾 Backup created: ${path.basename(backupPath)}`);
    
    // Write merged articles
    await fs.writeFile(outputPath, JSON.stringify(mergedArticles, null, 2));
    
    console.log('\n=== Recovery Complete ===');
    console.log(`📊 Total articles restored: ${mergedArticles.length}`);
    console.log(`✅ New articles: ${newArticles.length}`);
    console.log(`📚 Old articles restored: ${uniqueOldArticles.length}`);
    console.log(`🗑️  Duplicates removed: ${oldArticles.length - uniqueOldArticles.length}`);
    console.log(`💾 Articles saved to: ${outputPath}`);
    console.log('🎉 Your blog now has all articles back!');
    
    return {
      totalArticles: mergedArticles.length,
      newArticles: newArticles.length,
      oldArticlesRestored: uniqueOldArticles.length,
      duplicatesRemoved: oldArticles.length - uniqueOldArticles.length
    };
    
  } catch (error) {
    console.error('❌ Recovery failed:', error);
    throw error;
  }
}

// Run recovery if executed directly
if (require.main === module) {
  recoverAndMergeArticles()
    .then(result => {
      console.log('\n✅ Article recovery completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Article recovery failed:', error);
      process.exit(1);
    });
}

module.exports = { recoverAndMergeArticles }; 
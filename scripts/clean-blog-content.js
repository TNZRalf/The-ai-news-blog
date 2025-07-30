const fs = require('fs').promises;
const path = require('path');

async function cleanBlogContent() {
  try {
    console.log('🧹 Cleaning blog_content.json - removing articles with null content...');
    
    // Read the blog content
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const blogContent = JSON.parse(await fs.readFile(blogContentPath, 'utf8'));
    
    // Create backup
    const backupPath = path.join(process.cwd(), 'public', `blog_content_backup_${Date.now()}.json`);
    await fs.writeFile(backupPath, JSON.stringify(blogContent, null, 2));
    console.log(`✅ Backup created: ${path.basename(backupPath)}`);
    
    // Filter out articles with null content
    const originalCount = blogContent.articles.length;
    const cleanedArticles = blogContent.articles.filter(article => 
      article.full_content && article.full_content !== null && article.full_content.trim() !== ''
    );
    const removedCount = originalCount - cleanedArticles.length;
    
    // Update the blog content
    const updatedBlogContent = {
      ...blogContent,
      articles: cleanedArticles,
      total_articles: cleanedArticles.length,
      cleaned_at: new Date().toISOString(),
      removed_articles_count: removedCount
    };
    
    // Write the updated content
    await fs.writeFile(blogContentPath, JSON.stringify(updatedBlogContent, null, 2));
    
    console.log(`✅ Successfully cleaned blog_content.json`);
    console.log(`📊 Original articles: ${originalCount}`);
    console.log(`📊 Cleaned articles: ${cleanedArticles.length}`);
    console.log(`🗑️ Removed articles: ${removedCount}`);
    
    if (removedCount > 0) {
      console.log('\n🗑️ Removed articles:');
      blogContent.articles.forEach(article => {
        if (!article.full_content || article.full_content === null || article.full_content.trim() === '') {
          console.log(`- ${article.title}`);
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Error cleaning blog content:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanBlogContent(); 
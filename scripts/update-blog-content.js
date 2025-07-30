const fs = require('fs').promises;
const path = require('path');

async function updateBlogContent() {
  try {
    console.log('🔄 Updating blog_content.json with enhanced content...');
    
    // Read the enhanced articles
    const formattedArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const formattedArticles = JSON.parse(await fs.readFile(formattedArticlesPath, 'utf8'));
    
    // Read the original blog content
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const blogContent = JSON.parse(await fs.readFile(blogContentPath, 'utf8'));
    
    // Create backup
    const backupPath = path.join(process.cwd(), 'public', `blog_content_backup_${Date.now()}.json`);
    await fs.writeFile(backupPath, JSON.stringify(blogContent, null, 2));
    console.log(`✅ Backup created: ${path.basename(backupPath)}`);
    
    // Update the articles in blog_content.json with enhanced content
    const updatedArticles = blogContent.articles.map(article => {
      // Find the corresponding enhanced article
      const enhancedArticle = formattedArticles.find(enhanced => 
        enhanced.originalId === article.id
      );
      
      if (enhancedArticle) {
        return {
          ...article,
          full_content: enhancedArticle.content,
          content_word_count: enhancedArticle.wordCount,
          quality_score: enhancedArticle.qualityScore,
          enhanced: true,
          enhanced_at: enhancedArticle.enhancedAt
        };
      }
      
      return article;
    });
    
    // Update the blog content
    const updatedBlogContent = {
      ...blogContent,
      articles: updatedArticles,
      total_articles: updatedArticles.length,
      enhanced_at: new Date().toISOString(),
      enhanced_articles_count: updatedArticles.filter(a => a.enhanced).length
    };
    
    // Write the updated content
    await fs.writeFile(blogContentPath, JSON.stringify(updatedBlogContent, null, 2));
    
    console.log(`✅ Successfully updated blog_content.json`);
    console.log(`📊 Enhanced articles: ${updatedArticles.filter(a => a.enhanced).length}/${updatedArticles.length}`);
    
  } catch (error) {
    console.error('❌ Error updating blog content:', error);
    process.exit(1);
  }
}

// Run the update
updateBlogContent(); 
const fs = require('fs').promises;
const path = require('path');

function cleanContent(content) {
  if (!content) return content;
  
  let cleaned = content;
  
  // Remove LLM meta-commentary that's wrapped in HTML tags
  cleaned = cleaned.replace(/<p>Okay, here's a revised version.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Here's a revised and expanded version.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Here's a significantly revised.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Here's a revised version.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Here's a revised and expanded.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Okay, here's a revised and expanded.*?<\/p>\s*/s, '');
  
  // Remove "Note:" sections at the end
  cleaned = cleaned.replace(/<p><strong>Note:<\/strong>.*$/s, '');
  cleaned = cleaned.replace(/<p>This rewritten content.*$/s, '');
  cleaned = cleaned.replace(/<p>Note: This rewritten content.*$/s, '');
  
  // Remove any remaining LLM meta-commentary patterns
  cleaned = cleaned.replace(/<p>Okay, here's.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/<p>Here's.*?<\/p>\s*/s, '');
  
  // Clean up any double line breaks that might be left
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
}

async function finalCleanContent() {
  try {
    console.log('🧹 Final cleaning of enhanced content - removing remaining LLM meta-commentary...');
    
    // Read the blog content
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const blogContent = JSON.parse(await fs.readFile(blogContentPath, 'utf8'));
    
    // Create backup
    const backupPath = path.join(process.cwd(), 'public', `blog_content_backup_${Date.now()}.json`);
    await fs.writeFile(backupPath, JSON.stringify(blogContent, null, 2));
    console.log(`✅ Backup created: ${path.basename(backupPath)}`);
    
    // Clean each article's content
    let cleanedCount = 0;
    const updatedArticles = blogContent.articles.map(article => {
      const originalContent = article.full_content;
      const cleanedContent = cleanContent(originalContent);
      
      if (cleanedContent !== originalContent) {
        cleanedCount++;
        console.log(`🧹 Cleaned article: ${article.title.substring(0, 50)}...`);
      }
      
      return {
        ...article,
        full_content: cleanedContent
      };
    });
    
    // Update the blog content
    const updatedBlogContent = {
      ...blogContent,
      articles: updatedArticles,
      final_cleaned_at: new Date().toISOString()
    };
    
    // Write the updated blog content
    await fs.writeFile(blogContentPath, JSON.stringify(updatedBlogContent, null, 2));
    
    console.log(`✅ Successfully cleaned ${cleanedCount} articles`);
    console.log(`📊 Total articles processed: ${updatedArticles.length}`);
    
    // Also update formatted_articles.json
    console.log('🔄 Updating formatted_articles.json with cleaned content...');
    
    const formattedArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const formattedArticles = JSON.parse(await fs.readFile(formattedArticlesPath, 'utf8'));
    
    const updatedFormattedArticles = formattedArticles.map(article => {
      const cleanedContent = cleanContent(article.content);
      
      return {
        ...article,
        content: cleanedContent
      };
    });
    
    await fs.writeFile(formattedArticlesPath, JSON.stringify(updatedFormattedArticles, null, 2));
    
    console.log(`✅ Successfully updated formatted_articles.json with cleaned content`);
    
  } catch (error) {
    console.error('❌ Error cleaning content:', error);
    process.exit(1);
  }
}

// Run the final cleanup
finalCleanContent(); 
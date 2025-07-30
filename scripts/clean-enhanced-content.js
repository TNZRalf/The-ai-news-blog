const fs = require('fs').promises;
const path = require('path');

function cleanContent(content) {
  if (!content) return content;
  
  let cleaned = content;
  
  // Remove LLM meta-commentary and instructions (more comprehensive patterns)
  cleaned = cleaned.replace(/^Okay, here's a revised version.*?---\s*/s, '');
  cleaned = cleaned.replace(/^Here's a revised and expanded version.*?---\s*/s, '');
  cleaned = cleaned.replace(/^Here's a significantly revised.*?---\s*/s, '');
  cleaned = cleaned.replace(/^Here's a revised version.*?---\s*/s, '');
  cleaned = cleaned.replace(/^Here's a revised and expanded.*?---\s*/s, '');
  cleaned = cleaned.replace(/^Okay, here's a revised and expanded.*?---\s*/s, '');
  
  // Remove "Key Improvements & Changes" sections and similar meta-commentary
  cleaned = cleaned.replace(/\n---\s*\n\*\*Key Improvements & Changes:\*\*\s*\n.*$/s, '');
  cleaned = cleaned.replace(/\n---\s*\n\*\*Notes on Changes and Rationale:\*\*\s*\n.*$/s, '');
  cleaned = cleaned.replace(/\n---\s*\n\*\*Key Changes and Justifications.*$/s, '');
  cleaned = cleaned.replace(/\n---\s*\n\*\*Note:\*\*.*$/s, '');
  
  // Remove "Would you like me to..." sections
  cleaned = cleaned.replace(/\nWould you like me to.*$/s, '');
  cleaned = cleaned.replace(/\nPlease let me know.*$/s, '');
  
  // Remove any remaining LLM meta-commentary at the beginning
  cleaned = cleaned.replace(/^<p>Okay, here's a revised.*?<\/p>\s*/s, '');
  cleaned = cleaned.replace(/^<p>Here's a revised.*?<\/p>\s*/s, '');
  
  // Remove any remaining LLM meta-commentary at the end
  cleaned = cleaned.replace(/\n<p><strong>Note:<\/strong>.*$/s, '');
  cleaned = cleaned.replace(/\n<p>This rewritten content.*$/s, '');
  
  // Convert markdown headers to proper formatting
  cleaned = cleaned.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  cleaned = cleaned.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  cleaned = cleaned.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  
  // Convert markdown bold to HTML
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert markdown italic to HTML
  cleaned = cleaned.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert markdown bullet points to HTML lists
  cleaned = cleaned.replace(/^\*\s+(.+)$/gm, '<li>$1</li>');
  
  // Wrap consecutive list items in <ul> tags
  cleaned = cleaned.replace(/(<li>.*<\/li>\s*)+/g, function(match) {
    return '<ul>\n' + match + '\n</ul>';
  });
  
  // Remove markdown separators
  cleaned = cleaned.replace(/^---\s*$/gm, '');
  
  // Remove extra whitespace and normalize paragraphs
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Wrap content in paragraphs if not already wrapped
  cleaned = cleaned.replace(/^([^<].*)$/gm, '<p>$1</p>');
  
  // Clean up empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');
  cleaned = cleaned.replace(/<p>\s*<p>/g, '<p>');
  cleaned = cleaned.replace(/<\/p>\s*<\/p>/g, '</p>');
  
  // Remove any remaining markdown artifacts
  cleaned = cleaned.replace(/^\s*[-*]\s+/gm, '');
  cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, '');
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
}

async function cleanEnhancedContent() {
  try {
    console.log('🧹 Cleaning enhanced content - removing LLM meta-commentary and fixing formatting...');
    
    // Read the formatted articles
    const formattedArticlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const formattedArticles = JSON.parse(await fs.readFile(formattedArticlesPath, 'utf8'));
    
    // Create backup
    const backupPath = path.join(process.cwd(), 'public', `formatted_articles_backup_${Date.now()}.json`);
    await fs.writeFile(backupPath, JSON.stringify(formattedArticles, null, 2));
    console.log(`✅ Backup created: ${path.basename(backupPath)}`);
    
    // Clean each article's content
    let cleanedCount = 0;
    const cleanedArticles = formattedArticles.map(article => {
      const originalContent = article.content;
      const cleanedContent = cleanContent(originalContent);
      
      if (cleanedContent !== originalContent) {
        cleanedCount++;
      }
      
      return {
        ...article,
        content: cleanedContent
      };
    });
    
    // Write the cleaned articles
    await fs.writeFile(formattedArticlesPath, JSON.stringify(cleanedArticles, null, 2));
    
    console.log(`✅ Successfully cleaned ${cleanedCount} articles`);
    console.log(`📊 Total articles processed: ${cleanedArticles.length}`);
    
    // Now update blog_content.json with the cleaned content
    console.log('🔄 Updating blog_content.json with cleaned content...');
    
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const blogContent = JSON.parse(await fs.readFile(blogContentPath, 'utf8'));
    
    // Update articles with cleaned content
    const updatedArticles = blogContent.articles.map(article => {
      const enhancedArticle = cleanedArticles.find(enhanced => 
        enhanced.originalId === article.id
      );
      
      if (enhancedArticle) {
        return {
          ...article,
          full_content: enhancedArticle.content
        };
      }
      
      return article;
    });
    
    // Update the blog content
    const updatedBlogContent = {
      ...blogContent,
      articles: updatedArticles,
      cleaned_at: new Date().toISOString()
    };
    
    // Write the updated blog content
    await fs.writeFile(blogContentPath, JSON.stringify(updatedBlogContent, null, 2));
    
    console.log(`✅ Successfully updated blog_content.json with cleaned content`);
    
  } catch (error) {
    console.error('❌ Error cleaning enhanced content:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanEnhancedContent(); 
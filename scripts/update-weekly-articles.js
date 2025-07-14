const fs = require('fs').promises;
const path = require('path');
const { migrateBlogContent } = require('./migrate-blog-content');

async function findNewContentFile() {
  const newContentDir = path.join(process.cwd(), 'public', 'new blog content');
  
  // Possible file patterns to look for (any JSON file in the new content folder)
  const patterns = [
    'blog_content.json',
    'new_blog_content.json',
    'blog_content_new.json',
    /^blog_content_\d{4}-\d{2}-\d{2}\.json$/,  // blog_content_2025-01-07.json
    /^blog_content_week_\d+\.json$/,           // blog_content_week_42.json
    /\.json$/                                  // Any JSON file
  ];
  
  try {
    const files = await fs.readdir(newContentDir);
    
    for (const pattern of patterns) {
      if (typeof pattern === 'string') {
        // Exact string match
        if (files.includes(pattern)) {
          return path.join(newContentDir, pattern);
        }
      } else {
        // Regex pattern match
        const matchedFile = files.find(file => pattern.test(file));
        if (matchedFile) {
          return path.join(newContentDir, matchedFile);
        }
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function updateWeeklyArticles() {
  try {
    console.log('🔄 Starting weekly article update...');
    
    // Find new content file in the designated folder
    const newContentPath = await findNewContentFile();
    const publicContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    
    if (!newContentPath) {
      console.log('ℹ️  No new content file found in "public/new blog content/" folder.');
      console.log('   Drop any JSON file there with your new articles:');
      console.log('   - blog_content.json');
      console.log('   - new_blog_content.json'); 
      console.log('   - blog_content_2025-01-07.json (date format)');
      console.log('   - blog_content_week_42.json (week format)');
      console.log('   - or any .json file with your articles');
      console.log('');
      console.log('🚀 Using existing blog_content.json from public directory');
    } else {
      const fileName = path.basename(newContentPath);
      console.log(`📄 Found new content file: "${fileName}" in new blog content folder`);
      
      // Backup current file
      const timestamp = Date.now();
      const backupPath = path.join(process.cwd(), 'public', `blog_content_backup_${timestamp}.json`);
      
      try {
        await fs.copyFile(publicContentPath, backupPath);
        console.log(`💾 Backed up current file to: blog_content_backup_${timestamp}.json`);
      } catch (error) {
        console.log('ℹ️  No existing file to backup');
      }
      
      // Move new file to public directory
      await fs.copyFile(newContentPath, publicContentPath);
      console.log('✅ Moved new content to public/blog_content.json');
      
      // Remove the temporary file from new content folder
      await fs.unlink(newContentPath);
      console.log(`🗑️  Cleaned up file from new blog content folder: ${fileName}`);
    }
    
    // Run migration
    console.log('🚀 Starting article migration...');
    const result = await migrateBlogContent();
    
    console.log('\n=== Weekly Update Complete ===');
    console.log(`📊 Total articles processed: ${result.totalArticles}`);
    console.log(`✅ New articles added: ${result.convertedArticles}`);
    console.log(`📚 Existing articles preserved: ${result.existingArticles || 0}`);
    console.log(`📖 Total articles in blog: ${result.totalInBlog}`);
    console.log(`🖼️  Images downloaded: ${result.imagesDownloaded}`);
    console.log(`🎨 Fallback images used: ${result.fallbacksUsed}`);
    console.log('🎉 Your blog is updated and ready!');
    
    return result;
    
  } catch (error) {
    console.error('❌ Weekly update failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  updateWeeklyArticles()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { updateWeeklyArticles }; 
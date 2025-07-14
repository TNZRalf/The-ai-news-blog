const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// Fallback images for different categories
const FALLBACK_IMAGES = {
  'ai': [
    '/images/fallbacks/ai-brain.jpg',
    '/images/fallbacks/ai-neural-network.jpg',
    '/images/fallbacks/ai-robot.jpg',
    '/images/fallbacks/ai-circuit.jpg'
  ],
  'machine-learning': [
    '/images/fallbacks/ml-data.jpg',
    '/images/fallbacks/ml-algorithm.jpg',
    '/images/fallbacks/ml-model.jpg'
  ],
  'technology': [
    '/images/fallbacks/tech-laptop.jpg',
    '/images/fallbacks/tech-code.jpg',
    '/images/fallbacks/tech-server.jpg'
  ],
  'security': [
    '/images/fallbacks/security-shield.jpg',
    '/images/fallbacks/security-lock.jpg'
  ],
  'research': [
    '/images/fallbacks/research-lab.jpg',
    '/images/fallbacks/research-data.jpg'
  ],
  'default': [
    '/images/fallbacks/ai-default-1.jpg',
    '/images/fallbacks/ai-default-2.jpg',
    '/images/fallbacks/tech-default.jpg'
  ]
};

function selectFallbackImage(tags, title) {
  // Convert tags and title to lowercase for matching
  const tagString = (tags || []).join(' ').toLowerCase();
  const titleLower = title.toLowerCase();
  
  // Priority matching based on content
  if (tagString.includes('ai') || titleLower.includes('artificial intelligence') || titleLower.includes(' ai ')) {
    return getRandomFromArray(FALLBACK_IMAGES['ai']);
  }
  
  if (tagString.includes('machine learning') || tagString.includes('ml') || titleLower.includes('machine learning')) {
    return getRandomFromArray(FALLBACK_IMAGES['machine-learning']);
  }
  
  if (tagString.includes('security') || titleLower.includes('security') || titleLower.includes('vulnerability')) {
    return getRandomFromArray(FALLBACK_IMAGES['security']);
  }
  
  if (tagString.includes('research') || titleLower.includes('research') || titleLower.includes('study')) {
    return getRandomFromArray(FALLBACK_IMAGES['research']);
  }
  
  if (tagString.includes('technology') || tagString.includes('tech') || titleLower.includes('tech')) {
    return getRandomFromArray(FALLBACK_IMAGES['technology']);
  }
  
  // Default fallback
  return getRandomFromArray(FALLBACK_IMAGES['default']);
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          await fs.writeFile(filename, buffer);
          console.log(`Downloaded: ${filename}`);
          resolve(filename);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Create fallback images using Unsplash API with AI/tech themes
async function createFallbackImages() {
  const fallbackDir = path.join(process.cwd(), 'public', 'images', 'fallbacks');
  await fs.mkdir(fallbackDir, { recursive: true });
  
  // Check if fallback images already exist
  try {
    const existingFiles = await fs.readdir(fallbackDir);
    if (existingFiles.length > 0) {
      console.log(`Found ${existingFiles.length} existing fallback images`);
      return;
    }
  } catch (error) {
    // Directory doesn't exist, will be created
  }
  
  console.log('Creating fallback images...');
  
  // High-quality stock images from Unsplash with appropriate themes
  const fallbackImageUrls = [
    // AI themed
    { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format', name: 'ai-brain.jpg' },
    { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop&auto=format', name: 'ai-neural-network.jpg' },
    { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop&auto=format', name: 'ai-robot.jpg' },
    { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop&auto=format', name: 'ai-circuit.jpg' },
    
    // Machine Learning themed  
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&auto=format', name: 'ml-data.jpg' },
    { url: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=1200&h=600&fit=crop&auto=format', name: 'ml-algorithm.jpg' },
    { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&auto=format', name: 'ml-model.jpg' },
    
    // Technology themed
    { url: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=600&fit=crop&auto=format', name: 'tech-laptop.jpg' },
    { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop&auto=format', name: 'tech-code.jpg' },
    { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&auto=format', name: 'tech-server.jpg' },
    
    // Security themed
    { url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop&auto=format', name: 'security-shield.jpg' },
    { url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=1200&h=600&fit=crop&auto=format', name: 'security-lock.jpg' },
    
    // Research themed
    { url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1200&h=600&fit=crop&auto=format', name: 'research-lab.jpg' },
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&auto=format', name: 'research-data.jpg' },
    
    // Default/general AI
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&auto=format', name: 'ai-default-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&auto=format', name: 'ai-default-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop&auto=format', name: 'tech-default.jpg' }
  ];
  
  let downloadedCount = 0;
  
  for (const imageInfo of fallbackImageUrls) {
    try {
      const filePath = path.join(fallbackDir, imageInfo.name);
      await downloadImage(imageInfo.url, filePath);
      downloadedCount++;
    } catch (error) {
      console.warn(`Failed to download fallback image ${imageInfo.name}: ${error.message}`);
    }
  }
  
  console.log(`Created ${downloadedCount} fallback images`);
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function extractAuthorFromSource(article) {
  // Try to extract author from the full_content or use source as fallback
  const content = article.full_content || '';
  const byMatch = content.match(/By\s+([^,\n]+)/i);
  if (byMatch) {
    return byMatch[1].trim();
  }
  
  // Fallback to source
  return article.source || 'AI News Team';
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function convertToHtml(content) {
  if (!content) return '<p>Content not available.</p>';
  
  // Simple conversion from plain text to HTML
  // Split by double newlines for paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map(paragraph => {
    // Handle headers (lines that end with specific patterns or are short and capitalized)
    if (paragraph.length < 100 && /^[A-Z]/.test(paragraph) && !paragraph.includes('.')) {
      return `<h3>${paragraph.trim()}</h3>`;
    }
    
    // Regular paragraphs
    return `<p>${paragraph.trim()}</p>`;
  }).join('');
}

async function migrateBlogContent() {
  try {
    console.log('Starting blog content migration...');
    
    // Create fallback images first
    await createFallbackImages();
    
    // Read the blog content file
    const blogContentPath = path.join(process.cwd(), 'public', 'blog_content.json');
    const blogContentRaw = await fs.readFile(blogContentPath, 'utf-8');
    const blogContent = JSON.parse(blogContentRaw);
    
    // Create images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'articles');
    await fs.mkdir(imagesDir, { recursive: true });
    
    // Convert articles to the website format
    const convertedArticles = [];
    let articleId = 1;
    let imagesDownloaded = 0;
    let fallbacksUsed = 0;
    
    for (const article of blogContent.articles) {
      console.log(`Processing: ${article.title}`);
      
      // Skip articles without content
      if (!article.content_available || !article.full_content) {
        console.log(`Skipping "${article.title}" - no content available`);
        continue;
      }
      
      // Handle image download with fallback
      let localImagePath = null;
      
      if (article.has_image && article.image_url) {
        try {
          const imageExtension = path.extname(new URL(article.image_url).pathname) || '.jpg';
          const imageFilename = `${article.id}${imageExtension}`;
          const imageFilePath = path.join(imagesDir, imageFilename);
          
          await downloadImage(article.image_url, imageFilePath);
          localImagePath = `/images/articles/${imageFilename}`;
          imagesDownloaded++;
        } catch (error) {
          console.warn(`Failed to download image for "${article.title}": ${error.message}`);
          // Use fallback image based on article content
          localImagePath = selectFallbackImage(article.tags, article.title);
          fallbacksUsed++;
          console.log(`Using fallback image: ${localImagePath}`);
        }
      } else {
        // No image URL provided, use fallback
        localImagePath = selectFallbackImage(article.tags, article.title);
        fallbacksUsed++;
        console.log(`No image URL provided, using fallback: ${localImagePath}`);
      }
      
      // Convert to website format
      const convertedArticle = {
        id: articleId++,
        slug: generateSlug(article.title),
        title: article.title,
        description: article.summary || article.title,
        content: convertToHtml(article.full_content),
        image: localImagePath,
        author: extractAuthorFromSource(article),
        date: formatDate(article.published),
        tags: article.tags || ['AI', 'Technology'],
        status: 'Published',
        // Keep original metadata for reference
        originalId: article.id,
        originalUrl: article.url,
        source: article.source,
        qualityScore: article.quality_score,
        wordCount: article.content_word_count
      };
      
      convertedArticles.push(convertedArticle);
    }
    
        // Read existing articles to merge with new ones
    const outputPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    let existingArticles = [];
    
    try {
      const existingArticlesRaw = await fs.readFile(outputPath, 'utf-8');
      existingArticles = JSON.parse(existingArticlesRaw);
      console.log(`Found ${existingArticles.length} existing articles to merge with`);
    } catch (error) {
      console.log('No existing articles found, creating new file');
    }
    
    // Create sets for deduplication based on title and original URL
    const existingTitles = new Set(existingArticles.map(article => article.title.toLowerCase()));
    const existingUrls = new Set(existingArticles.map(article => article.originalUrl).filter(Boolean));
    
    // Filter out duplicates from new articles
    const uniqueNewArticles = convertedArticles.filter(article => {
      const titleMatch = existingTitles.has(article.title.toLowerCase());
      const urlMatch = article.originalUrl && existingUrls.has(article.originalUrl);
      
      if (titleMatch || urlMatch) {
        console.log(`🔄 Skipping duplicate article: "${article.title}"`);
        return false;
      }
      return true;
    });
    
    // Assign new IDs to avoid conflicts
    let nextId = existingArticles.length > 0 ? Math.max(...existingArticles.map(a => a.id), 0) + 1 : 1;
    uniqueNewArticles.forEach(article => {
      article.id = nextId++;
    });
    
    // Merge articles: keep existing articles and add new unique ones
    const allArticles = [...existingArticles, ...uniqueNewArticles];
    
    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create backup of existing articles before writing new ones
    if (existingArticles.length > 0) {
      const backupPath = path.join(process.cwd(), 'public', `formatted_articles_backup_${Date.now()}.json`);
      await fs.writeFile(backupPath, JSON.stringify(existingArticles, null, 2));
      console.log(`💾 Backup of existing articles created: ${path.basename(backupPath)}`);
    }

    // Write the merged articles to formatted_articles.json
    await fs.writeFile(outputPath, JSON.stringify(allArticles, null, 2));
    
    convertedArticles = uniqueNewArticles; // Update for return stats
    
        console.log(`Migration completed! Converted ${convertedArticles.length} new articles.`);
    console.log(`Total articles in blog: ${allArticles.length}`);
    console.log(`Articles written to: ${outputPath}`);

    // Create a backup of the original blog_content.json
    const backupPath = path.join(process.cwd(), 'public', 'blog_content_backup.json');
    await fs.copyFile(blogContentPath, backupPath);
    console.log(`Backup created: ${backupPath}`);

    return {
      totalArticles: blogContent.articles.length,
      convertedArticles: convertedArticles.length,
      existingArticles: existingArticles.length,
      totalInBlog: allArticles.length,
      imagesDownloaded: imagesDownloaded,
      fallbacksUsed: fallbacksUsed,
      totalWithImages: imagesDownloaded + fallbacksUsed
    };
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  migrateBlogContent()
    .then(result => {
      console.log('\n=== Migration Summary ===');
      console.log(`Total articles in source: ${result.totalArticles}`);
      console.log(`New articles converted: ${result.convertedArticles}`);
      console.log(`Existing articles preserved: ${result.existingArticles || 0}`);
      console.log(`Total articles in blog: ${result.totalInBlog}`);
      console.log(`Original images downloaded: ${result.imagesDownloaded}`);
      console.log(`Fallback images used: ${result.fallbacksUsed}`);
      console.log(`Total articles with images: ${result.totalWithImages}`);
      console.log('Migration completed successfully!');
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateBlogContent }; 
const fs = require('fs').promises;
const path = require('path');

// Fallback images for different categories
const FALLBACK_IMAGES = {
  'ai': [
    '/images/fallbacks/ai-brain.jpg',
    '/images/fallbacks/ai-neural-network.jpg',
    '/images/fallbacks/ai-robot.jpg'
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

function selectFallbackImage(tags, title, usedImages = new Set()) {
  // Convert tags and title to lowercase for matching
  const tagString = (tags || []).join(' ').toLowerCase();
  const titleLower = title.toLowerCase();
  
  let categoryImages = FALLBACK_IMAGES['default']; // Default fallback
  
  // Priority matching based on content
  if (tagString.includes('ai') || titleLower.includes('artificial intelligence') || titleLower.includes(' ai ')) {
    categoryImages = FALLBACK_IMAGES['ai'];
  } else if (tagString.includes('machine learning') || tagString.includes('ml') || titleLower.includes('machine learning')) {
    categoryImages = FALLBACK_IMAGES['machine-learning'];
  } else if (tagString.includes('security') || titleLower.includes('security') || titleLower.includes('vulnerability')) {
    categoryImages = FALLBACK_IMAGES['security'];
  } else if (tagString.includes('research') || titleLower.includes('research') || titleLower.includes('study')) {
    categoryImages = FALLBACK_IMAGES['research'];
  } else if (tagString.includes('technology') || tagString.includes('tech') || titleLower.includes('tech')) {
    categoryImages = FALLBACK_IMAGES['technology'];
  }
  
  // Find an unused image from the category
  const availableImages = categoryImages.filter(img => !usedImages.has(img));
  
  if (availableImages.length > 0) {
    const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    usedImages.add(selectedImage);
    return selectedImage;
  }
  
  // If all category images are used, fall back to default category
  if (categoryImages !== FALLBACK_IMAGES['default']) {
    const defaultAvailable = FALLBACK_IMAGES['default'].filter(img => !usedImages.has(img));
    if (defaultAvailable.length > 0) {
      const selectedImage = defaultAvailable[Math.floor(Math.random() * defaultAvailable.length)];
      usedImages.add(selectedImage);
      return selectedImage;
    }
  }
  
  // If everything is used, just return a random one (rare case)
  const allImages = Object.values(FALLBACK_IMAGES).flat();
  return allImages[Math.floor(Math.random() * allImages.length)];
}

async function applyFallbackImages() {
  try {
    console.log('🖼️  Applying fallback images to articles...');
    
    // Read current articles
    const articlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
    const articlesData = await fs.readFile(articlesPath, 'utf-8');
    const articles = JSON.parse(articlesData);
    
    console.log(`📚 Found ${articles.length} articles`);
    
    let updatedCount = 0;
    const usedImages = new Set();
    
    // Process each article
    for (const article of articles) {
      // Check if article needs a fallback image
      const needsFallback = !article.image || 
                           article.image.startsWith('http') || 
                           !article.image.startsWith('/images/articles/');
      
      if (needsFallback) {
        const fallbackImage = selectFallbackImage(article.tags, article.title, usedImages);
        const oldImage = article.image;
        article.image = fallbackImage;
        
        console.log(`🔄 Updated "${article.title}"`);
        console.log(`   Old: ${oldImage || 'None'}`);
        console.log(`   New: ${fallbackImage}`);
        console.log('');
        
        updatedCount++;
      }
    }
    
    if (updatedCount > 0) {
      // Write updated articles back to file
      await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
      console.log(`✅ Updated ${updatedCount} articles with fallback images`);
      
      // Create backup
      const backupPath = path.join(process.cwd(), 'public', 'formatted_articles_before_fallbacks.json');
      await fs.writeFile(backupPath, articlesData);
      console.log(`💾 Backup created: ${backupPath}`);
    } else {
      console.log('✨ All articles already have local images - no updates needed!');
    }
    
    // Show usage statistics
    const imageUsageStats = {};
    articles.forEach(article => {
      if (article.image.startsWith('/images/fallbacks/')) {
        const imageName = path.basename(article.image);
        imageUsageStats[imageName] = (imageUsageStats[imageName] || 0) + 1;
      }
    });
    
    if (Object.keys(imageUsageStats).length > 0) {
      console.log('\n📊 Fallback Image Usage:');
      Object.entries(imageUsageStats)
        .sort((a, b) => b[1] - a[1])
        .forEach(([image, count]) => {
          console.log(`   ${image}: ${count} article${count > 1 ? 's' : ''}`);
        });
    }
    
    return {
      totalArticles: articles.length,
      updatedArticles: updatedCount,
      fallbacksInUse: Object.keys(imageUsageStats).length,
      usageStats: imageUsageStats
    };
    
  } catch (error) {
    console.error('❌ Failed to apply fallback images:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  applyFallbackImages()
    .then(result => {
      console.log('\n=== Fallback Application Summary ===');
      console.log(`Total articles: ${result.totalArticles}`);
      console.log(`Updated with fallbacks: ${result.updatedArticles}`);
      console.log(`Unique fallbacks in use: ${result.fallbacksInUse}`);
      console.log('Fallback images applied successfully! 🎨');
    })
    .catch(error => {
      console.error('❌ Failed to apply fallback images:', error);
      process.exit(1);
    });
}

module.exports = { applyFallbackImages }; 
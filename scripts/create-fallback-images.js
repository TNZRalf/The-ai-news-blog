const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

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
          console.log(`✅ Downloaded: ${path.basename(filename)}`);
          resolve(filename);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function createFallbackImages() {
  console.log('🎨 Creating fallback images for AI News blog...');
  
  const fallbackDir = path.join(process.cwd(), 'public', 'images', 'fallbacks');
  await fs.mkdir(fallbackDir, { recursive: true });
  console.log(`📁 Created directory: ${fallbackDir}`);
  
  // High-quality stock images from Unsplash with appropriate themes
  const fallbackImageUrls = [
    // AI themed
    { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&auto=format', name: 'ai-brain.jpg', category: 'AI Brain/Neural' },
    { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop&auto=format', name: 'ai-neural-network.jpg', category: 'Neural Network' },
    { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop&auto=format', name: 'ai-robot.jpg', category: 'AI Robot' },
    { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop&auto=format', name: 'ai-circuit.jpg', category: 'AI Circuit' },
    
    // Machine Learning themed  
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&auto=format', name: 'ml-data.jpg', category: 'ML Data' },
    { url: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=1200&h=600&fit=crop&auto=format', name: 'ml-algorithm.jpg', category: 'ML Algorithm' },
    { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&auto=format', name: 'ml-model.jpg', category: 'ML Model' },
    
    // Technology themed
    { url: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=600&fit=crop&auto=format', name: 'tech-laptop.jpg', category: 'Technology Laptop' },
    { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop&auto=format', name: 'tech-code.jpg', category: 'Programming Code' },
    { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&auto=format', name: 'tech-server.jpg', category: 'Server Technology' },
    
    // Security themed
    { url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop&auto=format', name: 'security-shield.jpg', category: 'Security Shield' },
    { url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=1200&h=600&fit=crop&auto=format', name: 'security-lock.jpg', category: 'Security Lock' },
    
    // Research themed
    { url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1200&h=600&fit=crop&auto=format', name: 'research-lab.jpg', category: 'Research Lab' },
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&auto=format', name: 'research-data.jpg', category: 'Research Data' },
    
    // Default/general AI
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&auto=format', name: 'ai-default-1.jpg', category: 'AI Default 1' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&auto=format', name: 'ai-default-2.jpg', category: 'AI Default 2' },
    { url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop&auto=format', name: 'tech-default.jpg', category: 'Tech Default' }
  ];
  
  let downloadedCount = 0;
  let failedCount = 0;
  
  console.log(`🔽 Starting download of ${fallbackImageUrls.length} fallback images...\n`);
  
  for (const imageInfo of fallbackImageUrls) {
    try {
      const filePath = path.join(fallbackDir, imageInfo.name);
      console.log(`📥 Downloading ${imageInfo.category}...`);
      await downloadImage(imageInfo.url, filePath);
      downloadedCount++;
    } catch (error) {
      console.error(`❌ Failed to download ${imageInfo.name}: ${error.message}`);
      failedCount++;
    }
  }
  
  console.log(`\n🎉 Fallback image creation completed!`);
  console.log(`✅ Successfully downloaded: ${downloadedCount} images`);
  if (failedCount > 0) {
    console.log(`❌ Failed downloads: ${failedCount} images`);
  }
  console.log(`📂 Images saved to: ${fallbackDir}`);
  
  return { downloadedCount, failedCount, totalImages: fallbackImageUrls.length };
}

// Run if executed directly
if (require.main === module) {
  createFallbackImages()
    .then(result => {
      console.log('\n=== Fallback Images Summary ===');
      console.log(`Total images needed: ${result.totalImages}`);
      console.log(`Successfully created: ${result.downloadedCount}`);
      if (result.failedCount > 0) {
        console.log(`Failed to create: ${result.failedCount}`);
      }
      console.log('Fallback images are ready for use! 🎨');
    })
    .catch(error => {
      console.error('❌ Failed to create fallback images:', error);
      process.exit(1);
    });
}

module.exports = { createFallbackImages }; 
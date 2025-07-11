import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser to handle multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Allowed file types and their configurations
const ALLOWED_TYPES = {
  images: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    directory: 'images'
  },
  documents: {
    extensions: ['.pdf', '.doc', '.docx', '.txt', '.md'],
    maxSize: 10 * 1024 * 1024, // 10MB
    directory: 'documents'
  },
  articles: {
    extensions: ['.json', '.md'],
    maxSize: 1 * 1024 * 1024, // 1MB
    directory: 'articles'
  },
  data: {
    extensions: ['.json', '.csv', '.xml'],
    maxSize: 5 * 1024 * 1024, // 5MB
    directory: 'data'
  }
};

// Get file type category based on extension
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  
  for (const [type, config] of Object.entries(ALLOWED_TYPES)) {
    if (config.extensions.includes(ext)) {
      return { type, config };
    }
  }
  return null;
}

// Validate file
function validateFile(file, fileType) {
  if (!fileType) {
    return { valid: false, error: 'File type not allowed' };
  }

  if (file.size > fileType.config.maxSize) {
    const maxSizeMB = fileType.config.maxSize / (1024 * 1024);
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }

  return { valid: true };
}

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate unique filename
function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '-');
  return `${name}-${timestamp}-${random}${ext}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Parse the form data
    const form = formidable({
      maxFiles: 5,
      maxFileSize: 10 * 1024 * 1024, // 10MB max per file
      allowEmptyFiles: false,
      minFileSize: 1, // At least 1 byte
    });

    const [fields, files] = await form.parse(req);
    
    if (!files.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];
    const results = [];

    for (const file of uploadedFiles) {
      // Get file type and validate
      const fileType = getFileType(file.originalFilename || file.newFilename);
      const validation = validateFile(file, fileType);

      if (!validation.valid) {
        results.push({
          filename: file.originalFilename || file.newFilename,
          success: false,
          error: validation.error
        });
        continue;
      }

      // Create upload directory
      const uploadDir = path.join(process.cwd(), 'public', fileType.config.directory);
      ensureDirectoryExists(uploadDir);

      // Generate unique filename
      const uniqueFilename = generateUniqueFilename(file.originalFilename || file.newFilename);
      const finalPath = path.join(uploadDir, uniqueFilename);

      try {
        // Move file to final location
        fs.copyFileSync(file.filepath, finalPath);
        fs.unlinkSync(file.filepath); // Clean up temp file

        // Special handling for article JSON files
        if (fileType.type === 'articles' && path.extname(uniqueFilename) === '.json') {
          try {
            const fileContent = fs.readFileSync(finalPath, 'utf8');
            const articles = JSON.parse(fileContent);
            
            // Validate article structure
            if (Array.isArray(articles)) {
              // Validate each article has required fields
              const validArticles = articles.filter(article => 
                article.id && article.slug && article.title && article.content
              );

              if (validArticles.length > 0) {
                // Update the main articles file
                const articlesPath = path.join(process.cwd(), 'public', 'formatted_articles.json');
                fs.writeFileSync(articlesPath, JSON.stringify(validArticles, null, 2));
                
                // Add success metadata to the result
                results[results.length - 1].articlesImported = validArticles.length;
                results[results.length - 1].articlesSkipped = articles.length - validArticles.length;
                results[results.length - 1].isArticleUpdate = true;
              } else {
                results[results.length - 1].error = 'No valid articles found in JSON file';
                results[results.length - 1].success = false;
              }
            } else {
              results[results.length - 1].error = 'JSON file must contain an array of articles';
              results[results.length - 1].success = false;
            }
          } catch (jsonError) {
            console.error('Error processing article JSON:', jsonError);
            results[results.length - 1].error = 'Invalid JSON format or structure';
            results[results.length - 1].success = false;
          }
        }

        results.push({
          filename: file.originalFilename || file.newFilename,
          savedAs: uniqueFilename,
          success: true,
          url: `/${fileType.config.directory}/${uniqueFilename}`,
          type: fileType.type,
          size: file.size
        });

      } catch (moveError) {
        console.error('Error moving file:', moveError);
        results.push({
          filename: file.originalFilename || file.newFilename,
          success: false,
          error: 'Failed to save file'
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Upload completed',
      files: results
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during upload'
    });
  }
}


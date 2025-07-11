# Weekly Article Upload Workflow

## Overview
This guide explains how to update your AI News blog with new articles each week using the admin panel.

## Step-by-Step Process

### 1. Prepare Your Articles File
- Create or update your `formatted_articles.json` file with new articles
- Each article must have the required fields (see structure below)
- You can download the current articles as a template from the admin panel

### 2. Access Admin Panel
- Go to `/admin` in your browser
- Click on the "File Upload" tab
- You'll see the "📰 Weekly Article Upload" section at the top

### 3. Upload Your Articles
- Drag and drop your `formatted_articles.json` file into the upload area
- Or click to browse and select the file
- The system will automatically validate and import your articles
- You'll see a success message with the number of articles imported

### 4. Verify the Update
- Articles will immediately appear on your blog
- Check the homepage to see your new articles
- The system automatically handles article organization and display

## Article Structure Requirements

Each article in your JSON file must have these fields:

```json
{
  "id": 1,                                    // Unique number
  "slug": "article-url-slug",                 // URL-friendly identifier
  "title": "Article Title",                   // Main headline
  "description": "Brief article summary...",  // Meta description
  "content": "<p>Full article content...</p>", // HTML content
  "image": "https://example.com/image.jpg",   // Featured image URL
  "author": "Author Name",                    // Article author
  "date": "2024-01-15",                      // Publication date (YYYY-MM-DD)
  "tags": ["AI", "Technology"],             // Category tags
  "status": "Published"                      // Publication status
}
```

### Required Fields
- ✅ `id` - Must be unique
- ✅ `slug` - Must be unique and URL-friendly  
- ✅ `title` - Article headline
- ✅ `content` - Article body (HTML format)

### Optional Fields
- `description` - Used for SEO and previews
- `image` - Featured image (defaults to placeholder if missing)
- `author` - Article author (defaults to site author)
- `date` - Publication date (defaults to current date)
- `tags` - Category tags for organization
- `status` - Publication status (defaults to "Published")

## Example Article JSON

```json
[
  {
    "id": 1,
    "slug": "future-of-ai-2024",
    "title": "The Future of AI in 2024: Trends and Predictions",
    "description": "Exploring the most significant AI developments and trends expected in 2024, from generative AI to autonomous systems.",
    "content": "<p>Artificial intelligence continues to evolve rapidly...</p><h3>Key Trends</h3><p>Several trends are shaping the future...</p>",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "author": "Alex Johnson",
    "date": "2024-01-15",
    "tags": ["AI", "Future Tech", "Predictions"],
    "status": "Published"
  },
  {
    "id": 2,
    "slug": "ai-ethics-guidelines",
    "title": "New AI Ethics Guidelines Released",
    "description": "Industry leaders announce comprehensive guidelines for ethical AI development and deployment.",
    "content": "<p>Leading AI researchers and companies have collaborated...</p>",
    "image": "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=1200&q=80",
    "author": "Sarah Chen",
    "date": "2024-01-12",
    "tags": ["AI Ethics", "Guidelines", "Industry"],
    "status": "Published"
  }
]
```

## Admin Panel Features

### Upload Feedback
- ✅ **Success Message**: Shows number of articles imported
- ✅ **Error Handling**: Reports validation issues
- ✅ **Skipped Articles**: Shows count of invalid articles
- ✅ **Live Updates**: Articles appear immediately on the blog

### Template Download
- Download current articles as a template
- Maintains proper JSON structure
- Use as a starting point for new uploads

### Validation
- Checks for required fields
- Ensures proper JSON format
- Prevents duplicate IDs
- Validates URL-friendly slugs

## Best Practices

### 1. Content Preparation
- Write articles in a text editor first
- Convert to HTML format for the content field
- Use proper heading tags (`<h3>`, `<h4>`) for structure
- Include paragraph tags (`<p>`) for body text

### 2. Image Management
- Use high-quality images (1200px width recommended)
- Prefer landscape orientation for featured images
- Use Unsplash or other free stock photo services
- Ensure images are web-optimized

### 3. SEO Optimization
- Write compelling descriptions (150-160 characters)
- Use descriptive, URL-friendly slugs
- Include relevant tags for categorization
- Ensure titles are engaging and informative

### 4. Quality Control
- Proofread all content before uploading
- Test the JSON file in a validator first
- Keep a backup of your articles file
- Preview articles on the site after upload

## Troubleshooting

### Common Issues

**"No valid articles found"**
- Check that your JSON contains an array of articles
- Ensure all required fields are present
- Verify JSON syntax is correct

**"Invalid JSON format"**
- Use a JSON validator to check your file
- Check for missing commas or brackets
- Ensure all strings are properly quoted

**"Articles not appearing"**
- Refresh your browser cache
- Check that status is set to "Published"
- Verify the upload success message appeared

**"Duplicate article IDs"**
- Ensure each article has a unique ID number
- Check for conflicts with existing articles
- Use incremental numbering

### Getting Help
- Check the browser console for detailed error messages
- Verify the JSON structure matches the examples
- Test with a single article first if having issues

## Automation Ideas

### Future Enhancements
- **Scheduled Publishing**: Set future publication dates
- **Draft Mode**: Upload articles as drafts for review
- **Batch Operations**: Edit multiple articles at once
- **Version Control**: Track changes to articles over time

### Integration Options
- Connect with content management tools
- Integrate with AI writing assistants
- Set up automated image optimization
- Add social media auto-posting

---

This workflow is designed to be simple and efficient, allowing you to update your blog with fresh content each week in just a few clicks! 
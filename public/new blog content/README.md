# 📝 New Blog Content Folder

This folder is for your **weekly blog content updates**.

## 🚀 How to Use

### Step 1: Drop Your New Content File Here
Put any JSON file with your new articles in this folder:
- `blog_content.json`
- `new_articles.json` 
- `blog_content_2025-01-15.json`
- `weekly_update.json`
- Any `.json` file with your article data

### Step 2: Run the Update Script
```bash
npm run update-articles
```

### Step 3: Done! ✅
The script will:
- ✅ Backup your current articles
- ✅ Move new content to the right place
- ✅ Download all article images  
- ✅ Clean up this folder
- ✅ Make your new articles live on the website

## 📁 File Structure After Update
```
public/
├── blog_content.json                    # Current articles (updated)
├── blog_content_backup_timestamp.json   # Automatic backup
├── new blog content/                    # This folder (empty after update)
└── formatted_articles.json             # Processed for website
```

## 💡 Tips
- Any JSON file name works - the script finds it automatically
- Your current articles are always backed up safely
- The folder will be empty after successful update
- Check the terminal output for detailed progress

Happy blogging! 🎉 
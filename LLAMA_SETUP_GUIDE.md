# Llama Article Enhancement Setup Guide

This guide will help you configure and use the Llama article enhancement script to make your blog content more human-written, engaging, and interesting.

## Prerequisites

1. **Llama Installation**: Make sure you have Llama installed on your local machine
2. **Model Download**: Ensure you have a Llama model downloaded (recommended: llama-3.1-8b-instruct or similar)

## Configuration

### Step 1: Update Llama Command

Edit `scripts/enhance-articles-with-llama.js` and update the `CONFIG` object:

```javascript
const CONFIG = {
  // ... other settings ...
  llamaCommand: 'llama', // Change this to your actual Llama command
  llamaArgs: [
    '--model', 'llama-3.1-8b-instruct', // Change to your model name
    '--temp', '0.7',                    // Adjust creativity (0.0-1.0)
    '--top-p', '0.9',                   // Adjust response diversity
    '--max-tokens', '4000'              // Adjust max response length
  ],
  // ... other settings ...
};
```

### Step 2: Common Llama Commands

Depending on your Llama installation, you might need to use one of these commands:

- **llama.cpp**: `llama`
- **llama-cpp-python**: `python -m llama_cpp.server`
- **Ollama**: `ollama run llama3.1:8b`
- **Custom installation**: Check your specific installation

### Step 3: Test Your Setup

Run the test command to verify Llama is working:

```bash
npm run enhance-articles
```

The script will first test the Llama connection before processing articles.

## Usage

### Basic Usage

```bash
npm run enhance-articles
```

This will:
1. Read articles from `public/formatted_articles.json`
2. Create a backup of original articles
3. Process each article through Llama to enhance the content
4. Save enhanced articles to `public/formatted_articles_enhanced.json`

### What the Enhancement Does

The script will rewrite your articles to be:
- More conversational and personal
- Engaging and easier to read
- Written as if by someone passionate about the topic
- More human-like with personal observations
- Better structured and flowing

### Output Files

- **Enhanced articles**: `public/formatted_articles_enhanced.json`
- **Backup**: `public/formatted_articles_backup_[timestamp].json`
- **Original**: `public/formatted_articles.json` (unchanged)

## Customization

### Adjusting Enhancement Style

Edit the `ENHANCEMENT_PROMPT` in the script to change how articles are enhanced:

```javascript
const ENHANCEMENT_PROMPT = `You are a skilled content writer and editor. Your task is to rewrite the following article content to make it more human-written, engaging, and interesting to read. 

Guidelines:
- Write in a conversational, personal tone as if you're sharing insights with a friend
- Add personal observations and commentary where appropriate
- Make the content more engaging and easier to follow
- Use clear, concise language
- Add relevant examples or analogies when helpful
- Maintain the factual accuracy and key information
- Keep the same general structure but improve flow and readability
- Make it sound like it was written by someone passionate about the topic

Original article title: {title}
Original content: {content}

Please rewrite this content to be more human-written and engaging:`;
```

### Processing Settings

Adjust these settings in the `CONFIG` object:

```javascript
const CONFIG = {
  // ... other settings ...
  batchSize: 3,                    // Number of articles to process simultaneously
  delayBetweenBatches: 2000,      // Delay between batches (milliseconds)
  // ... other settings ...
};
```

## Troubleshooting

### Common Issues

1. **"Llama command not found"**
   - Check your Llama installation
   - Update `llamaCommand` in the config
   - Try running `llama --help` in terminal

2. **"Model not found"**
   - Verify your model is downloaded
   - Update `--model` parameter in `llamaArgs`
   - Check model path is correct

3. **"Process failed"**
   - Check system resources (RAM, GPU)
   - Reduce `batchSize` to 1
   - Increase `delayBetweenBatches`

4. **"Enhanced content too short"**
   - Increase `--max-tokens` in `llamaArgs`
   - Adjust `--temp` for more creative responses
   - Check the enhancement prompt

### Performance Tips

- **Smaller models**: Use 7B or 8B models for faster processing
- **Batch size**: Start with 1-2 articles per batch
- **System resources**: Ensure adequate RAM and GPU memory
- **Model loading**: Consider keeping Llama running between batches

## Integration with Your Workflow

### After Enhancement

1. **Review enhanced articles**:
   ```bash
   # Check the enhanced content
   cat public/formatted_articles_enhanced.json
   ```

2. **Replace original articles** (if satisfied):
   ```bash
   cp public/formatted_articles_enhanced.json public/formatted_articles.json
   ```

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Enhance articles with Llama for better readability"
   git push origin main
   ```

### Regular Enhancement

Consider running this script:
- After each weekly article update
- Before publishing major content
- When you want to refresh older articles

## Safety Features

The script includes several safety features:
- **Automatic backups** before processing
- **Error handling** for failed enhancements
- **Content validation** to ensure quality
- **Graceful degradation** (keeps original if enhancement fails)

## Example Output

**Before enhancement:**
```
A new drug usually starts with a tragedy. Peter Ray knows that. Born in what is now Zimbabwe...
```

**After enhancement:**
```
Let me tell you about Peter Ray's journey - it's one of those stories that really hits home. You see, every breakthrough drug has a human story behind it, and Peter's story begins with a tragedy that would shape his entire career...
```

The enhanced version is more personal, engaging, and reads like it was written by someone who truly cares about the subject matter. 
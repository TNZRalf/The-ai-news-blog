import fs from 'fs';
import path from 'path';

const articlesFilePath = path.join(process.cwd(), 'public/formatted_articles.json');

export function getAllArticles(filters = {}) {
  const jsonData = fs.readFileSync(articlesFilePath);
  const articles = JSON.parse(jsonData);
  
  let filteredArticles = articles.filter(article => article.status === 'Published');
  
  // Apply filters
  if (filters.tag) {
    filteredArticles = filteredArticles.filter(article => 
      article.tags && article.tags.some(tag => 
        tag.toLowerCase().includes(filters.tag.toLowerCase())
      )
    );
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  if (filters.source) {
    filteredArticles = filteredArticles.filter(article => 
      article.source && article.source.toLowerCase().includes(filters.source.toLowerCase())
    );
  }
  
  // Sort by date (newest first)
  return filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  const allArticles = getAllArticles();
  return allArticles.find(article => article.slug === slug);
}

export function getFeaturedArticles(limit = 3) {
  const allArticles = getAllArticles();
  // Return articles with highest quality score if available, otherwise newest
  return allArticles
    .sort((a, b) => {
      if (a.qualityScore && b.qualityScore) {
        return b.qualityScore - a.qualityScore;
      }
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, limit);
}

export function getArticlesByTag(tag, limit = 10) {
  return getAllArticles({ tag }).slice(0, limit);
}

export function getRecentArticles(limit = 5) {
  return getAllArticles().slice(0, limit);
}

export function getAllTags() {
  const allArticles = getAllArticles();
  const tags = new Set();
  
  allArticles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
}

export function getAllSources() {
  const allArticles = getAllArticles();
  const sources = new Set();
  
  allArticles.forEach(article => {
    if (article.source) {
      sources.add(article.source);
    }
  });
  
  return Array.from(sources).sort();
}

export function getArticleStats() {
  const allArticles = getAllArticles();
  
  return {
    totalArticles: allArticles.length,
    totalWordCount: allArticles.reduce((sum, article) => sum + (article.wordCount || 0), 0),
    averageQualityScore: allArticles.reduce((sum, article) => sum + (article.qualityScore || 0), 0) / allArticles.length,
    sources: getAllSources(),
    tags: getAllTags(),
    articlesWithImages: allArticles.filter(article => article.image && article.image.startsWith('/images/')).length
  };
} 
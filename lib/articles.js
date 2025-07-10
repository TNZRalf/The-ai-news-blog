import fs from 'fs';
import path from 'path';

const articlesFilePath = path.join(process.cwd(), 'public/formatted_articles.json');

export function getAllArticles() {
  const jsonData = fs.readFileSync(articlesFilePath);
  const articles = JSON.parse(jsonData);
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  const allArticles = getAllArticles();
  return allArticles.find(article => article.slug === slug);
} 
import { getArticleStats } from '../../lib/articles';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = getArticleStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching article stats:', error);
    res.status(500).json({ error: 'Failed to fetch article stats' });
  }
} 
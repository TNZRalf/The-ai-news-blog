const { migrateBlogContent } = require('../../scripts/migrate-blog-content');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting migration via API...');
    const result = await migrateBlogContent();
    
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('API Migration error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
} 
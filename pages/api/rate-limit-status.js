// API endpoint for checking rate limit status
// Useful for server-side rate limiting if needed

import rateLimiter from '../../lib/rateLimiter';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for server-side rate limiting
    const clientIP = rateLimiter.getClientIP(req);
    const status = rateLimiter.getRateLimitStatus(clientIP);
    
    // Get overall rate limiter statistics
    const stats = rateLimiter.getStats();
    
    res.status(200).json({
      success: true,
      clientIP: clientIP.replace(/:/g, '_'), // Mask IP for privacy
      rateLimitStatus: status,
      stats: {
        activeAttempts: stats.activeAttempts,
        lockedOutIPs: stats.lockedOutIPs,
        // Don't expose internal details
      }
    });
  } catch (error) {
    console.error('Rate limit status error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get rate limit status' 
    });
  }
} 
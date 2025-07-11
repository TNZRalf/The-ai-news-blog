// Rate limiting utility for admin authentication
// Prevents brute force attacks with IP-based tracking

class RateLimiter {
  constructor() {
    // In-memory storage for failed attempts
    this.attempts = new Map();
    
    // Configuration
    this.config = {
      maxAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      lockoutMs: parseInt(process.env.LOCKOUT_DURATION_MS) || 30 * 60 * 1000, // 30 minutes
      progressiveDelay: true,
      cleanupInterval: 60 * 1000, // 1 minute
    };
    
    // Start cleanup interval
    this.startCleanup();
  }
  
  // Get client IP address
  getClientIP(req) {
    if (typeof window !== 'undefined') {
      // Client-side: use a generated session ID based on browser fingerprint
      return this.getClientFingerprint();
    }
    
    // Server-side: extract real IP
    return req.headers['x-forwarded-for']?.split(',')[0] ||
           req.headers['x-real-ip'] ||
           req.connection?.remoteAddress ||
           req.socket?.remoteAddress ||
           req.connection?.socket?.remoteAddress ||
           '127.0.0.1';
  }
  
  // Generate client fingerprint for browser-based rate limiting
  getClientFingerprint() {
    const fingerprint = localStorage.getItem('rateLimitFingerprint');
    if (fingerprint) return fingerprint;
    
    // Create a simple fingerprint based on browser characteristics
    const fp = btoa(JSON.stringify({
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      timestamp: Date.now()
    })).slice(0, 32);
    
    localStorage.setItem('rateLimitFingerprint', fp);
    return fp;
  }
  
  // Record a failed attempt
  recordFailedAttempt(identifier) {
    const now = Date.now();
    const key = `failed_${identifier}`;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, {
        count: 0,
        firstAttempt: now,
        lastAttempt: now,
        lockoutUntil: null
      });
    }
    
    const record = this.attempts.get(key);
    record.count++;
    record.lastAttempt = now;
    
    // Check if lockout should be applied
    if (record.count >= this.config.maxAttempts) {
      record.lockoutUntil = now + this.config.lockoutMs;
    }
    
    this.attempts.set(key, record);
    return record;
  }
  
  // Record a successful attempt (clears the record)
  recordSuccessfulAttempt(identifier) {
    const key = `failed_${identifier}`;
    this.attempts.delete(key);
  }
  
  // Check if identifier is currently rate limited
  isRateLimited(identifier) {
    const key = `failed_${identifier}`;
    const record = this.attempts.get(key);
    
    if (!record) return { limited: false };
    
    const now = Date.now();
    
    // Check if lockout period has expired
    if (record.lockoutUntil && now > record.lockoutUntil) {
      this.attempts.delete(key);
      return { limited: false };
    }
    
    // Check if in lockout period
    if (record.lockoutUntil && now <= record.lockoutUntil) {
      const remainingMs = record.lockoutUntil - now;
      return {
        limited: true,
        reason: 'lockout',
        remainingMs,
        remainingMinutes: Math.ceil(remainingMs / 60000),
        attemptsRemaining: 0
      };
    }
    
    // Check if within rate limit window
    if (now - record.firstAttempt < this.config.windowMs) {
      const attemptsRemaining = this.config.maxAttempts - record.count;
      
      if (attemptsRemaining <= 0) {
        // Should trigger lockout
        record.lockoutUntil = now + this.config.lockoutMs;
        this.attempts.set(key, record);
        return {
          limited: true,
          reason: 'max_attempts',
          remainingMs: this.config.lockoutMs,
          remainingMinutes: Math.ceil(this.config.lockoutMs / 60000),
          attemptsRemaining: 0
        };
      }
      
      return {
        limited: false,
        attemptsRemaining,
        warningThreshold: attemptsRemaining <= 2
      };
    }
    
    // Window has expired, clear the record
    this.attempts.delete(key);
    return { limited: false };
  }
  
  // Get progressive delay based on attempt count
  getProgressiveDelay(identifier) {
    if (!this.config.progressiveDelay) return 0;
    
    const key = `failed_${identifier}`;
    const record = this.attempts.get(key);
    
    if (!record) return 0;
    
    // Progressive delay: 500ms * 2^(attempts-1)
    // 1st: 500ms, 2nd: 1s, 3rd: 2s, 4th: 4s, 5th: 8s
    const baseDelay = 500;
    const maxDelay = 10000; // 10 seconds max
    const delay = Math.min(baseDelay * Math.pow(2, record.count - 1), maxDelay);
    
    return delay;
  }
  
  // Get rate limit status for display
  getRateLimitStatus(identifier) {
    const limitCheck = this.isRateLimited(identifier);
    const delay = this.getProgressiveDelay(identifier);
    const key = `failed_${identifier}`;
    const record = this.attempts.get(key);
    
    return {
      ...limitCheck,
      progressiveDelay: delay,
      totalAttempts: record?.count || 0,
      config: {
        maxAttempts: this.config.maxAttempts,
        windowMinutes: this.config.windowMs / 60000,
        lockoutMinutes: this.config.lockoutMs / 60000
      }
    };
  }
  
  // Clean up expired records
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];
    
    for (const [key, record] of this.attempts) {
      // Remove if lockout expired or window expired
      if ((record.lockoutUntil && now > record.lockoutUntil) ||
          (!record.lockoutUntil && now - record.firstAttempt > this.config.windowMs)) {
        expiredKeys.push(key);
      }
    }
    
    expiredKeys.forEach(key => this.attempts.delete(key));
    
    if (expiredKeys.length > 0) {
      console.log(`Rate limiter cleaned up ${expiredKeys.length} expired records`);
    }
  }
  
  // Start automatic cleanup
  startCleanup() {
    setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }
  
  // Get current statistics
  getStats() {
    const now = Date.now();
    let activeAttempts = 0;
    let lockedOutIPs = 0;
    
    for (const [key, record] of this.attempts) {
      if (now - record.firstAttempt < this.config.windowMs) {
        activeAttempts++;
        if (record.lockoutUntil && now <= record.lockoutUntil) {
          lockedOutIPs++;
        }
      }
    }
    
    return {
      activeAttempts,
      lockedOutIPs,
      totalRecords: this.attempts.size,
      config: this.config
    };
  }
}

// Create singleton instance
const rateLimiter = new RateLimiter();

export default rateLimiter; 
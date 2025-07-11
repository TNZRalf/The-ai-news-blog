import { useState, useEffect } from 'react';
import rateLimiter from './rateLimiter';

// Simple admin authentication utility
// For production, consider using NextAuth.js or similar

// Default password - can be overridden by environment variable
const DEFAULT_PASSWORD = 'admin123';

// Get admin password with debugging
function getAdminPassword() {
  // Try to get from environment variable
  const envPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const password = envPassword || DEFAULT_PASSWORD;
  
  // Debug info (only in development) - removed for security
  
  return password;
}

export const ADMIN_PASSWORD = getAdminPassword();

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const authToken = localStorage.getItem('adminAuth');
  const sessionExpiry = localStorage.getItem('adminAuthExpiry');
  
  if (!authToken || !sessionExpiry) return false;
  
  // Check if session has expired (24 hours)
  if (Date.now() > parseInt(sessionExpiry)) {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthExpiry');
    return false;
  }
  
  return authToken === 'authenticated';
}

// Authenticate user with password
export function authenticate(password) {
  const identifier = rateLimiter.getClientFingerprint();
  
  // Check rate limiting before attempting authentication
  const limitStatus = rateLimiter.isRateLimited(identifier);
  if (limitStatus.limited) {
    throw new Error(`Too many failed attempts. ${limitStatus.reason === 'lockout' ? 
      `Try again in ${limitStatus.remainingMinutes} minutes.` : 
      'Please wait before trying again.'}`);
  }
  
  if (password === ADMIN_PASSWORD) {
    // Record successful attempt (clears any failed attempts)
    rateLimiter.recordSuccessfulAttempt(identifier);
    
    // Set authentication token and 24-hour expiry
    localStorage.setItem('adminAuth', 'authenticated');
    localStorage.setItem('adminAuthExpiry', (Date.now() + 24 * 60 * 60 * 1000).toString());
    return { success: true };
  } else {
    // Record failed attempt
    rateLimiter.recordFailedAttempt(identifier);
    
    // Get updated status for user feedback
    const status = rateLimiter.getRateLimitStatus(identifier);
    
    const errorMessage = status.attemptsRemaining > 0 ? 
      `Invalid password. ${status.attemptsRemaining} attempts remaining.` :
      `Too many failed attempts. Try again in ${status.config.lockoutMinutes} minutes.`;
    
    throw new Error(errorMessage);
  }
}

// Logout user
export function logout() {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminAuthExpiry');
}

// Get rate limit status for UI feedback
export function getRateLimitStatus() {
  const identifier = rateLimiter.getClientFingerprint();
  return rateLimiter.getRateLimitStatus(identifier);
}

// Middleware to protect admin routes
export function requireAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsAuth(isAuthenticated());
      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuth) {
      return <LoginForm onLogin={() => setIsAuth(true)} />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Login form component
function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);

  // Check rate limit status on component mount and periodically
  useEffect(() => {
    const checkRateLimit = () => {
      const status = getRateLimitStatus();
      setRateLimitInfo(status);
      
      if (status.limited) {
        setError(`Too many failed attempts. Try again in ${status.remainingMinutes} minutes.`);
      } else if (status.warningThreshold) {
        setWarning(`Warning: ${status.attemptsRemaining} attempts remaining before lockout`);
      } else {
        setWarning('');
        if (status.totalAttempts === 0) {
          setError('');
        }
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setWarning('');

    try {
      // Debug info removed for security
      // Check current rate limit status
      const currentStatus = getRateLimitStatus();
      
      if (currentStatus.limited) {
        throw new Error(`Too many failed attempts. Try again in ${currentStatus.remainingMinutes} minutes.`);
      }

      // Apply progressive delay
      const delay = currentStatus.progressiveDelay || 500;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const result = authenticate(password);
      if (result.success) {
        onLogin();
      }
          } catch (err) {
        setError(err.message);
      setPassword('');
      
      // Update rate limit info after failed attempt
      const newStatus = getRateLimitStatus();
      setRateLimitInfo(newStatus);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-form">
          <h1>🔒 Admin Login</h1>
          <p>Enter password to access admin panel</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-input ${error ? 'error' : ''}`}
                disabled={isLoading}
                autoFocus
                required
              />
            </div>
            
            {warning && (
              <div className="login-warning">{warning}</div>
            )}
            
            {error && (
              <div className="login-error">{error}</div>
            )}
            
            {rateLimitInfo && rateLimitInfo.limited && (
              <div className="rate-limit-info">
                <div className="lockout-timer">
                  🔒 Account temporarily locked
                </div>
                <div className="lockout-details">
                  Time remaining: {rateLimitInfo.remainingMinutes} minutes
                </div>
              </div>
            )}
            
            {rateLimitInfo && !rateLimitInfo.limited && rateLimitInfo.totalAttempts > 0 && (
              <div className="rate-limit-status">
                Failed attempts: {rateLimitInfo.totalAttempts}/{rateLimitInfo.config.maxAttempts}
              </div>
            )}
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading || !password.trim() || (rateLimitInfo && rateLimitInfo.limited)}
            >
              {isLoading ? 'Verifying...' : 
               rateLimitInfo && rateLimitInfo.limited ? 'Locked Out' : 
               'Login'}
            </button>
          </form>
          
          <div className="login-footer">
            <small>Session expires in 24 hours</small>
            {rateLimitInfo && (
              <small className="rate-limit-footer">
                Security: {rateLimitInfo.config.maxAttempts} attempts per {rateLimitInfo.config.windowMinutes} minutes
              </small>
            )}

          </div>
        </div>
      </div>
    </div>
  );
} 
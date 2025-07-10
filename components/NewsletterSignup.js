import React, { useState } from 'react';

export default function NewsletterSignup({ className = '', placeholder = "Your email address" }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the email to your backend API
      console.log('Subscribing email:', email);
      
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`newsletter-signup-container ${className}`}>
      <form className="newsletter-signup" onSubmit={handleSubmit}>
        <input
          className="newsletter-input"
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          aria-label="Email for newsletter subscription"
        />
        <button 
          className="newsletter-btn" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <div 
          className={`newsletter-message ${message.includes('Thank') ? 'newsletter-message--success' : 'newsletter-message--error'}`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import Head from 'next/head';
import emailjs from '@emailjs/browser';
import { trackContactForm } from '../lib/gtag';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Check if environment variables are set
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS not configured for contact form. Using simulation mode.');
        // Fallback to simulation for now
      await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon. (Demo mode - configure EmailJS for production)');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        return;
      }

      // Real EmailJS integration
      const templateParams = {
        to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'the.ainews0@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Track successful contact form submission
      trackContactForm();
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Contact – The AI NEWS</title>
        <meta name="description" content="Get in touch with The AI NEWS team. Send us your questions, feedback, or story tips about artificial intelligence." />
        <meta property="og:title" content="Contact – The AI NEWS" />
        <meta property="og:description" content="Get in touch with The AI NEWS team. Send us your questions, feedback, or story tips about artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/contact" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact – The AI NEWS" />
        <meta name="twitter:description" content="Get in touch with The AI NEWS team. Send us your questions, feedback, or story tips about artificial intelligence." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/contact" />
      </Head>
      
      <div className="content-container contact-main">
        <section className="page-header">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-description">
            We'd love to hear from you. Send us your questions, feedback, or story tips about artificial intelligence.
          </p>
        </section>

        <div className="contact-content">
          <div className="contact-info">
            <h2 className="contact-info-title">Get in Touch</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
                  </svg>
                </div>
                <div className="contact-method-info">
                  <h3 className="contact-method-title">Email</h3>
                  <p className="contact-method-desc">Send us an email and we'll respond within 24 hours</p>
                  <a href="mailto:the.ainews0@gmail.com" className="contact-method-link">the.ainews0@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28H112a8,8,0,0,1,0-16h28a12,12,0,0,0,0-24H112a28,28,0,0,1,0-56h28a8,8,0,0,1,0,16H112a12,12,0,0,0,0,24h28A28,28,0,0,1,168,148Z"/>
                  </svg>
                </div>
                <div className="contact-method-info">
                  <h3 className="contact-method-title">Response Time</h3>
                  <p className="contact-method-desc">We typically respond to all inquiries within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <h2 className="contact-form-title">Send us a Message</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`form-input ${errors.subject ? 'form-input-error' : ''}`}
                placeholder="What's this about?"
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <span id="subject-error" className="form-error" role="alert">
                  {errors.subject}
                </span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                placeholder="Tell us more about your inquiry..."
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className="form-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>
            
            <button 
              type="submit" 
              className="form-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitMessage && (
              <div 
                className={`form-message ${submitMessage.includes('error') ? 'form-message-error' : 'form-message-success'}`}
                role="alert"
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
} 
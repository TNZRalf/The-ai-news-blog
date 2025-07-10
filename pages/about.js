import React, { useState } from 'react';
import Head from 'next/head';

export default function About() {
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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
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
        <title>About – The AI NEWS</title>
        <meta name="description" content="Learn about The AI NEWS, our mission to provide unbiased AI journalism, and meet our team dedicated to quality reporting." />
        <meta property="og:title" content="About – The AI NEWS" />
        <meta property="og:description" content="Learn about The AI NEWS, our mission to provide unbiased AI journalism, and meet our team dedicated to quality reporting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/about" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About – The AI NEWS" />
        <meta name="twitter:description" content="Learn about The AI NEWS, our mission to provide unbiased AI journalism, and meet our team dedicated to quality reporting." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/about" />
      </Head>
      
      <div className="content-container about-main">
        <section className="page-header">
          <h1 className="section-title">About The AI NEWS</h1>
          <p className="section-description">
            Dedicated to providing unbiased, in-depth coverage of artificial intelligence developments, 
            ethical implications, and societal impact through quality journalism.
          </p>
        </section>

        <section className="about-mission">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-text">
            The AI NEWS is committed to delivering comprehensive, unbiased coverage of the rapidly evolving field of artificial intelligence. 
            We believe that informed public discourse about AI is essential for navigating the opportunities and challenges that these 
            technologies present to society.
          </p>
          <p className="about-text">
            Our mission is to bridge the gap between complex AI research and public understanding, ensuring that everyone has access to 
            accurate, timely, and relevant information about artificial intelligence developments.
          </p>
        </section>

        <section className="about-team">
          <h2 className="about-section-title">Leadership</h2>
          <div className="team-grid">
            <div className="team-member-card">
              <div className="team-member-avatar">
                <div className="avatar-placeholder">ZT</div>
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">Zakaria Tanani</h3>
                <p className="team-member-role">Founder, Developer & Designer</p>
                <p className="team-member-bio">
                  Zakaria is the sole founder and driving force behind The AI NEWS. As both developer and designer, 
                  he's responsible for the website's technical architecture, user experience, content curation, and editorial direction. 
                  With a passion for AI technology and journalism, Zakaria ensures that The AI NEWS maintains its commitment 
                  to quality reporting and accessibility.
                </p>
                <div className="team-member-contact">
                  <a href="mailto:zakaria.tanani12@gmail.com" className="team-contact-link">
                    zakaria.tanani12@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <h2 className="about-section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
                </svg>
              </div>
              <h3 className="value-title">Transparency</h3>
              <p className="value-description">We believe in clear, honest reporting with full disclosure of sources and potential conflicts of interest.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/>
                </svg>
              </div>
              <h3 className="value-title">Accuracy</h3>
              <p className="value-description">Every article undergoes thorough fact-checking to ensure the highest standards of journalistic integrity.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128S219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>
                </svg>
              </div>
              <h3 className="value-title">Independence</h3>
              <p className="value-description">Our editorial decisions are independent from external influences, ensuring unbiased coverage.</p>
            </div>
          </div>
        </section>

        <section className="about-contact">
          <h2 className="about-section-title">Get in Touch</h2>
          <p className="contact-intro">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
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
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                placeholder="Your message..."
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
        </section>
      </div>
    </>
  );
} 
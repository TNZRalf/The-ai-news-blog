import React from "react";
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy – The AI NEWS</title>
        <meta name="description" content="Privacy Policy for The AI NEWS. Learn how we collect, use, and protect your personal information." />
        <meta property="og:title" content="Privacy Policy – The AI NEWS" />
        <meta property="og:description" content="Privacy Policy for The AI NEWS. Learn how we collect, use, and protect your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/privacy" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ainews.com/privacy" />
      </Head>
      
      <div className="content-container legal-page">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="legal-section">
          <h2>Introduction</h2>
          <p>
            The AI NEWS ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you visit our website or use our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect the following personal information:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name and email address when you subscribe to our newsletter or contact us</li>
            <li><strong>Communication Data:</strong> Messages you send us through our contact form</li>
            <li><strong>Usage Data:</strong> Information about how you use our website</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your inquiries and customer service requests</li>
            <li>Improve our website and user experience</li>
            <li>Analyze website usage and trends</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
          <ul>
            <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist us in operating our website</li>
            <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In the event of a merger or sale, your information may be transferred</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            Cookies are small files stored on your device that help us:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze website traffic</li>
            <li>Provide personalized content</li>
            <li>Display relevant advertisements</li>
          </ul>
          <p>You can control cookies through your browser settings.</p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          
          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to our site and other sites. 
            You can opt out of personalized advertising by visiting Google's Ad Settings.
          </p>

          <h3>Analytics</h3>
          <p>
            We may use analytics services like Google Analytics to understand how visitors use our website. 
            These services may collect information about your use of our site.
          </p>

          <h3>EmailJS</h3>
          <p>
            We use EmailJS to process newsletter subscriptions and contact form submissions. 
            Your email information is processed according to their privacy policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="legal-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Withdrawal of consent for data processing</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section className="legal-section">
          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected information from a child, 
            please contact us immediately.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>Email: the.ainews0@gmail.com</li>
            <li>Through our <a href="/contact">contact form</a></li>
          </ul>
        </section>
      </div>
    </>
  );
} 
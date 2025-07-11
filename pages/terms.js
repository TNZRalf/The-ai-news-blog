import React from "react";
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service – The AI NEWS</title>
        <meta name="description" content="Terms of Service for The AI NEWS. Read our terms and conditions for using our website and services." />
        <meta property="og:title" content="Terms of Service – The AI NEWS" />
        <meta property="og:description" content="Terms of Service for The AI NEWS. Read our terms and conditions for using our website and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/terms" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ainews.com/terms" />
      </Head>
      
      <div className="content-container legal-page">
        <h1 className="section-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="legal-section">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using The AI NEWS website ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
            If you disagree with any part of these terms, then you may not access the Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>Description of Service</h2>
          <p>
            The AI NEWS is a news and information website focused on artificial intelligence, machine learning, 
            and related technologies. We provide articles, insights, tools recommendations, and educational content 
            about the AI industry.
          </p>
        </section>

        <section className="legal-section">
          <h2>User Accounts and Registration</h2>
          <p>
            While you can browse our website without registration, you may choose to subscribe to our newsletter 
            or contact us through our forms. When you do:
          </p>
          <ul>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining the confidentiality of any account information</li>
            <li>You must notify us immediately of any unauthorized use</li>
            <li>You are responsible for all activities that occur under your account</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Transmit any harmful, threatening, or offensive content</li>
            <li>Spam or send unsolicited communications</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Copy, modify, or distribute our content without permission</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property Rights</h2>
          
          <h3>Our Content</h3>
          <p>
            The Service and its original content, features, and functionality are owned by The AI NEWS and are protected by 
            international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h3>User Content</h3>
          <p>
            Any content you submit through our contact forms or communications becomes part of our records. 
            By submitting content, you grant us the right to use it for customer service and improvement purposes.
          </p>

          <h3>Third-Party Content</h3>
          <p>
            Our Service may contain links to third-party websites or services. We do not own or control these third parties 
            and are not responsible for their content or practices.
          </p>
        </section>

        <section className="legal-section">
          <h2>Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
            to understand our practices regarding the collection and use of your information.
          </p>
        </section>

        <section className="legal-section">
          <h2>Disclaimers</h2>
          
          <h3>Information Accuracy</h3>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties 
            about the completeness, accuracy, reliability, or suitability of the information on our Service.
          </p>

          <h3>Professional Advice</h3>
          <p>
            The content on our Service is for informational purposes only and should not be considered as professional, 
            legal, financial, or technical advice. Always consult with qualified professionals for specific advice.
          </p>

          <h3>Service Availability</h3>
          <p>
            We do not guarantee that the Service will be available at all times. We may experience hardware, software, 
            or other problems or need to perform maintenance that could result in interruptions or delays.
          </p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall The AI NEWS, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
            indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
            data, use, goodwill, or other intangible losses, resulting from your use of the Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless The AI NEWS and its licensees, licensors, employees, contractors, 
            agents, officers and directors from and against any and all claims, damages, obligations, losses, liabilities, 
            costs or debt, and expenses (including but not limited to attorney's fees).
          </p>
        </section>

        <section className="legal-section">
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
          </p>
        </section>

        <section className="legal-section">
          <h2>Advertising and Third-Party Services</h2>
          
          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our Service. These ads may be targeted based on your interests 
            and browsing behavior. We are not responsible for the content of third-party advertisements.
          </p>

          <h3>Affiliate Links</h3>
          <p>
            Our Service may contain affiliate links. If you click on these links and make a purchase, we may receive a commission 
            at no additional cost to you. This does not affect our editorial independence.
          </p>
        </section>

        <section className="legal-section">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
            The AI NEWS operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
            we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </section>

        <section className="legal-section">
          <h2>Severability</h2>
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
            interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, 
            and the remaining provisions will continue in full force and effect.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul>
            <li>Email: the.ainews0@gmail.com</li>
            <li>Through our <a href="/contact">contact form</a></li>
          </ul>
        </section>
      </div>
    </>
  );
} 
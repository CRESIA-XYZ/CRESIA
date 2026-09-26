import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container contact-page">
      <div className="page-hero">
        <h1>Contact us</h1>
        <p>We are here to help with styling advice, order support, and general inquiries.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Customer care</h3>
          <p>Email: <a href="mailto:hello@cresia.com">hello@cresia.com</a></p>
          <p>Phone: <a href="tel:+12125550199">+1 (212) 555-0199</a></p>
        </div>

        <div className="contact-card">
          <h3>Studio</h3>
          <p>45 Mercer Street</p>
          <p>New York, NY 10013</p>
        </div>

        <div className="contact-card">
          <h3>Business hours</h3>
          <ul>
            <li>Mon - Fri: 9:00 AM - 7:00 PM</li>
            <li>Sat: 10:00 AM - 5:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

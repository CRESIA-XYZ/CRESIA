import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container about-page">
      <div className="page-hero">
        <h1>About CRESIA</h1>
        <p>Thoughtful design, premium quality, and modern essentials for elevated everyday living.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Our story</h3>
          <p>CRESIA began with a simple idea: beautiful essentials should feel as premium as they look. Our collection balances elevated design with modern comfort.</p>
        </div>
        <div className="info-card">
          <h3>Our values</h3>
          <p>We value craftsmanship, thoughtful details, and timeless style that lasts beyond seasonal trends.</p>
        </div>
        <div className="info-card">
          <h3>Our promise</h3>
          <p>Every item is curated to help you move confidently through work, travel, weekends, and special moments.</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: '2rem' }}>
        <div className="stat-card">
          <h3>12k+</h3>
          <p>happy customers</p>
        </div>
        <div className="stat-card">
          <h3>150+</h3>
          <p>premium styles</p>
        </div>
        <div className="stat-card">
          <h3>4.8/5</h3>
          <p>average rating</p>
        </div>
        <div className="stat-card">
          <h3>48h</h3>
          <p>dispatch time</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

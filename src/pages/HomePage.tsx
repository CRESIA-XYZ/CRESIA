import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Gift, Star, MapPin, Mail, Phone } from 'lucide-react';
import { products } from '@/data/products';

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">CRESIA Collection</p>
          <h1>Define your everyday luxury.</h1>
          <p>Elevated essentials for a modern wardrobe, curated for how you live.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-secondary">Shop New Arrivals</Link>
            <Link to="/about" className="btn btn-outline">Discover the Story</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Curated categories</h2>
              <p className="section-subtitle">Style, comfort, and confidence for every chapter.</p>
            </div>
          </div>

          <div className="collections-grid">
            <div className="collection-card">
              <div className="icon"><Sparkles size={20} /></div>
              <h3>Women Edit</h3>
              <p>Signature silhouettes, soft textures, and timeless pieces.</p>
            </div>
            <div className="collection-card">
              <div className="icon"><Star size={20} /></div>
              <h3>Premium Essentials</h3>
              <p>Refined staples designed to transition from day to night.</p>
            </div>
            <div className="collection-card">
              <div className="icon"><Truck size={20} /></div>
              <h3>Travel Ready</h3>
              <p>Minimalist wardrobe upgrades built for movement and ease.</p>
            </div>
            <div className="collection-card">
              <div className="icon"><Gift size={20} /></div>
              <h3>Gift Edit</h3>
              <p>Thoughtful luxury for birthdays, events, and milestone moments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured products</h2>
              <p className="section-subtitle">Best-selling essentials crafted for elevated living.</p>
            </div>
            <Link to="/shop" className="btn btn-link">View all <ArrowRight size={18} /></Link>
          </div>

          <div className="grid product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id}>{/* ProductCard inserted in actual app build */}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Why CRESIA</h2>
              <p className="section-subtitle">Crafted for modern lifestyles with premium detail.</p>
            </div>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={22} /></div>
              <h3>Premium quality</h3>
              <p>Meticulously sourced, beautifully finished pieces with enduring value.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Truck size={22} /></div>
              <h3>Fast shipping</h3>
              <p>Quick dispatch across major regions with package tracking included.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Gift size={22} /></div>
              <h3>Gift-worthy packaging</h3>
              <p>Luxury presentation for every order, ready for celebration or self-gifting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Star size={22} /></div>
              <h3>Curated style</h3>
              <p>Thoughtful design and trend-informed pieces built around the essentials.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Brand story</h2>
              <p className="section-subtitle">Modern essentials shaped by timeless detail.</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Designed for real life</h3>
              <p>CRESIA brings refined, comfortable pieces into everyday routines, balancing effortless silhouettes with elevated materials.</p>
            </div>
            <div className="info-card">
              <h3>Made to last</h3>
              <p>From premium leather to artisan textures, each item is curated for longevity, comfort, and wearability.</p>
            </div>
            <div className="info-card">
              <h3>Style without excess</h3>
              <p>Minimalism meets statement-making. Our collection keeps essentials elevated and effortlessly wearable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Visit the studio</h2>
              <p className="section-subtitle">Find a CRESIA experience designed for your next style chapter.</p>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <h3><MapPin size={18} /> Visit</h3>
              <p>45 Mercer Street, New York, NY 10013</p>
            </div>
            <div className="contact-card">
              <h3><Mail size={18} /> Email</h3>
              <p><a href="mailto:hello@cresia.com">hello@cresia.com</a></p>
            </div>
            <div className="contact-card">
              <h3><Phone size={18} /> Call</h3>
              <p><a href="tel:+12125550199">+1 (212) 555-0199</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

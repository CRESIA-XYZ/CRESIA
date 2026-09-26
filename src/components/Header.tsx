import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useStore } from '@/store/store';
import './Header.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartCount = useStore((state) => state.getCartCount());
  const wishlistCount = useStore((state) => state.wishlist.length);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="logo">
            <span className="logo-text">CRESIA</span>
          </Link>

          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search products..." />
          </div>

          <div className="header-icons">
            <Link to="/cart" className="icon-link">
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <Link to="/wishlist" className="icon-link">
              <Heart size={24} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          <Link to="/account" onClick={() => setIsMenuOpen(false)}>Account</Link>
          <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link>
        </nav>
      </div>
    </header>
  );
};

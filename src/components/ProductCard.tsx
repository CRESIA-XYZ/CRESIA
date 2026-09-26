import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/store';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useStore((state) => state.addToCart);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        {!product.inStock && <span className="out-of-stock">Out of Stock</span>}

        {isHovered && (
          <div className="product-overlay">
            <button onClick={handleAddToCart} className="btn-add-to-cart" disabled={!product.inStock}>
              <ShoppingBag size={18} />
              {product.inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
            <Link to={`/product/${product.id}`} className="btn-view-details">
              View Details
            </Link>
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-header">
          <h3>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="category">{product.category}</p>

        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-value">{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

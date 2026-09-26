import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useStore } from '@/store/store';

const WishlistPage: React.FC = () => {
  const wishlist = useStore((state) => state.wishlist);
  const items = products.filter((product) => wishlist.some((item) => item.productId === product.id));

  return (
    <div className="container wishlist-page">
      <div className="page-hero">
        <h1>Your wishlist</h1>
        <p>Saved favorites, ready for your next wardrobe refresh.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <Heart size={40} />
          <h3>No saved items yet</h3>
          <p>Save products you love to keep track of them here.</p>
          <Link to="/shop" className="btn btn-primary">Browse products</Link>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

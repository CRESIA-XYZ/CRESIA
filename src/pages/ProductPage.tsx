import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useStore } from '@/store/store';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const isInWishlist = useStore((state) => (product ? state.isInWishlist(product.id) : false));

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>The item you are looking for may no longer be available.</p>
          <Link to="/shop" className="btn btn-primary">Back to shopping</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, product.sizes ? selectedSize : undefined, product.colors ? selectedColor : undefined);
    navigate('/cart');
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="container product-page">
      <div className="product-page-layout">
        <div className="product-gallery">
          <div className="gallery-thumbs">
            {(product.images || [product.image]).map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`gallery-thumb ${selectedImage === image ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>

          <img className="product-main-image" src={selectedImage} alt={product.name} />
        </div>

        <div className="product-details">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="price-row">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
          </div>

          <div className="product-meta">
            <span className="stars">★★★★★</span>
            <span>{product.rating} ({product.reviews} reviews)</span>
            {product.inStock ? <span>In stock</span> : <span>Out of stock</span>}
          </div>

          {product.sizes && (
            <div className="product-size-group">
              <div className="option-label">
                <span>Size</span>
                <span>{selectedSize}</span>
              </div>
              <div className="size-list">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="product-swatch-group">
              <div className="option-label">
                <span>Color</span>
                <span>{selectedColor}</span>
              </div>
              <div className="swatch-list">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`swatch ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-picker">
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <strong>{quantity}</strong>
              <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Add to cart
            </button>

            <button className="btn btn-outline" onClick={toggleWishlist}>
              <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
              {isInWishlist ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          <p className="product-description">{product.description}</p>

          <ul className="feature-list">
            <li><Star size={16} /> 4.8/5 customer rating</li>
            <li><Truck size={16} /> Free shipping on qualifying orders</li>
            <li><Heart size={16} /> Premium materials and curated design</li>
          </ul>
        </div>
      </div>

      <div className="related-products">
        <div className="section-header">
          <h2 className="section-title">You may also like</h2>
        </div>

        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/store';

const CartPage: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container cart-page">
      <div className="page-hero">
        <h1>Your cart</h1>
        <p>Review your selected items and continue to checkout when you are ready.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Explore the collection and add a few pieces you love.</p>
          <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div className="cart-list">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize || 'default'}-${item.selectedColor || 'default'}`} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <div className="item-meta">
                    <span>{item.product.category}</span>
                    {item.selectedColor && <span> • {item.selectedColor}</span>}
                    {item.selectedSize && <span> • {item.selectedSize}</span>}
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-picker">
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus size={16} />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="btn btn-link" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <div className="price">${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

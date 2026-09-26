import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';

const CheckoutPage: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const setCustomer = useStore((state) => state.setCustomer);
  const addOrder = useStore((state) => state.addOrder);
  const clearCart = useStore((state) => state.clearCart);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const order = {
      id: `CRES-${Math.floor(Math.random() * 900000 + 100000)}`,
      customer: {
        ...form,
        firstName: form.firstName,
        lastName: form.lastName,
      },
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending' as const,
      paymentMethod,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    };

    setCustomer(form);
    addOrder(order);
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add items before continuing to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div className="page-hero">
        <h1>Checkout</h1>
        <p>Complete your order and choose your preferred shipping and payment method.</p>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form checkout-card" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>First name</label>
              <input required value={form.firstName} onChange={(event) => handleChange('firstName', event.target.value)} />
            </div>
            <div className="form-field">
              <label>Last name</label>
              <input required value={form.lastName} onChange={(event) => handleChange('lastName', event.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email</label>
              <input type="email" required value={form.email} onChange={(event) => handleChange('email', event.target.value)} />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input type="tel" required value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <label>Shipping address</label>
            <textarea required value={form.address} onChange={(event) => handleChange('address', event.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>City</label>
              <input required value={form.city} onChange={(event) => handleChange('city', event.target.value)} />
            </div>
            <div className="form-field">
              <label>State</label>
              <input required value={form.state} onChange={(event) => handleChange('state', event.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>PIN / ZIP code</label>
              <input required value={form.zipCode} onChange={(event) => handleChange('zipCode', event.target.value)} />
            </div>
            <div className="form-field">
              <label>Country</label>
              <input required value={form.country} onChange={(event) => handleChange('country', event.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <label>Payment method</label>
            <div className="payment-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery (placeholder)
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                Online payment (placeholder)
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Place order</button>
        </form>

        <div className="summary-card">
          <h3>Order summary</h3>
          {cart.map((item) => (
            <div key={item.product.id} className="order-item-line">
              <span>{item.product.name} × {item.quantity}</span>
              <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

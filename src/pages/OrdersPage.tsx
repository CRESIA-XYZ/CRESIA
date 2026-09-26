import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/store';

const OrdersPage: React.FC = () => {
  const orders = useStore((state) => state.getOrders());

  if (orders.length === 0) {
    return (
      <div className="container orders-page">
        <div className="page-hero">
          <h1>Order tracking</h1>
          <p>Track your latest CRESIA purchases and delivery progress.</p>
        </div>

        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you place an order.</p>
          <Link to="/shop" className="btn btn-primary">Start shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container orders-page">
      <div className="page-hero">
        <h1>Order tracking</h1>
        <p>Monitor every order and delivery detail from your CRESIA account.</p>
      </div>

      <div className="order-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>{order.id}</h3>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="status-badge">{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.product.id}`} className="order-item-line">
                  <span>{item.product.name} × {item.quantity}</span>
                  <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Delivery ETA</span>
              <span>{new Date(order.estimatedDelivery || order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="summary-row">
              <span>Payment</span>
              <span>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

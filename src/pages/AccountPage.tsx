import React from 'react';
import { User, MapPin, Bell, ShieldCheck, Edit } from 'lucide-react';
import { useStore } from '@/store/store';

const AccountPage: React.FC = () => {
  const customer = useStore((state) => state.customer) || {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 212 555 0188',
    address: '45 Mercer Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10013',
    country: 'United States',
  };

  return (
    <div className="container account-page">
      <div className="page-hero">
        <h1>My account</h1>
        <p>Manage your profile, address details, and personal preferences.</p>
      </div>

      <div className="account-grid">
        <div className="account-panel">
          <h3><User size={18} /> Profile</h3>
          <p>{customer.firstName} {customer.lastName}</p>
          <ul>
            <li>{customer.email}</li>
            <li>{customer.phone}</li>
          </ul>
          <button className="btn btn-outline">Edit profile</button>
        </div>

        <div className="account-panel">
          <h3><MapPin size={18} /> Address</h3>
          <p>{customer.address}</p>
          <ul>
            <li>{customer.city}, {customer.state} {customer.zipCode}</li>
            <li>{customer.country}</li>
          </ul>
          <button className="btn btn-outline">Update address</button>
        </div>

        <div className="account-panel">
          <h3><Bell size={18} /> Preferences</h3>
          <ul>
            <li>Order updates enabled</li>
            <li>New arrivals notifications</li>
            <li>Exclusive promotions</li>
          </ul>
        </div>

        <div className="account-panel">
          <h3><ShieldCheck size={18} /> Security</h3>
          <ul>
            <li>Password protected</li>
            <li>Two-factor authentication available</li>
            <li>Secure payment settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    address: '',
    city: '',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNumber = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNumber);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page checkout-success page-fade-in">
        <div className="checkout-success-icon">✓</div>
        <h1>Order Confirmed</h1>
        <p>Thank you! Your order has been placed successfully.</p>
        <p className="checkout-order-number">Order #{orderNumber}</p>
        <Link to="/" className="checkout-success-link">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page checkout-empty page-fade-in">
        <h1>Your cart is empty</h1>
        <Link to="/" className="checkout-empty-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page page-fade-in">
      <h1 className="checkout-title">Checkout</h1>

      {!user && (
        <div className="checkout-guest-banner">
          <span>Have an account?</span>
          <button onClick={() => openAuthModal('login')}>Sign in for faster checkout</button>
        </div>
      )}

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form-section">
          <div className="checkout-block">
            <h2>Shipping Information</h2>

            <div className="checkout-field">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={shipping.fullName}
                onChange={(e) => handleShippingChange('fullName', e.target.value)}
              />
            </div>

            <div className="checkout-field-row">
              <div className="checkout-field">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) => handleShippingChange('email', e.target.value)}
                />
              </div>
              <div className="checkout-field">
                <label>Phone</label>
                <input
                  type="tel"
                  required
                  value={shipping.phone}
                  onChange={(e) => handleShippingChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="checkout-field">
              <label>Address</label>
              <input
                type="text"
                required
                value={shipping.address}
                onChange={(e) => handleShippingChange('address', e.target.value)}
              />
            </div>

            <div className="checkout-field">
              <label>City</label>
              <input
                type="text"
                required
                value={shipping.city}
                onChange={(e) => handleShippingChange('city', e.target.value)}
              />
            </div>
          </div>

          <div className="checkout-block">
            <h2>Payment Details</h2>
            <p className="checkout-payment-note">This is a demo — no real payment will be processed.</p>

            <div className="checkout-field">
              <label>Name on Card</label>
              <input
                type="text"
                required
                value={payment.cardName}
                onChange={(e) => handlePaymentChange('cardName', e.target.value)}
              />
            </div>

            <div className="checkout-field">
              <label>Card Number</label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={payment.cardNumber}
                onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
              />
            </div>

            <div className="checkout-field-row">
              <div className="checkout-field">
                <label>Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={payment.expiry}
                  onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                />
              </div>
              <div className="checkout-field">
                <label>CVV</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  maxLength={4}
                  value={payment.cvv}
                  onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-summary-items">
            {items.map(({ product, quantity }) => (
              <div className="checkout-summary-item stagger-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="checkout-summary-item-info">
                  <span>{product.name}</span>
                  <span className="checkout-summary-item-qty">Qty: {quantity}</span>
                </div>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button type="submit" className="checkout-place-order-btn">
            Place Order
          </button>

          <button type="button" className="checkout-back-btn" onClick={() => navigate('/cart')}>
            Back to Cart
          </button>
        </div>
      </form>
    </div>
  );
}
import { Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <h1>Your cart is empty</h1>
        <Link to="/" className="cart-empty-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(({ product, quantity }) => (
            <div className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} className="cart-item-image" />

              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p className="cart-item-price">${product.price}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(product.id, quantity - 1)}>&minus;</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
              </div>

              <p className="cart-item-total">${(product.price * quantity).toFixed(2)}</p>

              <button className="cart-item-remove" onClick={() => removeFromCart(product.id)} aria-label="Remove">
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="cart-checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
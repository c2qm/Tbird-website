import { Link } from 'react-router-dom';
import './Wishlist.css';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-page wishlist-empty page-fade-in">
        <h1>Your wishlist is empty</h1>
        <Link to="/" className="wishlist-empty-link">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page page-fade-in">
      <h1 className="wishlist-title">My Wishlist</h1>

      <div className="wishlist-grid">
        {items.map((product) => (
          <div className="wishlist-card stagger-item" key={product.id}>
            <button
              className="wishlist-remove-btn"
              onClick={() => removeFromWishlist(product.id)}
              aria-label="Remove from wishlist"
            >
              &times;
            </button>

            <Link to={`/product/${product.id}`} className="wishlist-card-image">
              <img src={product.image} alt={product.name} />
            </Link>

            <h3 className="wishlist-card-name">{product.name}</h3>
            <p className="wishlist-card-price">${product.price}</p>

            <button className="wishlist-add-cart-btn" onClick={() => addToCart(product, 1)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
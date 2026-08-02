import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import './Product.css';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Product() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="product-page product-not-found page-fade-in">
        <h1>Product not found</h1>
        <Link to="/" className="product-back-link">
          Back to shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.subcategorySlug === product.subcategorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlistClick = () => {
    if (!user) {
      openAuthModal('login', () => toggleWishlist(product));
      return;
    }
    toggleWishlist(product);
  };

  return (
    <div className="product-page page-fade-in">
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price}</p>

          <div className="product-detail-quantity">
            <span>Quantity</span>
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease">
                &minus;
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
          </div>

          <div className="product-detail-actions">
            <button className="product-detail-add-btn" onClick={handleAddToCart}>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              className={`product-detail-wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlistClick}
              aria-label="Toggle wishlist"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={inWishlist ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <Link to="/cart" className="product-detail-cart-link">
            View Cart
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="product-related">
          <h2 className="product-related-title">You may also like</h2>
          <div className="product-related-grid">
            {relatedProducts.map((p) => (
              <div key={p.id} className="stagger-item">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
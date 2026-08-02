import { Link } from 'react-router-dom';
import './ProductCard.css';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openAuthModal('login', () => toggleWishlist(product));
      return;
    }
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />

        <button
          className={`product-card-wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Toggle wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-price">${product.price}</p>

      <button className="product-card-add-btn" onClick={handleAddToCart} aria-label="Add to cart">
        Add to Cart
      </button>
    </Link>
  );
}
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import MegaMenu from './MegaMenu';
import Sidebar from './Sidebar';
import SearchPanel from './SearchPanel';
import AuthModal from './AuthModal';
import logo from '../assets/images/logo.svg';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();

  const handleWishlistClick = () => {
    if (user) {
      navigate('/wishlist');
    } else {
      openAuthModal('login', () => navigate('/wishlist'));
    }
  };

  return (
    <header className="navbar-header" onMouseLeave={() => setActiveCategory(null)}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="T-Bird Logo" />
          </Link>
        </div>

        <nav className="navbar-links">
          {categories.map((category) => (
            <div
              className="nav-item-wrapper"
              key={category.slug}
              onMouseEnter={() => setActiveCategory(category.slug)}
            >
              <div className="nav-link-wrapper">
                <Link to={`/category/${category.slug}`} className="nav-link">
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </nav>

        <div className="navbar-actions">
          <div className="search-wrapper">
            <div className="search-box" onClick={() => setIsSearchOpen(true)}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search" className="search-input" readOnly />
            </div>

            <button className="search-icon-mobile" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>

          <div className="user-menu-wrapper">
            <button
              className="icon-button"
              aria-label="Profile"
              onClick={() => (user ? setIsUserMenuOpen((v) => !v) : openAuthModal('login'))}
            >
              {user ? (
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>

            {user && isUserMenuOpen && (
              <div className="user-dropdown">
                <p className="user-dropdown-name">{user.name}</p>
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="icon-button" aria-label="Wishlist" onClick={handleWishlistClick}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </button>

          <Link to="/cart" className="icon-button" aria-label="Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button className="hamburger-button" aria-label="Open Sidebar" onClick={() => setIsSidebarOpen(true)}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      <MegaMenu isOpen={activeCategory !== null} activeCategory={activeCategory} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <AuthModal />
    </header>
  );
}

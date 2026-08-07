import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { categories } from '../data/categories';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const { openAuthModal } = useAuth();

  const activeCategory = categories.find((c) => c.slug === activeCategorySlug) ?? null;

  const handleCategoryClick = (slug: string) => {
    setActiveCategorySlug(slug);
  };

  const handleClose = () => {
    setActiveCategorySlug(null);
    onClose();
  };

  const handleSignInClick = () => {
    handleClose();
    openAuthModal('login');
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
      />
      <aside className={`sidebar-container ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          {activeCategory ? (
            <button className="sidebar-back-btn" onClick={() => setActiveCategorySlug(null)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {activeCategory.name}
            </button>
          ) : (
            <h3 className="sidebar-title">Menu</h3>
          )}
          <button className="sidebar-close-btn" onClick={handleClose} aria-label="Close Sidebar">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="sidebar-slider-viewport">
          <div className={`sidebar-content-wrapper ${activeCategory ? 'sub-view' : ''}`}>
            <div className="sidebar-main-menu">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  className="sidebar-link"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <span>{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="sidebar-submenu">
              {activeCategory && (
                <Link
                  to={`/category/${activeCategory.slug}`}
                  className="sidebar-link sidebar-link-all"
                  onClick={handleClose}
                >
                  All {activeCategory.name}
                </Link>
              )}
              {activeCategory?.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/category/${activeCategory.slug}/${sub.slug}`}
                  className="sidebar-link"
                  onClick={handleClose}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-footer-btn" onClick={handleSignInClick}>Sign In</button>
          <button className="sidebar-footer-btn">Help & Support</button>
        </div>
      </aside>
    </>
  );
}
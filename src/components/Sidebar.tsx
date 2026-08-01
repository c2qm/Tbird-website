import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const menuData: Record<string, string[]> = {
    "Limited TimeLimited Time": ["25% off Select Styles", "Up to 40% Off"],
    "Medical Clothing": ["Scrubs", "Lab Coats", "Medical Caps", "Compression Socks"],
    "Sport Clothing": ["Running Gear", "Training Tops", "Gym Shorts", "Tracksuits", "Compression Wear"],
    "Accessories": ["All Accessories", "Socks", "Bags & Backpacks", "Hats & Headwear"],
  };

  const categories = ["Limited TimeLimited Time", "Medical Clothing", "Sport Clothing", "Accessories",];

  const handleCategoryClick = (category: string) => {
    if (menuData[category]) {
      setActiveCategory(category);
    }
  };

  const handleClose = () => {
    setActiveCategory(null);
    onClose();
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
            <button className="sidebar-back-btn" onClick={() => setActiveCategory(null)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {activeCategory}
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
                  key={category} 
                  className="sidebar-link"
                  onClick={() => handleCategoryClick(category)}
                >
                  <span>{category}</span>
                  {menuData[category] && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="sidebar-submenu">
              {activeCategory && menuData[activeCategory]?.map((subItem, index) => (
                <span key={index} className="sidebar-link">
                  {subItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-footer-btn">Sign In</button>
          <button className="sidebar-footer-btn">Help & Support</button>
        </div>
      </aside>
    </>
  );
}
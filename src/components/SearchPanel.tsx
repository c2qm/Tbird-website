import { useState } from 'react';
import './SearchPanel.css';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <div className="search-panel-overlay" onClick={onClose} />
      <div className="search-panel">
        <div className="search-panel-bar">
          <div className="search-panel-input-wrapper">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-panel-input"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button className="search-panel-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="search-panel-filters">
          {/* الفلاتر تنضاف هنا لاحقًا */}
        </div>
      </div>
    </>
  );
}
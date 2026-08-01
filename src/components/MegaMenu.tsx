import React from 'react';
import './MegaMenu.css';

interface MegaMenuProps {
  isOpen: boolean;
}

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  const menuData = [
    {
      title: "Limited Time",
      items: ["25% off Select Styles", "Up to 40% Off"]
    },
    {
      title: "Medical Clothing",
      items: ["Scrubs", "Lab Coats", "Medical Caps", "Compression Socks"]
    },
    {
      title: "Sport Clothing",
      items: ["Running Gear", "Training Tops", "Gym Shorts", "Tracksuits", "Compression Wear"]
    },
    {
      title: "Accessories",
      items: ["All Accessories", "Socks", "Bags & Backpacks", "Hats & Headwear"]
    }
  ];

  return (
    <div className="mega-menu">
      <div className="mega-menu-content">
        <div className="mega-column">
          <h4>Highlights</h4>
          <ul>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>
        {menuData.map((col, idx) => (
          <div className="mega-column" key={idx}>
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((item, i) => (
                <li key={i}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
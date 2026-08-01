import { Link } from 'react-router-dom';
import './MegaMenu.css';
import { categories } from '../data/categories';

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
}

export default function MegaMenu({ isOpen, activeCategory }: MegaMenuProps) {
  if (!isOpen || !activeCategory) return null;

  const category = categories.find((c) => c.slug === activeCategory);
  if (!category) return null;

  return (
    <div className="mega-menu">
      <div className="mega-menu-content">
        <div className="mega-column">
          <h4>Highlights</h4>
          <ul>
            <li>
              <Link to={`/category/${category.slug}`}>
                All {category.name}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mega-column">
          <h4>{category.name}</h4>
          <ul>
            {category.subcategories.map((sub) => (
              <li key={sub.slug}>
                <Link to={`/category/${category.slug}/${sub.slug}`}>
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
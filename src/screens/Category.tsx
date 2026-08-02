import { useParams } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Category.css';

export default function Category() {
  const { categorySlug, subcategorySlug } = useParams();

  const category = categories.find((c) => c.slug === categorySlug);

  const filteredProducts = products.filter((p) => {
    if (subcategorySlug) {
      return p.categorySlug === categorySlug && p.subcategorySlug === subcategorySlug;
    }
    return p.categorySlug === categorySlug;
  });

  const subcategory = category?.subcategories.find((s) => s.slug === subcategorySlug);
  const pageTitle = subcategory ? subcategory.name : category?.name ?? 'Category';

  return (
    <div className="category-page page-fade-in">
      <h1 className="category-title">{pageTitle}</h1>

      {filteredProducts.length === 0 ? (
        <p className="category-empty">No products found in this category yet.</p>
      ) : (
        <div className="category-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="stagger-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
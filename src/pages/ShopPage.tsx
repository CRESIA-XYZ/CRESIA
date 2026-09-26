import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/data/products';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (query) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'low-to-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [activeCategory, searchTerm, sortBy]);

  const updateFilters = (nextCategory: string, nextSearch: string) => {
    const params = new URLSearchParams();
    if (nextCategory !== 'All') params.set('category', nextCategory);
    if (nextSearch.trim()) params.set('q', nextSearch.trim());
    setSearchParams(params);
  };

  return (
    <div className="container shop-page">
      <div className="page-hero">
        <h1>Shop the collection</h1>
        <p>Discover elevated essentials and modern wardrobe staples designed with intention.</p>
      </div>

      <div className="shop-toolbar">
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => {
                const nextCategory = category;
                setActiveCategory(nextCategory);
                updateFilters(nextCategory, searchTerm);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="shop-controls">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              const nextSearch = event.target.value;
              setSearchTerm(nextSearch);
              updateFilters(activeCategory, nextSearch);
            }}
            placeholder="Search products"
          />

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="results-meta">
        <p>{filteredProducts.length} products found</p>
        <p>{activeCategory === 'All' ? 'All categories' : activeCategory}</p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No items match your filters.</h3>
          <p>Try a different search or browse another category.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductsBySite } from '../store/productsSlice';
import { selectCurrentSiteId } from '../store/settingsSlice';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSiteId = useSelector(selectCurrentSiteId);
  const siteProducts = useSelector(state => selectProductsBySite(state, currentSiteId));
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = siteProducts;
    
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, siteProducts]);

  // Update selection if URL param changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchParams(category === 'All' ? {} : { category });
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <div className="bg-maroon py-20 text-cream">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">The Acharu Shop</h1>
          <p className="text-cream/70 max-w-2xl">
            Explore our collection of authentic, handcrafted pickles. From spicy mango to sweet jujube, we have something for every palate.
          </p>
        </div>
      </div>

      <div className="container-custom mt-[-40px]">
        {/* Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft-lg p-6 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between border border-white/40">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search our collection..."
              className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-maroon/10 focus:bg-white focus:border-maroon/20 transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0",
                  selectedCategory === cat 
                    ? "bg-maroon text-cream shadow-lg shadow-maroon/20" 
                    : "bg-slate-100/50 text-slate-500 hover:bg-slate-200/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-xl shadow-soft">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-maroon/40" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No pickles found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {setSelectedCategory('All'); setSearchQuery(''); setSearchParams({});}}
              className="mt-6 text-maroon font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

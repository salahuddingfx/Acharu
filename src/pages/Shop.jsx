import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductsBySite } from '../store/productsSlice';
import { selectCurrentSiteId } from '../store/settingsSlice';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSiteId = useSelector(selectCurrentSiteId);
  const siteProducts = useSelector(state => selectProductsBySite(state, currentSiteId));
  
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let result = siteProducts || [];
    
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery, siteProducts]);

  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCategoryClick = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Premium Header */}
      <div className="bg-maroon py-32 text-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-0" />
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-px w-12 bg-white/30" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cream/60">Artisanal Collection</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter">The Acharu <span className="italic opacity-30">Pantry</span></h1>
          <p className="text-cream/70 max-w-2xl text-xl font-medium leading-relaxed">
            Handcrafted with patience, bottled with love. Explore our heritage of authentic Bangladeshi pickles.
          </p>
        </div>
      </div>

      <div className="container-custom mt-[-80px] relative z-20">
        {/* Modern Filter Toolbar */}
        <div className="bg-white/90 backdrop-blur-3xl rounded-[48px] shadow-premium p-10 mb-20 flex flex-col xl:flex-row gap-12 items-center justify-between border border-white/60">
          <div className="relative w-full xl:w-[600px]">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="text" 
              placeholder="Seeking a specific flavor?"
              className="w-full pl-20 pr-10 py-6 bg-slate-50 border border-transparent rounded-[32px] focus:outline-none focus:ring-4 focus:ring-maroon/5 focus:bg-white focus:border-maroon/20 transition-all text-sm font-bold"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-5 w-full xl:w-auto overflow-x-auto pb-6 xl:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={clsx(
                  "px-10 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all shrink-0",
                  selectedCategory === cat 
                    ? "bg-maroon text-cream shadow-2xl shadow-maroon/40 scale-105" 
                    : "bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:border-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white/40 backdrop-blur-xl rounded-[64px] border border-white/60 shadow-premium">
            <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Search size={40} className="text-slate-200" />
            </div>
            <h3 className="text-3xl font-display font-black text-slate-800 mb-4">A Quiet Pantry</h3>
            <p className="text-slate-400 font-medium text-lg">We couldn't find any pickles matching your search.</p>
            <button 
              onClick={() => setSearchParams({}, { replace: true })}
              className="mt-10 text-maroon font-black uppercase tracking-[0.3em] text-xs hover:scale-110 transition-transform"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

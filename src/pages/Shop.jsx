import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { Search, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectProductsBySite } from '../store/productsSlice';
import { selectCurrentSiteId, selectCategories } from '../store/settingsSlice';
import { Helmet } from 'react-helmet-async';
import SkeletonCard from '../components/SkeletonCard';

const Shop = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSiteId = useSelector(selectCurrentSiteId);
  const siteProducts = useSelector(state => selectProductsBySite(state, currentSiteId));
  const categories = useSelector(selectCategories);
  
  const selectedCategoryName = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (localSearch) {
        newParams.set('search', localSearch);
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const filteredProducts = useMemo(() => {
    let result = siteProducts || [];
    
    if (selectedCategoryName !== 'All') {
      result = result.filter(p => p.category?.name === selectedCategoryName || p.category === selectedCategoryName);
    }
    
    if (searchQuery) {
      result = result.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [selectedCategoryName, searchQuery, siteProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryName, searchQuery]);

  const handleSearchChange = (value) => {
    setLocalSearch(value);
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
    <>
      <Helmet>
        <title>Shop | Acharu - Authentic Homemade Products</title>
        <meta name="description" content="Browse our collection of authentic homemade pickles and traditional delicacies." />
      </Helmet>
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
        <div className={clsx(
          "bg-white/90 backdrop-blur-3xl rounded-[48px] shadow-premium p-10 mb-20 flex flex-col xl:flex-row gap-12 items-center justify-between border border-white/60",
          isDropdownOpen ? "relative z-50" : "relative z-20"
        )}>
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
          
          <div className="relative group w-full xl:w-auto">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={clsx(
                "w-full xl:w-72 flex items-center justify-between px-10 py-6 rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] transition-all border",
                selectedCategoryName !== 'All' 
                  ? "bg-maroon text-cream border-maroon shadow-2xl shadow-maroon/20" 
                  : "bg-slate-50 text-slate-500 border-transparent hover:border-slate-200"
              )}
            >
              <span>{selectedCategoryName === 'All' ? 'Filter Categories' : selectedCategoryName}</span>
              <ChevronDown size={18} className={clsx("transition-transform duration-500", isDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-full md:w-80 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 border border-slate-100 z-[100] overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => { handleCategoryClick('All'); setIsDropdownOpen(false); }}
                        className={clsx(
                          "w-full text-left px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                          selectedCategoryName === 'All' ? "bg-maroon text-cream" : "hover:bg-slate-50 text-slate-400 hover:text-slate-900"
                        )}
                      >
                        All Categories
                      </button>
                      <div className="h-px bg-slate-100 my-2 mx-4" />
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { handleCategoryClick(cat.name); setIsDropdownOpen(false); }}
                          className={clsx(
                            "w-full text-left px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedCategoryName === cat.name ? "bg-maroon text-cream shadow-xl" : "hover:bg-slate-50 text-slate-400 hover:text-slate-900"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        {!siteProducts || siteProducts.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {currentItems.map((product) => (
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
              onClick={() => { setSearchParams({}, { replace: true }); setLocalSearch(''); }}
              className="mt-10 text-maroon font-black uppercase tracking-[0.3em] text-xs hover:scale-110 transition-transform"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={clsx(
                  "w-12 h-12 rounded-2xl font-black transition-all",
                  currentPage === i + 1 
                    ? "bg-maroon text-white shadow-glow scale-110" 
                    : "bg-white text-slate-400 hover:text-slate-800 border border-slate-100"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Shop;

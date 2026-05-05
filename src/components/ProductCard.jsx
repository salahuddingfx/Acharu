import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { language, t: translate } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderNow = (e) => {
    e.preventDefault();
    dispatch(addItem({ product }));
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ product }));
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-500 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50/50">
        <img 
          src={product.images?.find(i => i.is_primary)?.image_path || (product.images && product.images.length > 0 ? product.images[0].image_path : (product.image_path || product.image || 'https://images.unsplash.com/photo-1514516348920-f319999a5e8f?q=80&w=400&auto=format&fit=crop'))} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
           <Link 
             to={`/product/${product.slug || product.id}`}
             className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-maroon hover:text-white transition-all scale-75 group-hover:scale-100 duration-500 delay-75 shadow-xl"
           >
             <Eye size={22} />
           </Link>
           <button 
             onClick={handleAddToCart}
             className="w-14 h-14 rounded-full bg-white flex items-center justify-center transition-all scale-75 group-hover:scale-100 duration-500 delay-150 shadow-xl text-slate-900 hover:bg-maroon hover:text-white"
           >
             <ShoppingBag size={22} />
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow mb-3">
          <Link 
            to={`/product/${product.slug || product.id}`}
            className={clsx(
              "text-xs font-black text-slate-800 hover:text-maroon transition-colors line-clamp-1 uppercase tracking-tight",
              language === 'bn' && "text-[14px] leading-tight"
            )}
          >
            {translate(product.name, product.name_bn)}
          </Link>
        </div>

        <div className="flex items-end justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-black text-maroon tracking-tighter">৳{product.price}</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm bg-slate-100 text-slate-900 hover:bg-slate-200"
              title="Add to Cart"
            >
              <ShoppingBag size={18} />
            </button>
            <button 
              onClick={handleOrderNow}
              className="px-4 h-10 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md bg-maroon text-white hover:bg-maroon/90 hover:-translate-y-0.5 shadow-maroon/20"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Order</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { formatPrice } from '../utils/delivery';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ product }));
  };

  return (
    <motion.div 
      className="card-premium group"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link 
            to={`/product/${product.id}`}
            className="w-12 h-12 rounded-full bg-white text-maroon flex items-center justify-center hover:bg-maroon hover:text-white transition-colors shadow-lg"
          >
            <Eye size={20} />
          </Link>
          <button 
            onClick={() => dispatch(addItem({ product }))}
            className="w-12 h-12 rounded-full bg-white text-maroon flex items-center justify-center hover:bg-maroon hover:text-white transition-colors shadow-lg"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-maroon uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display font-bold text-xl text-slate-800 group-hover:text-maroon transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="bg-maroon/5 px-2 py-1 rounded text-[10px] font-bold text-maroon uppercase">
            {product.weight}kg
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-maroon">
            {formatPrice(product.price)}
          </span>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              dispatch(addItem({ product }));
            }}
            className="w-10 h-10 rounded-full bg-slate-900 text-cream flex items-center justify-center hover:bg-maroon transition-all duration-300 shadow-md active:scale-90"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

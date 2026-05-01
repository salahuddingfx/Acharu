import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal, 
  selectCartCount, 
  removeItem, 
  updateQuantity 
} from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/delivery';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setLoading(true);
    try {
      const response = await api.post('/validate-coupon', { code: couponCode });
      setAppliedCoupon(response.data.coupon);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    } finally {
      setLoading(false);
    }
  };

  const discountAmount = appliedCoupon 
    ? (appliedCoupon.type === 'percentage' 
        ? (totalPrice * (appliedCoupon.value / 100)) 
        : parseFloat(appliedCoupon.value))
    : 0;

  const finalTotal = Math.max(0, totalPrice - discountAmount);

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
            <ShoppingBag size={48} className="text-maroon/20" />
          </div>
          <h2 className="text-4xl font-display font-black text-slate-800 mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg">
            Add some handcrafted deliciousness to your cart and start your journey with Acharu.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-maroon transition-all shadow-xl hover:shadow-maroon/20 group"
          >
            Start Shopping
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-32 pt-20">
      <div className="container-custom">
        <header className="mb-16">
          <h1 className="text-5xl font-display font-black text-slate-900 tracking-tight mb-4">Shopping Cart</h1>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>{cartCount} items in your bag</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>Free delivery over ৳2000</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white p-4 md:p-6 rounded-2xl border-b border-slate-100 flex flex-row items-center gap-4 md:gap-6 w-full overflow-hidden"
                >
                  {/* Quantity Controls - Vertical */}
                  <div className="flex flex-col items-center gap-1 md:gap-2 shrink-0">
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="text-maroon hover:scale-125 transition-transform p-1"
                    >
                      <Plus size={18} className="font-bold" />
                    </button>
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 border-orange-400 rounded-lg font-black text-slate-800 text-sm md:text-base">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      disabled={item.quantity <= 1}
                      className="text-maroon hover:scale-125 transition-transform disabled:opacity-30 p-1"
                    >
                      <Minus size={18} className="font-bold" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-50 p-1 shrink-0 border border-slate-100">
                    <img 
                      src={item.image_path || item.image || 'https://images.unsplash.com/photo-1514516348920-f319999a5e8f?q=80&w=400&auto=format&fit=crop'} 
                      alt={item.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-sm md:text-lg text-slate-800 leading-tight mb-1 truncate">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-base md:text-xl font-black text-blue-600">৳{item.price}</span>
                      <span className="text-[10px] md:text-sm font-bold text-slate-500 whitespace-nowrap">(৳{item.price} x {item.quantity})</span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shrink-0"
                  >
                    <Trash2 size={16} className="md:w-5 md:h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100/50">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Secure Delivery</h4>
                  <p className="text-xs text-slate-400">Fast & safe shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100/50">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Quality Assured</h4>
                  <p className="text-xs text-slate-400">100% Handcrafted</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100/50">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <RefreshCcw size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Easy Returns</h4>
                  <p className="text-xs text-slate-400">7-day policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="bg-white p-10 rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              
              <h3 className="font-display font-black text-3xl mb-10 text-slate-900 tracking-tight">Order Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-black">{formatPrice(totalPrice)}</span>
                </div>

                {/* Coupon Section */}
                <div className="pt-6 border-t border-slate-100">
                   <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-grow min-w-0 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 text-sm focus:ring-2 focus:ring-maroon/20 transition-all"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={loading || !couponCode}
                        className="shrink-0 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-maroon transition-all disabled:opacity-50"
                      >
                        {loading ? '...' : 'Apply'}
                      </button>
                   </div>
                   {appliedCoupon && (
                     <div className="mt-3 flex items-center justify-between text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2">
                          <Ticket size={14} />
                          <span className="text-xs font-black">{appliedCoupon.code} Applied</span>
                        </div>
                        <button onClick={() => setAppliedCoupon(null)} className="text-slate-400 hover:text-red-500">
                           <X size={14} />
                        </button>
                     </div>
                   )}
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-black">Calculated later</span>
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
                    <h4 className="text-4xl font-display font-black text-maroon mt-1 tracking-tighter">{formatPrice(finalTotal)}</h4>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout" 
                state={{ discountAmount, appliedCoupon, finalTotal }}
                className="flex items-center justify-center gap-4 bg-slate-900 text-white w-full py-6 rounded-3xl font-black text-xl hover:bg-maroon transition-all shadow-2xl hover:shadow-maroon/20 group"
              >
                Proceed to Checkout
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] justify-center">
                  <ShieldCheck size={14} />
                  <span>100% Secure Checkout</span>
                </div>
                <Link to="/shop" className="text-center text-sm font-bold text-slate-400 hover:text-maroon transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

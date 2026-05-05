import { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('id');

  useEffect(() => {
    // Launch confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Auto redirect to home after 15 seconds
    const timeout = setTimeout(() => {
      // navigate('/');
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Order Confirmed | Acharu</title>
      </Helmet>
      <div className="bg-[#FFF9F5] min-h-screen py-20 flex items-center relative overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-maroon/5 rounded-[80px] blur-3xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
        />

        <div className="container-custom max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            
            {/* Left Column: Celebratory Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white rounded-[50px] p-10 md:p-14 text-center shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-28 h-28 bg-maroon text-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-maroon/30 rotate-12"
              >
                <CheckCircle2 size={56} strokeWidth={2.5} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">Yum! Order Placed.</h1>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                Sit back and relax! Your authentic homemade treats are being prepared with love and will reach you soon.
              </p>

              <div className="bg-slate-50 rounded-[40px] p-8 mb-10 border border-slate-100 group hover:border-maroon/20 transition-all">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Order Reference</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-maroon tracking-wider mb-8">{orderId || 'ORDER-PENDING'}</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to={`/track?id=${orderId}`}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-maroon transition-all hover:shadow-xl active:scale-95"
                  >
                    <Truck size={20} />
                    Live Tracking
                  </Link>
                  <a 
                    href={`https://wa.me/8801700000000?text=Hi, I want to track my order #${orderId}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-[#25D366] text-white rounded-2xl font-bold hover:bg-[#1da851] transition-all hover:shadow-xl active:scale-95 shadow-lg shadow-green-100"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Help
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">In Preparation</span>
                </div>
                <div className="w-[1px] h-4 bg-slate-100" />
                <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest hover:text-maroon transition-colors flex items-center gap-1">
                  Continue Shopping <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Next Steps & Surprise */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-soft"
              >
                <h4 className="text-lg font-bold text-slate-900 mb-6">What happens next?</h4>
                <div className="space-y-6">
                  {[
                    { icon: ShoppingBag, title: "Processing", desc: "We're verifying your items and packing them fresh." },
                    { icon: Truck, title: "Shipping", desc: "Our courier partner will pick up your package." },
                    { icon: CheckCircle2, title: "Delivery", desc: "Get ready to enjoy your homemade treats!" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <step.icon size={18} className="text-maroon" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-0.5">{step.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-maroon to-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-2">A small surprise! 🎁</h4>
                  <p className="text-sm text-white/70 mb-4">Enjoy 10% off on your next purchase using this code.</p>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex justify-between items-center group-hover:bg-white/20 transition-all">
                    <span className="font-mono font-bold tracking-widest uppercase">ACHARU10</span>
                    <button className="text-[10px] font-black uppercase tracking-widest bg-white text-maroon px-4 py-2 rounded-xl">Copy</button>
                  </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-10 -mt-10 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

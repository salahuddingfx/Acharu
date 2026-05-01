import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { selectHeroSlides } from '../store/settingsSlice';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Hero = () => {
  const slides = useSelector(selectHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const dispatch = useDispatch();

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          nextSlide();
          return 0;
        }
        return oldProgress + 0.4;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "expo.out" }
      );
    });
    return () => ctx.revert();
  }, [currentSlide]);

  if (!slides.length) return null;
  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-[650px] w-full overflow-hidden bg-slate-950">
      {/* Cinematic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-0"
        >
          {/* Top Shadow for Navbar visibility */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-950/80 to-transparent z-15" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-5" />
          <img 
            src={activeSlide.image} 
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center">
        {/* Center Side: Main Text */}
        <div ref={contentRef} className="max-w-4xl">
          <motion.div 
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-maroon bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 shadow-2xl">
               {activeSlide.badge || 'Artisanal Collection'}
             </span>
          </motion.div>

          <h1 className="text-6xl md:text-[8rem] font-display font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase">
            {activeSlide.title}
          </h1>

          <p className="text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto font-medium">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Bottom Interaction Bar */}
        <div className="absolute bottom-12 left-0 right-0 px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* CTAs */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => dispatch(addItem({ product: { id: activeSlide.productId, name: activeSlide.title, price: activeSlide.price, image: activeSlide.image, weight: 0.5 } }))}
              className="btn-primary !px-10 !py-5 !text-sm !rounded-2xl shadow-2xl shadow-maroon/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={18} />
              Acquire Now
            </button>

            <Link 
              to={`/product/${activeSlide.productId}`}
              className="group flex items-center gap-4 text-cream font-black uppercase tracking-widest text-[10px] hover:text-maroon transition-all"
            >
              <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-maroon group-hover:bg-maroon transition-all duration-500">
                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
              </div>
              <span>Explore Collection</span>
            </Link>
          </div>

          {/* Progress & Navigation */}
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-4">
               {slides.map((_, index) => (
                 <div 
                   key={index}
                   className="flex items-center gap-3 cursor-pointer group"
                   onClick={() => { setCurrentSlide(index); setProgress(0); }}
                 >
                   <div className="w-10 h-1 bg-white/10 relative overflow-hidden rounded-full">
                      {index === currentSlide && (
                        <motion.div 
                          className="absolute inset-0 bg-maroon"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                   </div>
                   <span className={clsx(
                     "text-[10px] font-black transition-all duration-500 uppercase tracking-widest",
                     index === currentSlide ? "text-maroon" : "text-cream/20 group-hover:text-cream/60"
                   )}>
                     0{index + 1}
                   </span>
                 </div>
               ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={prevSlide} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-cream hover:bg-maroon hover:border-maroon transition-all duration-500">
                <ChevronLeft size={22} />
              </button>
              <button onClick={nextSlide} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-cream hover:bg-maroon hover:border-maroon transition-all duration-500">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

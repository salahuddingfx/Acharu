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
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden bg-slate-950">
      {/* Cinematic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/30 z-5" />
          <img 
            src={activeSlide.image} 
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div ref={contentRef} className="max-w-4xl">
          {/* Tagline Badge */}
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px w-12 bg-maroon" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cream/60">
               {activeSlide.badge || 'Premium Artisanal Collection'}
             </span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-display font-black text-white leading-[0.85] mb-12 tracking-tighter">
            {activeSlide.title.split(' ').map((word, i) => (
              <span key={i} className="block overflow-hidden h-fit">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "expo.out" }}
                  className={i === 1 ? "text-maroon italic" : "block"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-cream/70 mb-14 leading-relaxed max-w-2xl font-medium">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            <button 
              onClick={() => dispatch(addItem({ product: { id: activeSlide.productId, name: activeSlide.title, price: activeSlide.price, image: activeSlide.image, weight: 0.5 } }))}
              className="btn-primary !px-12 !py-6 !text-lg !rounded-[24px] shadow-2xl shadow-maroon/30 hover:scale-105 active:scale-95"
            >
              <ShoppingBag size={22} />
              Acquire Now
            </button>

            <Link 
              to={`/product/${activeSlide.productId}`}
              className="group flex items-center gap-5 text-cream font-black uppercase tracking-widest text-xs hover:text-maroon transition-all"
            >
              <div className="w-16 h-16 rounded-2xl border border-white/20 flex items-center justify-center group-hover:border-maroon group-hover:bg-maroon transition-all duration-700">
                <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
              </div>
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicators - Vertical Side Style */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-12">
        {slides.map((_, index) => (
          <div 
            key={index}
            className="flex items-center gap-6 cursor-pointer group"
            onClick={() => { setCurrentSlide(index); setProgress(0); }}
          >
            <span className={clsx(
              "text-[10px] font-black transition-all duration-500 uppercase tracking-widest",
              index === currentSlide ? "text-maroon scale-125" : "text-cream/20 group-hover:text-cream/60"
            )}>
              0{index + 1}
            </span>
            <div className="h-20 w-px bg-white/10 relative overflow-hidden">
               {index === currentSlide && (
                 <motion.div 
                   className="absolute top-0 left-0 w-full bg-maroon"
                   style={{ height: `${progress}%` }}
                 />
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status & Controls */}
      <div className="absolute bottom-12 left-12 right-12 z-30 flex items-end justify-between">
         <div className="flex items-center gap-6">
            <button onClick={prevSlide} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-maroon hover:border-maroon transition-all duration-500">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-maroon hover:border-maroon transition-all duration-500">
              <ChevronRight size={24} />
            </button>
         </div>

         <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4 text-cream/40">
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cinematic Experience</span>
               <div className="w-12 h-px bg-white/20" />
            </div>
         </div>
      </div>
    </section>
  );
};

export default Hero;

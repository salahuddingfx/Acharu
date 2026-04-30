import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Authentic Homemade Mango Achar",
    subtitle: "Made with hand-picked green mangoes and pure mustard oil. A taste of tradition in every bite.",
    image: "https://images.unsplash.com/photo-1589135234398-386052733907?q=80&w=1600&auto=format&fit=crop",
    productId: "1",
    price: 250
  },
  {
    id: 2,
    title: "Spicy Naga Morich Bliss",
    subtitle: "For those who crave the heat. Experience the legendary Naga chili in a perfectly balanced pickle.",
    image: "https://images.unsplash.com/photo-1597131628347-c769fc631754?q=80&w=1600&auto=format&fit=crop",
    productId: "5",
    price: 450
  },
  {
    id: 3,
    title: "Sweet & Sour Jujube Delight",
    subtitle: "A chewy, tangy, and sweet treat that takes you back to your childhood. Pure nostalgia.",
    image: "https://images.unsplash.com/photo-1596450514735-24d6237a0120?q=80&w=1600&auto=format&fit=crop",
    productId: "3",
    price: 180
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const dispatch = useDispatch();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
      
      gsap.fromTo(slideRef.current,
        { scale: 1.1, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    });

    const timer = setInterval(nextSlide, 6000);
    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [currentSlide]);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div 
        ref={slideRef}
        key={`bg-${currentSlide}`}
        className="absolute inset-0 z-0 transition-opacity duration-1000"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={activeSlide.image} 
          alt={activeSlide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div ref={contentRef} key={`content-${currentSlide}`} className="max-w-2xl text-cream">
          <span className="inline-block bg-maroon px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
            Handcrafted with Love
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            {activeSlide.title}
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-10 leading-relaxed">
            {activeSlide.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => dispatch(addItem({ product: { id: activeSlide.productId, name: activeSlide.title, price: activeSlide.price, image: activeSlide.image, weight: 0.5 } }))}
              className="btn-primary !px-8 !py-4 text-lg"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            <Link 
              to={`/product/${activeSlide.productId}`}
              className="btn-secondary !text-cream !border-cream hover:!bg-cream hover:!text-maroon !px-8 !py-4 text-lg"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-maroon transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-maroon transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-700 rounded-full ${index === currentSlide ? 'w-16 bg-maroon' : 'w-4 bg-cream/20 hover:bg-cream/40'}`}
          />
        ))}
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 text-cream/40">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-maroon"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

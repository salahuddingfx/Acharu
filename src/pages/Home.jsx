import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { selectProductsBySite } from '../store/productsSlice';
import { selectCurrentSiteId } from '../store/settingsSlice';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const Home = () => {
  const currentSiteId = useSelector(selectCurrentSiteId);
  const siteProducts = useSelector(state => selectProductsBySite(state, currentSiteId));
  const featuredProducts = siteProducts.slice(0, 4);

  const displayCategories = categories.filter(c => c !== 'All').map(cat => {
    const product = siteProducts.find(p => p.category === cat);
    return { name: cat, image: product?.image || siteProducts[0]?.image };
  }).slice(0, 4);

  const features = [
    {
      icon: <ShieldCheck className="text-maroon" size={32} />,
      title: "100% Homemade",
      description: "Authentic recipes passed down through generations."
    },
    {
      icon: <Truck className="text-maroon" size={32} />,
      title: "Fast Delivery",
      description: "Carefully packed and delivered to your doorstep."
    },
    {
      icon: <Star className="text-maroon" size={32} />,
      title: "Premium Quality",
      description: "Only the freshest ingredients and spices are used."
    }
  ];

  return (
    <div className="bg-cream min-h-screen">
      <Hero />

      {/* Features */}
      <section className="py-20 bg-white">
        {/* ... existing features mapping ... */}
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 overflow-hidden">
        <div className="container-custom">
          <div className="mb-16">
             <span className="text-maroon font-bold tracking-widest uppercase text-sm">Curated Collections</span>
             <h2 className="text-5xl font-display font-bold mt-4 tracking-tighter">Featured Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/shop?category=${cat.name}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[40px] shadow-premium"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <p className="text-cream/60 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Heritage</p>
                    <h3 className="text-2xl font-display font-black text-white mb-6 group-hover:text-maroon transition-colors">{cat.name}</h3>
                    <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[10px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <span>Explore</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-maroon font-bold tracking-widest uppercase text-sm">Our Favorites</span>
              <h2 className="text-4xl font-display font-bold mt-2">Best Sellers</h2>
            </div>
            <Link to="/shop" className="text-maroon font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-24 bg-maroon text-cream overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Traditional Taste, <br />Modern Convenience.
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                We believe that good food brings people together. Our pickles are made in small batches to ensure the highest quality and authentic flavor that you won't find anywhere else.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center">
                    <span className="font-bold">10+</span>
                  </div>
                  <span className="font-medium">Unique Flavors</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center">
                    <span className="font-bold">5k+</span>
                  </div>
                  <span className="font-medium">Happy Customers</span>
                </div>
              </div>
              <Link to="/shop" className="btn-secondary !text-cream !border-cream hover:!bg-cream hover:!text-maroon !px-10 inline-flex">
                Explore Our Collection
              </Link>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1514516348920-f319999a5e8f?q=80&w=800&auto=format&fit=crop" 
                alt="Achar making" 
                className="relative z-10 rounded-2xl shadow-2xl rotate-3"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

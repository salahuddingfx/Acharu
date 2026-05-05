import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { selectProductsBySite } from '../store/productsSlice';
import { selectCurrentSiteId, selectCategories, selectContact, selectHomeSettings } from '../store/settingsSlice';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, ShieldCheck, Truck, ArrowUpRight, Leaf, Heart,
  Clock, ChevronRight, MessageCircle, CheckCircle, Mail, Flame, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getReviews, submitContact } from '../api/api';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

// Helper to map icon names to components
const IconMap = {
  Leaf, ShieldCheck, Truck, Star, Heart, Flame, Award, Clock, ChevronRight, CheckCircle
};

const Home = () => {
  const currentSiteId = useSelector(selectCurrentSiteId);
  const siteProducts = useSelector(state => selectProductsBySite(state, currentSiteId));
  const categories = useSelector(selectCategories);
  const contact = useSelector(selectContact);
  const homeSettings = useSelector(selectHomeSettings);
  const featuredProducts = siteProducts.slice(0, 4);

  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Fallback data if DB settings aren't set yet
  const whyUs = homeSettings?.why_us || [
    { icon: 'Leaf', title: 'All-Natural Ingredients', desc: 'Zero preservatives, zero artificial flavors.' },
    { icon: 'ShieldCheck', title: '100% Homemade', desc: 'Every batch is crafted in small quantities.' },
    { icon: 'Truck', title: 'Fast Delivery', desc: 'Carefully packed and delivered to your doorstep.' },
  ];

  const processSteps = homeSettings?.process || [
    { step: '01', title: 'Farm Sourced', desc: 'We partner directly with local farmers.', color: '#15803d' },
    { step: '02', title: 'Hand Crafted', desc: 'Each batch is mixed and spiced by hand.', color: '#800000' },
    { step: '03', title: 'Quality Checked', desc: 'Every jar passes a taste check.', color: '#b45309' },
    { step: '04', title: 'At Your Door', desc: 'Vacuum-sealed for maximum freshness.', color: '#7c3aed' },
  ];

  const displayCategories = categories
    .filter(c => c.is_featured)
    .map(cat => {
      const product = siteProducts.find(p => p.category_id === cat.id);
      return {
        name: cat.name,
        image: cat.image_path || product?.image || siteProducts[0]?.image || 'https://images.unsplash.com/photo-1514516348920-f319999a5e8f?q=80&w=400&auto=format&fit=crop',
      };
    })
    .slice(0, 4);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews({ site_id: 1, limit: 3 });
        const data = Array.isArray(res) ? res : (res?.data || []);
        setReviews(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load reviews', err);
      }
    };
    fetchReviews();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterLoading(true);
    try {
      await submitContact({ name: 'Newsletter', email, message: 'Newsletter subscription request.', site_id: 1 });
      toast.success('Subscribed! We\'ll keep you posted. 🎉');
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };



  return (
    <>
      <Helmet>
        <title>Home | Acharu Authentic Homemade Products</title>
        <meta name="description" content="Discover authentic homemade mango pickles and other traditional Bangladeshi delicacies at Acharu." />
      </Helmet>
      <div className="bg-cream min-h-screen">
      <Hero />

      {/* Why Us */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-maroon mb-3">Why Acharu</p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-800">The Acharu Difference</h2>
            <div className="w-20 h-1 bg-maroon mx-auto rounded-full mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => {
              const Icon = IconMap[item.icon] || Leaf;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group flex gap-5 p-8 rounded-3xl bg-cream border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-12 h-12 rounded-2xl bg-maroon/10 flex items-center justify-center shrink-0 group-hover:bg-maroon/20 transition-colors">
                    <Icon size={22} className="text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {displayCategories.length > 0 && (
        <section className="py-8 bg-white border-y border-slate-50">
          <div className="container-custom">
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Shop by Category</span>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {displayCategories.map((cat, index) => {
                  const Icon = cat.name.toLowerCase().includes('spicy') || cat.name.toLowerCase().includes('chili') ? Flame : 
                               cat.name.toLowerCase().includes('sweet') || cat.name.toLowerCase().includes('mango') ? Heart : 
                               cat.name.toLowerCase().includes('premium') || cat.name.toLowerCase().includes('special') ? Award : Leaf;
                  
                  return (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/shop?category=${cat.name}`}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cream border border-slate-100 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm hover:shadow-xl">
                          <Icon size={12} className="md:size-12" />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter group-hover:text-maroon transition-colors">{cat.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Real Reviews */}
      <section className="py-24 bg-cream">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-maroon mb-3">Customer Stories</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-800">What They're Saying</h2>
            </div>
            <Link to="/reviews" className="text-maroon font-bold flex items-center gap-2 hover:gap-3 transition-all">
              All Reviews <ArrowRight size={20} />
            </Link>
          </div>
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, i) => (
                <motion.div key={rev.id || i} className="bg-white p-10 rounded-[40px] shadow-soft border border-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6 text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-600 font-medium italic leading-relaxed mb-8">"{rev.comment || rev.review}"</p>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <span className="font-black text-slate-900 text-sm">{rev.customer_name || rev.name}</span>
                    {rev.product && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{rev.product.name}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
              <Star size={40} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No reviews yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;

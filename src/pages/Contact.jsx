import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Facebook, Instagram, Twitter } from '../components/BrandIcons';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectContact } from '../store/settingsSlice';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const Contact = () => {
  const contact = useSelector(selectContact);
  
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: contact.support_phone || contact.phone || "+880 1877-710124",
      description: "Direct assistance for orders",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: contact.store_email || contact.email || "acharuandtajashutki@gmail.com",
      description: "For formal inquiries & bulk orders",
      color: "text-maroon",
      bg: "bg-maroon/5"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: contact.address || "House 123, Road 4, Cox's Bazar",
      description: "Our main production facility",
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    {
      icon: <Clock size={24} />,
      title: "Service Hours",
      details: "Sat - Thu: 9AM - 8PM",
      description: "Friday: Closed",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] bg-maroon overflow-hidden flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[120%] bg-white/5 skew-x-[-15deg] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[80%] bg-maroon-dark/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-cream/90 mb-8">
              <span className="w-2 h-2 rounded-full bg-cream animate-pulse" />
              Customer Support
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight tracking-tighter mb-6">
              How can we <span className="text-cream/40 underline decoration-cream/20 underline-offset-8">help?</span>
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              We're dedicated to providing you with the finest artisanal pickles and 
              exceptional service. Choose your preferred way to connect.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom -mt-20 pb-32 relative z-20">
        {/* Top Row: Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-soft border border-slate-100 group hover:shadow-premium hover:-translate-y-2 transition-all duration-500"
            >
              <div className={clsx(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                info.bg, info.color
              )}>
                {info.icon}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{info.title}</h3>
              <p className="text-base font-black text-slate-800 leading-tight mb-2">{info.details}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{info.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content: Informative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* WhatsApp Direct Support */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-emerald-600 rounded-[48px] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 mb-8">
                <MessageCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Priority Support</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black leading-[1.1] tracking-tight mb-6">
                Chat with us on <br />
                <span className="text-emerald-200">WhatsApp.</span>
              </h2>
              
              <p className="text-emerald-50/70 text-lg font-medium mb-10 max-w-md leading-relaxed">
                The fastest way to get help with your order, shipping, or product details. 
                Our team is active and ready to assist you.
              </p>

              <a 
                href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '') || '8801877710124'}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 bg-white text-emerald-700 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-50 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-500"
              >
                Launch WhatsApp
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>

          {/* Help Center / FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-[48px] p-10 md:p-16 shadow-premium border border-slate-100"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 mb-8">
              <HelpCircle size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Self-Service</span>
            </div>

            <h2 className="text-4xl font-display font-black text-slate-800 tracking-tight mb-10">
              Help Center
            </h2>

            <div className="space-y-4">
              {[
                { title: "Track Your Order", desc: "Check current shipping status", icon: <Truck />, link: "/track" },
                { title: "Return Policy", desc: "How to return items", icon: <ShieldCheck />, link: "/terms" },
                { title: "General FAQ", desc: "Common questions answered", icon: <HelpCircle />, link: "/faq" },
              ].map((item, i) => (
                <Link 
                  to={item.link} 
                  key={i}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-maroon group-hover:scale-110 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm leading-none mb-1">{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-2 transition-all duration-500" />
                </Link>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 text-center">Follow our journey</p>
              <div className="flex justify-center gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-500">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

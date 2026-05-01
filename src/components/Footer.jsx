import { Link } from 'react-router-dom';
import { Instagram, Twitter, Share2, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectContact } from '../store/settingsSlice';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const contact = useSelector(selectContact);

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-maroon/5 rounded-full blur-[150px] -z-0" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          
          {/* Brand Identity */}
          <div className="space-y-10">
            <Link to="/" className="group inline-flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-maroon text-2xl font-black italic shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                A
              </div>
              <span className="text-3xl font-display font-black text-white tracking-tighter">
                Acharu<span className="text-maroon">.</span>
              </span>
            </Link>
            <p className="text-lg leading-relaxed text-slate-400 max-w-sm font-medium">
              Preserving the authentic heritage of Bangladeshi pickles through artisanal craftsmanship and time-honored recipes.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-maroon hover:border-maroon transition-all duration-500">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Curations */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">The Pantry</h4>
            <ul className="space-y-6">
              {['All Collections', 'Spicy Heritage', 'Sweet & Tangy', 'Seasonal Batches'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-0 h-px bg-maroon group-hover:w-4 transition-all duration-500" />
                    <span className="font-bold tracking-tight">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">Concierge</h4>
            <ul className="space-y-6 font-bold tracking-tight">
              <li><Link to="/track" className="hover:text-white transition-colors flex items-center gap-2">Track Heritage <ArrowUpRight size={14} className="opacity-40" /></Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Pantry FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connection Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-2xl">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">Get in Touch</h4>
            <ul className="space-y-8 font-medium">
              <li className="flex gap-4">
                <MapPin className="text-maroon shrink-0" size={20} />
                <span className="text-sm leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-maroon shrink-0" size={20} />
                <span className="text-sm">{contact.phone}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-maroon shrink-0" size={20} />
                <span className="text-sm">{contact.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Final Credits */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <p>© {currentYear} Acharu Artisanal</p>
              <div className="w-px h-4 bg-white/10" />
              <p>Handcrafted with Passion</p>
           </div>
           
           <div className="flex items-center gap-4 text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-widest">Heritage of</span>
              <span className="px-4 py-1.5 bg-white/5 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10">Bangladesh</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

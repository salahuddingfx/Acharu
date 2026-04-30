import { Link } from 'react-router-dom';
import { MessageSquare, Camera, Send, Mail, MapPin, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectContact } from '../store/settingsSlice';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const contact = useSelector(selectContact);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link to="/" className="text-3xl font-display font-bold text-cream flex items-center gap-2">
              <span className="bg-maroon text-cream w-10 h-10 flex items-center justify-center rounded-lg italic">A</span>
              Acharu
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Bringing the authentic taste of Bangladeshi pickles to your doorstep. Handcrafted with love and tradition.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-maroon transition-colors text-white">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-maroon transition-colors text-white">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-maroon transition-colors text-white">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Shop Now</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="hover:text-maroon transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Spicy" className="hover:text-maroon transition-colors">Spicy Achar</Link></li>
              <li><Link to="/shop?category=Sweet" className="hover:text-maroon transition-colors">Sweet Achar</Link></li>
              <li><Link to="/track" className="hover:text-maroon transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="hover:text-maroon transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-maroon transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-maroon transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-maroon transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-6 text-lg">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-maroon shrink-0" size={20} />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-maroon shrink-0" size={20} />
                <span>{contact.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-maroon shrink-0" size={20} />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Acharu. All rights reserved.</p>
          <div className="flex gap-6">
            <p>Made with ❤️ in Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

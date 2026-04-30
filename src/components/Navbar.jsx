import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Phone, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';
import { clsx } from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Order', path: '/track' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'glass-navbar py-4' : 'bg-transparent py-6'
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-maroon flex items-center gap-2">
            <span className="bg-maroon text-cream w-8 h-8 flex items-center justify-center rounded-lg italic">A</span>
            Acharu
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'font-medium transition-colors hover:text-maroon',
                  location.pathname === link.path ? 'text-maroon' : 'text-slate-600'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <div className={clsx(
              "relative items-center gap-2 transition-all duration-300 hidden sm:flex",
              isSearchOpen ? "w-64" : "w-10"
            )}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-slate-600 hover:text-maroon transition-colors shrink-0"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
              
              {isSearchOpen && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  className="flex-grow animate-in fade-in slide-in-from-right-4 duration-300"
                >
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Search pickles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon"
                  />
                </form>
              )}
            </div>
            
            {/* Mobile Search Icon (Just navigate) */}
            <button 
              className="sm:hidden text-slate-600 hover:text-maroon"
              onClick={() => navigate('/shop')}
            >
              <Search size={20} />
            </button>
            <Link to="/cart" className="relative group">
              <ShoppingCart size={24} className="text-slate-600 group-hover:text-maroon transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-maroon text-cream text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-slate-100 shadow-lg py-5 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'text-lg font-medium py-2',
                    location.pathname === link.path ? 'text-maroon' : 'text-slate-600'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3 text-maroon font-bold">
                <Phone size={18} />
                <span>+880 1234-567890</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

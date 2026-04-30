import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectHeroSlides, 
  selectContact, 
  selectDeliverySettings,
  updateHero,
  updateContact,
  updateDelivery
} from '../src/store/settingsSlice';
import { 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Phone, 
  Mail, 
  MapPin, 
  Truck,
  Settings,
  Layout as LayoutIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const dispatch = useDispatch();
  const currentHero = useSelector(selectHeroSlides);
  const currentContact = useSelector(selectContact);
  const currentDelivery = useSelector(selectDeliverySettings);

  const [hero, setHero] = useState(currentHero);
  const [contact, setContact] = useState(currentContact);
  const [delivery, setDelivery] = useState(currentDelivery);
  const [activeTab, setActiveTab] = useState('hero');

  const handleSaveHero = () => {
    dispatch(updateHero(hero));
    alert('Hero settings saved!');
  };

  const handleSaveContact = () => {
    dispatch(updateContact(contact));
    alert('Contact settings saved!');
  };

  const handleSaveDelivery = () => {
    dispatch(updateDelivery(delivery));
    alert('Delivery settings saved!');
  };

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: "New Slide Title",
      subtitle: "New slide subtitle goes here",
      image: "https://images.unsplash.com/photo-1589135234398-386052733907?q=80&w=1600&auto=format&fit=crop",
      productId: "1",
      price: 250,
      badge: "New Arrival"
    };
    setHero([...hero, newSlide]);
  };

  const removeSlide = (id) => {
    setHero(hero.filter(s => s.id !== id));
  };

  const updateSlide = (id, field, value) => {
    setHero(hero.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="bg-cream min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-maroon text-cream rounded-2xl flex items-center justify-center shadow-lg">
            <Settings size={24} />
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-800">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'hero' ? 'bg-maroon text-cream shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutIcon size={20} />
              Hero Slider
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'contact' ? 'bg-maroon text-cream shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              <Phone size={20} />
              Contact Info
            </button>
            <button 
              onClick={() => setActiveTab('delivery')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'delivery' ? 'bg-maroon text-cream shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              <Truck size={20} />
              Delivery Fees
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Manage Hero Slides</h2>
                  <button onClick={addSlide} className="bg-transparent border-2 border-maroon/20 text-maroon px-4 py-2 rounded-full font-bold transition-all hover:bg-maroon hover:text-cream text-sm flex items-center gap-2">
                    <Plus size={16} />
                    Add Slide
                  </button>
                </div>

                {hero.map((slide, index) => (
                  <motion.div 
                    layout
                    key={slide.id}
                    className="bg-white p-8 rounded-3xl shadow-soft border border-black/[0.03] space-y-6"
                  >
                    <div className="flex justify-between items-start">
                      <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Slide #{index + 1}
                      </span>
                      <button onClick={() => removeSlide(slide.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Title</label>
                        <input 
                          type="text" 
                          value={slide.title}
                          onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Badge Text</label>
                        <input 
                          type="text" 
                          value={slide.badge}
                          onChange={(e) => updateSlide(slide.id, 'badge', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subtitle</label>
                        <textarea 
                          value={slide.subtitle}
                          onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                          rows="2"
                          className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-medium resize-none"
                        ></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Image URL</label>
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <input 
                            type="text" 
                            value={slide.image}
                            onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                            className="flex-grow px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Product ID</label>
                        <input 
                          type="text" 
                          value={slide.productId}
                          onChange={(e) => updateSlide(slide.id, 'productId', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button onClick={handleSaveHero} className="bg-maroon text-cream px-8 py-5 rounded-full font-bold transition-all hover:bg-maroon-dark hover:shadow-xl hover:shadow-maroon/20 w-full flex items-center justify-center gap-2 tracking-wide shadow-xl">
                  <Save size={20} />
                  Save Changes to Slider
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">Business Contact Settings</h2>
                <div className="bg-white p-10 rounded-[40px] shadow-soft border border-black/[0.03] space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-maroon">
                      <Phone size={18} />
                      <label className="text-xs font-bold uppercase tracking-widest">Phone Number</label>
                    </div>
                    <input 
                      type="text" 
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-bold text-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-maroon">
                      <Mail size={18} />
                      <label className="text-xs font-bold uppercase tracking-widest">Support Email</label>
                    </div>
                    <input 
                      type="email" 
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-bold text-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-maroon">
                      <MapPin size={18} />
                      <label className="text-xs font-bold uppercase tracking-widest">Store Address</label>
                    </div>
                    <textarea 
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      rows="3"
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-maroon/10 focus:border-maroon/20 focus:bg-white outline-none transition-all font-bold text-lg resize-none"
                    ></textarea>
                  </div>

                  <button onClick={handleSaveContact} className="bg-maroon text-cream px-8 py-5 rounded-full font-bold transition-all hover:bg-maroon-dark hover:shadow-xl hover:shadow-maroon/20 w-full flex items-center justify-center gap-2 tracking-wide shadow-xl">
                    <Save size={20} />
                    Save Contact Information
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">Delivery Rate Configuration</h2>
                <div className="bg-white p-10 rounded-[40px] shadow-soft border border-black/[0.03] space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                        <MapPin size={24} />
                      </div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Inside Cox's Bazar</label>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-slate-400">৳</span>
                        <input 
                          type="number" 
                          value={delivery.insideCity}
                          onChange={(e) => setDelivery({ ...delivery, insideCity: parseInt(e.target.value) })}
                          className="w-full text-4xl font-display font-bold outline-none border-b-2 border-transparent focus:border-maroon transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-2">
                        <Globe size={24} />
                      </div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Outside Location</label>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-slate-400">৳</span>
                        <input 
                          type="number" 
                          value={delivery.outsideCity}
                          onChange={(e) => setDelivery({ ...delivery, outsideCity: parseInt(e.target.value) })}
                          className="w-full text-4xl font-display font-bold outline-none border-b-2 border-transparent focus:border-maroon transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-maroon/5 text-maroon flex items-center justify-center">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Weight Surcharge</h4>
                        <p className="text-xs text-slate-400">Applied for every 0.5kg over 1kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-2xl font-bold text-slate-400">৳</span>
                      <input 
                        type="number" 
                        value={delivery.weightCharge}
                        onChange={(e) => setDelivery({ ...delivery, weightCharge: parseInt(e.target.value) })}
                        className="text-5xl font-display font-bold outline-none border-b-2 border-transparent focus:border-maroon transition-all max-w-[150px]"
                      />
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">per 0.5kg</span>
                    </div>
                  </div>

                  <button onClick={handleSaveDelivery} className="bg-maroon text-cream px-8 py-5 rounded-full font-bold transition-all hover:bg-maroon-dark hover:shadow-xl hover:shadow-maroon/20 w-full flex items-center justify-center gap-2 tracking-wide shadow-xl">
                    <Save size={20} />
                    Update Delivery Logic
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

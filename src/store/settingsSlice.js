import { createSlice } from '@reduxjs/toolkit';

const initialSettings = {
  hero: [
    {
      id: 1,
      title: "Authentic Homemade Mango Achar",
      subtitle: "Made with hand-picked green mangoes and pure mustard oil. A taste of tradition in every bite.",
      image: "https://images.unsplash.com/photo-1589135234398-386052733907?q=80&w=1600&auto=format&fit=crop",
      productId: "1",
      price: 250,
      badge: "Handcrafted with Love"
    },
    {
      id: 2,
      title: "Spicy Naga Morich Bliss",
      subtitle: "For those who crave the heat. Experience the legendary Naga chili in a perfectly balanced pickle.",
      image: "https://images.unsplash.com/photo-1597131628347-c769fc631754?q=80&w=1600&auto=format&fit=crop",
      productId: "5",
      price: 450,
      badge: "Spicy Perfection"
    }
  ],
  contact: {
    phone: "+880 1234-567890",
    email: "hello@acharu.com",
    address: "House 123, Road 4, Cox's Bazar, Bangladesh"
  },
  delivery: {
    insideCity: 70,
    outsideCity: 120,
    weightCharge: 20
  }
};

const loadSettings = () => {
  const saved = localStorage.getItem('acharu-settings');
  return saved ? JSON.parse(saved) : initialSettings;
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings(),
  reducers: {
    updateHero: (state, action) => {
      state.hero = action.payload;
      localStorage.setItem('acharu-settings', JSON.stringify(state));
    },
    updateContact: (state, action) => {
      state.contact = { ...state.contact, ...action.payload };
      localStorage.setItem('acharu-settings', JSON.stringify(state));
    },
    updateDelivery: (state, action) => {
      state.delivery = { ...state.delivery, ...action.payload };
      localStorage.setItem('acharu-settings', JSON.stringify(state));
    }
  }
});

export const { updateHero, updateContact, updateDelivery } = settingsSlice.actions;

export const selectHeroSlides = (state) => state.settings.hero;
export const selectContact = (state) => state.settings.contact;
export const selectDeliverySettings = (state) => state.settings.delivery;

export default settingsSlice.reducer;

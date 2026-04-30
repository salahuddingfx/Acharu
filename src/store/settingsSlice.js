import { createSlice } from '@reduxjs/toolkit';

const defaultSiteSettings = {
  hero: [
    {
      id: 1,
      title: "Authentic Homemade Mango Achar",
      subtitle: "Made with hand-picked green mangoes and pure mustard oil.",
      image: "https://images.unsplash.com/photo-1589135234398-386052733907?q=80&w=1600&auto=format&fit=crop",
      productId: "1",
      price: 250,
      badge: "Handcrafted with Love"
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

const initialState = {
  sites: {
    site_1: { ...defaultSiteSettings, name: "Acharu Site A" },
    site_2: { ...defaultSiteSettings, name: "Acharu Site B" }
  },
  currentSiteId: 'site_1'
};

const loadSettings = () => {
  const saved = localStorage.getItem('acharu-multi-settings');
  return saved ? JSON.parse(saved) : initialState;
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings(),
  reducers: {
    setCurrentSite: (state, action) => {
      state.currentSiteId = action.payload;
    },
    updateSiteSettings: (state, action) => {
      const { siteId, settings } = action.payload;
      state.sites[siteId] = { ...state.sites[siteId], ...settings };
      localStorage.setItem('acharu-multi-settings', JSON.stringify(state));
    }
  }
});

export const { setCurrentSite, updateSiteSettings } = settingsSlice.actions;

export const selectCurrentSiteId = (state) => state.settings.currentSiteId;
export const selectCurrentSiteSettings = (state) => 
  state.settings.sites[state.settings.currentSiteId];
export const selectAllSites = (state) => state.settings.sites;

// Legacy selectors for compatibility (pulling from current site)
export const selectHeroSlides = (state) => state.settings.sites[state.settings.currentSiteId].hero;
export const selectContact = (state) => state.settings.sites[state.settings.currentSiteId].contact;
export const selectDeliverySettings = (state) => state.settings.sites[state.settings.currentSiteId].delivery;

export default settingsSlice.reducer;

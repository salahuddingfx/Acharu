import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Simply browse our products, add your favorites to the cart, and proceed to checkout. You can checkout as a guest or create an account for faster future ordering."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Cash on Delivery (COD), Mobile Banking (bKash, Nagad), and all major Debit/Credit cards through our secure payment gateway."
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery within Dhaka takes 48-72 hours. Deliveries outside Dhaka typically take 3-5 business days."
    },
    {
      q: "Is there any preservative in your pickles?",
      a: "No! We use traditional preservation methods like organic mustard oil, sun-drying, and natural vinegar. No artificial preservatives are ever added."
    },
    {
      q: "How should I store the pickles?",
      a: "Keep them in a cool, dry place. Always use a clean, dry spoon to take out the pickle. Periodic exposure to sunlight helps maintain freshness for longer."
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 24 hours if the product is damaged, incorrect, or expired. Food items cannot be returned due to 'Change of Mind'."
    },
    {
      q: "Do I really need an unboxing video?",
      a: "Yes! A continuous, unedited unboxing video is mandatory for any claim regarding missing or damaged items. This ensures transparency for both parties."
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can only be cancelled before they are handed over to the courier. Once dispatched, the order cannot be cancelled."
    },
    {
      q: "Do you ship outside Bangladesh?",
      a: "Currently, we only ship within Bangladesh. We are working on international shipping options for the future."
    },
    {
      q: "What if I miss my delivery?",
      a: "Our courier partners will attempt delivery twice. If both attempts fail, the order will be returned to us, and additional charges may apply for re-delivery."
    },
    {
      q: "Are the jars glass or plastic?",
      a: "We use high-quality, food-grade jars designed to preserve the taste and quality of our handcrafted products safely."
    },
    {
      q: "Can I track my order?",
      a: "Yes! Once your order is dispatched, you will receive a tracking ID via SMS/Email which you can use on our 'Order Tracking' page."
    },
    {
      q: "How do I apply a discount code?",
      a: "Enter your code in the 'Coupon Code' field on the checkout page and click apply. The discount will be automatically deducted from your total."
    },
    {
      q: "Is my personal data safe?",
      a: "Absolutely. We use industry-standard encryption and never share your data with third parties except for logistics and payment processing."
    },
    {
      q: "How can I contact customer support?",
      a: "You can reach us through the 'Contact' page, call our hotline, or message us directly on our Facebook or Instagram pages."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="container-custom max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center text-maroon mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon/60 mb-4 block">Information Hub</span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter">
            Frequently Asked <span className="text-maroon">Questions</span>
          </h1>
          <div className="w-20 h-1 bg-maroon mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass-premium rounded-3xl border border-white/50 overflow-hidden transition-all duration-300 ${activeIndex === i ? 'shadow-xl' : 'hover:shadow-md'}`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full p-6 text-left flex justify-between items-center group"
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${activeIndex === i ? 'text-maroon' : 'text-slate-800 group-hover:text-maroon'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === i ? 'bg-maroon text-white rotate-180' : 'bg-maroon/10 text-maroon'}`}>
                  {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium text-sm">
                      <div className="pt-2 border-t border-maroon/5">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black mb-2">Still have questions?</h3>
              <p className="opacity-60 text-sm">Our support team is ready to help you 24/7.</p>
            </div>
            <button className="bg-maroon text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-maroon/20">
              <MessageSquare size={20} />
              Send a Message
            </button>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-maroon/20 rounded-full blur-[80px] group-hover:bg-maroon/30 transition-all duration-700" />
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

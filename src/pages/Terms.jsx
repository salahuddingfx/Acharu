import React from 'react';
import { ShieldCheck, Truck, CreditCard, RefreshCw, Scale, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Terms = () => {
  const initData = useSelector((state) => state.settings?.initData);
  const siteName = initData?.site?.name || 'Acharu';
  const sections = [
    {
      id: 1,
      title: "Binding Agreement",
      icon: Scale,
      notes: [
        `By accessing this site, you enter into a legally binding contract with ${siteName}. If you disagree, you must cease use immediately.`,
        "We reserve the absolute right to modify, suspend, or terminate any part of this service without prior notice.",
        "Your continued presence on this platform constitutes an irrevocable acceptance of all current and future terms."
      ]
    },
    {
      id: 2,
      title: "Account Integrity",
      icon: UserCheck,
      notes: [
        "You are solely responsible for all activities occurring under your account, including unauthorized access by third parties.",
        "Any suspicion of account compromise must be reported to our security team within 1 hour.",
        "Creating multiple accounts to exploit promotional offers will result in a permanent ban and order cancellation."
      ]
    },
    {
      id: 3,
      title: "Pricing & Technical Errors",
      icon: ShieldCheck,
      notes: [
        "In the event of a system glitch or pricing error, we reserve the right to cancel any order, even after payment confirmation.",
        "Refunds for such cancellations will be processed, but no further compensation or 'price matching' will be provided.",
        "All promotional codes must be applied at checkout; retroactive application is technically impossible and will not be entertained."
      ]
    },
    {
      id: 4,
      title: "Product Disclaimer (Handcrafted)",
      icon: ShieldCheck,
      notes: [
        "Our products are handcrafted in small batches. Variations in color, texture, and spice levels are a hallmark of authenticity.",
        "Images shown are for representation; the actual product may differ slightly due to the seasonal nature of ingredients.",
        "We do not guarantee that the product will meet your specific 'memory' of a taste or a family recipe."
      ]
    },
    {
      id: 5,
      title: "Payment & Billing Finality",
      icon: CreditCard,
      notes: [
        "Once a transaction is initiated, it is considered final. Digital payments are processed through secure third-party gateways.",
        `${siteName} does not store your card details. Any payment failure must be resolved with your respective bank.`,
        "For Cash on Delivery (COD), the full amount must be paid to the courier before the package seal is broken."
      ]
    },
    {
      id: 6,
      title: "Shipping & Courier Limitations",
      icon: Truck,
      notes: [
        "Delivery timelines (48-72h Dhaka, 3-5 days outside) are estimates. We do not guarantee 'fixed time' deliveries.",
        "Our liability ends once the package is handed to the courier. We are not responsible for delays caused by roadblocks or strikes.",
        "Unsuccessful delivery attempts due to customer unavailability will result in additional re-shipping charges."
      ]
    },
    {
      id: 7,
      title: "Mandatory Unboxing Video",
      icon: RefreshCw,
      notes: [
        "To claim any damage or missing item, a CLEAR, UNEDITED UNBOXING VIDEO is mandatory from start to finish.",
        "The video must show the shipping label and the intact seal before opening the package.",
        "Claims without a valid unboxing video will be REJECTED instantly, regardless of the severity of the issue."
      ]
    },
    {
      id: 8,
      title: "Strict Return/Seal Policy",
      icon: ShieldCheck,
      notes: [
        "Food products are non-returnable once the outer safety seal or inner jar seal is broken or tampered with.",
        "Returns for 'Change of Mind' or 'I don't need it anymore' are strictly prohibited for all perishable items.",
        "Approved returns must be dispatched back to our warehouse within 24 hours of approval at the customer's expense."
      ]
    },
    {
      id: 9,
      title: "Taste Subjectivity Clause",
      icon: ShieldCheck,
      notes: [
        "Taste is 100% subjective. We do NOT provide refunds or exchanges if you simply 'did not like' the flavor.",
        "Our recipes are standardized; we cannot customize individual jars for specific spice or salt tolerances.",
        "By purchasing, you acknowledge that you are trying a new flavor at your own risk of personal preference."
      ]
    },
    {
      id: 10,
      title: "Health & Allergy Warning",
      icon: ShieldCheck,
      notes: [
        "Customers must read the full ingredient list. We use mustard oil, nuts, and spices that may be allergens.",
        `${siteName} is not liable for any allergic reactions, medical costs, or discomfort resulting from product consumption.`,
        "Consult a physician before consuming our products if you have specific dietary restrictions or sensitivities."
      ]
    },
    {
      id: 11,
      title: "Zero Tolerance: Harassment",
      icon: UserCheck,
      notes: [
        "Any abusive language, threats, or harassment toward our support or delivery staff will result in immediate termination of service.",
        "We reserve the right to report abusive customers to relevant authorities and blacklist them from future purchases.",
        "Communication with our team is recorded for quality control and legal safety."
      ]
    },
    {
      id: 12,
      title: "Anti-Fraud & Legal Action",
      icon: Scale,
      notes: [
        "Any attempt to stage damage or provide false evidence for a refund is considered fraud under the laws of Bangladesh.",
        "We monitor IP addresses and user behavior. Fraudulent claims will be met with strict legal action and public blacklisting.",
        `${siteName} reserves the right to recover legal costs from customers found guilty of making fraudulent claims.`
      ]
    },
    {
      id: 13,
      title: "Order Refusal Rights",
      icon: ShieldCheck,
      notes: [
        "We reserve the right to refuse any order without providing a reason, especially if a history of high RTO is detected.",
        "Bulk orders suspected of unauthorized resale will be cancelled and the account flagged.",
        "Orders from suspicious or high-risk locations may be subjected to mandatory 100% advance payment."
      ]
    },
    {
      id: 14,
      title: "Intellectual Property Rights",
      icon: Scale,
      notes: [
        `All text, design, graphics, and product names are the exclusive property of ${siteName} and protected by copyright laws.`,
        "Unauthorized use of our branding for your own commercial gain will result in a lawsuit for damages.",
        `User-submitted reviews become the property of ${siteName} for marketing purposes unless requested otherwise.`
      ]
    },
    {
      id: 15,
      title: "Governing Law & Disputes",
      icon: Scale,
      notes: [
        "All transactions and disputes are governed solely by the laws of the People's Republic of Bangladesh.",
        "Any legal proceedings must be initiated in the courts of Dhaka, Bangladesh.",
        "Arbitration will be the first step for any dispute resolution before moving to a court of law."
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`Terms & Conditions | ${siteName}`}</title>
        <meta name="description" content={`Terms of service and legal agreement guidelines for using the ${siteName} platform.`} />
        <meta property="og:title" content={`Terms & Conditions | ${siteName}`} />
        <meta property="og:description" content={`Terms of service and legal agreement guidelines for using the ${siteName} platform.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon/60 mb-4 block">Legal Framework</span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter">
            Terms & <span className="text-maroon">Conditions</span>
          </h1>
          <div className="w-20 h-1 bg-maroon mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-premium p-8 rounded-[32px] border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-start relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-maroon flex items-center justify-center text-white shadow-lg shadow-maroon/20 shrink-0">
                  <section.icon size={24} />
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    {section.title}
                    <span className="w-2 h-2 bg-maroon rounded-full opacity-20" />
                  </h3>
                  
                  <ul className="space-y-3">
                    {section.notes.map((note, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed group-hover:text-slate-900 transition-colors">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maroon/40 shrink-0" />
                        <span className="font-medium">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Decorative Number */}
              <span className="absolute top-4 right-8 text-8xl font-black text-black/[0.03] pointer-events-none select-none italic">
                0{section.id}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-[32px] bg-slate-900 text-white text-center"
        >
          <p className="text-sm font-medium opacity-60 mb-2">Have specific questions?</p>
          <p className="text-lg font-bold">Contact our support team directly</p>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Terms;

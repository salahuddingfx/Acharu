import React from 'react';
import { ShieldCheck, Eye, Lock, Database, Globe, Share2, Bell, UserX, Info, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Data We Collect",
      icon: Database,
      content: [
        "Personal Identification: Name, email address, phone number, and physical shipping address.",
        "Transaction Details: History of products purchased, order values, and payment status (we do not store card numbers).",
        "Technical Metadata: IP address, browser type, device identifiers, and site interaction logs collected via cookies."
      ]
    },
    {
      id: 2,
      title: "Purpose of Processing",
      icon: Info,
      content: [
        "Order Fulfillment: To process your transactions and deliver products to your doorstep accurately.",
        "Customer Support: To respond to your inquiries and resolve any delivery or quality issues.",
        "Platform Optimization: To analyze user behavior and improve our website's performance and design."
      ]
    },
    {
      id: 3,
      title: "Information Security",
      icon: Lock,
      content: [
        "We implement industry-standard SSL/TLS encryption for all data transmitted between your browser and our servers.",
        "Access to personal data is strictly limited to authorized personnel who require it for operational purposes.",
        "While we strive for maximum security, no method of transmission over the internet is 100% immune to breaches."
      ]
    },
    {
      id: 4,
      title: "Third-Party Disclosure",
      icon: Share2,
      content: [
        "Logistic Partners: We share your name, address, and phone number with courier services for delivery.",
        "Payment Processors: Transaction data is shared with encrypted gateways like SSLCommerz for secure billing.",
        "Legal Mandates: We may disclose information if required by the laws of Bangladesh to comply with legal processes."
      ]
    },
    {
      id: 5,
      title: "Cookie Policy",
      icon: Globe,
      content: [
        "Our site uses cookies to remember your login session and items stored in your shopping cart.",
        "Third-party cookies may be used for analytics and targeted advertising based on your browsing interests.",
        "You can disable cookies in your browser settings, though some site features may become unavailable."
      ]
    },
    {
      id: 6,
      title: "User Rights",
      icon: Eye,
      content: [
        "You have the right to request access to the personal data we hold about you at any time.",
        "Users can request correction of inaccurate data or deletion of their account and associated personal info.",
        "Requests for data deletion will be processed within 7 working days, subject to legal retention requirements."
      ]
    },
    {
      id: 7,
      title: "Data Retention",
      icon: FileText,
      content: [
        "We retain your personal data only as long as necessary to fulfill the purposes for which it was collected.",
        "Order history is kept for financial auditing and warranty purposes for a minimum of 2 years.",
        "Marketing data is deleted promptly upon your request to unsubscribe from our communications."
      ]
    },
    {
      id: 8,
      title: "Children's Privacy",
      icon: UserX,
      content: [
        "Acharu is not intended for use by individuals under the age of 13.",
        "We do not knowingly collect personal information from children without parental consent.",
        "If we discover a minor has provided data, we will delete it immediately from our servers."
      ]
    },
    {
      id: 9,
      title: "Marketing Communications",
      icon: Bell,
      content: [
        "By creating an account, you opt-in to receive seasonal offers and order updates via email/SMS.",
        "You can opt-out of marketing messages at any time using the 'Unsubscribe' link in our emails.",
        "Essential service communications (order receipts/tracking) cannot be opted out of for security reasons."
      ]
    },
    {
      id: 10,
      title: "Policy Updates",
      icon: ShieldCheck,
      content: [
        "This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements.",
        "Significant changes will be notified via a prominent notice on our homepage or through direct email.",
        "Your continued use of the service after updates signifies your agreement to the new policy."
      ]
    }
  ];

  return (
    <div className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon/60 mb-4 block">Data Governance</span>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter">
            Privacy <span className="text-maroon">Policy</span>
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
                    {section.content.map((point, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed group-hover:text-slate-900 transition-colors">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maroon/40 shrink-0" />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <span className="absolute top-4 right-8 text-8xl font-black text-black/[0.03] pointer-events-none select-none italic">
                {section.id < 10 ? `0${section.id}` : section.id}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-[32px] bg-slate-900 text-white text-center"
        >
          <p className="text-sm font-medium opacity-60 mb-2">Concerned about your data?</p>
          <p className="text-lg font-bold">Email us at privacy@acharu.com</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

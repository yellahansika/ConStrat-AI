import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [hoveredNode, setHoveredNode] = useState(null);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format.';
    }

    if (!formData.message.trim()) tempErrors.message = 'Message cannot be empty.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Mock global nodes for styled vector SVG map
  const mapNodes = [
    { id: 'hq', name: 'Global HQ (Bengaluru, IN)', x: 68, y: 55, desc: 'Core Engineering & Agent Ops' },
    { id: 'west', name: 'US West Node (San Francisco, USA)', x: 18, y: 32, desc: 'Odysseus Orchestration Hub' },
    { id: 'east', name: 'EU Cluster (London, UK)', x: 48, y: 24, desc: 'Hindsight DB Vector Nodes' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0A2540] dark:bg-[#061424] light:bg-[#f8fafc] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors duration-300">
      
      {/* 1. HEADER */}
      <section className="relative py-16 px-6 overflow-hidden text-center bg-gradient-to-b from-[#06182c] to-[#0A2540] dark:from-[#030c16] dark:to-[#061424] light:from-slate-100 light:to-[#f8fafc] border-b border-slate-800 light:border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-[#00BFA6] font-bold max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* 2. FORM & MAP GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Form */}
        <div className="p-8 rounded-2xl bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-200 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-slate-100 light:text-slate-800">Send us a Message</h3>
            <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
              Reach out for enterprise consulting, product APIs, or support queries.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1.5">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border text-xs text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6] ${
                  errors.name ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                }`}
              />
              {errors.name && <span className="text-[10px] text-rose-400 mt-1 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border text-xs text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6] ${
                  errors.email ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                }`}
              />
              {errors.email && <span className="text-[10px] text-rose-400 mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1.5">Message Copy *</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your inquiry..."
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border text-xs text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6] resize-none ${
                  errors.message ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                }`}
              />
              {errors.message && <span className="text-[10px] text-rose-400 mt-1 block">{errors.message}</span>}
            </div>

            {/* Form submit status messages */}
            {status === 'success' && (
              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message delivered successfully! Our team will get back to you shortly.</span>
              </div>
            )}
            
            {status === 'error' && (
              <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                <span>Failed to process submission. Please check your network and try again.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="glow-btn-teal w-full py-3 rounded-lg bg-[#00BFA6] text-[#0A2540] font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Delivering...' : 'Submit Message'}
              <Send className="w-3.5 h-3.5" />
            </button>

          </form>
        </div>

        {/* Right Column: Styled premium vector SVG map */}
        <div className="p-8 rounded-2xl bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-200 flex flex-col justify-between h-[450px] shadow-xl relative overflow-hidden">
          <div>
            <h3 className="text-xl font-bold text-slate-100 light:text-slate-800">Our Network Coverage</h3>
            <p className="text-xs text-slate-400 light:text-slate-550 mt-1">
              Hover over node coordinates to explore our global offices and datacenter hubs.
            </p>
          </div>

          {/* SVG Map Layout */}
          <div className="relative flex-1 flex items-center justify-center mt-6">
            <svg className="w-full h-full max-h-[220px] opacity-70" viewBox="0 0 100 60" fill="none">
              {/* Mock continents outline */}
              <path d="M10,20 Q15,10 25,15 T40,12 T55,18 T70,10 T85,15 T90,25 T75,40 T60,50 T40,45 T20,38 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <path d="M20,40 Q25,35 32,45 T45,38 T55,48 T62,40 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              
              {/* Connector lines between nodes */}
              <line x1="18" y1="32" x2="48" y2="24" stroke="rgba(0,191,166,0.2)" strokeWidth="0.4" strokeDasharray="1 1" />
              <line x1="48" y1="24" x2="68" y2="55" stroke="rgba(0,191,166,0.2)" strokeWidth="0.4" strokeDasharray="1 1" />
              <line x1="68" y1="55" x2="18" y2="32" stroke="rgba(0,191,166,0.2)" strokeWidth="0.4" strokeDasharray="1 1" />

              {/* Points */}
              {mapNodes.map(node => (
                <g 
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle cx={node.x} cy={node.y} r="2.5" fill="#00BFA6" className="animate-ping opacity-60" />
                  <circle cx={node.x} cy={node.y} r="1.5" fill={hoveredNode?.id === node.id ? "#AEEA00" : "#00BFA6"} className="transition-colors" />
                </g>
              ))}
            </svg>

            {/* Custom Tooltip overlay */}
            <div className="absolute bottom-2 left-0 right-0 p-3 rounded-lg bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-250 text-xs text-center">
              {hoveredNode ? (
                <>
                  <span className="font-bold text-[#00BFA6] block">{hoveredNode.name}</span>
                  <span className="text-[10px] text-slate-350 light:text-slate-550 mt-0.5 block">{hoveredNode.desc}</span>
                </>
              ) : (
                <span className="text-slate-400 light:text-slate-500 italic">Hover map coordinate nodes for details</span>
              )}
            </div>
          </div>
        </div>

      </section>

      {/* 3. SUPPORT INFO CARDS */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <h3 className="text-2xl font-extrabold text-center text-slate-100 light:text-slate-900">Support Channels</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-250 flex items-start gap-4 glow-card">
            <div className="p-2.5 rounded-xl bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600">Email Queries</h4>
              <p className="text-sm font-bold text-slate-200 light:text-slate-800 mt-1">support@constratai.com</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Average reply time: 3 hours</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-250 flex items-start gap-4 glow-card">
            <div className="p-2.5 rounded-xl bg-[#AEEA00]/10 border border-[#AEEA00]/20 text-[#AEEA00] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600">Direct Telephone</h4>
              <p className="text-sm font-bold text-slate-200 light:text-slate-800 mt-1">+91-XXXXXXXXXX</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Weekdays 9 AM - 6 PM IST</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-250 flex items-start gap-4 glow-card">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[#818cf8] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600">Support Chat</h4>
              <p className="text-sm font-bold text-slate-200 light:text-slate-800 mt-1">Slack Integrations Console</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Available for Enterprise license tiers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL LINKS */}
      <section className="py-12 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f8fafc] text-center space-y-4 border-t border-slate-900 light:border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 light:text-slate-600">Stay Connected</h4>
        <div className="flex items-center justify-center gap-6">
          <a href="#" className="p-3.5 rounded-xl bg-[#0A2540]/40 hover:bg-slate-800 light:bg-white light:hover:bg-slate-100 hover:text-[#00BFA6] border border-slate-850 light:border-slate-250 text-slate-400 transition-all hover:scale-115">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-3.5 rounded-xl bg-[#0A2540]/40 hover:bg-slate-800 light:bg-white light:hover:bg-slate-100 hover:text-[#00BFA6] border border-slate-850 light:border-slate-250 text-slate-400 transition-all hover:scale-115">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-3.5 rounded-xl bg-[#0A2540]/40 hover:bg-slate-800 light:bg-white light:hover:bg-slate-100 hover:text-[#00BFA6] border border-slate-850 light:border-slate-250 text-slate-400 transition-all hover:scale-115">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-3.5 rounded-xl bg-[#0A2540]/40 hover:bg-slate-800 light:bg-white light:hover:bg-slate-100 hover:text-[#00BFA6] border border-slate-850 light:border-slate-250 text-slate-400 transition-all hover:scale-115">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] dark:bg-[#051424] border-t border-slate-800/80 py-12 px-6 text-slate-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Pitch */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00BFA6] to-[#AEEA00] flex items-center justify-center font-bold text-[#0A2540]">
              C
            </div>
            <span className="font-extrabold text-sm uppercase tracking-wider text-slate-100 light:text-slate-850">
              ConStrat AI
            </span>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-500 max-w-sm leading-relaxed">
            Eliminating AI memory loss, preventing redundancy, and building topic authority across all channels with Hindsight vector memory and the Odysseus Orchestrator.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="https://github.com/yellahansika" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 light:bg-slate-200/50 light:hover:bg-slate-200 hover:text-[#00BFA6] border border-slate-800/80 light:border-slate-300 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/hansikayella" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 light:bg-slate-200/50 light:hover:bg-slate-200 hover:text-[#00BFA6] border border-slate-800/80 light:border-slate-300 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:yellahansika123@gmail.com" className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 light:bg-slate-200/50 light:hover:bg-slate-200 hover:text-[#00BFA6] border border-slate-800/80 light:border-slate-300 transition-colors text-xs font-semibold">
              Email Me
            </a>
            <a href="https://github.com/yellahansika" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 light:bg-slate-200/50 light:hover:bg-slate-200 hover:text-[#00BFA6] border border-slate-800/80 light:border-slate-300 transition-colors">
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 light:text-slate-800 mb-4">
            Navigation
          </h4>
          <div className="flex flex-col gap-2.5 text-xs">
            <NavLink to="/" className="hover:text-[#00BFA6] transition-colors">Home</NavLink>
            <NavLink to="/about" className="hover:text-[#00BFA6] transition-colors">About</NavLink>
            <NavLink to="/features" className="hover:text-[#00BFA6] transition-colors">Features</NavLink>
            <NavLink to="/dashboard" className="hover:text-[#00BFA6] transition-colors">Dashboard</NavLink>
            <NavLink to="/content" className="hover:text-[#00BFA6] transition-colors">My Content</NavLink>
            <NavLink to="/blog" className="hover:text-[#00BFA6] transition-colors">My Blog</NavLink>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 light:text-slate-800 mb-4">
            Product
          </h4>
          <div className="flex flex-col gap-2.5 text-xs">
            <NavLink to="/resources" className="hover:text-[#00BFA6] transition-colors">Resources & API</NavLink>
            <NavLink to="/contact" className="hover:text-[#00BFA6] transition-colors">Contact Support</NavLink>
            <span className="flex items-center gap-1 text-[#AEEA00] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              v1.0.0 Stable
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/60 light:border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 light:text-slate-400 gap-4">
        <span>© {new Date().getFullYear()} ConStrat AI Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/features', label: 'Features' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/content', label: 'My Content' },
    { to: '/blog', label: 'My Blog' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 h-16 w-full flex items-center justify-between px-6 bg-[#0A2540] dark:bg-[#06182c] light:bg-white border-b border-slate-800/80 light:border-slate-200 text-slate-100 dark:text-slate-100 light:text-slate-800 transition-colors duration-300 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 light:bg-opacity-95">
      {/* Brand logo & active indicator */}
      <div className="flex items-center gap-3">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#AEEA00] flex items-center justify-center font-extrabold text-[#0A2540] shadow-md group-hover:scale-105 transition-all">
            C
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-white to-slate-300 light:from-slate-800 light:to-slate-650 bg-clip-text text-transparent">
              ConStrat AI
            </span>
            <span className="text-[9px] ml-2 font-bold px-1.5 py-0.5 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] uppercase tracking-wider">
              Agent
            </span>
          </div>
        </NavLink>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-205 ${
                isActive
                  ? 'text-[#00BFA6] bg-[#00BFA6]/10 border border-[#00BFA6]/20 shadow-[0_0_10px_rgba(0,191,166,0.15)]'
                  : 'text-slate-400 hover:text-slate-100 light:text-slate-650 light:hover:text-slate-900 hover:bg-slate-800/40 light:hover:bg-slate-100 border border-transparent'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Controls (Theme + Mobile Hamburger) */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/60 light:bg-slate-100 p-1.5 rounded-xl border border-slate-800 light:border-slate-300 text-[10px] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#00BFA6] animate-pulse"></span>
          <span className="text-slate-400 light:text-slate-500">Hindsight Memory Connected</span>
        </div>

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 light:bg-slate-100 light:hover:bg-slate-200 transition-colors border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-700"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-550" />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 light:bg-slate-100 light:hover:bg-slate-200 border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-700"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0A2540] dark:bg-[#06182c] light:bg-white border-b border-slate-800 light:border-slate-200 flex flex-col p-4 space-y-2 lg:hidden shadow-2xl animate-fade-in text-xs font-bold uppercase tracking-wider z-50">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl block transition-all ${
                  isActive
                    ? 'text-[#00BFA6] bg-[#00BFA6]/10 border border-[#00BFA6]/20'
                    : 'text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900 hover:bg-slate-800/60 light:hover:bg-slate-150'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex sm:hidden items-center justify-center gap-1.5 p-2 bg-slate-950/60 light:bg-slate-100 rounded-xl border border-slate-800 light:border-slate-300 text-[10px] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#00BFA6] animate-pulse"></span>
            <span className="text-slate-400 light:text-slate-500">Hindsight Memory Connected</span>
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Layers, LayoutDashboard, FileText, BookOpen, Database, Mail } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/features', label: 'Features', icon: Layers },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/content', label: 'My Content', icon: FileText },
  { to: '/blog', label: 'My Blog', icon: BookOpen },
  { to: '/resources', label: 'Resources', icon: Database },
  { to: '/contact', label: 'Contact', icon: Mail },
];

export default function WorkspaceSidebar() {
  return (
    <aside className="hidden xl:flex xl:flex-col xl:gap-4 xl:rounded-[28px] xl:border xl:border-slate-700/50 xl:bg-[#071824] xl:p-6 xl:shadow-2xl">
      <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Workspace</p>
        <h2 className="mt-3 text-xl font-bold text-slate-100">Content Strategy</h2>
        <p className="mt-2 text-sm text-slate-400">Quick access to your private workspace and published showcase.</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#00BFA6]/15 text-[#00BFA6] border border-[#00BFA6]/30 shadow-[0_0_20px_rgba(0,191,166,0.15)]'
                    : 'text-slate-300 hover:bg-slate-900/70 hover:text-slate-100 border border-transparent'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Workspace Health</p>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-slate-950/70 px-4 py-3">
            <span>Memory sync</span>
            <span className="text-emerald-300">Active</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-slate-950/70 px-4 py-3">
            <span>Draft autosave</span>
            <span className="text-[#00BFA6]">On</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

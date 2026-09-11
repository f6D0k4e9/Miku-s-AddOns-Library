import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, Settings } from 'lucide-react';

export const FloatingNav: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/favorite', icon: Heart, label: 'Favorites' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-full py-2 px-6 flex items-center justify-around shadow-2xl z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'w-10 h-8 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30 transition-all duration-200'
                : 'text-zinc-400 hover:text-white p-2 transition-colors duration-200'
            }
          >
            <Icon className="w-4 h-4" />
          </NavLink>
        );
      })}
    </div>
  );
};

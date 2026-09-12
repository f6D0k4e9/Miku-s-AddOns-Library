import React from 'react';
import { Home, Search, Heart, Settings } from 'lucide-react';

export type NavTab = 'home' | 'search' | 'favorites' | 'settings';

interface FloatingNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'home' as NavTab, icon: Home, label: 'Home' },
    { id: 'search' as NavTab, icon: Search, label: 'Search' },
    { id: 'favorites' as NavTab, icon: Heart, label: 'Favorites' },
    { id: 'settings' as NavTab, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-full py-2 px-6 flex items-center justify-around shadow-2xl z-[100]">
      {navItems.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            onClick={() => setActiveTab(id)}
            className={`cursor-pointer p-2 rounded-full transition-all duration-200 active:scale-95 ${
              isActive
                ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 pointer-events-none" />
          </button>
        );
      })}
    </div>
  );
};

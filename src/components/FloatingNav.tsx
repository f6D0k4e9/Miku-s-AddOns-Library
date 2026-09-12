import React from 'react';
import { Home, Search, Heart, Settings } from 'lucide-react';

export type NavTab = 'home' | 'search' | 'favorites' | 'settings';

interface FloatingNavProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  onHomeClick?: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeTab = 'home',
  onTabChange,
  onHomeClick,
}) => {
  const handleNavClick = (tab: NavTab) => {
    onTabChange?.(tab);
    if (tab === 'home' && onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-full py-2 px-6 flex items-center justify-around shadow-2xl z-50">
      {/* Home Button */}
      <button
        onClick={() => handleNavClick('home')}
        className={`p-2 rounded-full transition-colors ${
          activeTab === 'home'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Home className="w-4 h-4" />
      </button>

      {/* Search Button */}
      <button
        onClick={() => handleNavClick('search')}
        className={`p-2 rounded-full transition-colors ${
          activeTab === 'search'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Favorites Button */}
      <button
        onClick={() => handleNavClick('favorites')}
        className={`p-2 rounded-full transition-colors ${
          activeTab === 'favorites'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Settings Button */}
      <button
        onClick={() => handleNavClick('settings')}
        className={`p-2 rounded-full transition-colors ${
          activeTab === 'settings'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};

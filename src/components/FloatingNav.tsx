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
  const handleNavClick = (e: React.MouseEvent, tab: NavTab) => {
    e.stopPropagation();
    onTabChange?.(tab);
    if (tab === 'home' && onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-full py-2 px-6 flex items-center justify-around shadow-2xl z-[100] pointer-events-auto">
      {/* Home Button */}
      <button
        type="button"
        onClick={(e) => handleNavClick(e, 'home')}
        className={`cursor-pointer p-2 rounded-full transition-all duration-200 active:scale-95 ${
          activeTab === 'home'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Home className="w-4 h-4 pointer-events-none" />
      </button>

      {/* Search Button */}
      <button
        type="button"
        onClick={(e) => handleNavClick(e, 'search')}
        className={`cursor-pointer p-2 rounded-full transition-all duration-200 active:scale-95 ${
          activeTab === 'search'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Search className="w-4 h-4 pointer-events-none" />
      </button>

      {/* Favorites Button */}
      <button
        type="button"
        onClick={(e) => handleNavClick(e, 'favorites')}
        className={`cursor-pointer p-2 rounded-full transition-all duration-200 active:scale-95 ${
          activeTab === 'favorites'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Heart className="w-4 h-4 pointer-events-none" />
      </button>

      {/* Settings Button */}
      <button
        type="button"
        onClick={(e) => handleNavClick(e, 'settings')}
        className={`cursor-pointer p-2 rounded-full transition-all duration-200 active:scale-95 ${
          activeTab === 'settings'
            ? 'w-10 h-8 bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        <Settings className="w-4 h-4 pointer-events-none" />
      </button>
    </div>
  );
};

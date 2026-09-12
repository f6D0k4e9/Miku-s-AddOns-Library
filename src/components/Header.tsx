import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';
import { AddonItem } from '../data/addons';

const logoImg = new URL('../assets/logo.png', import.meta.url).href;

export type FilterCategory = 'All' | 'For You' | AddonItem['category'];

interface HeaderProps {
  activeCategory: FilterCategory;
  setActiveCategory: (category: FilterCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: FilterCategory[] = [
    'All',
    'For You',
    'Add-ons',
    'Textures',
    'Scripting API',
    'World',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between pt-2 pb-1 relative z-50">
        {/* Scaled Up Logo */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => setActiveCategory('All')}
        >
          <img
            src={logoImg}
            alt="Miku Addons Logo"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(14,165,233,0.4)] group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Enhanced Cyberpunk Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center space-x-2 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black tracking-wider uppercase border transition-all duration-300 shadow-lg ${
              isOpen 
                ? 'border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] text-white' 
                : 'border-zinc-800/80 hover:border-sky-500/50 text-zinc-300 hover:text-white shadow-zinc-950/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent font-extrabold">
              {activeCategory}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-sky-400 transition-transform duration-300 ease-out ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Glowing Glass Floating Panel */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-950/90 border border-sky-500/30 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(14,165,233,0.15)] py-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="px-3 py-1 mb-1 text-[9px] font-black tracking-widest text-zinc-500 uppercase border-b border-zinc-800/50">
                Filter Library
              </div>
              
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-all duration-150 ${
                    activeCategory === cat
                      ? 'bg-sky-500/15 text-sky-300 border-l-2 border-sky-400 pl-4'
                      : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100 hover:pl-4'
                  }`}
                >
                  <span className="tracking-wide">{cat}</span>
                  {activeCategory === cat && (
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-sky-500/20 text-sky-400">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Glowing Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/60 to-transparent shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
    </div>
  );
};

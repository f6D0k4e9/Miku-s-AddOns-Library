import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AddonItem } from '../data/addons';

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
    <header className="flex items-center justify-between py-2 relative z-50">
      {/* Brand Logo */}
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => setActiveCategory('All')}
      >
        <img
          src="/logo.png"
          alt="Miku Addons Logo"
          className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(14,165,233,0.3)]"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 bg-zinc-900/90 text-zinc-200 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-bold hover:border-sky-500/50 transition-all duration-200 shadow-md"
        >
          <span className="text-sky-400">{activeCategory}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl py-1.5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeCategory === cat
                    ? 'bg-sky-500/10 text-sky-400 font-bold'
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

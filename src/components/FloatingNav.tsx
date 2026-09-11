import React from 'react';
import { Home, Search, Heart, Settings } from 'lucide-react';

interface FloatingNavProps {
  onHomeClick: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onHomeClick }) => {
  return (
    <div className="fixed bottom-3 inset-x-4 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-full py-2 px-6 flex items-center justify-around shadow-2xl z-50">
      <button onClick={onHomeClick} className="w-10 h-8 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/30">
        <Home className="w-4 h-4" />
      </button>
      <button className="text-zinc-400 hover:text-white p-2">
        <Search className="w-4 h-4" />
      </button>
      <button className="text-zinc-400 hover:text-white p-2">
        <Heart className="w-4 h-4" />
      </button>
      <button className="text-zinc-400 hover:text-white p-2">
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};

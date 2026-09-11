import React from 'react';
import { Heart } from 'lucide-react';
import { UserProfile } from '../types/user';

interface FavoritesPageProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ user, onOpenAuth }) => (
  <div className="p-4 space-y-4 pb-24">
    <h1 className="text-xl font-black text-white">Favorites</h1>
    {!user ? (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
        <Heart className="w-12 h-12 text-zinc-700" />
        <h3 className="text-sm font-bold text-white">Login Required</h3>
        <p className="text-xs text-zinc-500 max-w-xs">
          Please log in to view your favorite mods.
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-sky-500 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition active:scale-95 shadow-md shadow-sky-500/20"
        >
          Sign In
        </button>
      </div>
    ) : (
      <p className="text-xs text-zinc-400">Your saved favorites will appear here.</p>
    )}
  </div>
);

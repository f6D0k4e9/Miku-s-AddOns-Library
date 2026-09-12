import React from 'react';
import { ADDONS_DATA } from '../data/addons';
import { Download, Heart, Trash2 } from 'lucide-react';

interface FavoritesProps {
  favorites: string[];
  onSelectAddon: (slug: string) => void;
  onToggleFavorite: (slug: string) => void;
  getCoverForAddon: (slug: string) => string;
}

export const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onSelectAddon,
  onToggleFavorite,
  getCoverForAddon,
}) => {
  const favoriteItems = ADDONS_DATA.filter((addon) =>
    favorites.includes(addon.slug)
  );

  const formatDescription = (desc?: string | string[]): string => {
    if (Array.isArray(desc)) return desc.join(' ');
    return desc || 'No description available.';
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
        <Heart className="w-5 h-5 text-sky-400 fill-sky-400" />
        <h2 className="text-base font-black text-white">Your Favorites</h2>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <p className="text-sm font-semibold text-zinc-400">
            No saved favorites yet.
          </p>
          <p className="text-xs text-zinc-600">
            Tap the heart icon on any add-on page to save it here!
          </p>
        </div>
      ) : (
        /* Single Grid Column Layout */
        <div className="grid grid-cols-1 gap-3">
          {favoriteItems.map((addon) => (
            <div
              key={addon.id}
              onClick={() => onSelectAddon(addon.slug)}
              className="group relative bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/50 rounded-2xl p-2.5 flex items-center space-x-3 cursor-pointer transition-all duration-300"
            >
              {/* Image */}
              <img
                src={getCoverForAddon(addon.slug)}
                alt={addon.title}
                className="w-16 h-16 object-cover rounded-xl bg-zinc-800 flex-shrink-0 group-hover:scale-105 transition duration-300"
              />

              {/* Info */}
              <div className="flex-1 min-w-0 pr-6">
                <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                  {addon.category}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-1">
                  {addon.title}
                </h4>
                <p className="text-[11px] text-zinc-400/80 line-clamp-1 mt-0.5 leading-snug">
                  {formatDescription(addon.description)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(addon.slug);
                }}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
                

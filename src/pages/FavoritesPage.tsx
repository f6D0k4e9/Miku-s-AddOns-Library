import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark } from 'lucide-react';
import { ADDONS_DATA } from '../data/addons';
import { getCoverForAddon } from '../utils/imageLocators';

export const FavoritesPage: React.FC = () => {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mik_favorites');
    if (saved) {
      try {
        setFavoriteSlugs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const favoriteAddons = ADDONS_DATA.filter((addon) => favoriteSlugs.includes(addon.slug));

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">Your Favorites</h2>
          <p className="text-xs text-zinc-400">Quick access to your saved mods</p>
        </div>
      </div>

      {/* Grid of Favorites */}
      {favoriteAddons.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {favoriteAddons.map((addon) => (
            <div
              key={addon.id}
              onClick={() => navigate(`/addon/${addon.slug}`)}
              className="group cursor-pointer bg-zinc-900/90 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-sky-500/50 transition duration-300"
            >
              <div className="relative aspect-[4/3] w-full bg-zinc-800 overflow-hidden">
                <img
                  src={getCoverForAddon(addon.slug)}
                  alt={addon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-sky-400 transition">
                    {addon.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 line-clamp-1">{addon.author}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    {addon.category}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800/80">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Bookmark className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">No favorites yet</h4>
            <p className="text-xs text-zinc-400">Tap the favorite/heart icon on any addon detail page to save it here</p>
          </div>
        </div>
      )}
    </div>
  );
};

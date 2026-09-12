import React, { useState } from 'react';
import { ADDONS_DATA } from '../data/addons';
import { Search, Heart, MessageSquarePlus } from 'lucide-react';

interface SearchPageProps {
  onSelectAddon: (slug: string) => void;
  getCoverForAddon: (slug: string) => string;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onSelectAddon,
  getCoverForAddon,
  favorites,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState('');

  const filteredAddons = ADDONS_DATA.filter(
    (addon) =>
      addon.title.toLowerCase().includes(query.toLowerCase()) ||
      addon.category.toLowerCase().includes(query.toLowerCase()) ||
      addon.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search addons, categories, or authors..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition"
        />
      </div>

      {/* Empty State / Search Results */}
      {filteredAddons.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6">
          <p className="text-sm font-bold text-zinc-300">No add-ons found</p>
          <p className="text-xs text-zinc-500">
            Can't find what you are looking for? Request it from us directly!
          </p>
          <a
            href="https://www.tiktok.com/@free.marketplace?_r=1&_t=ZS-99fB7HONyoK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-sky-500 text-slate-950 text-xs font-black hover:bg-sky-400 transition active:scale-95 shadow-lg shadow-sky-500/20"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Click Here to Request Addon</span>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredAddons.map((addon) => {
            const isFavorited = favorites.includes(addon.slug);

            return (
              <div
                key={addon.id}
                onClick={() => onSelectAddon(addon.slug)}
                className="group relative bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/50 rounded-2xl p-2.5 flex items-center space-x-3 cursor-pointer transition-all duration-300"
              >
                <img
                  src={getCoverForAddon(addon.slug)}
                  alt={addon.title}
                  className="w-16 h-16 object-cover rounded-xl bg-zinc-800 flex-shrink-0 group-hover:scale-105 transition duration-300"
                />

                <div className="flex-1 min-w-0 pr-6">
                  <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                    {addon.category}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-1">
                    {addon.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400/80 line-clamp-1 mt-0.5 leading-snug">
                    By {addon.author}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(addon.slug);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full text-zinc-400 hover:text-red-400 transition cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? 'text-red-500 fill-red-500' : ''
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

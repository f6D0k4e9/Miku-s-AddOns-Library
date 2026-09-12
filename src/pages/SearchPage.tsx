import React, { useState } from 'react';
import { Search, Heart, MessageCircle } from 'lucide-react';
import { ADDONS_DATA } from '../data/addons';

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
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Calculate Search Results
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const searchResults = trimmedQuery
    ? ADDONS_DATA.filter((addon) => {
        const titleMatch = addon.title.toLowerCase().includes(trimmedQuery);
        const categoryMatch = addon.category.toLowerCase().includes(trimmedQuery);
        const authorMatch = addon.author.toLowerCase().includes(trimmedQuery);
        const descriptionMatch = addon.description?.toLowerCase().includes(trimmedQuery);
        return titleMatch || categoryMatch || authorMatch || descriptionMatch;
      })
    : [];

  // 2. Pre-search Recommendations (Featured / Top verified add-ons)
  const recommendations = ADDONS_DATA.filter(
    (addon) => addon.verifiedBy === 'Miku AddOns'
  ).slice(0, 4);

  return (
    <div className="space-y-4 pb-20">
      {/* Sky Blue Styled Search Input */}
      <div className="sticky top-2 z-40 bg-slate-950/80 backdrop-blur-md pt-1 pb-2">
        <div 
          className="flex items-center space-x-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus-within:border-sky-400 transition-all duration-300"
          style={{ boxShadow: '0 0 15px rgba(14, 165, 233, 0.1)' }}
        >
          <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search add-ons, textures, maps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="bg-transparent text-xs font-semibold text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Pre-Search State (No query entered) */}
      {!trimmedQuery && (
        <div className="space-y-6">
          {/* Welcome Card Box */}
          <div 
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-[220px]"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}
          >
            <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Search className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-black text-white tracking-wide">
              Search As You Can
            </h2>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              Find custom add-ons, script APIs, texture packs, and worlds instantly.
            </p>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-sky-400 px-1">
              Recommended Add-ons
            </h3>

            <div className="space-y-2.5">
              {recommendations.map((addon) => {
                const isFav = favorites.includes(addon.slug);

                return (
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

                    {/* Title + Lower Opacity Description */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                          {addon.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-1">
                        {addon.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400/70 line-clamp-1 mt-0.5 leading-snug">
                        {addon.description || 'No description available for this add-on.'}
                      </p>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(addon.slug);
                      }}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition ${
                        isFav ? 'text-sky-400' : 'text-zinc-600 hover:text-zinc-300'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-sky-400' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Query Active: Results Found */}
      {trimmedQuery && searchResults.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-bold text-zinc-400 px-1">
            Search Results ({searchResults.length})
          </span>

          <div className="space-y-2.5">
            {searchResults.map((addon) => {
              const isFav = favorites.includes(addon.slug);

              return (
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

                  {/* Title + Lower Opacity Description */}
                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                      {addon.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-1">
                      {addon.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400/70 line-clamp-1 mt-0.5 leading-snug">
                      {addon.description || 'No description available for this add-on.'}
                    </p>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(addon.slug);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition ${
                      isFav ? 'text-sky-400' : 'text-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-sky-400' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Query Active: No Results Found State */}
      {trimmedQuery && searchResults.length === 0 && (
        <div 
          className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-[260px] my-4"
          style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}
        >
          <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Search className="w-7 h-7" />
          </div>

          <h3 className="text-base font-black text-white">
            Oh no, we don't have that
          </h3>

          <div className="pt-2 flex flex-col items-center space-y-1">
            <span className="text-[11px] text-zinc-400 flex items-center space-x-1">
              <span>Request addon to be added to</span>
              <MessageCircle className="w-3 h-3 text-sky-400 inline" />
            </span>
            <a
              href="https://www.tiktok.com/@free.marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-400 hover:underline"
            >
              @free.marketplace on TikTok
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
                    

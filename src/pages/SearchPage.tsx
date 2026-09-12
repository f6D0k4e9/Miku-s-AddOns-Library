import React, { useState } from 'react';
import { ADDONS_DATA } from '../data/addons';
import { Search, Heart, MessageSquarePlus, Sparkles, X, FileText } from 'lucide-react';

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
  const trimmedQuery = query.trim().toLowerCase();

  const filteredAddons = ADDONS_DATA.filter((addon) => {
    if (!trimmedQuery) return true;

    const matchesTitle = addon.title.toLowerCase().includes(trimmedQuery);
    const matchesCategory = addon.category.toLowerCase().includes(trimmedQuery);
    const matchesAuthor = addon.author.toLowerCase().includes(trimmedQuery);
    const matchesDescription = addon.description.some((line) =>
      line.toLowerCase().includes(trimmedQuery)
    );

    return matchesTitle || matchesCategory || matchesAuthor || matchesDescription;
  });

  const renderHighlightedSnippet = (description: string[], searchTerm: string) => {
    if (!searchTerm) return null;

    const matchedLine = description.find((line) =>
      line.toLowerCase().includes(searchTerm)
    );

    if (!matchedLine) return null;

    const parts = matchedLine.split(new RegExp(`(${searchTerm})`, 'gi'));

    return (
      <div className="mt-1.5 pt-1.5 border-t border-zinc-800/60 flex items-start space-x-1 text-[10px] text-zinc-400">
        <FileText className="w-3 h-3 text-sky-400 flex-shrink-0 mt-0.5" />
        <p className="line-clamp-2 leading-tight">
          {parts.map((part, i) =>
            part.toLowerCase() === searchTerm ? (
              <mark
                key={i}
                className="bg-amber-400/20 text-amber-300 font-bold px-0.5 rounded border border-amber-400/30"
              >
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </p>
      </div>
    );
  };

  const recommendedAddons = ADDONS_DATA.slice(0, 4);

  return (
    <div className="space-y-4 pb-20">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, creators, or description keywords..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-9 py-3 text-xs font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* PRE-SEARCH STATE */}
      {trimmedQuery === '' ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-sky-500/10 via-zinc-900 to-zinc-900 border border-sky-500/20 rounded-2xl p-4 space-y-1">
            <h3 className="text-xs font-black text-sky-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Bedrock Add-ons</span>
            </h3>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Search by title, creator, or description keywords to find the exact add-on you need.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-white flex items-center space-x-1.5">
              <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
              <span>Recommended Add-ons</span>
            </h4>

            {/* Pre-search Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recommendedAddons.map((addon) => {
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
                      className="w-14 h-14 object-cover rounded-xl bg-zinc-800 flex-shrink-0 group-hover:scale-105 transition duration-300"
                    />

                    <div className="flex-1 min-w-0 pr-6">
                      <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                        {addon.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-0.5">
                        {addon.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">
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
          </div>
        </div>
      ) : filteredAddons.length === 0 ? (
        /* NO RESULTS STATE */
        <div className="text-center py-10 space-y-3 bg-zinc-900/50 rounded-3xl border border-zinc-800/80 p-6 mt-2 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <Search className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-black text-white">
              Oh no! We don't have that yet.
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              We couldn't find any results for <span className="text-sky-400 font-bold">"{query}"</span>.
            </p>
          </div>

          <a
            href="https://www.tiktok.com/@free.marketplace?_r=1&_t=ZS-99fB7HONyoK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-sky-500 text-slate-950 text-xs font-black hover:bg-sky-400 transition active:scale-95 shadow-lg shadow-sky-500/20 cursor-pointer mt-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Click Here to Request Addon</span>
          </a>
        </div>
      ) : (
        /* ACTIVE SEARCH RESULTS GRID */
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-zinc-400">
            Found {filteredAddons.length} result{filteredAddons.length === 1 ? '' : 's'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredAddons.map((addon) => {
              const isFavorited = favorites.includes(addon.slug);

              return (
                <div
                  key={addon.id}
                  onClick={() => onSelectAddon(addon.slug)}
                  className="group relative bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/50 rounded-2xl p-2.5 cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={getCoverForAddon(addon.slug)}
                      alt={addon.title}
                      className="w-14 h-14 object-cover rounded-xl bg-zinc-800 flex-shrink-0 group-hover:scale-105 transition duration-300"
                    />

                    <div className="flex-1 min-w-0 pr-6">
                      <span className="text-[9px] font-black uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                        {addon.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition truncate mt-0.5">
                        {addon.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">
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

                  {renderHighlightedSnippet(addon.description, trimmedQuery)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Search, Package, Download, ArrowUpRight } from 'lucide-react';
import { ADDONS_DATA, AddonItem } from '../data/addons';
import { useNavigate } from 'react-router-dom';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on user search input
  const filteredAddons = ADDONS_DATA.filter((addon) => {
    const query = searchQuery.toLowerCase();
    return (
      addon.title.toLowerCase().includes(query) ||
      addon.author.toLowerCase().includes(query) ||
      addon.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Search Input Bar with Sky Blue Accent */}
      <div className="relative pt-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by mod link, name, or author..."
          className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400 shadow-inner transition"
        />
      </div>

      {/* Greeting Header */}
      <div className="pt-1">
        <h2 className="text-sm font-black text-white tracking-wide">Search as you please</h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">Explore recommended add-ons, textures, and scripts</p>
      </div>

      {/* Recommendations / Search Results Grid */}
      <div className="space-y-3 pt-1">
        {filteredAddons.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredAddons.map((addon: AddonItem) => (
              <div
                key={addon.id}
                onClick={() => navigate(`/addon/${addon.slug}`)}
                className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-3.5 space-y-3 active:scale-[0.99] transition cursor-pointer hover:border-sky-500/40"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 pr-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {addon.category}
                    </span>
                    <h3 className="text-xs font-black text-white pt-1">{addon.title}</h3>
                    <p className="text-[11px] text-zinc-400">By {addon.author}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-400">
                  <span className="bg-zinc-800 px-2 py-1 rounded-lg text-zinc-300 font-medium">
                    {addon.fileSize}
                  </span>
                  <span className="text-sky-400 font-bold flex items-center space-x-1">
                    <Download className="w-3 h-3 inline" />
                    <span>{addon.verifiedBy}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Matches Found Card */
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-10 text-center space-y-3 mt-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 mx-auto shadow-lg shadow-sky-500/5">
              <Package className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">No Matches Found</h3>
              <p className="text-xs text-zinc-500 max-w-[220px] mx-auto leading-relaxed">
                We couldn't find any content matching your search criteria. Try different keywords.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;

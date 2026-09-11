import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, X } from 'lucide-react';
import { ADDONS_DATA } from '../data/addons';
import { getCoverForAddon } from '../utils/imageLocators';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigate = useNavigate();

  // Extract unique categories dynamically from your addons data
  const categories = ['All', ...Array.from(new Set(ADDONS_DATA.map((item) => item.category)))];

  // Filter addons based on search input and selected category
  const filteredAddons = ADDONS_DATA.filter((addon) => {
    const matchesSearch =
      addon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || addon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Search Header & Input */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-white">Discover Addons</h2>
        
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-10 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-zinc-400 px-1">
          <span>Results</span>
          <span className="font-bold text-white">{filteredAddons.length} found</span>
        </div>

        {filteredAddons.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredAddons.map((addon) => (
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
                    <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                      <Download className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800/80">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">No addons found</h4>
              <p className="text-xs text-zinc-400">Try adjusting your search query or category filter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
                      

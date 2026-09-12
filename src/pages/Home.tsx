import React from 'react';
import { ADDONS_DATA } from '../data/addons';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HomeProps {
  onSelectAddon: (slug: string) => void;
}

// Dynamically resolve cover images from src/addons
const addonImages = import.meta.glob<{ default: string }>(
  '/src/addons/*/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

function getCoverForAddon(slug: string): string {
  const matchKey = Object.keys(addonImages).find((path) =>
    path.includes(`/addons/${slug}/`)
  );
  return matchKey
    ? addonImages[matchKey].default
    : `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
}

export const Home: React.FC<HomeProps> = ({ onSelectAddon }) => {
  const featuredAddon = ADDONS_DATA[0];
  const regularAddons = ADDONS_DATA.slice(1);

  return (
    <div className="space-y-5 pb-20">
      {/* Featured Banner Card */}
      {featuredAddon && (
        <div
          onClick={() => onSelectAddon(featuredAddon.slug)}
          className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group cursor-pointer transition-all duration-300 hover:border-sky-500/50"
        >
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-zinc-950">
            <img
              src={getCoverForAddon(featuredAddon.slug)}
              alt={featuredAddon.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-500 text-slate-950 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
              <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                {featuredAddon.category}
              </span>
            </div>

            <h2 className="text-lg font-black text-white group-hover:text-sky-300 transition">
              {featuredAddon.title}
            </h2>

            <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
              {featuredAddon.description[0]}
            </p>
          </div>
        </div>
      )}

      {/* Main Catalog Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-sm font-black text-white flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
          <span>Explore Add-ons</span>
        </h3>
        <span className="text-[11px] font-bold text-zinc-500">
          {ADDONS_DATA.length} Total
        </span>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {regularAddons.map((addon) => (
          <div
            key={addon.id}
            onClick={() => onSelectAddon(addon.slug)}
            className="group bg-zinc-900/90 border border-zinc-800/80 hover:border-sky-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
              <img
                src={getCoverForAddon(addon.slug)}
                alt={addon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-slate-950/80 text-sky-400 border border-sky-500/30 backdrop-blur-md">
                {addon.category}
              </span>
            </div>

            <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition line-clamp-1">
                  {addon.title}
                </h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  By {addon.author}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 pt-2 border-t border-zinc-800/60">
                <span>{addon.fileSize}</span>
                <span className="flex items-center space-x-1 text-sky-400 group-hover:translate-x-0.5 transition">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

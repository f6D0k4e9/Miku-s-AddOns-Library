import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ADDONS_DATA } from '../data/addons';
import { Download } from 'lucide-react';

// DYNAMIC IMAGE LOCATOR
const addonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

function getCoverForAddon(slug: string): string {
  const matchKey = Object.keys(addonImages).find((path) => path.includes(`/addons/${slug}/`));
  return matchKey ? addonImages[matchKey].default : `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
}

interface HomeProps {
  onSelectAddon: (slug: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectAddon }) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'For you'>('Home');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featured = ADDONS_DATA[currentSlide] || ADDONS_DATA[0];

  return (
    <div className="space-y-4">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950/80 via-zinc-900 to-zinc-900 border border-sky-500/20 rounded-2xl p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-bold text-sky-400 text-xs">
            MA
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Upcoming official app soon</h4>
            <p className="text-[10px] text-zinc-400">Get the full experience when launched</p>
          </div>
        </div>
        <span className="bg-sky-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg">
          Soon
        </span>
      </div>

      {/* Carousel */}
      {featured && (
        <div className="space-y-2">
          <div
            onClick={() => onSelectAddon(featured.slug)}
            className="group cursor-pointer relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900"
          >
            <img
              src={getCoverForAddon(featured.slug)}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end items-start space-y-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-sky-500 text-slate-950">
                {featured.category}
              </span>
              <h3 className="text-base font-black text-white tracking-wide">{featured.title}</h3>
            </div>
          </div>

          <div className="flex justify-center space-x-1.5 pt-1">
            {ADDONS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-sky-500' : 'w-1.5 bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {ADDONS_DATA.map((addon) => (
          <div
            key={addon.id}
            onClick={() => onSelectAddon(addon.slug)}
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
              <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-sky-400 transition">
                {addon.title}
              </h4>

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
    </div>
  );
};
        

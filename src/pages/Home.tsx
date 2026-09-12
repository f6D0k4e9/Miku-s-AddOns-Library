import React, { useState, useEffect, useRef } from 'react';
import { Header, FilterCategory } from '../components/Header';
import { ADDONS_DATA, AddonItem } from '../data/addons';
import { Download } from 'lucide-react';

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

interface HomeProps {
  onSelectAddon: (slug: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectAddon }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch & Swipe States
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items matching selected category from addons.ts data
  const filteredAddons = ADDONS_DATA.filter((addon: AddonItem) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'For You') return addon.verifiedBy === 'Miku AddOns';
    return addon.category === activeCategory;
  });

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  // Infinite Auto-Slide to the left
  useEffect(() => {
    if (filteredAddons.length <= 1 || isPaused || isSwiping) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredAddons.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredAddons.length, isPaused, isSwiping]);

  // Touch Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setIsSwiping(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    setTouchDeltaX(diff);
  };

  const handleTouchEnd = () => {
    if (containerRef.current && touchStartX !== null) {
      const containerWidth = containerRef.current.offsetWidth;
      const swipeThreshold = containerWidth * 0.2;

      if (touchDeltaX < -swipeThreshold) {
        setCurrentSlide((prev) => (prev + 1) % filteredAddons.length);
      } else if (touchDeltaX > swipeThreshold) {
        setCurrentSlide((prev) => (prev - 1 + filteredAddons.length) % filteredAddons.length);
      }
    }

    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsSwiping(false);
    setIsPaused(false);
  };

  // Drag offset calculator
  const getTransformStyle = () => {
    if (!containerRef.current) return `translateX(-${currentSlide * 100}%)`;
    const containerWidth = containerRef.current.offsetWidth;
    const baseOffset = -currentSlide * containerWidth;
    const totalOffset = baseOffset + touchDeltaX;
    return `translateX(${totalOffset}px)`;
  };

  return (
    <div className="space-y-4">
      {/* Header passing activeCategory props correctly */}
      <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Sliding & Swipable Carousel */}
      {filteredAddons.length > 0 && (
        <div
          className="space-y-2 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900 touch-pan-y"
          >
            <div
              className={`flex w-full h-full ${
                isSwiping ? 'transition-none' : 'transition-transform duration-500 ease-out'
              }`}
              style={{ transform: getTransformStyle() }}
            >
              {filteredAddons.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (Math.abs(touchDeltaX) < 10) {
                      onSelectAddon(item.slug);
                    }
                  }}
                  className="w-full h-full flex-shrink-0 relative group cursor-pointer"
                >
                  <img
                    src={getCoverForAddon(item.slug)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end items-start space-y-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-sky-500 text-slate-950">
                      {item.category}
                    </span>
                    <h3 className="text-base font-black text-white tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-1.5 pt-1">
            {filteredAddons.map((_, idx) => (
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
        {filteredAddons.map((addon) => (
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
                

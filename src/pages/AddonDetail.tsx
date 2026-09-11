import React, { useState } from 'react';
import { ADDONS_DATA } from '../data/addons';
import { ArrowLeft, ShieldCheck, Download, Languages, Play } from 'lucide-react';

// DYNAMIC IMAGES FROM ADDON FOLDER: Reads directly from `src/addons/[slug]/`
const allAddonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

function getAddonFolderImages(slug: string): string[] {
  return Object.keys(allAddonImages)
    .filter((path) => path.includes(`/addons/${slug}/`))
    .map((path) => allAddonImages[path].default);
}

interface AddonDetailProps {
  slug: string;
  onBack: () => void;
  onSelectAddon: (slug: string) => void;
}

export const AddonDetail: React.FC<AddonDetailProps> = ({ slug, onBack, onSelectAddon }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const addon = ADDONS_DATA.find((item) => item.slug === slug) || ADDONS_DATA[0];
  const images = getAddonFolderImages(slug);

  const handleDownload = () => {
    window.open(addon.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
        <button onClick={onBack} className="flex items-center space-x-1 text-sky-400 font-bold text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center bg-zinc-900 rounded-full px-3 py-1 border border-zinc-800">
          <span className="text-[11px] font-bold text-sky-400">Upcoming official app soon</span>
          <span className="ml-2 bg-sky-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded">
            Soon
          </span>
        </div>
      </div>

      {/* Media Preview */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-black text-white">{addon.title}</h2>
          <p className="text-xs text-zinc-400">{addon.author}</p>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          {activeMediaIndex === 0 && addon.youtubeVideoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${addon.youtubeVideoId}`}
              title={addon.title}
              allowFullScreen
            />
          ) : (
            <img
              src={images[activeMediaIndex - (addon.youtubeVideoId ? 1 : 0)] || `https://placehold.co/600x400/0ea5e9/ffffff?text=${addon.title}`}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {addon.youtubeVideoId && (
            <button
              onClick={() => setActiveMediaIndex(0)}
              className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 flex items-center justify-center bg-zinc-900 ${
                activeMediaIndex === 0 ? 'border-sky-500' : 'border-zinc-800'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Play className="w-3 h-3 fill-current" />
              </div>
            </button>
          )}

          {images.map((imgSrc, idx) => {
            const indexValue = idx + (addon.youtubeVideoId ? 1 : 0);
            return (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(indexValue)}
                className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 overflow-hidden bg-zinc-900 ${
                  activeMediaIndex === indexValue ? 'border-sky-500' : 'border-zinc-800'
                }`}
              >
                <img src={imgSrc} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl p-4 border border-zinc-800/80 space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
          {addon.category}
        </span>

        <h1 className="text-xl font-black text-white">{addon.title}</h1>

        <div className="flex items-center space-x-1.5 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Mod verified by <strong className="text-sky-400">{addon.verifiedBy}</strong></span>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-white text-slate-950 py-3 rounded-2xl font-black text-sm flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Download</span>
        </button>

        <div className="pt-2 border-t border-zinc-800/80 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>File Size</span>
            <span className="font-bold text-white">{addon.fileSize}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Gallery</span>
            <span className="font-bold text-white">{images.length} Images</span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 space-y-3">
          <h3 className="text-sm font-black text-white">Description</h3>
          <button className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 flex items-center justify-center space-x-2">
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span>Translate</span>
          </button>
          <div className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
            {addon.description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

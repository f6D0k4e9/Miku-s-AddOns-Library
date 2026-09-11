import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ADDONS_DATA } from '../data/addons';
import { ArrowLeft, ShieldCheck, Download, Languages, Play } from 'lucide-react';

const allAddonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

function getAddonFolderImages(slug: string): string[] {
  return Object.keys(allAddonImages)
    .filter((path) => path.includes(`/addons/${slug}/`))
    .map((path) => allAddonImages[path].default);
}

export const AddonDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMediaChanging, setIsMediaChanging] = useState(false);

  const addon = ADDONS_DATA.find((item) => item.slug === slug) || ADDONS_DATA[0];
  const images = slug ? getAddonFolderImages(slug) : [];

  const handleMediaSwitch = (index: number) => {
    if (index === activeMediaIndex) return;
    setIsMediaChanging(true);
    setTimeout(() => {
      setActiveMediaIndex(index);
      setIsMediaChanging(false);
    }, 150);
  };

  const handleDownload = () => {
    if (addon?.downloadUrl) {
      window.open(addon.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const onBack = () => {
    navigate(-1);
  };

  const onSelectAddon = (newSlug: string) => {
    setActiveMediaIndex(0);
    navigate(`/addon/${newSlug}`);
  };

  if (!addon) return <div className="p-4 text-white">Addon not found.</div>;

  return (
    <div className="p-4 space-y-4 pb-24">
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
          <div
            className={`w-full h-full transition-all duration-200 ease-out ${
              isMediaChanging ? 'opacity-30 blur-md scale-95' : 'opacity-100 blur-0 scale-100'
            }`}
          >
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
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {addon.youtubeVideoId && (
            <button
              onClick={() => handleMediaSwitch(0)}
              className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 flex items-center justify-center bg-zinc-900 transition ${
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
                onClick={() => handleMediaSwitch(indexValue)}
                className={`flex-shrink-0 w-16 h-12 rounded-xl border-2 overflow-hidden bg-zinc-900 transition ${
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
          className="w-full bg-white text-slate-950 py-3 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 active:scale-95 transition"
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

        {/* Suggested Mods */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-3">
          <h3 className="text-xs font-black text-white flex items-center space-x-2">
            <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
            <span>Suggested Mods</span>
          </h3>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {ADDONS_DATA.filter((a) => a.slug !== slug).map((mod) => (
              <div
                key={mod.slug}
                onClick={() => onSelectAddon(mod.slug)}
                className="flex-shrink-0 w-32 bg-zinc-900/80 rounded-xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-sky-500/50 transition active:scale-95"
              >
                <div className="p-2 space-y-1">
                  <h4 className="text-[11px] font-bold text-white truncate">{mod.title}</h4>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-sky-500/20 text-sky-400">
                    {mod.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

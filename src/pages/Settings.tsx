import React, { useState } from 'react';
import { Settings as SettingsIcon, Trash2, Info, Globe, Send, Check } from 'lucide-react';

interface SettingsProps {
  onClearFavorites: () => void;
  favoriteCount: number;
}

export const Settings: React.FC<SettingsProps> = ({
  onClearFavorites,
  favoriteCount,
}) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'tl' | 'ja'>('en');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'tl', label: 'Tagalog' },
    { code: 'ja', label: '日本語 (Japanese)' },
  ];

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
        <SettingsIcon className="w-5 h-5 text-sky-400" />
        <h2 className="text-base font-black text-white">App Settings</h2>
      </div>

      <div className="space-y-3">
        {/* Language Selection */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-sky-400">
            <Globe className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white">Language</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelectedLang(lang.code as 'en' | 'tl' | 'ja')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  selectedLang === lang.code
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                    : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-white'
                }`}
              >
                <span className="truncate">{lang.label}</span>
                {selectedLang === lang.code && (
                  <Check className="w-3 h-3 text-sky-400 ml-1 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-sky-400">
            <Send className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white">Contact Us</h3>
          </div>
          <p className="text-[11px] text-zinc-400">
            Have questions or want to submit an addon? Reach out to us on TikTok:
          </p>
          <a
            href="https://www.tiktok.com/@free.marketplace?_r=1&_t=ZS-99fB7HONyoK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition mt-1"
          >
            <span>Contact Us</span>
          </a>
        </div>

        {/* Saved Storage Option */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-white">Saved Favorites</h3>
            <p className="text-[10px] text-zinc-400">
              {favoriteCount} item{favoriteCount === 1 ? '' : 's'} stored in local storage
            </p>
          </div>
          <button
            type="button"
            onClick={onClearFavorites}
            disabled={favoriteCount === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* App Info */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-sky-400">
            <Info className="w-4 h-4" />
            <span className="text-xs font-bold">About Miku's AddOns</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Mobile-first Bedrock Addon library powered by React, Vite, and Tailwind CSS.
          </p>
          <div className="pt-2 text-[10px] text-zinc-500 flex justify-between border-t border-zinc-800/60">
            <span>Version: 1.0.0</span>
            <span>Build: Mobile Web</span>
          </div>
        </div>
      </div>
    </div>
  );
};

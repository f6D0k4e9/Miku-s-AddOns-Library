
import React from 'react';
import { Globe, Headphones, Smartphone } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-lg font-black text-white border-b border-zinc-900 pb-2">Settings</h2>

      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Language</span>
        </div>
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/50">English</span>
      </div>

      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Support</span>
        </div>
        <span className="text-xs text-zinc-500">&gt;</span>
      </div>

      <div className="bg-gradient-to-r from-sky-950/60 via-zinc-900 to-zinc-900 rounded-2xl p-3.5 border border-sky-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-sky-500/20">
            MA
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center space-x-1">
              <Smartphone className="w-3.5 h-3.5 text-sky-400 inline" />
              <span>Download App</span>
            </h4>
            <p className="text-[10px] text-zinc-400">Get Miku AddOns app for Android</p>
          </div>
        </div>
        <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black px-2.5 py-1 rounded-lg">Coming Soon</span>
      </div>
    </div>
  );
};

export default SettingsPage;

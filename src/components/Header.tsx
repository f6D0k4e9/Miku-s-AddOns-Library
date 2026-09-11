import React from 'react';

interface HeaderProps {
  activeTab: 'Home' | 'For you';
  setActiveTab: (tab: 'Home' | 'For you') => void;
  user?: { photoURL?: string | null; displayName?: string | null } | null;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, onOpenAuth }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-sky-500/30">
          M
        </div>
        <span className="font-extrabold text-lg tracking-wide text-sky-400">
          Miku's <span className="text-white">AddOns</span>
        </span>
      </div>

      <div className="flex items-center bg-zinc-900/90 rounded-full p-1 border border-zinc-800">
        <button
          onClick={() => setActiveTab('Home')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${
            activeTab === 'Home' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('For you')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${
            activeTab === 'For you' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          For you
        </button>
      </div>

      {user ? (
        user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-7 h-7 rounded-full border border-sky-400/50 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 text-xs font-bold">
            {user.displayName?.[0] || 'U'}
          </div>
        )
      ) : (
        <button
          onClick={onOpenAuth}
          className="text-xs font-semibold px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:border-sky-500/50 active:scale-95 transition"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

import React from 'react';
import { LogOut, ShieldAlert, CheckCircle2, Globe, Headphones, Smartphone } from 'lucide-react';
import { logoutUser } from '../services/firebase';
import { UserProfile } from '../types/user';

interface SettingsPageProps {
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
  onOpenAuth: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, setUser, onOpenAuth }) => {
  const handleSignOut = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-lg font-black text-white border-b border-zinc-900 pb-2">Settings</h2>

      <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 space-y-3">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-sky-400/40 object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-white truncate">{user.name || user.displayName || 'Logged In'}</h3>
                <p className="text-[11px] text-zinc-400 truncate max-w-[150px]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-xs font-bold text-red-400 flex items-center space-x-1 transition active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Settings Access Restricted</h3>
                <p className="text-xs text-zinc-400 leading-snug mt-0.5">
                  You must be logged in to view and modify your account settings.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full bg-sky-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition active:scale-95 shadow-lg shadow-sky-500/20"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

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

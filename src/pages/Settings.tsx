import { Globe, Headphones, Smartphone, Youtube, LogOut, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../firebase';

interface UserProfile {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

interface SettingsProps {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const Settings = ({ user, setUser }: SettingsProps) => {
  const handleGoogleSignIn = async () => {
    const loggedUser = await loginWithGoogle();
    if (loggedUser) {
      setUser(loggedUser);
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div className="space-y-4">
      {/* Settings Header */}
      <div className="py-2 border-b border-zinc-900">
        <h2 className="text-lg font-black text-white">Settings</h2>
      </div>

      {/* Account / Login Section */}
      <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 space-y-3">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-sky-400/40 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-white truncate">{user.displayName || 'Logged In'}</h3>
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
              onClick={handleGoogleSignIn}
              className="w-full bg-white hover:bg-zinc-200 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2 transition active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29B9.98 9.98 0 000 12c0 1.61.39 3.14 1.29 4.58l3.99-2.31z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 2.31c.95-2.83 3.6-4.14 6.72-4.14z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        )}
      </div>

      {/* Language Setting */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Language</span>
        </div>
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/50">
          English
        </span>
      </div>

      {/* Support Setting */}
      <div className="bg-zinc-900/90 rounded-2xl p-3.5 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-sky-400">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Support</span>
        </div>
        <span className="text-xs text-zinc-500">&gt;</span>
      </div>

      {/* Download App Banner */}
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
        <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black px-2.5 py-1 rounded-lg">
          Coming Soon
        </span>
      </div>

      {/* Social Links */}
      <div className="pt-4 flex justify-center space-x-4">
        <a
          href="https://youtube.com/@Brentbrnt"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition active:scale-95"
          title="YouTube - @Brentbrnt"
        >
          <Youtube className="w-5 h-5" />
        </a>

        <a
          href="https://tiktok.com/@free.marketplace"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10 transition active:scale-95"
          title="TikTok - @free.marketplace"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 1 0 5.55 6.29V9.43a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.86z" />
          </svg>
        </a>
      </div>

      <p className="text-center text-[10px] text-zinc-600 pt-2 font-mono">
        Miku's Add-ons v1.0.0
      </p>
    </div>
  );
};
      

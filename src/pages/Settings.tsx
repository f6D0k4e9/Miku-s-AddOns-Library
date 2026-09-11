import React from 'react';
import { loginWithGoogle, logoutUser } from '../firebase';

export const Settings = ({ user, setUser }) => {
  const handleLogin = async () => {
    const googleUser = await loginWithGoogle();
    if (googleUser) {
      setUser(googleUser);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
      {user ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="text-sm font-bold text-white">{user.displayName}</h3>
              <p className="text-xs text-zinc-400">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs font-bold text-red-400 bg-zinc-800 px-3 py-1.5 rounded-xl">
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="w-full bg-white text-black font-black py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2"
        >
          <span>Sign in with Google</span>
        </button>
      )}
    </div>
  );
};

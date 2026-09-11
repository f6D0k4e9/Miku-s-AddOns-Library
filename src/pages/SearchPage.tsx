import React from 'react';
import { Search } from 'lucide-react';

export const SearchPage: React.FC = () => (
  <div className="p-4 space-y-4 pb-24">
    <div className="relative">
      <input
        type="text"
        placeholder="Search by mod link..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
      />
    </div>
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
      <Search className="w-12 h-12 text-zinc-700" />
      <h3 className="text-sm font-bold text-white">No Matches Found</h3>
      <p className="text-xs text-zinc-500 max-w-xs">
        We couldn't find any content matching your search criteria.
      </p>
    </div>
  </div>
);

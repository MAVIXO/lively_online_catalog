import React from 'react';
import { Search, Sparkles, MonitorPlay, Activity, Minus, Square, X, RefreshCw } from 'lucide-react';

interface TitleBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenScreensaver: () => void;
  installedCount: number;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenScreensaver,
  installedCount
}) => {
  return (
    <header className="h-12 bg-[#1f1f23] border-b border-white/10 flex items-center justify-between px-3 select-none z-30 flex-shrink-0">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/icons/icon-lively-300.png"
            alt="Lively Icon"
            className="w-5 h-5 object-contain"
            onError={(e) => {
              // fallback if not yet copied
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-sm text-white tracking-wide">Lively Wallpaper</span>
            <span className="text-[11px] text-[#0078d4] font-medium bg-[#0078d4]/15 px-1.5 py-0.5 rounded border border-[#0078d4]/30">
              Online Catalog
            </span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search wallpapers, tags, authors, or styles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#2a2b30] text-xs text-white placeholder-neutral-400 pl-9 pr-3 py-1.5 rounded-md border border-white/10 focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-neutral-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Telemetry & Quick Action Tools */}
      <div className="flex items-center gap-3">
        {/* Lively Live Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="font-mono text-neutral-400">Engine:</span>
          <span className="text-emerald-400 font-semibold font-mono">0.1% CPU</span>
          <span className="text-neutral-500">|</span>
          <span className="text-sky-400 font-semibold font-mono">60 FPS</span>
        </div>

        {/* Screensaver Simulator Button */}
        <button
          onClick={onOpenScreensaver}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0078d4]/15 hover:bg-[#0078d4]/25 text-[#0078d4] hover:text-[#2da1f8] text-xs font-medium rounded-md border border-[#0078d4]/40 transition-colors"
          title="Simulate Windows Screensaver Mode"
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Screensaver</span>
        </button>

        {/* Simulated Windows Window Controls */}
        <div className="flex items-center ml-2 border-l border-white/10 pl-2 text-neutral-400">
          <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded cursor-pointer transition-colors">
            <Minus className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded cursor-pointer transition-colors">
            <Square className="w-3 h-3" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center hover:bg-rose-600 hover:text-white rounded cursor-pointer transition-colors">
            <X className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Wallpaper } from '../types';
import { X, Sparkles, MonitorPlay } from 'lucide-react';
import { LiveWallpaperCanvas } from './LiveWallpaperCanvas';

interface ScreensaverModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

export const ScreensaverModal: React.FC<ScreensaverModalProps> = ({
  wallpaper,
  onClose
}) => {
  const [showExitHint, setShowExitHint] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hide exit hint after 4 seconds
    const hintTimeout = setTimeout(() => {
      setShowExitHint(false);
    }, 4000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(hintTimeout);
    };
  }, [onClose]);

  return (
    <div
      onMouseMove={() => setShowExitHint(true)}
      className="fixed inset-0 z-[100] bg-black cursor-none flex flex-col justify-between"
    >
      {/* Fullscreen Live Canvas */}
      <div className="absolute inset-0 z-0">
        <LiveWallpaperCanvas
          wallpaper={wallpaper}
          interactive={true}
          className="w-full h-full"
        />
      </div>

      {/* Screensaver HUD Overlay: Time and Date */}
      <div className="relative z-10 p-10 flex flex-col items-center justify-center h-full pointer-events-none select-none text-center">
        <div className="text-7xl sm:text-8xl md:text-9xl font-light text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-sans">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-xl sm:text-2xl font-light text-white/80 mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Floating Exit Hint Bar */}
      <div
        className={`relative z-20 p-6 flex justify-between items-center transition-opacity duration-500 pointer-events-auto ${
          showExitHint ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-neutral-300">
          <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
          <span>Lively Screensaver Active • Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded font-mono text-[10px] text-white">ESC</kbd> to return</span>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-105"
        >
          Wake Up / Exit
        </button>
      </div>
    </div>
  );
};

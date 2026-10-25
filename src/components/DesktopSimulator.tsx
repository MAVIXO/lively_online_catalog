import React, { useState } from 'react';
import { Wallpaper, DisplayMonitor, TaskbarTheme } from '../types';
import {
  Monitor,
  Maximize2,
  Minimize2,
  Sliders,
  Sparkles,
  Layers,
  LayoutGrid,
  CheckCircle,
  Eye,
  EyeOff,
  Folder,
  Trash2,
  Terminal,
  Chrome,
  Gamepad2,
  Palette
} from 'lucide-react';
import { LiveWallpaperCanvas } from './LiveWallpaperCanvas';

interface DesktopSimulatorProps {
  displays: DisplayMonitor[];
  wallpapers: Wallpaper[];
  onAssignWallpaper: (displayId: string, wallpaperId: string) => void;
  onOpenProperties: (wallpaper: Wallpaper) => void;
  onLaunchScreensaver: (wallpaper: Wallpaper) => void;
}

export const DesktopSimulator: React.FC<DesktopSimulatorProps> = ({
  displays,
  wallpapers,
  onAssignWallpaper,
  onOpenProperties,
  onLaunchScreensaver
}) => {
  const [selectedDisplayId, setSelectedDisplayId] = useState<string>(displays[0]?.id || 'display-1');
  const [taskbarTheme, setTaskbarTheme] = useState<TaskbarTheme>('acrylic');
  const [showDesktopIcons, setShowDesktopIcons] = useState<boolean>(true);
  const [spanMode, setSpanMode] = useState<boolean>(false);

  const selectedDisplay = displays.find((d) => d.id === selectedDisplayId) || displays[0];
  const activeWallpaper = wallpapers.find((w) => w.id === selectedDisplay?.assignedWallpaperId) || wallpapers[0];

  const getTaskbarClasses = (theme: TaskbarTheme) => {
    switch (theme) {
      case 'clear':
        return 'bg-transparent border-t border-white/5';
      case 'acrylic':
        return 'bg-[#18191dc0] backdrop-blur-xl border-t border-white/10';
      case 'blur':
        return 'bg-black/50 backdrop-blur-2xl border-t border-white/15';
      case 'opaque':
        return 'bg-[#18191d] border-t border-white/10';
      case 'fluent':
        return 'bg-[#202020dd] backdrop-blur-md border-t border-white/10';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 p-4 overflow-y-auto">
      {/* Top Banner & Display Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-[#23242a] border border-white/10 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#0078d4]" />
            <h2 className="text-sm font-semibold text-white">Multi-Display & Wallpaper Manager</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure independent live wallpapers per screen, span across displays, or customize taskbar blur.
          </p>
        </div>

        {/* Displays Selector */}
        <div className="flex items-center gap-2">
          {displays.map((disp, idx) => (
            <button
              key={disp.id}
              onClick={() => {
                setSpanMode(false);
                setSelectedDisplayId(disp.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                !spanMode && selectedDisplayId === disp.id
                  ? 'bg-[#0078d4] border-[#0078d4] text-white shadow'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Display {idx + 1}</span>
              {disp.isPrimary && (
                <span className="text-[10px] px-1 py-0.2 rounded bg-black/30 font-mono">
                  Primary
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => setSpanMode(!spanMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              spanMode
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Span All Displays</span>
          </button>
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1">
        {/* Virtual Desktop Screen Canvas */}
        <div className="xl:col-span-9 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-white">
                {spanMode ? 'Dual Monitor Spanned View (4480 x 1440)' : selectedDisplay.name}
              </span>
              <span className="font-mono text-[11px] text-[#0078d4]">
                [{activeWallpaper.title}]
              </span>
            </span>

            {/* Desktop UI Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDesktopIcons(!showDesktopIcons)}
                className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white"
              >
                {showDesktopIcons ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-neutral-500" />}
                <span>{showDesktopIcons ? 'Icons On' : 'Icons Hidden'}</span>
              </button>

              <button
                onClick={() => onLaunchScreensaver(activeWallpaper)}
                className="flex items-center gap-1 text-[11px] text-[#0078d4] hover:underline"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Windows 11 Desktop Monitor Mockup */}
          <div
            className={`relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black ${
              spanMode ? 'aspect-[32/9]' : 'aspect-video'
            }`}
          >
            {/* Live Wallpaper Background */}
            <div className="absolute inset-0 z-0">
              <LiveWallpaperCanvas
                wallpaper={activeWallpaper}
                interactive={true}
                className="w-full h-full"
              />
            </div>

            {/* Desktop Icons Layer */}
            {showDesktopIcons && (
              <div className="absolute top-4 left-4 z-10 grid grid-flow-col grid-rows-4 gap-4 pointer-events-auto">
                <div className="flex flex-col items-center gap-1 w-16 p-1.5 rounded hover:bg-white/10 text-white cursor-pointer group transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-sky-600/80 flex items-center justify-center shadow">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    This PC
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 w-16 p-1.5 rounded hover:bg-white/10 text-white cursor-pointer group transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/80 flex items-center justify-center shadow">
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    Projects
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 w-16 p-1.5 rounded hover:bg-white/10 text-white cursor-pointer group transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-neutral-600/80 flex items-center justify-center shadow">
                    <Trash2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    Recycle Bin
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1 w-16 p-1.5 rounded hover:bg-white/10 text-white cursor-pointer group transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0078d4]/90 flex items-center justify-center shadow ring-2 ring-sky-300">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-sky-200">
                    Lively
                  </span>
                </div>
              </div>
            )}

            {/* Windows 11 Taskbar */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-10 z-20 flex items-center justify-between px-3 transition-colors ${getTaskbarClasses(
                taskbarTheme
              )}`}
            >
              {/* Taskbar Weather/Widget */}
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <span className="font-medium">⛅ 72°F</span>
                <span className="hidden sm:inline text-white/50">Clear</span>
              </div>

              {/* Centered Windows 11 App Icons */}
              <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                {/* Windows Start Button */}
                <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.8" />
                  </svg>
                </div>

                {/* Search */}
                <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-white/80 transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                </div>

                {/* File Explorer */}
                <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-amber-300 transition-colors">
                  <Folder className="w-4 h-4" />
                </div>

                {/* Chrome */}
                <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-red-400 transition-colors">
                  <Chrome className="w-4 h-4" />
                </div>

                {/* Lively App Active Indicator */}
                <div className="relative w-7 h-7 rounded bg-white/15 flex items-center justify-center cursor-pointer text-sky-400 shadow">
                  <Sparkles className="w-4 h-4" />
                  <span className="absolute bottom-0.5 w-1.5 h-0.5 rounded-full bg-[#0078d4]" />
                </div>
              </div>

              {/* System Tray & Clock */}
              <div className="flex items-center gap-2 text-[11px] text-white/90">
                <img
                  src="/assets/icons/icon-lively-300.png"
                  alt="Systray Lively"
                  className="w-3.5 h-3.5 object-contain"
                  title="Lively Wallpaper running in System Tray"
                />
                <span className="font-mono text-[10px]">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Configuration & Display Assignment Column */}
        <div className="xl:col-span-3 flex flex-col space-y-4">
          {/* Quick Assign Carousel */}
          <div className="p-3.5 bg-[#23242a] border border-white/10 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Choose Wallpaper for this Display</span>
              <span className="text-[10px] text-neutral-400">{wallpapers.length} items</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {wallpapers.map((w) => {
                const isAssigned = w.id === activeWallpaper.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => onAssignWallpaper(selectedDisplay.id, w.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer border transition-all ${
                      isAssigned
                        ? 'bg-[#0078d4]/20 border-[#0078d4] text-white'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-neutral-300'
                    }`}
                  >
                    <img
                      src={w.previewMedia || w.thumbnail}
                      alt={w.title}
                      className="w-10 h-7 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{w.title}</div>
                      <div className="text-[10px] text-neutral-400 capitalize">{w.type}</div>
                    </div>
                    {isAssigned && <CheckCircle className="w-4 h-4 text-[#0078d4] flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Taskbar Integration (TranslucentTB feature) */}
          <div className="p-3.5 bg-[#23242a] border border-white/10 rounded-xl space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Windows Taskbar Appearance</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-tight">
              Lively integrates with Windows DWM to customize the taskbar effect with your wallpaper.
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(['acrylic', 'clear', 'blur', 'opaque'] as TaskbarTheme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setTaskbarTheme(theme)}
                  className={`py-1.5 px-2 rounded border capitalize text-xs font-medium transition-all ${
                    taskbarTheme === theme
                      ? 'bg-[#0078d4] border-[#0078d4] text-white'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Active Wallpaper Quick Tweaks */}
          <div className="p-3.5 bg-[#23242a] border border-white/10 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Active Properties</span>
              <button
                onClick={() => onOpenProperties(activeWallpaper)}
                className="text-[#0078d4] hover:underline flex items-center gap-1 text-[11px]"
              >
                <Sliders className="w-3 h-3" />
                Customize All
              </button>
            </div>
            <div className="text-[11px] text-neutral-300">
              Adjust speed, neon hues, and audio reactivity directly inside the live canvas!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Wallpaper } from '../types';
import {
  Download,
  Check,
  Heart,
  Sliders,
  Monitor,
  Eye,
  Sparkles,
  Layers,
  HardDrive
} from 'lucide-react';
import { LiveWallpaperCanvas } from './LiveWallpaperCanvas';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isActiveWallpaper: boolean;
  onSelect: (wallpaper: Wallpaper) => void;
  onSetAsActive: (wallpaper: Wallpaper) => void;
  onToggleInstall: (wallpaper: Wallpaper) => void;
  onOpenProperties: (wallpaper: Wallpaper) => void;
  onVote: (wallpaper: Wallpaper) => void;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({
  wallpaper,
  isActiveWallpaper,
  onSelect,
  onSetAsActive,
  onToggleInstall,
  onOpenProperties,
  onVote
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSourceBadge = (provider: Wallpaper['sourcePlatform']) => {
    switch (provider) {
      case 'wallpaper_engine':
        return { label: 'Wallpaper Engine', color: 'bg-sky-500/25 text-sky-300 border-sky-400/40' };
      case 'moewalls':
        return { label: 'MoeWalls', color: 'bg-pink-500/25 text-pink-300 border-pink-400/40' };
      case 'mylivewallpapers':
        return { label: 'MyLiveWallpapers', color: 'bg-amber-500/25 text-amber-300 border-amber-400/40' };
      case 'shadertoy':
        return { label: 'Shadertoy', color: 'bg-purple-500/25 text-purple-300 border-purple-400/40' };
      default:
        return { label: 'Lively Original', color: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40' };
    }
  };

  const getTypeBadge = (type: Wallpaper['type']) => {
    switch (type) {
      case 'webaudio':
        return { label: 'Audio Viz', color: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' };
      case 'web':
        return { label: 'HTML5/Web', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'video':
        return { label: 'Video 4K', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'depth':
        return { label: '3D Depth', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'shadertoy':
        return { label: 'Shadertoy', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      default:
        return { label: 'Animated', color: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30' };
    }
  };

  const badge = getTypeBadge(wallpaper.type);
  const srcBadge = getSourceBadge(wallpaper.sourcePlatform);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col rounded-xl bg-[#26272e] border transition-all duration-200 overflow-hidden card-hover-effect ${
        isActiveWallpaper
          ? 'border-[#0078d4] ring-2 ring-[#0078d4]/40 shadow-lg shadow-[#0078d4]/10'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Active Desktop Badge */}
      {isActiveWallpaper && (
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0078d4] text-white text-[11px] font-semibold shadow-lg">
          <Monitor className="w-3 h-3" />
          Рабочий стол
        </div>
      )}

      {/* Top Source & Type Badges */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 flex-wrap justify-end">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${srcBadge.color}`}>
          {srcBadge.label}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Media / Preview Thumbnail Box */}
      <div
        onClick={() => onSelect(wallpaper)}
        className="relative w-full aspect-video bg-[#18191d] overflow-hidden cursor-pointer"
      >
        {isHovered && wallpaper.isInteractive ? (
          <LiveWallpaperCanvas
            wallpaper={wallpaper}
            interactive={false}
            className="w-full h-full transform scale-105 transition-transform duration-300"
          />
        ) : (
          <img
            src={wallpaper.previewMedia || wallpaper.thumbnail}
            alt={wallpaper.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/logo/splash.png';
            }}
          />
        )}

        {/* Hover Overlay with Quick Launch */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(wallpaper);
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-110"
            title="Просмотр и источники скачивания"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetAsActive(wallpaper);
            }}
            className="px-3 py-2 rounded-full bg-[#0078d4] hover:bg-[#1084d8] text-white text-xs font-medium flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
            title="Установить на рабочий стол"
          >
            <Monitor className="w-3.5 h-3.5" />
            Применить
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onSelect(wallpaper)}
              className="text-xs font-semibold text-white group-hover:text-[#0078d4] transition-colors cursor-pointer line-clamp-1"
              title={wallpaper.title}
            >
              {wallpaper.title}
            </h3>
            <span className="text-[10px] text-neutral-400 font-mono whitespace-nowrap">
              {wallpaper.resolution.split(' ')[0]}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
            <span>Автор: {wallpaper.author.username}</span>
            {wallpaper.wallpaperEngine?.supported && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                WE Compat
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {wallpaper.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Toolbar */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVote(wallpaper)}
              className={`flex items-center gap-1 transition-colors ${
                wallpaper.userVoted === 'up' ? 'text-rose-400' : 'hover:text-rose-400'
              }`}
              title="Нравится"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  wallpaper.userVoted === 'up' ? 'fill-rose-400 text-rose-400' : ''
                }`}
              />
              <span className="text-[11px] font-mono">{wallpaper.voteCount}</span>
            </button>

            <span className="text-[10px] text-neutral-400 font-medium bg-white/5 px-1.5 py-0.5 rounded">
              {wallpaper.downloadSources?.length || 1} источн.
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {Object.keys(wallpaper.properties).length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProperties(wallpaper);
                }}
                className="p-1.5 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Настроить свойства Lively"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleInstall(wallpaper);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                wallpaper.isInstalled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={wallpaper.isInstalled ? 'Установлено в библиотеку' : 'Скачать в библиотеку'}
            >
              {wallpaper.isInstalled ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>В библиотеке</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  <span>Скачать</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Wallpaper, WallpaperSourcePlatform } from '../types';
import { WallpaperCard } from './WallpaperCard';
import {
  Globe,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  Flame,
  CheckCircle2,
  HardDrive,
  Folder
} from 'lucide-react';

interface OnlineCatalogViewProps {
  wallpapers: Wallpaper[];
  activeWallpaperId: string;
  onSelect: (wallpaper: Wallpaper) => void;
  onSetAsActive: (wallpaper: Wallpaper) => void;
  onToggleInstall: (wallpaper: Wallpaper) => void;
  onOpenProperties: (wallpaper: Wallpaper) => void;
  onVote: (wallpaper: Wallpaper) => void;
  onOpenWeImport: () => void;
  onOpenSubmit: () => void;
  onOpenLivelyExport: () => void;
}

export const OnlineCatalogView: React.FC<OnlineCatalogViewProps> = ({
  wallpapers,
  activeWallpaperId,
  onSelect,
  onSetAsActive,
  onToggleInstall,
  onOpenProperties,
  onVote,
  onOpenWeImport,
  onOpenSubmit,
  onOpenLivelyExport
}) => {
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'downloads' | 'newest' | 'title'>('votes');

  const sourcesList: Array<{ id: string; name: string; icon: string; count: number; badge?: string; desc: string }> = [
    {
      id: 'all',
      name: 'Все источники (All)',
      icon: '🌐',
      count: wallpapers.length,
      desc: 'Общий агрегатор Lively, Wallpaper Engine, MoeWalls и MyLiveWallpapers'
    },
    {
      id: 'wallpaper_engine',
      name: 'Wallpaper Engine (Steam)',
      icon: '⚙️',
      count: wallpapers.filter((w) => w.sourcePlatform === 'wallpaper_engine' || w.wallpaperEngine?.supported).length,
      badge: 'Steam Workshop',
      desc: 'Совместимые сцены, интерактивный WebGL и видео из Мастерской Steam'
    },
    {
      id: 'lively',
      name: 'Lively Официальный',
      icon: '🚀',
      count: wallpapers.filter((w) => w.sourcePlatform === 'lively').length,
      badge: 'Оригинал',
      desc: 'Нативные пакеты Lively Wallpaper со встроенными шейдерами и API'
    },
    {
      id: 'moewalls',
      name: 'MoeWalls (Аниме)',
      icon: '🌸',
      count: wallpapers.filter((w) => w.sourcePlatform === 'moewalls').length,
      badge: 'Anime & Games',
      desc: 'Популярный каталог аниме и игровых живых обоев высокого качества'
    },
    {
      id: 'mylivewallpapers',
      name: 'MyLiveWallpapers (MLW)',
      icon: '🎬',
      count: wallpapers.filter((w) => w.sourcePlatform === 'mylivewallpapers').length,
      badge: '4K 60FPS',
      desc: 'Высокобитрейтные 4K видеообои с аппаратным ускорением MPV/VLC'
    },
    {
      id: 'shadertoy',
      name: 'Shadertoy WebGL',
      icon: '⚡',
      count: wallpapers.filter((w) => w.sourcePlatform === 'shadertoy').length,
      desc: 'Процедурные генеративные шейдеры прямо на графическом процессоре'
    }
  ];

  const filteredWallpapers = wallpapers
    .filter((w) => {
      // Source filter
      if (selectedSource !== 'all') {
        if (selectedSource === 'wallpaper_engine') {
          if (w.sourcePlatform !== 'wallpaper_engine' && !w.wallpaperEngine?.supported) return false;
        } else if (w.sourcePlatform !== selectedSource) {
          return false;
        }
      }

      // Category / Type filter
      if (selectedCategory !== 'all' && w.type !== selectedCategory) return false;

      // Resolution filter
      if (selectedResolution !== 'all') {
        if (!w.resolution.toLowerCase().includes(selectedResolution.toLowerCase())) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(q);
        const matchesAuthor = w.author.username.toLowerCase().includes(q);
        const matchesTags = w.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = w.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesTags && !matchesDesc) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return b.voteCount - a.voteCount;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const activeSourceObj = sourcesList.find((s) => s.id === selectedSource) || sourcesList[0];

  return (
    <div className="p-5 sm:p-6 space-y-6 max-w-7xl mx-auto w-full flex-1 flex flex-col">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#0078d4]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Галерея: Онлайн каталог живых обоев
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Вместо «Скоро» — РАБОТАЕТ
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Полноценный каталог взамен неработающей вкладки «Галерея». Скачивайте обои для вашего установленного Lively Wallpaper и Wallpaper Engine из 5 онлайн-источников.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLivelyExport}
            className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Как перенести в Lively на ПК</span>
          </button>

          <button
            onClick={onOpenWeImport}
            className="px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Импорт из Wallpaper Engine</span>
          </button>

          <button
            onClick={onOpenSubmit}
            className="px-3.5 py-2 rounded-xl bg-[#0078d4] hover:bg-[#1084d8] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить</span>
          </button>
        </div>
      </div>

      {/* Notice Banner explaining why official Lively says Coming Soon */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#202127] to-sky-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs shadow-lg">
        <div className="space-y-1">
          <div className="font-semibold text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Раздел «Галерея» теперь полностью активен!</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            В официальном приложении Lively Wallpaper при открытии вкладки «Галерея» отображается заглушка «Скоро». Здесь этот каталог полностью реализован: вы можете выбирать любые обои, настраивать их и скачивать архивы <code>.zip</code>, которые затем достаточно перетащить мышкой в окно установленного Lively на вашем компьютере.
          </p>
        </div>

        <button
          onClick={onOpenLivelyExport}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs whitespace-nowrap shadow transition-transform hover:scale-105"
        >
          Инструкция по переносу
        </button>
      </div>

      {/* Sources Tabs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {sourcesList.map((src) => {
          const isSelected = selectedSource === src.id;
          return (
            <button
              key={src.id}
              onClick={() => setSelectedSource(src.id)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0078d4]/20 border-[#0078d4] text-white shadow-md'
                  : 'bg-[#22232a] border-white/5 hover:border-white/20 text-neutral-300 hover:bg-[#282932]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{src.icon}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {src.count}
                </span>
              </div>

              <div className="mt-2">
                <div className="text-xs font-semibold truncate">{src.name}</div>
                {src.badge && (
                  <span className="inline-block text-[9px] text-[#0078d4] font-medium mt-0.5">
                    {src.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Source Notice Banner */}
      <div className="p-3 bg-[#202127] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0078d4] flex-shrink-0" />
          <span className="text-neutral-300">
            <strong>{activeSourceObj.name}:</strong> {activeSourceObj.desc}
          </span>
        </div>

        {selectedSource === 'wallpaper_engine' && (
          <div className="flex items-center gap-2 text-[11px] text-sky-300 font-medium bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Совместимость с файлами project.json и мастерской Steam</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#202127] p-3 rounded-xl border border-white/10">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск по названию, автору или тегу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#191a1e] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
          />
        </div>

        {/* Categories / Types */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-neutral-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Тип:
          </span>
          {[
            { id: 'all', label: 'Все' },
            { id: 'web', label: 'Web/HTML5' },
            { id: 'webaudio', label: 'Аудио' },
            { id: 'video', label: 'Видео 4K' },
            { id: 'depth', label: '3D Depth' },
            { id: 'shadertoy', label: 'Shadertoy' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0078d4] text-white shadow'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resolution Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-400">Разрешение:</span>
          <select
            value={selectedResolution}
            onChange={(e) => setSelectedResolution(e.target.value)}
            className="bg-[#191a1e] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#0078d4]"
          >
            <option value="all">Любое (Any)</option>
            <option value="4K">4K Ultra HD</option>
            <option value="2K">2K Quad HD</option>
            <option value="1080">1080p Full HD</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#191a1e] border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#0078d4]"
          >
            <option value="votes">По рейтингу (Топ)</option>
            <option value="downloads">По скачиваниям</option>
            <option value="newest">Сначала новые</option>
            <option value="title">По названию (А-Я)</option>
          </select>
        </div>
      </div>

      {/* Wallpapers Grid */}
      {filteredWallpapers.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWallpapers.map((w) => (
              <WallpaperCard
                key={w.id}
                wallpaper={w}
                isActiveWallpaper={w.id === activeWallpaperId}
                onSelect={onSelect}
                onSetAsActive={onSetAsActive}
                onToggleInstall={onToggleInstall}
                onOpenProperties={onOpenProperties}
                onVote={onVote}
              />
            ))}
          </div>

          {/* Load More from Online Repositories Section */}
          <div className="p-5 rounded-2xl bg-[#22232a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0078d4]/15 border border-[#0078d4]/30 flex items-center justify-center text-[#0078d4]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Отображено {filteredWallpapers.length} из 14,200+ живых обоев в онлайн-базе
                </div>
                <div className="text-[11px] text-neutral-400">
                  В реальном приложении Lively Wallpaper и Steam Workshop доступны десятки тысяч обоев через API
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenWeImport}
                className="px-4 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-medium transition-colors"
              >
                Импорт по ID / Ссылке
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#202127] border border-white/5 rounded-2xl flex-1">
          <Filter className="w-8 h-8 text-neutral-500 mb-2" />
          <h3 className="text-sm font-semibold text-white">Обои не найдены по заданным критериям</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm">
            Попробуйте сбросить фильтр по источнику или изменить поисковый запрос.
          </p>
          <button
            onClick={() => {
              setSelectedSource('all');
              setSelectedCategory('all');
              setSelectedResolution('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-1.5 rounded-lg bg-[#0078d4] text-white text-xs font-medium"
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
};

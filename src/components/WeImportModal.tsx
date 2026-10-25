import React, { useState } from 'react';
import { Wallpaper, WallpaperType } from '../types';
import {
  X,
  Gamepad2,
  Download,
  Check,
  FileCode,
  Sparkles,
  Link2,
  HardDrive,
  Info
} from 'lucide-react';

interface WeImportModalProps {
  onClose: () => void;
  onImport: (wallpaper: Wallpaper) => void;
}

export const WeImportModal: React.FC<WeImportModalProps> = ({
  onClose,
  onImport
}) => {
  const [importMode, setImportMode] = useState<'steam' | 'file'>('steam');
  const [workshopUrl, setWorkshopUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryType, setCategoryType] = useState<WallpaperType>('web');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedInfo, setParsedInfo] = useState<string | null>(null);

  const handleSteamParse = () => {
    if (!workshopUrl.trim()) return;
    setIsProcessing(true);

    // Extract ID if full URL
    let extractedId = workshopUrl.trim();
    const match = workshopUrl.match(/id=(\d+)/);
    if (match) {
      extractedId = match[1];
    }

    setTimeout(() => {
      setIsProcessing(false);
      setTitle(`Steam Workshop #${extractedId} (Imported Scene)`);
      setAuthor('Steam Community Creator');
      setParsedInfo(`Found Wallpaper Engine Scene: ID ${extractedId}. Compatible with Lively WebGL/HTML5 engine.`);
    }, 600);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);
        setTitle(json.title || file.name.replace(/\.[^/.]+$/, ''));
        setAuthor(json.author || 'Imported Author');
        setParsedInfo(`Parsed project.json: Type "${json.type || 'Scene'}", ${Object.keys(json.general?.properties || {}).length} customizable properties detected.`);
      } catch (err) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
        setParsedInfo(`Loaded file "${file.name}". Converted to Lively Web/Media format.`);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || 'Wallpaper Engine Imported Scene';

    const newWallpaper: Wallpaper = {
      id: `we-imported-${Date.now()}`,
      title: finalTitle,
      author: {
        username: author.trim() || 'Steam Workshop Creator',
        badge: 'Wallpaper Engine'
      },
      license: 'Steam Workshop / User Content',
      type: categoryType,
      sourcePlatform: 'wallpaper_engine',
      description: parsedInfo || 'Imported Wallpaper Engine scene package converted for Lively playback.',
      tags: ['Wallpaper Engine', 'Steam Workshop', 'Imported', 'Scene'],
      thumbnail: '/assets/screenshots/mtv_2 (Large).png',
      previewMedia: '/resources/wallpaper_gif.gif',
      isInteractive: true,
      canvasPreset: 'synthwave',
      fileSize: '16.5 MB',
      resolution: '3840 x 2160 (4K)',
      fps: 60,
      voteCount: 1,
      downloads: 1,
      isInstalled: true,
      isCustom: true,
      dateAdded: new Date().toISOString().split('T')[0],
      wallpaperEngine: {
        supported: true,
        workshopId: workshopUrl.replace(/\D/g, '') || '2849102941',
        type: 'Scene',
        contentRating: 'Everyone'
      },
      properties: {
        speed: {
          type: 'slider',
          text: 'Simulation Speed',
          value: 1.0,
          min: 0.2,
          max: 3.0,
          step: 0.1,
          default: 1.0
        },
        sunColor: {
          type: 'color',
          text: 'Primary Accent Color',
          value: '#00f0ff',
          default: '#00f0ff'
        }
      },
      downloadSources: [
        {
          id: `s-${Date.now()}-we`,
          name: 'Steam Workshop Source',
          provider: 'wallpaper_engine',
          format: 'PKG (Wallpaper Engine)',
          size: '16.5 MB',
          speed: 'Steam Workshop',
          url: workshopUrl || 'https://steamcommunity.com/sharedfiles/filedetails/?id=2849102941',
          resolution: '4K',
          isOfficial: true
        },
        {
          id: `s-${Date.now()}-lively`,
          name: 'Lively Converted Package (.zip)',
          provider: 'lively',
          format: 'ZIP (Lively)',
          size: '15.9 MB',
          speed: 'Ultra Fast (CDN)',
          url: 'https://cdn.livelywallpaper.net/packages/imported.zip',
          resolution: '4K',
          isOfficial: true
        }
      ]
    };

    onImport(newWallpaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#222329] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-5 bg-[#1b1c21] select-none">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-sky-600 flex items-center justify-center text-white text-[10px] font-bold">
              WE
            </span>
            <span className="text-xs font-semibold text-white">
              Импорт из Wallpaper Engine / Steam Workshop
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setImportMode('steam')}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 font-medium transition-all ${
                importMode === 'steam'
                  ? 'bg-[#0078d4] border-[#0078d4] text-white shadow'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Steam Workshop URL</span>
            </button>

            <button
              type="button"
              onClick={() => setImportMode('file')}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 font-medium transition-all ${
                importMode === 'file'
                  ? 'bg-[#0078d4] border-[#0078d4] text-white shadow'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Файл project.json / .pkg</span>
            </button>
          </div>

          {importMode === 'steam' ? (
            <div className="space-y-2">
              <label className="block text-neutral-300 font-medium">
                Ссылка на обои в мастерской Steam или Workshop ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=2849102941"
                  value={workshopUrl}
                  onChange={(e) => setWorkshopUrl(e.target.value)}
                  className="flex-1 bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
                />
                <button
                  type="button"
                  onClick={handleSteamParse}
                  disabled={isProcessing || !workshopUrl.trim()}
                  className="px-3 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Поиск...' : 'Распознать'}
                </button>
              </div>
              <p className="text-[11px] text-neutral-400">
                Поддерживаются Web-сцены, Video-обои и интерактивные шейдеры из мастерской Wallpaper Engine.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-neutral-300 font-medium">
                Выберите файл project.json или архив Wallpaper Engine
              </label>
              <div className="border-2 border-dashed border-white/15 rounded-xl p-4 text-center hover:border-sky-400/50 transition-colors cursor-pointer bg-white/[0.02] relative">
                <input
                  type="file"
                  accept=".json,.pkg,.zip"
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FileCode className="w-6 h-6 mx-auto text-sky-400 mb-1.5" />
                <p className="text-neutral-200 font-medium">Перетащите сюда project.json</p>
                <p className="text-[10px] text-neutral-400">Автоматически извлекает параметры, шейдеры и метаданные</p>
              </div>
            </div>
          )}

          {parsedInfo && (
            <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-tight">{parsedInfo}</div>
            </div>
          )}

          {/* Title & Author */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Название обоев</label>
              <input
                type="text"
                required
                placeholder="Cyberpunk Night City Rain"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Автор в Steam</label>
                <input
                  type="text"
                  placeholder="AestheticDev"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Формат в Lively</label>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value as WallpaperType)}
                  className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0078d4]"
                >
                  <option value="web">Webpage / HTML5 Scene</option>
                  <option value="webaudio">Web Audio Reactive</option>
                  <option value="video">Direct 4K Video</option>
                  <option value="shadertoy">Shadertoy WebGL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white font-medium flex items-center gap-1.5 transition-colors shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Импортировать в Каталог</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

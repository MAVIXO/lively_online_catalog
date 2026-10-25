import React, { useState } from 'react';
import { Wallpaper, LivelyProperties, DownloadSource } from '../types';
import {
  X,
  Download,
  Check,
  Monitor,
  MonitorPlay,
  Sliders,
  Info,
  MessageSquare,
  Heart,
  HardDrive,
  Cpu,
  Clock,
  Sparkles,
  Layers,
  ExternalLink,
  Copy,
  FileCode,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { LiveWallpaperCanvas } from './LiveWallpaperCanvas';
import { LivelyPropertyEditor } from './LivelyPropertyEditor';
import { downloadWallpaperPackage } from '../utils/downloadHelper';

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  isActiveWallpaper: boolean;
  onClose: () => void;
  onSetAsActive: (wallpaper: Wallpaper) => void;
  onToggleInstall: (wallpaper: Wallpaper) => void;
  onPropertiesChange: (wallpaperId: string, updatedProps: LivelyProperties) => void;
  onVote: (wallpaper: Wallpaper) => void;
  onLaunchScreensaver: (wallpaper: Wallpaper) => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({
  wallpaper,
  isActiveWallpaper,
  onClose,
  onSetAsActive,
  onToggleInstall,
  onPropertiesChange,
  onVote,
  onLaunchScreensaver
}) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'customize' | 'we_compat' | 'details'>('sources');
  const [selectedSourceId, setSelectedSourceId] = useState<string>(wallpaper.downloadSources?.[0]?.id || 'default');
  const [copiedWorkshopId, setCopiedWorkshopId] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const handleDownloadFromSource = (src: DownloadSource) => {
    downloadWallpaperPackage(wallpaper, src);
    if (!wallpaper.isInstalled) {
      onToggleInstall(wallpaper);
    }
    setDownloadSuccessToast(`Файл "${src.format}" успешно сформирован и загружен!`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleCopyWorkshopId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedWorkshopId(true);
    setTimeout(() => setCopiedWorkshopId(false), 2000);
  };

  const selectedSource = wallpaper.downloadSources?.find((s) => s.id === selectedSourceId) || wallpaper.downloadSources?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#202127] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-5 bg-[#1b1c21] select-none flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0078d4]" />
            <span className="text-xs font-semibold text-white tracking-wide truncate max-w-md">{wallpaper.title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
              {wallpaper.type.toUpperCase()}
            </span>
            {wallpaper.wallpaperEngine?.supported && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                Wallpaper Engine
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Interactive Live Wallpaper Preview Viewport */}
          <div className="lg:col-span-7 bg-[#141518] relative flex flex-col justify-between overflow-hidden">
            <div className="w-full h-full relative">
              <LiveWallpaperCanvas
                wallpaper={wallpaper}
                interactive={true}
                className="w-full h-full"
              />

              {/* In-Preview Interactive Watermark Notice */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-neutral-300 flex items-center gap-2 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#0078d4]" />
                <span>Интерактивный предпросмотр (перемещайте курсор мыши)</span>
              </div>
            </div>
          </div>

          {/* Right Control & Detail Column */}
          <div className="lg:col-span-5 flex flex-col bg-[#222329] border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden">
            {/* Action Bar */}
            <div className="p-3.5 border-b border-white/10 space-y-2.5 bg-[#1e1f25]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSetAsActive(wallpaper)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isActiveWallpaper
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-[#0078d4] text-white hover:bg-[#1084d8]'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  {isActiveWallpaper ? 'Установлено на рабочий стол' : 'Установить на рабочий стол'}
                </button>

                <button
                  onClick={() => onLaunchScreensaver(wallpaper)}
                  className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  title="Запустить как экранную заставку"
                >
                  <MonitorPlay className="w-4 h-4 text-amber-400" />
                  <span>Заставка</span>
                </button>
              </div>

              {/* Toast for download */}
              {downloadSuccessToast && (
                <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{downloadSuccessToast}</span>
                </div>
              )}
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-white/10 bg-[#1b1c21] px-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('sources')}
                className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'sources'
                    ? 'border-[#0078d4] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Download className="w-3.5 h-3.5 text-[#0078d4]" />
                Источники скачивания ({wallpaper.downloadSources?.length || 1})
              </button>

              <button
                onClick={() => setActiveTab('customize')}
                className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'customize'
                    ? 'border-[#0078d4] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Свойства
              </button>

              <button
                onClick={() => setActiveTab('we_compat')}
                className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'we_compat'
                    ? 'border-[#0078d4] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-sky-400" />
                Wallpaper Engine
              </button>

              <button
                onClick={() => setActiveTab('details')}
                className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#0078d4] text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                Инфо
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* TAB 1: DOWNLOAD SOURCES */}
              {activeTab === 'sources' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Доступные зеркала и источники загрузки</h4>
                    <p className="text-[11px] text-neutral-400">
                      Выберите источник для скачивания пакета под Lively или Wallpaper Engine:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {wallpaper.downloadSources?.map((src) => (
                      <div
                        key={src.id}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#0078d4]/40 transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{src.name}</span>
                              {src.isOfficial && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                                  Официально
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-2">
                              <span>Формат: <strong className="text-neutral-200">{src.format}</strong></span>
                              <span>•</span>
                              <span>Размер: <strong className="text-neutral-200">{src.size}</strong></span>
                            </div>
                          </div>

                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
                            {src.speed}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-white/5">
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {src.resolution}
                          </span>

                          <button
                            onClick={() => handleDownloadFromSource(src)}
                            className="px-3 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-transform hover:scale-105"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Скачать ({src.format.split(' ')[0]})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-[11px] leading-relaxed">
                    💡 <strong>Совет:</strong> Пакеты формата <code>PKG (Wallpaper Engine)</code> генерируют готовый файл <code>project.json</code> для Steam-версии Wallpaper Engine, а <code>ZIP (Lively)</code> содержит нативный манифест <code>LivelyInfo.json</code>.
                  </div>
                </div>
              )}

              {/* TAB 2: PROPERTIES */}
              {activeTab === 'customize' && (
                <LivelyPropertyEditor
                  properties={wallpaper.properties}
                  onChange={(updatedProps) => onPropertiesChange(wallpaper.id, updatedProps)}
                  onReset={() => {
                    const resetProps = { ...wallpaper.properties };
                    Object.keys(resetProps).forEach((k) => {
                      (resetProps[k] as any).value = resetProps[k].default;
                    });
                    onPropertiesChange(wallpaper.id, resetProps);
                  }}
                />
              )}

              {/* TAB 3: WALLPAPER ENGINE COMPATIBILITY */}
              {activeTab === 'we_compat' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-sky-300 font-semibold">
                      <Zap className="w-4 h-4" />
                      <span>Совместимость с Wallpaper Engine</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Эти обои полностью совместимы со средой Wallpaper Engine. Вы можете скопировать Steam Workshop ID или экспортировать конфигурационный файл проекта:
                    </p>
                  </div>

                  {wallpaper.wallpaperEngine?.workshopId && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                      <div className="text-[11px] text-neutral-400">Steam Workshop ID:</div>
                      <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg font-mono text-white text-xs">
                        <span>{wallpaper.wallpaperEngine.workshopId}</span>
                        <button
                          onClick={() => handleCopyWorkshopId(wallpaper.wallpaperEngine!.workshopId!)}
                          className="flex items-center gap-1 text-[11px] text-[#0078d4] hover:underline"
                        >
                          {copiedWorkshopId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedWorkshopId ? 'Скопировано!' : 'Копировать'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Export project.json button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const weSource = wallpaper.downloadSources.find((s) => s.provider === 'wallpaper_engine') || {
                          id: 'we-export',
                          name: 'Wallpaper Engine Project',
                          provider: 'wallpaper_engine',
                          format: 'PKG (Wallpaper Engine)',
                          size: wallpaper.fileSize,
                          speed: 'Steam Workshop',
                          url: '',
                          resolution: wallpaper.resolution
                        };
                        handleDownloadFromSource(weSource as DownloadSource);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium flex items-center justify-center gap-2 shadow"
                    >
                      <FileCode className="w-4 h-4" />
                      <span>Экспорт project.json (для Wallpaper Engine)</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-neutral-400 space-y-1">
                    <p>• Файл <code>project.json</code> сохраняется в корень папки обоев в Wallpaper Engine.</p>
                    <p>• Путь по умолчанию: <code>Steam/steamapps/common/wallpaper_engine/projects/myprojects/</code></p>
                  </div>
                </div>
              )}

              {/* TAB 4: DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-white mb-1.5">Описание</h4>
                    <p className="text-neutral-300 leading-relaxed">{wallpaper.description}</p>
                  </div>

                  {/* Hardware & Spec Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Monitor className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="text-[10px] text-neutral-400">Разрешение</div>
                        <div className="font-semibold">{wallpaper.resolution}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-300">
                      <Cpu className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="text-[10px] text-neutral-400">Целевой FPS</div>
                        <div className="font-semibold">{wallpaper.fps} кадр/с</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-300">
                      <HardDrive className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="text-[10px] text-neutral-400">Размер файла</div>
                        <div className="font-semibold">{wallpaper.fileSize}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-300">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="text-[10px] text-neutral-400">Лицензия</div>
                        <div className="font-semibold">{wallpaper.license}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold text-white mb-2">Теги</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {wallpaper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[11px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-neutral-400">
                    <div>Автор: <span className="text-white font-medium">{wallpaper.author.username}</span></div>
                    <div>Источник: <span className="text-white font-medium capitalize">{wallpaper.sourcePlatform}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Wallpaper,
  DisplayMonitor,
  AppSettings,
  WallpaperType,
  LivelyProperties
} from './types';
import {
  INITIAL_WALLPAPERS,
  INITIAL_DISPLAYS,
  INITIAL_SETTINGS
} from './data/wallpapers';
import { TitleBar } from './components/TitleBar';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { WallpaperCard } from './components/WallpaperCard';
import { WallpaperModal } from './components/WallpaperModal';
import { DesktopSimulator } from './components/DesktopSimulator';
import { ScreensaverModal } from './components/ScreensaverModal';
import { SubmitWallpaperModal } from './components/SubmitWallpaperModal';
import { WeImportModal } from './components/WeImportModal';
import { OnlineCatalogView } from './components/OnlineCatalogView';
import { SettingsView } from './components/SettingsView';
import { ReleasesView } from './components/ReleasesView';
import { InstallerWizardModal } from './components/InstallerWizardModal';
import { LivelyLocalExportModal } from './components/LivelyLocalExportModal';
import {
  Sparkles,
  Filter,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  CheckCircle,
  FolderHeart,
  Plus,
  Monitor,
  ExternalLink,
  ChevronRight,
  Globe,
  Zap
} from 'lucide-react';

export const App: React.FC = () => {
  // Persistence state
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(() => {
    const saved = localStorage.getItem('lively_wallpapers_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_WALLPAPERS;
      }
    }
    return INITIAL_WALLPAPERS;
  });

  const [displays, setDisplays] = useState<DisplayMonitor[]>(() => {
    const saved = localStorage.getItem('lively_displays_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DISPLAYS;
      }
    }
    return INITIAL_DISPLAYS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('lively_settings_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Navigation & Modal states - Default to 'catalog' so the user immediately sees the requested Online Catalog!
  const [currentTab, setCurrentTab] = useState<NavigationTab>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'votes' | 'downloads' | 'newest' | 'title'>('votes');

  const [inspectingWallpaper, setInspectingWallpaper] = useState<Wallpaper | null>(null);
  const [screensaverWallpaper, setScreensaverWallpaper] = useState<Wallpaper | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isWeImportModalOpen, setIsWeImportModalOpen] = useState(false);
  const [isInstallerWizardOpen, setIsInstallerWizardOpen] = useState(false);
  const [isLivelyExportModalOpen, setIsLivelyExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('lively_wallpapers_v2', JSON.stringify(wallpapers));
  }, [wallpapers]);

  useEffect(() => {
    localStorage.setItem('lively_displays_v2', JSON.stringify(displays));
  }, [displays]);

  useEffect(() => {
    localStorage.setItem('lively_settings_v2', JSON.stringify(settings));
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Primary active wallpaper
  const primaryDisplay = displays.find((d) => d.isPrimary) || displays[0];
  const activeDesktopWallpaper =
    wallpapers.find((w) => w.id === primaryDisplay?.assignedWallpaperId) || wallpapers[0];

  // Actions
  const handleSetAsActive = (wallpaper: Wallpaper) => {
    setDisplays((prev) =>
      prev.map((d) => (d.isPrimary ? { ...d, assignedWallpaperId: wallpaper.id } : d))
    );
    // Auto-mark as installed
    setWallpapers((prev) =>
      prev.map((w) => (w.id === wallpaper.id ? { ...w, isInstalled: true } : w))
    );
    showToast(`Обои "${wallpaper.title}" установлены на рабочий стол!`);
  };

  const handleAssignToDisplay = (displayId: string, wallpaperId: string) => {
    setDisplays((prev) =>
      prev.map((d) => (d.id === displayId ? { ...d, assignedWallpaperId: wallpaperId } : d))
    );
    const chosen = wallpapers.find((w) => w.id === wallpaperId);
    showToast(`Обои "${chosen?.title}" привязаны к монитору ${displayId}`);
  };

  const handleToggleInstall = (wallpaper: Wallpaper) => {
    setWallpapers((prev) =>
      prev.map((w) => {
        if (w.id === wallpaper.id) {
          const next = !w.isInstalled;
          showToast(next ? `Добавлено в библиотеку: "${w.title}"` : `Удалено из библиотеки: "${w.title}"`);
          return {
            ...w,
            isInstalled: next,
            downloads: next ? w.downloads + 1 : w.downloads
          };
        }
        return w;
      })
    );
  };

  const handleVote = (wallpaper: Wallpaper) => {
    setWallpapers((prev) =>
      prev.map((w) => {
        if (w.id === wallpaper.id) {
          const wasUp = w.userVoted === 'up';
          return {
            ...w,
            userVoted: wasUp ? undefined : 'up',
            voteCount: wasUp ? w.voteCount - 1 : w.voteCount + 1
          };
        }
        return w;
      })
    );
  };

  const handlePropertiesChange = (wallpaperId: string, updatedProps: LivelyProperties) => {
    setWallpapers((prev) =>
      prev.map((w) => (w.id === wallpaperId ? { ...w, properties: updatedProps } : w))
    );
    if (inspectingWallpaper?.id === wallpaperId) {
      setInspectingWallpaper((prev) => (prev ? { ...prev, properties: updatedProps } : null));
    }
  };

  const handleAddWallpaper = (newWallpaper: Wallpaper) => {
    setWallpapers([newWallpaper, ...wallpapers]);
    showToast(`Обои "${newWallpaper.title}" добавлены в каталог и библиотеку!`);
  };

  const installedCount = wallpapers.filter((w) => w.isInstalled).length;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1c1d22] text-[#e0e2ec] overflow-hidden select-none font-sans">
      {/* Windows 11 Titlebar */}
      <TitleBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenScreensaver={() => setScreensaverWallpaper(activeDesktopWallpaper)}
        onOpenInstaller={() => setIsInstallerWizardOpen(true)}
        installedCount={installedCount}
      />

      {/* Main App Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar with dedicated Online Catalog tab */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          installedCount={installedCount}
          totalCatalogCount={wallpapers.length}
          onOpenWeImport={() => setIsWeImportModalOpen(true)}
          onOpenInstallerWizard={() => setIsInstallerWizardOpen(true)}
          onOpenLivelyExport={() => setIsLivelyExportModalOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#18191d] flex flex-col">
          {/* TAB 1: ONLINE CATALOG (ОНЛАЙН КАТАЛОГ С РАЗНЫМИ ИСТОЧНИКАМИ) */}
          {currentTab === 'catalog' && (
            <OnlineCatalogView
              wallpapers={wallpapers}
              activeWallpaperId={activeDesktopWallpaper.id}
              onSelect={setInspectingWallpaper}
              onSetAsActive={handleSetAsActive}
              onToggleInstall={handleToggleInstall}
              onOpenProperties={setInspectingWallpaper}
              onVote={handleVote}
              onOpenWeImport={() => setIsWeImportModalOpen(true)}
              onOpenSubmit={() => setIsSubmitModalOpen(true)}
              onOpenLivelyExport={() => setIsLivelyExportModalOpen(true)}
            />
          )}

          {/* TAB 2: FEATURED & HOME */}
          {currentTab === 'featured' && (
            <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
              {/* Hero Banner with Lively Artwork */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-indigo-950/60 p-8 shadow-2xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0078d4]/20 text-[#0078d4] border border-[#0078d4]/40 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lively Wallpaper v2.1 • Поддержка Wallpaper Engine</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                    Живые обои на рабочий стол из любых источников.
                  </h1>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Онлайн каталог живых обоев с интеграцией сцен Wallpaper Engine, 4K видео из MyLiveWallpapers и MoeWalls, интерактивных WebGL-шейдеров и нативного движка Lively.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setCurrentTab('catalog')}
                      className="px-5 py-2.5 rounded-xl bg-[#0078d4] hover:bg-[#1084d8] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#0078d4]/20 transition-all hover:scale-105"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Открыть Онлайн Каталог</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsWeImportModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/40 text-sky-200 text-xs font-semibold flex items-center gap-2 border border-sky-500/40 transition-colors"
                    >
                      <Zap className="w-4 h-4 text-sky-400" />
                      <span>Импорт Wallpaper Engine</span>
                    </button>

                    <button
                      onClick={() => setCurrentTab('desktop')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
                    >
                      <Monitor className="w-4 h-4 text-emerald-400" />
                      <span>Симулятор рабочего стола</span>
                    </button>
                  </div>
                </div>

                {/* Decorative background overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none overflow-hidden hidden md:block">
                  <img
                    src="/resources/figma_promo_16x9.jpg"
                    alt="Lively Artwork"
                    className="w-full h-full object-cover object-left"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/logo/splash.png';
                    }}
                  />
                </div>
              </div>

              {/* Weekly Spotlight Showcase */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <h2 className="text-base font-semibold text-white">Популярные живые обои недели</h2>
                  </div>
                  <button
                    onClick={() => setCurrentTab('catalog')}
                    className="text-xs text-[#0078d4] hover:underline flex items-center gap-1"
                  >
                    <span>Перейти в каталог</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wallpapers.slice(0, 3).map((w) => (
                    <WallpaperCard
                      key={w.id}
                      wallpaper={w}
                      isActiveWallpaper={w.id === activeDesktopWallpaper.id}
                      onSelect={setInspectingWallpaper}
                      onSetAsActive={handleSetAsActive}
                      onToggleInstall={handleToggleInstall}
                      onOpenProperties={setInspectingWallpaper}
                      onVote={handleVote}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISPLAY SIMULATOR */}
          {currentTab === 'desktop' && (
            <DesktopSimulator
              displays={displays}
              wallpapers={wallpapers}
              onAssignWallpaper={handleAssignToDisplay}
              onOpenProperties={setInspectingWallpaper}
              onLaunchScreensaver={setScreensaverWallpaper}
            />
          )}

          {/* TAB 4: MY LIBRARY (МОЯ БИБЛИОТЕКА) */}
          {currentTab === 'library' && (
            <div className="p-6 space-y-6 max-w-7xl mx-auto w-full flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <FolderHeart className="w-5 h-5 text-rose-400" />
                    <span>Моя библиотека живых обоев ({installedCount})</span>
                  </h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Установленные обои из каталога, Wallpaper Engine и персональные загрузки.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWeImportModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Импорт WE</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('catalog')}
                    className="px-4 py-2 rounded-xl bg-[#0078d4] hover:bg-[#1084d8] text-white text-xs font-semibold flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить из каталога</span>
                  </button>
                </div>
              </div>

              {/* Grid of installed wallpapers */}
              {wallpapers.filter((w) => w.isInstalled).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wallpapers
                    .filter((w) => w.isInstalled)
                    .map((w) => (
                      <WallpaperCard
                        key={w.id}
                        wallpaper={w}
                        isActiveWallpaper={w.id === activeDesktopWallpaper.id}
                        onSelect={setInspectingWallpaper}
                        onSetAsActive={handleSetAsActive}
                        onToggleInstall={handleToggleInstall}
                        onOpenProperties={setInspectingWallpaper}
                        onVote={handleVote}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-[#202127] border border-white/5 rounded-2xl flex-1">
                  <FolderHeart className="w-10 h-10 text-neutral-500 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Ваша библиотека пуста</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                    Перейдите во вкладку «Онлайн каталог», чтобы выбрать и скачать понравившиеся обои.
                  </p>
                  <button
                    onClick={() => setCurrentTab('catalog')}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#0078d4] text-white text-xs font-semibold"
                  >
                    Открыть Онлайн каталог
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SUBMIT WALLPAPER */}
          {currentTab === 'submit' && (
            <div className="p-6 max-w-2xl mx-auto w-full">
              <SubmitWallpaperModal
                onClose={() => setCurrentTab('catalog')}
                onSubmit={handleAddWallpaper}
              />
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {currentTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={(newVals) => setSettings({ ...settings, ...newVals })}
            />
          )}

          {/* TAB 7: RELEASES & INSTALLER CENTER */}
          {currentTab === 'releases' && (
            <ReleasesView
              onOpenInstallerWizard={() => setIsInstallerWizardOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Wallpaper Detail & Customization Modal with Download Sources & WE Tabs */}
      {inspectingWallpaper && (
        <WallpaperModal
          wallpaper={inspectingWallpaper}
          isActiveWallpaper={inspectingWallpaper.id === activeDesktopWallpaper.id}
          onClose={() => setInspectingWallpaper(null)}
          onSetAsActive={handleSetAsActive}
          onToggleInstall={handleToggleInstall}
          onPropertiesChange={handlePropertiesChange}
          onVote={handleVote}
          onLaunchScreensaver={setScreensaverWallpaper}
        />
      )}

      {/* Screensaver Fullscreen Modal */}
      {screensaverWallpaper && (
        <ScreensaverModal
          wallpaper={screensaverWallpaper}
          onClose={() => setScreensaverWallpaper(null)}
        />
      )}

      {/* Standalone Submit Modal */}
      {isSubmitModalOpen && (
        <SubmitWallpaperModal
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleAddWallpaper}
        />
      )}

      {/* Wallpaper Engine Import Modal */}
      {isWeImportModalOpen && (
        <WeImportModal
          onClose={() => setIsWeImportModalOpen(false)}
          onImport={handleAddWallpaper}
        />
      )}

      {/* Program Installer Wizard Modal (Inno Setup) */}
      {isInstallerWizardOpen && (
        <InstallerWizardModal
          onClose={() => setIsInstallerWizardOpen(false)}
          onLaunchApp={() => {
            setCurrentTab('catalog');
            showToast('Lively Wallpaper v2.1.0 запущен и готов к работе!');
          }}
        />
      )}

      {/* Local Installed Lively Export Guide Modal */}
      {isLivelyExportModalOpen && (
        <LivelyLocalExportModal
          onClose={() => setIsLivelyExportModalOpen(false)}
        />
      )}

      {/* Bottom Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#2b2c34] text-white text-xs font-medium border border-white/15 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
export default App;

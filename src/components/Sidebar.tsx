import React from 'react';
import {
  Globe,
  Sparkles,
  Monitor,
  FolderHeart,
  PlusCircle,
  Settings,
  ExternalLink,
  Layers,
  Zap,
  Download
} from 'lucide-react';

export type NavigationTab = 'catalog' | 'featured' | 'desktop' | 'library' | 'submit' | 'settings' | 'releases';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  installedCount: number;
  totalCatalogCount: number;
  onOpenWeImport: () => void;
  onOpenInstallerWizard: () => void;
  onOpenLivelyExport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  installedCount,
  totalCatalogCount,
  onOpenWeImport,
  onOpenInstallerWizard,
  onOpenLivelyExport
}) => {
  const navItems = [
    {
      id: 'catalog' as NavigationTab,
      label: 'Галерея',
      sublabel: 'Онлайн каталог (5 источников)',
      icon: Globe,
      badge: 'Вместо «Скоро»',
      count: totalCatalogCount
    },
    {
      id: 'library' as NavigationTab,
      label: 'Библиотека',
      sublabel: 'Установленные обои',
      icon: FolderHeart,
      count: installedCount
    },
    {
      id: 'featured' as NavigationTab,
      label: 'Рекомендации',
      sublabel: 'Топ недели',
      icon: Sparkles
    },
    {
      id: 'desktop' as NavigationTab,
      label: 'Дисплеи и Мониторы',
      sublabel: 'Display Simulator',
      icon: Monitor
    },
    {
      id: 'releases' as NavigationTab,
      label: 'Релизы & Установщик',
      sublabel: 'Setup & Downloads',
      icon: Download,
      badge: 'v2.1.0'
    },
    {
      id: 'submit' as NavigationTab,
      label: 'Добавить обои',
      sublabel: 'Add Wallpaper',
      icon: PlusCircle
    }
  ];

  return (
    <aside className="w-60 bg-[#1e1f24] border-r border-white/10 flex flex-col justify-between p-2.5 flex-shrink-0 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase flex items-center justify-between">
          <span>Навигация Lively</span>
          <span className="text-[10px] text-sky-400 font-mono">v2.1</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#0078d4] text-white shadow-sm'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <Icon
                  className={`w-4 h-4 transition-colors flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}
                />
                <div>
                  <div className="font-semibold leading-tight">{item.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-sky-100' : 'text-neutral-500'}`}>
                    {item.sublabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && !isActive && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300 border border-sky-500/20 font-normal">
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Quick Action Buttons */}
        <div className="pt-2 space-y-1.5">
          <button
            onClick={onOpenWeImport}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-300 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>Импорт Wallpaper Engine</span>
            </div>
            <span className="text-[10px] font-mono bg-sky-500/20 px-1 py-0.2 rounded text-sky-200">
              Steam
            </span>
          </button>

          <button
            onClick={onOpenInstallerWizard}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-[#0078d4]/20 to-sky-500/15 hover:from-[#0078d4]/30 hover:to-sky-500/25 border border-[#0078d4]/30 text-white text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-[#0078d4]" />
              <span>Установщик Setup.exe</span>
            </div>
            <span className="text-[10px] font-mono bg-[#0078d4]/30 px-1.5 py-0.2 rounded text-sky-200">
              Inno
            </span>
          </button>

          <button
            onClick={onOpenLivelyExport}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <FolderHeart className="w-3.5 h-3.5 text-emerald-400" />
              <span>Добавить в Lively на ПК</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.2 rounded text-emerald-200">
              Гайд
            </span>
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="space-y-1.5 border-t border-white/10 pt-2.5">
        <button
          onClick={() => onTabChange('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
            currentTab === 'settings'
              ? 'bg-[#0078d4] text-white'
              : 'text-neutral-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 text-neutral-400" />
          <span>Настройки & Правила</span>
        </button>

        {/* Info card */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-neutral-300">
            <span className="font-semibold">Источники: 5</span>
            <span className="text-emerald-400 text-[10px] font-medium">Активны</span>
          </div>
          <p className="text-[10px] text-neutral-400 leading-tight">
            Lively • Wallpaper Engine • MoeWalls • MyLiveWallpapers • Shadertoy
          </p>
        </div>
      </div>
    </aside>
  );
};

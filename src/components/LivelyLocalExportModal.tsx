import React, { useState } from 'react';
import {
  X,
  Folder,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Info,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LivelyLocalExportModalProps {
  onClose: () => void;
}

export const LivelyLocalExportModal: React.FC<LivelyLocalExportModalProps> = ({
  onClose
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleDownloadBatchHelper = () => {
    const batContent = `@echo off
chcp 65001 > nul
title Lively Wallpaper - Импорт обоев в библиотеку
echo ================================================================
echo    Lively Wallpaper: Перенос обоев из Онлайн-Каталога
echo ================================================================
echo.
echo Открытие системной папки библиотеки Lively Wallpaper...
start "" "%LocalAppData%\\Lively Wallpaper\\Library\\wallpapers"
echo.
echo Папка библиотеки открыта!
echo Теперь просто перетащите сюда скачанные архивы обоев (.zip)
echo или откройте окно Lively и перетащите файл прямо на рабочий стол программы.
echo.
pause
`;
    const blob = new Blob([batContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Open_Lively_Wallpapers_Folder.cmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#22232a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-5 bg-[#1b1c21] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">
              Как добавить обои в установленный на ПК Lively Wallpaper
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Explanation Banner */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 leading-relaxed space-y-1">
            <div className="font-semibold text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Почему в установленной программе в Галерее написано «Скоро»?</span>
            </div>
            <p className="text-[11px] text-neutral-300">
              В официальном дистрибутиве разработчик Lively временно отключил сервер онлайн-галереи и оставил заглушку «Скоро». Наш веб-каталог — это полнофункциональная реализация онлайн-каталога, откуда вы можете скачать любые обои и мгновенно перенести в вашу программу!
            </p>
          </div>

          {/* 3 Simple Steps */}
          <div className="space-y-3 pt-1">
            <h3 className="font-semibold text-white text-xs">3 простых способа перенести обои в программу:</h3>

            {/* Method 1 */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="w-5 h-5 rounded-full bg-[#0078d4] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Способ 1: Перетаскивание (Drag & Drop) — Самый быстрый</span>
              </div>
              <p className="text-neutral-400 text-[11px] pl-7">
                Нажмите <strong>«Скачать (Lively .zip)»</strong> у любых обоев в каталоге, затем откройте установленный Lively на компьютере и просто <strong>перетащите скачанный файл мышкой</strong> в окно Lively. Обои автоматически установятся и запустятся!
              </p>
            </div>

            {/* Method 2 */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="w-5 h-5 rounded-full bg-[#0078d4] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Способ 2: Через кнопку «+» в самом Lively</span>
              </div>
              <p className="text-neutral-400 text-[11px] pl-7">
                В окне программы Lively нажмите значок <strong>«+» (Добавить обои)</strong> в левом меню, нажмите кнопку <strong>«Обзор» (Browse)</strong> и выберите скачанный архив <code>.zip</code> или файл <code>.mp4</code>.
              </p>
            </div>

            {/* Method 3 */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="w-5 h-5 rounded-full bg-[#0078d4] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Способ 3: Открыть системную папку библиотеки обоев</span>
              </div>
              <p className="text-neutral-400 text-[11px] pl-7">
                Папка, куда Lively сохраняет обои в Windows:
              </p>
              <div className="bg-[#18191e] p-2.5 rounded-lg font-mono text-neutral-300 text-[11px] flex items-center justify-between ml-7 border border-white/10">
                <span className="truncate mr-2">%LocalAppData%\Lively Wallpaper\Library\wallpapers</span>
                <button
                  onClick={() => copyToClipboard('%LocalAppData%\\Lively Wallpaper\\Library\\wallpapers', 'dir')}
                  className="px-2 py-1 bg-white/10 hover:bg-white/15 text-white rounded text-[10px] flex items-center gap-1"
                >
                  {copiedCmd === 'dir' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd === 'dir' ? 'Скопировано!' : 'Копировать'}</span>
                </button>
              </div>

              <div className="ml-7 pt-1">
                <button
                  onClick={handleDownloadBatchHelper}
                  className="px-3.5 py-1.5 bg-[#0078d4] hover:bg-[#1084d8] text-white font-medium rounded-lg text-[11px] flex items-center gap-1.5 shadow"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>Открыть папку обоев Lively (Скрипт .cmd)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-12 border-t border-white/10 px-5 flex items-center justify-between bg-[#1b1c21]">
          <span className="text-[11px] text-neutral-400">
            Поддерживаются архивы .zip с файлом <code>LivelyInfo.json</code> и сцены Wallpaper Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white font-semibold"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

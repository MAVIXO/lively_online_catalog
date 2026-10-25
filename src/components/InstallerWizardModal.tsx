import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Check,
  Folder,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  HardDrive,
  Monitor,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';

interface InstallerWizardModalProps {
  onClose: () => void;
  onLaunchApp?: () => void;
}

export const InstallerWizardModal: React.FC<InstallerWizardModalProps> = ({
  onClose,
  onLaunchApp
}) => {
  const [step, setStep] = useState<number>(1);
  const [installPath, setInstallPath] = useState('C:\\Program Files\\Lively Wallpaper');
  const [startWithWindows, setStartWithWindows] = useState(true);
  const [createDesktopShortcut, setCreateDesktopShortcut] = useState(true);
  const [installWeBridge, setInstallWeBridge] = useState(true);
  const [installMpvPlayer, setInstallMpvPlayer] = useState(true);
  const [installScreensaver, setInstallScreensaver] = useState(true);

  // Progress state for step 4 (Installing)
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('Подготовка к распаковке файлов...');

  useEffect(() => {
    if (step === 4) {
      setProgress(0);
      const files = [
        'Lively.exe (Core Desktop Engine)',
        'Lively.Common.dll',
        'Lively.Player.Mpv.exe (Hardware Codec)',
        'Lively.Player.WebView2.dll',
        'WallpaperEngineBridge.dll (Steam Compatibility)',
        'Lively.Screensaver.scr',
        'Plugins/Mpv/libmpv-2.dll',
        'Resources/wallpapers/fluid-neon.zip',
        'Resources/wallpapers/synthwave-horizon.zip',
        'Регистрация служб автозапуска Windows...',
        'Создание ярлыков на рабочем столе...',
        'Завершение установки Lively Wallpaper v2.1.0'
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex++;
        const percent = Math.min(100, Math.round((currentIndex / files.length) * 100));
        setProgress(percent);
        if (currentIndex < files.length) {
          setCurrentFile(`Извлечение: ${files[currentIndex]}`);
        } else {
          clearInterval(interval);
          setCurrentFile('Установка успешно завершена!');
          setTimeout(() => setStep(5), 600);
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Actual browser download of the installer package
  const handleDownloadActualInstaller = () => {
    const a = document.createElement('a');
    a.href = '/releases/Lively.Setup.x64.v2.1.0.exe';
    a.download = 'Lively.Setup.x64.v2.1.0.exe';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#23242b] border border-white/15 rounded-xl shadow-2xl flex flex-col overflow-hidden text-xs">
        {/* Windows Setup Wizard Titlebar */}
        <div className="h-10 bg-[#1a1b20] border-b border-white/10 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/icon-lively-300.png"
              alt="Lively Setup"
              className="w-4 h-4 object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-medium text-white text-[11px]">
              Мастер установки — Lively Wallpaper v2.1.0 (x64)
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Wizard Header Banner */}
        <div className="h-16 bg-[#1f2026] border-b border-white/10 px-6 flex items-center justify-between">
          <div>
            <div className="font-semibold text-white text-xs">
              {step === 1 && 'Лицензионное соглашение и информация'}
              {step === 2 && 'Выбор папки установки'}
              {step === 3 && 'Выбор компонентов и опций'}
              {step === 4 && 'Установка программы...'}
              {step === 5 && 'Мастер установки завершил работу'}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              {step === 1 && 'Пожалуйста, ознакомьтесь с условиями лицензии GNU GPL-3.0.'}
              {step === 2 && 'Укажите папку, в которую будет установлен Lively Wallpaper.'}
              {step === 3 && 'Выберите дополнительные модули для лучшей совместимости.'}
              {step === 4 && 'Пожалуйста, подождите, пока файлы распаковываются.'}
              {step === 5 && 'Lively Wallpaper успешно установлен на ваш компьютер.'}
            </div>
          </div>

          <img
            src="/assets/logo/wizard_small.bmp"
            alt="Wizard Icon"
            className="w-10 h-10 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Wizard Main Content Body */}
        <div className="p-6 h-[290px] overflow-y-auto space-y-4">
          {/* STEP 1: LICENSE */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-neutral-300">
                Добро пожаловать в установщик <strong>Lively Wallpaper v2.1.0</strong> с поддержкой Онлайн-каталога и мастерской Wallpaper Engine.
              </p>

              <div className="p-3 bg-[#18191e] border border-white/10 rounded-lg max-h-36 overflow-y-auto font-mono text-[10px] text-neutral-400 leading-relaxed">
                GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
                <br /><br />
                Copyright (C) 2025 rocksDanister & Lively Contributors.
                <br /><br />
                Everyone is permitted to copy and distribute verbatim copies
                of this license document.
                <br /><br />
                This program comes with ABSOLUTELY NO WARRANTY. It is free software,
                and you are welcome to redistribute it under certain conditions.
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Полностью открытый исходный код • Без рекламы • 0% нагрузка в играх</span>
              </div>
            </div>
          )}

          {/* STEP 2: DESTINATION PATH */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-neutral-300">
                Программа будет установлена в следующую папку:
              </p>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#18191e] border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs flex items-center gap-2">
                    <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={installPath}
                      onChange={(e) => setInstallPath(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-white text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setInstallPath('C:\\Program Files\\Lively Wallpaper')}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-white font-medium"
                  >
                    По умолчанию
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/5 rounded-lg space-y-1 text-[11px] text-neutral-400">
                <div className="flex justify-between">
                  <span>Требуется на диске:</span>
                  <span className="font-mono text-white font-semibold">480 МБ</span>
                </div>
                <div className="flex justify-between">
                  <span>Доступно на диске C:</span>
                  <span className="font-mono text-white font-semibold">124.6 ГБ</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COMPONENTS */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-neutral-300 font-medium">
                Выберите компоненты и задачи для установки:
              </p>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-semibold text-white">Мост совместимости Wallpaper Engine</div>
                      <div className="text-[10px] text-neutral-400">Поддержка Steam Workshop, project.json и WebGL сцен</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={installWeBridge}
                    onChange={(e) => setInstallWeBridge(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0078d4] accent-[#0078d4]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Плеер MPV с аппаратным ускорением GPU</div>
                      <div className="text-[10px] text-neutral-400">Декодирование 4K 60FPS без нагрузки на процессор</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={installMpvPlayer}
                    onChange={(e) => setInstallMpvPlayer(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0078d4] accent-[#0078d4]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <HardDrive className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">Модуль заставки Windows (Screensaver)</div>
                      <div className="text-[10px] text-neutral-400">Запуск любого фона в режиме блокировки экрана</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={installScreensaver}
                    onChange={(e) => setInstallScreensaver(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0078d4] accent-[#0078d4]"
                  />
                </label>
              </div>

              <div className="pt-1 flex gap-4 text-neutral-300 text-[11px]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={startWithWindows}
                    onChange={(e) => setStartWithWindows(e.target.checked)}
                    className="rounded accent-[#0078d4]"
                  />
                  <span>Автозапуск с Windows</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createDesktopShortcut}
                    onChange={(e) => setCreateDesktopShortcut(e.target.checked)}
                    className="rounded accent-[#0078d4]"
                  />
                  <span>Создать ярлык</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: INSTALLATION PROGRESS */}
          {step === 4 && (
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-white">Распаковка и установка компонентов...</span>
                  <span className="font-mono text-[#0078d4] font-semibold">{progress}%</span>
                </div>

                <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#0078d4] to-sky-400 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-[#18191e] border border-white/10 rounded-lg font-mono text-[11px] text-neutral-400 truncate">
                {currentFile}
              </div>

              <div className="text-[11px] text-neutral-400 leading-relaxed">
                Пожалуйста, не закрывайте мастер установки. Применяются правила безопасности Windows DWM и создаются службы перехвата фонового окна.
              </div>
            </div>
          )}

          {/* STEP 5: FINISHED */}
          {step === 5 && (
            <div className="space-y-4 py-2 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">Установка успешно завершена!</h3>
                <p className="text-[11px] text-neutral-300 mt-1 max-w-sm mx-auto">
                  Lively Wallpaper v2.1.0 готов к запуску. Онлайн каталог и модуль Wallpaper Engine активированы.
                </p>
              </div>

              {/* Download Actual .exe button */}
              <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl max-w-md mx-auto space-y-2">
                <div className="text-[11px] text-sky-300 font-medium">
                  Желаете также сохранить установочный файл на ваш ПК?
                </div>
                <button
                  onClick={handleDownloadActualInstaller}
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium flex items-center gap-1.5 mx-auto transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать Lively.Setup.x64.exe (240 MB)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="h-14 bg-[#1a1b20] border-t border-white/10 px-5 flex items-center justify-between">
          <button
            onClick={handleDownloadActualInstaller}
            className="flex items-center gap-1 text-[11px] text-[#0078d4] hover:underline"
            title="Скачать официальный установщик"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать файл Setup.exe</span>
          </button>

          <div className="flex items-center gap-2">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Назад</span>
              </button>
            )}

            {step < 3 && (
              <button
                onClick={() => setStep(step + 1)}
                className="px-4 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white font-medium flex items-center gap-1 shadow"
              >
                <span>Далее</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                onClick={() => setStep(4)}
                className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 shadow"
              >
                <span>Установить</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 5 && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchApp?.();
                }}
                className="px-5 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white font-semibold flex items-center gap-1 shadow"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Запустить программу</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

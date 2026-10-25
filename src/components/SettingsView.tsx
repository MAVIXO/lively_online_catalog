import React, { useState } from 'react';
import { AppSettings } from '../types';
import {
  Settings,
  BatteryCharging,
  Maximize2,
  Volume2,
  Film,
  Monitor,
  Moon,
  Clock,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Palette
} from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [activeCategory, setActiveCategory] = useState<'performance' | 'wallpaper' | 'system' | 'screensaver'>('performance');
  const [savedNotice, setSavedNotice] = useState(false);

  const showSavedBadge = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleChange = (key: keyof AppSettings, val: any) => {
    onUpdateSettings({ [key]: val });
    showSavedBadge();
  };

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#0078d4]" />
            Lively Settings & Performance Rules
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure automated playback algorithms, hardware acceleration, and taskbar visual themes.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Rules Applied</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveCategory('performance')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'performance'
              ? 'bg-[#0078d4] text-white shadow'
              : 'text-neutral-300 hover:bg-white/5'
          }`}
        >
          <BatteryCharging className="w-4 h-4" />
          <span>Performance & Automation</span>
        </button>

        <button
          onClick={() => setActiveCategory('wallpaper')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'wallpaper'
              ? 'bg-[#0078d4] text-white shadow'
              : 'text-neutral-300 hover:bg-white/5'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Wallpaper Engines</span>
        </button>

        <button
          onClick={() => setActiveCategory('screensaver')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'screensaver'
              ? 'bg-[#0078d4] text-white shadow'
              : 'text-neutral-300 hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Screensaver</span>
        </button>

        <button
          onClick={() => setActiveCategory('system')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'system'
              ? 'bg-[#0078d4] text-white shadow'
              : 'text-neutral-300 hover:bg-white/5'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>System & Taskbar</span>
        </button>
      </div>

      {/* Settings Content */}
      <div className="space-y-4">
        {activeCategory === 'performance' && (
          <div className="space-y-3">
            {/* Rule 1 */}
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0078d4]" />
                  Pause when fullscreen applications are running
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Wallpaper completely pauses and frees GPU/CPU when gaming or watching movies (0% overhead).
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChange('pauseOnFullscreen', !settings.pauseOnFullscreen)}
                className={`w-10 h-5.5 flex items-center rounded-full p-0.5 transition-colors ${
                  settings.pauseOnFullscreen ? 'bg-[#0078d4]' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    settings.pauseOnFullscreen ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Rule 2 */}
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                  Pause when running on laptop battery
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Preserves battery life by suspending animated wallpaper playback on DC power.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChange('pauseOnBattery', !settings.pauseOnBattery)}
                className={`w-10 h-5.5 flex items-center rounded-full p-0.5 transition-colors ${
                  settings.pauseOnBattery ? 'bg-[#0078d4]' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    settings.pauseOnBattery ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Rule 3 */}
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  Audio Pause Algorithm
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  How wallpaper audio behaves when other media or music players are actively producing sound.
                </p>
              </div>
              <select
                value={settings.audioPauseAlgorithm}
                onChange={(e) => handleChange('audioPauseAlgorithm', e.target.value)}
                className="bg-[#1b1c21] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value="pause">Pause Wallpaper Audio</option>
                <option value="mute">Mute Wallpaper Volume</option>
                <option value="duck">Duck Wallpaper Audio (-80%)</option>
              </select>
            </div>
          </div>
        )}

        {activeCategory === 'wallpaper' && (
          <div className="space-y-3">
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Video Player Backend</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Engine used to decode video files with hardware acceleration.
                </p>
              </div>
              <select
                value={settings.videoPlayerEngine}
                onChange={(e) => handleChange('videoPlayerEngine', e.target.value)}
                className="bg-[#1b1c21] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value="mpv">MPV Player (Hardware Accelerated)</option>
                <option value="vlc">VLC Media Engine</option>
                <option value="web">Chromium Video Decoders</option>
              </select>
            </div>

            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Framerate Cap</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Target rendering framerate for interactive WebGL & Canvas wallpapers.
                </p>
              </div>
              <select
                value={settings.targetFps}
                onChange={(e) => handleChange('targetFps', parseInt(e.target.value))}
                className="bg-[#1b1c21] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value={30}>30 FPS (Power Saver)</option>
                <option value={60}>60 FPS (Balanced Smooth)</option>
                <option value={120}>120 FPS (High Refresh Rate)</option>
                <option value={144}>144 FPS (Ultra Smooth)</option>
              </select>
            </div>
          </div>
        )}

        {activeCategory === 'screensaver' && (
          <div className="space-y-3">
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Screensaver Idle Timeout</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Minutes of inactivity before Lively automatically transitions into full-screen screensaver.
                </p>
              </div>
              <select
                value={settings.screensaverIdleMinutes}
                onChange={(e) => handleChange('screensaverIdleMinutes', parseInt(e.target.value))}
                className="bg-[#1b1c21] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value={2}>2 Minutes</option>
                <option value={5}>5 Minutes</option>
                <option value={10}>10 Minutes (Default)</option>
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
              </select>
            </div>
          </div>
        )}

        {activeCategory === 'system' && (
          <div className="space-y-3">
            <div className="p-4 bg-[#23242a] border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Windows Taskbar Theme Integration</div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Applies dynamic DWM translucent backdrop to Windows taskbar.
                </p>
              </div>
              <select
                value={settings.taskbarTheme}
                onChange={(e) => handleChange('taskbarTheme', e.target.value)}
                className="bg-[#1b1c21] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value="acrylic">Acrylic Glass (Windows 11)</option>
                <option value="clear">Clear (100% Transparent)</option>
                <option value="blur">Blur (Mica)</option>
                <option value="opaque">Opaque Solid</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

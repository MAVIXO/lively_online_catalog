export type WallpaperType = 
  | 'video' 
  | 'web' 
  | 'webaudio' 
  | 'shadertoy' 
  | 'depth' 
  | 'app' 
  | 'gif';

export type WallpaperSourcePlatform = 
  | 'lively' 
  | 'wallpaper_engine' 
  | 'moewalls' 
  | 'mylivewallpapers' 
  | 'shadertoy';

export interface DownloadSource {
  id: string;
  name: string;
  provider: WallpaperSourcePlatform;
  format: 'ZIP (Lively)' | 'PKG (Wallpaper Engine)' | 'MP4 4K' | 'WebM' | 'HTML5 Bundle';
  size: string;
  speed: 'Ultra Fast (CDN)' | 'Fast (GitHub)' | 'Steam Workshop' | 'High Speed Mirror';
  url: string;
  resolution: string;
  isOfficial?: boolean;
}

export type LivelyControlProperty = 
  | {
      type: 'slider';
      text: string;
      value: number;
      min: number;
      max: number;
      step?: number;
      default: number;
    }
  | {
      type: 'checkbox';
      text: string;
      value: boolean;
      default: boolean;
    }
  | {
      type: 'color';
      text: string;
      value: string;
      default: string;
    }
  | {
      type: 'dropdown';
      text: string;
      value: string;
      options: string[];
      default: string;
    };

export type LivelyProperties = Record<string, LivelyControlProperty>;

export interface WallpaperEngineMetadata {
  supported: boolean;
  workshopId?: string;
  version?: number;
  type: 'Scene' | 'Web' | 'Video' | 'Application';
  contentRating?: 'Everyone' | 'Questionable';
  generalProperties?: Record<string, any>;
}

export interface Wallpaper {
  id: string;
  title: string;
  author: {
    username: string;
    avatar?: string;
    badge?: string;
  };
  license: string;
  type: WallpaperType;
  sourcePlatform: WallpaperSourcePlatform;
  description: string;
  tags: string[];
  thumbnail: string;
  previewMedia?: string;
  isInteractive: boolean;
  canvasPreset?: 'fluid' | 'matrix' | 'synthwave' | 'galaxy' | 'hud' | 'depth' | 'rain';
  fileSize: string;
  resolution: string;
  fps: number;
  voteCount: number;
  userVoted?: 'up' | 'down';
  downloads: number;
  isInstalled?: boolean;
  isCustom?: boolean;
  properties: LivelyProperties;
  downloadSources: DownloadSource[];
  wallpaperEngine?: WallpaperEngineMetadata;
  dateAdded: string;
}

export interface DisplayMonitor {
  id: string;
  name: string;
  resolution: string;
  width: number;
  height: number;
  isPrimary: boolean;
  assignedWallpaperId: string;
}

export type TaskbarTheme = 'clear' | 'acrylic' | 'blur' | 'opaque' | 'fluent';

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  language: 'ru' | 'en';
  pauseOnBattery: boolean;
  pauseOnFullscreen: boolean;
  pauseOnFocusLoss: boolean;
  videoPlayerEngine: 'mpv' | 'vlc' | 'web';
  audioPauseAlgorithm: 'pause' | 'mute' | 'duck';
  taskbarTheme: TaskbarTheme;
  screensaverIdleMinutes: number;
  streamQuality: 'auto' | '1080p' | '1440p' | '4k';
  targetFps: number;
  wallpaperEngineCompatMode: boolean;
}

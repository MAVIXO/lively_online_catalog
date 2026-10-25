import { Wallpaper } from '../types';
import { ADDITIONAL_WALLPAPERS_POOL } from './moreWallpapers';

export const INITIAL_WALLPAPERS: Wallpaper[] = [
  ...ADDITIONAL_WALLPAPERS_POOL,
  {
    id: 'cyberpunk-neon-street-we',
    title: 'Cyberpunk 2077 Night City Rain (WE Scene)',
    author: {
      username: 'VisualAesthetic',
      badge: 'WE Master'
    },
    license: 'Wallpaper Engine Community',
    type: 'web',
    sourcePlatform: 'wallpaper_engine',
    description: 'Iconic Steam Workshop Wallpaper Engine scene with customizable volumetric neon signs, puddle reflections, audio pulse, and rain droplet physics.',
    tags: ['Wallpaper Engine', 'Cyberpunk', 'Rain', 'Steam Workshop', 'Neon', 'Sci-Fi'],
    thumbnail: '/assets/screenshots/mtv_2 (Large).png',
    previewMedia: '/resources/wallpaper_gif.gif',
    isInteractive: true,
    canvasPreset: 'rain',
    fileSize: '14.8 MB',
    resolution: '3840 x 2160 (4K)',
    fps: 60,
    voteCount: 4210,
    downloads: 142000,
    isInstalled: true,
    dateAdded: '2025-02-12',
    wallpaperEngine: {
      supported: true,
      workshopId: '2849102941',
      version: 1,
      type: 'Scene',
      contentRating: 'Everyone'
    },
    properties: {
      rainIntensity: {
        type: 'slider',
        text: 'Rain Drop Density',
        value: 1.8,
        min: 0.5,
        max: 3.5,
        step: 0.1,
        default: 1.8
      },
      neonGlow: {
        type: 'color',
        text: 'Neon Billboard Accent',
        value: '#00f0ff',
        default: '#00f0ff'
      },
      fogTint: {
        type: 'color',
        text: 'Atmospheric Fog',
        value: '#150d2a',
        default: '#150d2a'
      },
      interactiveCursor: {
        type: 'checkbox',
        text: 'Puddle Cursor Ripples',
        value: true,
        default: true
      }
    },
    downloadSources: [
      {
        id: 's-we-steam',
        name: 'Steam Workshop (Wallpaper Engine)',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '14.8 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2849102941',
        resolution: '4K (3840x2160)',
        isOfficial: true
      },
      {
        id: 's-we-lively',
        name: 'Lively Hub CDN Mirror',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '13.9 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://cdn.livelywallpaper.net/packages/cyberpunk-night-city.zip',
        resolution: '4K (3840x2160)',
        isOfficial: true
      },
      {
        id: 's-we-mlw',
        name: 'MyLiveWallpapers (Direct MP4)',
        provider: 'mylivewallpapers',
        format: 'MP4 4K',
        size: '18.2 MB',
        speed: 'High Speed Mirror',
        url: 'https://mylivewallpapers.com/cyberpunk-night-city-4k/',
        resolution: '4K 60FPS'
      }
    ]
  },
  {
    id: 'fluid-neon-smoke',
    title: 'Fluid Neon & Chroma Smoke',
    author: {
      username: 'rocksdanister',
      avatar: 'https://avatars.githubusercontent.com/u/10850233?v=4',
      badge: 'Creator'
    },
    license: 'MIT',
    type: 'web',
    sourcePlatform: 'lively',
    description: 'Real-time interactive fluid simulation responding to cursor movement, velocity, and touch dynamics. Features customizable dissipation, viscosity, and vivid dual-tone color gradients.',
    tags: ['Interactive', 'Fluid', 'Abstract', 'Neon', 'WebGL', 'Mouse Reactive'],
    thumbnail: '/assets/screenshots/fluid.png',
    previewMedia: '/resources/wallpaper_shadertoy.gif',
    isInteractive: true,
    canvasPreset: 'fluid',
    fileSize: '4.2 MB',
    resolution: '3840 x 2160 (4K)',
    fps: 60,
    voteCount: 2840,
    downloads: 58400,
    isInstalled: true,
    dateAdded: '2025-01-15',
    wallpaperEngine: {
      supported: true,
      workshopId: '2981034812',
      version: 1,
      type: 'Web'
    },
    properties: {
      speed: {
        type: 'slider',
        text: 'Simulation Speed',
        value: 1.2,
        min: 0.2,
        max: 3.0,
        step: 0.1,
        default: 1.2
      },
      color1: {
        type: 'color',
        text: 'Primary Neon Hue',
        value: '#00d2ff',
        default: '#00d2ff'
      },
      color2: {
        type: 'color',
        text: 'Secondary Glow',
        value: '#9b51e0',
        default: '#9b51e0'
      },
      dissipation: {
        type: 'slider',
        text: 'Smoke Dissipation',
        value: 0.96,
        min: 0.85,
        max: 0.99,
        step: 0.01,
        default: 0.96
      },
      mouseInteraction: {
        type: 'checkbox',
        text: 'Mouse Interaction',
        value: true,
        default: true
      }
    },
    downloadSources: [
      {
        id: 's-fluid-lively',
        name: 'Lively Official GitHub Release',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '4.2 MB',
        speed: 'Fast (GitHub)',
        url: 'https://github.com/rocksdanister/lively/releases/download/v2.1/fluid.zip',
        resolution: 'Adaptive 4K',
        isOfficial: true
      },
      {
        id: 's-fluid-we',
        name: 'Wallpaper Engine Workshop Export',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '4.1 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2981034812',
        resolution: 'Adaptive 4K'
      },
      {
        id: 's-fluid-shadertoy',
        name: 'Raw WebGL / HTML5 Bundle',
        provider: 'shadertoy',
        format: 'HTML5 Bundle',
        size: '1.2 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://shadertoy.com/view/fluid_neon',
        resolution: 'Vector / Canvas'
      }
    ]
  },
  {
    id: 'anime-lofi-room-moewalls',
    title: 'Anime Lofi Chill Room & Cat (MoeWalls)',
    author: {
      username: 'MoeStudio',
      badge: 'Anime Artist'
    },
    license: 'MoeWalls Creative',
    type: 'gif',
    sourcePlatform: 'moewalls',
    description: 'Relaxing aesthetic anime room with warm ambient lamp glow, purring cat on the windowsill, night rain, and gentle steaming tea animation.',
    tags: ['MoeWalls', 'Anime', 'Lofi', 'Chill', 'Cozy', 'Cat', 'Night'],
    thumbnail: '/assets/award/winner_banner_overlay_image_right_aligned.png',
    previewMedia: '/resources/wallpaper_gif.gif',
    isInteractive: true,
    canvasPreset: 'rain',
    fileSize: '12.4 MB',
    resolution: '2560 x 1440 (2K)',
    fps: 45,
    voteCount: 3190,
    downloads: 98500,
    isInstalled: false,
    dateAdded: '2025-02-08',
    wallpaperEngine: {
      supported: true,
      workshopId: '2748194012',
      version: 1,
      type: 'Video',
      contentRating: 'Everyone'
    },
    properties: {
      rainIntensity: {
        type: 'slider',
        text: 'Outside Rain Pace',
        value: 1.1,
        min: 0.3,
        max: 2.5,
        step: 0.1,
        default: 1.1
      },
      blurIntensity: {
        type: 'slider',
        text: 'Room Warmth Bokeh',
        value: 6,
        min: 0,
        max: 15,
        step: 1,
        default: 6
      },
      fogTint: {
        type: 'color',
        text: 'Night Window Shade',
        value: '#181124',
        default: '#181124'
      }
    },
    downloadSources: [
      {
        id: 's-moe-1',
        name: 'MoeWalls Official Server (MP4 2K)',
        provider: 'moewalls',
        format: 'MP4 4K',
        size: '12.4 MB',
        speed: 'High Speed Mirror',
        url: 'https://moewalls.com/anime/lofi-chill-room-live-wallpaper/',
        resolution: '2K 60FPS',
        isOfficial: true
      },
      {
        id: 's-moe-we',
        name: 'Wallpaper Engine Steam Workshop',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '12.2 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2748194012',
        resolution: '2K (2560x1440)'
      },
      {
        id: 's-moe-lively',
        name: 'Lively Wallpaper Native Zip',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '11.8 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://livelywallpaper.net/dl/lofi-chill-room.zip',
        resolution: '2K 60FPS'
      }
    ]
  },
  {
    id: 'synthwave-audio-horizon',
    title: 'Synthwave 80s Audio Grid',
    author: {
      username: 'LivelyAudioLabs',
      badge: 'Verified'
    },
    license: 'CC-BY-4.0',
    type: 'webaudio',
    sourcePlatform: 'lively',
    description: 'Dynamic 80s retrowave horizon grid with a glowing neon sun, moving wireframe mountains, and real-time audio visualizer frequency bars reactive to sound or mic.',
    tags: ['Audio Visualizer', 'Synthwave', 'Retrowave', 'Neon', '3D', 'Music', 'Wallpaper Engine'],
    thumbnail: '/assets/screenshots/mtv_2 (Large).png',
    previewMedia: '/resources/music_api.gif',
    isInteractive: true,
    canvasPreset: 'synthwave',
    fileSize: '6.8 MB',
    resolution: '2560 x 1440 (2K)',
    fps: 60,
    voteCount: 1980,
    downloads: 44100,
    isInstalled: true,
    dateAdded: '2025-02-01',
    wallpaperEngine: {
      supported: true,
      workshopId: '2640192841',
      version: 1,
      type: 'Web'
    },
    properties: {
      gridSpeed: {
        type: 'slider',
        text: 'Grid Speed',
        value: 1.5,
        min: 0.5,
        max: 4.0,
        step: 0.1,
        default: 1.5
      },
      sunColor: {
        type: 'color',
        text: 'Sun Gradient Glow',
        value: '#ff007f',
        default: '#ff007f'
      },
      gridColor: {
        type: 'color',
        text: 'Wireframe Grid Color',
        value: '#00ffff',
        default: '#00ffff'
      },
      audioReactivity: {
        type: 'checkbox',
        text: 'Audio Reactivity (Mic/Music)',
        value: true,
        default: true
      },
      scanlines: {
        type: 'checkbox',
        text: 'CRT Scanlines Overlay',
        value: true,
        default: true
      }
    },
    downloadSources: [
      {
        id: 's-synth-lively',
        name: 'Lively Official Package (.zip)',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '6.8 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://cdn.livelywallpaper.net/packages/synthwave.zip',
        resolution: '2560 x 1440',
        isOfficial: true
      },
      {
        id: 's-synth-we',
        name: 'Wallpaper Engine Web Scene',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '6.5 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2640192841',
        resolution: '2K Adaptive'
      },
      {
        id: 's-synth-mlw',
        name: 'MyLiveWallpapers 60FPS Video',
        provider: 'mylivewallpapers',
        format: 'MP4 4K',
        size: '14.2 MB',
        speed: 'High Speed Mirror',
        url: 'https://mylivewallpapers.com/synthwave-audio-horizon/',
        resolution: '1440p 60FPS'
      }
    ]
  },
  {
    id: 'matrix-digital-rain',
    title: 'The Matrix Cyber Rain',
    author: {
      username: 'NeoCode',
      badge: 'Staff Pick'
    },
    license: 'MIT',
    type: 'web',
    sourcePlatform: 'lively',
    description: 'Iconic falling katakana and digital code rain with customizable glyph speed, bloom intensity, cursor repulsive waves, and cyberpunk color palettes.',
    tags: ['Matrix', 'Cyberpunk', 'Minimal', 'Code', 'Retro', 'Green', 'Wallpaper Engine'],
    thumbnail: '/assets/icons/icon-lively-300.png',
    previewMedia: '/resources/wallpaper_html.gif',
    isInteractive: true,
    canvasPreset: 'matrix',
    fileSize: '1.8 MB',
    resolution: '3840 x 2160 (4K)',
    fps: 60,
    voteCount: 2650,
    downloads: 81200,
    isInstalled: false,
    dateAdded: '2024-11-20',
    wallpaperEngine: {
      supported: true,
      workshopId: '2109841289',
      version: 1,
      type: 'Web'
    },
    properties: {
      speed: {
        type: 'slider',
        text: 'Rain Fall Speed',
        value: 1.0,
        min: 0.3,
        max: 3.0,
        step: 0.1,
        default: 1.0
      },
      fontSize: {
        type: 'slider',
        text: 'Glyph Size',
        value: 16,
        min: 10,
        max: 32,
        step: 2,
        default: 16
      },
      glyphColor: {
        type: 'color',
        text: 'Glyph Color Tint',
        value: '#00ff66',
        default: '#00ff66'
      },
      charset: {
        type: 'dropdown',
        text: 'Character Set',
        value: 'Matrix Katakana + Latin',
        options: ['Matrix Katakana + Latin', 'Binary (0 & 1)', 'Cyber Hex', 'Runes'],
        default: 'Matrix Katakana + Latin'
      }
    },
    downloadSources: [
      {
        id: 's-matrix-lively',
        name: 'Lively Package (.zip)',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '1.8 MB',
        speed: 'Fast (GitHub)',
        url: 'https://github.com/rocksdanister/lively/releases/download/v2.1/matrix.zip',
        resolution: '4K Vector',
        isOfficial: true
      },
      {
        id: 's-matrix-we',
        name: 'Steam Workshop (Wallpaper Engine)',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '1.7 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2109841289',
        resolution: 'Vector/Web'
      }
    ]
  },
  {
    id: 'cosmic-nebula-starfield',
    title: 'Deep Space Cosmic Nebula',
    author: {
      username: 'AstroVisuals'
    },
    license: 'CC0',
    type: 'video',
    sourcePlatform: 'mylivewallpapers',
    description: 'High-definition looping flythrough of an interstellar stellar nebula with radiant cosmic dust, pulsing supernova cores, and 3D starfield particles.',
    tags: ['Space', 'Galaxy', 'Stars', '4K', 'Relaxing', 'Video', 'MyLiveWallpapers'],
    thumbnail: '/assets/logo/Lively Microsoft Poster art 1440 x 2160 pixels.png',
    previewMedia: '/resources/wallpaper_video.gif',
    isInteractive: true,
    canvasPreset: 'galaxy',
    fileSize: '18.4 MB',
    resolution: '3840 x 2160 (4K)',
    fps: 60,
    voteCount: 1490,
    downloads: 39800,
    isInstalled: true,
    dateAdded: '2025-01-28',
    wallpaperEngine: {
      supported: true,
      workshopId: '2510294819',
      version: 1,
      type: 'Video'
    },
    properties: {
      warpSpeed: {
        type: 'slider',
        text: 'Star Velocity',
        value: 1.8,
        min: 0.2,
        max: 5.0,
        step: 0.2,
        default: 1.8
      },
      nebulaColor: {
        type: 'color',
        text: 'Nebula Glow Tint',
        value: '#7b2cbf',
        default: '#7b2cbf'
      },
      starCount: {
        type: 'slider',
        text: 'Particle Star Count',
        value: 400,
        min: 100,
        max: 800,
        step: 50,
        default: 400
      },
      interactiveOrbit: {
        type: 'checkbox',
        text: 'Cursor Orbit Parallax',
        value: true,
        default: true
      }
    },
    downloadSources: [
      {
        id: 's-cosmic-mlw',
        name: 'MyLiveWallpapers (Direct 4K MP4)',
        provider: 'mylivewallpapers',
        format: 'MP4 4K',
        size: '18.4 MB',
        speed: 'High Speed Mirror',
        url: 'https://mylivewallpapers.com/deep-space-cosmic-nebula-4k/',
        resolution: '4K UHD 60FPS',
        isOfficial: true
      },
      {
        id: 's-cosmic-we',
        name: 'Steam Workshop (Wallpaper Engine)',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '17.9 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2510294819',
        resolution: '4K (3840x2160)'
      },
      {
        id: 's-cosmic-lively',
        name: 'Lively Hardware-Accelerated Video',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '18.1 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://cdn.livelywallpaper.net/packages/cosmic-nebula.zip',
        resolution: '4K UHD'
      }
    ]
  },
  {
    id: 'depth-3d-midas-parallax',
    title: '3D Depth Parallax (MiDaS ML)',
    author: {
      username: 'rocksdanister',
      avatar: 'https://avatars.githubusercontent.com/u/10850233?v=4',
      badge: 'Creator'
    },
    license: 'MIT',
    type: 'depth',
    sourcePlatform: 'lively',
    description: 'Machine Learning powered depth estimate wallpaper. Utilizes MiDaS depth maps to create optical 3D perspective shifts tracking mouse movements.',
    tags: ['Machine Learning', '3D Depth', 'Parallax', 'MiDaS', 'Innovative'],
    thumbnail: '/assets/screenshots/system (Large).png',
    previewMedia: '/resources/wallpaper_depth.gif',
    isInteractive: true,
    canvasPreset: 'depth',
    fileSize: '8.5 MB',
    resolution: '2560 x 1440 (2K)',
    fps: 60,
    voteCount: 1820,
    downloads: 41200,
    isInstalled: false,
    dateAdded: '2025-02-10',
    wallpaperEngine: {
      supported: true,
      workshopId: '2901840192',
      version: 1,
      type: 'Scene'
    },
    properties: {
      depthFactor: {
        type: 'slider',
        text: 'Depth Perspective Shift',
        value: 25,
        min: 5,
        max: 60,
        step: 5,
        default: 25
      },
      smoothing: {
        type: 'slider',
        text: 'Motion Smoothing',
        value: 0.1,
        min: 0.02,
        max: 0.3,
        step: 0.02,
        default: 0.1
      },
      invertParallax: {
        type: 'checkbox',
        text: 'Invert Tilt Axis',
        value: false,
        default: false
      }
    },
    downloadSources: [
      {
        id: 's-depth-lively',
        name: 'Lively ML Model Package',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '8.5 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://cdn.livelywallpaper.net/packages/depth-midas.zip',
        resolution: '2560 x 1440',
        isOfficial: true
      },
      {
        id: 's-depth-we',
        name: 'Wallpaper Engine Scene Converter',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '8.1 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2901840192',
        resolution: '2K Scene'
      }
    ]
  },
  {
    id: 'cyberpunk-system-hud',
    title: 'Cyberpunk Telemetry HUD & Clock',
    author: {
      username: 'HexagonStudio',
      badge: 'Verified'
    },
    license: 'MIT',
    type: 'app',
    sourcePlatform: 'lively',
    description: 'Futuristic sci-fi tactical heads-up display displaying real-time digital clock, rotating gyro rings, live CPU/GPU mock waveforms, and holographic radar.',
    tags: ['Cyberpunk', 'HUD', 'Clock', 'Tech', 'Widgets', 'Sci-Fi'],
    thumbnail: '/assets/logo/splash.png',
    previewMedia: '/resources/hw_api.gif',
    isInteractive: true,
    canvasPreset: 'hud',
    fileSize: '3.6 MB',
    resolution: '1920 x 1080 (FHD)',
    fps: 60,
    voteCount: 1140,
    downloads: 26500,
    isInstalled: false,
    dateAdded: '2025-01-05',
    wallpaperEngine: {
      supported: true,
      workshopId: '2291049281',
      version: 1,
      type: 'Web'
    },
    properties: {
      accentColor: {
        type: 'color',
        text: 'HUD Accent Cyan',
        value: '#00f0ff',
        default: '#00f0ff'
      },
      rotationSpeed: {
        type: 'slider',
        text: 'Gyro Rotation Rate',
        value: 1.0,
        min: 0.2,
        max: 3.0,
        step: 0.1,
        default: 1.0
      },
      showTelemetry: {
        type: 'checkbox',
        text: 'Show Performance Graphs',
        value: true,
        default: true
      },
      timeFormat24h: {
        type: 'checkbox',
        text: '24-Hour Time Format',
        value: true,
        default: true
      }
    },
    downloadSources: [
      {
        id: 's-hud-lively',
        name: 'Lively App Package',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '3.6 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://cdn.livelywallpaper.net/packages/cyberpunk-hud.zip',
        resolution: '1080p FHD',
        isOfficial: true
      },
      {
        id: 's-hud-we',
        name: 'Wallpaper Engine Web App',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '3.5 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2291049281',
        resolution: '1080p FHD'
      }
    ]
  },
  {
    id: 'shadertoy-25th-hour',
    title: '25th Hour: Procedural Sunset',
    author: {
      username: 'Louis Coyle',
      badge: 'Featured Artist'
    },
    license: 'Creative Commons',
    type: 'shadertoy',
    sourcePlatform: 'shadertoy',
    description: 'A tribute to the iconic Shadertoy piece by Louis Coyle. Real-time procedural sunset sky, silhouette landscape with rolling clouds and gentle ocean waves.',
    tags: ['Shadertoy', 'Sunset', 'Minimalist', 'Procedural', 'Vector Art', 'Wallpaper Engine'],
    thumbnail: '/assets/screenshots/fluid.png',
    previewMedia: '/resources/wallpaper_html.gif',
    isInteractive: true,
    canvasPreset: 'synthwave',
    fileSize: '2.1 MB',
    resolution: '1920 x 1080 (FHD)',
    fps: 60,
    voteCount: 2120,
    downloads: 64900,
    isInstalled: true,
    dateAdded: '2024-09-02',
    wallpaperEngine: {
      supported: true,
      workshopId: '1890281902',
      version: 1,
      type: 'Web'
    },
    properties: {
      sunY: {
        type: 'slider',
        text: 'Sun Altitude',
        value: 50,
        min: 10,
        max: 90,
        step: 5,
        default: 50
      },
      skyGradient: {
        type: 'color',
        text: 'Horizon Hue',
        value: '#ff5e36',
        default: '#ff5e36'
      }
    },
    downloadSources: [
      {
        id: 's-st-direct',
        name: 'Shadertoy Official GLSL Source',
        provider: 'shadertoy',
        format: 'HTML5 Bundle',
        size: '2.1 MB',
        speed: 'Ultra Fast (CDN)',
        url: 'https://shadertoy.com/view/4ttGWM',
        resolution: 'Dynamic Vector',
        isOfficial: true
      },
      {
        id: 's-st-we',
        name: 'Wallpaper Engine Workshop Port',
        provider: 'wallpaper_engine',
        format: 'PKG (Wallpaper Engine)',
        size: '2.0 MB',
        speed: 'Steam Workshop',
        url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1890281902',
        resolution: '1080p FHD'
      },
      {
        id: 's-st-lively',
        name: 'Lively Package (.zip)',
        provider: 'lively',
        format: 'ZIP (Lively)',
        size: '2.1 MB',
        speed: 'Fast (GitHub)',
        url: 'https://cdn.livelywallpaper.net/packages/25th-hour.zip',
        resolution: 'Adaptive'
      }
    ]
  }
];

export const INITIAL_DISPLAYS = [
  {
    id: 'display-1',
    name: 'Display 1: Main (LG UltraGear 27")',
    resolution: '2560 x 1440',
    width: 2560,
    height: 1440,
    isPrimary: true,
    assignedWallpaperId: 'cyberpunk-neon-street-we'
  },
  {
    id: 'display-2',
    name: 'Display 2: Secondary (Dell 24" Portrait/Landscape)',
    resolution: '1920 x 1080',
    width: 1920,
    height: 1080,
    isPrimary: false,
    assignedWallpaperId: 'synthwave-audio-horizon'
  }
];

export const INITIAL_SETTINGS = {
  theme: 'dark' as const,
  language: 'ru' as const,
  pauseOnBattery: true,
  pauseOnFullscreen: true,
  pauseOnFocusLoss: false,
  videoPlayerEngine: 'mpv' as const,
  audioPauseAlgorithm: 'pause' as const,
  taskbarTheme: 'acrylic' as const,
  screensaverIdleMinutes: 10,
  streamQuality: '1080p' as const,
  targetFps: 60,
  wallpaperEngineCompatMode: true
};

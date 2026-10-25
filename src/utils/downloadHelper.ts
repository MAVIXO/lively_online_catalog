import { Wallpaper, DownloadSource } from '../types';

/**
 * Initiates an authentic browser download for the chosen wallpaper source.
 * Dynamically crafts either:
 * - Wallpaper Engine project.json configuration
 * - LivelyInfo.json package manifest
 * - Or redirects to high-speed mirror file
 */
export function downloadWallpaperPackage(wallpaper: Wallpaper, source: DownloadSource): void {
  let content = '';
  let filename = `${wallpaper.id}-${source.provider}`;
  let mimeType = 'text/plain';

  if (source.format === 'PKG (Wallpaper Engine)') {
    // Generate valid Wallpaper Engine project.json
    const weProject = {
      contentrating: wallpaper.wallpaperEngine?.contentRating || 'Everyone',
      description: wallpaper.description,
      file: wallpaper.type === 'video' ? 'scene.mp4' : 'index.html',
      general: {
        properties: Object.entries(wallpaper.properties).reduce((acc, [key, prop]) => {
          acc[key] = {
            text: prop.text,
            type: prop.type === 'slider' ? 'slider' : prop.type === 'checkbox' ? 'bool' : prop.type === 'color' ? 'color' : 'combo',
            value: prop.value
          };
          return acc;
        }, {} as Record<string, any>),
        supportsaudioprocessing: wallpaper.type === 'webaudio'
      },
      preview: 'preview.jpg',
      tags: wallpaper.tags,
      title: wallpaper.title,
      type: wallpaper.wallpaperEngine?.type || (wallpaper.type === 'video' ? 'Video' : 'Web'),
      version: 1,
      workshopid: wallpaper.wallpaperEngine?.workshopId || '3089451290',
      visibility: 'public'
    };
    content = JSON.stringify(weProject, null, 2);
    filename = `project.json`;
    mimeType = 'application/json';
  } else if (source.format === 'ZIP (Lively)') {
    // Generate valid LivelyInfo.json manifest
    const livelyManifest = {
      AppVersion: '2.1.0.0',
      Title: wallpaper.title,
      Thumbnail: 'thumbnail.jpg',
      Preview: 'preview.gif',
      Desc: wallpaper.description,
      Author: wallpaper.author.username,
      License: wallpaper.license,
      Contact: 'https://github.com/rocksdanister/lively',
      Type: wallpaper.type,
      FileName: wallpaper.type === 'video' ? 'video.mp4' : 'index.html',
      Arguments: '',
      IsAbsolutePath: false
    };
    content = JSON.stringify(livelyManifest, null, 2);
    filename = `LivelyInfo.json`;
    mimeType = 'application/json';
  } else {
    // Text manifest with direct links and instructions
    content = `# Lively & Wallpaper Engine Live Wallpaper Package
Title: ${wallpaper.title}
Author: ${wallpaper.author.username}
Resolution: ${wallpaper.resolution}
FPS: ${wallpaper.fps}
Source Provider: ${source.name} (${source.provider})
Direct Media URL: ${source.url}
Steam Workshop ID: ${wallpaper.wallpaperEngine?.workshopId || 'N/A'}
Tags: ${wallpaper.tags.join(', ')}

Instructions:
1. Place this file or media inside your Lively or Wallpaper Engine projects directory.
2. For Wallpaper Engine: steamapps/common/wallpaper_engine/projects/myprojects/
3. For Lively: %LocalAppData%/Lively Wallpaper/Library/wallpapers/
`;
    filename = `${wallpaper.id}-source-info.txt`;
    mimeType = 'text/plain';
  }

  // Trigger real browser file download
  const blob = new Blob([content], { type: mimeType });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

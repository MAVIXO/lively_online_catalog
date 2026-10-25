import React, { useState } from 'react';
import { Wallpaper, WallpaperType } from '../types';
import { X, Upload, Globe, Film, Sparkles, Check, AlertCircle, FileCode } from 'lucide-react';

interface SubmitWallpaperModalProps {
  onClose: () => void;
  onSubmit: (newWallpaper: Wallpaper) => void;
}

export const SubmitWallpaperModal: React.FC<SubmitWallpaperModalProps> = ({
  onClose,
  onSubmit
}) => {
  const [sourceType, setSourceType] = useState<'url' | 'file' | 'shader'>('url');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<WallpaperType>('web');
  const [tags, setTags] = useState('Cyberpunk, Neon, Interactive');
  const [fileSize, setFileSize] = useState('5.0 MB');
  const [resolution, setResolution] = useState('1920 x 1080 (FHD)');
  const [previewThumbnail, setPreviewThumbnail] = useState('/assets/screenshots/fluid.png');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newWallpaper: Wallpaper = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      author: {
        username: author.trim() || 'Community Creator',
        badge: 'Custom'
      },
      license: 'MIT',
      type: type,
      sourcePlatform: 'lively',
      description: description.trim() || 'Custom wallpaper created with Lively Wallpaper creator tools.',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumbnail: previewThumbnail || '/assets/screenshots/fluid.png',
      previewMedia: url.startsWith('http') ? url : '/resources/wallpaper_shadertoy.gif',
      isInteractive: true,
      canvasPreset: type === 'webaudio' ? 'synthwave' : 'fluid',
      fileSize: fileSize,
      resolution: resolution,
      fps: 60,
      voteCount: 1,
      downloads: 1,
      isInstalled: true,
      isCustom: true,
      dateAdded: new Date().toISOString().split('T')[0],
      downloadSources: [
        {
          id: `s-custom-${Date.now()}`,
          name: 'Direct Media Source',
          provider: 'lively',
          format: type === 'video' ? 'MP4 4K' : 'ZIP (Lively)',
          size: fileSize,
          speed: 'Ultra Fast (CDN)',
          url: url || 'https://cdn.livelywallpaper.net/packages/custom.zip',
          resolution: resolution,
          isOfficial: false
        }
      ],
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
        color1: {
          type: 'color',
          text: 'Primary Tint',
          value: '#00d2ff',
          default: '#00d2ff'
        }
      }
    };

    onSubmit(newWallpaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#222329] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-5 bg-[#1c1d22] select-none">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#0078d4]" />
            <span className="text-xs font-semibold text-white">Add New Lively Wallpaper</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[75vh] text-xs">
          {/* Source Tabs */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1.5">Wallpaper Source</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSourceType('url');
                  setType('web');
                }}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium transition-all ${
                  sourceType === 'url'
                    ? 'bg-[#0078d4] border-[#0078d4] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Web / URL</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSourceType('file');
                  setType('video');
                }}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium transition-all ${
                  sourceType === 'file'
                    ? 'bg-[#0078d4] border-[#0078d4] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Video / GIF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSourceType('shader');
                  setType('shadertoy');
                }}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium transition-all ${
                  sourceType === 'shader'
                    ? 'bg-[#0078d4] border-[#0078d4] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Shadertoy</span>
              </button>
            </div>
          </div>

          {/* URL or File Source */}
          {sourceType === 'url' && (
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Webpage URL</label>
              <input
                type="url"
                required
                placeholder="https://example.com/interactive-canvas.html"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>
          )}

          {sourceType === 'shader' && (
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Shadertoy URL or Code ID</label>
              <input
                type="text"
                required
                placeholder="https://www.shadertoy.com/view/mtyGWy"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>
          )}

          {sourceType === 'file' && (
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Select Media File</label>
              <div className="border-2 border-dashed border-white/15 rounded-xl p-4 text-center hover:border-[#0078d4]/50 transition-colors cursor-pointer bg-white/[0.02]">
                <Film className="w-7 h-7 mx-auto text-neutral-400 mb-2" />
                <p className="text-neutral-300 font-medium">Click to select MP4, WebM, or GIF</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">MPV & VLC hardware acceleration enabled</p>
              </div>
            </div>
          )}

          {/* Title & Author */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Wallpaper Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Neon Cyber City"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Author Name</label>
              <input
                type="text"
                placeholder="Your username"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Tell others about this animated wallpaper..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
            />
          </div>

          {/* Category Type & Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Lively Engine Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as WallpaperType)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0078d4]"
              >
                <option value="web">Webpage / HTML5</option>
                <option value="webaudio">Web Audio Visualizer</option>
                <option value="video">Video (MPV / VLC)</option>
                <option value="shadertoy">Shadertoy WebGL</option>
                <option value="depth">3D Depth Parallax</option>
                <option value="app">Unity / Application</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                placeholder="Cyberpunk, Synthwave, 4K"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-[#191a1e] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#0078d4]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0078d4] hover:bg-[#1084d8] text-white font-medium flex items-center gap-1.5 transition-colors shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Add to Catalog & Library</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

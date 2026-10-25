import React from 'react';
import { LivelyProperties, LivelyControlProperty } from '../types';
import { RotateCcw, Sliders, Check, Palette, ListFilter } from 'lucide-react';

interface LivelyPropertyEditorProps {
  properties: LivelyProperties;
  onChange: (updatedProps: LivelyProperties) => void;
  onReset: () => void;
}

export const LivelyPropertyEditor: React.FC<LivelyPropertyEditorProps> = ({
  properties,
  onChange,
  onReset
}) => {
  const handlePropChange = (key: string, value: any) => {
    const current = properties[key];
    if (!current) return;
    onChange({
      ...properties,
      [key]: {
        ...current,
        value
      } as LivelyControlProperty
    });
  };

  const keys = Object.keys(properties);

  if (keys.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-neutral-400">
        No customizable properties defined for this wallpaper.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300">
          <Sliders className="w-3.5 h-3.5 text-[#0078d4]" />
          Lively Properties
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors"
          title="Reset to original defaults"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="space-y-4 pr-1 max-h-[340px] overflow-y-auto">
        {keys.map((key) => {
          const prop = properties[key];

          if (prop.type === 'slider') {
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>{prop.text}</span>
                  <span className="font-mono text-[#0078d4] font-medium">{prop.value}</span>
                </div>
                <input
                  type="range"
                  min={prop.min}
                  max={prop.max}
                  step={prop.step || 1}
                  value={prop.value}
                  onChange={(e) => handlePropChange(key, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#0078d4]"
                />
              </div>
            );
          }

          if (prop.type === 'checkbox') {
            return (
              <label
                key={key}
                className="flex items-center justify-between cursor-pointer py-1 text-xs text-neutral-300 hover:text-white group"
              >
                <span>{prop.text}</span>
                <button
                  type="button"
                  onClick={() => handlePropChange(key, !prop.value)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    prop.value ? 'bg-[#0078d4]' : 'bg-neutral-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      prop.value ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            );
          }

          if (prop.type === 'color') {
            return (
              <div key={key} className="flex items-center justify-between text-xs text-neutral-300 py-1">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{prop.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-400">{prop.value}</span>
                  <div className="relative w-7 h-7 rounded border border-white/20 overflow-hidden cursor-pointer shadow">
                    <input
                      type="color"
                      value={prop.value}
                      onChange={(e) => handlePropChange(key, e.target.value)}
                      className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0"
                    />
                  </div>
                </div>
              </div>
            );
          }

          if (prop.type === 'dropdown') {
            return (
              <div key={key} className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <ListFilter className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{prop.text}</span>
                </div>
                <select
                  value={prop.value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="w-full bg-[#27282e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#0078d4]"
                >
                  {prop.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

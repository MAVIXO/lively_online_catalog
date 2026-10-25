import React, { useEffect, useRef, useState } from 'react';
import { Wallpaper, LivelyProperties } from '../types';

interface LiveWallpaperCanvasProps {
  wallpaper: Wallpaper;
  customProperties?: LivelyProperties;
  interactive?: boolean;
  className?: string;
  isPaused?: boolean;
}

export const LiveWallpaperCanvas: React.FC<LiveWallpaperCanvasProps> = ({
  wallpaper,
  customProperties,
  interactive = true,
  className = '',
  isPaused = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasMediaError, setHasMediaError] = useState(false);
  const props = customProperties || wallpaper.properties;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates inside canvas
    let mouse = { x: width / 2, y: height / 2, prevX: width / 2, prevY: height / 2, speed: 0, isDown: false };
    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const dx = currentX - mouse.prevX;
      const dy = currentY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = currentX;
      mouse.y = currentY;
    };

    const onMouseDown = () => { mouse.isDown = true; };
    const onMouseUp = () => { mouse.isDown = false; };

    if (interactive) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
    }

    const preset = wallpaper.canvasPreset || 'fluid';

    // -------------------------------------------------------------
    // PRESET: FLUID NEON SMOKE
    // -------------------------------------------------------------
    interface FluidParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
    }
    const fluidParticles: FluidParticle[] = [];
    const color1 = (props.color1?.value as string) || '#00d2ff';
    const color2 = (props.color2?.value as string) || '#9b51e0';
    const simSpeed = Number(props.speed?.value || 1.2);
    const dissipation = Number(props.dissipation?.value || 0.96);

    // Pre-populate particles
    for (let i = 0; i < 40; i++) {
      fluidParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 20 + Math.random() * 40,
        color: Math.random() > 0.5 ? color1 : color2,
        alpha: 0.1 + Math.random() * 0.4,
        life: 0,
        maxLife: 100 + Math.random() * 150
      });
    }

    // -------------------------------------------------------------
    // PRESET: MATRIX DIGITAL RAIN
    // -------------------------------------------------------------
    const matrixGlyphColor = (props.glyphColor?.value as string) || '#00ff66';
    const matrixSpeed = Number(props.speed?.value || 1.0);
    const matrixFontSize = Number(props.fontSize?.value || 16);
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const matrixCols = Math.floor(width / matrixFontSize);
    const matrixDrops: number[] = Array.from({ length: matrixCols }, () => Math.floor(Math.random() * -50));

    // -------------------------------------------------------------
    // PRESET: SYNTHWAVE AUDIO HORIZON
    // -------------------------------------------------------------
    let gridOffset = 0;
    const synthSpeed = Number(props.gridSpeed?.value || 1.5);
    const sunColor = (props.sunColor?.value as string) || '#ff007f';
    const gridColor = (props.gridColor?.value as string) || '#00ffff';

    // -------------------------------------------------------------
    // PRESET: COSMIC GALAXY STARFIELD
    // -------------------------------------------------------------
    const starCount = Number(props.starCount?.value || 300);
    const warpSpeed = Number(props.warpSpeed?.value || 1.8);
    const nebulaColor = (props.nebulaColor?.value as string) || '#7b2cbf';
    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
    }
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: 0
    }));

    // -------------------------------------------------------------
    // PRESET: CYBERPUNK HUD
    // -------------------------------------------------------------
    let hudAngle = 0;
    const hudAccent = (props.accentColor?.value as string) || '#00f0ff';
    const hudRate = Number(props.rotationSpeed?.value || 1.0);

    // -------------------------------------------------------------
    // PRESET: RAIN ON GLASS
    // -------------------------------------------------------------
    interface RainDrop {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
    }
    const raindrops: RainDrop[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 10 + Math.random() * 25,
      speed: (4 + Math.random() * 8) * Number(props.rainIntensity?.value || 1.4),
      alpha: 0.2 + Math.random() * 0.6
    }));

    // MAIN ANIMATION LOOP
    let tick = 0;
    const render = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      tick++;

      if (preset === 'fluid') {
        // Soft clear for trailing effect
        ctx.fillStyle = `rgba(13, 14, 18, ${1.05 - dissipation})`;
        ctx.fillRect(0, 0, width, height);

        // Spawn on mouse move
        if (interactive && mouse.speed > 2) {
          fluidParticles.push({
            x: mouse.x,
            y: mouse.y,
            vx: (mouse.x - mouse.prevX) * 0.15 + (Math.random() - 0.5) * 2,
            vy: (mouse.y - mouse.prevY) * 0.15 + (Math.random() - 0.5) * 2,
            radius: 18 + Math.random() * 28,
            color: Math.random() > 0.5 ? color1 : color2,
            alpha: 0.6,
            life: 0,
            maxLife: 70 + Math.random() * 50
          });
        }

        // Ambient fluid motion
        const t = tick * 0.015 * simSpeed;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        for (let i = fluidParticles.length - 1; i >= 0; i--) {
          const p = fluidParticles[i];
          p.life++;
          p.x += p.vx * simSpeed + Math.sin(t + i) * 0.5;
          p.y += p.vy * simSpeed + Math.cos(t + i) * 0.5;
          p.vx *= 0.98;
          p.vy *= 0.98;

          const progress = p.life / p.maxLife;
          const currentAlpha = p.alpha * (1 - progress);

          if (currentAlpha > 0.01) {
            const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            radGrad.addColorStop(0, p.color);
            radGrad.addColorStop(1, 'transparent');

            ctx.globalAlpha = currentAlpha;
            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }

          if (p.life >= p.maxLife) {
            fluidParticles.splice(i, 1);
          }
        }

        // Keep ambient particles floating
        if (fluidParticles.length < 35) {
          fluidParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: 30 + Math.random() * 45,
            color: Math.random() > 0.5 ? color1 : color2,
            alpha: 0.25,
            life: 0,
            maxLife: 120 + Math.random() * 80
          });
        }
        ctx.restore();

      } else if (preset === 'matrix') {
        ctx.fillStyle = 'rgba(8, 12, 10, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = matrixGlyphColor;
        ctx.font = `${matrixFontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < matrixDrops.length; i++) {
          const char = katakana.charAt(Math.floor(Math.random() * katakana.length));
          const x = i * matrixFontSize;
          const y = matrixDrops[i] * matrixFontSize;

          // Repulsion from mouse
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const drawY = dist < 70 ? y + (70 - dist) * 0.4 : y;

          // Glow head of drop
          ctx.shadowColor = matrixGlyphColor;
          ctx.shadowBlur = 8;
          ctx.fillText(char, x, drawY);

          if (drawY > height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
          }
          matrixDrops[i] += matrixSpeed * 0.8;
        }
        ctx.shadowBlur = 0;

      } else if (preset === 'synthwave') {
        // Gradient dusk sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#0d0221');
        skyGrad.addColorStop(0.55, '#241734');
        skyGrad.addColorStop(0.65, '#541344');
        skyGrad.addColorStop(0.7, '#8f1a56');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        const horizonY = height * 0.62;

        // Glowing Sun with horizontal blinds
        const sunRadius = Math.min(width, height) * 0.22;
        const sunX = width / 2;
        const sunY = horizonY - sunRadius * 0.25;

        const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
        sunGrad.addColorStop(0, '#ffee55');
        sunGrad.addColorStop(0.5, sunColor);
        sunGrad.addColorStop(1, '#8f005d');

        ctx.save();
        ctx.fillStyle = sunGrad;
        ctx.shadowColor = sunColor;
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Sun scanline slats
        ctx.fillStyle = '#0d0221';
        for (let i = 0; i < 7; i++) {
          const slatY = sunY + (i / 7) * sunRadius;
          const slatHeight = 2 + i * 1.5;
          ctx.fillRect(sunX - sunRadius - 10, slatY, (sunRadius + 10) * 2, slatHeight);
        }
        ctx.restore();

        // Animated Perspective Ground Grid
        ctx.save();
        ctx.fillStyle = '#090314';
        ctx.fillRect(0, horizonY, width, height - horizonY);

        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = gridColor;
        ctx.shadowBlur = 10;

        // Vanishing perspective rays
        const vanishingX = width / 2 + (mouse.x - width / 2) * 0.08;
        const numRays = 22;
        for (let i = -numRays; i <= numRays; i++) {
          const groundX = vanishingX + (i * width) / 10;
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizonY);
          ctx.lineTo(groundX, height);
          ctx.stroke();
        }

        // Horizontal moving grid lines
        gridOffset = (gridOffset + synthSpeed * 1.5) % 40;
        for (let d = 0; d < 18; d++) {
          const depthProgress = ((d * 22 + gridOffset) % 400) / 400;
          const y = horizonY + Math.pow(depthProgress, 2.2) * (height - horizonY);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Audio Frequency Equalizer Bar overlay (Simulated live sound reactive)
        const barCount = 32;
        const barWidth = (width * 0.6) / barCount;
        const startX = width * 0.2;
        ctx.fillStyle = gridColor;
        for (let b = 0; b < barCount; b++) {
          const freq = Math.sin(tick * 0.08 + b * 0.3) * 0.5 + 0.5;
          const barHeight = 8 + freq * 40;
          ctx.fillRect(startX + b * barWidth, horizonY - barHeight, barWidth - 3, barHeight);
        }

        ctx.restore();

      } else if (preset === 'galaxy') {
        ctx.fillStyle = 'rgba(5, 5, 12, 0.25)';
        ctx.fillRect(0, 0, width, height);

        // Center nebula glow
        const radGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width * 0.5);
        radGrad.addColorStop(0, nebulaColor + '40');
        radGrad.addColorStop(0.6, '#0f0c2920');
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const tiltX = (mouse.x - cx) * 0.0003;
        const tiltY = (mouse.y - cy) * 0.0003;

        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.pz = s.z;
          s.z -= warpSpeed * 3;

          if (s.z <= 0) {
            s.z = width;
            s.pz = width;
            s.x = (Math.random() - 0.5) * width * 2;
            s.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 128 / s.z;
          const px = s.x * k + cx + tiltX * s.z;
          const py = s.y * k + cy + tiltY * s.z;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = Math.max(0.6, (1 - s.z / width) * 2.8);
            const alpha = Math.min(1, (1 - s.z / width) * 1.5);
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1.0;

      } else if (preset === 'hud') {
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        hudAngle += 0.01 * hudRate;

        ctx.save();
        ctx.strokeStyle = hudAccent;
        ctx.lineWidth = 1.5;

        // Rotating outer ring
        ctx.beginPath();
        ctx.arc(cx, cy, 140, hudAngle, hudAngle + Math.PI * 1.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 140, hudAngle + Math.PI * 1.6, hudAngle + Math.PI * 2);
        ctx.stroke();

        // Inner dashed counter-rotating ring
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.arc(cx, cy, 110, -hudAngle * 1.3, -hudAngle * 1.3 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center Digital Clock
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(timeStr, cx, cy - 10);

        ctx.fillStyle = hudAccent;
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText('LIVELY TELEMETRY ACTIVE // 60 FPS', cx, cy + 24);

        // Radar sweep
        const sweepX = cx + Math.cos(hudAngle * 2) * 110;
        const sweepY = cy + Math.sin(hudAngle * 2) * 110;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sweepX, sweepY);
        ctx.stroke();

        // Waveform oscilloscopes at bottom
        const waveY = height - 50;
        ctx.beginPath();
        for (let x = 40; x < width - 40; x += 10) {
          const val = Math.sin(x * 0.03 + tick * 0.1) * 18 * Math.cos(tick * 0.02);
          if (x === 40) ctx.moveTo(x, waveY + val);
          else ctx.lineTo(x, waveY + val);
        }
        ctx.stroke();

        ctx.restore();

      } else if (preset === 'rain') {
        // Dark bokeh background
        ctx.fillStyle = '#0c111c';
        ctx.fillRect(0, 0, width, height);

        // City bokeh lights
        const lights = [
          { x: width * 0.25, y: height * 0.4, r: 80, c: '#ff553330' },
          { x: width * 0.7, y: height * 0.35, r: 110, c: '#00d2ff25' },
          { x: width * 0.5, y: height * 0.65, r: 90, c: '#ffe60020' },
        ];
        lights.forEach(l => {
          const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
          g.addColorStop(0, l.c);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
        });

        // Falling raindrops
        ctx.strokeStyle = '#cceeff';
        ctx.lineWidth = 1.2;
        raindrops.forEach(d => {
          d.y += d.speed;
          if (d.y > height) {
            d.y = -d.len;
            d.x = Math.random() * width;
          }
          ctx.globalAlpha = d.alpha;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + 1, d.y + d.len);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;

      } else {
        // Generic depth / canvas fallback
        ctx.fillStyle = '#171923';
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
      }
    };
  }, [wallpaper, props, interactive, isPaused]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* If wallpaper has an authentic preview gif/video and user is not in canvas mode */}
      {wallpaper.previewMedia && !wallpaper.canvasPreset && !hasMediaError ? (
        <img
          src={wallpaper.previewMedia}
          alt={wallpaper.title}
          className="w-full h-full object-cover"
          onError={() => setHasMediaError(true)}
        />
      ) : (
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      )}

      {/* Subtle scanline and vignette overlay for retro immersion */}
      {props.scanlines?.value && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" 
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)' }}
        />
      )}
    </div>
  );
};

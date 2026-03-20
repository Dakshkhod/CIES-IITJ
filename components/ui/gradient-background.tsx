'use client';

import type React from 'react';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
  enableCenterContent?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
};

export function GradientBackground({
  children,
  className = '',
  overlay = false,
  overlayOpacity = 0.25,
}: GradientBackgroundProps) {
  return (
    <div className={cn('gb-root relative min-h-screen w-full overflow-hidden', className)}>
      {/* Base fill — switches between light cream and deep dark */}
      <div className="gb-base absolute inset-0" />

      {/* Aurora blobs — each on its own slow orbit */}
      <div className="absolute inset-0" aria-hidden>
        <div className="aurora-blob aurora-blob--1" />
        <div className="aurora-blob aurora-blob--2" />
        <div className="aurora-blob aurora-blob--3" />
        <div className="aurora-blob aurora-blob--4" />
      </div>

      {/* Noise texture (SVG filter, no network request) */}
      <svg className="gb-noise absolute inset-0 h-full w-full pointer-events-none" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Fine dot grid */}
      <div className="gb-dots absolute inset-0 pointer-events-none" aria-hidden />

      {/* Overlay dim */}
      {overlay && (
        <div
          className="gb-overlay absolute inset-0"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          {children}
        </div>
      )}

      <style jsx>{`
        /* ═══════════════════════════════════════
           LIGHT MODE — warm, luminous, airy
           ═══════════════════════════════════════ */
        .gb-base {
          background: #faf8f5;
        }
        .gb-noise {
          opacity: 0.04;
          mix-blend-mode: multiply;
        }
        .gb-dots {
          opacity: 0.06;
          background-image: radial-gradient(circle, rgba(0,0,0,0.25) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .gb-overlay {
          background: rgba(255,255,255,0.5);
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          will-change: transform, opacity;
          mix-blend-mode: multiply;
        }

        /* Warm amber — top-left anchor */
        .aurora-blob--1 {
          width: 55vmax;
          height: 55vmax;
          top: -15%;
          left: -10%;
          background: radial-gradient(circle at 40% 40%, #fbbf2466, #f59e0b08);
          animation: drift1 18s ease-in-out infinite alternate;
        }
        /* Soft blue — mid-right float */
        .aurora-blob--2 {
          width: 45vmax;
          height: 45vmax;
          top: 10%;
          right: -15%;
          background: radial-gradient(circle at 60% 50%, #60a5fa55, #3b82f608);
          animation: drift2 22s ease-in-out infinite alternate;
        }
        /* Peach / coral — bottom sweep */
        .aurora-blob--3 {
          width: 50vmax;
          height: 50vmax;
          bottom: -20%;
          left: 20%;
          background: radial-gradient(circle at 50% 60%, #fb923c44, #f9731608);
          animation: drift3 20s ease-in-out infinite alternate;
        }
        /* Lavender accent — small wanderer */
        .aurora-blob--4 {
          width: 30vmax;
          height: 30vmax;
          top: 40%;
          left: 50%;
          background: radial-gradient(circle at 50% 50%, #c084fc44, #a855f708);
          animation: drift4 16s ease-in-out infinite alternate;
        }

        /* ═══════════════════════════════════════
           DARK MODE — deep aurora, vivid neon
           ═══════════════════════════════════════ */
        :global(.dark) .gb-base {
          background: #050510;
        }
        :global(.dark) .gb-noise {
          opacity: 0.035;
          mix-blend-mode: soft-light;
        }
        :global(.dark) .gb-dots {
          opacity: 0.07;
          background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
        }
        :global(.dark) .gb-overlay {
          background: rgba(0,0,0,1);
        }
        :global(.dark) .aurora-blob {
          mix-blend-mode: screen;
        }

        /* Teal / cyan */
        :global(.dark) .aurora-blob--1 {
          background: radial-gradient(circle at 40% 40%, #0ff8, #0ea5e906);
        }
        /* Purple / violet */
        :global(.dark) .aurora-blob--2 {
          background: radial-gradient(circle at 60% 50%, #a855f7aa, #7c3aed08);
        }
        /* Rose / magenta */
        :global(.dark) .aurora-blob--3 {
          background: radial-gradient(circle at 50% 60%, #f472b688, #ec489908);
        }
        /* Emerald */
        :global(.dark) .aurora-blob--4 {
          background: radial-gradient(circle at 50% 50%, #34d39966, #10b98108);
        }

        /* ═══════════════════════════════════════
           Shared keyframes (both modes)
           ═══════════════════════════════════════ */
        @keyframes drift1 {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.6; }
          50%  { transform: translate(8vw, 12vh) scale(1.15); opacity: 0.8; }
          100% { transform: translate(-5vw, 6vh) scale(1.05); opacity: 0.65; }
        }
        @keyframes drift2 {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.5; }
          50%  { transform: translate(-12vw, 8vh) scale(1.1); opacity: 0.7; }
          100% { transform: translate(-6vw, -5vh) scale(0.95); opacity: 0.55; }
        }
        @keyframes drift3 {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.45; }
          50%  { transform: translate(10vw, -10vh) scale(1.12); opacity: 0.65; }
          100% { transform: translate(-8vw, -4vh) scale(1);   opacity: 0.5; }
        }
        @keyframes drift4 {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.35; }
          50%  { transform: translate(-15vw, 6vh) scale(1.2); opacity: 0.55; }
          100% { transform: translate(5vw, -8vh) scale(0.9); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

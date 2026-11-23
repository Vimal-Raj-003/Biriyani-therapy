import React, { useEffect, useRef } from 'react';

interface SpiceAtmosphereCanvasProps {
  intensity?: number;
  activeAct?: number;
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  kind: 'ember' | 'steam';
}

/**
 * Clean, understated warm atmosphere:
 * Renders ONLY delicate rising white steam wisps and ultra-subtle warm golden embers
 * (ZERO flying green leaves or distracting colored shapes!).
 */
export const SpiceAtmosphereCanvas: React.FC<SpiceAtmosphereCanvasProps> = ({
  intensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    let lastTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (initial = false): EmberParticle => {
      const isSteam = Math.random() < 0.35;
      return {
        x: width * (0.12 + Math.random() * 0.76),
        y: initial ? Math.random() * height : height + 24 + Math.random() * 60,
        vx: (Math.random() - 0.5) * (isSteam ? 8 : 10),
        vy: -(isSteam ? 14 + Math.random() * 14 : 16 + Math.random() * 20),
        size: isSteam ? 32 + Math.random() * 40 : 1.2 + Math.random() * 1.9,
        alpha: isSteam ? 0.035 + Math.random() * 0.03 : 0.28 + Math.random() * 0.32,
        phase: Math.random() * Math.PI * 2,
        kind: isSteam ? 'steam' : 'ember',
      };
    };

    resize();
    const count = width < 640 ? 14 : 22;
    const particles: EmberParticle[] = Array.from({ length: count }, () => spawn(true));

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const globalAlpha = intensityRef.current;
      if (globalAlpha > 0.02) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += (p.vx + Math.sin(now * 0.00075 + p.phase) * 8) * dt;
          p.y += p.vy * dt;

          if (p.y < -60 || p.x < -60 || p.x > width + 60) {
            particles[i] = spawn(false);
            continue;
          }

          const edgeFade = Math.min(1, p.y / 90, (height - p.y + 30) / 100);
          const a = Math.max(0, edgeFade) * p.alpha * globalAlpha;
          if (a <= 0.006) continue;

          if (p.kind === 'steam') {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            g.addColorStop(0, `rgba(255, 245, 230, ${a})`);
            g.addColorStop(1, 'rgba(255, 245, 230, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const twinkle = 0.65 + 0.35 * Math.sin(now * 0.003 + p.phase);
            const ea = a * twinkle;
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.4);
            g.addColorStop(0, `rgba(255, 232, 174, ${ea})`);
            g.addColorStop(0.45, `rgba(217, 166, 72, ${ea * 0.45})`);
            g.addColorStop(1, 'rgba(217, 166, 72, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[5] w-full h-[100dvh] pointer-events-none select-none"
    />
  );
};

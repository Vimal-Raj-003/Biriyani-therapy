import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FRAME_CONFIG, HERO_ACT_DURATION_MS, HERO_ACTS } from '../data/menu';

interface ScrollBiryaniCanvasProps {
  storyContainerRef: React.RefObject<HTMLDivElement | null>;
  activeHeroAct: number;
  onProgressChange?: (progress: number, frameNumber: number) => void;
}

const getFrameUrl = (frameNumber: number) =>
  `/images/ezgif-frame-${frameNumber.toString().padStart(3, '0')}.jpg`;

/**
 * Dual-Engine 4K Automated Hero + Clean Natural-Clarity 266-Frame Scroll Canvas:
 * 1. Top Automated 4K Hero Layer (y = 0):
 *    Fast, seamless 4-stage Chicken Dum Biryani preparation (Empty-Pot Whole Spices ->
 *    Chef Rice Layering -> Clay-Pot Dum Steam -> 4K Chicken Leg Dum Biryani).
 * 2. Scroll-Scrubbed 266-Frame Engine (Frames 035 -> 300):
 *    Clean natural white balance (NO harsh yellowish filter, NO overlapping double-image ghosting!)
 *    culminating cleanly in the unobstructed terracotta Chicken Leg Biryani reveal at Frame 300.
 */
export const ScrollBiryaniCanvas: React.FC<ScrollBiryaniCanvasProps> = ({
  storyContainerRef,
  activeHeroAct,
  onProgressChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroLayerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const progressCallbackRef = useRef(onProgressChange);
  progressCallbackRef.current = onProgressChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const { startFrame, totalFrames } = FRAME_CONFIG;
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    HERO_ACTS.forEach((act) => {
      const preload = new Image();
      preload.src = act.image;
    });

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let targetProgress = 0;
    let smoothProgress = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastDrawnIndex = -1;
    let lastReportedPct = -1;
    let rafId = 0;
    let lastTime = performance.now();
    let isDisposed = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const drawFrame = (img: HTMLImageElement, frameIdx: number) => {
      if (!img.complete || img.naturalWidth === 0) return;

      const overscan = 1.09;
      const hRatio = (cssWidth / img.width) * overscan;
      const vRatio = (cssHeight / img.height) * overscan;
      const ratio = Math.max(hRatio, vRatio);

      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const shiftX = (cssWidth - drawW) / 2;

      const chefBlend = Math.min(1, Math.max(0, (frameIdx - 70) / 45));
      const verticalAnchor = 0.04 + chefBlend * 0.44;
      const shiftY = (cssHeight - drawH) * verticalAnchor;

      ctx.fillStyle = '#0a0603';
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, drawW, drawH);
    };

    const findNearestLoaded = (desiredIndex: number): HTMLImageElement | null => {
      const exact = images[desiredIndex];
      if (exact && exact.complete && exact.naturalWidth > 0) return exact;
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = desiredIndex - offset;
        if (prev >= 0) {
          const p = images[prev];
          if (p && p.complete && p.naturalWidth > 0) return p;
        }
        const next = desiredIndex + offset;
        if (next < totalFrames) {
          const n = images[next];
          if (n && n.complete && n.naturalWidth > 0) return n;
        }
      }
      return null;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawnIndex = -1;
      const idx = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(smoothProgress * (totalFrames - 1))),
      );
      const img = findNearestLoaded(idx);
      if (img) drawFrame(img, idx);
    };

    const computeScrollProgress = () => {
      const container = storyContainerRef.current;
      if (!container) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        return Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
      const rect = container.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const traveled = -rect.top;
      return Math.min(1, Math.max(0, traveled / scrollableDistance));
    };

    const loadFrame = (index: number, priority = false) => {
      if (images[index] || isDisposed) return;
      const img = new Image();
      img.decoding = 'async';
      if (priority) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high';
      }
      img.onload = () => {
        if (isDisposed) return;
        const currentIdx = Math.min(
          totalFrames - 1,
          Math.max(0, Math.round(smoothProgress * (totalFrames - 1))),
        );
        if (index === 0 || Math.abs(index - currentIdx) <= 2) {
          lastDrawnIndex = -1;
        }
      };
      img.src = getFrameUrl(startFrame + index);
      images[index] = img;
    };

    resize();

    loadFrame(0, true);
    loadFrame(totalFrames - 1, true);
    for (let i = 0; i < totalFrames; i += 6) {
      loadFrame(i);
    }

    let batchCursor = 0;
    const streamRemaining = () => {
      if (isDisposed) return;
      let loadedInBatch = 0;
      while (batchCursor < totalFrames && loadedInBatch < 14) {
        if (!images[batchCursor]) {
          loadFrame(batchCursor);
          loadedInBatch++;
        }
        batchCursor++;
      }
      if (batchCursor < totalFrames) {
        window.setTimeout(streamRemaining, 45);
      }
    };
    const streamTimer = window.setTimeout(streamRemaining, 110);

    const onScroll = () => {
      targetProgress = computeScrollProgress();
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerTargetX = (e.clientX / Math.max(1, cssWidth) - 0.5) * 2;
      pointerTargetY = (e.clientY / Math.max(1, cssHeight) - 0.5) * 2;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      targetProgress = computeScrollProgress();

      if (prefersReducedMotion) {
        smoothProgress = targetProgress;
        pointerX = 0;
        pointerY = 0;
      } else {
        const scrollDamp = 1 - Math.exp(-dt * 14);
        smoothProgress += (targetProgress - smoothProgress) * scrollDamp;
        if (Math.abs(targetProgress - smoothProgress) < 0.0002) {
          smoothProgress = targetProgress;
        }
        const ptrDamp = 1 - Math.exp(-dt * 4.5);
        pointerX += (pointerTargetX - pointerX) * ptrDamp;
        pointerY += (pointerTargetY - pointerY) * ptrDamp;
      }

      // 1. Automated Fast 4K Hero Layer dissolves cleanly into scroll sequence (3.5% -> 14%)
      if (heroLayerRef.current) {
        const fadeOut = Math.min(1, Math.max(0, (smoothProgress - 0.035) / 0.105));
        const heroOpacity = 1 - fadeOut;
        heroLayerRef.current.style.opacity = heroOpacity.toFixed(3);
        heroLayerRef.current.style.visibility = heroOpacity <= 0.005 ? 'hidden' : 'visible';

        if (parallaxRef.current && heroOpacity > 0.005 && !prefersReducedMotion) {
          const tx = -pointerX * 12;
          const ty = -pointerY * 7;
          const scrollPush = 1 + fadeOut * 0.06;
          parallaxRef.current.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${scrollPush.toFixed(4)})`;
        }
      }

      // 2. Scrub 266-frame cooking canvas cleanly with natural white balance (zero double-exposure)
      const desiredIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(smoothProgress * (totalFrames - 1))),
      );

      if (desiredIndex !== lastDrawnIndex) {
        const img = findNearestLoaded(desiredIndex);
        if (img) {
          drawFrame(img, desiredIndex);
          lastDrawnIndex = desiredIndex;
        }
      }

      // 3. Keep vignette whisper-light on Hero & completely transparent on Final Biryani Reveal
      if (vignetteRef.current) {
        const heroActive = Math.max(0, 1 - smoothProgress / 0.13);
        const finaleClear = Math.min(1, Math.max(0, (smoothProgress - 0.78) / 0.14));
        const opacity = Math.max(0.02, (1 - finaleClear * 0.96) * (1 - heroActive * 0.6));
        vignetteRef.current.style.opacity = opacity.toFixed(3);
      }

      const pctInt = Math.round(smoothProgress * 200);
      if (pctInt !== lastReportedPct) {
        lastReportedPct = pctInt;
        progressCallbackRef.current?.(smoothProgress, startFrame + desiredIndex);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      window.clearTimeout(streamTimer);
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [storyContainerRef]);

  const currentAct = HERO_ACTS[activeHeroAct] || HERO_ACTS[0];
  const isNarrowScreen = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-[100dvh] pointer-events-none bg-[#0a0603] overflow-hidden"
    >
      {/* Layer A: Clean, Natural-Balanced 266-Frame Scroll-Scrubbed Canvas (No harsh yellow cast or artifacts!) */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          filter: 'contrast(1.04) brightness(1.04) saturate(0.95)',
        }}
      />

      {/* Layer B: Automated Fast 4-Act 4K Master Chef Hero Cinema (y = 0) */}
      <div
        ref={heroLayerRef}
        className="absolute inset-0 w-full h-full will-change-[opacity] overflow-hidden bg-[#0a0603]"
      >
        <div ref={parallaxRef} className="w-full h-full will-change-transform">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentAct.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                src={currentAct.image}
                alt=""
                fetchPriority="high"
                initial={{
                  scale: currentAct.motionFrom.scale,
                  x: currentAct.motionFrom.x,
                  y: currentAct.motionFrom.y,
                }}
                animate={{
                  scale: currentAct.motionTo.scale,
                  x: currentAct.motionTo.x,
                  y: currentAct.motionTo.y,
                }}
                transition={{
                  duration: (HERO_ACT_DURATION_MS + 450) / 1000,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full h-full object-cover will-change-transform"
                style={{
                  objectPosition: isNarrowScreen
                    ? currentAct.mobileObjectPosition
                    : currentAct.objectPosition,
                  filter: 'contrast(1.03) brightness(1.02) saturate(1.0)',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Whisper-light edge vignette */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,6,3,0.32) 0%, rgba(10,6,3,0) 20%, rgba(10,6,3,0) 78%, rgba(10,6,3,0.58) 100%)',
        }}
      />
    </div>
  );
};

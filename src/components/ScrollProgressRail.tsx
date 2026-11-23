import React from 'react';
import { motion } from 'motion/react';
import { SCROLL_CHAPTERS } from '../data/menu';

interface ScrollProgressRailProps {
  activeChapterId: string;
  onJumpTo: (id: string) => void;
  visible?: boolean;
}

/**
 * Subtle right-edge desktop cooking stage indicator that lets visitors see
 * and jump directly to each phase of the scroll-scrubbed Biryani animation.
 */
export const ScrollProgressRail: React.FC<ScrollProgressRailProps> = ({
  activeChapterId,
  onJumpTo,
  visible = true,
}) => {
  return (
    <aside
      aria-label="Cooking stages"
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-4 transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {SCROLL_CHAPTERS.map((chapter, index) => {
        const isActive = activeChapterId === chapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onJumpTo(chapter.id)}
            className="group flex items-center gap-3 cursor-pointer py-0.5"
            aria-label={`Jump to ${chapter.label}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={`text-[11px] tracking-wide transition-all duration-300 ${
                isActive
                  ? 'opacity-100 text-[#f0b44c] font-semibold translate-x-0'
                  : 'opacity-0 group-hover:opacity-100 text-[#f7efe4]/80 translate-x-1 group-hover:translate-x-0'
              }`}
            >
              {chapter.label}
            </span>

            <span className="relative flex items-center justify-center w-5 h-5">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#f0b44c] shadow-[0_0_12px_rgba(240,180,76,0.85)]'
                    : 'w-1.5 h-1.5 bg-[#f7efe4]/40 group-hover:bg-[#f7efe4]/80'
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="rail-active-ring"
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-full border border-[#f0b44c]/60"
                />
              )}
            </span>

            <span className="sr-only">
              Stage {index + 1}: {chapter.frameHint}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

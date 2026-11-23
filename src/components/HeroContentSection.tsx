import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_ACTS } from '../data/menu';

interface HeroContentSectionProps {
  activeAct: number;
  onOrderClick: () => void;
  onStartJourneyClick: () => void;
}

/**
 * Clean Luxury Automated Hero:
 * - No clunky video-player progress bars or "Spice Toss" step labels.
 * - Lets the 4K automated Chicken Dum Biryani cooking sequence shine unobstructed
 *   while crisp dynamic editorial typography morphs gracefully along the lower edge.
 */
export const HeroContentSection: React.FC<HeroContentSectionProps> = ({
  activeAct,
  onOrderClick,
  onStartJourneyClick,
}) => {
  const act = HERO_ACTS[activeAct] || HERO_ACTS[0];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[100dvh] flex flex-col justify-end pt-20 sm:pt-24 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pb-12 pointer-events-none"
    >
      {/* Subtle lower-third readability gradient so upper 72% of every 4K cooking scene stays crystal clear */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[54vh] sm:h-[48vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,6,3,0) 0%, rgba(10,6,3,0.52) 48%, rgba(10,6,3,0.9) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-7">
        {/* Dynamic Clean Editorial Title + Description */}
        <div className="max-w-2xl pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <span aria-hidden="true" className="w-7 sm:w-8 h-[1px] bg-[#d9ac59]" />
            <span className="font-script text-2xl sm:text-3xl text-gold-shimmer leading-none">
              Biryani Therapy
            </span>
          </div>

          <div className="min-h-[2.6rem] sm:min-h-[4rem] lg:min-h-[4.9rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={act.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-medium uppercase text-[#faf4e8] tracking-[0.03em] leading-[1.0] text-[2rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]"
              >
                {act.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="min-h-[2.8rem] mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${act.id}-caption`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs sm:text-sm md:text-base text-[#ede0cf]/92 leading-relaxed max-w-[52ch] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
              >
                {act.caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 pb-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onOrderClick}
            className="btn-luxury-gold flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 min-h-[46px] rounded-[2px] text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] cursor-pointer whitespace-nowrap"
          >
            <span>Order Biryani</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </motion.button>

          <button
            type="button"
            onClick={onStartJourneyClick}
            className="btn-luxury-ghost flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10">Scroll Story</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
              aria-hidden="true"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
};

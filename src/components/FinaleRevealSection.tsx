import React from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/menu';

interface FinaleRevealSectionProps {
  onOrderClick: () => void;
  onPhoneClick: () => void;
}

/**
 * THE UNOBSTRUCTED FINAL BIRYANI REVEAL (Frames 270 -> 300):
 * Upper 84% of the viewport remains 100% open and unobstructed so the lifted clay lid,
 * golden saffron basmati, and tender chicken leg shine in full clarity.
 * Only a slim THÉORA-style luxury bar anchors the lower edge cleanly below the pot.
 */
export const FinaleRevealSection: React.FC<FinaleRevealSectionProps> = ({
  onOrderClick,
  onPhoneClick,
}) => {
  return (
    <section
      id="finale-section"
      className="relative w-full min-h-[145vh] flex flex-col justify-end pb-8 sm:pb-10 scroll-mt-0 pointer-events-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-panel pointer-events-auto rounded-[3px] px-6 py-4 sm:px-8 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="text-center md:text-left">
            <h2 className="font-display uppercase text-2xl sm:text-3xl font-medium tracking-[0.06em] text-[#f4ece0] leading-tight">
              Real Flavours. Real Happiness.
            </h2>
            <p className="mt-0.5 font-script text-2xl sm:text-3xl text-gold-shimmer leading-none">
              Feel Better in Every Bite.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOrderClick}
              className="btn-luxury-gold inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-[2px] text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer whitespace-nowrap"
            >
              <span>Order This Pot</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onPhoneClick}
              className="btn-luxury-ghost inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-[2px] text-[11px] font-medium tracking-[0.14em] tabular-nums cursor-pointer whitespace-nowrap"
              title="Copy order hotline"
            >
              <Phone className="w-3.5 h-3.5 relative z-10 shrink-0" aria-hidden="true" />
              <span className="relative z-10">{BRAND_INFO.hotline}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

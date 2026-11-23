import React from 'react';
import { ArrowUp, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_INFO, SCROLL_CHAPTERS } from '../data/menu';
import { SaffronCrest } from './SiteNavbar';

interface SiteFooterProps {
  onScrollToTop: () => void;
  onScrollTo: (id: string) => void;
  onOrderClick: () => void;
  onPhoneClick: () => void;
}

/**
 * Compact Translucent Glassy Footer featuring VIMS Enterprise (Bengaluru, India):
 * Clean frosted obsidian glass that stays sleek across iPhone, Tablet, and Desktop.
 */
export const SiteFooter: React.FC<SiteFooterProps> = ({
  onScrollToTop,
  onScrollTo,
  onOrderClick,
  onPhoneClick,
}) => {
  return (
    <footer
      className="relative z-20 w-full text-[#ded0be] overflow-hidden pb-[env(safe-area-inset-bottom)]"
      style={{
        background:
          'linear-gradient(180deg, rgba(14, 8, 4, 0.56) 0%, rgba(10, 6, 3, 0.76) 100%)',
        backdropFilter: 'blur(18px) saturate(130%)',
        WebkitBackdropFilter: 'blur(18px) saturate(130%)',
      }}
    >
      {/* Expanding Brushed-Gold Top Hairline */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0.4 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[1px] origin-center bg-gradient-to-r from-transparent via-[#d9ac59]/75 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        {/* Compact Responsive Single-Band Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 pb-5 border-b border-[#d9ac59]/18">
          {/* Brand + VIMS Enterprise Bengaluru Details */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <SaffronCrest className="w-5 h-5 sm:w-6 sm:h-6 text-[#d9ac59] shrink-0" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-lg sm:text-2xl font-medium uppercase tracking-[0.16em] text-[#faf4e8]">
                  Biryani
                </span>
                <span className="font-script text-2xl sm:text-3xl text-gold-shimmer leading-none">
                  Therapy
                </span>
              </div>
            </div>

            <span aria-hidden="true" className="hidden sm:block w-[1px] h-5 bg-[#d9ac59]/30" />

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-0.5 text-xs text-[#ded0be]/90">
              <span className="font-semibold text-[#f2cb7a]">{BRAND_INFO.company}</span>
              <span aria-hidden="true" className="text-[#d9ac59]/60">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d9ac59] shrink-0" aria-hidden="true" />
                <span>{BRAND_INFO.location}</span>
              </span>
              <span aria-hidden="true" className="text-[#d9ac59]/60 hidden sm:inline">·</span>
              <span className="hidden sm:inline">12 PM – 1 AM</span>
            </div>
          </div>

          {/* Compact Chapter Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2"
          >
            {SCROLL_CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onScrollTo(chapter.id);
                }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#ded0be]/80 hover:text-[#f2cb7a] transition-colors"
              >
                {chapter.label}
              </a>
            ))}
          </nav>

          {/* Compact Indian Hotline + Order Bar */}
          <div className="w-full sm:w-auto flex items-stretch justify-between border border-[#d9ac59]/48 rounded-[2px] overflow-hidden bg-[#0c0704]/55 shrink-0">
            <button
              type="button"
              onClick={onPhoneClick}
              className="flex-1 sm:flex-none px-3.5 py-2.5 sm:py-2 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#faf4e8] hover:text-[#f2cb7a] tabular-nums transition-colors cursor-pointer whitespace-nowrap"
              title="Click to copy hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#d9ac59] shrink-0" aria-hidden="true" />
              <span>{BRAND_INFO.hotline}</span>
            </button>

            <button
              type="button"
              onClick={onOrderClick}
              className="btn-luxury-gold px-4 py-2.5 sm:py-2 text-[10px] font-bold uppercase tracking-[0.18em] cursor-pointer whitespace-nowrap"
            >
              Order
            </button>
          </div>
        </div>

        {/* Slim Bottom Copyright & Powered by VIMS Enterprise */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.06em] text-[#a6927c] text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.name} · Powered by{' '}
            <span className="text-[#ded0be] font-medium">{BRAND_INFO.company}</span>, {BRAND_INFO.location}
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-[2px] border border-[#d9ac59]/35 hover:border-[#f2cb7a] text-[#faf4e8] uppercase tracking-[0.16em] text-[10px] font-semibold transition-colors cursor-pointer"
          >
            <span>Rewind</span>
            <ArrowUp className="w-3 h-3 text-[#d9ac59]" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

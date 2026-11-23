import React, { useEffect, useState } from 'react';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND_INFO, SCROLL_CHAPTERS } from '../data/menu';

interface SiteNavbarProps {
  onOrderClick: () => void;
  onPhoneClick: () => void;
  onScrollTo: (id: string) => void;
  cartCount: number;
  scrollProgress: number;
  activeChapterId: string;
}

const NAV_ITEMS = [
  { id: 'story-section', label: 'Story' },
  { id: 'craft-section', label: 'Craft' },
  { id: 'specialities-section', label: 'Menu' },
  { id: 'finale-section', label: 'Reveal' },
];

/** Bespoke minimalist saffron-crown crest echoing THÉORA's luxury emblem */
export const SaffronCrest: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M16 4C16 4 12.5 10.5 12.5 15.5C12.5 18.2 14 20.5 16 21.5C18 20.5 19.5 18.2 19.5 15.5C19.5 10.5 16 4 16 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M16 21.5C12.2 20.5 8.5 17.5 6.5 12.5C9.8 13.4 12.4 15.6 13.8 18.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21.5C19.8 20.5 23.5 17.5 25.5 12.5C22.2 13.4 19.6 15.6 18.2 18.4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 25.5H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const SiteNavbar: React.FC<SiteNavbarProps> = ({
  onOrderClick,
  onPhoneClick,
  onScrollTo,
  cartCount,
  scrollProgress,
  activeChapterId,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onScrollTo(id);
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0603]/92 backdrop-blur-xl border-b border-[#d9ac59]/24 shadow-[0_14px_42px_-16px_rgba(0,0,0,0.88)]'
          : 'bg-gradient-to-b from-[#0a0603]/55 via-[#0a0603]/15 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2.5 sm:gap-4 pt-[env(safe-area-inset-top)]">
        {/* Left: Luxury Crest + Serif Wordmark */}
        <a
          href="#hero-section"
          onClick={(e) => {
            e.preventDefault();
            handleNav('hero-section');
          }}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0 min-w-0"
          aria-label="Biryani Therapy home"
        >
          <SaffronCrest className="w-5 h-5 sm:w-6 sm:h-6 text-[#cfa355] transition-transform duration-500 group-hover:scale-110 shrink-0" />
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="font-display text-base sm:text-[1.4rem] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#f4ece0]">
              Biryani
            </span>
            <span className="font-script text-xl sm:text-[1.85rem] font-normal text-gold-shimmer leading-none">
              Therapy
            </span>
          </div>
        </a>

        {/* Center: THÉORA-style Wide-Tracked Uppercase Micro Navigation */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = activeChapterId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.id);
                }}
                className={`relative py-2 text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#f4ece0]' : 'text-[#d4c4b0]/75 hover:text-[#f4ece0]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-gold-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#cfa355] to-transparent"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Minimal Utility Hotline + Sharp Luxury Order Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onPhoneClick}
            className="hidden lg:inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-[2px] border border-[#f4ece0]/18 hover:border-[#cfa355]/65 bg-[#0c0704]/40 text-[11px] font-medium tracking-[0.12em] text-[#d4c4b0] hover:text-[#f4ece0] transition-colors cursor-pointer tabular-nums whitespace-nowrap"
            title="Copy order hotline"
          >
            <Phone className="w-3.5 h-3.5 text-[#cfa355]" aria-hidden="true" />
            <span>{BRAND_INFO.hotline}</span>
          </button>

          <button
            type="button"
            onClick={onOrderClick}
            className="btn-luxury-ghost inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 min-h-[42px] rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.18em] cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 relative z-10 shrink-0" aria-hidden="true" />
            <span className="relative z-10 hidden sm:inline">Order</span>
            <span className="relative z-10 sm:hidden">Order</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="relative z-10 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#cfa355] text-[#120904] text-[10px] font-bold tabular-nums"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-[2px] border border-[#cfa355]/35 bg-[#0c0704]/60 text-[#f4ece0] hover:border-[#cfa355] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Razor-Thin Live Gold Cooking Progress Line */}
      <div aria-hidden="true" className="w-full h-[1.5px] bg-[#f4ece0]/8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#9c7432] via-[#cfa355] to-[#f4dca2] transition-[width] duration-75 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0e0805]/96 backdrop-blur-xl border-b border-[#cfa355]/25"
          >
            <nav aria-label="Mobile navigation" className="px-6 py-5 flex flex-col gap-1">
              {SCROLL_CHAPTERS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.id);
                  }}
                  className="py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#f4ece0] border-b border-[#f4ece0]/10 hover:text-[#cfa355] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] normal-case tracking-normal text-[#9f8c76]">
                    {item.frameHint}
                  </span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onPhoneClick();
                }}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-[2px] border border-[#cfa355]/45 text-xs uppercase tracking-[0.16em] text-[#f4ece0] tabular-nums cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#cfa355]" aria-hidden="true" />
                <span>{BRAND_INFO.hotline}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

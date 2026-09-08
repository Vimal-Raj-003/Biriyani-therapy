import React from 'react';
import { Phone, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { CalligraphyFontId } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface SiteNavbarProps {
  onOrderClick: () => void;
  onPhoneClick: () => void;
  onScrollTo: (id: string) => void;
  calligraphyFont?: CalligraphyFontId;
}

export const SiteNavbar: React.FC<SiteNavbarProps> = ({
  onOrderClick,
  onPhoneClick,
  onScrollTo,
  calligraphyFont = 'great-vibes',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/40 border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tag */}
        <div 
          onClick={() => onScrollTo('banner-section')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] font-black uppercase tracking-wider text-white leading-none mt-1">
              BIRYANI <span className="capitalize font-normal text-amber-300 text-[22px]" style={{ fontFamily: calligraphyFamily }}>Therapy</span>
            </span>
          </div>
        </div>

        {/* Desktop Single-Line Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-[14px] font-medium tracking-wide text-white/80 whitespace-nowrap">
          <button
            onClick={() => onScrollTo('banner-section')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors"
          >
            Banner View
          </button>
          <button
            onClick={() => onScrollTo('story-section')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors"
          >
            Our Story
          </button>
          <button
            onClick={() => onScrollTo('why-us-section')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => onScrollTo('specialities-section')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors"
          >
            Specialities
          </button>
          <button
            onClick={() => onScrollTo('delivery-section')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors"
          >
            Delivery
          </button>
        </nav>

        {/* Quick Actions (Hotline + Order Now) */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <button
            type="button"
            onClick={onPhoneClick}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-semibold tracking-wide transition-all"
            title="Click to copy hotline"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">0309-6747611</span>
          </button>

          <button
            type="button"
            onClick={onOrderClick}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-white text-[#1a0c06] hover:bg-amber-100 active:scale-95 text-xs font-extrabold tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ORDER NOW</span>
          </button>
        </div>

      </div>
    </header>
  );
};

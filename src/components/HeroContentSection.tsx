import React from 'react';
import { ShoppingBag, Compass, Sparkles, Heart } from 'lucide-react';
import { CalligraphyFontId, CalligraphyScope } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface HeroContentSectionProps {
  onOrderClick: () => void;
  onExploreMenuClick: () => void;
  calligraphyFont?: CalligraphyFontId;
  calligraphyScope?: CalligraphyScope;
}

export const HeroContentSection: React.FC<HeroContentSectionProps> = ({
  onOrderClick,
  onExploreMenuClick,
  calligraphyFont = 'great-vibes',
  calligraphyScope = 'signature',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  return (
    <section id="hero-content-section" className="w-full max-w-4xl mx-auto text-center px-4 py-8 sm:py-12">
      
      {/* Small Eyebrow / Tag */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-5 text-xs uppercase tracking-widest text-amber-300 font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Authentic Dum Biryani Kitchen</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-3">
        {calligraphyScope === 'full' ? (
          <span className="capitalize font-normal text-amber-200" style={{ fontFamily: calligraphyFamily }}>
            Biryani Therapy
          </span>
        ) : (
          <>
            BIRYANI{' '}
            <span
              className="capitalize font-normal text-amber-300 text-[1.15em] inline-block -ml-1"
              style={{ fontFamily: calligraphyFamily }}
            >
              Therapy
            </span>
          </>
        )}
      </h1>

      {/* Subheadline in Calligraphy Style */}
      <h2
        className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-amber-100/95 mb-6 px-4 leading-snug"
        style={{ fontFamily: calligraphyFamily }}
      >
        Some Need Therapy. I Need Biryani.
      </h2>

      {/* Divider */}
      <div className="w-20 h-1 bg-amber-400/80 mx-auto rounded-full mb-6" />

      {/* Description */}
      <div className="max-w-2xl mx-auto space-y-1.5 text-base sm:text-lg md:text-xl font-normal text-white/80 leading-relaxed mb-8">
        <p className="font-semibold text-white">
          Slow-cooked rice. Bold spices. Tender meat.
        </p>
        <p className="text-white/75">
          One comforting pot packed with aroma, flavour, and happiness.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={onOrderClick}
          className="flex items-center space-x-2 px-7 py-3 rounded-full bg-white text-[#190c06] hover:bg-amber-100 active:scale-95 text-sm sm:text-base font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#190c06]" />
          <span>Order Biryani</span>
        </button>

        <button
          type="button"
          onClick={onExploreMenuClick}
          className="flex items-center space-x-2 px-7 py-3 rounded-full border border-white/40 bg-white/5 hover:bg-white/15 text-white active:scale-95 text-sm sm:text-base font-semibold tracking-wide transition-all cursor-pointer backdrop-blur-sm"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>Explore Menu</span>
        </button>
      </div>

      {/* Small line in Calligraphy */}
      <div className="flex items-center justify-center space-x-2 text-base sm:text-xl text-amber-200/95 tracking-wide">
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        <span style={{ fontFamily: calligraphyFamily }}>Feel Better in Every Bite.</span>
      </div>

    </section>
  );
};

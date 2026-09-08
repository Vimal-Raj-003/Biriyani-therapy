import React from 'react';
import { Phone, ShoppingBag, Truck, Check, Sparkles } from 'lucide-react';
import { CalligraphyFontId } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface DeliverySectionProps {
  onOrderClick: () => void;
  onPhoneClick: () => void;
  calligraphyFont?: CalligraphyFontId;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  onOrderClick,
  onPhoneClick,
  calligraphyFont = 'great-vibes',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  const perfectFor = [
    'Family Lunch',
    'Friends Gathering',
    'Parties & Events',
    'Late-Night Cravings',
  ];

  return (
    <section id="delivery-section" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#220e06] to-[#120602] border-2 border-white/20 p-7 sm:p-12 md:p-14 text-center overflow-hidden shadow-2xl">
        
        {/* Glow and truck background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Small badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-widest text-white mb-4">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span>Doorstep Express Kitchen</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none mb-6">
          Hot. Fresh. Delivered.
        </h2>

        {/* Content */}
        <div className="max-w-2xl mx-auto space-y-2 text-base sm:text-lg text-white/85 leading-relaxed mb-8">
          <p>
            Family lunch, friends gathering, celebrations or late-night cravings—your favourite biryani is only an order away.
          </p>
          <p className="font-semibold text-white text-lg">
            Freshly prepared, carefully packed and delivered ready to enjoy.
          </p>
        </div>

        {/* Perfect for: pills */}
        <div className="mb-10">
          <span className="block text-xs font-bold uppercase tracking-widest text-amber-300/80 mb-3">
            PERFECT FOR:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {perfectFor.map((item) => (
              <div
                key={item}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wide text-white"
              >
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-white text-[#180b05] hover:bg-amber-100 active:scale-95 text-base sm:text-lg font-black uppercase tracking-wider transition-all shadow-2xl cursor-pointer flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>ORDER NOW</span>
          </button>

          <button
            type="button"
            onClick={onPhoneClick}
            className="w-full sm:w-auto px-7 py-3 rounded-full border-2 border-white bg-white/5 hover:bg-white/15 text-white active:scale-95 text-sm sm:text-base font-extrabold tracking-tight transition-all cursor-pointer flex items-center justify-center space-x-2.5"
            title="Click to copy hotline"
          >
            <div className="w-6 h-6 rounded-full bg-white text-[#1a0c06] flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>0309-6747611</span>
          </button>
        </div>

        {/* Real Flavours. Real Happiness. */}
        <div className="pt-6 border-t border-white/15 max-w-xl mx-auto flex flex-col items-center space-y-1.5 text-center">
          <div className="text-base sm:text-xl font-black uppercase tracking-wider text-white">
            Real Flavours. Real Happiness.
          </div>
          <div
            className="text-xl sm:text-2xl font-normal text-amber-300 tracking-wide"
            style={{ fontFamily: calligraphyFamily }}
          >
            Biryani Therapy — Feel Better in Every Bite.
          </div>
        </div>

      </div>
    </section>
  );
};

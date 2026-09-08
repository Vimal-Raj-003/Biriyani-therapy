import React from 'react';
import { Flame, Clock, Heart, Award } from 'lucide-react';
import { CalligraphyFontId } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface StorySectionProps {
  calligraphyFont?: CalligraphyFontId;
}

export const StorySection: React.FC<StorySectionProps> = ({
  calligraphyFont = 'great-vibes',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  return (
    <section id="story-section" className="w-full max-w-[760px] mx-auto px-4 py-8 sm:py-12">
      <div 
        className="relative rounded-3xl p-5 sm:p-7 md:p-8 overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(18, 8, 3, 0.18)',
          backdropFilter: 'blur(3px) saturate(105%)',
          WebkitBackdropFilter: 'blur(3px) saturate(105%)',
          border: '1px solid rgba(255,255,255,0.10)',
          textShadow: '0 1px 4px rgba(0,0,0,0.45)'
        }}
      >
        
        {/* Ambient Warm Backlights */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left Column: Story Text */}
          <div className="lg:col-span-7 flex flex-col space-y-3 text-left">
            {/* Small title */}
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>OUR STORY</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Made With Love. Cooked With Passion.
            </h2>

            {/* Content paragraph 1 with Calligraphy Style */}
            <p
              className="text-xl sm:text-2xl font-normal text-amber-200/95 tracking-wide pt-1 leading-snug"
              style={{ fontFamily: calligraphyFamily }}
            >
              Great biryani is never rushed.
            </p>

            {/* Content paragraph 2 */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              From fragrant basmati rice and carefully selected spices to perfectly cooked meat and fresh herbs, every layer is prepared to create the taste, aroma, and comfort a true biryani should deliver.
            </p>

            {/* Highlight line */}
            <div className="pt-3">
              <div 
                className="inline-flex items-center space-x-3 px-4 py-2 rounded-2xl text-amber-200 shadow-inner"
                style={{
                  background: 'rgba(30, 15, 8, 0.25)',
                  border: '1px solid rgba(255,255,255,0.10)'
                }}
              >
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span
                  className="text-base sm:text-lg font-normal tracking-wide"
                  style={{ fontFamily: calligraphyFamily }}
                >
                  Not just a meal. A pot full of memories.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Badges & Heritage Elements */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 pt-2">
            <div 
              className="p-3 rounded-2xl flex flex-col items-start space-y-2"
              style={{ background: 'rgba(15, 7, 3, 0.30)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Traditional Dum</span>
              <span className="text-[11px] text-white/70 leading-snug">Slow-steamed on sealed handi for distinct layered taste.</span>
            </div>

            <div 
              className="p-3 rounded-2xl flex flex-col items-start space-y-2"
              style={{ background: 'rgba(15, 7, 3, 0.30)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-300">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Bold Spices</span>
              <span className="text-[11px] text-white/70 leading-snug">Pure saffron, star anise, black cardamom & cloves.</span>
            </div>

            <div 
              className="p-3 rounded-2xl flex flex-col items-start space-y-2"
              style={{ background: 'rgba(15, 7, 3, 0.30)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Pure Meat</span>
              <span className="text-[11px] text-white/70 leading-snug">100% fresh, tender cuts marinated to perfection.</span>
            </div>

            <div 
              className="p-3 rounded-2xl flex flex-col items-start space-y-2"
              style={{ background: 'rgba(15, 7, 3, 0.30)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Family Love</span>
              <span className="text-[11px] text-white/70 leading-snug">Every pot prepared with warm home-style devotion.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

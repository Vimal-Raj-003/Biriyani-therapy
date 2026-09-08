import React from 'react';
import { CalligraphyFontId, CalligraphyScope } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface BiryaniBannerProps {
  onOrderClick?: () => void;
  onPhoneClick?: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  bgImageUrl?: string;
  className?: string;
  calligraphyFont?: CalligraphyFontId;
  calligraphyScope?: CalligraphyScope;
}

export const BiryaniBanner: React.FC<BiryaniBannerProps> = ({
  onOrderClick,
  onPhoneClick,
  onHomeClick,
  onAboutClick,
  bgImageUrl = '/banner_bg.jpg',
  className = '',
  calligraphyFont = 'great-vibes',
  calligraphyScope = 'signature',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  // 16 radial ticks for the "Magic!" sunburst circle stamp
  const sunburstTicks = Array.from({ length: 16 }).map((_, index) => {
    const angle = (index * 360) / 16;
    const rad = (angle * Math.PI) / 180;
    const rInner = 106;
    const rOuter = 117;
    const x1 = 120 + rInner * Math.cos(rad);
    const y1 = 120 + rInner * Math.sin(rad);
    const x2 = 120 + rOuter * Math.cos(rad);
    const y2 = 120 + rOuter * Math.sin(rad);
    return { x1, y1, x2, y2, id: index };
  });

  return (
    <div
      id="biryani-banner-container"
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* 
        Responsive Foreground Container: 
        max-width 1440px, width 90%, height 100vh.
        This provides the framing layout around the animated subject.
      */}
      <div className="relative z-10 w-[95%] sm:w-[90%] max-w-[1440px] h-full max-h-[100vh] flex flex-col justify-between pt-6 pb-5 text-white font-['DM_Sans',sans-serif] box-border pointer-events-auto">
        
        {/* ========================================================
            TOP SECTION: Navigation & Divider Line
        ======================================================== */}
        <div className="w-full flex flex-col items-center">
          <nav
            id="banner-nav"
            className="flex items-center justify-center flex-nowrap whitespace-nowrap space-x-6 sm:space-x-8 text-[14px] sm:text-[15px] font-medium tracking-wide text-white pb-3 select-none shrink-0"
          >
            <span onClick={onHomeClick} className="hover:opacity-80 transition-opacity cursor-pointer shrink-0">
              Home
            </span>
            <span className="opacity-40 font-light text-[0.8em] shrink-0">|</span>
            <span onClick={onAboutClick} className="hover:opacity-80 transition-opacity cursor-pointer shrink-0">
              About
            </span>
            <span className="opacity-40 font-light text-[0.8em] shrink-0">|</span>
            <span onClick={onOrderClick} className="hover:opacity-80 transition-opacity cursor-pointer shrink-0">
              Order Biriyani
            </span>
          </nav>
        </div>

        {/* ========================================================
            MIDDLE GRID: Framed around the central animation
        ======================================================== */}
        <div className="w-full flex-1 flex flex-col md:flex-row justify-between items-center md:items-stretch py-2 gap-4">
          
          {/* ----------------- LEFT COLUMN ----------------- */}
          <div className="hidden md:flex flex-col gap-6 items-start pl-2 w-1/4 h-full py-4">
            
            {/* Hanging Tag */}
            <div className="relative flex flex-col items-center w-fit">
              <div className="flex justify-center w-full -mb-[2px]">
                <div className="w-[2px] h-4 bg-white mr-1" />
                <div className="w-[2px] h-4 bg-white" />
              </div>
              <div className="relative w-[110px] aspect-[1/1.32] p-1.5 flex flex-col items-center justify-center text-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 210" fill="none">
                  <path d="M 52 14 L 18 48 C 14 52, 14 56, 14 62 L 14 196 C 14 202, 18 206, 24 206 L 136 206 C 142 206, 146 202, 146 196 L 146 62 C 146 56, 146 52, 142 48 L 108 14 C 104 10, 100 10, 96 10 L 64 10 C 60 10, 56 10, 52 14 Z" stroke="white" strokeWidth="3.2" strokeLinejoin="round" fill="rgba(0,0,0,0.18)" />
                  <circle cx="80" cy="30" r="7" stroke="white" strokeWidth="3" fill="none" />
                </svg>
                <div className="relative z-10 pt-2 flex flex-col items-center">
                  <span className="text-[13px] text-white/95 leading-tight" style={{ fontFamily: calligraphyFamily }}>Made with</span>
                  <div className="inline-flex flex-col items-center my-0.5">
                    <span className="text-[18px] font-bold tracking-wider text-white leading-none">LOVE</span>
                    <div className="w-full h-[1.5px] bg-white mt-0.5" />
                  </div>
                  <span className="text-[12px] text-white/95 leading-tight mt-0.5" style={{ fontFamily: calligraphyFamily }}>Cooked with</span>
                  <span className="text-[13px] font-bold tracking-wide text-white leading-none mt-0.5">PASSION</span>
                </div>
              </div>
            </div>

            {/* 4 Feature Badges (Scaled down) */}
            <div className="flex flex-col space-y-4">
              {[
                { title1: 'PREMIUM', title2: 'INGREDIENTS', icon: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10ZM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /> },
                { title1: 'PERFECTLY', title2: 'COOKED', icon: <><path d="M6 13.8a4.5 4.5 0 1 1 2.6-8.2 4.5 4.5 0 0 1 6.8 0 4.5 4.5 0 1 1 2.6 8.2" /><path d="M6 17h12" /><path d="M6 14h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" /></> },
                { title1: 'RICH IN AROMA', title2: '& FLAVOR', icon: <><path d="M8 4c-1.5 2-1.5 4 0 6s1.5 4 0 6" /><path d="M12 2c-1.5 2-1.5 4 0 6s1.5 4 0 6" /><path d="M16 4c-1.5 2-1.5 4 0 6s1.5 4 0 6" /></> },
                { title1: 'MADE WITH', title2: 'PURE LOVE', icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /> }
              ].map((badge, i) => (
                <div key={i} className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full border-[1.5px] border-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {badge.icon}
                    </svg>
                  </div>
                  <div className="text-[9.5px] font-bold uppercase leading-tight text-white tracking-wide">
                    <div>{badge.title1}</div>
                    <div>{badge.title2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Perfect For Box (Scaled down) */}
            <div className="w-[170px] rounded-xl border-[1.5px] border-white p-2.5 bg-black/20 backdrop-blur-[1px]">
              <div className="text-[14px] font-bold text-white tracking-tight pb-1">Perfect for</div>
              <div className="w-full h-[1.5px] bg-white mb-2" />
              <div className="space-y-1.5">
                {['FAMILY LUNCH', 'FRIENDS GATHERING', 'PARTIES & EVENTS', 'LATE NIGHT CRAVINGS'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center shrink-0">
                      <svg className="w-2 h-2 text-[#2a1308]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2.5 6.5 5 9 9.5 3.5" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold tracking-wide uppercase text-white leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ----------------- CENTER COLUMN ----------------- */}
          {/* Using clamp for responsive width, taking up ~35% of the screen instead of 100% */}
          <div className="flex flex-col items-center justify-between text-center md:w-[45%] h-full py-4 pointer-events-none">
            <div className="flex flex-col items-center w-full">
              {calligraphyScope === 'full' ? (
                <>
                  <h1 className="text-[clamp(3.5rem,7vw,5rem)] font-black capitalize text-white leading-[0.95] tracking-widest [text-shadow:0_4px_12px_rgba(0,0,0,0.45)]" style={{ fontFamily: calligraphyFamily }}>
                    Biryani
                  </h1>
                  <div className="text-[clamp(3rem,6vw,4.5rem)] font-semibold text-amber-400 leading-[0.95] -mt-1 [text-shadow:0_3px_10px_rgba(0,0,0,0.35)]" style={{ fontFamily: calligraphyFamily }}>
                    Therapy
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-[clamp(3rem,6vw,4rem)] font-black tracking-widest uppercase text-white leading-[0.92] [text-shadow:0_4px_12px_rgba(0,0,0,0.45)]">
                    BIRYANI
                  </h1>
                  <div className="text-[clamp(3.2rem,6vw,4.5rem)] font-semibold text-amber-400 leading-[0.98] -mt-3 [text-shadow:0_3px_10px_rgba(0,0,0,0.35)]" style={{ fontFamily: calligraphyFamily, letterSpacing: '0.02em' }}>
                    Therapy
                  </div>
                </>
              )}
              <div className="w-14 h-[1px] bg-white/45 my-3" />
              <div className="text-[clamp(15px,2.2vw,19px)] font-bold text-white/95 leading-tight px-2 tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                Some Need Therapy, I Need Biryani!
              </div>
            </div>

            {/* Delivery graphic sits subtly at the bottom of the center */}
            <div className="flex flex-col items-center mt-auto mb-4">
              <div className="relative mb-1">
                <svg className="w-16 h-10 text-white" viewBox="0 0 100 60" fill="none">
                  <line x1="6" y1="18" x2="22" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="2" y1="28" x2="22" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="8" y1="38" x2="22" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="28" y="10" width="40" height="32" rx="3" stroke="white" strokeWidth="2.5" fill="none" />
                  <path d="M68 20 L82 20 C85 20, 87 23, 89 26 L94 34 C95 36, 95 38, 95 42 L68 42 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                  <path d="M72 24 L82 24 L87 34 L72 34 Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                  <circle cx="44" cy="44" r="6" stroke="white" strokeWidth="2.5" fill="#1b0d06" />
                  <circle cx="44" cy="44" r="2" fill="white" />
                  <circle cx="78" cy="44" r="6" stroke="white" strokeWidth="2.5" fill="#1b0d06" />
                  <circle cx="78" cy="44" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white leading-tight">WE DELIVER</span>
                <span className="text-[18px] font-black uppercase tracking-tight text-white leading-none my-0.5">HOT & FRESH</span>
                <span className="text-[16px] font-normal text-white tracking-normal mt-0.5" style={{ fontFamily: calligraphyFamily }}>at your doorstep!</span>
              </div>
              
              {/* Mobile Only CTA */}
              <div className="flex md:hidden flex-col items-center space-y-2 mt-4 pointer-events-auto">
                <button
                  onClick={onOrderClick}
                  className="border-[1.5px] border-white rounded-full px-6 py-1.5 text-[12px] font-bold uppercase text-white hover:bg-white hover:text-[#1b0d06] active:scale-95 transition-all"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>

          {/* ----------------- RIGHT COLUMN ----------------- */}
          <div className="hidden md:flex flex-col gap-6 items-end pr-2 w-1/4 h-full py-4 text-right">
            
            {/* Double Ring Badge (Scaled down) */}
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-white" />
              <div className="absolute inset-2 rounded-full border-[1.5px] border-white flex flex-col items-center justify-center text-center p-2">
                <div className="w-4 h-[1.5px] bg-white mb-1 opacity-90" />
                <span className="text-[9px] font-bold uppercase tracking-wide text-white leading-tight">REAL</span>
                <span className="text-[11px] font-black uppercase tracking-wide text-white leading-tight">FLAVORS</span>
                <span className="text-[9px] font-bold uppercase tracking-wide text-white leading-tight">REAL</span>
                <span className="text-[11px] font-black uppercase tracking-wide text-white leading-tight">HAPPINESS</span>
                <div className="w-4 h-[1.5px] bg-white mt-1 opacity-90" />
              </div>
            </div>

            {/* Sunburst Stamp (Scaled down) */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="100" stroke="white" strokeWidth="3" fill="none" />
                {sunburstTicks.map((tick) => (
                  <line key={tick.id} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke="white" strokeWidth="3" strokeLinecap="round" />
                ))}
              </svg>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-white leading-tight">ONE BITE &</span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-white leading-tight">YOU'LL FEEL THE</span>
                <span className="text-[36px] font-normal text-white leading-none mt-1 drop-shadow-sm" style={{ fontFamily: calligraphyFamily }}>Magic!</span>
              </div>
            </div>

            {/* CTA Block (Scaled down) */}
            <div className="flex flex-col items-end space-y-2 pb-1 pointer-events-auto">
              <button
                onClick={onOrderClick}
                className="w-fit border-[1.5px] border-white rounded-full px-6 py-1.5 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#1b0d06] active:scale-95 transition-all cursor-pointer"
              >
                ORDER NOW
              </button>
              <button
                onClick={onPhoneClick}
                className="flex items-center space-x-2 text-white hover:opacity-90 active:scale-95 transition-transform cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5 text-[#210f07]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <span className="text-[18px] font-black tracking-tight text-white leading-none">0309-6747611</span>
              </button>
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wide text-white mt-1">
                <span>FAST</span><span className="opacity-60">|</span><span>FRESH</span><span className="opacity-60">|</span><span>DELICIOUS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM BAR: Full Width Rule with Centered Slogan
        ======================================================== */}
        <div className="w-full flex items-center justify-center pt-2">
          <div className="px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 whitespace-nowrap text-center flex items-center justify-center space-x-2">
            <span>BIRYANI THERAPY</span>
            <span className="opacity-40">•</span>
            <span className="normal-case text-[16px] tracking-normal font-normal text-white" style={{ fontFamily: calligraphyFamily }}>
              Feel Better in Every Bite!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

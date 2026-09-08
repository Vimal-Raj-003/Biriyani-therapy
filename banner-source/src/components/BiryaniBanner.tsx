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
      className={`relative w-[900px] h-[900px] shrink-0 overflow-hidden select-none shadow-2xl rounded-none md:rounded-lg ${className}`}
      style={{
        width: '900px',
        height: '900px',
        minWidth: '900px',
        minHeight: '900px',
        backgroundColor: '#1b0d06',
      }}
    >
      {/* Background Layer: Real bokeh photo fallback + Procedural Warm Amber Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Real photo background */}
        <img
          src={bgImageUrl}
          alt="Warm amber bokeh background"
          className="w-full h-full object-cover opacity-90 mix-blend-screen scale-105"
          onError={(e) => {
            // If image isn't available, keep gradient
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Ambient warm bokeh radial highlights matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#f59e0b]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-[#d97706]/25 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#b45309]/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#ea580c]/20 blur-3xl" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      {/* Foreground Content Container - Strict 1:1 Reference Layout at 900px x 900px */}
      <div className="relative z-10 w-[900px] h-[900px] flex flex-col justify-between px-8 pt-6 pb-5 text-white font-['DM_Sans',sans-serif] box-border">
        
        {/* ========================================================
            TOP SECTION: Navigation & Divider Line
        ======================================================== */}
        <div className="w-full flex flex-col items-center">
          {/* Top navigation links - strictly one single line */}
          <nav
            id="banner-nav"
            className="flex items-center justify-center flex-nowrap whitespace-nowrap space-x-8 text-[17px] font-medium tracking-wide text-white pb-4 select-none shrink-0"
          >
            <span
              onClick={onHomeClick}
              className="hover:opacity-80 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
            >
              Home
            </span>
            <span className="opacity-70 font-light text-[0.9em] shrink-0 select-none">|</span>
            <span
              onClick={onAboutClick}
              className="hover:opacity-80 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
            >
              About
            </span>
            <span className="opacity-70 font-light text-[0.9em] shrink-0 select-none">|</span>
            <span
              onClick={onOrderClick}
              className="hover:opacity-80 transition-opacity cursor-pointer shrink-0 whitespace-nowrap"
            >
              Order Biriyani
            </span>
          </nav>

          {/* Full-width crisp divider rule with increased top breathing room */}
          <div className="w-full h-[1.5px] bg-white opacity-95 mb-2.5" />
        </div>

        {/* ========================================================
            MIDDLE GRID: Left Column, Center Column, Right Column
            Shifted slightly below with pt-5
        ======================================================== */}
        <div className="w-full flex-1 grid grid-cols-12 gap-2 pt-5 pb-2 items-stretch">
          
          {/* ----------------- LEFT COLUMN (4 cols) ----------------- */}
          <div className="col-span-4 flex flex-col justify-between pl-1 h-full">
            
            {/* Hanging Tag: "Made with LOVE / COOKED with PASSION" */}
            <div className="relative flex flex-col items-start w-fit pt-0 -mt-1">
              {/* Hanging string lines from top divider */}
              <div className="flex justify-center w-full pl-9 -mb-[2px]">
                <div className="w-[2.5px] h-5 bg-white mr-1.5" />
                <div className="w-[2.5px] h-5 bg-white" />
              </div>

              {/* Tag body with SVG border */}
              <div className="relative w-[140px] aspect-[1/1.32] p-2 flex flex-col items-center justify-center text-center">
                {/* SVG Tag Shape with clipped angled shoulders & hole */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 160 210"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Tag outline */}
                  <path
                    d="M 52 14 
                       L 18 48 
                       C 14 52, 14 56, 14 62
                       L 14 196
                       C 14 202, 18 206, 24 206
                       L 136 206
                       C 142 206, 146 202, 146 196
                       L 146 62
                       C 146 56, 146 52, 142 48
                       L 108 14
                       C 104 10, 100 10, 96 10
                       L 64 10
                       C 60 10, 56 10, 52 14 Z"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="rgba(0,0,0,0.18)"
                  />
                  {/* Tag eyelet / ring hole */}
                  <circle cx="80" cy="30" r="7" stroke="white" strokeWidth="3" fill="none" />
                </svg>

                {/* Tag inner text */}
                <div className="relative z-10 pt-3.5 flex flex-col items-center">
                  <span
                    className="text-[17px] text-white/95 leading-tight select-none"
                    style={{ fontFamily: calligraphyFamily }}
                  >
                    Made with
                  </span>
                  
                  <div className="inline-flex flex-col items-center my-0.5">
                    <span className="text-[22px] font-bold tracking-wider text-white leading-none">
                      LOVE
                    </span>
                    <div className="w-full h-[2px] bg-white mt-0.5" />
                  </div>

                  <span
                    className="text-[16px] text-white/95 leading-tight mt-0.5 select-none"
                    style={{ fontFamily: calligraphyFamily }}
                  >
                    Cooked with
                  </span>
                  <span className="text-[16px] font-bold tracking-wide text-white leading-none mt-0.5">
                    PASSION
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Feature Badges */}
            <div className="flex flex-col space-y-3.5 my-auto pl-0.5">
              {/* 1. Premium Ingredients */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div className="text-[11.5px] font-bold uppercase leading-[1.2] text-white">
                  <div>PREMIUM</div>
                  <div>INGREDIENTS</div>
                </div>
              </div>

              {/* 2. Perfectly Cooked */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 13.8a4.5 4.5 0 1 1 2.6-8.2 4.5 4.5 0 0 1 6.8 0 4.5 4.5 0 1 1 2.6 8.2" />
                    <path d="M6 17h12" />
                    <path d="M6 14h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" />
                  </svg>
                </div>
                <div className="text-[11.5px] font-bold uppercase leading-[1.2] text-white">
                  <div>PERFECTLY</div>
                  <div>COOKED</div>
                </div>
              </div>

              {/* 3. Rich in Aroma & Flavor */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 4c-1.5 2-1.5 4 0 6s1.5 4 0 6" />
                    <path d="M12 2c-1.5 2-1.5 4 0 6s1.5 4 0 6" />
                    <path d="M16 4c-1.5 2-1.5 4 0 6s1.5 4 0 6" />
                  </svg>
                </div>
                <div className="text-[11.5px] font-bold uppercase leading-[1.2] text-white">
                  <div>RICH IN AROMA</div>
                  <div>& FLAVOR</div>
                </div>
              </div>

              {/* 4. Made with Pure Love */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="text-[11.5px] font-bold uppercase leading-[1.2] text-white">
                  <div>MADE WITH</div>
                  <div>PURE LOVE</div>
                </div>
              </div>
            </div>

            {/* Bottom Left: "Perfect for" Box */}
            <div className="w-[205px] rounded-2xl border-2 border-white p-3 bg-black/20 backdrop-blur-[1px]">
              <div className="text-[17px] font-bold text-white tracking-tight pb-1">
                Perfect for
              </div>
              
              {/* Divider under title */}
              <div className="w-full h-[1.5px] bg-white mb-2" />

              {/* Checklist items */}
              <div className="space-y-1.5">
                {[
                  'FAMILY LUNCH',
                  'FRIENDS GATHERING',
                  'PARTIES & EVENTS',
                  'LATE NIGHT CRAVINGS',
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-[#2a1308]"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2.5 6.5 5 9 9.5 3.5" />
                      </svg>
                    </div>
                    <span className="text-[10.5px] font-bold tracking-wide uppercase text-white leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ----------------- CENTER COLUMN (4 cols) ----------------- */}
          <div className="col-span-4 flex flex-col items-center justify-between text-center pt-2 pb-2 h-full">
            
            {/* Main Center Branding: Headline text with calligraphy style */}
            <div className="flex flex-col items-center w-full mt-1">
              {calligraphyScope === 'full' ? (
                <>
                  <h1
                    id="main-biryani-title"
                    className="text-[60px] font-medium capitalize text-white leading-[0.95] select-none drop-shadow-md"
                    style={{
                      fontFamily: calligraphyFamily,
                      fontSize: '60px',
                    }}
                  >
                    Biryani
                  </h1>
                  <div
                    id="main-therapy-title"
                    className="text-[58px] font-normal text-white leading-[0.95] select-none drop-shadow-md -mt-1.5"
                    style={{
                      fontFamily: calligraphyFamily,
                      fontSize: '58px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Therapy
                  </div>
                </>
              ) : (
                <>
                  <h1
                    id="main-biryani-title"
                    className="text-[54px] font-medium tracking-tight uppercase text-white leading-[0.92] select-none font-['DM_Sans',sans-serif]"
                    style={{
                      fontSize: '54px',
                      fontWeight: 500,
                    }}
                  >
                    BIRYANI
                  </h1>
                  <div
                    id="main-therapy-title"
                    className="text-[58px] font-normal text-white leading-[0.98] select-none drop-shadow-md -mt-1"
                    style={{
                      fontFamily: calligraphyFamily,
                      fontSize: '58px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Therapy
                  </div>
                </>
              )}

              {/* Accent horizontal divider line below Therapy */}
              <div className="w-24 h-[2.5px] bg-white my-3" />

              {/* Catchphrase */}
              <div
                className="text-[19px] font-normal text-white leading-tight select-none px-2"
                style={{ fontFamily: calligraphyFamily }}
              >
                Some Need Therapy, I Need Biryani!
              </div>
            </div>

            {/* Center Bottom: Delivery Truck & "WE DELIVER HOT & FRESH" */}
            <div className="flex flex-col items-center mt-auto pb-2">
              {/* Delivery Truck Graphic with motion lines */}
              <div className="relative mb-2">
                <svg
                  className="w-20 h-12 text-white"
                  viewBox="0 0 100 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Motion speed lines on left */}
                  <line x1="6" y1="18" x2="22" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="2" y1="28" x2="22" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="8" y1="38" x2="22" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" />

                  {/* Truck cargo body */}
                  <rect x="28" y="10" width="40" height="32" rx="3" stroke="white" strokeWidth="3" fill="none" />

                  {/* Truck cabin */}
                  <path
                    d="M68 20 L82 20 C85 20, 87 23, 89 26 L94 34 C95 36, 95 38, 95 42 L68 42 Z"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Cabin window */}
                  <path
                    d="M72 24 L82 24 L87 34 L72 34 Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Left wheel cut & wheel */}
                  <circle cx="44" cy="44" r="7" stroke="white" strokeWidth="3" fill="#1b0d06" />
                  <circle cx="44" cy="44" r="2.5" fill="white" />

                  {/* Right wheel cut & wheel */}
                  <circle cx="78" cy="44" r="7" stroke="white" strokeWidth="3" fill="#1b0d06" />
                  <circle cx="78" cy="44" r="2.5" fill="white" />
                </svg>
              </div>

              {/* Delivery Text */}
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-bold uppercase tracking-wider text-white leading-tight">
                  WE DELIVER
                </span>
                <span className="text-[24px] font-black uppercase tracking-tight text-white leading-none my-0.5">
                  HOT & FRESH
                </span>
                <span
                  className="text-[22px] font-normal text-white tracking-normal leading-tight mt-0.5"
                  style={{ fontFamily: calligraphyFamily }}
                >
                  at your doorstep!
                </span>
              </div>
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN (4 cols) ----------------- */}
          <div className="col-span-4 flex flex-col justify-between items-end pr-1 text-right h-full">
            
            {/* Top Right: Double Ring "REAL FLAVORS REAL HAPPINESS" Badge */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center -mt-1 mr-1">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border-[1.5px] border-white" />
              {/* Inner circle */}
              <div className="absolute inset-2.5 rounded-full border-[2px] border-white flex flex-col items-center justify-center text-center p-2">
                <div className="w-5 h-[1.5px] bg-white mb-1 opacity-90" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-white leading-tight">
                  REAL
                </span>
                <span className="text-[13px] font-black uppercase tracking-wide text-white leading-tight">
                  FLAVORS
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-white leading-tight">
                  REAL
                </span>
                <span className="text-[13px] font-black uppercase tracking-wide text-white leading-tight">
                  HAPPINESS
                </span>
                <div className="w-5 h-[1.5px] bg-white mt-1 opacity-90" />
              </div>
            </div>

            {/* Middle Right: Sunburst Stamp "ONE BITE & YOU'LL FEEL THE Magic!" */}
            <div className="relative w-44 h-44 flex items-center justify-center my-auto mr-1">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main circle border */}
                <circle cx="120" cy="120" r="100" stroke="white" strokeWidth="2.8" fill="none" />
                
                {/* Radial outward tick lines around circumference */}
                {sunburstTicks.map((tick) => (
                  <line
                    key={tick.id}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="white"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              {/* Inside text */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white leading-tight">
                  ONE BITE &
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white leading-tight">
                  YOU'LL FEEL THE
                </span>
                <span
                  className="text-[48px] font-normal text-white leading-none mt-1 select-none drop-shadow-sm"
                  style={{
                    fontFamily: calligraphyFamily,
                    fontSize: '48px',
                  }}
                >
                  Magic!
                </span>
              </div>
            </div>

            {/* Bottom Right: Call To Action (Order Now + Phone Number + Fast Fresh Delicious) */}
            <div className="flex flex-col items-end space-y-2 pb-1">
              {/* ORDER NOW pill */}
              <button
                type="button"
                id="btn-order-now"
                onClick={onOrderClick}
                className="w-fit border-[2px] border-white rounded-full px-7 py-1 text-[15px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#1b0d06] active:scale-95 transition-all cursor-pointer"
              >
                ORDER NOW
              </button>

              {/* Phone number row */}
              <button
                type="button"
                id="btn-phone-call"
                onClick={onPhoneClick}
                className="flex items-center space-x-2 text-white hover:opacity-90 active:scale-95 transition-transform cursor-pointer group"
                title="Click to call or copy phone number"
              >
                {/* Phone icon in solid white circle */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-4 h-4 text-[#210f07]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                
                {/* Phone digits */}
                <span className="text-[22px] font-black tracking-tight text-white leading-none">
                  0309-6747611
                </span>
              </button>

              {/* FAST | FRESH | DELICIOUS */}
              <div className="flex items-center space-x-2.5 text-[12px] font-bold uppercase tracking-wide text-white">
                <span>FAST</span>
                <span className="opacity-60 text-[0.9em]">|</span>
                <span>FRESH</span>
                <span className="opacity-60 text-[0.9em]">|</span>
                <span>DELICIOUS</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            BOTTOM BAR: Full Width Rule with Centered Slogan
        ======================================================== */}
        <div className="w-full flex items-center justify-center pt-2 pb-0.5">
          {/* Left Line */}
          <div className="flex-1 h-[1.5px] bg-white opacity-90" />

          {/* Slogan with Calligraphy accent */}
          <div className="px-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white whitespace-nowrap text-center flex items-center justify-center space-x-2.5">
            <span>BIRYANI THERAPY</span>
            <span className="opacity-60">•</span>
            <span
              className="normal-case text-[20px] tracking-normal font-normal text-white select-none"
              style={{ fontFamily: calligraphyFamily }}
            >
              Feel Better in Every Bite!
            </span>
          </div>

          {/* Right Line */}
          <div className="flex-1 h-[1.5px] bg-white opacity-90" />
        </div>

      </div>
    </div>
  );
};

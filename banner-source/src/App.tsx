import React, { useState } from 'react';
import { BiryaniBanner } from './components/BiryaniBanner';
import { BannerToolbar } from './components/BannerToolbar';
import { OrderModal } from './components/OrderModal';
import { SiteNavbar } from './components/SiteNavbar';
import { HeroContentSection } from './components/HeroContentSection';
import { StorySection } from './components/StorySection';
import { WhyDifferenceSection } from './components/WhyDifferenceSection';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { DeliverySection } from './components/DeliverySection';
import { SiteFooter } from './components/SiteFooter';
import { Sparkles, Check, Phone, Utensils, Feather } from 'lucide-react';
import { CalligraphyFontId, CalligraphyScope } from './types';

export default function App() {
  const [zoom, setZoom] = useState(1);
  const [showSpecGuide, setShowSpecGuide] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [calligraphyFont, setCalligraphyFont] = useState<CalligraphyFontId>('great-vibes');
  const [calligraphyScope, setCalligraphyScope] = useState<CalligraphyScope>('signature');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0309-6747611');
    setCopiedPhone(true);
    showToast('Phone number 0309-6747611 copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  const handlePrintBanner = () => {
    window.print();
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0603] text-white flex flex-col font-['DM_Sans',sans-serif] selection:bg-white/20 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-white text-[#1a0c06] font-bold px-4 py-2.5 rounded-full shadow-2xl border border-white/20 flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Global Sticky Navbar with Single-Line Nav */}
      <SiteNavbar
        onOrderClick={handleOrderClick}
        onPhoneClick={handleCopyPhone}
        onScrollTo={handleScrollTo}
        calligraphyFont={calligraphyFont}
      />

      <main className="w-full flex flex-col items-center justify-start px-3 sm:px-6 lg:px-8 py-6 space-y-12 sm:space-y-16">
        
        {/* Section 1: Hero Content */}
        <HeroContentSection
          onOrderClick={handleOrderClick}
          onExploreMenuClick={() => handleScrollTo('specialities-section')}
          calligraphyFont={calligraphyFont}
          calligraphyScope={calligraphyScope}
        />

        {/* Banner Display Stage Workspace */}
        <section id="banner-section" className="w-full max-w-[920px] flex flex-col items-center space-y-4">
          {/* Top Control Toolbar with Calligraphy Font Switcher */}
          <BannerToolbar
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(1.3, +(z + 0.1).toFixed(1)))}
            onZoomOut={() => setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(1)))}
            onResetZoom={() => setZoom(1)}
            showSpecGuide={showSpecGuide}
            onToggleSpecGuide={() => setShowSpecGuide(!showSpecGuide)}
            onCopyPhone={handleCopyPhone}
            copiedPhone={copiedPhone}
            onDownloadHtml={handlePrintBanner}
            calligraphyFont={calligraphyFont}
            onCalligraphyFontChange={(font) => {
              setCalligraphyFont(font);
              showToast(`Calligraphy font updated!`);
            }}
            calligraphyScope={calligraphyScope}
            onCalligraphyScopeChange={(scope) => {
              setCalligraphyScope(scope);
              showToast(`Calligraphy scope updated!`);
            }}
          />

          {/* Banner Display Stage */}
          <div className="relative w-full flex items-center justify-center p-1 sm:p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md overflow-x-auto shadow-2xl">
            {/* Subtle Stage Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

            {/* Scalable Banner Wrapper */}
            <div
              className="w-full flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
              }}
            >
              <div className="relative flex justify-center shrink-0">
                <BiryaniBanner
                  onOrderClick={handleOrderClick}
                  onPhoneClick={handleCopyPhone}
                  onHomeClick={() => handleScrollTo('hero-content-section')}
                  onAboutClick={() => handleScrollTo('story-section')}
                  calligraphyFont={calligraphyFont}
                  calligraphyScope={calligraphyScope}
                  className="shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
                />

                {/* Grid Guide Overlay for Inspection */}
                {showSpecGuide && (
                  <div className="absolute inset-0 pointer-events-none border border-cyan-400/40 z-30 flex flex-col justify-between p-4">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 divide-x divide-y divide-cyan-400/20" />
                    <div className="text-[10px] text-cyan-300 font-mono bg-black/70 px-2 py-0.5 rounded w-fit border border-cyan-500/30">
                      Aspect Ratio: 1:1 • 900px × 900px
                    </div>
                    <div className="text-[10px] text-cyan-300 font-mono bg-black/70 px-2 py-0.5 rounded w-fit border border-cyan-500/30 ml-auto">
                      Calligraphy Active • Pure White DM Sans
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banner Spec Reference Notes */}
          <div className="w-full max-w-[860px] grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-[#190c06]/80 border border-white/10 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Feather className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="font-extrabold uppercase text-white tracking-wider">Calligraphy Style</div>
                <div className="text-white/70 mt-0.5 leading-relaxed">
                  Authentic cursive lettering for "Therapy", "Magic!", hanging tag, catchphrases, and slogans.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#190c06]/80 border border-white/10 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold uppercase text-white tracking-wider">Single Line Nav</div>
                <div className="text-white/70 mt-0.5 leading-relaxed">
                  Top navigation bar options strictly aligned on one line with increased spacing above textline.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#190c06]/80 border border-white/10 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold uppercase text-white tracking-wider">Interactive Hotline</div>
                <div className="text-white/70 mt-0.5 leading-relaxed">
                  Click "ORDER NOW" or hotline "0309-6747611" to trigger instant copy and ordering menu.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Story */}
        <StorySection calligraphyFont={calligraphyFont} />

        {/* Section 3: Why Our Biryani — The Difference */}
        <WhyDifferenceSection calligraphyFont={calligraphyFont} />

        {/* Section 4: Signature Biryani — Find Your Favourite */}
        <SpecialitiesSection onOrderClick={handleOrderClick} />

        {/* Section 5: Delivery Section */}
        <DeliverySection
          onOrderClick={handleOrderClick}
          onPhoneClick={handleCopyPhone}
          calligraphyFont={calligraphyFont}
        />

      </main>

      {/* Footer */}
      <SiteFooter
        onScrollToTop={handleScrollToTop}
        onOrderClick={handleOrderClick}
        onPhoneClick={handleCopyPhone}
      />

      {/* Order & Contact Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}


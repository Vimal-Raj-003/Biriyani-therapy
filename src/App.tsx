import React, { useState, useEffect, useRef } from 'react';
import { BiryaniBanner } from './components/BiryaniBanner';
import { BannerToolbar } from './components/BannerToolbar';
import { OrderModal } from './components/OrderModal';
import { SiteNavbar } from './components/SiteNavbar';
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
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById('scroll-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const frameCount = 300;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrame = (index: number) => (
      `/images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );

    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const drawImage = (img: HTMLImageElement) => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    images[0].onload = function () {
      drawImage(images[0]);
    }

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(scrollFraction * frameCount))
      );

      requestAnimationFrame(() => {
        const imgToDraw = images[frameIndex];
        if (imgToDraw && imgToDraw.complete && imgToDraw.naturalHeight !== 0) {
          drawImage(imgToDraw);
        } else if (imgToDraw) {
          imgToDraw.onload = () => drawImage(imgToDraw);
        }
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
    <div className="min-h-screen w-full bg-transparent text-white font-['DM_Sans',sans-serif] selection:bg-white/20 selection:text-white">
      
      {/* GLOBAL SCROLL ANIMATION BACKGROUND (z-0) */}
      <div className="fixed inset-0 z-0 w-full h-[100vh] pointer-events-none bg-[#1b0d06]">
        {/* The existing scroll animation canvas */}
        <canvas id="scroll-canvas" className="w-full h-full object-cover" />
        
        {/* Subtle banner integration overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#f59e0b]/20 blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-[#d97706]/25 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#b45309]/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#ea580c]/20 blur-3xl" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      {/* FOREGROUND CONTENT WRAPPER (z-10) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-5 z-50 bg-white text-[#1a0c06] font-bold px-4 py-2.5 rounded-full shadow-2xl border border-white/20 flex items-center space-x-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-xs uppercase tracking-wider">{toastMessage}</span>
          </div>
        )}

        {/* Global Sticky Navbar */}
        <SiteNavbar
          onOrderClick={handleOrderClick}
          onPhoneClick={handleCopyPhone}
          onScrollTo={handleScrollTo}
          calligraphyFont={calligraphyFont}
        />

        {/* HERO SECTION (100vh) */}
        <div className="relative w-full h-[100vh] flex items-center justify-center pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            <BiryaniBanner
              onOrderClick={handleOrderClick}
              onPhoneClick={handleCopyPhone}
              onHomeClick={() => handleScrollTo('story-section')}
              onAboutClick={() => handleScrollTo('story-section')}
              calligraphyFont={calligraphyFont}
              calligraphyScope={calligraphyScope}
            />
          </div>
        </div>

        {/* MAIN CONTENT (Scrolls over the fixed background) */}
        <main className="w-full flex flex-col items-center justify-start px-3 sm:px-6 lg:px-8 py-6 space-y-12 sm:space-y-16 bg-transparent">
          <StorySection calligraphyFont={calligraphyFont} />
          <WhyDifferenceSection calligraphyFont={calligraphyFont} />
          <SpecialitiesSection onOrderClick={handleOrderClick} />
          <DeliverySection
            onOrderClick={handleOrderClick}
            onPhoneClick={handleCopyPhone}
            calligraphyFont={calligraphyFont}
          />
        </main>

        <SiteFooter
          onScrollToTop={handleScrollToTop}
          onOrderClick={handleOrderClick}
          onPhoneClick={handleCopyPhone}
        />
      </div>

      {/* Order & Contact Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}

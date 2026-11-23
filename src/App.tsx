import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ScrollBiryaniCanvas } from './components/ScrollBiryaniCanvas';
import { SpiceAtmosphereCanvas } from './components/SpiceAtmosphereCanvas';
import { SiteNavbar } from './components/SiteNavbar';
import { HeroContentSection } from './components/HeroContentSection';
import { ScrollProgressRail } from './components/ScrollProgressRail';
import { StorySection } from './components/StorySection';
import { WhyDifferenceSection } from './components/WhyDifferenceSection';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { DeliverySection } from './components/DeliverySection';
import { FinaleRevealSection } from './components/FinaleRevealSection';
import { SiteFooter } from './components/SiteFooter';
import { OrderModal } from './components/OrderModal';
import {
  BRAND_INFO,
  HERO_ACT_DURATION_MS,
  HERO_ACTS,
  MENU_DISHES,
  SCROLL_CHAPTERS,
} from './data/menu';
import { CartMap } from './types';

export default function App() {
  const storyContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cart, setCart] = useState<CartMap>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<string>(SCROLL_CHAPTERS[0].id);

  // Automated 4-Act Hero Cinema state (plays seamlessly on page load!)
  const [activeHeroAct, setActiveHeroAct] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (scrollProgress > 0.18) return;

    const timer = window.setTimeout(() => {
      setActiveHeroAct((prev) => (prev + 1) % HERO_ACTS.length);
    }, HERO_ACT_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeHeroAct, scrollProgress]);

  const cartCount = useMemo(
    () => (Object.values(cart) as number[]).reduce((sum, n) => sum + n, 0),
    [cart],
  );

  // Fade botanical floating atmosphere smoothly down during the final unobstructed Biryani reveal
  const atmosphereIntensity = useMemo(() => {
    if (scrollProgress < 0.72) return 1;
    return Math.max(0.18, 1 - ((scrollProgress - 0.72) / 0.22) * 0.82);
  }, [scrollProgress]);

  // Real-time section visibility tracking for instant navbar & rail synchronization
  useEffect(() => {
    const ids = SCROLL_CHAPTERS.map((c) => c.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveChapterId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -35% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleProgressChange = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2600);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(BRAND_INFO.hotline).catch(() => {});
    showToast(`Hotline ${BRAND_INFO.hotline} copied`);
  };

  const handleUpdateCart = (dishId: string, delta: number) => {
    const dish = MENU_DISHES.find((d) => d.id === dishId);
    setCart((prev) => {
      const next = Math.max(0, (prev[dishId] || 0) + delta);
      if (next === 0) {
        const { [dishId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [dishId]: next };
    });
    if (delta > 0 && dish) {
      showToast(`Added ${dish.name}`);
    }
  };

  const handleClearCart = () => {
    setCart({});
    showToast('Order selection cleared');
  };

  const handleScrollTo = (id: string) => {
    if (id === 'hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full text-[#faf4e8]">
        {/* Layer 0: Automated 4-Act 4K Hero Cinema -> Seamless Handoff into 266-Frame Scroll-Scrubbed Canvas */}
        <ScrollBiryaniCanvas
          storyContainerRef={storyContainerRef}
          activeHeroAct={activeHeroAct}
          onProgressChange={handleProgressChange}
        />

        {/* Layer 1: Living 3-Plane Depth-of-Field Mint Leaves, Saffron Threads, Embers & Stage Action Bursts */}
        <SpiceAtmosphereCanvas intensity={atmosphereIntensity} activeAct={activeHeroAct} />

        {/* Animated THÉORA-Style Luxury Header */}
        <SiteNavbar
          onOrderClick={() => setIsOrderModalOpen(true)}
          onPhoneClick={handleCopyPhone}
          onScrollTo={handleScrollTo}
          cartCount={cartCount}
          scrollProgress={scrollProgress}
          activeChapterId={activeChapterId}
        />

        {/* Desktop Cooking Chapter Progress Rail */}
        <ScrollProgressRail
          activeChapterId={activeChapterId}
          onJumpTo={handleScrollTo}
          visible={scrollProgress < 0.98}
        />

        {/* Toast Feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="fixed top-24 right-5 z-50 bg-[#140b06]/95 backdrop-blur-md text-[#faf4e8] px-4 py-2.5 rounded-[2px] border border-[#d9ac59]/55 shadow-2xl flex items-center gap-2.5 text-xs uppercase tracking-[0.14em]"
            >
              <Check className="w-4 h-4 text-[#d9ac59] shrink-0" aria-hidden="true" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll-Scrubbed Story Container */}
        <main ref={storyContainerRef} className="relative z-10 w-full">
          <HeroContentSection
            activeAct={activeHeroAct}
            onOrderClick={() => setIsOrderModalOpen(true)}
            onStartJourneyClick={() => handleScrollTo('story-section')}
          />

          <StorySection />

          <WhyDifferenceSection />

          <SpecialitiesSection
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />

          <DeliverySection
            onOrderClick={() => setIsOrderModalOpen(true)}
            onPhoneClick={handleCopyPhone}
          />

          {/* 100% Unobstructed Final Biryani Reveal before Footer */}
          <FinaleRevealSection
            onOrderClick={() => setIsOrderModalOpen(true)}
            onPhoneClick={handleCopyPhone}
          />
        </main>

        {/* THÉORA-Inspired Centered Gold-Crest Architectural Footer */}
        <SiteFooter
          onScrollToTop={handleScrollToTop}
          onScrollTo={handleScrollTo}
          onOrderClick={() => setIsOrderModalOpen(true)}
          onPhoneClick={handleCopyPhone}
        />

        {/* Interactive Order Modal */}
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          cart={cart}
          onUpdateCart={handleUpdateCart}
          onClearCart={handleClearCart}
          onCopyHotline={handleCopyPhone}
        />
      </div>
    </MotionConfig>
  );
}

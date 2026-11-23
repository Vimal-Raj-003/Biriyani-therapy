import React from 'react';
import { motion } from 'motion/react';

const HIGHLIGHTS = [
  { label: 'Traditional Dum', note: 'Slow-steamed inside earthen clay handis.' },
  { label: 'Whole Spices', note: 'Saffron, star anise, cardamom & cloves.' },
  { label: 'Tender Cuts', note: 'Fresh marinated meat layered by hand.' },
  { label: 'Cooked Fresh', note: 'Small batches throughout the day.' },
];

export const StorySection: React.FC = () => {
  return (
    <section
      id="story-section"
      className="relative w-full min-h-[95vh] sm:min-h-[100vh] flex items-center py-16 sm:py-24 scroll-mt-20 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-center lg:justify-start">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-panel pointer-events-auto w-full max-w-[460px] rounded-[3px] p-5 sm:p-8 lg:p-9 relative"
        >
          {/* Minimalist gold corner hairline accents */}
          <span aria-hidden="true" className="absolute top-0 left-0 w-7 h-[1.5px] bg-[#cfa355]" />
          <span aria-hidden="true" className="absolute top-0 left-0 h-7 w-[1.5px] bg-[#cfa355]" />

          <h2 className="font-display uppercase text-3xl sm:text-[2.45rem] font-medium tracking-[0.03em] text-[#f4ece0] leading-[1.03]">
            Made with Love.
            <br />
            Cooked with Passion.
          </h2>

          <p className="mt-3 font-script text-2xl sm:text-3xl text-gold-shimmer leading-snug">
            Great biryani is never rushed.
          </p>

          <p className="mt-3 text-sm text-[#e6d8c7]/90 leading-relaxed">
            From fragrant long-grain basmati and roasted whole spices to tender marinated meat and garden-fresh herbs, every layer is assembled patiently over live flame.
          </p>

          <div className="mt-6 pt-5 border-t border-[#cfa355]/20 grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="p-3 -m-1 rounded-[2px] border border-transparent hover:border-[#d9ac59]/35 hover:bg-[#d9ac59]/[0.07] hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#cfa355]">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-[#d4c4b0] leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

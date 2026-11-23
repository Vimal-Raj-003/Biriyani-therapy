import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CRAFT_STAGES } from '../data/menu';

export const WhyDifferenceSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="craft-section"
      className="relative w-full min-h-[95vh] sm:min-h-[100vh] flex items-center py-16 sm:py-24 scroll-mt-20 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-panel pointer-events-auto w-full max-w-[460px] xl:mr-14 rounded-[3px] p-5 sm:p-8 lg:p-9 relative"
        >
          <span aria-hidden="true" className="absolute top-0 right-0 w-7 h-[1.5px] bg-[#cfa355]" />
          <span aria-hidden="true" className="absolute top-0 right-0 h-7 w-[1.5px] bg-[#cfa355]" />

          <h2 className="font-display uppercase text-3xl sm:text-[2.45rem] font-medium tracking-[0.03em] text-[#f4ece0] leading-[1.03]">
            Craft &amp; Story.
          </h2>

          <p className="mt-2 font-display italic text-lg text-[#cfa355]">
            “You will smell the difference before the first bite.”
          </p>

          <div className="mt-6 divide-y divide-[#cfa355]/18">
            {CRAFT_STAGES.map((stage, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-3.5 px-2.5 -mx-2.5 rounded-[2px] hover:bg-[#d9ac59]/[0.08] transition-colors cursor-pointer group"
                >
                  <div className="flex items-baseline gap-3.5">
                    <span
                      className={`font-display text-lg tabular-nums transition-colors ${
                        isOpen ? 'text-[#cfa355]' : 'text-[#9f8c76]'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <div className="flex-1">
                      <div
                        className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
                          isOpen ? 'text-[#f4ece0]' : 'text-[#d4c4b0] group-hover:text-[#f4ece0]'
                        }`}
                      >
                        {stage.title}
                      </div>
                      <div className="text-xs text-[#9f8c76] mt-0.5">{stage.summary}</div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-xs sm:text-[0.84rem] text-[#e6d8c7] leading-relaxed pt-2"
                          >
                            {stage.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

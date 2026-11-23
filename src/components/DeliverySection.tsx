import React from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_INFO, OCCASIONS } from '../data/menu';

interface DeliverySectionProps {
  onOrderClick: () => void;
  onPhoneClick: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  onOrderClick,
  onPhoneClick,
}) => {
  return (
    <section
      id="delivery-section"
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center py-16 sm:py-20 scroll-mt-20 pointer-events-none"
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
            Hot. Fresh.
            <br />
            Delivered.
          </h2>

          <p className="mt-3 text-sm text-[#e6d8c7]/90 leading-relaxed">
            Freshly scooped, sealed warm to preserve the clay-pot aroma, and delivered across the city within {BRAND_INFO.deliveryWindow}.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {OCCASIONS.map((occasion) => (
              <div
                key={occasion}
                className="px-3 py-2.5 rounded-[2px] border border-[#cfa355]/24 bg-[#0c0704]/55 hover:border-[#f2cb7a]/70 hover:bg-[#d9ac59]/12 hover:-translate-y-0.5 transition-all duration-250 text-[11px] uppercase tracking-[0.12em] font-medium text-[#f4ece0]"
              >
                {occasion}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOrderClick}
              className="btn-luxury-gold flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-[2px] text-[11px] font-bold uppercase tracking-[0.18em] cursor-pointer whitespace-nowrap"
            >
              <span>Order Now</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onPhoneClick}
              className="btn-luxury-ghost flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-[2px] text-[11px] font-medium tracking-[0.12em] tabular-nums cursor-pointer whitespace-nowrap"
              title="Copy order hotline"
            >
              <Phone className="w-3.5 h-3.5 relative z-10 shrink-0" aria-hidden="true" />
              <span className="relative z-10">{BRAND_INFO.hotline}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

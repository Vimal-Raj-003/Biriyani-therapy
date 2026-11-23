import React from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { MENU_DISHES } from '../data/menu';
import { CartMap } from '../types';

interface SpecialitiesSectionProps {
  cart: CartMap;
  onUpdateCart: (dishId: string, delta: number) => void;
  onOpenOrderModal: () => void;
}

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({
  cart,
  onUpdateCart,
  onOpenOrderModal,
}) => {
  const signaturePots = MENU_DISHES.slice(0, 4);

  return (
    <section
      id="specialities-section"
      className="relative w-full min-h-[95vh] sm:min-h-[100vh] flex items-center py-16 sm:py-20 scroll-mt-16 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-center lg:justify-start">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="luxury-panel pointer-events-auto w-full max-w-[530px] rounded-[3px] p-5 sm:p-7 lg:p-8 relative"
        >
          <span aria-hidden="true" className="absolute top-0 left-0 w-7 h-[1.5px] bg-[#cfa355]" />
          <span aria-hidden="true" className="absolute top-0 left-0 h-7 w-[1.5px] bg-[#cfa355]" />

          <div className="pb-4 border-b border-[#cfa355]/20">
            <h2 className="font-display uppercase text-3xl sm:text-[2.2rem] font-medium tracking-[0.03em] text-[#f4ece0] leading-[1.04]">
              Signature Pots.
            </h2>
            <p className="mt-1 text-xs text-[#9f8c76] tracking-wide">
              One pot, many reasons to come back.
            </p>
          </div>

          <div className="divide-y divide-[#f4ece0]/10">
            {signaturePots.map((dish) => {
              const qty = cart[dish.id] || 0;
              return (
                <div
                  key={dish.id}
                  className="py-3 px-2 -mx-2 rounded-[2px] hover:bg-[#d9ac59]/[0.08] transition-colors duration-200 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <h3 className="font-display text-xl sm:text-[1.45rem] font-semibold text-[#f4ece0] leading-tight">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-semibold text-[#cfa355] tabular-nums">
                        {dish.priceDisplay}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#d4c4b0] leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="mt-1 text-[11px] text-[#9f8c76]">
                      {dish.subtitle} / {dish.portion}
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {qty > 0 ? (
                      <div className="inline-flex items-center gap-1 rounded-[2px] border border-[#cfa355]/55 bg-[#0c0704]/90 p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateCart(dish.id, -1)}
                          className="w-8 h-8 rounded-[2px] flex items-center justify-center text-[#f4ece0] hover:bg-[#f4ece0]/10 cursor-pointer"
                          aria-label={`Remove one ${dish.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#f4ece0] tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateCart(dish.id, 1)}
                          className="w-8 h-8 rounded-[2px] flex items-center justify-center bg-[#cfa355] text-[#120904] hover:bg-[#e4be74] cursor-pointer"
                          aria-label={`Add one more ${dish.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onUpdateCart(dish.id, 1)}
                        className="btn-luxury-ghost inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.14em] cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5 relative z-10" aria-hidden="true" />
                        <span className="relative z-10">Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#cfa355]/20 flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#9f8c76]">
              Steamed Fresh Daily
            </span>
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="btn-luxury-gold inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] rounded-[2px] text-[11px] font-bold uppercase tracking-[0.18em] cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Full Menu</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

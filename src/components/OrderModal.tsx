import React, { useEffect, useState } from 'react';
import { Check, Clock, Copy, MapPin, Minus, Phone, Plus, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND_INFO, MENU_DISHES } from '../data/menu';
import { CartMap } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartMap;
  onUpdateCart: (dishId: string, delta: number) => void;
  onClearCart: () => void;
  onCopyHotline: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateCart,
  onClearCart,
  onCopyHotline,
}) => {
  const [summaryCopied, setSummaryCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const selectedEntries = MENU_DISHES.filter((d) => (cart[d.id] || 0) > 0).map((dish) => ({
    dish,
    qty: cart[dish.id],
    subtotal: dish.price * cart[dish.id],
  }));

  const totalItems = selectedEntries.reduce((sum, e) => sum + e.qty, 0);
  const totalAmount = selectedEntries.reduce((sum, e) => sum + e.subtotal, 0);

  const handleCopySummary = () => {
    if (selectedEntries.length === 0) return;
    const lines = selectedEntries.map(
      ({ dish, qty, subtotal }) => `${qty}x ${dish.name} (₹${subtotal.toLocaleString('en-IN')})`,
    );
    const text = `Biryani Therapy Order (${BRAND_INFO.company}, ${BRAND_INFO.location}):\n${lines.join('\n')}\nTotal: ₹${totalAmount.toLocaleString('en-IN')}\nHotline: ${BRAND_INFO.hotline}`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setSummaryCopied(true);
    window.setTimeout(() => setSummaryCopied(false), 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#070301]/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl bg-[#130804] border border-[#f7efe4]/16 rounded-2xl shadow-[0_32px_90px_-16px_rgba(0,0,0,0.92)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#f7efe4]/10 flex items-center justify-between gap-4 bg-[#1a0c06]">
              <div>
                <h2
                  id="order-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#f7efe4] leading-none"
                >
                  Order from the Kitchen
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#d4c3af]">
                  Hot & fresh clay-pot delivery in {BRAND_INFO.deliveryWindow}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-md border border-[#f7efe4]/18 hover:border-[#f0b44c] flex items-center justify-center text-[#f7efe4] hover:text-[#f0b44c] transition-colors cursor-pointer"
                aria-label="Close order modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Hotline Strip */}
              <div className="p-4 rounded-xl bg-[#1e0f08] border border-[#f0b44c]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#f0b44c] text-[#160a04] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-[#a6927c]">Direct Order Hotline</div>
                    <div className="text-lg font-semibold text-[#f7efe4] tabular-nums">
                      {BRAND_INFO.hotline}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onCopyHotline}
                    className="px-3.5 py-2 min-h-[40px] rounded-md border border-[#f7efe4]/20 hover:border-[#f0b44c] text-xs font-medium text-[#f7efe4] transition-colors cursor-pointer"
                  >
                    Copy
                  </button>
                  <a
                    href={BRAND_INFO.hotlineTel}
                    className="px-4 py-2 min-h-[40px] inline-flex items-center rounded-md bg-[#f0b44c] hover:bg-[#f7c56a] text-[#160a04] text-xs font-semibold transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Delivery Meta */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#d4c3af]">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0d0603] border border-[#f7efe4]/10">
                  <Clock className="w-4 h-4 text-[#f0b44c] shrink-0" aria-hidden="true" />
                  <span>{BRAND_INFO.hours}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0d0603] border border-[#f7efe4]/10">
                  <MapPin className="w-4 h-4 text-[#f0b44c] shrink-0" aria-hidden="true" />
                  <span>{BRAND_INFO.coverage}</span>
                </div>
              </div>

              {/* Dish Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#f7efe4]">Select Dishes</h3>
                  {totalItems > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-xs text-[#a6927c] hover:text-[#f0b44c] transition-colors cursor-pointer"
                    >
                      Clear selection
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#f7efe4]/10 border border-[#f7efe4]/12 rounded-xl overflow-hidden bg-[#0e0603]">
                  {MENU_DISHES.map((dish) => {
                    const count = cart[dish.id] || 0;
                    return (
                      <div key={dish.id} className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-display text-xl font-semibold text-[#f7efe4] leading-tight">
                            {dish.name}
                          </div>
                          <p className="mt-0.5 text-xs text-[#a6927c] line-clamp-1">
                            {dish.description}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="font-semibold text-[#f0b44c] tabular-nums">
                              {dish.priceDisplay}
                            </span>
                            <span className="text-[#a6927c]">/ {dish.portion}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {count > 0 ? (
                            <div className="inline-flex items-center gap-1 rounded-md border border-[#f0b44c]/45 bg-[#1a0c06] p-1">
                              <button
                                type="button"
                                onClick={() => onUpdateCart(dish.id, -1)}
                                className="w-8 h-8 rounded flex items-center justify-center text-[#f7efe4] hover:bg-[#f7efe4]/10 cursor-pointer"
                                aria-label={`Decrease quantity of ${dish.name}`}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center text-sm font-semibold text-[#f7efe4] tabular-nums">
                                {count}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateCart(dish.id, 1)}
                                className="w-8 h-8 rounded flex items-center justify-center bg-[#f0b44c] text-[#160a04] hover:bg-[#f7c56a] cursor-pointer"
                                aria-label={`Increase quantity of ${dish.name}`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onUpdateCart(dish.id, 1)}
                              className="px-3.5 py-2 min-h-[40px] rounded-md border border-[#f7efe4]/22 hover:border-[#f0b44c] hover:text-[#f0b44c] text-xs font-medium text-[#f7efe4] transition-colors cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#f7efe4]/10 bg-[#1a0c06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {totalItems > 0 ? (
                <>
                  <div>
                    <div className="text-xs text-[#a6927c] tabular-nums">
                      {totalItems} {totalItems === 1 ? 'dish' : 'dishes'} selected
                    </div>
                    <div className="text-xl font-semibold text-[#f7efe4] tabular-nums">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md border border-[#f7efe4]/22 hover:border-[#f0b44c] text-xs sm:text-sm font-medium text-[#f7efe4] transition-colors cursor-pointer"
                    >
                      {summaryCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#f0b44c]" aria-hidden="true" />
                          <span>Copy Order</span>
                        </>
                      )}
                    </button>
                    <a
                      href={BRAND_INFO.hotlineTel}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-md bg-[#f0b44c] hover:bg-[#f7c56a] text-[#160a04] text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Call to Order</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-sm text-[#a6927c]">
                    <ShoppingBag className="w-4 h-4 text-[#f0b44c] shrink-0" aria-hidden="true" />
                    <span>Choose any dish above to build your order.</span>
                  </div>
                  <a
                    href={BRAND_INFO.hotlineTel}
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md bg-[#f0b44c] hover:bg-[#f7c56a] text-[#160a04] text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Call Hotline</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

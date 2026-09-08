import React, { useState } from 'react';
import { Phone, MapPin, Clock, X, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'order' | 'contact';
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Special Chicken Biryani',
    portion: 'Single / Double / Family Pack',
    price: 'Rs. 450 / 850 / 1650',
    description: 'Aromatic long-grain basmati rice cooked with tender marinated chicken, saffron & traditional spices.',
    popular: true,
  },
  {
    id: '2',
    name: 'Mutton Dumpukht Biryani',
    portion: 'Single / Double Pack',
    price: 'Rs. 750 / 1450',
    description: 'Slow-cooked mutton infused with secret aromatic herbs and melt-in-mouth potatoes.',
    popular: true,
  },
  {
    id: '3',
    name: 'Beef Nalli Biryani',
    portion: 'Double Pack',
    price: 'Rs. 950',
    description: 'Rich, bone-marrow infused royal beef biryani loaded with caramelized onions and dry spices.',
  },
  {
    id: '4',
    name: 'Raita & Fresh Kachumber Salad',
    portion: 'Side Dip',
    price: 'Rs. 100',
    description: 'Chilled cumin-mint yogurt dip paired with freshly chopped crisp onion & cucumber salad.',
  },
];

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, defaultTab = 'order' }) => {
  const [copied, setCopied] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0309-6747611');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleItemCount = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems: number = (Object.values(selectedItems) as number[]).reduce(
    (a: number, b: number) => a + b,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1a0c06] text-white rounded-2xl border-2 border-white/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/20 bg-gradient-to-r from-[#2c150c] to-[#1a0c06]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1b0d06] font-black text-sm">
              BT
            </div>
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white leading-none">
                BIRYANI Therapy
              </h2>
              <p className="text-xs text-amber-200/80 font-medium">Hot & Fresh Delivery to Your Doorstep</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Quick Call Banner */}
          <div className="bg-gradient-to-r from-amber-600/30 to-amber-900/30 border border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1b0d06] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Direct Order Hotline
                </span>
                <span className="text-lg font-black text-white tracking-tight">0309-6747611</span>
              </div>
            </div>

            <button
              onClick={handleCopyPhone}
              className="px-3 py-1.5 rounded-lg border border-white/50 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#1b0d06] transition-all flex items-center space-x-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <span>Copy</span>
              )}
            </button>
          </div>

          {/* Delivery Promises */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wider">
            <div className="bg-white/5 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center">
              <Clock className="w-4 h-4 text-amber-300 mb-1" />
              <span>30-40 MINS</span>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 mb-1" />
              <span>PIPING HOT</span>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-lg p-2.5 flex flex-col items-center justify-center">
              <MapPin className="w-4 h-4 text-amber-300 mb-1" />
              <span>ALL CITY</span>
            </div>
          </div>

          {/* Quick Menu Selection */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-300 mb-3 flex items-center justify-between">
              <span>Select Your Therapy</span>
              <span className="text-xs font-normal text-white/70">Pure Spices & Love</span>
            </h3>

            <div className="space-y-3">
              {MENU_ITEMS.map((item) => {
                const count = selectedItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-white/20 bg-white/5 hover:border-white/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-white">{item.name}</span>
                        {item.popular && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500 text-[#1b0d06] uppercase">
                            Must Try
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 line-clamp-1 mt-0.5">{item.description}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs">
                        <span className="font-black text-amber-400">{item.price}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 text-[11px]">{item.portion}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      {count > 0 ? (
                        <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1 border border-white/30">
                          <button
                            onClick={() => handleItemCount(item.id, -1)}
                            className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white hover:bg-white/30 font-bold"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-black text-sm text-white">{count}</span>
                          <button
                            onClick={() => handleItemCount(item.id, 1)}
                            className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#1b0d06] hover:bg-amber-300 font-bold"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleItemCount(item.id, 1)}
                          className="px-3 py-1.5 rounded-lg border border-white/50 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#1b0d06] transition-all"
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

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/20 bg-[#160904] flex items-center justify-between">
          <div>
            <span className="text-xs text-white/70 block">Selected Items:</span>
            <span className="text-sm font-extrabold text-white">
              {totalItems > 0 ? `${totalItems} items selected` : 'None selected'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="tel:03096747611"
              className="px-4 py-2 rounded-xl bg-white text-[#1b0d06] text-xs font-black uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center space-x-1.5 active:scale-95 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 0309-6747611</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

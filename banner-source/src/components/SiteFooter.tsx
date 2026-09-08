import React from 'react';
import { Phone, Clock, MapPin, Heart, ArrowUp } from 'lucide-react';

interface SiteFooterProps {
  onScrollToTop: () => void;
  onOrderClick: () => void;
  onPhoneClick: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onScrollToTop,
  onOrderClick,
  onPhoneClick,
}) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080301] text-white/70 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col space-y-8">
        
        {/* Top Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-white/10 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white uppercase text-xs tracking-wider">Direct Order Hotline</div>
              <button 
                onClick={onPhoneClick}
                className="text-white hover:text-amber-300 font-bold transition-colors"
              >
                0309-6747611
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white uppercase text-xs tracking-wider">Operating Hours</div>
              <div className="text-white/80">12:00 PM – 01:00 AM Daily</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white uppercase text-xs tracking-wider">Delivery Coverage</div>
              <div className="text-white/80">Citywide Hot & Fresh Delivery</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2 text-white/60">
            <span>© {new Date().getFullYear()} BIRYANI THERAPY.</span>
            <span>•</span>
            <span className="flex items-center">
              Cooked with <Heart className="w-3 h-3 text-rose-500 mx-1 fill-rose-500" /> passion & love
            </span>
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center space-x-1.5 text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

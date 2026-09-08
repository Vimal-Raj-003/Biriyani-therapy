import React from 'react';
import { ShoppingBag, ArrowRight, Flame, Users, Sparkles, ChefHat } from 'lucide-react';

interface SpecialitiesSectionProps {
  onOrderClick: () => void;
}

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({
  onOrderClick,
}) => {
  const specialities = [
    {
      id: 'chicken-biryani',
      title: 'Chicken Biryani',
      tag: 'Best Seller',
      description: 'Tender chicken layered with fragrant basmati rice and our signature spice blend.',
      icon: ChefHat,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    },
    {
      id: 'mutton-biryani',
      title: 'Mutton Biryani',
      tag: 'Chef Special',
      description: 'Slow-cooked mutton with deep, rich masala and perfectly seasoned rice.',
      icon: Flame,
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    },
    {
      id: 'special-biryani',
      title: 'Special Biryani',
      tag: 'Signature Experience',
      description: 'Our signature combination for the full experience.',
      icon: Sparkles,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    },
    {
      id: 'family-pack',
      title: 'Family Pack',
      tag: 'Made For Sharing',
      description: 'More biryani. More happiness.',
      icon: Users,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    },
  ];

  return (
    <section id="specialities-section" className="w-full max-w-[1120px] mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        {/* Small title */}
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>OUR SPECIALITIES</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          One Pot. Many Reasons to Come Back.
        </h2>
      </div>

      {/* Grid of 4 dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
        {specialities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative p-5 sm:p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between shadow-xl group overflow-hidden max-w-[540px] mx-auto w-full"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Order quick link */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-amber-300/80 font-medium">
                  Freshly Steamed Daily
                </span>
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button: View Full Menu */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onOrderClick}
          className="flex items-center space-x-2.5 px-8 py-3.5 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-[#190c06] text-white active:scale-95 text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Full Menu</span>
        </button>
      </div>

    </section>
  );
};

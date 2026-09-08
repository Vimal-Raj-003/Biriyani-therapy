import React from 'react';
import { Sparkles, Utensils, Wind, HeartHandshake } from 'lucide-react';
import { CalligraphyFontId } from '../types';
import { getCalligraphyFamily } from '../utils/calligraphy';

interface WhyDifferenceSectionProps {
  calligraphyFont?: CalligraphyFontId;
}

export const WhyDifferenceSection: React.FC<WhyDifferenceSectionProps> = ({
  calligraphyFont = 'great-vibes',
}) => {
  const calligraphyFamily = getCalligraphyFamily(calligraphyFont);

  const cards = [
    {
      id: 'premium-ingredients',
      title: 'Premium Ingredients',
      description: 'Quality rice, fresh meat, aromatic spices and carefully selected ingredients.',
      icon: Sparkles,
      accent: 'text-amber-400',
    },
    {
      id: 'perfectly-cooked',
      title: 'Perfectly Cooked',
      description: 'Slow-cooked to bring every layer of rice, masala and meat together.',
      icon: Utensils,
      accent: 'text-orange-400',
    },
    {
      id: 'rich-aroma',
      title: 'Rich in Aroma & Flavour',
      description: 'Every pot opens with the unmistakable fragrance of freshly prepared biryani.',
      icon: Wind,
      accent: 'text-amber-300',
    },
    {
      id: 'made-fresh',
      title: 'Made Fresh With Love',
      description: 'Prepared fresh so every serving reaches you warm, flavourful and satisfying.',
      icon: HeartHandshake,
      accent: 'text-rose-400',
    },
  ];

  return (
    <section id="why-us-section" className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
      
      {/* Small title */}
      <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span>WHY BIRYANI THERAPY?</span>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-8">
        Good Ingredients. Great Biryani.
      </h2>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-[#180b05]/90 border border-white/10 hover:border-white/25 hover:bg-[#200e07] transition-all flex flex-col items-center text-center shadow-lg group"
            >
              {/* Circular Icon with border matching banner stamps */}
              <div className="w-13 h-13 rounded-full border-2 border-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform bg-white/5">
                <Icon className={`w-6 h-6 ${card.accent}`} />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white mb-2 leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Section tagline with Calligraphy Style */}
      <div className="inline-block px-6 py-2.5 rounded-full bg-white/5 border border-white/20 text-amber-200">
        <span
          className="text-xl sm:text-2xl font-normal tracking-wide"
          style={{ fontFamily: calligraphyFamily }}
        >
          “You’ll smell the difference before the first bite.”
        </span>
      </div>

    </section>
  );
};

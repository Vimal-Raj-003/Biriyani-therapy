import { CraftStage, DishItem, ScrollChapter } from '../types';

export const BRAND_INFO = {
  name: 'Biryani Therapy',
  company: 'VIMS Enterprise',
  location: 'Bengaluru, India',
  hotline: '+91 98450 67411',
  hotlineTel: 'tel:+919845067411',
  hours: '12:00 PM to 01:00 AM Daily',
  coverage: 'Bengaluru Hot & Fresh Delivery',
  deliveryWindow: '30 to 40 mins',
};

/**
 * Scroll frame calibration:
 * Frame 035 opens cleanly with the Chef's full face in the warm lantern-lit kitchen,
 * progressing through layering, fresh herb garnishing, clay-pot lid lifting, swirling dum steam,
 * and culminating in Frame 300: the unobstructed steaming terracotta Chicken Leg Biryani reveal.
 */
export const FRAME_CONFIG = {
  startFrame: 35,
  endFrame: 300,
  totalFrames: 266,
};

export interface HeroAct {
  id: string;
  step: string;
  shortLabel: string;
  title: string;
  caption: string;
  image: string;
  objectPosition: string;
  mobileObjectPosition: string;
  motionFrom: { scale: number; x: string; y: string };
  motionTo: { scale: number; x: string; y: string };
}

export const HERO_ACTS: HeroAct[] = [
  {
    id: 'spices',
    step: '01',
    shortLabel: 'Whole Spices',
    title: 'Whole Spices Hit the Flame',
    caption:
      'Whole star anise, green cardamom, cinnamon bark, cloves, and bay leaves bloom fresh in hot ghee inside a gleaming copper handi.',
    image: '/images/act-1-empty-pot-spices.jpg',
    objectPosition: '56% 24%',
    mobileObjectPosition: '58% 18%',
    motionFrom: { scale: 1.0, x: '0%', y: '0%' },
    motionTo: { scale: 1.09, x: '-1.2%', y: '-0.8%' },
  },
  {
    id: 'layering',
    step: '02',
    shortLabel: 'Basmati Layering',
    title: 'Hand-Layered Over Flame',
    caption:
      'Pure snow-white aged basmati cascaded from a brass ladle onto simmering spiced chicken masala above live flame.',
    image: '/images/act-2-rice-layer.jpg',
    objectPosition: '58% 22%',
    mobileObjectPosition: '55% 18%',
    motionFrom: { scale: 1.02, x: '1%', y: '0%' },
    motionTo: { scale: 1.11, x: '-1%', y: '-0.8%' },
  },
  {
    id: 'dum',
    step: '03',
    shortLabel: 'Clay-Pot Dum',
    title: 'Unsealing the Clay Dum',
    caption:
      'Our master chef lifts the dough-sealed terracotta lid off glowing embers as aromatic steam rises from the chicken biryani inside.',
    image: '/images/act-3-chef-dum.jpg',
    objectPosition: '56% 24%',
    mobileObjectPosition: '56% 20%',
    motionFrom: { scale: 1.02, x: '-0.8%', y: '0.5%' },
    motionTo: { scale: 1.1, x: '0.8%', y: '-0.8%' },
  },
  {
    id: 'reveal',
    step: '04',
    shortLabel: 'Chicken Dum Biryani',
    title: 'Biryani Therapy, Served',
    caption:
      'Some need therapy. I need biryani. Succulent roasted chicken drumstick, fluffy saffron basmati, and chilled mint raita.',
    image: '/images/act-4-chicken-reveal.jpg',
    objectPosition: '50% 48%',
    mobileObjectPosition: '58% 42%',
    motionFrom: { scale: 1.09, x: '0%', y: '0%' },
    motionTo: { scale: 1.01, x: '0%', y: '0%' },
  },
];

export const HERO_ACT_DURATION_MS = 2350;

export const SCROLL_CHAPTERS: ScrollChapter[] = [
  { id: 'hero-section', label: 'The Chef', frameHint: 'Layering the Handi', range: [0, 0.18] },
  { id: 'story-section', label: 'Our Story', frameHint: 'Fresh Herbs & Flame', range: [0.18, 0.42] },
  { id: 'craft-section', label: 'Dum Craft', frameHint: 'Unsealing the Steam', range: [0.42, 0.64] },
  { id: 'specialities-section', label: 'Menu', frameHint: 'Aroma Awakening', range: [0.64, 0.84] },
  { id: 'finale-section', label: 'Final Biryani', frameHint: 'The Grand Reveal', range: [0.84, 1.0] },
];

export const MENU_DISHES: DishItem[] = [
  {
    id: 'chicken-biryani',
    name: 'Chicken Dum Biryani',
    subtitle: 'Best Seller',
    portion: 'Single / Double Pot',
    price: 349,
    priceDisplay: '₹349',
    description:
      'Tender marinated chicken drumstick layered with fragrant aged basmati, golden birista onions, fresh mint, and our signature spice blend.',
    spiceNote: 'Medium aromatic warmth',
    popular: true,
  },
  {
    id: 'hyderabadi-chicken-handi',
    name: 'Royal Clay-Pot Chicken Biryani',
    subtitle: 'Chef Special',
    portion: 'Sealed Earthen Handi',
    price: 449,
    priceDisplay: '₹449',
    description:
      'Slow-sealed earthen clay handi chicken biryani infused with Kashmiri saffron milk, roasted whole spices, and crispy caramelized onions.',
    spiceNote: 'Deep rich dum aroma',
    popular: true,
  },
  {
    id: 'special-chicken-biryani',
    name: 'Special Roast Leg Biryani',
    subtitle: 'Signature Experience',
    portion: 'Double Pack',
    price: 599,
    priceDisplay: '₹599',
    description:
      'Double portion of our signature dum biryani topped with two spiced roasted chicken leg pieces, toasted cashews, and spiced egg.',
    spiceNote: 'Bold & celebratory',
  },
  {
    id: 'family-pack',
    name: 'Family Chicken Handi Feast',
    subtitle: 'Made for Sharing',
    portion: 'Serves 4 to 5 Guests',
    price: 1299,
    priceDisplay: '₹1,299',
    description:
      'A generous family clay-pot chicken biryani feast paired with chilled cumin-mint raita, fresh kachumber salad, and rich salan.',
    spiceNote: 'Complete table feast',
  },
  {
    id: 'raita-salad',
    name: 'Mint Raita & Kachumber',
    subtitle: 'Fresh Side Duo',
    portion: 'Chilled Accompaniment',
    price: 79,
    priceDisplay: '₹79',
    description:
      'Chilled roasted-cumin mint yogurt dip paired with freshly chopped crisp onion and cucumber salad.',
    spiceNote: 'Cool & crisp',
  },
];

export const CRAFT_STAGES: CraftStage[] = [
  {
    step: '01',
    title: 'Premium Ingredients',
    summary: 'Aged basmati, fresh cuts, Kashmiri saffron & whole spices.',
    detail:
      'Every pot starts with hand-picked green cardamom, cloves, star anise, and extra-long basmati grains.',
  },
  {
    step: '02',
    title: 'Perfectly Layered Dum',
    summary: 'Slow-cooked over low flame inside an earthen clay handi.',
    detail:
      'Rice, spiced chicken, and caramelized onions steam together gently so every grain absorbs deep flavour.',
  },
  {
    step: '03',
    title: 'Rich in Aroma & Flavour',
    summary: 'Unmistakable fragrance the moment the clay lid lifts.',
    detail:
      'Fresh coriander, garden mint, and saffron steam lock inside until the pot reaches your table.',
  },
  {
    step: '04',
    title: 'Made Fresh With Love',
    summary: 'Cooked in fresh batches and delivered piping hot.',
    detail:
      'Sealed warm right from the handi and dispatched across Bengaluru within 30 to 40 minutes.',
  },
];

export const OCCASIONS = [
  'Family Lunch',
  'Friends Gathering',
  'Parties & Events',
  'Late-Night Cravings',
];

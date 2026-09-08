export interface BannerProps {
  scale?: number;
  showGrid?: boolean;
  onOrderClick?: () => void;
  onPhoneClick?: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  portion: string;
  price: string;
  description: string;
  badge?: string;
  popular?: boolean;
}

export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SpecialityItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  priceEstimate: string;
  serving: string;
}

export type CalligraphyFontId = 'great-vibes' | 'alex-brush' | 'pinyon' | 'satisfy';
export type CalligraphyScope = 'signature' | 'full' | 'subtitles';

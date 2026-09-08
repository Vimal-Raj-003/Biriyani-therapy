import { CalligraphyFontId } from '../types';

export interface CalligraphyFontOption {
  id: CalligraphyFontId;
  name: string;
  family: string;
  description: string;
}

export const CALLIGRAPHY_FONTS: CalligraphyFontOption[] = [
  {
    id: 'great-vibes',
    name: 'Great Vibes',
    family: "'Great Vibes', cursive",
    description: 'Flourished classical royal calligraphy with looping ascenders',
  },
  {
    id: 'alex-brush',
    name: 'Alex Brush',
    family: "'Alex Brush', cursive",
    description: 'Smooth, graceful, modern fluid calligraphy script',
  },
  {
    id: 'pinyon',
    name: 'Pinyon Script',
    family: "'Pinyon Script', cursive",
    description: 'Regal Victorian calligraphy with refined high-contrast slants',
  },
  {
    id: 'satisfy',
    name: 'Satisfy',
    family: "'Satisfy', cursive",
    description: 'Casual brush calligraphy with lively handmade charm',
  },
];

export function getCalligraphyFamily(fontId?: CalligraphyFontId | string): string {
  if (!fontId) return "'Great Vibes', cursive";
  const found = CALLIGRAPHY_FONTS.find((f) => f.id === fontId);
  return found ? found.family : "'Great Vibes', cursive";
}

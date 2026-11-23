export interface DishItem {
  id: string;
  name: string;
  subtitle: string;
  portion: string;
  price: number;
  priceDisplay: string;
  description: string;
  spiceNote: string;
  popular?: boolean;
}

export interface CraftStage {
  step: string;
  title: string;
  summary: string;
  detail: string;
}

export interface ScrollChapter {
  id: string;
  label: string;
  frameHint: string;
  range: [number, number];
}

export interface CartMap {
  [dishId: string]: number;
}

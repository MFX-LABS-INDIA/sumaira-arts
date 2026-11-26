export interface HeroControlsLabels {
  slide: string;
  of: string;
  previous: string;
  next: string;
  goTo: string;
  pause: string;
  play: string;
}

export interface HeroControlsProps {
  count: number;
  interval?: number;
  labels: HeroControlsLabels;
}

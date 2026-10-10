import { ComponentType, CSSProperties } from "react";

export type BounceCardItem =
  | string
  | {
      src?: string;
      alt?: string;
      link?: string;
      title?: string;
    };

export type BounceCardsProps = {
  images?: BounceCardItem[];
  className?: string;
  style?: CSSProperties;
  containerWidth?: number;
  containerHeight?: number;
  cardSize?: number;
  spread?: number;
  rotation?: number;
  arc?: number;
  animationDelay?: number;
  animationStagger?: number;
  bounciness?: number;
  enableHover?: boolean;
  pushDistance?: number;
  hoverScale?: number;
  borderWidth?: number;
  borderColor?: string;
  radius?: number;
  shadow?: boolean;
  aspectRatio?: string;
  transformStyles?: string[];
  onCardClick?: (index: number) => void;
};

declare const BounceCards: ComponentType<BounceCardsProps>;
export default BounceCards;

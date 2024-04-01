import { ImageProps } from "next/image";

export interface IImageProps extends ImageProps {
  src: string;
  className?: string;
  css?: React.CSSProperties;
}

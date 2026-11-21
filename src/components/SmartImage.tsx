import { useEffect, useRef, useState } from "react";
import type { ResponsiveImage } from "../lib/images.ts";

type Props = {
  image: ResponsiveImage;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
};

// Imagem com dimensões reservadas, carregamento preguiçoso e plano B se o ficheiro falhar.
export function SmartImage({ image, alt, sizes, eager = false, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Se a imagem falhou antes de o React hidratar, o evento onError perdeu-se: verificar aqui.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`img-fallback ${className ?? ""}`}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      />
    );
  }

  return (
    <img
      ref={ref}
      className={className}
      src={image.src}
      srcSet={image.srcSet || undefined}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

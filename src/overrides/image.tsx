import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

/**
 * Image component that optionally delegates to @page-speed/img if available
 * Falls back to standard img tag if @page-speed/img is not installed
 */
export function Image({ src, alt = "", ...props }: ImageProps) {
  // Try to import @page-speed/img dynamically
  // If not available, fall back to standard img
  const [PageSpeedImg, setPageSpeedImg] = React.useState<React.ComponentType<any> | null>(null);
  const [useFallback, setUseFallback] = React.useState(false);

  React.useEffect(() => {
    // Only try to load once
    if (!PageSpeedImg && !useFallback) {
      import("@page-speed/img")
        .then((mod) => {
          setPageSpeedImg(() => mod.Img);
        })
        .catch(() => {
          // @page-speed/img not available, use fallback
          setUseFallback(true);
        });
    }
  }, [PageSpeedImg, useFallback]);

  // Use @page-speed/img if available
  if (PageSpeedImg) {
    return <PageSpeedImg src={src} alt={alt} {...props} />;
  }

  // Fallback to standard img with loading="lazy"
  return <img src={src} alt={alt} loading="lazy" {...props} />;
}

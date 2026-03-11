import React from "react";
import { useOptixFlowConfig } from "../core/OptixFlowContext";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  optixFlowConfig?: any; // Accept optixFlowConfig as direct prop (overrides context)
}

/**
 * Image component that optionally delegates to @page-speed/img if available
 * Falls back to standard img tag if @page-speed/img is not installed
 *
 * Supports OptixFlow configuration via:
 * 1. Direct prop: <Image optixFlowConfig={{...}} />
 * 2. Context: <Markdown optixFlowConfig={{...}}><img /></Markdown>
 */
export function Image({ src, alt = "", optixFlowConfig: propConfig, ...props }: ImageProps) {
  // Get optixFlowConfig from context (can be overridden by prop)
  const contextConfig = useOptixFlowConfig();
  const optixFlowConfig = propConfig || contextConfig;

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
    return <PageSpeedImg src={src} alt={alt} optixFlowConfig={optixFlowConfig} {...props} />;
  }

  // Fallback to standard img with loading="lazy"
  return <img src={src} alt={alt} loading="lazy" {...props} />;
}

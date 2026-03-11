import React from "react";

export interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  title?: string;
  className?: string;
}

/**
 * Iframe component with security attributes and responsive defaults
 * Commonly used for embeds (YouTube, Twitter, Spotify, etc.)
 */
export function Iframe({ src, title = "Embedded content", className, ...props }: IframeProps) {
  return (
    <iframe
      src={src}
      title={title}
      className={className}
      loading="lazy"
      allowFullScreen
      {...props}
    />
  );
}

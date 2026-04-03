"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export function SafeImage({ 
  src, 
  alt, 
  className, 
  fallbackClassName,
  ...props 
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl gap-2 text-muted-foreground/40",
        fallbackClassName || className
      )}>
        <ImageOff size={24} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Asset_Unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loading && (
         <div className="absolute inset-0 bg-white/5 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}

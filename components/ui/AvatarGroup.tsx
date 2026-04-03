import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: string[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({ avatars, max = 4, size = "md", className, ...props }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className={cn("flex -space-x-3", className)} {...props}>
      {visibleAvatars.map((src, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full border-2 border-background bg-accent ring-1 ring-black/5 overflow-hidden",
            sizes[size]
          )}
        >
          <img src={src} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold text-secondary-foreground ring-1 ring-black/5",
            sizes[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

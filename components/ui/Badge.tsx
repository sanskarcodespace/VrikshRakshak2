import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary-gradient text-white",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-eco-green/10 text-eco-green border border-eco-green/20",
    warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
    outline: "border border-input bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  onDelete?: () => void;
}

export function Chip({ className, icon, onDelete, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground hover:bg-accent/20 transition-all",
        className
      )}
      {...props}
    >
      {icon && <span className="text-accent">{icon}</span>}
      {children}
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-1 rounded-full p-0.5 hover:bg-accent/20 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  );
}

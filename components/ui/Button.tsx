import * as React from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const combinedRef = (ref as React.MutableRefObject<HTMLButtonElement>) || internalRef;

    React.useEffect(() => {
      const el = internalRef.current;
      if (!el) return;

      const onEnter = () => {
        gsap.to(el, { 
          scale: 1.02, 
          duration: 0.4, 
          ease: "elastic.out(1, 0.3)",
          boxShadow: variant === "primary" ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none"
        });
      };
      
      const onLeave = () => {
        gsap.to(el, { 
          scale: 1, 
          duration: 0.4, 
          ease: "elastic.out(1, 0.3)",
          boxShadow: "none"
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, [variant]);

    const variants = {
      primary: "bg-primary-gradient text-white border border-primary/20 hover:border-primary/40",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:text-accent-foreground",
      ghost: "hover:bg-accent/10 hover:text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg rounded-2xl",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={internalRef}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-glow-sm",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

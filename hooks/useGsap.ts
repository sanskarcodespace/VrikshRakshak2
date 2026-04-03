"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useGsapReveal = (options: { 
  stagger?: number; 
  duration?: number; 
  delay?: number;
  y?: number;
  selector?: string;
} = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { stagger = 0.1, duration = 0.8, delay = 0, y = 30, selector = ".animate-reveal" } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(selector, 
        { opacity: 0, y: y },
        { 
          opacity: 1, 
          y: 0, 
          duration: duration, 
          stagger: stagger, 
          delay: delay,
          ease: "expo.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, duration, delay, y, selector]);

  return containerRef;
};

export const useGsapHover = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
};

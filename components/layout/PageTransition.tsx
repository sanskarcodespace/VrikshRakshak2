"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // Entrance Animation
    gsap.fromTo(mainRef.current, 
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        duration: 0.6, 
        ease: "power3.out" 
      }
    );

    return () => {
      // Optional exit animation or cleanup
      gsap.killTweensOf(mainRef.current);
    };
  }, [pathname]);

  return (
    <div ref={mainRef} className="w-full h-full">
      {children}
    </div>
  );
}
